"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Leaf, ChevronDown } from "lucide-react";

const productLinks = [
  { href: "/ed-sexual-health", label: "Sexual Health" },
  { href: "/prostate", label: "Prostate" },
  { href: "/diabetes", label: "Diabetes" },
  { href: "/infection", label: "Infections" },
  { href: "/joint-pain", label: "Joint Pain" },
  { href: "/blood-pressure", label: "Blood Pressure" },
  { href: "/ulcer", label: "Ulcer Relief" },
  { href: "/cancer", label: "Cancer Support" },
  { href: "/female-infertility", label: "Female Infertility" },
  { href: "/hemorrhoid-pile", label: "Hemorrhoid" },
  { href: "/hepatitis", label: "Hepatitis" },
  { href: "/liver-disease", label: "Liver Disease" },
  { href: "/stroke", label: "Stroke Recovery" },
];

const staticLinks = [
  { href: "/about", label: "About Us" },
  { href: "#contact", label: "Contact Us" },
  { href: "#faq", label: "FAQ" },
];

const ease = [0.16, 1, 0.3, 1] as const;

// Nav link stagger variants
const navContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [consultHovered, setConsultHovered] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const siteName = "Remedy Care";
  const whatsappNumber = "2348065648442";
  const consultationMessage = "Hello I need a consultation";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(consultationMessage)}`;

  // Click outside: desktop products dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setIsProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Click outside: mobile panel
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (isMobileOpen && mobilePanelRef.current && !mobilePanelRef.current.contains(e.target as Node)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMobileOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileOpen]);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setIsMobileProductsOpen(false);
  }, []);

  // Desktop dropdown item variants (staggered)
  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.04, duration: 0.3, ease },
    }),
  };

  // Mobile panel item variants
  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
  };

  return (
    <>
      <header
        style={{
          background: "transparent",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 999,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -24, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ duration: 0.7, ease }}
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            background: "#0f1117",
            borderRadius: "9999px",
            padding: "8px 16px",
            boxShadow: "0 4px 40px rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.08)",
            zIndex: 999,
            whiteSpace: "nowrap",
            maxWidth: "calc(100vw - 40px)",
            pointerEvents: "auto",
          }}
        >
          {/* Logo - No wrapper, no background */}
          <Link href="/" className="flex items-center gap-2 group">
            <Leaf size={18} className="text-white" />
            <span className="font-extrabold text-base leading-tight text-white">
              {siteName.split(" ")[0]}
              <span className="text-gradient"> {siteName.split(" ").slice(1).join(" ")}</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-2"
          >
            {/* Products dropdown trigger */}
            <motion.div variants={navItemVariants}>
              <div
                ref={productsRef}
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <button
                  className="relative text-sm font-medium px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 text-slate-300 hover:text-sage-400 hover:bg-white/[0.07]"
                >
                  Products
                  <motion.div
                    animate={{ rotate: isProductsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.25, ease }}
                      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 min-w-[220px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-2xl p-3 shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-sage-200/50 dark:border-white/[0.06] z-[100]"
                    >
                      <div className="space-y-0.5">
                        {productLinks.map((link, i) => (
                          <motion.div
                            key={link.href}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={dropdownItemVariants}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsProductsOpen(false)}
                              className="block px-4 py-2.5 text-sm rounded-[10px] text-slate-600 dark:text-slate-300 hover:bg-sage-50/50 dark:hover:bg-white/[0.07] hover:text-sage-600 dark:hover:text-sage-400 transition-[background] duration-200"
                            >
                              {link.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Static links */}
            {staticLinks.map((link) => (
              <motion.div key={link.href} variants={navItemVariants}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium px-3 py-2 rounded-xl transition-all duration-300 text-slate-300 hover:text-sage-400 hover:bg-white/[0.07]"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Liquid Consult Now button */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onHoverStart={() => setConsultHovered(true)}
              onHoverEnd={() => setConsultHovered(false)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-[9999px] shadow-liquid transition-colors duration-300"
              style={{ position: "relative", overflow: "hidden" }}
            >
              {/* Liquid fill sweep */}
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "9999px",
                  originX: 0,
                  scaleX: consultHovered ? 1 : 0,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: consultHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <Phone size={14} style={{ position: "relative", zIndex: 1 }} />
              <span className="hidden md:inline" style={{ position: "relative", zIndex: 1 }}>Consult Now</span>
            </motion.a>

            {/* Mobile Hamburger */}
            <motion.button
              onClick={() => setIsMobileOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <motion.line
                  x1="4" x2="20"
                  y1={isMobileOpen ? "12" : "6"} y2={isMobileOpen ? "12" : "6"}
                  animate={{ y1: isMobileOpen ? 12 : 6, y2: isMobileOpen ? 12 : 6, rotate: isMobileOpen ? 45 : 0, originX: "12px", originY: "12px" }}
                  transition={{ duration: 0.3, ease }}
                />
                <motion.line
                  x1="4" x2="20" y1="12" y2="12"
                  animate={{ opacity: isMobileOpen ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.line
                  x1="4" x2="20"
                  y1={isMobileOpen ? "12" : "18"} y2={isMobileOpen ? "12" : "18"}
                  animate={{ y1: isMobileOpen ? 12 : 18, y2: isMobileOpen ? 12 : 18, rotate: isMobileOpen ? -45 : 0, originX: "12px", originY: "12px" }}
                  transition={{ duration: 0.3, ease }}
                />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* ── Mobile Menu Panel ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={mobilePanelRef}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            className="fixed top-[86px] left-1/2 -translate-x-1/2 w-[90vw] z-[9999] lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[20px] p-4 shadow-[0_12px_48px_rgba(0,0,0,0.5)] border border-sage-200/50 dark:border-white/[0.06]"
          >
            <motion.nav
              variants={mobileContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col"
            >
              {/* Products accordion */}
              <motion.div variants={mobileItemVariants}>
                <button
                  onClick={() => setIsMobileProductsOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-sage-50/50 dark:hover:bg-white/[0.07] transition-colors"
                >
                  Products
                  <motion.div
                    animate={{ rotate: isMobileProductsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isMobileProductsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 border-l-2 border-white/[0.15] ml-4 space-y-0.5">
                        {productLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMobile}
                            className="block px-4 py-2.5 text-sm rounded-[10px] text-slate-600 dark:text-slate-300 hover:bg-sage-50/50 dark:hover:bg-white/[0.07] hover:text-sage-600 dark:hover:text-sage-400 transition-[background] duration-200"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Static links */}
              {staticLinks.map((link) => (
                <motion.div key={link.href} variants={mobileItemVariants}>
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="block px-4 py-3 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-sage-50/50 dark:hover:bg-white/[0.07] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button */}
              <motion.div variants={mobileItemVariants} className="mt-2">
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white text-sm font-bold px-5 py-4 rounded-2xl shadow-liquid transition-all duration-300"
                >
                  <Phone size={16} />
                  Consult Now
                </motion.a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
