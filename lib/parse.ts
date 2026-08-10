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
// Minimal RFC-4180-ish parser, no external dependency so this module can run
// in the browser. Handles quoted fields with embedded commas / newlines / the
// "" escape. A quote that appears mid-field (relax_quotes behavior) is treated
// as a literal character. Returns normalized tweets directly.
function parseCsv(text: string): ParsedTweet[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  const n = text.length;
  let i = 0;
  while (i < n) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"' && field === '') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ',') {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (c === '\r') {
      i++;
      continue;
    }
    if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    field += c;
    i++;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  if (rows.length === 0) return [];
  const header = rows[0].map((h) => h.trim());
  const out: ParsedTweet[] = [];
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    if (cells.length === 1 && cells[0] === '') continue; // skip blank lines
    const rec: Record<string, string> = {};
    for (let c = 0; c < header.length; c++) rec[header[c]] = cells[c] ?? '';
    const id = pick(rec, ['tweet_id', 'id', 'id_str']);
    if (!id) continue;
    const created = pick(rec, ['created_at', 'createdAt', 'timestamp']);
    const textVal = pick(rec, ['text', 'full_text', 'content']) ?? '';
    out.push(
      normalize(
        id,
        created ?? '',
        textVal,
        Number(pick(rec, ['favorite_count', 'favorites', 'like_count']) || 0),
      ),
    );
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
    if (esc) {
      esc = false;
      continue;
    }
    if (c === '\\') {
      esc = true;
      continue;
    }
    if (c === '"') {
      inStr = !inStr;
      continue;
    }
    if (inStr) continue;
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

function parseJs(text: string): ParsedTweet[] {
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

// Public: parse an archive's text content (CSV or JS) into deduped tweets.
// Runs entirely in the browser — the archive file never leaves the user's
// device, which is what keeps origin transfer (Fast Origin Transfer) at ~0 for
// the upload flow and honors the "100% on-device" privacy promise.
export function parseArchiveString(text: string, fileName: string): ParsedTweet[] {
  const lower = fileName.toLowerCase();
  const parsed = lower.endsWith('.js') || lower.endsWith('.json') ? parseJs(text) : parseCsv(text);
  const seen = new Set<string>();
  const out: ParsedTweet[] = [];
  for (const t of parsed) {
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    out.push(t);
  }
  return out;
}
