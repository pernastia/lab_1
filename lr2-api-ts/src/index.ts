import express, { type Request, type Response } from "express";

import usersRoutes from "./routes/users.routes.js";
import ticketsRoutes from "./routes/tickets.routes.js";

import logger from "./middleware/request-logging.middleware.js";
import errorHandler from "./middleware/error-handler.middleware.js";

const app = express();
app.use(express.json());
app.use(logger);
app.use("/api/users", usersRoutes);
app.use("/api/tickets", ticketsRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});
app.use(errorHandler);
app.listen(3000, () => console.log("API started on http://localhost:3000"));
