import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "app.db");

export const db = new sqlite3.Database(dbPath, (err: unknown) => {
  if (err) console.error(err);
  else console.log("DB connected");
});

db.run("PRAGMA foreign_keys = ON");
