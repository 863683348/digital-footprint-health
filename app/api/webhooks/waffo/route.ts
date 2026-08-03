import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook, type WaffoWebhookEvent } from '@/lib/waffo';
import { getOrderByWaffoId, transitionOrder } from '@/lib/order';

export const runtime = 'nodejs';

// POST /api/webhooks/waffo
// Waffo calls this after a checkout changes state. We verify the HMAC
// signature, then transition the corresponding order.
//
// Key events handled:
//   order.completed  → order → paid
//   order.refunded   → order → refunded
//   order.failed     → order → failed
//
// IMPORTANT: respond 200 quickly even on errors so Waffo doesn't retry
// indefinitely. We log errors and return 200 unless the payload is unparseable.

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  let event: WaffoWebhookEvent;
  try {
    event = JSON.parse(rawBody) as WaffoWebhookEvent;
  } catch {
    console.error('[waffo-webhook] invalid JSON body');
    return NextResponse.json({ ok: false, error: 'invalid-json' }, { status: 400 });
  }

  const signature = req.headers.get('x-waffo-signature');
  const timestamp = req.headers.get('x-waffo-timestamp');

  try {
    if (!verifyWebhook(rawBody, signature, timestamp)) {
      console.error('[waffo-webhook] signature verification failed');
      // Return 200 so Waffo doesn't retry — a bad signature is not retryable.
      return NextResponse.json({ ok: false, error: 'bad-signature' }, { status: 200 });
    }
  } catch (e) {
    console.error('[waffo-webhook] verification error:', e);
    return NextResponse.json({ ok: false, error: 'verification-error' }, { status: 500 });
  }

  console.log(`[waffo-webhook] event: ${event.type} (id=${event.id})`);

  try {
    switch (event.type) {
      case 'order.completed': {
        await handleOrderCompleted(event);
        break;
      }
      case 'order.refunded': {
        await handleOrderRefunded(event);
        break;
      }
      case 'order.failed':
      case 'order.denied': {
        await handleOrderFailed(event);
        break;
      }
      default:
        console.log(`[waffo-webhook] unhandled event: ${event.type}`);
    }
  } catch (e) {
    console.error('[waffo-webhook] handler error:', e);
    return NextResponse.json({ ok: false, error: 'handler-error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function handleOrderCompleted(event: WaffoWebhookEvent): Promise<void> {
  const checkoutId = event.data.checkoutId ?? event.data.orderId;
  if (!checkoutId) {
    console.warn('[waffo-webhook] order.completed: missing checkoutId');
    return;
  }

  const order = await getOrderByWaffoId(checkoutId);
  if (!order) {
    console.warn(`[waffo-webhook] order.completed: no order for checkoutId=${checkoutId}`);
    return;
  }

  // Idempotent: if already paid, no-op.
  await transitionOrder(order.id, 'paid', { paidAt: new Date().toISOString() });
  console.log(`[waffo-webhook] order ${order.id} → paid`);
}

async function handleOrderRefunded(event: WaffoWebhookEvent): Promise<void> {
  const checkoutId = event.data.checkoutId ?? event.data.orderId;
  if (!checkoutId) {
    console.warn('[waffo-webhook] order.refunded: missing checkoutId');
    return;
  }

  const order = await getOrderByWaffoId(checkoutId);
  if (!order) {
    console.warn(`[waffo-webhook] order.refunded: no order for checkoutId=${checkoutId}`);
    return;
  }

  // Idempotent: if already refunded, no-op.
  await transitionOrder(order.id, 'refunded', {
    refundId: event.id,
    refundNote: 'waffo webhook',
  });
  console.log(`[waffo-webhook] order ${order.id} → refunded`);
}

async function handleOrderFailed(event: WaffoWebhookEvent): Promise<void> {
  const checkoutId = event.data.checkoutId ?? event.data.orderId;
  if (!checkoutId) {
    console.warn('[waffo-webhook] order.failed: missing checkoutId');
    return;
  }

  const order = await getOrderByWaffoId(checkoutId);
  if (!order) {
    console.warn(`[waffo-webhook] order.failed: no order for checkoutId=${checkoutId}`);
    return;
  }

  await transitionOrder(order.id, 'failed', {
    refundNote: `waffo: ${event.type}`,
  });
  console.log(`[waffo-webhook] order ${order.id} → failed (${event.type})`);
}
