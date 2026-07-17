import { ok } from '@/lib/resp';
import { ensureDemoUser, DEMO_USER_ID } from '@/lib/session';

export async function POST() {
  const userId = ensureDemoUser();
  const res = ok({ userId, email: 'demo@local.dev' });
  res.cookies.set('dfh_uid', DEMO_USER_ID, { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
