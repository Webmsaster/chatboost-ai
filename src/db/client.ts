import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

/**
 * Returns a cached Neon SQL tagged-template client.
 * Reads DATABASE_URL from the environment on first call.
 */
export function getDb(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }

  _sql = neon(url);
  return _sql;
}
