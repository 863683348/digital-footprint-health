import { parseArchiveBuffer } from '@/lib/parse';
import { scoreArchive } from '@/lib/scoring';
import { ok, fail } from '@/lib/resp';
import { ERROR_CODES } from '@/lib/types';
import type { ArchiveData } from '@/lib/types';

export const runtime = 'nodejs';

// Stateless upload: parse + score the archive in memory and return the full
// ArchiveData. No database, no disk persistence — the client stores it in
// localStorage. This is what makes the app deployable on Vercel's ephemeral
// serverless filesystem.
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file');
  if (!(file instanceof File)) return fail(ERROR_CODES.VALIDATION, '缺少上传文件');
  const name = file.name || 'archive';
  if (!/\.(csv|js|json)$/i.test(name)) return fail(ERROR_CODES.VALIDATION, '仅支持 X 归档的 CSV / JS 文件');

  const buf = Buffer.from(await file.arrayBuffer());
  const parsed = parseArchiveBuffer(buf, name);
  if (parsed.length === 0) {
    return fail(ERROR_CODES.PARSE_FAILED, '未能解析出推文，请确认是 Twitter/X 归档文件');
  }

  const { score, details } = scoreArchive(parsed);
  const archiveId = crypto.randomUUID();
  const archive: ArchiveData = {
    id: archiveId,
    fileName: name,
    rowCount: parsed.length,
    tweets: parsed,
    score,
    details,
    createdAt: new Date().toISOString(),
    insufficientSample: details.insufficientSample,
  };

  return ok({ archiveId, archive });
}
