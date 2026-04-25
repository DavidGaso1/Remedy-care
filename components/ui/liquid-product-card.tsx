"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Droplet, ShieldAlert, Bone, Heart, Leaf, Shield, AlertTriangle, AlertCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/${slug}`}
        className="group block relative bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-liquid hover:shadow-liquid-hover transition-all duration-500 overflow-hidden border border-white/60 dark:border-white/10"
      >
        {/* Liquid Morphing Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${color.replace('from-', '').replace(' to-', '/')} 0%, ${color.split(' to-')[1]}/20 100%)`,
          }}
        />

        {/* Gradient Top Bar */}
        <div className={`h-1.5 bg-gradient-to-r ${color} relative z-10`} />

        {/* Product Image Container */}
        <div className={`relative h-48 md:h-52 ${bgGlow} dark:bg-white/5 overflow-hidden`}>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4"
            />
          </motion.div>

          {/* Glassmorphism Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          {/* Icon and Title */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="p-2.5 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 dark:border-white/10"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon size={26} className={iconClassName} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h3
                className="font-bold text-slate-900 dark:text-white text-lg leading-tight truncate"
                whileHover={{ x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {name}
              </motion.h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">
                {tagline}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed line-clamp-2">
            {desc}
          </p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-white/30 dark:border-white/5">
            <div>
              <span className="text-xs text-slate-400 dark:text-slate-500 block font-medium">From</span>
              <motion.span
                className="font-extrabold text-sage-600 dark:text-sage-400 text-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {startPrice}
              </motion.span>
            </div>
            <motion.div
              className="flex items-center gap-1.5 text-sage-600 dark:text-sage-400 text-sm font-semibold group-hover:gap-2.5 transition-all duration-300"
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

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          initial={false}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      </Link>
    </motion.div>
  );
}
