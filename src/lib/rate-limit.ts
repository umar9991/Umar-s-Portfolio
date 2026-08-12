/**
 * Simple in-memory IP rate limiter for serverless/dev.
 * Note: On multi-instance serverless, this is per-instance best-effort.
 * Good enough to curb casual abuse on a public portfolio chat endpoint.
 */

type Bucket = {
  timestamps: number[];
};

const store = new Map<string, Bucket>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function checkRateLimit(ip: string): {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
} {
  const now = Date.now();
  const bucket = store.get(ip) ?? { timestamps: [] };

  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);

  if (bucket.timestamps.length >= MAX_REQUESTS) {
    const oldest = bucket.timestamps[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000));
    store.set(ip, bucket);
    return { ok: false, remaining: 0, retryAfterSec };
  }

  bucket.timestamps.push(now);
  store.set(ip, bucket);

  return {
    ok: true,
    remaining: MAX_REQUESTS - bucket.timestamps.length,
    retryAfterSec: 0,
  };
}
