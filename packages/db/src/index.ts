import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

export * from "./schema";

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/db";

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

export * from "./schema/product.schema";
export * from "./schema/user.schema";
