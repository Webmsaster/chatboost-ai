import { NextRequest, NextResponse } from "next/server";

export function validateOrigin(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // In development, allow requests without origin
  if (!siteUrl || process.env.NODE_ENV === "development") return null;

  const allowedOrigins = [siteUrl, new URL(siteUrl).origin];

  if (!origin || !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
