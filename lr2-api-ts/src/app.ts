import express from "express";

import usersRoutes from "./routes/users.routes.js";
import ticketsRoutes from "./routes/tickets.routes.js";
import statusesRoutes from "./routes/statuses.routes.js";
import messagesRoutes from "./routes/ticketMessages.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/statuses", statusesRoutes);
app.use("/api/messages", messagesRoutes);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

export default app;
