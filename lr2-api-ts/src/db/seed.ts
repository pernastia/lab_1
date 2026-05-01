import { run } from "./dbClient.js";

export async function seed() {
  try {
    console.log("Seeding started...");

    // users
    await run(`INSERT OR IGNORE INTO users(id, name) VALUES(1, 'Ivan')`);
    await run(`INSERT OR IGNORE INTO users(id, name) VALUES(2, 'Olena')`);
    await run(`INSERT OR IGNORE INTO users(id, name) VALUES(3, 'Kate')`);

    // statuses
    await run(`INSERT OR IGNORE INTO statuses(id, name) VALUES(1, 'Open')`);
    await run(`INSERT OR IGNORE INTO statuses(id, name) VALUES(2, 'Closed')`);

    // tickets
    await run(`INSERT OR IGNORE INTO tickets(id, subject, message, priority, authorId, statusId)
      VALUES(1, 'Bug in system', 'System crashes on login', 'High', 1, 1)`);
    await run(`INSERT OR IGNORE INTO tickets(id, subject, message, priority, authorId, statusId)
      VALUES(2, 'Login error', 'Cannot login', 'Medium', 2, 2)`);
    await run(`INSERT OR IGNORE INTO tickets(id, subject, message, priority, authorId, statusId)
      VALUES(3, 'Payment issue', 'Payment not working', 'High', 3, 1)`);
    await run(`INSERT OR IGNORE INTO tickets(id, subject, message, priority, authorId, statusId)
      VALUES(4, 'Profile bug', 'Cannot update profile', 'Low', 1, 2)`);

    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(1, 1, 1, 'First message')`);
    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(2, 1, 1, 'Second message')`);
    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(3, 1, 1, 'Third message')`);
    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(4, 1, 2, 'Olena replied')`);

    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(5, 2, 2, 'Olena msg 1')`);
    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(6, 2, 2, 'Olena msg 2')`);
    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(7, 2, 3, 'Kate replied')`);

    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(8, 3, 3, 'Kate msg 1')`);
    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(9, 3, 3, 'Kate msg 2')`);

    await run(`INSERT OR IGNORE INTO ticket_messages(id, ticketId, userId, text)
      VALUES(10, 4, 1, 'Only one message')`);

    console.log("Seed done");
  } catch (err) {
    console.error("Seed error:", err);
  }
}
