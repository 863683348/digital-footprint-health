import type { ArchiveData, BillingInfo } from './types';

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

// The server is now pure stateless compute:
//  - uploadArchive: parse + score, returns the full archive (no DB write)
//  - billing: static pricing config
// All archive state thereafter lives in the browser (see lib/store.ts).
export const api = {
  uploadArchive: (file: File): Promise<{ archiveId: string; archive: ArchiveData }> => {
    const fd = new FormData();
    fd.append('file', file);
    return req<{ archiveId: string; archive: ArchiveData }>('/archives/upload', {
      method: 'POST',
      body: fd,
    });
  },
  billing: () => req<BillingInfo>('/settings/billing'),
};
