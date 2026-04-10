import { all, get, run } from "../db/dbClient.js";

export async function getAllTickets(query: any) {
  let sql = `SELECT * FROM tickets WHERE 1=1`;

  if (query.statusId) {
    sql += ` AND statusId = ${query.statusId}`;
  }

  if (query.userId) {
    sql += ` AND authorId = ${query.userId}`;
  }

  if (query.sort) {
    sql += ` ORDER BY ${query.sort} ${query.order === "desc" ? "DESC" : "ASC"}`;
  }

  sql += ` LIMIT 10`;

  return await all(sql);
}

export async function getTicketById(id: number) {
  const sql = `
    SELECT 
      t.*, 
      s.name as statusName, 
      u.userName as authorName
    FROM tickets t
    LEFT JOIN statuses s ON t.statusId = s.id
    LEFT JOIN users u ON t.authorId = u.id
    WHERE t.id = ?
  `;
  return await get(sql, [id]);
}

export async function createTicket(data: any) {
  const result = await run(`
    INSERT INTO tickets(subject, message, priority, authorId, statusId)
    VALUES('${data.subject}','${data.message}','${data.priority}',${data.authorId},${data.statusId})
  `);

  return await get(`SELECT * FROM tickets WHERE id=${result.lastID}`);
}

export async function updateTicket(id: number, data: any) {
  await run(`
    UPDATE tickets
    SET subject='${data.subject}', message='${data.message}'
    WHERE id=${id}
  `);

  return await get(`SELECT * FROM tickets WHERE id=${id}`);
}

export async function deleteTicket(id: number) {
  const result = await run(`DELETE FROM tickets WHERE id=${id}`);
  return result;
}
