"use client";

import { motion } from "framer-motion";
import { Leaf, Shield, Truck, CreditCard, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  Shield,
  Truck,
  CreditCard,
};

interface LiquidWhyUsCardProps {
  icon: string;
  iconClassName?: string;
  title: string;
  desc: string;
  gradient: string;
  index?: number;
}

export default function LiquidWhyUsCard({
  icon,
  iconClassName = "text-sage-500",
  title,
  desc,
  gradient,
  index = 0,
}: LiquidWhyUsCardProps) {
  const Icon = iconMap[icon] || Leaf;
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
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
      className="group relative flex items-start gap-4 md:gap-5 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-7 border border-white/50 dark:border-white/10 overflow-hidden"
    >
      {/* Liquid Background */}
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          gradient
        )}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10 flex-shrink-0 p-3 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 dark:border-white/10"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Icon size={32} className={iconClassName} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        <motion.h3
          className="font-bold text-slate-900 dark:text-white mb-1.5 text-lg"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {title}
        </motion.h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {desc}
        </p>
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
    </motion.div>
  );
}
