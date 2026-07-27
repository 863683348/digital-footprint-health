import { NextRequest } from 'next/server';
import { parseSession, SESSION_COOKIE } from '@/lib/session';
import { ok, fail } from '@/lib/resp';
import { getOrderRecord, transitionOrder, calculateRefundAmount } from '@/lib/order';
import { refundCapture } from '@/lib/paypal';

export const runtime = 'nodejs';

// POST /api/orders/:id/refund
// Body (optional): { deletedCount?: number }
// If deletedCount is provided, updates the record before calculating the
// refund amount (enables partial refund for in-progress deletions).
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
  if (record.status !== 'paid') {
    return fail(
      'VALIDATION',
      `Order must be in 'paid' state to refund (current: ${record.status}).`,
      400,
    );
  }
  if (!record.captureId) {
    return fail('INTERNAL', 'Order has no capture id; cannot refund.', 500);
  }

  // Optional body: update deletedCount for partial refund calc.
  let body: { deletedCount?: number } = {};
  try {
    body = await req.json();
  } catch {
    // empty body is fine
  }

  let workingRecord = record;
  if (typeof body.deletedCount === 'number' && body.deletedCount >= 0) {
    const updated = await transitionOrder(id, 'paid', {
      deletedCount: Math.min(body.deletedCount, record.tweetCount),
    });
    if (updated) workingRecord = updated;
  }

  const refundAmount = calculateRefundAmount(workingRecord);

  // Zero refund — nothing to do.
  if (parseFloat(refundAmount.value) === 0) {
    return ok({
      id,
      status: 'paid',
      refundId: null,
      refundAmount,
      message: 'No refundable amount (all tweets already deleted).',
    });
  }

  let refund;
  try {
    refund = await refundCapture(
      workingRecord.captureId as string,
      refundAmount,
    );
  } catch (e) {
    console.error('[refund] refundCapture failed:', e);
    return fail('INTERNAL', 'PayPal refund failed.', 502);
  }

  const isFullRefund =
    parseFloat(refundAmount.value) >= parseFloat(workingRecord.amount.value);

  const updated = await transitionOrder(id, 'refunded', {
    refundId: refund.id,
    refundNote: refundAmount.reason,
  });

  return ok({
    id: updated?.id ?? id,
    status: updated?.status ?? 'refunded',
    refundId: refund.id,
    refundAmount,
    refundStatus: refund.status,
    isFullRefund,
  });
}
