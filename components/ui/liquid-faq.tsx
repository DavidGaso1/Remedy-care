"use client";
import { clsx, type ClassValue } from "clsx";
const cn = (...inputs: ClassValue[]) => clsx(inputs);

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidFAQProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export default function LiquidFAQ({ items }: LiquidFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          <motion.button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-300",
              openIndex === index
                ? "bg-gradient-to-r from-sage-50 to-muted-blue-50 dark:from-sage-900/30 dark:to-muted-blue-900/30 border-sage-300/50 dark:border-sage-700/50 shadow-liquid"
                : "bg-white/60 dark:bg-white/5 border-white/50 dark:border-white/10 hover:border-sage-200/50 dark:hover:border-sage-800/30"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <span className={cn(
                "font-semibold text-base md:text-lg",
                openIndex === index
                  ? "text-sage-700 dark:text-sage-300"
                  : "text-slate-700 dark:text-slate-300"
              )}>
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown
                  size={20}
                  className={cn(
                    "flex-shrink-0 transition-colors",
                    openIndex === index
                      ? "text-sage-600 dark:text-sage-400"
                      : "text-slate-400 dark:text-slate-500"
                  )}
                />
              </motion.div>
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="mt-4 pt-4 border-t border-sage-200/50 dark:border-sage-800/30"
                >
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}

