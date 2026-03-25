import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ── Upstash Redis rate limiter (persistent across cold starts) ──────────

const useUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redis;
}

// Cache Ratelimit instances per unique window config
const limiters = new Map<string, Ratelimit>();

function getUpstashLimiter(max: number, windowMs: number): Ratelimit {
  const key = `${max}:${windowMs}`;
  let limiter = limiters.get(key);
  if (!limiter) {
    // Convert ms to a human-readable window string for Upstash
    const windowSec = Math.max(1, Math.round(windowMs / 1000));
    const window = `${windowSec} s` as Parameters<typeof Ratelimit.slidingWindow>[1];
    limiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(max, window),
      analytics: false,
      prefix: "rl",
    });
    limiters.set(key, limiter);
  }
  return limiter;
}

// ── In-memory fallback (original implementation) ────────────────────────

const requests = new Map<string, { count: number; resetAt: number }>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, value] of requests) {
    if (now > value.resetAt) requests.delete(key);
  }
}

function inMemoryRateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number }
): { success: boolean; remaining: number } {
  cleanup();
  const now = Date.now();
  const entry = requests.get(key);

  if (!entry || now > entry.resetAt) {
    requests.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: max - entry.count };
}

// ── Public API ──────────────────────────────────────────────────────────

export async function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number }
): Promise<{ success: boolean; remaining: number }> {
  if (useUpstash) {
    const limiter = getUpstashLimiter(max, windowMs);
    const result = await limiter.limit(key);
    return { success: result.success, remaining: result.remaining };
  }
  return inMemoryRateLimit(key, { max, windowMs });
}
