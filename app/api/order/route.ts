import { NextResponse } from "next/server";

const WEBHOOK_URL = "https://n8n.simeonsamari.com/webhook/Remedy_Care";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }

  // Always log the order locally — this is the source of truth
  console.log("=== ORDER RECEIVED ===");
  console.log("Product:", body.productName, "| Pack:", body.packLabel, "| Price:", body.packPrice);
  console.log("Customer:", body.customer, "| Phone:", body.phone);
  console.log("Address:", body.address, "| Delivery:", body.deliveryDate, "| Payment:", body.paymentOption);
  console.log("======================");

  // Fire-and-forget webhook delivery — don't block the customer's response
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) {
        console.log("Webhook delivered successfully");
      } else {
        console.error("Webhook returned", res.status, res.statusText);
      }
    })
    .catch((err) => {
      console.error("Webhook delivery error:", err.message);
    });

  // Return success immediately — the order is logged in the server terminal
  return NextResponse.json({ success: true, message: "Order received" });
}
