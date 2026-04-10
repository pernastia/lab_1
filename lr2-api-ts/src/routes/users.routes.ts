import { Router } from "express";
import * as repo from "../repositories/users.repository.js";

const router = Router();

router.get("/", async (_, res, next) => {
  try {
    const data = await repo.getAllUsers();
    res.json({ data });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await repo.getUserById(Number(req.params.id));

    if (!user) return res.status(404).json({ error: "Not found" });

    res.json({ data: user });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await repo.createUser(req.body);
    res.status(201).json({ data: user });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const user = await repo.updateUser(Number(req.params.id), req.body);

    if (!user) return res.status(404).json({ error: "Not found" });

    res.json({ data: user });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const success = await repo.deleteUser(Number(req.params.id));
    if (!success) return res.status(404).json({ error: "Not found" });

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

export default router;
