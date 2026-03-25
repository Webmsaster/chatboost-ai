import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/api-guard";
import { getDb } from "@/db/client";
import { sendNewContactNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = await rateLimit(`contact:${ip}`, { max: 3, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = (await request.json()) as {
      name: string;
      email: string;
      industry?: string;
      website?: string;
      message?: string;
    };

    if (!body.name || !body.email || !body.email.includes("@")) {
      return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
    }

    const sql = getDb();
    await sql`
      INSERT INTO contact_submissions (name, email, industry, website, message)
      VALUES (${body.name}, ${body.email.toLowerCase().trim()}, ${body.industry || null}, ${body.website || null}, ${body.message || null})
    `;

    try {
      await sendNewContactNotification({
        name: body.name,
        email: body.email,
        industry: body.industry,
        message: body.message,
      });
    } catch (emailErr) {
      console.error("Failed to send contact notification:", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
