import { getDb } from '@/lib/db';
import { createJob, startWorker } from '@/lib/worker';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const archiveId: string = body.archiveId;
  const dryRun: boolean = body.dryRun !== false;
  if (!archiveId) return fail(ERROR_CODES.VALIDATION, '缺少 archiveId');
  const arch = (getDb().prepare(`SELECT id FROM archives WHERE id=?`).get(archiveId) as any);
  if (!arch) return fail(ERROR_CODES.NOT_FOUND, '归档不存在');

  let res: { jobId: string; estimatedTotal: number; itemCount: number };
  try {
    res = createJob(archiveId, dryRun);
  } catch {
    return fail(ERROR_CODES.VALIDATION, '归档暂无推文，无法创建删除任务');
  }
  startWorker();
  return ok({ jobId: res.jobId, dryRun, estimatedTotal: res.estimatedTotal, itemCount: res.itemCount });
}
