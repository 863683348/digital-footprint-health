import type { ArchiveData, DeleteSimResult } from './types';

// Client-side persistence for the archive + delete simulation result.
// On Vercel's serverless platform there is no durable database, so the browser
// holds the state for the multi-step "upload -> report -> delete" flow. This is
// also privacy-friendly: nothing is ever written to a server.

const ARCHIVE_PREFIX = 'dfh:arc:';
const SIM_PREFIX = 'dfh:sim:';

function safeGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* quota exceeded or storage disabled — ignore, flow still works in-memory */
  }
}

export function saveArchive(a: ArchiveData): void {
  safeSet(ARCHIVE_PREFIX + a.id, JSON.stringify(a));
}

export function loadArchive(id: string): ArchiveData | null {
  const raw = safeGet(ARCHIVE_PREFIX + id);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ArchiveData;
  } catch {
    return null;
  }
}

export function saveSim(archiveId: string, r: DeleteSimResult): void {
  safeSet(SIM_PREFIX + archiveId, JSON.stringify(r));
}

export function loadSim(archiveId: string): DeleteSimResult | null {
  const raw = safeGet(SIM_PREFIX + archiveId);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DeleteSimResult;
  } catch {
    return null;
  }
}
