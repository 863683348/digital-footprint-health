import { getDb } from '@/lib/db';
import { estimateDelete } from '@/lib/payment';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  let count = Number(body.tweetCount) || 0;
  if (!count && body.archiveId) {
    const row = (getDb().prepare(`SELECT COUNT(*) AS c FROM tweets WHERE archive_id=?`).get(body.archiveId) as any);
    count = row?.c ?? 0;
  }
  if (!count) return fail(ERROR_CODES.VALIDATION, '缺少 tweetCount 或 archiveId');
  return ok(estimateDelete(count));
}
