CREATE INDEX IF NOT EXISTS idx_tickets_statusId
ON tickets(statusId);

CREATE INDEX IF NOT EXISTS idx_tickets_authorId
ON tickets(authorId);

CREATE INDEX IF NOT EXISTS idx_messages_ticketId
ON ticket_messages(ticketId);

CREATE UNIQUE INDEX IF NOT EXISTS idx_status_name
ON statuses(name);