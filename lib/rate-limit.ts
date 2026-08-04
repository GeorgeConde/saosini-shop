/**
 * Rate Limiter backed by Postgres (RateLimitHit table).
 *
 * An in-memory Map does not hold up on serverless (Vercel): concurrent/cold
 * invocations each get their own memory, so limits can be silently bypassed.
 * This trades a bit of latency for a limit that actually holds.
 */

import prisma from "@/lib/prisma";

/**
 * Check if a request is allowed under the rate limit, recording this attempt if so.
 *
 * @param key - Unique identifier (e.g., "login:user@email.com" or "order:user@email.com")
 * @param maxAttempts - Maximum attempts allowed within the window
 * @param windowMs - Time window in milliseconds
 * @returns { allowed, remaining, retryAfterMs }
 */
export async function rateLimit(
    key: string,
    maxAttempts: number,
    windowMs: number
): Promise<{ allowed: boolean; remaining: number; retryAfterMs: number }> {
    const now = new Date();
    const windowStart = new Date(now.getTime() - windowMs);

    // Opportunistic cleanup of this key's expired hits (keeps the table small
    // without needing a separate cron job).
    await prisma.rateLimitHit.deleteMany({
        where: { key, createdAt: { lt: windowStart } },
    });

    const count = await prisma.rateLimitHit.count({
        where: { key, createdAt: { gte: windowStart } },
    });

    if (count >= maxAttempts) {
        const oldest = await prisma.rateLimitHit.findFirst({
            where: { key, createdAt: { gte: windowStart } },
            orderBy: { createdAt: "asc" },
        });
        const retryAfterMs = oldest
            ? Math.max(0, oldest.createdAt.getTime() + windowMs - now.getTime())
            : windowMs;

        return { allowed: false, remaining: 0, retryAfterMs };
    }

    await prisma.rateLimitHit.create({ data: { key } });

    return {
        allowed: true,
        remaining: maxAttempts - count - 1,
        retryAfterMs: 0,
    };
}
