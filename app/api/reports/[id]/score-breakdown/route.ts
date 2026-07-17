import { getDb } from '@/lib/db';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const row = (getDb().prepare(`SELECT id, score, details FROM health_reports WHERE id=?`).get(params.id) as any);
  if (!row) return fail(ERROR_CODES.NOT_FOUND, '报告不存在');
  return ok({ reportId: row.id, score: row.score, details: JSON.parse(row.details) });
}
