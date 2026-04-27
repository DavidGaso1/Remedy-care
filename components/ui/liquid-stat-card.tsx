"use client";

import { motion } from "framer-motion";
import { Heart, Star, Sparkles, CheckCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Star,
  Sparkles,
  CheckCircle,
};

interface LiquidStatCardProps {
  value: string;
  label: string;
  icon: string;
  index?: number;
}

export default function LiquidStatCard({
  value,
  label,
  icon,
  index = 0,
}: LiquidStatCardProps) {
  const Icon = iconMap[icon] || Heart;
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
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
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:shadow-[0_8px_32px_rgba(34,197,94,0.1)] hover:border-green-500/30 transition-all duration-300 overflow-hidden"
    >
      {/* Liquid Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-sage-500/10 to-muted-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="flex justify-center mb-4"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Icon size={28} className="text-sage-300 group-hover:text-sage-400 transition-colors" />
        </motion.div>
        <motion.p
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
        >
          {value}
        </motion.p>
        <p className="text-sage-200/70 text-sm font-medium">{label}</p>
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
