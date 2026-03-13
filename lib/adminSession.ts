import crypto from "crypto";

const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && (!secret || secret.length < 32)) {
    throw new Error("ADMIN_SESSION_SECRET must be set to a strong value in production");
  }
  return secret || "default-secret";
}

function base64UrlEncode(input: string | Buffer): string {
  const b64 = Buffer.from(input).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecodeToString(input: string): string {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  return Buffer.from(b64 + pad, "base64").toString("utf8");
}

function sign(payloadB64: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("hex");
}

export function createAdminSessionToken(nowMs = Date.now()): string {
  const payload = {
    iat: Math.floor(nowMs / 1000),
    rnd: crypto.randomBytes(16).toString("hex"),
  };

  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const secret = getSessionSecret();
  const sig = sign(payloadB64, secret);
  return `${payloadB64}.${sig}`;
}

export function verifyAdminSessionToken(token: string, nowMs = Date.now()): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return false;
  if (!/^[a-f0-9]{64}$/.test(sig)) return false;

  let payload: unknown;
  try {
    payload = JSON.parse(base64UrlDecodeToString(payloadB64));
  } catch {
    return false;
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !("iat" in payload) ||
    typeof (payload as { iat: unknown }).iat !== "number"
  ) {
    return false;
  }

  const iat = (payload as { iat: number }).iat;
  const nowSeconds = Math.floor(nowMs / 1000);
  if (iat > nowSeconds + 60) return false;
  if (nowSeconds - iat > TOKEN_MAX_AGE_SECONDS) return false;

  const secret = getSessionSecret();
  const expectedSig = sign(payloadB64, secret);

  try {
    return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expectedSig, "hex"));
  } catch {
    return false;
  }
}
