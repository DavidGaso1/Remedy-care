"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { CheckCircle, MessageCircle, AlertCircle, Sparkles, AlertTriangle, BookOpen, Zap, X, Activity, ShieldCheck, Droplet, ShieldAlert, Bone, Heart, Leaf, Shield } from "lucide-react";
import TrustBadges from "@/components/TrustBadges";
import PricingCard from "@/components/PricingCard";
import CheckoutModal from "@/components/CheckoutModal";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import { Product, PricingPack } from "@/lib/products";

export default function ProductPage({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState<PricingPack | null>(null);

  // Ref for scrolling to pricing section
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleOrderClick = (pack: PricingPack) => {
    setSelectedPack(pack);
    setIsCheckoutOpen(true);
  };

  // Scroll to pricing section for non-pack "Order Now" buttons
  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getProductIcon = (slug: string) => {
    const iconProps = { size: 64, className: "mx-auto opacity-90" };
    switch (slug) {
      case "ed-sexual-health": return <Activity {...iconProps} className="mx-auto opacity-90 text-rose-300" />;
      case "prostate": return <ShieldCheck {...iconProps} className="mx-auto opacity-90 text-blue-300" />;
      case "diabetes": return <Droplet {...iconProps} className="mx-auto opacity-90 text-amber-300" />;
      case "infection": return <ShieldAlert {...iconProps} className="mx-auto opacity-90 text-teal-300" />;
      case "joint-pain": return <Bone {...iconProps} className="mx-auto opacity-90 text-purple-300" />;
      case "blood-pressure": return <Heart {...iconProps} className="mx-auto opacity-90 text-rose-300" />;
      case "ulcer": return <Leaf {...iconProps} className="mx-auto opacity-90 text-emerald-300" />;
      case "cancer": return <Shield {...iconProps} className="mx-auto opacity-90 text-indigo-300" />;
      case "female-infertility": return <Heart {...iconProps} className="mx-auto opacity-90 text-pink-300" />;
      case "hemorrhoid-pile": return <Droplet {...iconProps} className="mx-auto opacity-90 text-amber-300" />;
      case "hepatitis": return <AlertTriangle {...iconProps} className="mx-auto opacity-90 text-yellow-300" />;
      case "liver-disease": return <AlertCircle {...iconProps} className="mx-auto opacity-90 text-amber-300" />;
      case "stroke": return <Activity {...iconProps} className="mx-auto opacity-90 text-red-300" />;
      default: return <Activity {...iconProps} />;
    }
  };

  return (
    <>
      {/* Image Zoom Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setActiveImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={(e) => { e.stopPropagation(); setActiveImage(null); }}
          >
            <X size={24} />
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={activeImage}
              alt="Enlarged product view"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {selectedPack && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          productName={product.productName}
          packLabel={selectedPack.label}
          packPrice={selectedPack.salePrice}
          packBottles={selectedPack.bottles}
          productImage={product.images && product.images.length > 0 ? product.images[0] : undefined}
        />
      )}

      {/* ======================== HERO ======================== */}
      <section className="hero-nature text-white py-20 md:py-28 lg:py-32 px-4 overflow-hidden min-h-[65vh] flex items-center">
        <div className="absolute inset-0 z-[1]" aria-hidden>
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl animate-float animation-delay-400" />
        </div>
        <div className="relative z-[2] max-w-5xl mx-auto text-center w-full">
          <div className="mb-6 inline-flex animate-fade-in p-5 bg-white/10 backdrop-blur-2xl rounded-3xl w-24 h-24 items-center justify-center border border-white/20 shadow-glass">
            {getProductIcon(product.slug)}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 animate-fade-in animation-delay-200 nature-text-shadow">
            {product.heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in animation-delay-400 nature-text-shadow">
            {product.heroSubheadline}
          </p>
<button
            onClick={scrollToPricing}
            className="btn-whatsapp animate-fade-in animation-delay-600 shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle size={16} />
            Order Now — Pay on Delivery
          </button>
</div>
      </section>

      {/* ======================== EDUCATIONAL INTRO ======================== */}
      {product.educationalIntro && (
        <section className="py-16 md:py-20 px-4 bg-white/50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel-strong p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <BookOpen size={22} className="text-primary" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Understanding {product.name}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">{product.educationalIntro}</p>

              {/* Warning Note */}
              {product.warningNote && (
                <div className="mt-6 bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm border border-amber-200/60 dark:border-amber-400/20 rounded-2xl p-5 flex items-start gap-3">
                  <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 dark:text-amber-300 font-medium leading-relaxed">{product.warningNote}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ======================== ROOT CAUSES ======================== */}
      {product.rootCauses && product.rootCauses.length > 0 && (
        <section className="py-16 md:py-20 px-4 section-leaf-bg dark:bg-[#030712]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-title">What Causes {product.name} Issues?</h2>
              <p className="section-subtitle">Understanding the root causes is the first step to healing</p>
              <div className="section-divider mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.rootCauses.map((cause, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/50 dark:border-white/10 hover:shadow-glass transition-all duration-300">
                  <div className="w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <span className="text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{cause}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================== PRODUCT IMAGES ======================== */}
      {product.images && product.images.length > 0 && (
        <section className="py-16 md:py-20 px-4 bg-white/50 dark:bg-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="section-title">Our Product</h2>
              <p className="text-sm text-slate-400 mt-2">Click image to enlarge</p>
              <div className="section-divider mt-4" />
            </div>
            <div className={`grid gap-5 ${product.images.length <= 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
              : product.images.length === 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto"
              }`}>
              {product.images.map((image, i) => (
                <div
                  key={i}
                  className="product-image-card aspect-[4/3] relative cursor-zoom-in group"
                  onClick={() => setActiveImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} product ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/40 backdrop-blur-xl p-3 rounded-full text-primary shadow-glass">
                      <Zap size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <TrustBadges />

      {/* ======================== SYMPTOMS ======================== */}
      <section className="py-20 md:py-28 px-4 section-leaf-bg dark:bg-[#030712]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Are You Experiencing Any of These?</h2>
            <p className="section-subtitle">You&apos;re not alone — and there&apos;s a natural solution</p>
            <div className="section-divider mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.symptoms.map((symptom, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-glass border border-red-100/50 dark:border-red-900/20 hover:shadow-glass-lg hover:border-red-200 dark:hover:border-red-800/30 transition-all duration-300">
                <div className="w-8 h-8 bg-red-100/80 dark:bg-red-900/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={16} className="text-red-500" />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{symptom}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ======================== */}
      {product.howItWorks && (
        <section className="py-20 md:py-28 px-4 bg-white/50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary-50/50 dark:bg-primary/10 backdrop-blur-sm text-primary dark:text-primary-light text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-primary/10">
                <Zap size={14} />
                How It Works
              </div>
              <h2 className="section-title">Introducing: {product.productName}</h2>
              <p className="section-subtitle">100% herbal • NAFDAC approved • Zero side effects</p>
              <div className="section-divider mt-4" />
            </div>
            <div className="glass-panel-strong p-8 md:p-10">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">{product.howItWorks}</p>
            </div>
          </div>
        </section>
      )}

      {/* ======================== DETAILED BENEFITS ======================== */}
      {product.detailedBenefits && product.detailedBenefits.length > 0 && (
        <section className="py-20 md:py-28 px-4 section-leaf-bg dark:bg-[#030712]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary-50/50 dark:bg-primary/10 backdrop-blur-sm text-primary dark:text-primary-light text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-primary/10">
                <Sparkles size={14} />
                Proven Benefits
              </div>
              <h2 className="section-title">What You Stand to Gain</h2>
              <div className="section-divider mt-4" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.detailedBenefits.map((benefit, i) => {
                const colors = [
                  "from-primary-50/60 to-cyan-50/60 border-primary-100/50",
                  "from-blue-50/60 to-cyan-50/60 border-blue-100/50",
                  "from-cyan-50/60 to-emerald-50/60 border-emerald-100/50",
                  "from-purple-50/60 to-violet-50/60 border-purple-100/50",
                  "from-rose-50/60 to-pink-50/60 border-rose-100/50",
                  "from-teal-50/60 to-primary-50/60 border-teal-100/50",
                ];
                return (
                  <div key={i} className={`bg-gradient-to-br ${colors[i % colors.length]} dark:from-white/5 dark:to-white/[0.02] dark:border-white/10 backdrop-blur-xl rounded-2xl p-6 border hover:shadow-glass-lg transition-all duration-500 hover:-translate-y-1`}>
                    <div className="w-10 h-10 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm mb-4 border border-white/40 dark:border-white/10">
                      <CheckCircle size={18} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">{benefit.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ======================== SIMPLE BENEFITS (fallback) ======================== */}
      {(!product.detailedBenefits || product.detailedBenefits.length === 0) && (
        <section className="py-20 md:py-28 px-4 section-leaf-bg dark:bg-[#030712]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary-50/50 dark:bg-primary/10 backdrop-blur-sm text-primary dark:text-primary-light text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-primary/10">
                <Sparkles size={14} />
                Clinically Proven Formula
              </div>
              <h2 className="section-title">Introducing: {product.productName}</h2>
              <p className="section-subtitle">100% herbal • NAFDAC approved • Zero side effects</p>
              <div className="section-divider mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/50 dark:border-white/10 hover:shadow-glass hover:border-primary/20 transition-all duration-300">
                  <div className="w-8 h-8 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-primary" />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-semibold">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================== PRICING ======================== */}
      <section ref={pricingRef} className="py-16 md:py-20 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Choose Your Treatment Pack</h2>
            <p className="section-subtitle">Free delivery • Pay on delivery • Usage guide via WhatsApp</p>
            <div className="section-divider mt-4" />
          </div>
          <div className={`flex flex-wrap justify-center gap-6`}>
            {product.pricingPacks.map((pack, i) => (
              <div key={i} className="w-full max-w-md">
                <PricingCard
                  pack={pack}
                  onOrder={() => handleOrderClick(pack)}
                />
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm border border-amber-200/50 dark:border-amber-400/20 rounded-2xl p-5 flex flex-col items-center justify-center gap-2">
            <AlertTriangle className="text-amber-600" size={24} />
            <p className="text-sm text-amber-800 dark:text-amber-300 font-medium text-center">
              Please ensure you are fully ready for this order. Only place an order if the money to pay at delivery is available. Our agent will call you few minutes after receiving your order.
            </p>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="py-20 md:py-28 px-4 section-leaf-bg dark:bg-[#030712]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">What Our Customers Say</h2>
            <div className="section-divider mt-4" />
          </div>
          <Testimonials items={product.testimonials} />
        </div>
      </section>

      {/* ======================== FAQ ======================== */}
      <section className="py-20 md:py-28 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="section-divider mt-4" />
          </div>
          <FAQ items={product.faqs} />
        </div>
      </section>

      {/* ======================== FINAL CTA ======================== */}
      <section className="hero-nature text-white py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-primary-dark/80 to-primary/70 z-[1]" style={{position:'absolute', inset:0, zIndex:1}} />
        <div className="relative z-[2] max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-5 nature-text-shadow">
            Ready to Order {product.productName}?
          </h2>
          <p className="text-white/80 mb-10 text-lg">
            Free delivery. Pay on delivery. Results guaranteed.
          </p>
          <button
            onClick={scrollToPricing}
            className="btn-primary px-6 py-3 h-auto text-lg shadow-glass-lg hover:shadow-2xl border border-white/40"
          >
            <MessageCircle size={18} />
            Order Now
          </button>
          <p className="mt-5 text-sm text-white/60">One of our agents will give you a call within minutes of your order.</p>
        </div>
      </section>
    </>
  );
}
