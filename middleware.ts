import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const PROTECTED_PATHS = [
  "/admin/dashboard",
  "/admin/products",
  "/admin/messages",
  "/admin/settings",
];

// API routes that require authentication (admin-only)
const PROTECTED_API_PATHS = [
  "/api/stats",
  "/api/settings",
  "/api/products",
  "/api/messages",
];

const ADMIN_LOGIN_ACCESS_KEY = process.env.ADMIN_LOGIN_ACCESS_KEY;

// Public API routes (accessible without auth — used by frontend checkout)
// POST /api/orders is public (customers place orders)
// GET /api/orders is admin-only

function base64UrlToString(input: string): string {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  return Buffer.from(b64 + pad, "base64").toString("utf8");
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verifyAdminSessionTokenEdge(token: string): Promise<boolean> {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return false;
  if (!/^[a-f0-9]{64}$/.test(sig)) return false;

  let payload: unknown;
  try {
    payload = JSON.parse(base64UrlToString(payloadB64));
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
  const nowSeconds = Math.floor(Date.now() / 1000);
  const maxAgeSeconds = 60 * 60 * 24 * 7;
  if (iat > nowSeconds + 60) return false;
  if (nowSeconds - iat > maxAgeSeconds) return false;

  const secret = process.env.ADMIN_SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && !secret) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret || "default-secret"),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const expectedSigBuf = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadB64)
  );
  const expectedSig = arrayBufferToHex(expectedSigBuf);
  return expectedSig === sig;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminIndex = pathname === "/admin";
  const isAdminLogin = pathname === "/admin/login";
  const accessKey = request.nextUrl.searchParams.get("access");

  const sessionCookie = request.cookies.get("admin-session");
  const hasValidSession = sessionCookie?.value
    ? await verifyAdminSessionTokenEdge(sessionCookie.value)
    : false;

  if (isAdminIndex && !hasValidSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminLogin) {
    if (hasValidSession) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    const isDev = process.env.NODE_ENV !== "production";
    if (!isDev && (!ADMIN_LOGIN_ACCESS_KEY || accessKey !== ADMIN_LOGIN_ACCESS_KEY)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  // Check if this is a protected admin page
  const isProtectedPage = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // Check if this is a protected API route
  const isProtectedApi = PROTECTED_API_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  // Special handling for /api/orders — only GET and PUT require auth, POST is public
  const isOrdersApi = pathname.startsWith("/api/orders");
  const isOrdersReadOrUpdate =
    isOrdersApi && (request.method === "GET" || request.method === "PUT");

  const needsAuth = isProtectedPage || isProtectedApi || isOrdersReadOrUpdate;

  if (!needsAuth) {
    return NextResponse.next();
  }

  if (!hasValidSession) {
    // For API routes, return 401
    if (isProtectedApi || isOrdersReadOrUpdate) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // For pages, redirect to login
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/orders/:path*",
    "/api/stats/:path*",
    "/api/settings/:path*",
    "/api/products/:path*",
    "/api/messages/:path*",
  ],
};
