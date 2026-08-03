// Order state management — backed by Neon Postgres (see lib/db.ts).
//
// All order records are persisted in the `orders` table. The public API
// (createOrderRecord / getOrderRecord / getOrderByWaffoId / listUserOrders /
// updateOrderRecord / transitionOrder / canTransition / calculateRefundAmount /
// findPlan / cnyToUsd / generateOrderId) is unchanged from the previous
// Upstash-backed implementation, so route handlers and the account page are
// unaffected by the storage swap.

import type { BillingPlan, OrderRecord, OrderStatus } from './types';
import { BILLING_PLANS } from './payment';
import { query, ensureSchema } from './db';

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

// ---- Row <-> OrderRecord mapping ----
interface OrderRow {
  id: string;
  waffo_checkout_id: string | null;
  payment_id: string | null;
  refund_id: string | null;
  user_id: string;
  plan: string;
  amount_currency: string;
  amount_value: string;
  cny_amount: string | number;
  tweet_count: string | number;
  status: string;
  archive_id: string;
  created_at: string;
  paid_at: string | null;
  refunded_at: string | null;
  refund_note: string | null;
  deleted_count: string | number;
}

function rowToRecord(row: OrderRow): OrderRecord {
  return {
    id: row.id,
    waffoCheckoutId: row.waffo_checkout_id,
    paymentId: row.payment_id,
    refundId: row.refund_id,
    userId: row.user_id,
    plan: row.plan as BillingPlan['id'],
    amount: { currency: 'USD', value: String(row.amount_value) },
    cnyAmount: Number(row.cny_amount),
    tweetCount: Number(row.tweet_count),
    status: row.status as OrderStatus,
    archiveId: row.archive_id,
    createdAt: row.created_at,
    paidAt: row.paid_at,
    refundedAt: row.refunded_at,
    refundNote: row.refund_note,
    deletedCount: Number(row.deleted_count),
  };
}

const COLUMNS = [
  'id',
  'waffo_checkout_id',
  'payment_id',
  'refund_id',
  'user_id',
  'plan',
  'amount_currency',
  'amount_value',
  'cny_amount',
  'tweet_count',
  'status',
  'archive_id',
  'created_at',
  'paid_at',
  'refunded_at',
  'refund_note',
  'deleted_count',
].join(', ');

// ---- CRUD ----
export async function createOrderRecord(record: OrderRecord): Promise<void> {
  await ensureSchema();
  await query(
    `INSERT INTO orders
       (id, waffo_checkout_id, payment_id, refund_id, user_id, plan,
        amount_currency, amount_value, cny_amount, tweet_count,
        status, archive_id, created_at, paid_at, refunded_at,
        refund_note, deleted_count)
     VALUES
       ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
    [
      record.id,
      record.waffoCheckoutId,
      record.paymentId,
      record.refundId,
      record.userId,
      record.plan,
      record.amount.currency,
      record.amount.value,
      record.cnyAmount,
      record.tweetCount,
      record.status,
      record.archiveId,
      record.createdAt,
      record.paidAt,
      record.refundedAt,
      record.refundNote,
      record.deletedCount,
    ],
  );
}

export async function getOrderRecord(id: string): Promise<OrderRecord | null> {
  await ensureSchema();
  const { rows } = await query<OrderRow>(
    `SELECT ${COLUMNS} FROM orders WHERE id = $1`,
    [id],
  );
  return rows[0] ? rowToRecord(rows[0]) : null;
}

export async function getOrderByWaffoId(
  waffoCheckoutId: string,
): Promise<OrderRecord | null> {
  await ensureSchema();
  const { rows } = await query<OrderRow>(
    `SELECT ${COLUMNS} FROM orders WHERE waffo_checkout_id = $1`,
    [waffoCheckoutId],
  );
  return rows[0] ? rowToRecord(rows[0]) : null;
}

export async function listUserOrders(userId: string): Promise<OrderRecord[]> {
  await ensureSchema();
  const { rows } = await query<OrderRow>(
    `SELECT ${COLUMNS} FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId],
  );
  return rows.map(rowToRecord);
}

export async function updateOrderRecord(
  id: string,
  patch: Partial<OrderRecord>,
): Promise<OrderRecord | null> {
  const current = await getOrderRecord(id);
  if (!current) return null;
  const updated: OrderRecord = { ...current, ...patch };

  await ensureSchema();
  await query(
    `UPDATE orders SET
       waffo_checkout_id = $1,
       payment_id        = $2,
       refund_id          = $3,
       user_id            = $4,
       plan               = $5,
       amount_currency    = $6,
       amount_value       = $7,
       cny_amount         = $8,
       tweet_count        = $9,
       status             = $10,
       archive_id         = $11,
       created_at         = $12,
       paid_at            = $13,
       refunded_at        = $14,
       refund_note        = $15,
       deleted_count      = $16
     WHERE id = $17`,
    [
      updated.waffoCheckoutId,
      updated.paymentId,
      updated.refundId,
      updated.userId,
      updated.plan,
      updated.amount.currency,
      updated.amount.value,
      updated.cnyAmount,
      updated.tweetCount,
      updated.status,
      updated.archiveId,
      updated.createdAt,
      updated.paidAt,
      updated.refundedAt,
      updated.refundNote,
      updated.deletedCount,
      id,
    ],
  );
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
