import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subscription } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
    }

    const endpoint = subscription.endpoint;
    const subJson = JSON.stringify(subscription);

    // Upsert — insert or replace subscription by endpoint
    db.prepare(`
      INSERT INTO push_subscriptions (endpoint, subscription)
      VALUES (?, ?)
      ON CONFLICT(endpoint) DO UPDATE SET subscription = excluded.subscription, updated_at = CURRENT_TIMESTAMP
    `).run(endpoint, subJson);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Push subscribe error:", error);
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { endpoint } = body;

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint required" }, { status: 400 });
    }

    db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").run(endpoint);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Push unsubscribe error:", error);
    return NextResponse.json({ error: "Failed to remove subscription" }, { status: 500 });
  }
}
