import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";
import LiquidHero from "@/components/ui/liquid-hero";
import LiquidProductCard from "@/components/ui/liquid-product-card";
import LiquidStatCard from "@/components/ui/liquid-stat-card";
import LiquidWhyUsCard from "@/components/ui/liquid-why-us-card";
import LiquidCTA from "@/components/ui/liquid-cta";

const productCategories = [
  {
    slug: "ed-sexual-health",
    icon: "Activity",
    iconClassName: "text-rose-500",
    name: "ED & Sexual Health",
    tagline: "Reodeo, Vigo Max, Royal Jelly, Zinc",
    desc: "Rock-hard erections, last 50+ minutes, boost libido & confidence",
    color: "from-rose-500 to-pink-600",
    bgGlow: "bg-rose-50",
    startPrice: "₦43,500",
    image: "/images/products/ed/ed-1.png",
  },
  {
    slug: "prostate",
    icon: "ShieldCheck",
    iconClassName: "text-blue-500",
    name: "Prostate Health",
    tagline: "Prosbeta, Longzit, Vigor Max",
    desc: "Stop frequent urination, painful urination, and prostate enlargement",
    color: "from-blue-500 to-cyan-600",
    bgGlow: "bg-blue-50",
    startPrice: "₦71,600",
    image: "/categorized_images/Prostatitis/products/A06_PROSTBETA_.png",
  },
  {
    slug: "diabetes",
    icon: "Droplet",
    iconClassName: "text-amber-500",
    name: "Diabetes Control",
    tagline: "Dialese, Longzit, Myco Balance",
    desc: "Normalize blood sugar levels for Type 1 & 2 diabetes naturally",
    color: "from-orange-500 to-amber-600",
    bgGlow: "bg-orange-50",
    startPrice: "₦69,896",
    image: "/categorized_images/Diabetes Type 2/products/A14_DIALESE.png",
  },
  {
    slug: "infection",
    icon: "ShieldAlert",
    iconClassName: "text-teal-500",
    name: "Infection Relief",
    tagline: "B-Clear, Garlic Oil",
    desc: "Permanently cure Staph, Gonorrhea, Chlamydia, UTI & chronic STDs",
    color: "from-teal-500 to-emerald-600",
    bgGlow: "bg-teal-50",
    startPrice: "₦61,226",
    image: "/images/products/infection/infection-1.png",
  },
  {
    slug: "joint-pain",
    icon: "Bone",
    iconClassName: "text-purple-500",
    name: "Joint Pain & Arthritis",
    tagline: "Spabucta Spray, Panicept",
    desc: "End joint pain, stiffness, swelling and rheumatism naturally",
    color: "from-purple-500 to-violet-600",
    bgGlow: "bg-purple-50",
    startPrice: "₦53,500",
    image: "/images/products/joint-pain/joint-1.png",
  },
  {
    slug: "blood-pressure",
    icon: "Heart",
    iconClassName: "text-rose-500",
    name: "Blood Pressure",
    tagline: "HyperFree, Caerite, B-Clear",
    desc: "Control hypertension, protect your heart, reduce stroke risk",
    color: "from-red-500 to-rose-600",
    bgGlow: "bg-red-50",
    startPrice: "₦96,130",
    image: "/categorized_images/Hypotension - Hypertension/products/A13_HYPERFREE.png",
  },
  {
    slug: "ulcer",
    icon: "Leaf",
    iconClassName: "text-emerald-500",
    name: "Ulcer Relief",
    tagline: "Sto-Care, Garlic Oil",
    desc: "Heal stomach ulcers, eliminate H. pylori, and restore gastric health",
    color: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-50",
    startPrice: "₦58,596",
    image: "/categorized_images/Ulcer/products/A08_STO_CARE.png",
  },
  {
    slug: "cancer",
    icon: "Shield",
    iconClassName: "text-indigo-500",
    name: "Cancer Support",
    tagline: "B-Clear, Myco Balance, Garlic Oil",
    desc: "Immune-boosting herbal support for cancer prevention & recovery",
    color: "from-indigo-500 to-violet-600",
    bgGlow: "bg-indigo-50",
    startPrice: "₦86,226",
    image: "/categorized_images/Cancer/products/A07_B_CLEAR.png",
  },
  {
    slug: "female-infertility",
    icon: "Heart",
    iconClassName: "text-pink-500",
    name: "Female Infertility",
    tagline: "Longzit, Female Care, Ganoderma Reishi",
    desc: "Restore fertility, hormonal balance & ovulation support naturally",
    color: "from-pink-500 to-rose-600",
    bgGlow: "bg-pink-50",
    startPrice: "₦85,650",
    image: "/categorized_images/Female Infertility/products/A03_FEMALE_CARE.png",
  },
  {
    slug: "hemorrhoid-pile",
    icon: "Droplet",
    iconClassName: "text-amber-500",
    name: "Hemorrhoid (Pile)",
    tagline: "Ganoderma, Constifree Tea",
    desc: "Treat hemorrhoids & piles naturally — no surgery needed",
    color: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-50",
    startPrice: "₦48,700",
    image: "/categorized_images/Hemorrhoid (Pile)/products/A10_GHT_GANODERMA_SOFTGEL__REISHI_3_IN_1_.png",
  },
  {
    slug: "hepatitis",
    icon: "AlertTriangle",
    iconClassName: "text-yellow-500",
    name: "Hepatitis",
    tagline: "B-Clear, I-Detox Tea, Livities",
    desc: "Treat hepatitis & restore liver function with comprehensive herbal support",
    color: "from-yellow-500 to-amber-600",
    bgGlow: "bg-yellow-50",
    startPrice: "₦94,320",
    image: "/categorized_images/Hepatitis/products/A07_B_CLEAR.png",
  },
  {
    slug: "liver-disease",
    icon: "AlertCircle",
    iconClassName: "text-amber-600",
    name: "Liver Disease",
    tagline: "B-Clear, Myco Balance, Livities",
    desc: "Reverse liver damage & restore liver function naturally",
    color: "from-amber-600 to-yellow-700",
    bgGlow: "bg-amber-50",
    startPrice: "₦91,580",
    image: "/categorized_images/Liver Disease/products/A17_LIVITIES_TABLET.png",
  },
  {
    slug: "stroke",
    icon: "Activity",
    iconClassName: "text-red-500",
    name: "Stroke Recovery",
    tagline: "Longzit, Ginseng & Royal Jelly",
    desc: "Natural stroke recovery & prevention — blood circulation & nerve repair",
    color: "from-red-600 to-rose-700",
    bgGlow: "bg-red-50",
    startPrice: "₦38,100",
    image: "/categorized_images/Stroke/products/A02_LONGZIT.png",
  },
];

const stats = [
  { value: "6,000+", label: "Satisfied Customers", icon: "Heart" },
  { value: "12+", label: "Years Experience", icon: "Star" },
  { value: "13", label: "Proven Solutions", icon: "Sparkles" },
  { value: "NAFDAC", label: "Certified & Approved", icon: "CheckCircle" },
];

const whyUs = [
  { icon: "Leaf", iconClassName: "text-sage-500", title: "100% Natural Ingredients", desc: "Pure herbal extracts with zero synthetic chemicals or harmful additives", gradient: "from-sage-50 to-muted-blue-50" },
  { icon: "Shield", iconClassName: "text-muted-blue-500", title: "NAFDAC Certified", desc: "Every product is officially certified by NAFDAC for safe consumption in Nigeria", gradient: "from-muted-blue-50 to-soft-purple-50" },
  { icon: "Truck", iconClassName: "text-peach-500", title: "Free Nationwide Delivery", desc: "We deliver to your doorstep anywhere in Nigeria at no extra cost", gradient: "from-peach-50 to-soft-yellow-50" },
  { icon: "CreditCard", iconClassName: "text-soft-purple-500", title: "Pay on Delivery", desc: "Only pay when your order arrives. Zero risk, full trust.", gradient: "from-soft-purple-50 to-sage-50" },
];

const testimonials = [
  { name: "Taiwo A.", location: "Lagos", text: "I ordered for my husband's ED issue. Within 3 weeks, he was a totally different man. Best purchase I've ever made!", rating: 5 },
  { name: "Emeka O.", location: "Anambra", text: "My prostate was making life miserable. 2 months later, I sleep through the night. God bless this business.", rating: 5 },
  { name: "Mrs. Khadijah M.", location: "Kano", text: "Type 2 diabetic for 10 years. My blood sugar is now normal. My doctor reduced my medication!", rating: 5 },
];

const WHATSAPP_NUMBER = "2348065648442";
const WHATSAPP_CONSULT = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent("Hello, I need a free consultation")}`;

export default function HomePage() {
  return (
    <>
      {/* ======================== HERO ======================== */}
      <LiquidHero
        badge="Science-Backed · NAFDAC Approved · Pay on Delivery"
        title1="Reclaim Your Health"
        title2="Naturally & Safely"
        description="Trusted by 6,000+ Nigerians. Herbal solutions for ED, Prostate, Diabetes, Infection, Joint Pain, Hypertension, and more."
        whatsappLink={WHATSAPP_CONSULT}
        productsLink="#products"
        showCTA={true}
      />

      {/* ======================== STATS BAR ======================== */}
      <section className="relative bg-gradient-to-r from-slate-900 via-sage-900/80 to-slate-900 text-white py-12 overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <LiquidStatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ======================== TRUST BADGES ======================== */}
      <TrustBadges />

      {/* ======================== PRODUCTS ======================== */}
      <section id="products" className="py-20 md:py-28 px-4 section-leaf-bg dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-sage-50/50 dark:bg-sage-500/10 backdrop-blur-sm text-sage-600 dark:text-sage-400 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-sage-500/10">
              <Sparkles size={14} />
              Trusted Solutions
            </div>
            <h2 className="section-title">Our Health Solutions</h2>
            <p className="section-subtitle">Choose your condition and start your natural healing journey today</p>
            <div className="section-divider mt-5" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {productCategories.map((cat, index) => (
              <LiquidProductCard
                key={cat.slug}
                {...cat}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================== WHY US ======================== */}
      <section className="py-20 md:py-28 px-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-title">Why 6,000+ Nigerians Trust Us</h2>
            <div className="section-divider mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {whyUs.map((item, index) => (
              <LiquidWhyUsCard
                key={item.title}
                icon={item.icon}
                iconClassName={item.iconClassName}
                title={item.title}
                desc={item.desc}
                gradient={item.gradient}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="py-20 md:py-28 px-4 section-leaf-bg dark:bg-[#030712]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-title">Real Results from Real Nigerians</h2>
            <p className="section-subtitle">Join thousands who have transformed their health naturally</p>
            <div className="section-divider mt-5" />
          </div>
          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* ======================== FINAL CTA ======================== */}
      <LiquidCTA
        badge="Free Consultation Available Now"
        title="Ready to Start Your Healing Journey?"
        description="Get a free consultation on WhatsApp. We'll recommend the right product for your condition."
        whatsappLink={WHATSAPP_CONSULT}
        contactInfo="08065648442 | 08137383428 | rahinaaliyualiyu@gmail.com"
      />
    </>
  );
}
