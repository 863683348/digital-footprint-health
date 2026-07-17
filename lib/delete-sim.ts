import type { ParsedTweet } from './parse';
import type { DeleteSimItem, DeleteSimResult } from './types';

// Stateless dry-run simulation of tweet deletion. Pure function — no database,
// no job queue, no X API. Runs identically on the server or in the browser,
// which is what makes the delete flow safe on Vercel's ephemeral serverless fs.
//
// `dryRun` is always true in the demo (no OAuth token is present), so no real
// deletion or charge ever happens. `failRate` models the occasional simulated
// failure so the progress UI can show a "failed" state.
export function simulateDeletion(
  tweets: ParsedTweet[],
  opts?: { dryRun?: boolean; failRate?: number },
): DeleteSimResult {
  const dryRun = opts?.dryRun !== false;
  const failRate = opts?.failRate ?? 0.08;
  const items: DeleteSimItem[] = [];
  let succeeded = 0;
  let failed = 0;
  for (const t of tweets) {
    const ok = Math.random() > failRate;
    if (ok) {
      succeeded++;
      items.push({ tweetId: t.id, status: 'done', result: dryRun ? 'deleted (dry-run)' : 'deleted' });
    } else {
      failed++;
      items.push({
        tweetId: t.id,
        status: 'failed',
        result: dryRun ? 'simulated failure' : 'failed',
      });
    }
  }
  return { items, summary: { total: tweets.length, succeeded, failed } };
}
