"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone, Leaf, Menu, X } from "lucide-react";

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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const siteName = "Remedy Care";
  const whatsappNumber = "2348065648442";
  const consultationMessage = "Hello I need a consultation";

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

          {/* Horizontal Scrolling Nav (Desktop) */}
          <nav className="hidden md:flex flex-1 mx-4 overflow-x-auto scrollbar-hide">
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
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25D366] text-white text-xs sm:text-sm font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl hover:bg-[#1ebe5d] shadow-md shadow-[#25D366]/20 hover:shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={14} />
              <span className="hidden md:inline">Consult Now</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled 
                  ? "text-[#0d2010] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800" 
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0d2010] z-[70] transform transition-transform duration-300 ease-in-out flex flex-col pt-20 px-6 shadow-2xl md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-5 right-5 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors focus:outline-none"
          aria-label="Close Menu"
        >
          <X size={24} />
        </button>
        
        <nav className="flex flex-col gap-4 mt-8">
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-medium text-white/90 hover:text-primary-300 transition-all duration-300 transform ${
                isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${idx * 50 + 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div 
            className={`mt-4 pt-4 border-t border-white/10 transition-all duration-300 transform ${
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${navLinks.length * 50 + 100}ms` }}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-bold px-5 py-3 rounded-xl hover:bg-[#1ebe5d] shadow-md transition-all duration-300"
            >
              <Phone size={16} />
              <span>Consult Now</span>
            </a>
          </div>
        </nav>
      </div>

    </header>
  );
}
