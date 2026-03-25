import { describe, it, expect, vi, beforeEach } from "vitest";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("allows requests under the limit", async () => {
    const { rateLimit: rl } = await import("@/lib/rate-limit");
    const result = await rl("test-under-limit", { max: 3, windowMs: 60_000 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks requests over the limit", async () => {
    const { rateLimit: rl } = await import("@/lib/rate-limit");
    const key = "test-over-limit";
    const opts = { max: 2, windowMs: 60_000 };

    await rl(key, opts); // 1
    await rl(key, opts); // 2 (at limit)
    const result = await rl(key, opts); // 3 (over limit)

    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("resets after the time window expires", async () => {
    const { rateLimit: rl } = await import("@/lib/rate-limit");
    const key = "test-window-reset";
    const opts = { max: 1, windowMs: 100 };

    await rl(key, opts); // 1 (at limit)
    const blocked = await rl(key, opts);
    expect(blocked.success).toBe(false);

    // Wait for the window to expire
    await new Promise((resolve) => setTimeout(resolve, 150));

    const afterReset = await rl(key, opts);
    expect(afterReset.success).toBe(true);
    expect(afterReset.remaining).toBe(0);
  });

  it("tracks remaining count correctly", async () => {
    const { rateLimit: rl } = await import("@/lib/rate-limit");
    const key = "test-remaining";
    const opts = { max: 5, windowMs: 60_000 };

    const r1 = await rl(key, opts);
    expect(r1.remaining).toBe(4);

    const r2 = await rl(key, opts);
    expect(r2.remaining).toBe(3);

    const r3 = await rl(key, opts);
    expect(r3.remaining).toBe(2);
  });

  it("runs cleanup on expired entries", async () => {
    const { rateLimit: rl } = await import("@/lib/rate-limit");

    // Create an entry with a very short window
    await rl("cleanup-test", { max: 10, windowMs: 50 });

    // Wait for it to expire and for cleanup interval to pass
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Trigger cleanup by calling rateLimit again (cleanup runs on interval)
    const result = await rl("cleanup-test", { max: 10, windowMs: 60_000 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(9);
  });
});
