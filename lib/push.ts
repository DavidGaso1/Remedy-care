import webpush from "web-push";
import { db } from "@/lib/db";

// Configure VAPID details
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:admin@naturalremedy.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

interface PushNotificationPayload {
  title: string;
  body: string;
  tag?: string;
  url?: string;
}

export async function sendPushToAllAdmins(payload: PushNotificationPayload) {
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    console.warn("VAPID keys not configured, skipping push notification");
    return;
  }

  const subs = db.prepare("SELECT subscription FROM push_subscriptions").all() as { subscription: string }[];

  const results = await Promise.allSettled(
    subs.map(async (row) => {
      const subscription = JSON.parse(row.subscription);
      await webpush.sendNotification(subscription, JSON.stringify(payload));
    })
  );

  // Clean up expired subscriptions (410 Gone)
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      const err = result.reason as { statusCode?: number };
      if (err?.statusCode === 410 || err?.statusCode === 404) {
        try {
          const sub = JSON.parse(subs[index].subscription);
          db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").run(sub.endpoint);
        } catch {
          // ignore cleanup errors
        }
      }
    }
  });
}
