import { setJobStatus } from '@/lib/worker';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const d = (await import('@/lib/worker')).getJobDetail(params.id);
  if (!d) return fail(ERROR_CODES.NOT_FOUND, '删除任务不存在');
  setJobStatus(params.id, 'paused');
  return ok({ status: 'paused' as const });
}
