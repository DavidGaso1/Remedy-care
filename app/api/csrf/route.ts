import { NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/csrf";
import { verifyAdminSessionToken } from "@/lib/adminSession";

export const dynamic = "force-dynamic";

// GET - Generate CSRF token for authenticated admin
export async function GET(request: Request) {
  try {
    // Verify admin is authenticated first
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionCookie = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("admin-session="));

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = sessionCookie.split("=").slice(1).join("=").trim();
    if (!token || !verifyAdminSessionToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate CSRF token
    const { token: csrfToken, expiresAt } = generateCsrfToken();

    return NextResponse.json({
      csrfToken,
      expiresAt,
    });
  } catch (error) {
    console.error("CSRF token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
