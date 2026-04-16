import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema/index";

export * from "./schema/index";

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/db";

let dbInstance: PostgresJsDatabase<typeof schema>;

export const connectDb = () => {
  if (!dbInstance) {
    const client = postgres(connectionString, { prepare: false });
    dbInstance = drizzle(client, { schema });
  }
  return dbInstance;
};

export type Database = ReturnType<typeof connectDb>;
