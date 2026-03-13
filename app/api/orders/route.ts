import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateCsrfToken } from "@/lib/csrf";
import { getClientIP } from "@/lib/ip";

const VALID_ORDER_STATUSES = ["pending", "processing", "delivered", "cancelled"];

// In-memory rate limiting for public orders endpoint
const orderSubmissions = new Map<string, { count: number; resetAt: number }>();
const ORDER_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const ORDER_MAX_SUBMISSIONS = 10;

function checkOrderRateLimit(ip: string): { allowed: boolean; remainingMs: number } {
  const now = Date.now();
  const entry = orderSubmissions.get(ip);

  if (!entry || now > entry.resetAt) {
    orderSubmissions.set(ip, { count: 1, resetAt: now + ORDER_RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remainingMs: 0 };
  }

  if (entry.count >= ORDER_MAX_SUBMISSIONS) {
    return { allowed: false, remainingMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true, remainingMs: 0 };
}

export async function GET() {
  try {
    const orders = db.prepare(`
      SELECT id, order_id, customer, phone, product, amount, address, delivery_date, payment_option, status, created_at as date
      FROM orders
      ORDER BY created_at DESC
      LIMIT 50
    `).all();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders API error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Rate limit check
    const clientIP = getClientIP(request);
    const rateCheck = checkOrderRateLimit(clientIP);
    if (!rateCheck.allowed) {
      const retryMinutes = Math.ceil(rateCheck.remainingMs / 60000);
      return NextResponse.json(
        { error: `Too many orders. Please try again in ${retryMinutes} minute(s).` },
        { status: 429, headers: { "Retry-After": String(Math.ceil(rateCheck.remainingMs / 1000)) } }
      );
    }

    const body = await request.json();
    const { customer, phone, product, amount, address, delivery_date, payment_option } = body;
    const status = "pending"; // always force pending — clients must not set order status

    // Input validation
    if (!customer || typeof customer !== "string" || customer.trim().length === 0) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }
    if (!product || typeof product !== "string" || product.trim().length === 0) {
      return NextResponse.json({ error: "Product is required" }, { status: 400 });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 });
    }
    // Sanitize string inputs
    const sanitizedCustomer = customer.trim().slice(0, 200);
    const sanitizedPhone = phone.trim().slice(0, 30);
    const sanitizedProduct = product.trim().slice(0, 200);
    const sanitizedAddress = address ? String(address).trim().slice(0, 500) : null;
    const sanitizedDeliveryDate = delivery_date ? String(delivery_date).trim().slice(0, 20) : null;
    const sanitizedPaymentOption = payment_option ? String(payment_option).trim().slice(0, 50) : null;

    // Generate order ID
    const countResult = db.prepare("SELECT COUNT(*) as count FROM orders").get() as { count: number };
    const orderId = `ORD-${String(countResult.count + 1).padStart(3, "0")}`;

    const result = db.prepare(`
      INSERT INTO orders (order_id, customer, phone, product, amount, address, delivery_date, payment_option, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(orderId, sanitizedCustomer, sanitizedPhone, sanitizedProduct, amount, sanitizedAddress, sanitizedDeliveryDate, sanitizedPaymentOption, status);

    return NextResponse.json({
      id: result.lastInsertRowid,
      order_id: orderId,
      customer: sanitizedCustomer,
      phone: sanitizedPhone,
      product: sanitizedProduct,
      amount,
      address: sanitizedAddress,
      delivery_date: sanitizedDeliveryDate,
      payment_option: sanitizedPaymentOption,
      status,
    }, { status: 201 });
  } catch (error) {
    console.error("Orders POST error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
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
      return NextResponse.json({ error: "Valid order ID is required" }, { status: 400 });
    }
    if (!status || !VALID_ORDER_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Orders PUT error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
