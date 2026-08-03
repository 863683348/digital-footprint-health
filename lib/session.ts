// Minimal, dependency-free session for Google OAuth identity binding.
// The product is stateless by design; login is OPTIONAL and only used to
// bind a user identity for future paid / deletion features. We encode the
// Google profile in an HMAC-signed, httpOnly cookie — no database, no JWT lib.

import crypto from 'crypto';

export interface SessionUser {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export const SESSION_COOKIE = 'dfh_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Dev fallback only. Production MUST set AUTH_SECRET (Vercel env var).
const SECRET = process.env.AUTH_SECRET || 'dev-insecure-secret-change-me';

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString('base64url');
}

function sign(payloadB64: string): string {
  return crypto.createHmac('sha256', SECRET).update(payloadB64).digest('base64url');
}

export function serializeSession(user: SessionUser): string {
  const payloadB64 = b64url(JSON.stringify(user));
  const sig = sign(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function parseSession(token: string | undefined | null): SessionUser | null {
  if (!token || !token.includes('.')) return null;
  const [payloadB64, sig] = token.split('.');
  const expected = sign(payloadB64);

  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const user = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as SessionUser;
    if (!user.sub || !user.email) return null;
    return user;
  } catch {
    return null;
  }
}
