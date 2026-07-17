import fs from 'node:fs';
import path from 'node:path';
import { getDb } from '@/lib/db';
import { parseArchiveFile, persistUpload } from '@/lib/parse';
import { encrypt } from '@/lib/crypto';
import { getUserId } from '@/lib/session';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';

export async function POST(req: Request) {
  const uid = getUserId();
  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return fail(ERROR_CODES.VALIDATION, '缺少上传文件');
  const name = file.name || 'archive';
  if (!/\.(csv|js|json)$/i.test(name)) return fail(ERROR_CODES.VALIDATION, '仅支持 X 归档的 CSV / JS 文件');

  const buf = Buffer.from(await file.arrayBuffer());
  const tmpDir = path.join(process.cwd(), 'data', 'tmp');
  fs.mkdirSync(tmpDir, { recursive: true });
  const ext = name.split('.').pop() || 'csv';
  const tmpPath = path.join(tmpDir, `${Date.now()}.${ext}`);
  fs.writeFileSync(tmpPath, buf);

  const parsed = parseArchiveFile(tmpPath);
  if (parsed.length === 0) {
    fs.unlinkSync(tmpPath);
    return fail(ERROR_CODES.PARSE_FAILED, '未能解析出推文，请确认是 Twitter/X 归档文件');
  }

  const archiveId = persistUpload(name, encrypt(buf.toString('utf8')));
  const db = getDb();
  const tx = db.transaction(() => {
    db.prepare(
      `INSERT INTO archives (id, user_id, file_name, row_count, status, created_at) VALUES (?,?,?,?,'parsed',?)`,
    ).run(archiveId, uid, name, parsed.length, new Date().toISOString());
    const ins = db.prepare(
      `INSERT INTO tweets (id, archive_id, created_at, text, favorite_count, has_media, media_kind, mention_count, pii_flag, location_flag, sensitive_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    );
    for (const t of parsed) {
      ins.run(
        t.id, archiveId, t.createdAt, t.text, t.favoriteCount,
        t.hasMedia ? 1 : 0, t.mediaKind, t.mentionCount,
        t.piiFlag ? 1 : 0, t.locationFlag ? 1 : 0, t.sensitiveFlag ? 1 : 0,
      );
    }
  });
  tx();
  fs.unlinkSync(tmpPath);

  return ok({ archiveId, status: 'parsed' as const });
}
