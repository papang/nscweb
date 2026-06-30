import { Pool } from "pg";

const globalForPg = global as unknown as {
  pool: Pool;
};

export const pool =
  globalForPg.pool ||
  new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  console.log(pool);

// if (process.env.NODE_ENV !== "production") {
  globalForPg.pool = pool;
// }