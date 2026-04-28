"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";

const cn = (...inputs: ClassValue[]) => clsx(inputs);

interface LiquidBenefitCardProps {
  title: string;
  description: string;
  index: number;
  color?: string;
}

export default function LiquidBenefitCard({
  title,
  description,
  index,
  color = "from-sage-50 to-muted-blue-50",
}: LiquidBenefitCardProps) {
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
      className={cn(
        "group relative bg-gradient-to-br",
        color,
        "dark:from-white/5 dark:to-white/[0.02]",
        "backdrop-blur-xl rounded-3xl p-6 border border-white/50 dark:border-white/10 overflow-hidden"
      )}
    >
      {/* Liquid Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-sage-500/10 to-muted-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="w-12 h-12 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm mb-4 border border-white/40 dark:border-white/10"
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <CheckCircle size={20} className="text-sage-600 dark:text-sage-400" />
        </motion.div>
        <motion.h3
          className="font-bold text-slate-900 dark:text-white mb-2 text-lg"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {title}
        </motion.h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
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
