"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Droplet, ShieldAlert, Bone, Heart, Leaf, Shield, AlertTriangle, AlertCircle, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Activity,
  ShieldCheck,
  Droplet,
  ShieldAlert,
  Bone,
  Heart,
  Leaf,
  Shield,
  AlertTriangle,
  AlertCircle,
};

const blobVariants = {
  animate: (delay: number) => ({
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "60% 40% 30% 70% / 60% 30% 70% 40%",
    ],
    x: [0, 10, -10, 0],
    y: [0, -10, 10, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay * 1.5,
    },
  }),
};

interface LiquidProductCardProps {
  slug: string;
  icon: string;
  iconClassName?: string;
  name: string;
  tagline: string;
  desc: string;
  color: string;
  bgGlow: string;
  startPrice: string;
  image: string;
  index?: number;
}

export default function LiquidProductCard({
  slug,
  icon,
  iconClassName = "text-rose-500",
  name,
  tagline,
  desc,
  color,
  bgGlow,
  startPrice,
  image,
  index = 0,
}: LiquidProductCardProps) {
  const Icon = iconMap[icon] || Activity;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.14)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="h-full"
    >
      <Link
        href={`/${slug}`}
        className="group relative flex flex-col bg-[#1a1f2e] dark:bg-[#1a1f2e] overflow-hidden border border-white/10 dark:border-white/10 rounded-[16px] h-full"
        style={{
          minHeight: "280px",
        }}
      >
        {/* Liquid Morphing Blob Background */}
        <motion.div
          variants={blobVariants}
          custom={index}
          animate="animate"
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            top: -40,
            right: -40,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Shimmer Sweep on Hover */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
          initial={{ x: "-100%" }}
          animate={{ x: hovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Product Image Container */}
        <div className="relative flex items-center justify-center w-full h-40 sm:h-48 md:h-52 bg-white/5 dark:bg-white/5 overflow-hidden p-4 box-border">
          <motion.img
            src={image}
            alt={name}
            className="object-contain w-full h-full"
            style={{
              display: "block",
            }}
            animate={{
              y: [0, -8, 0],
              rotate: [-1, 1, -1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.8,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 relative z-10 flex-1 flex flex-col">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="p-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 dark:border-white/10"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon size={26} className={iconClassName} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h3
                className="font-bold text-white dark:text-white text-base sm:text-lg leading-tight truncate"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {name}
              </motion.h3>
              <p className="text-xs text-white/50 dark:text-white/50 font-medium truncate mt-0.5">
                {tagline}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/60 dark:text-white/60 mb-4 leading-relaxed line-clamp-2">
            {desc}
          </p>

          {/* Price and CTA */}
          <div className="mt-auto pt-4 border-t border-white/10 dark:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-white/40 dark:text-white/40 block font-medium">From</span>
                <motion.span
                  className="font-extrabold text-[#00c853] dark:text-[#00c853] text-lg sm:text-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {startPrice}
                </motion.span>
              </div>
              <motion.div
                className="flex items-center gap-1.5 text-[#00c853] dark:text-[#00c853] text-sm font-semibold group-hover:gap-2.5 transition-all duration-300"
                whileHover={{ x: 2 }}
              >
                <span>View</span>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight size={14} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
