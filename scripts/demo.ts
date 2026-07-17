// Headless demo of the MVP engine — no HTTP, no X credentials.
// Proves: parse -> score -> create dry-run delete job -> worker loop.
import path from 'node:path';
import { getDb, newId } from '../lib/db';
import { parseArchiveFile } from '../lib/parse';
import { scoreArchive } from '../lib/scoring';
import { createJob, tick, getJobDetail } from '../lib/worker';

const sample = path.join(process.cwd(), 'data', 'sample', 'tweets.csv');

function section(t: string) {
  console.log(`\n=== ${t} ===`);
}

section('1. Parse archive');
const parsed = parseArchiveFile(sample);
console.log(`parsed ${parsed.length} tweets`);

section('2. Score archive');
const { score, details } = scoreArchive(parsed);
console.log('health score:', score);
console.log(
  'dimensions:',
  Object.fromEntries(Object.entries(details.dimensions).map(([k, d]) => [k, d.score])),
);
console.log('risk flags:', details.riskFlags.length);
console.log('insufficient sample?', details.insufficientSample);

section('3. Persist + create dry-run delete job');
const db = getDb();
const archiveId = newId('arc');
db.prepare(
  `INSERT INTO archives (id, user_id, file_name, row_count, status, created_at) VALUES (?,?,?,?,'parsed',?)`,
).run(archiveId, 'usr_demo', 'tweets.csv', parsed.length, new Date().toISOString());
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
const { jobId, estimatedTotal, itemCount } = createJob(archiveId, true);
console.log(`job ${jobId} | items ${itemCount} | est ¥${estimatedTotal}`);

section('4. Run worker loop (dry-run, simulated deletes)');
let guard = 0;
while (guard++ < 500) {
  tick();
  const d = getJobDetail(jobId);
  if (d && (d.job.status === 'completed' || d.job.status === 'failed' || d.job.status === 'cancelled')) break;
}
const final = getJobDetail(jobId)!;
console.log(
  `final status=${final.job.status} processed=${final.job.processed} succeeded=${final.job.succeeded} failed=${final.job.failed}`,
);
console.log('\nDEMO OK — full loop works without any X credentials.');
