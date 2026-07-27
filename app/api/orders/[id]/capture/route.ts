import { NextRequest } from 'next/server';
import { parseSession, SESSION_COOKIE } from '@/lib/session';
import { ok, fail } from '@/lib/resp';
import { getOrderRecord, transitionOrder } from '@/lib/order';
import { captureOrder } from '@/lib/paypal';

export const runtime = 'nodejs';

// POST /api/orders/:id/capture
// Called by PayPal's return_url after buyer approval. Captures the payment
// and transitions the order to 'paid'. Safe to call multiple times
// (idempotent via transitionOrder).
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const user = parseSession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return fail('FORBIDDEN', 'Sign in required.', 401);
  }

  const record = await getOrderRecord(id);
  if (!record) {
    return fail('NOT_FOUND', `Order ${id} not found.`, 404);
  }
  if (record.userId !== user.sub) {
    return fail('FORBIDDEN', 'Order does not belong to you.', 403);
  }
  if (!record.paypalOrderId) {
    return fail('INTERNAL', 'Order has no PayPal order id.', 500);
  }

  // Already paid — idempotent no-op.
  if (record.status === 'paid' || record.status === 'refunded') {
    return ok({
      id: record.id,
      status: record.status,
      captureId: record.captureId,
    });
  }

  let capture;
  try {
    capture = await captureOrder(record.paypalOrderId);
  } catch (e) {
    console.error('[capture] captureOrder failed:', e);
    // Transition to failed so we don't retry blindly.
    await transitionOrder(id, 'failed', {
      refundNote: `capture failed: ${(e as Error).message?.slice(0, 200)}`,
    }).catch(() => null);
    return fail('INTERNAL', 'PayPal capture failed.', 502);
  }

  if (capture.status !== 'COMPLETED') {
    console.warn('[capture] non-completed status:', capture.status);
    await transitionOrder(id, 'failed', {
      refundNote: `capture status: ${capture.status}`,
    }).catch(() => null);
    return fail('INTERNAL', `Capture status: ${capture.status}`, 502);
  }

  const updated = await transitionOrder(id, 'paid', {
    captureId: capture.id,
  });

  return ok({
    id: updated?.id ?? id,
    status: updated?.status ?? 'paid',
    captureId: capture.id,
  });
}
