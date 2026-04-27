"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface LiquidTestimonialCardProps {
  name: string;
  location: string;
  text: string;
  rating: number;
  index?: number;
}

export default function LiquidTestimonialCard({
  name,
  location,
  text,
  rating,
  index = 0,
}: LiquidTestimonialCardProps) {
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
        delay: index * 0.15,
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
      className="group relative bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/50 dark:border-white/10 overflow-hidden"
    >
      {/* Liquid Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-sage-50/50 to-muted-blue-50/50 dark:from-sage-900/20 dark:to-muted-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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

      {/* Quote Icon */}
      <motion.div
        className="relative z-10 mb-4"
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Quote size={32} className="text-sage-300 dark:text-sage-700" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* Rating */}
        <motion.div
          className="flex gap-1 mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {Array.from({ length: rating }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-amber-400 text-amber-400"
            />
          ))}
        </motion.div>

        {/* Text */}
        <motion.p
          className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          &ldquo;{text}&rdquo;
        </motion.p>

        {/* Author */}
        <motion.div
          className="flex items-center gap-3 pt-4 border-t border-sage-200/50 dark:border-sage-800/30"
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-muted-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">{name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{location}</p>
          </div>
        </motion.div>
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
