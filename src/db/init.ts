import { getDb } from "./client";

/**
 * Runs all CREATE TABLE / CREATE INDEX statements.
 * Safe to call repeatedly — every statement uses IF NOT EXISTS.
 */
export async function initializeDatabase(): Promise<void> {
  const sql = getDb();

  // -- Customers
  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id                 SERIAL PRIMARY KEY,
      email              TEXT NOT NULL UNIQUE,
      name               TEXT,
      stripe_customer_id TEXT,
      created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_customers_stripe_id ON customers (stripe_customer_id)`;

  // -- Orders
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id                    SERIAL PRIMARY KEY,
      stripe_session_id     TEXT UNIQUE,
      stripe_payment_intent TEXT,
      plan                  TEXT NOT NULL DEFAULT 'unknown',
      amount                INTEGER NOT NULL DEFAULT 0,
      currency              TEXT NOT NULL DEFAULT 'eur',
      status                TEXT NOT NULL DEFAULT 'completed',
      customer_email        TEXT,
      customer_name         TEXT,
      created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders (customer_email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_created_at     ON orders (created_at DESC)`;

  // -- Contact submissions
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      industry   TEXT,
      website    TEXT,
      message    TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_email      ON contact_submissions (email)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions (created_at DESC)`;

  // -- Newsletter subscribers
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id               SERIAL PRIMARY KEY,
      email            TEXT NOT NULL UNIQUE,
      subscribed_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      unsubscribed_at  TIMESTAMPTZ
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_newsletter_active ON newsletter_subscribers (email) WHERE unsubscribed_at IS NULL`;

  console.log("Database schema initialized successfully");
}
