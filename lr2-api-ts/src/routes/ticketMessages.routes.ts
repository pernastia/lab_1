import { Router } from "express";
import * as repo from "../repositories/ticketMessages.repository.js";

const router = Router();

router.get("/", async (_, res, next) => {
  try {
    const data = await repo.getAll();
    res.json({ data });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const msg = await repo.getById(Number(req.params.id));

    if (!msg) return res.status(404).json({ error: "Not found" });

    res.json({ data: msg });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const msg = await repo.create(req.body);
    res.status(201).json({ data: msg });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const msg = await repo.update(Number(req.params.id), req.body);

    if (!msg) return res.status(404).json({ error: "Not found" });

    res.json({ data: msg });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const success = await repo.remove(Number(req.params.id));

    if (!success) return res.status(404).json({ error: "Not found" });

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

export default router;
