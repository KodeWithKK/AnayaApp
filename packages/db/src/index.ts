import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as postgres from "postgres";

import * as schema from "./schema/index";

export * from "./schema/index";

let dbInstance: PostgresJsDatabase<typeof schema>;

export const connectDb = () => {
  if (!dbInstance) {
    const connectionString =
      process.env.DATABASE_URL || "postgres://localhost:5432/db";
    // @ts-ignore
    const postgresFn = postgres.default || postgres;
    const client = postgresFn(connectionString, {
      prepare: false,
      max: 1, // Highly recommended for Lambda to avoid pool issues
      idle_timeout: 20, // Close idle connections quickly
      connect_timeout: 10,
    });
    dbInstance = drizzle(client, { schema });
  }
  return dbInstance;
};

export type Database = ReturnType<typeof connectDb>;
