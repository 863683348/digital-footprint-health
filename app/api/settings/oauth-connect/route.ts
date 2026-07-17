import crypto from 'node:crypto';
import { ok } from '@/lib/resp';

// OAuth 2.0 PKCE skeleton for X/Twitter. Real exchange requires a client id/secret
// and a callback handler — out of scope for the local MVP, but the PKCE math is real.
export async function POST() {
  const verifier = crypto.randomBytes(32).toString('base64url');
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
  const state = crypto.randomBytes(8).toString('hex');
  const redirectUri = 'http://localhost:3000/callback';
  const authorizeUrl =
    `https://twitter.com/i/oauth2/authorize?response_type=code` +
    `&client_id=DFH_CLIENT_ID&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent('tweet.write users.read')}` +
    `&state=${state}&code_challenge=${challenge}&code_challenge_method=S256`;

  // In production: persist { state -> verifier } (encrypted) for the token exchange step.
  return ok({ authorizeUrl, state });
}
