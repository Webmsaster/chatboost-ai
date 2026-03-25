import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock dependencies before importing the route
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

vi.mock("@/lib/email", () => ({
  sendNewContactNotification: vi.fn(() => Promise.resolve()),
}));

function createJsonRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 when name is missing", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const req = createJsonRequest({ email: "test@example.com" });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Name and valid email required");
  });

  it("returns 400 when email is missing", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const req = createJsonRequest({ name: "Test User" });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Name and valid email required");
  });

  it("returns 400 when email is invalid (no @)", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const req = createJsonRequest({ name: "Test", email: "invalid-email" });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Name and valid email required");
  });

  it("returns 200 on valid submission", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const req = createJsonRequest({
      name: "Test User",
      email: "test@example.com",
      message: "Hello!",
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("returns 429 when rate limited", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockResolvedValueOnce({ success: false, remaining: 0 });

    const { POST } = await import("@/app/api/contact/route");
    const req = createJsonRequest({
      name: "Test",
      email: "test@example.com",
    });
    const res = await POST(req);

    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toBe("Too many requests");
  });
});
