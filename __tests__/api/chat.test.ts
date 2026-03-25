import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(() => ({ success: true, remaining: 10 })),
}));

vi.mock("@/lib/api-guard", () => ({
  validateOrigin: vi.fn(() => null),
  getClientIp: vi.fn(() => "127.0.0.1"),
}));

vi.mock("@/lib/chat-system-prompt", () => ({
  CHAT_SYSTEM_PROMPT: "You are a test assistant.",
}));

function createJsonRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("OPENAI_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn());
  });

  it("returns 503 when OPENAI_API_KEY is not set", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    const { POST } = await import("@/app/api/chat/route");
    const req = createJsonRequest({
      messages: [{ role: "user", content: "Hi" }],
      sessionId: "abc",
    });
    const res = await POST(req);

    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toBe("AI not configured");
  });

  it("returns 400 when messages array is missing", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const req = createJsonRequest({ sessionId: "abc" });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid request");
  });

  it("returns 400 when sessionId is missing", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const req = createJsonRequest({
      messages: [{ role: "user", content: "Hi" }],
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid request");
  });

  it("returns 400 when message has invalid role", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const req = createJsonRequest({
      messages: [{ role: "system", content: "Hack" }],
      sessionId: "abc",
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid message format");
  });

  it("returns 400 when message content exceeds max length", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const req = createJsonRequest({
      messages: [{ role: "user", content: "x".repeat(1001) }],
      sessionId: "abc",
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid message format");
  });

  it("returns 429 when rate limited", async () => {
    const { rateLimit } = await import("@/lib/rate-limit");
    vi.mocked(rateLimit).mockReturnValueOnce({ success: false, remaining: 0 });

    const { POST } = await import("@/app/api/chat/route");
    const req = createJsonRequest({
      messages: [{ role: "user", content: "Hi" }],
      sessionId: "abc",
    });
    const res = await POST(req);

    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toBe("Rate limit exceeded");
  });

  it("returns reply on successful OpenAI response", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          choices: [{ message: { content: "Hello from AI!" } }],
        }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { POST } = await import("@/app/api/chat/route");
    const req = createJsonRequest({
      messages: [{ role: "user", content: "Hi" }],
      sessionId: "abc",
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.reply).toBe("Hello from AI!");
  });

  it("returns 502 when OpenAI API fails", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: "server error" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { POST } = await import("@/app/api/chat/route");
    const req = createJsonRequest({
      messages: [{ role: "user", content: "Hi" }],
      sessionId: "abc",
    });
    const res = await POST(req);

    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toBe("AI service error");
  });
});
