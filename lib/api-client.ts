import type {
  ArchiveUploadResponse,
  ParseStatus,
  ReportGenerateResponse,
  ReportDetail,
  ScoreBreakdown,
  DeleteEstimate,
  DeleteJobCreate,
  DeleteJobDetail,
  DeleteJobItem,
  OAuthConnectResponse,
  BillingInfo,
} from './types';

const BASE = '/api';

// Carries the backend `code` so the UI can localize the message via i18n.
export class ApiError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(BASE + path, init);
  const j = await res.json();
  if (!j.ok) {
    throw new ApiError(j.error?.message || '请求失败', j.error?.code);
  }
  return j.data as T;
}

export const api = {
  login: () => req<{ userId: string; email: string }>('/auth/login', { method: 'POST' }),
  uploadArchive: (file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return req<ArchiveUploadResponse>('/archives/upload', { method: 'POST', body: fd });
  },
  parseStatus: (id: string) => req<ParseStatus>(`/archives/${id}/parse-status`),
  generateReport: (archiveId: string) =>
    req<ReportGenerateResponse>('/reports/generate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ archiveId }),
    }),
  getReport: (id: string) => req<ReportDetail>(`/reports/${id}`),
  getBreakdown: (id: string) => req<ScoreBreakdown>(`/reports/${id}/score-breakdown`),
  estimate: (archiveId: string) =>
    req<DeleteEstimate>('/delete-jobs/estimate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ archiveId }),
    }),
  createJob: (archiveId: string, dryRun: boolean) =>
    req<DeleteJobCreate>('/delete-jobs', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ archiveId, dryRun }),
    }),
  getJob: (id: string) => req<DeleteJobDetail>(`/delete-jobs/${id}`),
  pauseJob: (id: string) => req<{ status: string }>(`/delete-jobs/${id}/pause`, { method: 'POST' }),
  resumeJob: (id: string) => req<{ status: string }>(`/delete-jobs/${id}/resume`, { method: 'POST' }),
  cancelJob: (id: string) => req<{ status: string }>(`/delete-jobs/${id}/cancel`, { method: 'POST' }),
  getItems: (id: string) => req<{ jobId: string; items: DeleteJobItem[] }>(`/delete-jobs/${id}/items`),
  oauthConnect: () => req<OAuthConnectResponse>('/settings/oauth-connect', { method: 'POST' }),
  billing: () => req<BillingInfo>('/settings/billing'),
};
