"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, MessageSquare, Settings, X, Menu, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Toaster, toast } from 'react-hot-toast';

// Converts a base64url string to ArrayBuffer for web push subscription
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastOrderId = useRef<number | null>(null);
  const lastMessageId = useRef<number | null>(null);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Register service worker and subscribe to push notifications
  useEffect(() => {
    if (pathname === "/admin/login") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const subscribeToPush = async () => {
      try {
        // Get VAPID public key from server
        const keyRes = await fetch("/api/push/vapid-public-key");
        if (!keyRes.ok) return;
        const { publicKey } = await keyRes.json();

        // Register service worker
        const registration = await navigator.serviceWorker.register("/sw.js");
        await navigator.serviceWorker.ready;

        // Check current permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        // Check if already subscribed
        let subscription = await registration.pushManager.getSubscription();

        // Subscribe if not yet subscribed
        if (!subscription) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey),
          });
        }

        // Send subscription to server
        await fetch("/api/push/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscription }),
        });
      } catch (err) {
        console.error("Push subscription error:", err);
      }
    };

    subscribeToPush();
  }, [pathname]);

  useEffect(() => {
    // Don't poll on login page
    if (pathname === "/admin/login") return;

    // Polling function for orders
    const checkForNewOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) return;
        const orders = await res.json();

        if (orders && Array.isArray(orders) && orders.length > 0) {
          const latestOrder = orders[0];

          // If we have a previously recorded max ID, and the new ID is greater
          if (lastOrderId.current !== null && latestOrder.id > lastOrderId.current) {
            toast.success(
              <div className="flex flex-col gap-1">
                <span className="font-bold">New Order Received!</span>
                <span className="text-sm">{latestOrder.customer} ordered {latestOrder.product}</span>
              </div>,
              { duration: 5000, position: 'top-right' }
            );
          }

          // Update the highest known order ID
          const currentMaxId = Math.max(...orders.map((o: { id: number }) => o.id));
          if (lastOrderId.current === null || currentMaxId > lastOrderId.current) {
            lastOrderId.current = currentMaxId;
          }
        }
      } catch (err) {
        console.error("Order polling error:", err);
      }
    };

    // Polling function for messages
    const checkForNewMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        if (!res.ok) return;
        const messages = await res.json();

        if (messages && Array.isArray(messages) && messages.length > 0) {
          // Filter for new messages only
          const newMessages = messages.filter((m: { status: string }) => m.status === 'new');
          
          if (newMessages.length > 0) {
            const latestMessage = newMessages[0];

            // If we have a previously recorded max ID, and the new ID is greater
            if (lastMessageId.current !== null && latestMessage.id > lastMessageId.current) {
              toast.success(
                <div className="flex flex-col gap-1">
                  <span className="font-bold">New Message Received!</span>
                  <span className="text-sm">{latestMessage.name} - {latestMessage.product}</span>
                </div>,
                { duration: 5000, position: 'top-right' }
              );
            }

            // Update the highest known message ID (among new messages)
            const currentMaxId = Math.max(...newMessages.map((m: { id: number }) => m.id));
            if (lastMessageId.current === null || currentMaxId > lastMessageId.current) {
              lastMessageId.current = currentMaxId;
            }
          }
        }
      } catch (err) {
        console.error("Message polling error:", err);
      }
    };

    // Initial check
    checkForNewOrders();
    checkForNewMessages();

    // Poll every 15 seconds
    const interval = setInterval(() => {
      checkForNewOrders();
      checkForNewMessages();
    }, 15000);
    return () => clearInterval(interval);
  }, [pathname]);

  // Don't render admin layout shell for login page
  // This MUST be after all hooks (Rules of Hooks)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Mobile Header */}
      <div className="lg:hidden bg-dark text-white px-4 py-3 flex items-center justify-between">
        <span className="font-bold">Admin Panel</span>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-64 bg-dark text-white h-full transform transition-transform lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between">
          <span className="font-bold text-lg">Admin Panel</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-white/10'}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {children}
      </main>
    </div>
  );
}
