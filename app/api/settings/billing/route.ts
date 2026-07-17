import { getBilling } from '@/lib/payment';
import { ok } from '@/lib/resp';

export async function GET() {
  return ok(getBilling());
}
