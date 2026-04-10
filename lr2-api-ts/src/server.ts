import app from "./app.js";
import { runMigrations } from "./db/migrate.js";
import { seed } from "./db/seed.js";

const PORT = process.env.PORT || 3000;
async function bootstrap() {
  await runMigrations();
  await seed();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
bootstrap().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});
