// Shared API contract types — mirrors docs/phase2-arch.md §2.
// Used by both server routes and the frontend api-client.

import type { ParsedTweet } from './parse';

export type ApiError = { code: string; message: string };
export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

// ----- Domain models -----
export interface User {
  id: string;
  email: string | null;
  oauthConnected: boolean;
  plan: 'free' | 'pro';
  createdAt: string;
}

export interface Archive {
  id: string;
  userId: string;
  fileName: string;
  rowCount: number;
  status: 'uploaded' | 'parsing' | 'parsed' | 'failed';
  createdAt: string;
}

export interface Tweet {
  id: string;
  archiveId: string;
  createdAt: string;
  text: string;
  favoriteCount: number;
  hasMedia: boolean;
  mediaKind: string | null;
  mentionCount: number;
  piiFlag: boolean;
  locationFlag: boolean;
  sensitiveFlag: boolean;
}

export interface HealthReport {
  id: string;
  archiveId: string;
  score: number | null; // null when insufficientSample
  details: ScoreDetails;
  createdAt: string;
}

// Fully client-held archive (stored in localStorage after upload).
// The Vercel/serverless build keeps NO database, so the browser is the source
// of truth for the report + delete flow.
export interface ArchiveData {
  id: string;
  fileName: string;
  rowCount: number;
  tweets: ParsedTweet[];
  score: number | null;
  details: ScoreDetails;
  createdAt: string;
  insufficientSample: boolean;
}

export interface ScoreDimension {
  score: number; // 0..1
  weight: number;
  flagged: number; // count of tweets flagged in this dimension
}

export interface ScoreDetails {
  insufficientSample: boolean;
  sampleSize: number;
  dimensions: {
    pii: ScoreDimension;
    sensitive: ScoreDimension;
    location: ScoreDimension;
    old: ScoreDimension;
    account: ScoreDimension;
    media: ScoreDimension;
  };
  riskFlags: RiskFlag[];
}

export interface RiskFlag {
  kind: 'pii' | 'sensitive' | 'location' | 'old' | 'account' | 'media';
  severity: 'warn' | 'danger';
  tweetId?: string;
  label?: string; // localized on frontend; optional from API
}

// ----- Endpoint payloads -----
export interface ArchiveUploadResponse {
  archiveId: string;
  status: Archive['status'];
}
export interface ParseStatus {
  archiveId: string;
  status: Archive['status'];
  rowCount: number;
}
export interface ReportGenerateResponse {
  reportId: string;
  score: number | null;
  insufficientSample: boolean;
}
export interface ReportDetail {
  report: HealthReport;
  archive: Pick<Archive, 'id' | 'fileName' | 'rowCount'>;
}
export interface ScoreBreakdown {
  reportId: string;
  score: number | null;
  details: ScoreDetails;
}

export interface DeleteEstimate {
  tweetCount: number;
  tier: 'small' | 'medium' | 'large';
  baseFee: number;
  perTweetFee: number;
  total: number;
  ratePerTweet: number;
  currency: 'CNY';
}
export interface DeleteJobCreate {
  jobId: string;
  dryRun: boolean;
  estimatedTotal: number;
  itemCount: number;
}
export type DeleteJobStatus = 'queued' | 'running' | 'paused' | 'completed' | 'cancelled' | 'failed';
export interface DeleteJobItem {
  id: string;
  tweetId: string;
  status: 'pending' | 'processing' | 'done' | 'failed' | 'skipped';
  result: string | null;
  charged: number;
}

// Stateless dry-run simulation result (no DB, no job queue).
export interface DeleteSimItem {
  tweetId: string;
  status: 'done' | 'failed';
  result: string;
}
export interface DeleteSimResult {
  items: DeleteSimItem[];
  summary: { total: number; succeeded: number; failed: number };
}
export interface DeleteJobDetail {
  job: {
    id: string;
    archiveId: string;
    status: DeleteJobStatus;
    dryRun: boolean;
    total: number;
    processed: number;
    succeeded: number;
    failed: number;
    estimatedTotal: number;
    createdAt: string;
  };
  items: DeleteJobItem[];
}
export interface OAuthConnectResponse {
  authorizeUrl: string;
  state: string;
}
export interface BillingPlan {
  id: 'free' | 'single_small' | 'single_medium' | 'single_large' | 'pro_monthly' | 'pro_annual';
  price: number;
  currency: 'CNY';
}
export interface BillingInfo {
  plans: BillingPlan[];
  refundPolicyKey: string; // localized on frontend via i18n catalog
}

export const ERROR_CODES = {
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION: 'VALIDATION',
  PARSE_FAILED: 'PARSE_FAILED',
  ALREADY_RUNNING: 'ALREADY_RUNNING',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL: 'INTERNAL',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
} as const;
