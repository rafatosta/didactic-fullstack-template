/** INFRAESTRUTURA: recria e povoa o SQLite local a partir de SQL puro. */
import Database from "better-sqlite3";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const databaseDir = resolve(root, "database");
const databasePath = resolve(databaseDir, "app.db");
const schemaPath = resolve(databaseDir, "schema.sql");
const seedPath = resolve(databaseDir, "seed.sql");

mkdirSync(databaseDir, { recursive: true });
rmSync(databasePath, { force: true });

const db = new Database(databasePath);
db.pragma("foreign_keys = ON");

db.exec(readFileSync(schemaPath, "utf8"));
db.exec(readFileSync(seedPath, "utf8"));
db.close();

console.log(`Banco recriado em ${databasePath}`);
