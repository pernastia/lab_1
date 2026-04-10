import fs from "fs";
import path from "path";
import { run, all } from "./dbClient.js";

export async function runMigrations() {
  const files = fs.readdirSync("src/migrations");

  await run(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);

  const applied = await all("SELECT name FROM schema_migrations");
  const appliedNames = applied.map((m) => m.name);

  for (const file of files) {
    if (!appliedNames.includes(file)) {
      const sql = fs.readFileSync(path.join("src/migrations", file), "utf-8");
      await run(sql);
      await run(`INSERT INTO schema_migrations(name) VALUES('${file}')`);
      console.log("Migration applied:", file);
    }
  }
}
