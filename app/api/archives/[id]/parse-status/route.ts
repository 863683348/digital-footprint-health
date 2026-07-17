import { getDb } from '@/lib/db';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const row = (getDb().prepare(`SELECT id, status, row_count AS rowCount FROM archives WHERE id=?`).get(params.id) as any);
  if (!row) return fail(ERROR_CODES.NOT_FOUND, '归档不存在');
  return ok({ archiveId: row.id, status: row.status, rowCount: row.rowCount });
}
