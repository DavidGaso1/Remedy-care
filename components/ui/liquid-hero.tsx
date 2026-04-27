"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Circle, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiquidHeroProps {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  whatsappLink?: string;
  productsLink?: string;
  showCTA?: boolean;
}

function LiquidBlob({
  className,
  delay = 0,
  size = 400,
  color = "from-sage-500/20 to-muted-blue-500/20",
  animate = true,
}: {
  className?: string;
  delay?: number;
  size?: number;
  color?: string;
  animate?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 2,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      {animate ? (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "50% 60% 30% 60% / 30% 60% 70% 40%",
              "60% 40% 60% 30% / 70% 30% 50% 60%",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ width: size, height: size }}
          className="relative"
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              color,
              "backdrop-blur-3xl",
              "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
            )}
          />
        </motion.div>
      ) : (
        <div
          style={{ width: size, height: size }}
          className="relative"
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              color,
              "backdrop-blur-3xl",
              "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
            )}
          />
        </div>
      )}
    </motion.div>
  );
}

function FloatingParticle({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.5,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="w-2 h-2 rounded-full bg-sage-400/50"
      />
    </motion.div>
  );
}

export default function LiquidHero({
  badge = "Science-Backed · NAFDAC Approved · Pay on Delivery",
  title1 = "Reclaim Your Health",
  title2 = "Naturally & Safely",
  description = "Trusted by 6,000+ Nigerians. Herbal solutions for ED, Prostate, Diabetes, Infection, Joint Pain, Hypertension, and more.",
  whatsappLink = "#",
  productsLink = "#",
  showCTA = true,
}: LiquidHeroProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <div className="relative w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-sand-50 via-white to-sage-50 dark:from-[#030712] dark:via-[#0a0f1a] dark:to-[#0d1218] py-20 md:py-28">
      {/* Liquid Background Blobs */}
      <motion.div style={{ opacity }} className="absolute inset-0 overflow-hidden">
        <LiquidBlob
          delay={0.2}
          size={600}
          color="from-sage-500/15 to-muted-blue-500/15"
          className="left-[-10%] md:left-[-5%] top-[10%] md:top-[15%]"
        />

        <LiquidBlob
          delay={0.4}
          size={500}
          color="from-soft-purple-500/15 to-peach-500/15"
          className="right-[-5%] md:right-[0%] bottom-[10%] md:bottom-[15%]"
        />

        <LiquidBlob
          delay={0.3}
          size={350}
          color="from-muted-blue-500/10 to-sage-500/10"
          className="left-[10%] md:left-[15%] bottom-[20%] md:bottom-[25%]"
        />

        <LiquidBlob
          delay={0.5}
          size={250}
          color="from-peach-500/10 to-soft-yellow-500/10"
          className="right-[15%] md:right-[20%] top-[20%] md:top-[25%]"
        />

        <LiquidBlob
          delay={0.6}
          size={180}
          color="from-soft-purple-500/10 to-muted-blue-500/10"
          className="left-[30%] md:left-[35%] top-[5%] md:top-[10%]"
        />

        {/* Floating Particles */}
        <FloatingParticle delay={0.8} className="left-[20%] top-[30%]" />
        <FloatingParticle delay={1} className="left-[40%] top-[20%]" />
        <FloatingParticle delay={1.2} className="right-[30%] top-[40%]" />
        <FloatingParticle delay={1.4} className="right-[20%] bottom-[30%]" />
        <FloatingParticle delay={1.6} className="left-[25%] bottom-[40%]" />
      </motion.div>

      {/* Gradient Overlay */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-t from-sand-50/80 via-transparent to-sand-50/50 dark:from-[#030712]/80 dark:via-transparent dark:to-[#030712]/50 pointer-events-none"
      />

      {/* Content */}
      <motion.div style={{ y: y1, opacity }} className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-sage-200/50 dark:border-sage-800/30 mb-8 md:mb-12 shadow-soft"
          >
            <Circle className="h-2 w-2 fill-sage-500/80" />
            <span className="text-sm text-slate-600 dark:text-slate-300 tracking-wide font-medium">
              {badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-sage-500 via-muted-blue-500 to-soft-purple-500"
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 md:mb-10 leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4">
              {description}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          {showCTA && (
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sage-500 to-muted-blue-500 hover:from-sage-600 hover:to-muted-blue-600 text-white font-medium rounded-2xl transition-all duration-300 shadow-liquid hover:shadow-liquid-hover"
              >
                <MessageCircle size={16} />
                Free WhatsApp Consultation
              </motion.a>
              <motion.a
                href={productsLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 text-slate-700 dark:text-white font-medium rounded-2xl border border-sage-200/50 dark:border-sage-800/30 transition-all duration-300 backdrop-blur-xl shadow-soft hover:shadow-glass"
              >
                <Sparkles size={14} />
                View All Products
                <ArrowRight size={14} />
              </motion.a>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-sage-400/50 flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-sage-500"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
