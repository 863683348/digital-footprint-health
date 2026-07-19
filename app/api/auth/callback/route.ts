import { NextRequest, NextResponse } from 'next/server';
import { serializeSession, SESSION_COOKIE, SESSION_MAX_AGE, SessionUser } from '@/lib/session';

export const runtime = 'nodejs';

// Step 2: Google redirects back here with ?code & ?state.
// Verify state, exchange code for tokens, fetch profile, set session cookie.
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const origin = url.origin;
  const home = `${origin}/`;

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = req.cookies.get('oauth_state')?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(`${home}?auth=error`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${home}?auth=error`);
  }

  const redirectUri = `${origin}/api/auth/callback`;

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    if (!tokenRes.ok) return NextResponse.redirect(`${home}?auth=error`);

    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.access_token as string | undefined;
    if (!accessToken) return NextResponse.redirect(`${home}?auth=error`);

    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userRes.ok) return NextResponse.redirect(`${home}?auth=error`);

    const profile = await userRes.json();
    const user: SessionUser = {
      sub: profile.sub,
      email: profile.email,
      name: profile.name || profile.email,
      picture: profile.picture,
    };

    const res = NextResponse.redirect(`${home}?auth=ok`);
    res.cookies.set(SESSION_COOKIE, serializeSession(user), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_MAX_AGE,
    });
    res.cookies.delete('oauth_state');
    return res;
  } catch {
    return NextResponse.redirect(`${home}?auth=error`);
  }
}
