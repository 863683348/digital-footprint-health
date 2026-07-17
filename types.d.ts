// Minimal ambient declarations for Node 22's experimental built-in SQLite.
// (Defensive: @types/node may not ship these yet on every 22.x.)
declare module 'node:sqlite' {
  export class DatabaseSync {
    constructor(path: string, options?: Record<string, unknown>);
    exec(sql: string): void;
    prepare(sql: string): any;
    close(): void;
  }
}
