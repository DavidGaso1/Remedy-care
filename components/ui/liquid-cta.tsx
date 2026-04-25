"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiquidCTAProps {
  badge?: string;
  title: string;
  description: string;
  whatsappLink: string;
  contactInfo?: string;
  className?: string;
}

export default function LiquidCTA({
  badge = "Free Consultation Available Now",
  title = "Ready to Start Your Healing Journey?",
  description = "Get a free consultation on WhatsApp. We'll recommend the right product for your condition.",
  whatsappLink = "#",
  contactInfo = "08065648442 | 08137383428 | rahinaaliyualiyu@gmail.com",
  className,
}: LiquidCTAProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

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
    <motion.section
      style={{ y, opacity }}
      className={cn(
        "relative py-20 md:py-28 px-4 overflow-hidden",
        className
      )}
    >
      {/* Liquid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sage-900/85 to-slate-900" />

      {/* Animated Blobs */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: "200% 200%",
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(143, 188, 143, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(123, 158, 176, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(155, 140, 191, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-semibold px-5 py-2 rounded-full mb-6 shadow-liquid"
        >
          <MessageCircle size={14} className="text-sage-300" />
          {badge}
        </motion.div>

        {/* Title */}
        <motion.h2
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight text-white"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-white/80 text-lg mb-4 max-w-xl mx-auto"
        >
          {description}
        </motion.p>

        {/* Contact Info */}
        <motion.p
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-white/60 text-sm mb-8"
        >
          {contactInfo}
        </motion.p>

        {/* CTA Button */}
        <motion.a
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sage-500 to-muted-blue-500 hover:from-sage-600 hover:to-muted-blue-600 text-white font-medium px-6 py-3 rounded-2xl shadow-liquid hover:shadow-liquid-hover transition-all duration-300"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp — It's Free
          <ArrowRight size={14} />
        </motion.a>

        {/* Trust Note */}
        <motion.p
          custom={5}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-5 text-sm text-white/60"
        >
          Pay only on delivery. No upfront payment required.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
