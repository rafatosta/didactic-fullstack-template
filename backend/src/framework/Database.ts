/**
 * INFRAESTRUTURA
 * Encapsula o driver SQLite. DAOs não acessam better-sqlite3 diretamente.
 */
import BetterSqlite3, { type RunResult } from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const databasePath = process.env.DIDACTIC_DATABASE_PATH
    ? resolve(process.env.DIDACTIC_DATABASE_PATH)
    : resolve(backendRoot, "database", "app.db");
mkdirSync(dirname(databasePath), { recursive: true });

class Database {
    private readonly connection = new BetterSqlite3(databasePath);

    constructor() {
        this.connection.pragma("foreign_keys = ON");
    }

    query<T>(sql: string, params: unknown[] = []): T[] {
        return this.connection.prepare(sql).all(...(params as never[])) as T[];
    }

    queryOne<T>(sql: string, params: unknown[] = []): T | null {
        return (this.connection.prepare(sql).get(...(params as never[])) as T | undefined) ?? null;
    }

    execute(sql: string, params: unknown[] = []): RunResult {
        return this.connection.prepare(sql).run(...(params as never[]));
    }
}

export const database = new Database();
