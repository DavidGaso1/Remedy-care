import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionToken, verifyAdminSessionToken } from "@/lib/adminSession";
import { getClientIP } from "@/lib/ip";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// In-memory rate limiting (resets on server restart)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

function checkRateLimit(ip: string): { allowed: boolean; remainingMs: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remainingMs: 0 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return { allowed: false, remainingMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remainingMs: 0 };
}

function resetRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}

function assertAuthConfig() {
  if (process.env.NODE_ENV === "production") {
    if (!ADMIN_PASSWORD) {
      throw new Error("ADMIN_PASSWORD must be set in production");
    }
    if (!process.env.ADMIN_SESSION_SECRET) {
      throw new Error("ADMIN_SESSION_SECRET must be set in production");
    }
  }
}

// POST - Login
export async function POST(request: NextRequest) {
  try {
    assertAuthConfig();

    const clientIP = getClientIP(request);
    const rateCheck = checkRateLimit(clientIP);

    if (!rateCheck.allowed) {
      const retryMinutes = Math.ceil(rateCheck.remainingMs / 60000);
      return NextResponse.json(
        { error: `Too many login attempts. Try again in ${retryMinutes} minute(s).` },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rateCheck.remainingMs / 1000)) } }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!ADMIN_PASSWORD || !password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    resetRateLimit(clientIP);

    const token = createAdminSessionToken();

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// DELETE - Logout
export async function DELETE() {
  assertAuthConfig();
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Change admin cookie SameSite from lax to strict
    path: "/",
    maxAge: 0, // Expire immediately
  });
  return response;
}

// GET - Check auth status
export async function GET(request: NextRequest) {
  assertAuthConfig();

  const token = request.cookies.get("admin-session")?.value;
  if (!token || !verifyAdminSessionToken(token)) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}  
