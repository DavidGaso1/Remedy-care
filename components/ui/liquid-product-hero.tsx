"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, AlertCircle, AlertTriangle, Activity, ShieldCheck, Droplet, ShieldAlert, Bone, Heart, Leaf, Shield } from "lucide-react";

interface LiquidProductHeroProps {
  slug: string;
  heroHeadline: string;
  heroSubheadline: string;
  onOrderClick: () => void;
}

export default function LiquidProductHero({
  slug,
  heroHeadline,
  heroSubheadline,
  onOrderClick,
}: LiquidProductHeroProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  const getProductIcon = (slug: string) => {
    const iconProps = { size: 64, className: "mx-auto opacity-90" };
    switch (slug) {
      case "ed-sexual-health": return <Activity {...iconProps} className="mx-auto opacity-90 text-rose-300" />;
      case "prostate": return <ShieldCheck {...iconProps} className="mx-auto opacity-90 text-blue-300" />;
      case "diabetes": return <Droplet {...iconProps} className="mx-auto opacity-90 text-amber-300" />;
      case "infection": return <ShieldAlert {...iconProps} className="mx-auto opacity-90 text-teal-300" />;
      case "joint-pain": return <Bone {...iconProps} className="mx-auto opacity-90 text-purple-300" />;
      case "blood-pressure": return <Heart {...iconProps} className="mx-auto opacity-90 text-rose-300" />;
      case "ulcer": return <Leaf {...iconProps} className="mx-auto opacity-90 text-emerald-300" />;
      case "cancer": return <Shield {...iconProps} className="mx-auto opacity-90 text-indigo-300" />;
      case "female-infertility": return <Heart {...iconProps} className="mx-auto opacity-90 text-pink-300" />;
      case "hemorrhoid-pile": return <Droplet {...iconProps} className="mx-auto opacity-90 text-amber-300" />;
      case "hepatitis": return <AlertTriangle {...iconProps} className="mx-auto opacity-90 text-yellow-300" />;
      case "liver-disease": return <AlertCircle {...iconProps} className="mx-auto opacity-90 text-amber-300" />;
      case "stroke": return <Activity {...iconProps} className="mx-auto opacity-90 text-red-300" />;
      default: return <Activity {...iconProps} />;
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3 + i * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-sage-900/80 to-slate-900 text-white py-20 md:py-28 lg:py-32 px-4"
    >
      {/* Liquid Background Blobs */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: "200% 200%",
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(143, 188, 143, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(123, 158, 176, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(155, 140, 191, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-5xl mx-auto text-center w-full"
      >
        {/* Icon */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 inline-flex p-6 bg-white/10 backdrop-blur-2xl rounded-3xl w-28 h-28 items-center justify-center border border-white/20 shadow-liquid"
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {getProductIcon(slug)}
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
        >
          {heroHeadline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {heroSubheadline}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onClick={onOrderClick}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white font-medium px-6 py-3 rounded-2xl shadow-liquid hover:shadow-liquid-hover transition-all duration-300"
        >
          <MessageCircle size={16} />
          Order Now — Pay on Delivery
        </motion.button>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30 pointer-events-none" />
    </motion.section>
  );
}
