import crypto from "crypto";

const CSRF_SECRET = process.env.CSRF_SECRET || "csrf-fallback-secret-do-not-use-in-production";
const CSRF_TOKEN_LENGTH = 32;
const CSRF_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

export function generateCsrfToken(): { token: string; expiresAt: number } {
  const randomBytes = crypto.randomBytes(CSRF_TOKEN_LENGTH).toString("hex");
  const timestamp = Date.now();
  const payload = `${timestamp}.${randomBytes}`;
  const signature = crypto
    .createHmac("sha256", CSRF_SECRET)
    .update(payload)
    .digest("hex");

  return {
    token: `${payload}.${signature}`,
    expiresAt: timestamp + CSRF_EXPIRY_MS,
  };
}

export function validateCsrfToken(token: string): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [timestampStr, randomBytes, signature] = parts;
  if (!timestampStr || !randomBytes || !signature) return false;

  // Verify timestamp is valid number
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiry
  const now = Date.now();
  if (now > timestamp + CSRF_EXPIRY_MS) return false;

  // Verify signature
  const payload = `${timestampStr}.${randomBytes}`;
  const expectedSignature = crypto
    .createHmac("sha256", CSRF_SECRET)
    .update(payload)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch {
    return false;
  }
}

// For Edge runtime (middleware)
export async function validateCsrfTokenEdge(token: string): Promise<boolean> {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [timestampStr, randomBytes, signature] = parts;
  if (!timestampStr || !randomBytes || !signature) return false;

  // Verify timestamp is valid number
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Check expiry
  const now = Date.now();
  if (now > timestamp + CSRF_EXPIRY_MS) return false;

  // Verify signature using Web Crypto API
  const secret = process.env.CSRF_SECRET || "csrf-fallback-secret-do-not-use-in-production";
  const payload = `${timestampStr}.${randomBytes}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const expectedSigBuf = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  const expectedSig = Array.from(new Uint8Array(expectedSigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expectedSig === signature;
}
