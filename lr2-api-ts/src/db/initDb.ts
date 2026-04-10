import fs from "fs";
import path from "path";
import { db } from "./db.js";
import { seed } from "./seed.js";

export async function initDb(): Promise<void> {
  const sql = fs.readFileSync(path.resolve("src/db/schema.sql"), "utf-8");

  return new Promise((resolve, reject) => {
    db.exec(`PRAGMA foreign_keys = ON;`, (err) => {
      if (err) return reject(err);

      db.exec(sql, async (err: Error | null) => {
        if (err) {
          console.error("Error creating tables:", err.message);
          reject(err);
        } else {
          console.log("DB Tables created");
          try {
            await seed();
            resolve();
          } catch (seedErr) {
            reject(seedErr);
          }
        }
      });
    });
  });
}
