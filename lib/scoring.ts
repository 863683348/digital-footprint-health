import type { ParsedTweet } from './parse';
import type { ScoreDetails, ScoreDimension, RiskFlag } from './types';
import { detectPii, detectSensitive, detectLocation, detectMedia, ageScore } from './signals';

const WEIGHTS = {
  pii: 0.25,
  sensitive: 0.2,
  location: 0.15,
  old: 0.15,
  account: 0.15,
  media: 0.1,
} as const;

export const INSUFFICIENT_SAMPLE_THRESHOLD = 10;

function mean(xs: number[]): number {
  if (xs.length === 0) return 0;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

function dim(score: number, weight: number, flagged: number): ScoreDimension {
  return { score: round3(score), weight, flagged };
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

function accountScore(sampleSize: number, hasContact: boolean): number {
  let base = 0.3;
  if (sampleSize >= 50) base = 0.5;
  if (sampleSize >= 200) base = 0.7;
  if (sampleSize >= 1000) base = 0.9;
  return Math.min(1, base + (hasContact ? 0.1 : 0));
}

export interface ScoreResult {
  score: number | null; // null when insufficientSample
  details: ScoreDetails;
}

export function scoreArchive(tweets: ParsedTweet[], opts?: { now?: number }): ScoreResult {
  const now = opts?.now ?? Date.now();
  const sampleSize = tweets.length;

  if (sampleSize < INSUFFICIENT_SAMPLE_THRESHOLD) {
    const emptyDim = (w: number) => dim(0, w, 0);
    const details: ScoreDetails = {
      insufficientSample: true,
      sampleSize,
      dimensions: {
        pii: emptyDim(WEIGHTS.pii),
        sensitive: emptyDim(WEIGHTS.sensitive),
        location: emptyDim(WEIGHTS.location),
        old: emptyDim(WEIGHTS.old),
        account: emptyDim(WEIGHTS.account),
        media: emptyDim(WEIGHTS.media),
      },
      riskFlags: [],
    };
    return { score: null, details };
  }

  const piiVals = tweets.map((t) => detectPii(t.text));
  const sensVals = tweets.map((t) => detectSensitive(t.text));
  const locVals = tweets.map((t) => detectLocation(t.text));
  const mediaVals = tweets.map((t) => detectMedia(t.text, t.hasMedia));
  const oldVals = tweets.map((t) => {
    const ms = new Date(t.createdAt).getTime();
    return isNaN(ms) ? 0 : ageScore(ms, now);
  });
  const hasContact = piiVals.some((v) => v > 0);
  const acc = accountScore(sampleSize, hasContact);

  const dimensions = {
    pii: dim(mean(piiVals), WEIGHTS.pii, tweets.filter((t) => t.piiFlag).length),
    sensitive: dim(mean(sensVals), WEIGHTS.sensitive, tweets.filter((t) => t.sensitiveFlag).length),
    location: dim(mean(locVals), WEIGHTS.location, tweets.filter((t) => t.locationFlag).length),
    old: dim(mean(oldVals), WEIGHTS.old, oldVals.filter((v) => v >= 0.75).length),
    account: dim(acc, WEIGHTS.account, 0),
    media: dim(mean(mediaVals), WEIGHTS.media, tweets.filter((t) => t.hasMedia).length),
  };

  const weighted =
    dimensions.pii.score * WEIGHTS.pii +
    dimensions.sensitive.score * WEIGHTS.sensitive +
    dimensions.location.score * WEIGHTS.location +
    dimensions.old.score * WEIGHTS.old +
    dimensions.account.score * WEIGHTS.account +
    dimensions.media.score * WEIGHTS.media;

  const health = Math.max(0, Math.min(100, Math.round(100 - 100 * weighted)));

  const riskFlags = buildRiskFlags(tweets, dimensions);
  const details: ScoreDetails = {
    insufficientSample: false,
    sampleSize,
    dimensions,
    riskFlags,
  };
  return { score: health, details };
}

// Risk flags carry only structured `kind` + `severity`; the human-readable label
// is localized on the frontend via the i18n catalog (keyed by `kind`).
function buildRiskFlags(tweets: ParsedTweet[], dims: ScoreDetails['dimensions']): RiskFlag[] {
  const flags: RiskFlag[] = [];
  for (const t of tweets) {
    if (t.piiFlag) flags.push({ kind: 'pii', severity: 'danger', tweetId: t.id });
    else if (t.sensitiveFlag) flags.push({ kind: 'sensitive', severity: 'danger', tweetId: t.id });
    else if (t.locationFlag) flags.push({ kind: 'location', severity: 'warn', tweetId: t.id });
  }
  if (dims.account.flagged === 0 && dims.account.score >= 0.7) {
    flags.push({ kind: 'account', severity: 'warn' });
  }
  // cap payload size
  return flags.slice(0, 50);
}
