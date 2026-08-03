import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook, type WaffoWebhookEvent } from '@/lib/waffo';
import { getOrderRecord, getOrderByWaffoId, transitionOrder } from '@/lib/order';
import type { OrderRecord } from '@/lib/types';

export const runtime = 'nodejs';

// POST /api/webhooks/waffo
// Waffo calls this after a checkout changes state. The SDK verifies the
// RSA-SHA256 signature (X-Waffo-Signature header) and returns the parsed
// event, or null on failure. We then transition the corresponding order.
//
// Key events handled:
//   order.completed   → order → paid   (also captures paymentId for refunds)
//   refund.succeeded  → order → refunded
//   order.failed      → order → failed
//   order.denied      → order → failed
//
// IMPORTANT: respond 200 quickly so Waffo doesn't retry indefinitely. We log
// errors and return 200 unless the signature is invalid (401, not retryable).

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-waffo-signature');

  const event = verifyWebhook(rawBody, signature);
  if (!event) {
    console.error('[waffo-webhook] signature verification failed');
    return NextResponse.json({ ok: false, error: 'bad-signature' }, { status: 401 });
  }

  console.log(`[waffo-webhook] event: ${event.eventType} (id=${event.id})`);

  try {
    switch (event.eventType) {
      // One-time first payment AND subscription first payment (activation) both
      // mean the order is paid. Subscription renewals keep it paid (idempotent).
      case 'order.completed':
      case 'subscription.activated':
      case 'subscription.payment_succeeded':
        await handleOrderCompleted(event);
        break;
      case 'refund.succeeded':
        await handleOrderRefunded(event);
        break;
      case 'order.failed':
      case 'order.denied':
        await handleOrderFailed(event);
        break;
      default:
        console.log(`[waffo-webhook] unhandled event: ${event.eventType}`);
    }
  } catch (e) {
    console.error('[waffo-webhook] handler error:', e);
    return NextResponse.json({ ok: false, error: 'handler-error' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

async function resolveOrder(event: WaffoWebhookEvent): Promise<OrderRecord | null> {
  // Primary key: the internal order id we sent as orderMerchantExternalId.
  if (event.data.orderMerchantExternalId) {
    const byExt = await getOrderRecord(event.data.orderMerchantExternalId);
    if (byExt) return byExt;
  }
  // Fallback: match by the Waffo order id.
  if (event.data.orderId) {
    return await getOrderByWaffoId(event.data.orderId);
  }
  return null;
}

async function handleOrderCompleted(event: WaffoWebhookEvent): Promise<void> {
  const order = await resolveOrder(event);
  if (!order) {
    console.warn(
      `[waffo-webhook] order.completed: no order for externalId=${event.data.orderMerchantExternalId} orderId=${event.data.orderId}`,
    );
    return;
  }

  // Idempotent: if already paid, no-op. Capture paymentId for future refunds.
  await transitionOrder(order.id, 'paid', {
    paymentId: event.data.paymentId ?? null,
    waffoCheckoutId: event.data.orderId ?? order.waffoCheckoutId,
  });
  console.log(`[waffo-webhook] order ${order.id} → paid`);
}

async function handleOrderRefunded(event: WaffoWebhookEvent): Promise<void> {
  const order = await resolveOrder(event);
  if (!order) {
    console.warn(
      `[waffo-webhook] refund.succeeded: no order for externalId=${event.data.orderMerchantExternalId} orderId=${event.data.orderId}`,
    );
    return;
  }

  await transitionOrder(order.id, 'refunded', {
    refundId: event.data.refundTicketMerchantExternalId ?? event.id,
    refundNote: 'waffo webhook',
  });
  console.log(`[waffo-webhook] order ${order.id} → refunded`);
}

async function handleOrderFailed(event: WaffoWebhookEvent): Promise<void> {
  const order = await resolveOrder(event);
  if (!order) {
    console.warn(
      `[waffo-webhook] ${event.eventType}: no order for externalId=${event.data.orderMerchantExternalId} orderId=${event.data.orderId}`,
    );
    return;
  }

  await transitionOrder(order.id, 'failed', {
    refundNote: `waffo: ${event.eventType}`,
  });
  console.log(`[waffo-webhook] order ${order.id} → failed (${event.eventType})`);
}
