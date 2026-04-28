"use client";
import { clsx, type ClassValue } from "clsx";
const cn = (...inputs: ClassValue[]) => clsx(inputs);

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiquidSectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  showDivider?: boolean;
  className?: string;
}

export default function LiquidSectionHeader({
  badge,
  title,
  subtitle,
  showDivider = true,
  className,
}: LiquidSectionHeaderProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <div className={cn("text-center mb-12 md:mb-16", className)}>
      {/* Badge */}
      {badge && (
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-sage-50/50 dark:bg-sage-500/10 backdrop-blur-sm text-sage-600 dark:text-sage-400 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-sage-500/10"
        >
          <Sparkles size={14} />
          {badge}
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight"
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-lg text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Divider */}
      {showDivider && (
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-16 h-1 rounded-full mx-auto mt-5"
          style={{
            background: "linear-gradient(90deg, #8FBC8F, #7B9EB0, #9B8CBF)",
          }}
        />
      )}
    </div>
  );
}

