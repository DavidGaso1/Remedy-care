"use client";
import { useState, useEffect } from "react";
import { Search, CheckCircle, XCircle, MessageSquare, Phone, Mail, Package, Loader2, RefreshCw } from "lucide-react";
import { useCsrfToken } from "@/hooks/useCsrfToken";
import { toast } from "react-hot-toast";

interface Message {
  id: number;
  name: string;
  phone: string;
  email: string;
  product: string;
  message: string;
  status: string;
  date: string;
}

export default function MessagesPage() {
  const { csrfToken, getCsrfHeaders } = useCsrfToken();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updating, setUpdating] = useState<number | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    if (!csrfToken) {
      toast.error("Security token not loaded. Please refresh the page.");
      return;
    }
    setUpdating(id);
    try {
      const res = await fetch("/api/messages", {
        method: "PUT",
        headers: getCsrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        toast.success(`Message marked as ${newStatus}`);
      } else {
        toast.error("Failed to update message status");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update message status");
    } finally {
      setUpdating(null);
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = filter === "all" || msg.status === filter;
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-yellow-100 text-yellow-700";
      case "read": return "bg-blue-100 text-blue-700";
      case "replied": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const newCount = messages.filter((m) => m.status === "new").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-dark">Customer Messages</h1>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Messages</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-dark">{messages.length}</p>
          <p className="text-sm text-slate-500">Total Messages</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-yellow-600">{newCount}</p>
          <p className="text-sm text-slate-500">New Messages</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-2xl font-bold text-green-600">{repliedCount}</p>
          <p className="text-sm text-slate-500">Replied</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-bold text-dark">{msg.name}</h3>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(msg.status)}`}>
                    {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                  </span>
                  <span className="text-xs text-slate-500">{formatDate(msg.date)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Phone size={12} />
                    {msg.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={12} />
                    {msg.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package size={12} />
                    {msg.product}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{msg.message}</p>
              </div>
              <div className="flex items-center gap-2 sm:flex-shrink-0">
                <a
                  href={`https://api.whatsapp.com/send?phone=${msg.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors text-center"
                >
                  Reply
                </a>
                {msg.status === "new" && (
                  <button
                    onClick={() => handleStatusChange(msg.id, "read")}
                    disabled={updating === msg.id}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Mark as read"
                  >
                    {updating === msg.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                  </button>
                )}
                {msg.status === "read" && (
                  <button
                    onClick={() => handleStatusChange(msg.id, "replied")}
                    disabled={updating === msg.id}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Mark as replied"
                  >
                    {updating === msg.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <XCircle size={18} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500">No messages found</p>
        </div>
      )}
    </div>
  );
}
