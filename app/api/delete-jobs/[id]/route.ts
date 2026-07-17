import { getJobDetail } from '@/lib/worker';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const d = getJobDetail(params.id);
  if (!d) return fail(ERROR_CODES.NOT_FOUND, '删除任务不存在');
  return ok(d);
}
