/**
 * Lightweight in-memory rate limiter for the contact form.
 *
 * This protects against a burst of automated submissions from a single
 * serverless instance. It is process-local, so on a platform that scales to
 * many instances it is a best-effort layer rather than a hard guarantee —
 * see DEPLOYMENT.md for how to upgrade to a shared limiter (Upstash Redis)
 * if spam becomes a real problem.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  if (bucket.count > MAX_REQUESTS) {
    return true;
  }
  return false;
}

// Periodically clear old buckets so this map can't grow unbounded on a
// long-lived instance.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (bucket.resetAt < now) buckets.delete(key);
    }
  }, WINDOW_MS).unref?.();
}
