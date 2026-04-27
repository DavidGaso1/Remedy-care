"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface LiquidSymptomCardProps {
  symptom: string;
  index: number;
}

export default function LiquidSymptomCard({ symptom, index }: LiquidSymptomCardProps) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
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
      whileHover={{ x: 4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex items-center gap-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-red-100/50 dark:border-red-900/20 overflow-hidden"
    >
      {/* Liquid Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-rose-50/50 dark:from-red-900/20 dark:to-rose-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Icon */}
      <motion.div
        className="relative z-10 w-8 h-8 bg-red-100/80 dark:bg-red-900/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <AlertCircle size={16} className="text-red-500" />
      </motion.div>

      {/* Text */}
      <motion.span
        className="relative z-10 text-sm text-slate-700 dark:text-slate-300 font-medium"
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {symptom}
      </motion.span>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
