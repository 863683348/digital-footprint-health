import { NextRequest, NextResponse } from 'next/server';
import { parseSession, SESSION_COOKIE, SessionUser } from '@/lib/session';

export const runtime = 'nodejs';

// Returns the current session (or null) as JSON so the client NavBar can
// render the signed-in / signed-out state without reading the httpOnly cookie.
export async function GET(req: NextRequest) {
  const user = parseSession(req.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ user: (user as SessionUser | null) ?? null });
}
