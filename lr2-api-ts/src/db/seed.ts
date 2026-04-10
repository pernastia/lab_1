import { run } from "./dbClient.js";

export async function seed() {
  try {
    console.log("Seeding started...");

    await run(`INSERT OR IGNORE INTO users(id, name) VALUES(1, 'Ivan')`);
    await run(`INSERT OR IGNORE INTO users(id, name) VALUES(2, 'Olena')`);

    await run(`INSERT OR IGNORE INTO statuses(id, name) VALUES(1, 'Open')`);
    await run(`INSERT OR IGNORE INTO statuses(id, name) VALUES(2, 'Closed')`);

    await run(`
      INSERT OR IGNORE INTO tickets(id, subject, message, priority, authorId, statusId)
      VALUES(1, 'Bug in system', 'System crashes on login', 'High', 1, 1)
    `);

    await run(`
      INSERT OR IGNORE INTO tickets(id, subject, message, priority, authorId, statusId)
      VALUES(2, 'Login error', 'Cannot login to the system', 'Medium', 2, 2)
    `);

    await run(`
      INSERT OR IGNORE INTO ticket_messages(id, ticketId, text)
      VALUES(1, 1, 'First message')
    `);

    await run(`
      INSERT OR IGNORE INTO ticket_messages(id, ticketId, text)
      VALUES(2, 1, 'Second message')
    `);

    console.log("Seed done");
  } catch (err) {
    console.error("Seed error:", err);
  }
}
