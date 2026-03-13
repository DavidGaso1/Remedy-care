/**
 * Extracts the real client IP address from a request.
 *
 * Strategy (in order of trust):
 * 1. `x-real-ip`  — set by trusted reverse proxies (Vercel, Nginx) and cannot be
 *    injected by the client.
 * 2. Last entry in `x-forwarded-for` — a trusted proxy *appends* the real IP, so
 *    taking the rightmost entry defeats client-side header spoofing.
 * 3. Fallback to "unknown" (shared bucket; still rate-limited).
 */
export function getClientIP(request: { headers: { get(name: string): string | null } }): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const ips = xff.split(",").map((ip) => ip.trim()).filter(Boolean);
    // Use the rightmost entry — added by the last trusted proxy, not spoofable
    return ips[ips.length - 1] ?? "unknown";
  }

  return "unknown";
}
