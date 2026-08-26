import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = '863683348/digital-footprint-health';
const BRANCH = 'main';
const TOKEN_PATH = 'C:/Users/l\'x/WorkBuddy/2026-07-15-01-50-53/.workbuddy/gh-token.txt';

const token = fs.readFileSync(TOKEN_PATH, 'utf8').trim();
const apiBase = `https://api.github.com/repos/${REPO}/contents`;

const files = [
  'content/posts.ts',
  'app/blog/[slug]/page.tsx',
];

async function pushFile(relPath) {
  const apiPath = relPath.replace('[slug]', encodeURIComponent('[slug]'));
  const url = `${apiBase}/${apiPath}?ref=${BRANCH}`;

  const getRes = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  let sha;
  if (getRes.status === 200) {
    sha = (await getRes.json()).sha;
  } else if (getRes.status === 404) {
    sha = undefined;
  } else {
    throw new Error(`GET ${relPath} failed: ${getRes.status} ${await getRes.text()}`);
  }

  const content = fs.readFileSync(path.join(__dirname, relPath), 'utf8');
  const body = {
    message: 'feat(blog): day 11 add anatomy-of-a-footprint-report + JSON-LD on detail page',
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify(body),
  });

  const putData = await putRes.json();
  if (putRes.status >= 200 && putRes.status < 300) {
    console.log(`OK  ${relPath}  -> commit ${putData.commit && putData.commit.sha}`);
    return putData.commit && putData.commit.sha;
  }
  throw new Error(`PUT ${relPath} failed: ${putRes.status} ${JSON.stringify(putData)}`);
}

let ok = true;
for (const f of files) {
  try {
    await pushFile(f);
  } catch (e) {
    ok = false;
    console.error(e.message);
  }
}
process.exit(ok ? 0 : 1);
