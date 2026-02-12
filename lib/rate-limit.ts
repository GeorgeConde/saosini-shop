/**
 * In-memory Rate Limiter (sliding window)
 * 
 * Suitable for single-instance deployments (Vercel, etc.).
 * For multi-instance production, upgrade to Redis-backed.
 */

interface RateLimitEntry {
    timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Auto-cleanup expired entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let cleanupTimer: NodeJS.Timeout | null = null;

function startCleanup(windowMs: number) {
    if (cleanupTimer) return;
    cleanupTimer = setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of store.entries()) {
            entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);
            if (entry.timestamps.length === 0) {
                store.delete(key);
            }
        }
    }, CLEANUP_INTERVAL);
    // Don't keep Node.js alive just for cleanup
    if (cleanupTimer.unref) {
        cleanupTimer.unref();
    }
}

/**
 * Check if a request is allowed under the rate limit.
 * 
 * @param key - Unique identifier (e.g., "login:user@email.com" or "order:user@email.com")
 * @param maxAttempts - Maximum attempts allowed within the window
 * @param windowMs - Time window in milliseconds
 * @returns { allowed, remaining, retryAfterMs }
 */
export function rateLimit(
    key: string,
    maxAttempts: number,
    windowMs: number
): { allowed: boolean; remaining: number; retryAfterMs: number } {
    startCleanup(windowMs);

    const now = Date.now();
    let entry = store.get(key);

    if (!entry) {
        entry = { timestamps: [] };
        store.set(key, entry);
    }

    // Remove timestamps outside the window
    entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);

    if (entry.timestamps.length >= maxAttempts) {
        const oldestInWindow = entry.timestamps[0];
        const retryAfterMs = oldestInWindow + windowMs - now;
        return {
            allowed: false,
            remaining: 0,
            retryAfterMs: Math.max(0, retryAfterMs),
        };
    }

    entry.timestamps.push(now);
    return {
        allowed: true,
        remaining: maxAttempts - entry.timestamps.length,
        retryAfterMs: 0,
    };
}
