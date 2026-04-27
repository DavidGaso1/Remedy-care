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
  const whatsappUrl = `https://api.unsplash.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(consultationMessage)}`;

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
    hidden: { opacity: 0, y: -6 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease },
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

  // Product list item with liquid hover effect
  const productListItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.04, duration: 0.25, ease },
    }),
  };

  return (
    <>
      {/* Custom CSS for liquid animations */}
      <style jsx global>{`
        @keyframes liquid-blob {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: translate(5px, -5px) rotate(5deg);
          }
          50% {
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
            transform: translate(-3px, 5px) rotate(-3deg);
          }
          75% {
            border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%;
            transform: translate(3px, -3px) rotate(3deg);
          }
        }

        @keyframes liquid-pour {
          0% {
            transform: scaleY(0);
            opacity: 0;
            filter: blur(8px);
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
            filter: blur(0);
          }
        }

        @keyframes liquid-ripple {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 200, 83, 0.4);
          }
          100% {
            box-shadow: 0 0 0 12px rgba(0, 200, 83, 0);
          }
        }

        .liquid-blob-animation {
          animation: liquid-blob 12s ease-in-out infinite;
        }

        .liquid-pour-animation {
          animation: liquid-pour 0.5s ease-out forwards;
        }

        .liquid-ripple-animation {
          animation: liquid-ripple 0.8s ease-out infinite;
        }

        /* Custom scrollbar for dark theme */
        .scrollbar-dark::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-dark::-webkit-scrollbar-track {
          background: rgba(10, 20, 30, 0.3);
          border-radius: 3px;
        }

        .scrollbar-dark::-webkit-scrollbar-thumb {
          background: rgba(0, 200, 83, 0.4);
          border-radius: 3px;
        }

        .scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 200, 83, 0.6);
        }

        .scrollbar-dark {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 200, 83, 0.4) rgba(10, 20, 30, 0.3);
        }
      `}</style>

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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Leaf size={18} className="text-white" />
            <span className="font-extrabold text-base leading-tight text-white">
              {siteName.split(" ")[0]}
              <span className="text-gradient"> {siteName.split(" ").slice(1).join(" ")}</span>
            </span>
          </Link>

          {/* Desktop Nav */}
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
                  className="relative text-sm font-medium px-3 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 text-slate-300 hover:text-[#00c853] hover:bg-white/[0.07]"
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
                      initial={{ opacity: 0, y: -12, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, scale: 0.94, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease }}
                      className="absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 min-w-[240px] rounded-2xl p-1 z-[100] liquid-pour-animation"
                      style={{
                        background: "rgba(10, 20, 30, 0.75)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        boxShadow: "0 12px 48px rgba(0, 200, 83, 0.15), 0 0 60px rgba(0, 200, 83, 0.1)",
                      }}
                    >
                      {/* Liquid blob background */}
                      <div
                        className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
                        style={{ zIndex: 0 }}
                      >
                        <div
                          className="liquid-blob-animation absolute"
                          style={{
                            width: "180px",
                            height: "180px",
                            background: "radial-gradient(circle, rgba(0, 200, 83, 0.15) 0%, rgba(0, 200, 83, 0.05) 50%, transparent 70%)",
                            top: "-60px",
                            right: "-40px",
                          }}
                        />
                        <div
                          className="liquid-blob-animation absolute"
                          style={{
                            width: "140px",
                            height: "140px",
                            background: "radial-gradient(circle, rgba(0, 200, 83, 0.1) 0%, rgba(0, 200, 83, 0.03) 50%, transparent 70%)",
                            bottom: "-40px",
                            left: "-30px",
                            animationDelay: "-4s",
                          }}
                        />
                      </div>

                      <div className="relative z-10 max-h-[60vh] overflow-y-auto scrollbar-dark py-2">
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
                              className="relative block px-4 py-2.5 text-sm rounded-lg text-white/[0.85] hover:text-white transition-colors duration-200"
                              style={{
                                letterSpacing: "0.3px",
                              }}
                            >
                              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#00c853] rounded-l-lg opacity-0 hover:opacity-100 transition-opacity duration-200" />
                              <span className="relative z-10">{link.label}</span>
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
                  className="relative text-sm font-medium px-3 py-2 rounded-xl transition-all duration-300 text-slate-300 hover:text-[#00c853] hover:bg-white/[0.07]"
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
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 rounded-2xl shadow-liquid transition-colors duration-300"
              style={{ position: "relative", overflow: "hidden" }}
            >
              <motion.span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "2xl",
                  originX: 0,
                  scaleX: consultHovered ? 1 : 0,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: consultHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <Phone size={12} style={{ position: "relative", zIndex: 1 }} />
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

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={mobilePanelRef}
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, scale: 0.97, filter: "blur(4px)" }}
            transition={{ duration: 0.35, ease }}
            className="fixed top-[86px] left-1/2 -translate-x-1/2 max-w-[85vw] w-[85vw] z-[9999] lg:hidden rounded-[24px] p-5 liquid-pour-animation"
            style={{
              background: "rgba(10, 20, 30, 0.75)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 12px 48px rgba(0, 200, 83, 0.15), 0 0 60px rgba(0, 200, 83, 0.1)",
            }}
          >
            {/* Liquid blob background */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <div
                className="liquid-blob-animation absolute"
                style={{
                  width: "200px",
                  height: "200px",
                  background: "radial-gradient(circle, rgba(0, 200, 83, 0.12) 0%, rgba(0, 200, 83, 0.04) 50%, transparent 70%)",
                  top: "-40px",
                  right: "-30px",
                }}
              />
              <div
                className="liquid-blob-animation absolute"
                style={{
                  width: "160px",
                  height: "160px",
                  background: "radial-gradient(circle, rgba(0, 200, 83, 0.08) 0%, rgba(0, 200, 83, 0.02) 50%, transparent 70%)",
                  bottom: "-30px",
                  left: "-20px",
                  animationDelay: "-6s",
                }}
              />
            </div>

            <motion.nav
              variants={mobileContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 flex flex-col"
            >
              {/* Products accordion */}
              <motion.div variants={mobileItemVariants}>
                <button
                  onClick={() => setIsMobileProductsOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-white/[0.9] hover:bg-white/[0.07] transition-colors"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Products
                  <motion.div
                    animate={{ rotate: isMobileProductsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <ChevronDown size={16} className="text-white/[0.7]" />
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
                      <div
                        className="pl-4 border-l-2 border-[#00c853] ml-4 max-h-[60vh] overflow-y-auto scrollbar-dark py-2"
                      >
                        {productLinks.map((link, i) => (
                          <motion.div
                            key={link.href}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={productListItemVariants}
                          >
                            <Link
                              href={link.href}
                              onClick={closeMobile}
                              className="relative block px-4 py-2.5 text-sm rounded-lg text-white/[0.85] hover:text-white transition-colors duration-200 mb-1"
                              style={{ letterSpacing: "0.3px" }}
                            >
                              <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#00c853] rounded-l-lg opacity-0 hover:opacity-100 transition-opacity duration-200" />
                              <span className="relative z-10">{link.label}</span>
                            </Link>
                          </motion.div>
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
                    className="block px-4 py-3 text-sm font-medium rounded-xl text-white/[0.9] hover:bg-white/[0.07] transition-colors"
                    style={{ letterSpacing: "0.3px" }}
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
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg"
                  style={{
                    boxShadow: "0 8px 24px rgba(0, 200, 83, 0.25)",
                  }}
                >
                  <Phone size={14} />
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
