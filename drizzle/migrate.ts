import { env } from "@/env";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

const migrateClient = postgres(env.DATABASE_URL, { max: 1 });

async function main() {
  console.log("Migration started...");
  await migrate(drizzle(migrateClient), {
    migrationsFolder: "./drizzle/migrations",
  });
  console.log("Migration finished...");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(0);
});
