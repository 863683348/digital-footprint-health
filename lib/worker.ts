import { getDb, newId } from './db';
import { estimateDelete } from './payment';
import type { DeleteJobDetail, DeleteJobItem, DeleteJobStatus } from './types';

const MAX_TOKENS = 50;
const WINDOW_MS = 15 * 60 * 1000;
const REFILL_PER_MS = MAX_TOKENS / WINDOW_MS;
const BATCH = 20;

const bucket = { tokens: MAX_TOKENS, last: Date.now() };
let timer: ReturnType<typeof setInterval> | null = null;

function refill() {
  const now = Date.now();
  bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + (now - bucket.last) * REFILL_PER_MS);
  bucket.last = now;
}

export function startWorker() {
  if (timer) return;
  timer = setInterval(() => {
    try {
      tick();
    } catch {
      /* swallow transient errors in background loop */
    }
  }, 400);
  if (typeof timer === 'object' && 'unref' in timer) (timer as any).unref?.();
}

function getNextRunningJob(): { id: string; dryRun: boolean; archiveId: string } | null {
  const db = getDb();
  const row = db
    .prepare(`SELECT id, dry_run AS dryRun, archive_id AS archiveId FROM delete_jobs WHERE status IN ('running','queued') ORDER BY created_at ASC LIMIT 1`)
    .get() as any;
  if (!row) return null;
  // promote queued -> running
  db.prepare(`UPDATE delete_jobs SET status='running' WHERE id=? AND status='queued'`).run(row.id);
  return { id: row.id, dryRun: !!row.dryRun, archiveId: row.archiveId };
}

export function tick(): boolean {
  const job = getNextRunningJob();
  if (!job) return false;
  refill();
  const db = getDb();
  const pending = db
    .prepare(`SELECT id, tweet_id AS tweetId, status FROM delete_job_items WHERE job_id=? AND status='pending' ORDER BY id ASC LIMIT ?`)
    .all(job.id, Math.max(0, Math.floor(bucket.tokens))) as any[];
  if (pending.length === 0) {
    // nothing pending -> if truly done, complete the job
    const remaining = (db.prepare(`SELECT COUNT(*) AS c FROM delete_job_items WHERE job_id=? AND status='pending'`).get(job.id) as any).c;
    if (remaining === 0) {
      db.prepare(`UPDATE delete_jobs SET status='completed' WHERE id=?`).run(job.id);
    }
    return true;
  }
  const n = Math.min(pending.length, BATCH);
  for (let i = 0; i < n; i++) {
    bucket.tokens -= 1;
    processItem(job, pending[i]);
  }
  return true;
}

function processItem(job: { id: string; dryRun: boolean }, item: { id: string; tweetId: string }) {
  const db = getDb();
  const tx = db.transaction(() => {
    let status: DeleteJobItem['status'] = 'done';
    let result = 'deleted';
    let charged = 0;
    if (job.dryRun) {
      // Simulated deletion — no real X API call, no real charge.
      const ok = Math.random() > 0.08;
      status = ok ? 'done' : 'failed';
      result = ok ? 'deleted (dry-run)' : 'simulated failure';
      charged = 0;
    } else {
      const r = realDelete(item.tweetId);
      status = r.ok ? 'done' : 'failed';
      result = r.ok ? 'deleted' : r.reason;
      charged = r.ok ? 0.07 : 0; // real fee recorded; actual charge via payment module
    }
    db.prepare(
      `UPDATE delete_job_items SET status=?, result=?, charged=? WHERE id=?`,
    ).run(status, result, charged, item.id);
    db.prepare(
      `UPDATE delete_jobs SET processed=processed+1, succeeded=succeeded+?, failed=failed+? WHERE id=?`,
    ).run(status === 'done' ? 1 : 0, status === 'failed' ? 1 : 0, job.id);
  });
  tx();
}

// Real X delete — skeleton. Requires OAuth token (not present in demo).
function realDelete(tweetId: string): { ok: boolean; reason: string } {
  // TODO: call DELETE /2/tweets/:id with stored OAuth token.
  void tweetId;
  return { ok: false, reason: 'no-oauth-token' };
}

// ---- Job control ----
export function createJob(archiveId: string, dryRun: boolean): { jobId: string; estimatedTotal: number; itemCount: number } {
  const db = getDb();
  const countRow = (db.prepare(`SELECT COUNT(*) AS c FROM tweets WHERE archive_id=?`).get(archiveId) as any);
  const count = countRow?.c ?? 0;
  if (count === 0) throw new Error('ARCHIVE_EMPTY');
  const est = estimateDelete(count);
  const jobId = newId('job');
  const tx = db.transaction(() => {
    db.prepare(
      `INSERT INTO delete_jobs (id, archive_id, status, dry_run, total, processed, succeeded, failed, estimated_total, created_at) VALUES (?,?, 'running', ?, ?, 0, 0, 0, ?, ?)`,
    ).run(jobId, archiveId, dryRun ? 1 : 0, count, est.total, new Date().toISOString());
    const ins = db.prepare(
      `INSERT INTO delete_job_items (id, job_id, tweet_id, status, result, charged) VALUES (?,?,?,'pending',NULL,0)`,
    );
    const tweets = db.prepare(`SELECT id FROM tweets WHERE archive_id=?`).all(archiveId) as any[];
    for (const t of tweets) ins.run(newId('it'), jobId, t.id);
  });
  tx();
  return { jobId, estimatedTotal: est.total, itemCount: count };
}

export function setJobStatus(jobId: string, status: DeleteJobStatus) {
  getDb().prepare(`UPDATE delete_jobs SET status=? WHERE id=?`).run(status, jobId);
}

export function getJobDetail(jobId: string): DeleteJobDetail | null {
  const db = getDb();
  const job = db.prepare(`SELECT * FROM delete_jobs WHERE id=?`).get(jobId) as any;
  if (!job) return null;
  const items = db.prepare(`SELECT id, tweet_id AS tweetId, status, result, charged FROM delete_job_items WHERE job_id=? ORDER BY id ASC`).all(jobId) as any[];
  return {
    job: {
      id: job.id,
      archiveId: job.archive_id,
      status: job.status,
      dryRun: !!job.dry_run,
      total: job.total,
      processed: job.processed,
      succeeded: job.succeeded,
      failed: job.failed,
      estimatedTotal: job.estimated_total,
      createdAt: job.created_at,
    },
    items: items as DeleteJobItem[],
  };
}

export function getJobItems(jobId: string, limit = 200): DeleteJobItem[] {
  const db = getDb();
  return db
    .prepare(`SELECT id, tweet_id AS tweetId, status, result, charged FROM delete_job_items WHERE job_id=? ORDER BY id ASC LIMIT ?`)
    .all(jobId, limit) as any[];
}
