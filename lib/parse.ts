import fs from 'node:fs';
import path from 'node:path';
import { parse as parseCsvSync } from 'csv-parse/sync';
import {
  detectPii,
  detectSensitive,
  detectLocation,
  detectMedia,
  countMentions,
} from './signals';

export interface ParsedTweet {
  id: string;
  createdAt: string; // ISO
  text: string;
  favoriteCount: number;
  hasMedia: boolean;
  mediaKind: string | null;
  mentionCount: number;
  piiFlag: boolean;
  locationFlag: boolean;
  sensitiveFlag: boolean;
}

function pick(record: Record<string, string>, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = record[k];
    if (v !== undefined && v !== '') return v;
  }
  return undefined;
}

function toIso(raw: string): string {
  const d = new Date(raw);
  if (!isNaN(d.getTime())) return d.toISOString();
  return raw;
}

// ---- CSV (tweets.csv) ----
function parseCsv(buf: Buffer): ParsedTweet[] {
  const text = buf.toString('utf8');
  const records = parseCsvSync(text, { columns: true, skip_empty_lines: true, relax_quotes: true });
  const out: ParsedTweet[] = [];
  for (const r of records as Record<string, string>[]) {
    const id = pick(r, ['tweet_id', 'id', 'id_str']);
    const created = pick(r, ['created_at', 'createdAt', 'timestamp']);
    const textVal = pick(r, ['text', 'full_text', 'content']) ?? '';
    if (!id) continue;
    out.push(normalize(id, created ?? '', textVal, Number(pick(r, ['favorite_count', 'favorites', 'like_count']) || 0)));
  }
  return out;
}

// ---- JS (tweets.js) ----
function extractJsonArray(text: string): string | null {
  const start = text.indexOf('[');
  if (start < 0) return null;
  let depth = 0;
  let inStr = false;
  let esc = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

function parseJs(buf: Buffer): ParsedTweet[] {
  const text = buf.toString('utf8');
  const arrStr = extractJsonArray(text);
  if (!arrStr) return [];
  const arr = JSON.parse(arrStr) as any[];
  const out: ParsedTweet[] = [];
  for (const item of arr) {
    const t = item.tweet ?? item;
    const id = String(t.id ?? t.id_str ?? '');
    if (!id) continue;
    const rawText = t.full_text ?? t.text ?? '';
    const fav = Number(t.favorite_count ?? t.favorite_count ?? 0) || 0;
    const hasMedia = !!(t.extended_entities?.media?.length || t.entities?.media?.length);
    const mediaKind = hasMedia
      ? String(t.extended_entities?.media?.[0]?.type ?? t.entities?.media?.[0]?.type ?? 'media')
      : null;
    out.push(normalize(id, t.created_at ?? '', rawText, fav, hasMedia, mediaKind));
  }
  return out;
}

function normalize(
  id: string,
  created: string,
  text: string,
  favoriteCount: number,
  hasMedia = false,
  mediaKind: string | null = null,
): ParsedTweet {
  const pii = detectPii(text);
  const sensitive = detectSensitive(text);
  const location = detectLocation(text);
  return {
    id,
    createdAt: toIso(created),
    text,
    favoriteCount: Number.isFinite(favoriteCount) ? favoriteCount : 0,
    hasMedia,
    mediaKind,
    mentionCount: countMentions(text),
    piiFlag: pii >= 0.5,
    locationFlag: location >= 0.5,
    sensitiveFlag: sensitive >= 0.5,
  };
}

// Public: parse an uploaded archive file (CSV or JS) into deduped tweets.
export function parseArchiveFile(filePath: string): ParsedTweet[] {
  const buf = fs.readFileSync(filePath);
  const lower = filePath.toLowerCase();
  const parsed = lower.endsWith('.js') || lower.endsWith('.json') ? parseJs(buf) : parseCsv(buf);
  // dedupe by id, keep first
  const seen = new Set<string>();
  const out: ParsedTweet[] = [];
  for (const t of parsed) {
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    out.push(t);
  }
  return out;
}

export function persistUpload(fileName: string, encryptedPayload: string): string {
  const dir = path.join(process.cwd(), 'data', 'archives');
  fs.mkdirSync(dir, { recursive: true });
  const id = `arc_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  fs.writeFileSync(path.join(dir, `${id}.enc`), encryptedPayload, 'utf8');
  return id;
}
