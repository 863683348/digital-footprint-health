// Order state management — backed by Upstash Redis (same env vars as the
// rate limiter). When Upstash is not configured, falls back to an in-memory
// Map so the dev flow still works; production MUST set the env vars.
//
// Key scheme:
//   dfh:order:<id>          — JSON OrderRecord
//   dfh:order:waffo:<cid>   — internal id (for webhook lookup by waffoCheckoutId)
//   dfh:order:user:<uid>    — set of internal ids (user's order history)

import type { BillingPlan, OrderRecord, OrderStatus } from './types';
import { BILLING_PLANS } from './payment';

const KEY_ORDER = (id: string) => `dfh:order:${id}`;
const KEY_WAFFO = (checkoutId: string) => `dfh:order:waffo:${checkoutId}`;
const KEY_USER = (userId: string) => `dfh:order:user:${userId}`;

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

// ---- Upstash client (lazy) ----
type Redis = import('@upstash/redis').Redis;
let redis: Redis | null = null;
let redisInit: Promise<Redis | null> | null = null;

function getRedis(): Promise<Redis | null> {
  if (redis) return Promise.resolve(redis);
  if (!hasUpstash) return Promise.resolve(null);
  if (!redisInit) {
    redisInit = (async () => {
      const { Redis } = await import('@upstash/redis');
      redis = Redis.fromEnv();
      return redis;
    })();
  }
  return redisInit;
}

// ---- In-memory fallback ----
const memStore = new Map<string, string>(); // id -> JSON
const memWaffoIndex = new Map<string, string>(); // waffoCheckoutId -> internalId
const memUserIndex = new Map<string, Set<string>>(); // userId -> set of ids

// ---- CNY → USD conversion ----
// Fixed rate for deterministic pricing. Adjust if you start hedging FX.
export const CNY_TO_USD_RATE = 1 / 7.2;

export function cnyToUsd(cny: number): { currency: 'USD'; value: string } {
  const usd = Math.round(cny * CNY_TO_USD_RATE * 100) / 100;
  // Waffo requires 2 decimal places.
  return { currency: 'USD', value: usd.toFixed(2) };
}

// ---- ID generation ----
export function generateOrderId(): string {
  return `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// ---- CRUD ----
export async function createOrderRecord(record: OrderRecord): Promise<void> {
  const r = await getRedis();
  if (r) {
    await r.set(KEY_ORDER(record.id), JSON.stringify(record));
    await r.sadd(KEY_USER(record.userId), record.id);
    if (record.waffoCheckoutId) {
      await r.set(KEY_WAFFO(record.waffoCheckoutId), record.id);
    }
  } else {
    memStore.set(record.id, JSON.stringify(record));
    if (!memUserIndex.has(record.userId)) {
      memUserIndex.set(record.userId, new Set());
    }
    memUserIndex.get(record.userId)!.add(record.id);
    if (record.waffoCheckoutId) {
      memWaffoIndex.set(record.waffoCheckoutId, record.id);
    }
  }
}

export async function getOrderRecord(id: string): Promise<OrderRecord | null> {
  const r = await getRedis();
  if (r) {
    const raw = await r.get<string>(KEY_ORDER(id));
    if (!raw) return null;
    return JSON.parse(raw) as OrderRecord;
  }
  const mem = memStore.get(id);
  return mem ? (JSON.parse(mem) as OrderRecord) : null;
}

export async function getOrderByWaffoId(
  waffoCheckoutId: string,
): Promise<OrderRecord | null> {
  const r = await getRedis();
  let internalId: string | null = null;
  if (r) {
    internalId = await r.get<string>(KEY_WAFFO(waffoCheckoutId));
  } else {
    internalId = memWaffoIndex.get(waffoCheckoutId) ?? null;
  }
  if (!internalId) return null;
  return getOrderRecord(internalId);
}

export async function listUserOrders(userId: string): Promise<OrderRecord[]> {
  const r = await getRedis();
  let ids: string[];
  if (r) {
    const set = (await r.smembers(KEY_USER(userId))) as string[] | null;
    ids = set ?? [];
  } else {
    ids = Array.from(memUserIndex.get(userId) ?? []);
  }
  const records = await Promise.all(ids.map((id) => getOrderRecord(id)));
  return records.filter((x): x is OrderRecord => x !== null);
}

export async function updateOrderRecord(
  id: string,
  patch: Partial<OrderRecord>,
): Promise<OrderRecord | null> {
  const current = await getOrderRecord(id);
  if (!current) return null;
  const updated: OrderRecord = { ...current, ...patch };

  const r = await getRedis();
  if (r) {
    await r.set(KEY_ORDER(id), JSON.stringify(updated));
    if (patch.waffoCheckoutId && patch.waffoCheckoutId !== current.waffoCheckoutId) {
      await r.set(KEY_WAFFO(patch.waffoCheckoutId), id);
    }
  } else {
    memStore.set(id, JSON.stringify(updated));
    if (patch.waffoCheckoutId && patch.waffoCheckoutId !== current.waffoCheckoutId) {
      memWaffoIndex.set(patch.waffoCheckoutId, id);
    }
  }
  return updated;
}

// ---- State machine transitions ----
// created → paid → refunded
//            ↘ cancelled / failed
// paid → failed
// (Waffo auto-captures on its hosted page, so there is no separate approve step.)

const ALLOWED_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  created: ['paid', 'cancelled', 'failed'],
  paid: ['refunded', 'failed'],
  refunded: [],
  cancelled: [],
  failed: [],
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Idempotent transition. If the order is already in the target status, the
 * call is a no-op and returns the current record. This handles Waffo's
 * at-least-once webhook delivery.
 */
export async function transitionOrder(
  id: string,
  to: OrderStatus,
  extra: Partial<OrderRecord> = {},
): Promise<OrderRecord | null> {
  const current = await getOrderRecord(id);
  if (!current) return null;

  // Idempotency: already at target.
  if (current.status === to) {
    return current;
  }

  if (!canTransition(current.status, to)) {
    throw new Error(
      `Invalid order transition: ${current.status} → ${to} (order ${id})`,
    );
  }

  const patch: Partial<OrderRecord> = { status: to, ...extra };
  if (to === 'paid' && !current.paidAt) {
    patch.paidAt = new Date().toISOString();
  }
  if (to === 'refunded' && !current.refundedAt) {
    patch.refundedAt = new Date().toISOString();
  }

  return updateOrderRecord(id, patch);
}

// ---- Refund amount calculation ----
// Policy:
//   - Membership plans (pro_monthly / pro_annual) are non-refundable once paid.
//   - Not started (deletedCount === 0): full refund
//   - In progress (0 < deletedCount < tweetCount): proportional refund
//     (refund the portion for tweets NOT yet deleted)
export function calculateRefundAmount(order: OrderRecord): {
  currency: 'USD';
  value: string;
  reason: string;
} {
  const { tweetCount, deletedCount, amount, plan } = order;

  if (plan === 'pro_monthly' || plan === 'pro_annual') {
    return { currency: 'USD', value: '0.00', reason: 'membership_non_refundable' };
  }

  if (deletedCount === 0) {
    return { ...amount, reason: 'full_before_start' };
  }

  if (deletedCount >= tweetCount) {
    // All deleted — no refund.
    return { currency: 'USD', value: '0.00', reason: 'already_completed' };
  }

  // Proportional: refund for (tweetCount - deletedCount) / tweetCount
  const remaining = tweetCount - deletedCount;
  const ratio = remaining / tweetCount;
  const refundUsd = Math.round(parseFloat(amount.value) * ratio * 100) / 100;
  return {
    currency: 'USD',
    value: refundUsd.toFixed(2),
    reason: `partial_${remaining}_of_${tweetCount}`,
  };
}

// ---- Plan lookup helper ----
export function findPlan(planId: BillingPlan['id']): BillingPlan | undefined {
  return BILLING_PLANS.find((p) => p.id === planId);
}
