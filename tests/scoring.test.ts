import { describe, it, expect } from 'vitest';
import { scoreArchive } from '../lib/scoring';
import type { ParsedTweet } from '../lib/parse';

function mk(p: Partial<ParsedTweet> & { id: string }): ParsedTweet {
  return {
    id: p.id,
    createdAt: p.createdAt ?? '2025-01-01T00:00:00Z',
    text: p.text ?? '',
    favoriteCount: p.favoriteCount ?? 0,
    hasMedia: p.hasMedia ?? false,
    mediaKind: p.mediaKind ?? null,
    mentionCount: p.mentionCount ?? 0,
    piiFlag: p.piiFlag ?? false,
    locationFlag: p.locationFlag ?? false,
    sensitiveFlag: p.sensitiveFlag ?? false,
  };
}

const NOW = new Date('2026-07-13T00:00:00Z').getTime();

describe('scoreArchive', () => {
  it('returns null score when sample < 10 (insufficientSample)', () => {
    const few = Array.from({ length: 9 }, (_, i) => mk({ id: 'x' + i }));
    const r = scoreArchive(few, { now: NOW });
    expect(r.score).toBeNull();
    expect(r.details.insufficientSample).toBe(true);
  });

  it('scores a clean recent archive high', () => {
    const clean = Array.from({ length: 12 }, (_, i) =>
      mk({ id: 'c' + i, createdAt: '2025-06-01T00:00:00Z', text: '今天天气不错' }),
    );
    const r = scoreArchive(clean, { now: NOW });
    expect(r.score).not.toBeNull();
    expect(r.score!).toBeGreaterThan(85);
  });

  it('scores a fully risky old archive very low', () => {
    const risky = Array.from({ length: 12 }, (_, i) =>
      mk({
        id: 'r' + i,
        createdAt: '2013-01-01T00:00:00Z',
        text: '我家在北京市 手机号13800138000 确诊糖尿病',
        hasMedia: true,
        mediaKind: 'photo',
        piiFlag: true,
        locationFlag: true,
        sensitiveFlag: true,
      }),
    );
    const r = scoreArchive(risky, { now: NOW });
    expect(r.score!).toBeLessThan(30);
  });
});
