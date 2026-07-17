import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

// Storage: Node 22 built-in SQLite (no native build required). The API is
// compatible with the better-sqlite3 surface our code uses (prepare/run/get/all,
// BEGIN/COMMIT transactions).

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = process.env.DFH_DB_PATH
  ? path.resolve(process.env.DFH_DB_PATH)
  : path.join(DATA_DIR, 'app.db');

type DB = any;

let _db: DB | null = null;

export function getDb(): DB {
  if (_db) return _db;
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const db: DB = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA journal_mode = WAL');
  db.exec('PRAGMA foreign_keys = ON');
  migrate(db);
  // better-sqlite3-style transaction helper
  db.transaction = function (fn: (...a: any[]) => void) {
    return function (this: any, ...args: any[]) {
      db.exec('BEGIN');
      try {
        fn.apply(this, args);
        db.exec('COMMIT');
      } catch (e) {
        db.exec('ROLLBACK');
        throw e;
      }
    };
  };
  _db = db;
  return db;
}

function migrate(db: DB) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT,
      oauth_connected INTEGER NOT NULL DEFAULT 0,
      plan TEXT NOT NULL DEFAULT 'free',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS archives (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      file_name TEXT NOT NULL,
      row_count INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'uploaded',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tweets (
      id TEXT PRIMARY KEY,
      archive_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      text TEXT NOT NULL,
      favorite_count INTEGER NOT NULL DEFAULT 0,
      has_media INTEGER NOT NULL DEFAULT 0,
      media_kind TEXT,
      mention_count INTEGER NOT NULL DEFAULT 0,
      pii_flag INTEGER NOT NULL DEFAULT 0,
      location_flag INTEGER NOT NULL DEFAULT 0,
      sensitive_flag INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_tweets_archive ON tweets(archive_id);

    CREATE TABLE IF NOT EXISTS health_reports (
      id TEXT PRIMARY KEY,
      archive_id TEXT NOT NULL,
      score INTEGER,
      details TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS delete_jobs (
      id TEXT PRIMARY KEY,
      archive_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'queued',
      dry_run INTEGER NOT NULL DEFAULT 1,
      total INTEGER NOT NULL DEFAULT 0,
      processed INTEGER NOT NULL DEFAULT 0,
      succeeded INTEGER NOT NULL DEFAULT 0,
      failed INTEGER NOT NULL DEFAULT 0,
      estimated_total REAL NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS delete_job_items (
      id TEXT PRIMARY KEY,
      job_id TEXT NOT NULL,
      tweet_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      result TEXT,
      charged REAL NOT NULL DEFAULT 0,
      FOREIGN KEY (job_id) REFERENCES delete_jobs(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_items_job ON delete_job_items(job_id);
    CREATE INDEX IF NOT EXISTS idx_items_status ON delete_job_items(status);
  `);
}

export function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}
