"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiquidPricingCardProps {
  label: string;
  salePrice: number;
  originalPrice?: number;
  bottles: number;
  features: string[];
  isPopular?: boolean;
  onOrder: () => void;
  index?: number;
}

export default function LiquidPricingCard({
  label,
  salePrice,
  originalPrice,
  bottles,
  features,
  isPopular = false,
  onOrder,
  index = 0,
}: LiquidPricingCardProps) {
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
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative w-full max-w-md",
        isPopular && "scale-105 z-10"
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-sage-500 to-muted-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-liquid">
            <Sparkles size={12} />
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Card */}
      <div
        className={cn(
          "relative bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border overflow-hidden transition-all duration-500",
          isPopular
            ? "border-sage-500/50 shadow-liquid hover:shadow-liquid-hover"
            : "border-white/50 dark:border-white/10 shadow-glass hover:shadow-glass-lg"
        )}
      >
        {/* Liquid Background */}
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            isPopular
              ? "from-sage-500/10 to-muted-blue-500/10"
              : "from-sage-50/50 to-muted-blue-50/50 dark:from-white/5 dark:to-white/[0.02]"
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

        {/* Content */}
        <div className="relative z-10">
          {/* Pack Label */}
          <motion.div
            className="text-center mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {label}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {bottles} {bottles === 1 ? "Bottle" : "Bottles"}
            </p>
          </motion.div>

          {/* Price */}
          <motion.div
            className="text-center mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-center gap-2">
              {originalPrice && (
                <span className="text-lg text-slate-400 line-through">
                  ₦{originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-4xl md:text-5xl font-extrabold text-sage-600 dark:text-sage-400">
                ₦{salePrice.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pay on Delivery
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 + 0.3 }}
              >
                <motion.div
                  className="w-5 h-5 bg-sage-100 dark:bg-sage-900/30 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Check size={12} className="text-sage-600 dark:text-sage-400" />
                </motion.div>
                <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={onOrder}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full py-3 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2",
              isPopular
                ? "bg-gradient-to-r from-sage-500 to-muted-blue-500 hover:from-sage-600 hover:to-muted-blue-600 text-white shadow-liquid hover:shadow-liquid-hover"
                : "bg-white/80 dark:bg-white/10 hover:bg-white/90 dark:hover:bg-white/20 text-slate-700 dark:text-white border border-sage-200/50 dark:border-sage-800/30"
            )}
          >
            Order Now
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
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
      </div>
    </motion.div>
  );
}

