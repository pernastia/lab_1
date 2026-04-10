import { Router } from "express";
import * as repo from "../repositories/tickets.repository.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await repo.getAllTickets(req.query);
    res.json({ data });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const ticket = await repo.getTicketById(Number(req.params.id));

    if (!ticket) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ data: ticket });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const ticket = await repo.createTicket(req.body);
    res.status(201).json({ data: ticket });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const ticket = await repo.updateTicket(Number(req.params.id), req.body);

    if (!ticket) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ data: ticket });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const success = await repo.deleteTicket(Number(req.params.id));

    if (!success) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

export default router;
