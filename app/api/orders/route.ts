import { NextRequest } from 'next/server';
import { parseSession, SESSION_COOKIE } from '@/lib/session';
import { ok, fail } from '@/lib/resp';
import {
  generateOrderId,
  createOrderRecord,
  getOrderRecord,
  cnyToUsd,
  findPlan,
} from '@/lib/order';
import { createCheckout, isConfigured } from '@/lib/waffo';
import type { CreateOrderRequest, OrderRecord } from '@/lib/types';

export const runtime = 'nodejs';

function requireUser(req: NextRequest) {
  const session = parseSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  return session;
}

// POST /api/orders — create a Waffo checkout
// Body: { plan, archiveId, tweetCount }
export async function POST(req: NextRequest) {
  const user = requireUser(req);
  if (!user) {
    return fail('FORBIDDEN', 'Sign in required to create an order.', 401);
  }

  if (!isConfigured()) {
    return fail(
      'INTERNAL',
      'Payment is not configured on the server. Set WAFFO_MERCHANT_ID / WAFFO_PRIVATE_KEY.',
      503,
    );
  }

  let body: CreateOrderRequest;
  try {
    body = (await req.json()) as CreateOrderRequest;
  } catch {
    return fail('VALIDATION', 'Invalid JSON body.', 400);
  }

  const { plan, archiveId, tweetCount } = body;
  if (!plan || !archiveId || typeof tweetCount !== 'number' || tweetCount < 0) {
    return fail(
      'VALIDATION',
      'Missing fields: plan, archiveId, tweetCount are required.',
      400,
    );
  }

  const planDef = findPlan(plan);
  if (!planDef) {
    return fail('VALIDATION', `Unknown plan: ${plan}`, 400);
  }

  if (planDef.price === 0 && plan !== 'free') {
    return fail(
      'VALIDATION',
      'This plan is free; no order required.',
      400,
    );
  }

  const cnyAmount = planDef.price;
  const usdAmount = cnyToUsd(cnyAmount);
  const internalId = generateOrderId();

  // Build absolute URLs for Waffo redirect. Preserve the user's locale so the
  // buyer returns to the matching /en or / (zh) confirm page.
  const localePrefix = body.lang === 'en' ? '/en' : '';
  const origin = req.nextUrl.origin;
  const successUrl = `${origin}${localePrefix}/delete/confirm?archiveId=${archiveId}&orderId=${internalId}&waffo=return`;
  const cancelUrl = `${origin}${localePrefix}/delete/confirm?archiveId=${archiveId}&canceled=1`;

  let waffoRes;
  try {
    waffoRes = await createCheckout({
      amount: usdAmount,
      internalOrderId: internalId,
      description: `TweetDelete — ${planDef.id} plan (${tweetCount} tweets)`,
      successUrl,
      cancelUrl,
    });
  } catch (e) {
    console.error('[orders] createCheckout failed:', e);
    return fail('INTERNAL', 'Failed to create Waffo checkout.', 502);
  }

  const record: OrderRecord = {
    id: internalId,
    waffoCheckoutId: waffoRes.checkoutId,
    refundId: null,
    userId: user.sub,
    plan: planDef.id,
    amount: usdAmount,
    cnyAmount,
    tweetCount,
    status: 'created',
    archiveId,
    createdAt: new Date().toISOString(),
    paidAt: null,
    refundedAt: null,
    refundNote: null,
    deletedCount: 0,
  };

  try {
    await createOrderRecord(record);
  } catch (e) {
    console.error('[orders] createOrderRecord failed:', e);
    return fail('INTERNAL', 'Failed to persist order record.', 500);
  }

  return ok({
    orderId: internalId,
    checkoutId: waffoRes.checkoutId,
    checkoutUrl: waffoRes.checkoutUrl,
  });
}

// GET /api/orders?id=xxx  or  /api/orders (list user's orders)
export async function GET(req: NextRequest) {
  const user = requireUser(req);
  if (!user) {
    return fail('FORBIDDEN', 'Sign in required.', 401);
  }

  const id = req.nextUrl.searchParams.get('id');
  if (id) {
    const record = await getOrderRecord(id);
    if (!record) {
      return fail('NOT_FOUND', `Order ${id} not found.`, 404);
    }
    if (record.userId !== user.sub) {
      return fail('FORBIDDEN', 'Order does not belong to you.', 403);
    }
    return ok({
      id: record.id,
      status: record.status,
      amount: record.amount,
      cnyAmount: record.cnyAmount,
      plan: record.plan,
      waffoCheckoutId: record.waffoCheckoutId,
      paidAt: record.paidAt,
      refundedAt: record.refundedAt,
      tweetCount: record.tweetCount,
      deletedCount: record.deletedCount,
    });
  }

  // List all orders for this user.
  const { listUserOrders } = await import('@/lib/order');
  const records = await listUserOrders(user.sub);
  return ok(
    records.map((r) => ({
      id: r.id,
      status: r.status,
      amount: r.amount,
      cnyAmount: r.cnyAmount,
      plan: r.plan,
      paidAt: r.paidAt,
      refundedAt: r.refundedAt,
    })),
  );
}
