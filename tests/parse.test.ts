import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseArchiveFile } from '../lib/parse';

function tmpFile(name: string, content: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dfh-'));
  const p = path.join(dir, name);
  fs.writeFileSync(p, content);
  return p;
}

describe('parseArchiveFile', () => {
  it('parses CSV and detects PII', () => {
    const csv = `tweet_id,created_at,text,favorite_count
a1,2020-01-01T00:00:00+0000,我的手机号13800138000,3
a2,2021-02-02T00:00:00+0000,普通内容,1`;
    const p = tmpFile('t.csv', csv);
    const tweets = parseArchiveFile(p);
    expect(tweets.length).toBe(2);
    expect(tweets[0].piiFlag).toBe(true);
    expect(tweets[1].piiFlag).toBe(false);
  });

  it('dedupes by tweet id', () => {
    const csv = `tweet_id,created_at,text
b1,2020-01-01T00:00:00+0000,内容一
b1,2020-01-01T00:00:00+0000,内容一重复`;
    const p = tmpFile('d.csv', csv);
    const tweets = parseArchiveFile(p);
    expect(tweets.length).toBe(1);
  });

  it('parses JS archive (window.YTD...)', () => {
    const js = `window.YTD.tweets.part0 = [
      {"tweet":{"id":"j1","created_at":"2019-03-03T00:00:00+0000","full_text":"带图 https://t.co/x photo","extended_entities":{"media":[{"type":"photo"}]}}},
      {"tweet":{"id":"j2","created_at":"2020-04-04T00:00:00+0000","full_text":"@friend 你好"}}
    ];`;
    const p = tmpFile('t.js', js);
    const tweets = parseArchiveFile(p);
    expect(tweets.length).toBe(2);
    expect(tweets[0].hasMedia).toBe(true);
    expect(tweets[1].mentionCount).toBe(1);
  });
});
