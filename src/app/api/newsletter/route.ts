import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/api-guard";
import { getDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = await rateLimit(`newsletter:${ip}`, { max: 5, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const { email } = (await request.json()) as { email: string };

    if (!email || !email.includes("@") || email.length > 255) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${email.toLowerCase().trim()})
      ON CONFLICT (email) DO UPDATE SET unsubscribed_at = NULL
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
