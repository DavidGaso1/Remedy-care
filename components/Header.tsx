"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, Leaf } from "lucide-react";
import type { SiteSettings } from "@/lib/db";

const navLinks = [
  { href: "/ed-sexual-health", label: "Sexual Health" },
  { href: "/prostate", label: "Prostate" },
  { href: "/diabetes", label: "Diabetes" },
  { href: "/infection", label: "Infections" },
  { href: "/joint-pain", label: "Joint Pain" },
  { href: "/blood-pressure", label: "Blood Pressure" },
  { href: "/ulcer", label: "Ulcer Relief" },
  { href: "/about", label: "About" },
];

import { ThemeToggle } from "./ThemeToggle";

export default function Header({ settings }: { settings?: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);

  const siteName = settings?.site_name || "Advanced Natural Remedy";
  const whatsappNumber = settings?.whatsapp_number?.replace(/\D/g, "") || "2348140874503";
  const consultationMessage = settings?.consultation_message || "Hello I need a consultation";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(consultationMessage)}`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0d2010]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(45,106,79,0.10)] border-b border-primary/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-md shadow-primary/25 group-hover:shadow-lg group-hover:shadow-primary/35 transition-all duration-300">
              <Leaf size={16} className="text-white" />
            </div>
            <span className={`font-extrabold text-lg leading-tight transition-colors duration-300 ${scrolled ? "text-[#0d2010] dark:text-white" : "text-white nature-text-shadow"}`}>
              {siteName.split(' ')[0]}
              <span className="text-gradient"> {siteName.split(' ').slice(1).join(' ')}</span>
            </span>
          </Link>

          {/* Horizontal Scrolling Nav */}
          <nav className="flex-1 mx-4 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-1 min-w-max">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium px-3 py-2 rounded-lg transition-all duration-300 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary/10 whitespace-nowrap ${
                    scrolled ? "text-slate-600 dark:text-slate-300" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA & ThemeToggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/admin/login"
              className="hidden sm:flex items-center gap-2 bg-slate-700 dark:bg-slate-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-700 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Admin
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-[#1ebe5d] shadow-md shadow-[#25D366]/20 hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={14} />
              <span className="hidden md:inline">Consult Now</span>
            </a>
          </div>
        </div>
      </div>

    </header>
  );
}
