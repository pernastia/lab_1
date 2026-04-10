import { all, get, run } from "../db/dbClient.js";

export async function getAll() {
  return await all(`
    SELECT * FROM ticket_messages
    ORDER BY id DESC
  `);
}

export async function getById(id: number) {
  return await get(`
    SELECT * FROM ticket_messages
    WHERE id=${id}
  `);
}

export async function create(data: any) {
  const result = await run(`
    INSERT INTO ticket_messages(ticketId, text)
    VALUES(${data.ticketId}, '${data.text}')
  `);

  return await get(`
    SELECT * FROM ticket_messages
    WHERE id=${result.lastID}
  `);
}

export async function update(id: number, data: any) {
  await run(`UPDATE ticket_messages SET text = ? WHERE id = ?`, [
    data.text,
    id,
  ]);

  return await get(`SELECT * FROM ticket_messages WHERE id = ?`, [id]);
}

export async function remove(id: number) {
  await run(`
    DELETE FROM ticket_messages
    WHERE id=${id}
  `);

  return true;
}
