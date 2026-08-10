import type { BillingInfo } from './types';

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

// The browser parses + scores the archive locally (see app/upload/page.tsx),
// so no upload endpoint is needed. The only remaining server call is the
// static billing config.
export const api = {
  billing: () => req<BillingInfo>('/settings/billing'),
};
