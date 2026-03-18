import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateCsrfToken } from "@/lib/csrf";
import { getClientIP } from "@/lib/ip";

const VALID_MESSAGE_STATUSES = ["new", "read", "replied"];

// In-memory rate limiting for public messages endpoint
const messageSubmissions = new Map<string, { count: number; resetAt: number }>();
const MESSAGE_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MESSAGE_MAX_SUBMISSIONS = 20;

function checkMessageRateLimit(ip: string): { allowed: boolean; remainingMs: number } {
  const now = Date.now();
  const entry = messageSubmissions.get(ip);

  if (!entry || now > entry.resetAt) {
    messageSubmissions.set(ip, { count: 1, resetAt: now + MESSAGE_RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remainingMs: 0 };
  }

  if (entry.count >= MESSAGE_MAX_SUBMISSIONS) {
    return { allowed: false, remainingMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remainingMs: 0 };
}

export async function GET() {
  try {
    const messages = db.prepare(`
      SELECT id, name, phone, email, product, message, status, created_at as date
      FROM messages
      ORDER BY created_at DESC
      LIMIT 50
    `).all();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Rate limit check
    const clientIP = getClientIP(request);
    const rateCheck = checkMessageRateLimit(clientIP);
    if (!rateCheck.allowed) {
      const retryMinutes = Math.ceil(rateCheck.remainingMs / 60000);
      return NextResponse.json(
        { error: `Too many messages. Please try again in ${retryMinutes} minute(s).` },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rateCheck.remainingMs / 1000)) } }
      );
    }

    const body = await request.json();
    const { name, phone, email, product, message } = body;
    const status = "new"; // always force new — clients must not set message status

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }
    if (!product || typeof product !== "string" || product.trim().length === 0) {
      return NextResponse.json({ error: "Product is required" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    // Sanitize
    const sanitizedName = name.trim().slice(0, 200);
    const sanitizedPhone = phone.trim().slice(0, 30);
    const sanitizedEmail = email ? String(email).trim().slice(0, 200) : null;
    const sanitizedProduct = product.trim().slice(0, 200);
    const sanitizedMessage = message.trim().slice(0, 2000);

    const result = db.prepare(`
      INSERT INTO messages (name, phone, email, product, message, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(sanitizedName, sanitizedPhone, sanitizedEmail, sanitizedProduct, sanitizedMessage, status);

    // Send to n8n webhook
    try {
      await fetch("https://n8n.simeonsamari.com/webhook-test/tubonscare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "message",
          name: sanitizedName,
          phone: sanitizedPhone,
          email: sanitizedEmail,
          product: sanitizedProduct,
          message: sanitizedMessage,
        })
      });
    } catch (err) {
      console.error("Webhook failed:", err);
    }

    return NextResponse.json({
      id: result.lastInsertRowid,
      name: sanitizedName,
      phone: sanitizedPhone,
      email: sanitizedEmail,
      product: sanitizedProduct,
      message: sanitizedMessage,
      status,
    }, { status: 201 });
  } catch (error) {
    console.error("Messages POST error:", error);
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Validate CSRF token for admin operations
    const csrfToken = request.headers.get("X-CSRF-Token");
    if (!csrfToken || !validateCsrfToken(csrfToken)) {
      return NextResponse.json(
        { error: "Invalid or missing CSRF token" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    // Validate
    if (!id || typeof id !== "number") {
      return NextResponse.json({ error: "Valid message ID is required" }, { status: 400 });
    }
    if (!status || !VALID_MESSAGE_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    db.prepare("UPDATE messages SET status = ? WHERE id = ?").run(status, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Messages PUT error:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}
