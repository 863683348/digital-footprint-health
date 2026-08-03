// Neon Postgres connection layer.
//
// Uses @neondatabase/serverless (WebSocket-based Pool) which is the recommended
// driver for Vercel's serverless runtime — no long-lived TCP connection, TLS is
// handled by Neon. The pool is created lazily on first query so that the module
// can be imported during `next build` (when DATABASE_URL may be absent) without
// throwing.
//
// Required env: DATABASE_URL = postgresql://user:pass@host/db?sslmode=require

import { Pool } from '@neondatabase/serverless';

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

function getPool(): Pool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. Configure the Neon Postgres connection string in env.',
    );
  }
  // Keep max low to avoid exhausting Neon's connection limit across serverless
  // instances. Idle connections are reaped by Neon automatically.
  pool = new Pool({ connectionString, max: 10 });
  return pool;
}

export interface QueryResult<T = Record<string, unknown>> {
  rows: T[];
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  const res = await getPool().query(text, params);
  return { rows: res.rows as T[] };
}

// Idempotent schema bootstrap. Called at the start of every order operation so
// the table exists on first use (no separate migration step needed).
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      await getPool().query(`
        CREATE TABLE IF NOT EXISTS orders (
          id                TEXT PRIMARY KEY,
          waffo_checkout_id TEXT UNIQUE,
          payment_id        TEXT,
          refund_id         TEXT,
          user_id           TEXT NOT NULL,
          plan              TEXT NOT NULL,
          amount_currency   TEXT NOT NULL DEFAULT 'USD',
          amount_value      TEXT NOT NULL,
          cny_amount        NUMERIC NOT NULL DEFAULT 0,
          tweet_count       INTEGER NOT NULL DEFAULT 0,
          status            TEXT NOT NULL,
          archive_id        TEXT NOT NULL,
          created_at        TEXT NOT NULL,
          paid_at           TEXT,
          refunded_at       TEXT,
          refund_note       TEXT,
          deleted_count     INTEGER NOT NULL DEFAULT 0
        );
        CREATE INDEX IF NOT EXISTS idx_orders_user  ON orders(user_id);
        CREATE INDEX IF NOT EXISTS idx_orders_waffo ON orders(waffo_checkout_id);
      `);
    })().catch((e) => {
      // Allow a later call to retry if bootstrap failed.
      schemaReady = null;
      throw e;
    });
  }
  return schemaReady;
}
