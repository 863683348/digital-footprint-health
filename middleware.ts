import { NextResponse, type NextRequest } from 'next/server';

/**
 * Rate limiting for the upload API (stateless, Vercel-friendly).
 *
 * Production path: set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN in the
 * Vercel project. A shared, multi-instance limiter via @upstash/ratelimit is then
 * used automatically (lazy-loaded only when configured).
 *
 * Fallback path (current, no creds): an in-memory sliding window per function
 * instance. It still throttles abusive callers; on Vercel's multi-instance edge it
 * is per-instance rather than global, so treat it as defense-in-depth until Upstash
 * is wired up.
 */

const LIMIT = 10; // requests
const WINDOW = '10 s';
const WINDOW_MS = 10_000;

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

// ---- Upstash (lazy, only when env configured) ----
type Ratelimit = import('@upstash/ratelimit').Ratelimit;
let rl: Ratelimit | null = null;
let rlInit: Promise<Ratelimit | null> | null = null;

function getRatelimit(): Promise<Ratelimit | null> {
  if (rl) return Promise.resolve(rl);
  if (!hasUpstash) return Promise.resolve(null);
  if (!rlInit) {
    rlInit = (async () => {
      const { Ratelimit } = await import('@upstash/ratelimit');
      const { Redis } = await import('@upstash/redis');
      rl = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
        prefix: 'dfh-upload',
        analytics: false,
      });
      return rl;
    })();
  }
  return rlInit;
}

// ---- In-memory fallback (no external dependency) ----
const hits = new Map<string, { count: number; reset: number }>();

function memLimit(ip: string): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return { success: true, remaining: LIMIT - 1, reset: now + WINDOW_MS };
  }
  if (rec.count >= LIMIT) {
    return { success: false, remaining: 0, reset: rec.reset };
  }
  rec.count += 1;
  return { success: true, remaining: LIMIT - rec.count, reset: rec.reset };
}

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname !== '/api/archives/upload') {
    return NextResponse.next();
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'anonymous';

  const limiter = await getRatelimit();
  let res: { success: boolean; remaining: number; reset: number };
  if (limiter) {
    const r = await limiter.limit(ip);
    res = { success: r.success, remaining: r.remaining, reset: r.reset };
  } else {
    res = memLimit(ip);
  }

  if (!res.success) {
    const retryAfter = Math.max(1, Math.ceil((res.reset - Date.now()) / 1000));
    return new NextResponse(
      JSON.stringify({
        ok: false,
        error: { code: 'TOO_MANY_REQUESTS', message: '请求过于频繁，请稍后再试' },
      }),
      {
        status: 429,
        headers: {
          'content-type': 'application/json',
          'retry-after': String(retryAfter),
        },
      },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/archives/upload'],
};
