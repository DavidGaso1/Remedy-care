import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateCsrfToken } from "@/lib/csrf";

export const dynamic = "force-dynamic";

// Whitelist of allowed settings columns to prevent SQL injection
const ALLOWED_FIELDS = new Set([
  "site_name",
  "site_description",
  "currency",
  "whatsapp_number",
  "default_message",
  "consultation_message",
  "new_order_notifications",
  "new_message_notifications",
  "low_stock_alerts",
  "weekly_reports",
  "admin_email",
  "primary_color",
  "accent_color",
]);

export async function GET() {
  try {
    const settings = db.prepare("SELECT * FROM settings WHERE id = 1").get();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings API error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    // Validate CSRF token
    const csrfToken = request.headers.get("X-CSRF-Token");
    if (!csrfToken || !validateCsrfToken(csrfToken)) {
      return NextResponse.json(
        { error: "Invalid or missing CSRF token" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const fields: string[] = [];
    const values: (string | number)[] = [];

    for (const [key, value] of Object.entries(body)) {
      // Only allow whitelisted column names — prevents SQL injection
      if (!ALLOWED_FIELDS.has(key)) {
        continue;
      }
      fields.push(`${key} = ?`);
      values.push(value as string | number);
    }

    if (fields.length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(1); // for WHERE id = 1

    db.prepare(`UPDATE settings SET ${fields.join(", ")} WHERE id = ?`).run(...values);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
