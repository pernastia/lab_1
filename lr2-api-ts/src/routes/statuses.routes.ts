import { Router } from "express";
import { all, get, run } from "../db/dbClient.js";

const router = Router();

router.get("/", async (_, res) => {
  const data = await all("SELECT * FROM statuses ORDER BY id DESC");
  res.json({ data });
});

router.get("/:id", async (req, res) => {
  const status = await get(`SELECT * FROM statuses WHERE id=${req.params.id}`);
  if (!status) return res.status(404).json({ error: "Not found" });

  res.json({ data: status });
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name required" });
  }

  try {
    const result = await run(`INSERT INTO statuses(name) VALUES('${name}')`);
    res.status(201).json({ data: { id: result.lastID, name } });
  } catch {
    res.status(409).json({ error: "Status must be unique" });
  }
});

router.put("/:id", async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "name required" });

  const existing = await get(
    `SELECT * FROM statuses WHERE id=${req.params.id}`,
  );
  if (!existing) return res.status(404).json({ error: "Not found" });

  await run(`UPDATE statuses SET name='${name}' WHERE id=${req.params.id}`);

  res.json({ data: { id: Number(req.params.id), name } });
});

router.delete("/:id", async (req, res) => {
  const existing = await get(
    `SELECT * FROM statuses WHERE id=${req.params.id}`,
  );
  if (!existing) return res.status(404).json({ error: "Not found" });

  await run(`DELETE FROM statuses WHERE id=${req.params.id}`);
  res.status(204).send();
});

export default router;
