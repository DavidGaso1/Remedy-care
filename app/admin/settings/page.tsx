"use client";
import { useState, useEffect } from "react";
import { Save, Bell, Shield, Palette, Globe, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { useCsrfToken } from "@/hooks/useCsrfToken";

interface Settings {
  site_name: string;
  site_description: string;
  currency: string;
  whatsapp_number: string;
  default_message: string;
  consultation_message: string;
  new_order_notifications: number;
  new_message_notifications: number;
  low_stock_alerts: number;
  weekly_reports: number;
  admin_email: string;
  primary_color: string;
  accent_color: string;
}

export default function SettingsPage() {
  const { csrfToken, getCsrfHeaders, csrfLoading } = useCsrfToken();
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>({
    site_name: "Advanced Natural Remedy",
    site_description: "Science-backed natural solutions for your health challenges",
    currency: "NGN",
    whatsapp_number: "+2349061505041",
    default_message: "Hello Dr I've Read And I Want To Place Order For Your {product} Treatment Pack!",
    consultation_message: "Hello I need a free consultation",
    new_order_notifications: 1,
    new_message_notifications: 1,
    low_stock_alerts: 0,
    weekly_reports: 1,
    admin_email: "admin@example.com",
    primary_color: "#16a34a",
    accent_color: "#f59e0b",
  });

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error("Failed to load settings:", err);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!csrfToken) {
      toast.error("Security token not loaded. Please refresh the page.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: getCsrfHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        // Re-fetch to confirm persistence
        await fetchSettings();
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

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
        <h1 className="text-2xl font-bold text-dark">Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving || csrfLoading}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-primary/70 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle size={18} />
              Saved!
            </>
          ) : (
            <>
              <Save size={18} />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-2 flex-shrink-0 lg:h-fit">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                    activeTab === tab.id ? "bg-primary text-white" : "text-slate-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-dark mb-4">General Settings</h2>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Site Name</label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Site Description</label>
                <textarea
                  rows={3}
                  value={settings.site_description}
                  onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "whatsapp" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-dark mb-4">WhatsApp Settings</h2>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  value={settings.whatsapp_number}
                  onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Default Message</label>
                <textarea
                  rows={3}
                  value={settings.default_message}
                  onChange={(e) => setSettings({ ...settings, default_message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-dark mb-4">Notifications</h2>
              {[
                { key: "new_order_notifications", label: "New order notifications", desc: "Get notified when a customer places an order" },
                { key: "new_message_notifications", label: "New message notifications", desc: "Get notified when a customer sends a message" },
                { key: "low_stock_alerts", label: "Low stock alerts", desc: "Get notified when product stock is running low" },
                { key: "weekly_reports", label: "Weekly reports", desc: "Receive weekly summary reports via email" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-dark">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings[item.key as keyof Settings] === 1}
                      onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked ? 1 : 0 })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-dark mb-4">Security</h2>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Admin Email</label>
                <input
                  type="email"
                  value={settings.admin_email}
                  onChange={(e) => setSettings({ ...settings, admin_email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-dark mb-4">Appearance</h2>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primary_color}
                    onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600">{settings.primary_color}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.accent_color}
                    onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                    className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <span className="text-sm text-slate-600">{settings.accent_color}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
