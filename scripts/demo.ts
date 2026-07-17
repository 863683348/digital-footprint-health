// Headless demo of the MVP engine — no HTTP, no X credentials, no database.
// Proves the stateless pipeline: parse -> score -> dry-run simulate.
import path from 'node:path';
import { parseArchiveFile } from '../lib/parse';
import { scoreArchive } from '../lib/scoring';
import { simulateDeletion } from '../lib/delete-sim';

const sample = path.join(process.cwd(), 'data', 'sample', 'tweets.csv');

function section(title: string) {
  console.log(`\n=== ${title} ===`);
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

section('3. Dry-run delete simulation (stateless)');
const sim = simulateDeletion(parsed, { dryRun: true });
console.log(
  `total=${sim.summary.total} succeeded=${sim.summary.succeeded} failed=${sim.summary.failed}`,
);

console.log('\nDEMO OK — full loop works without any database or X credentials.');
