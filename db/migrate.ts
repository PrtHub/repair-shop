import { db } from "@/db/index";
import { migrate } from "drizzle-orm/neon-http/migrator";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./db/migrations",
    });
    console.log("Successfully ran migrations");
  } catch (error) {
    console.log("Error running migrations", error);
    process.exit(1);
  }
};

main();