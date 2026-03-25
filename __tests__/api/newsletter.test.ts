import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(() => Promise.resolve({ success: true, remaining: 5 })),
}));

vi.mock("@/lib/api-guard", () => ({
  getClientIp: vi.fn(() => "127.0.0.1"),
}));

vi.mock("@/db/client", () => ({
  getDb: vi.fn(() => {
    const sql = (strings: TemplateStringsArray, ..._values: unknown[]) => {
      void strings;
      return Promise.resolve();
    };
    return sql;
  }),
}));

function createJsonRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/newsletter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when email is missing", async () => {
    const { POST } = await import("@/app/api/newsletter/route");
    const req = createJsonRequest({});
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid email");
  });

  it("returns 400 when email has no @", async () => {
    const { POST } = await import("@/app/api/newsletter/route");
    const req = createJsonRequest({ email: "not-an-email" });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid email");
  });

  it("returns 400 when email exceeds 255 characters", async () => {
    const { POST } = await import("@/app/api/newsletter/route");
    const longEmail = "a".repeat(250) + "@b.com";
    const req = createJsonRequest({ email: longEmail });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid email");
  });

  it("returns 200 on valid email", async () => {
    const { POST } = await import("@/app/api/newsletter/route");
    const req = createJsonRequest({ email: "user@example.com" });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("returns 429 when rate limited", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockResolvedValueOnce({ success: false, remaining: 0 });

    const { POST } = await import("@/app/api/newsletter/route");
    const req = createJsonRequest({ email: "user@example.com" });
    const res = await POST(req);

    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toBe("Too many requests");
  });
});
