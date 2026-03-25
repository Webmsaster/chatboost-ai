import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { getDb } from "@/db/client";

async function checkAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sql = getDb();
  const tab = request.nextUrl.searchParams.get("tab") || "orders";
  const page = Math.max(1, parseInt(request.nextUrl.searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(request.nextUrl.searchParams.get("limit") || "20", 10)));
  const offset = (page - 1) * limit;

  try {
    if (tab === "orders") {
      const [{ count }] = await sql`SELECT COUNT(*) as count FROM orders`;
      const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
      return NextResponse.json({ data: rows, total: Number(count), page, limit });
    }

    if (tab === "contacts") {
      const [{ count }] = await sql`SELECT COUNT(*) as count FROM contact_submissions`;
      const rows = await sql`SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;
      return NextResponse.json({ data: rows, total: Number(count), page, limit });
    }

    if (tab === "subscribers") {
      const [{ count }] = await sql`SELECT COUNT(*) as count FROM newsletter_subscribers WHERE unsubscribed_at IS NULL`;
      const rows = await sql`SELECT * FROM newsletter_subscribers WHERE unsubscribed_at IS NULL ORDER BY subscribed_at DESC LIMIT ${limit} OFFSET ${offset}`;
      return NextResponse.json({ data: rows, total: Number(count), page, limit });
    }

    if (tab === "summary") {
      const [orders] = await sql`SELECT COUNT(*) as count, COALESCE(SUM(amount), 0) as total FROM orders`;
      const [contacts] = await sql`SELECT COUNT(*) as count FROM contact_submissions`;
      const [subscribers] = await sql`SELECT COUNT(*) as count FROM newsletter_subscribers WHERE unsubscribed_at IS NULL`;
      return NextResponse.json({
        orders: { count: Number(orders.count), revenue: Number(orders.total) },
        contacts: Number(contacts.count),
        subscribers: Number(subscribers.count),
      });
    }

    return NextResponse.json({ error: "Invalid tab" }, { status: 400 });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
