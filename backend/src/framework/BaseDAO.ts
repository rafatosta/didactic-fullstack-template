/** INFRAESTRUTURA: operações SQLite compartilhadas pelos DAOs didáticos. */
import type { RunResult } from "better-sqlite3";
import { database } from "./Database.js";

export abstract class BaseDAO<T> {
    protected query(sql: string, params: unknown[] = []): T[] {
        return database.query<T>(sql, params);
    }

    protected queryOne(sql: string, params: unknown[] = []): T | null {
        return database.queryOne<T>(sql, params);
    }

    protected execute(sql: string, params: unknown[] = []): RunResult {
        return database.execute(sql, params);
    }
}
