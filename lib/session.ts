import { getDb } from './db';

export const DEMO_USER_ID = 'usr_demo';

export function ensureDemoUser(): string {
  const db = getDb();
  const existing = db.prepare(`SELECT id FROM users WHERE id=?`).get(DEMO_USER_ID) as any;
  if (!existing) {
    db.prepare(`INSERT INTO users (id, email, oauth_connected, plan, created_at) VALUES (?,?,0,'free',?)`).run(
      DEMO_USER_ID,
      'demo@local.dev',
      new Date().toISOString(),
    );
  }
  return DEMO_USER_ID;
}

// Single-user demo: the cookie simply pins the demo user.
export function getUserId(): string {
  return ensureDemoUser();
}
