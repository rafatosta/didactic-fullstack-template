import Database from "better-sqlite3";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const dir = mkdtempSync(resolve(tmpdir(), "didactic-backend-"));
const dbPath = resolve(dir, "test.db");
process.env.DIDACTIC_DATABASE_PATH = dbPath;

const db = new Database(dbPath);
db.pragma("foreign_keys = ON");
db.exec(readFileSync(resolve(process.cwd(), "database/schema.sql"), "utf8"));
db.exec(readFileSync(resolve(process.cwd(), "database/seed.sql"), "utf8"));
db.close();
