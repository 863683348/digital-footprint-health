import { getDb, newId } from '@/lib/db';
import { scoreArchive } from '@/lib/scoring';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';
import type { ParsedTweet } from '@/lib/parse';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const archiveId: string = body.archiveId;
  if (!archiveId) return fail(ERROR_CODES.VALIDATION, '缺少 archiveId');

  const db = getDb();
  const rows = db
    .prepare(
      `SELECT id, created_at AS createdAt, text, favorite_count AS favoriteCount, has_media AS hasMedia,
              media_kind AS mediaKind, mention_count AS mentionCount, pii_flag AS piiFlag,
              location_flag AS locationFlag, sensitive_flag AS sensitiveFlag
       FROM tweets WHERE archive_id=?`,
    )
    .all(archiveId) as any[];
  if (!rows.length) return fail(ERROR_CODES.NOT_FOUND, '归档暂无推文');

  const tweets: ParsedTweet[] = rows.map((r: any) => ({
    id: r.id, createdAt: r.createdAt, text: r.text, favoriteCount: r.favoriteCount,
    hasMedia: !!r.hasMedia, mediaKind: r.mediaKind, mentionCount: r.mentionCount,
    piiFlag: !!r.piiFlag, locationFlag: !!r.locationFlag, sensitiveFlag: !!r.sensitiveFlag,
  }));

  const { score, details } = scoreArchive(tweets);
  const reportId = newId('rep');
  db.prepare(`INSERT INTO health_reports (id, archive_id, score, details, created_at) VALUES (?,?,?,?,?)`).run(
    reportId, archiveId, score, JSON.stringify(details), new Date().toISOString(),
  );
  return ok({ reportId, score, insufficientSample: details.insufficientSample });
}
