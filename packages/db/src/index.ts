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
    const client = postgresFn(connectionString, { prepare: false });
    dbInstance = drizzle(client, { schema });
  }
  return dbInstance;
};

export type Database = ReturnType<typeof connectDb>;
