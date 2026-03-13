import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const ordersResult = db.prepare("SELECT COUNT(*) as total FROM orders").get() as { total: number };
    const totalOrders = ordersResult.total;

    const customersResult = db.prepare("SELECT COUNT(DISTINCT phone) as total FROM orders").get() as { total: number };
    const customers = customersResult.total;

    const messagesResult = db.prepare("SELECT COUNT(*) as total FROM messages").get() as { total: number };
    const messages = messagesResult.total;

    const revenueResult = db.prepare("SELECT COALESCE(SUM(amount), 0) as total FROM orders WHERE status != 'cancelled'").get() as { total: number };
    const revenue = revenueResult.total;

    const stats = {
      totalOrders,
      totalOrdersChange: 0,
      customers,
      customersChange: 0,
      messages,
      messagesChange: 0,
      revenue,
      revenueChange: 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
