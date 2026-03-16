"use client";
import { useState, useEffect } from "react";
import { Users, Package, MessageSquare, TrendingUp, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCsrfToken } from "@/hooks/useCsrfToken";

interface Stats {
  totalOrders: number;
  totalOrdersChange: number;
  customers: number;
  customersChange: number;
  messages: number;
  messagesChange: number;
  revenue: number;
  revenueChange: number;
}

interface Order {
  id: number;
  order_id: string;
  customer: string;
  phone: string;
  product: string;
  amount: number;
  address?: string;
  delivery_date?: string;
  payment_option?: string;
  status: string;
  date: string;
}

export default function DashboardPage() {
  const { csrfToken, getCsrfHeaders } = useCsrfToken();
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load statistics");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data.slice(0, 5));
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
      toast.error("Failed to load recent orders");
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchOrders()]);
      setLoading(false);
    };
    init();
  }, []);

  const getRelativeTime = (dateString: string) => {
    if (!dateString) return "";
    const normalized = dateString.includes("T") ? dateString : dateString.replace(" ", "T");
    const withTimezone = /Z$/i.test(normalized) ? normalized : `${normalized}Z`;
    const date = new Date(withTimezone);
    if (Number.isNaN(date.getTime())) return "";
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (diffSeconds < 5) return "just now";
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (minutes < 60) return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  const formatFullDate = (dateString: string) => {
    if (!dateString) return "";
    const normalized = dateString.includes("T") ? dateString : dateString.replace(" ", "T");
    const withTimezone = /Z$/i.test(normalized) ? normalized : `${normalized}Z`;
    const date = new Date(withTimezone);
    if (Number.isNaN(date.getTime())) return "";
    
    return date.toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusToggle = async (orderId: number, currentStatus: string) => {
    if (!csrfToken) {
      toast.error("Security token not loaded. Please refresh the page.");
      return;
    }
    // Cycle through: pending -> processing -> delivered -> cancelled -> pending
    const statuses = ["pending", "processing", "delivered", "cancelled"];
    const currentIndex = statuses.indexOf(currentStatus);
    const newStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: getCsrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update order");

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      // Re-fetch stats as revenue/counts might have changed
      fetchStats();

      toast.success(`Order marked as ${newStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  const statItems = stats ? [
    { label: "Total Orders", value: stats.totalOrders, change: stats.totalOrdersChange, icon: Package },
    { label: "Customers", value: stats.customers.toLocaleString(), change: stats.customersChange, icon: Users },
    { label: "Messages", value: stats.messages, change: stats.messagesChange, icon: MessageSquare },
    { label: "Revenue", value: `₦${stats.revenue.toLocaleString()}`, change: stats.revenueChange, icon: TrendingUp },
  ] : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-dark mb-6">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statItems.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-primary" size={20} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  stat.change > 0 ? "text-green-600" : stat.change < 0 ? "text-red-600" : "text-slate-400"
                }`}>
                  {stat.change > 0 ? <ArrowUp size={14} /> : stat.change < 0 ? <ArrowDown size={14} /> : null}
                  {stat.change > 0 ? `+${stat.change}%` : stat.change < 0 ? `${stat.change}%` : "0%"}
                </div>
              </div>
              <p className="text-xl font-bold text-dark">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h2 className="font-bold text-dark">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Order ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Customer</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Contact & Location</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase hidden md:table-cell">Details</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-primary">{order.order_id}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-dark font-bold">{order.customer}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 max-w-xs">
                    <div>{order.phone}</div>
                    {order.address && <div className="text-xs mt-1 text-slate-500 truncate" title={order.address}>{order.address}</div>}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 hidden md:table-cell">
                    <div className="font-medium">{order.product}</div>
                    <div className="text-xs text-primary font-bold mt-1">₦{order.amount.toLocaleString()}</div>
                    {order.payment_option && <div className="text-[10px] mt-1 uppercase text-slate-400">{order.payment_option}</div>}
                    {order.delivery_date && <div className="text-[10px] uppercase text-emerald-600">DEL: {order.delivery_date}</div>}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      {/* Visual switch button */}
                      <button
                        onClick={() => handleStatusToggle(order.id, order.status)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${order.status === 'delivered' ? 'bg-primary' : 'bg-gray-300'}`}
                        title={order.status === 'delivered' ? "Mark as Pending" : "Mark as Delivered"}
                      >
                        <span className="sr-only">Toggle Status</span>
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${order.status === 'delivered' ? 'translate-x-2' : '-translate-x-2'}`}
                        />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-500" title={formatFullDate(order.date)}>
                    {getRelativeTime(order.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No orders in the database yet.
          </div>
        )}
      </div>
    </div>
  );
}
