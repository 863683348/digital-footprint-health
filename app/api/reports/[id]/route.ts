import { getDb } from '@/lib/db';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const db = getDb();
  const row = (db
    .prepare(
      `SELECT r.id, r.archive_id AS archiveId, r.score, r.details, r.created_at AS createdAt,
              a.file_name AS fileName, a.row_count AS rowCount
       FROM health_reports r JOIN archives a ON a.id=r.archive_id WHERE r.id=?`,
    )
    .get(params.id) as any);
  if (!row) return fail(ERROR_CODES.NOT_FOUND, '报告不存在');
  return ok({
    report: {
      id: row.id, archiveId: row.archiveId, score: row.score,
      details: JSON.parse(row.details), createdAt: row.createdAt,
    },
    archive: { id: row.archiveId, fileName: row.fileName, rowCount: row.rowCount },
  });
}
