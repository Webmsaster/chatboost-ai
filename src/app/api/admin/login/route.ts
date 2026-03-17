import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createAdminToken, COOKIE_NAME } from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/api-guard";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { success } = rateLimit(`admin-login:${ip}`, { max: 5, windowMs: 300_000 });
  if (!success) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  try {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    if (!validateCredentials(username, password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createAdminToken();
    const response = NextResponse.json({ ok: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
