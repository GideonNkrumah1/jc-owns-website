import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __jcOwnsPool: Pool | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to your environment variables (see .env.example)."
  );
}

// Reuse the pool across hot-reloads in dev and across invocations on the
// same serverless instance in production, instead of opening a new
// connection pool per request.
const pool =
  global.__jcOwnsPool ??
  new Pool({
    connectionString,
    max: process.env.NODE_ENV === "production" ? 5 : 3,
  });

if (process.env.NODE_ENV !== "production") {
  global.__jcOwnsPool = pool;
}

export const db = drizzle(pool, { schema });
