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
import { createOrder, isConfigured } from '@/lib/paypal';
import type { CreateOrderRequest, OrderRecord } from '@/lib/types';

export const runtime = 'nodejs';

function requireUser(req: NextRequest) {
  const session = parseSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  return session;
}

// POST /api/orders — create a PayPal order
// Body: { plan, archiveId, tweetCount }
export async function POST(req: NextRequest) {
  const user = requireUser(req);
  if (!user) {
    return fail('FORBIDDEN', 'Sign in required to create an order.', 401);
  }

  if (!isConfigured()) {
    return fail(
      'INTERNAL',
      'PayPal is not configured on the server. Set PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET.',
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

  // Build absolute URLs for PayPal redirect.
  const origin = req.nextUrl.origin;
  const returnUrl = `${origin}/api/orders/${internalId}/capture`;
  const cancelUrl = `${origin}/delete/confirm?archiveId=${archiveId}&canceled=1`;

  let paypalRes;
  try {
    paypalRes = await createOrder({
      amount: usdAmount,
      internalOrderId: internalId,
      description: `TweetDelete — ${planDef.id} plan (${tweetCount} tweets)`,
      returnUrl,
      cancelUrl,
    });
  } catch (e) {
    console.error('[orders] createOrder failed:', e);
    return fail('INTERNAL', 'Failed to create PayPal order.', 502);
  }

  const approveLink = paypalRes.links.find((l) => l.rel === 'approve');
  if (!approveLink) {
    console.error('[orders] PayPal response missing approve link:', paypalRes);
    return fail('INTERNAL', 'PayPal response missing approval URL.', 502);
  }

  const record: OrderRecord = {
    id: internalId,
    paypalOrderId: paypalRes.id,
    captureId: null,
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
    paypalOrderId: paypalRes.id,
    approveUrl: approveLink.href,
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
      paypalOrderId: record.paypalOrderId,
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
