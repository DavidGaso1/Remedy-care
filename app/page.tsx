import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, CheckCircle, MessageCircle, Sparkles, Heart, Activity, ShieldCheck, Droplet, ShieldAlert, Bone, Leaf, Shield, Truck, CreditCard, Phone } from "lucide-react";
import TrustBadges from "@/components/TrustBadges";
import Testimonials from "@/components/Testimonials";

const productCategories = [
  {
    slug: "ed-sexual-health",
    icon: <Activity size={26} className="text-rose-500" />,
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
    icon: <ShieldCheck size={26} className="text-blue-500" />,
    name: "Prostate Health",
    tagline: "Prosbeta, Longzit, Myco Balance, Zinc",
    desc: "Stop frequent urination, painful urination, and prostate enlargement",
    color: "from-blue-500 to-cyan-600",
    bgGlow: "bg-blue-50",
    startPrice: "₦47,500",
    image: "/images/products/prostate/prostate-1.png",
  },
  {
    slug: "diabetes",
    icon: <Droplet size={26} className="text-amber-500" />,
    name: "Diabetes Control",
    tagline: "Dialese, Longzit, Royal Jelly",
    desc: "Normalize blood sugar levels for Type 1 & 2 diabetes naturally",
    color: "from-orange-500 to-amber-600",
    bgGlow: "bg-orange-50",
    startPrice: "₦44,500",
    image: "/images/products/diabetes/diabetes-1.png",
  },
  {
    slug: "infection",
    icon: <ShieldAlert size={26} className="text-teal-500" />,
    name: "Infection Relief",
    tagline: "Garlic Oil, Ganoderma, B-Clear, Micro Balance",
    desc: "Permanently cure Staph, Gonorrhea, Chlamydia, UTI & chronic STDs",
    color: "from-teal-500 to-emerald-600",
    bgGlow: "bg-teal-50",
    startPrice: "₦63,500",
    image: "/images/products/infection/infection-1.png",
  },
  {
    slug: "joint-pain",
    icon: <Bone size={26} className="text-purple-500" />,
    name: "Joint Pain & Arthritis",
    tagline: "Panicept, Spabucta Spray, Longzit, Hi Calcium",
    desc: "End joint pain, stiffness, swelling and rheumatism naturally",
    color: "from-purple-500 to-violet-600",
    bgGlow: "bg-purple-50",
    startPrice: "₦39,500",
    image: "/images/products/joint-pain/joint-1.png",
  },
  {
    slug: "blood-pressure",
    icon: <Heart size={26} className="text-rose-500" />,
    name: "Blood Pressure",
    tagline: "HyperFree Tablet, Caerite, Royal Jelly, I-Detox Tea",
    desc: "Control hypertension, protect your heart, reduce stroke risk",
    color: "from-red-500 to-rose-600",
    bgGlow: "bg-red-50",
    startPrice: "₦49,500",
    image: "/images/products/blood-pressure/blood-pressure-1.png",
  },
  {
    slug: "ulcer",
    icon: <Leaf size={26} className="text-emerald-500" />,
    name: "Ulcer Relief",
    tagline: "Sto-Care, Garlic Oil",
    desc: "Heal stomach ulcers, eliminate H. pylori, and restore gastric health",
    color: "from-emerald-500 to-green-600",
    bgGlow: "bg-emerald-50",
    startPrice: "₦42,500",
    image: "/images/products/ulcer/ulcer-1.png",
  },
];

const stats = [
  { value: "6,000+", label: "Satisfied Customers", icon: Heart },
  { value: "12+", label: "Years Experience", icon: Star },
  { value: "6", label: "Proven Solutions", icon: Sparkles },
  { value: "NAFDAC", label: "Certified & Approved", icon: CheckCircle },
];

const whyUs = [
  { icon: <Leaf size={32} className="text-primary" />, title: "100% Natural Ingredients", desc: "Pure herbal extracts with zero synthetic chemicals or harmful additives", gradient: "from-primary-50 to-earth-50" },
  { icon: <Shield size={32} className="text-blue-500" />, title: "NAFDAC Certified", desc: "Every product is officially certified by NAFDAC for safe consumption in Nigeria", gradient: "from-blue-50 to-cyan-50" },
  { icon: <Truck size={32} className="text-amber-600" />, title: "Free Nationwide Delivery", desc: "We deliver to your doorstep anywhere in Nigeria at no extra cost", gradient: "from-earth-50 to-amber-50" },
  { icon: <CreditCard size={32} className="text-accent" />, title: "Pay on Delivery", desc: "Only pay when your order arrives. Zero risk, full trust.", gradient: "from-amber-50 to-earth-50" },
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
      <section className="remedy-hero text-white py-28 md:py-44 px-4 min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated orbs on top of the overlay */}
        <div className="absolute inset-0 z-[1]" aria-hidden>
          <div className="absolute top-20 left-16 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-float animation-delay-400" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-[2] max-w-5xl mx-auto text-center w-full">
          {/* Brand pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/25 text-white text-sm font-semibold px-5 py-2.5 rounded-full mb-8 animate-fade-in shadow-lg">
            <CheckCircle size={14} className="text-emerald-300" />
            Science-Backed · NAFDAC Approved · Pay on Delivery
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight animate-fade-in animation-delay-200 nature-text-shadow">
            Reclaim Your Health
            <span className="block remedy-text-gradient mt-2 pb-1">Naturally & Safely</span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 mb-4 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-400 nature-text-shadow">
            Trusted by <strong className="text-amber-300">6,000+ Nigerians</strong>. Herbal solutions for ED, Prostate, Diabetes, Infection, Joint Pain & Hypertension.
          </p>

          {/* Contact quick row */}
          <div className="flex flex-wrap gap-4 justify-center mb-10 animate-fade-in animation-delay-500">
            <a href="tel:08065648442" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              <Phone size={14} className="text-emerald-300" /> 08065648442
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href="tel:08137383428" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              <Phone size={14} className="text-emerald-300" /> 08137383428
            </a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href="mailto:rahinaaliyualiyu@gmail.com" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              ✉️ rahinaaliyualiyu@gmail.com
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
            <a
              href={WHATSAPP_CONSULT}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={18} />
              Free WhatsApp Consultation
            </a>
            <a
              href="#products"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl border border-white/25 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              View All Products
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Trust micro-badges */}
          <div className="mt-10 flex flex-wrap gap-3 justify-center animate-fade-in animation-delay-600">
            {["NAFDAC Registered", "Pay on Delivery", "Free Nationwide Shipping", "24/7 Support"].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 bg-white/8 backdrop-blur-sm border border-white/15 text-white/75 text-xs font-medium px-3 py-1.5 rounded-full">
                <CheckCircle size={10} className="text-emerald-300" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== STATS BAR ======================== */}
      <section className="relative bg-gradient-to-r from-teal-900 via-emerald-800 to-teal-900 text-white py-10 overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-40" />
        <div className="relative max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="group">
              <div className="flex justify-center mb-2">
                <stat.icon size={20} className="text-emerald-300 group-hover:text-amber-400 transition-colors" />
              </div>
              <p className="text-3xl md:text-4xl font-extrabold tracking-tight">{stat.value}</p>
              <p className="text-emerald-200 text-sm mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ======================== TRUST BADGES ======================== */}
      <TrustBadges />

      {/* ======================== PRODUCTS ======================== */}
      <section id="products" className="py-24 px-4 section-leaf-bg dark:bg-[#0d2010]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary/10 text-primary dark:text-primary-light text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-primary/10">
              <Sparkles size={14} />
              Trusted Solutions
            </div>
            <h2 className="section-title">Our Health Solutions</h2>
            <p className="section-subtitle">Choose your condition and start your natural healing journey today</p>
            <div className="section-divider mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group card-premium hover:-translate-y-2"
              >
                {/* Gradient top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${cat.color}`} />

                {/* Product image */}
                <div className={`relative h-52 ${cat.bgGlow} dark:bg-[#1b4332] overflow-hidden`}>
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-earth-50 dark:bg-[#1b4332] rounded-xl shadow-sm border border-earth-100 dark:border-white/5">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0d2010] dark:text-white text-lg leading-snug">{cat.name}</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{cat.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">{cat.desc}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 block">Starting from</span>
                      <span className="font-extrabold text-primary dark:text-primary-light text-xl">{cat.startPrice}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>View Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== WHY US ======================== */}
      <section className="py-24 px-4 bg-white dark:bg-[#133228]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title">Why 6,000+ Nigerians Trust Us</h2>
            <div className="section-divider mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className={`flex items-start gap-5 bg-gradient-to-br ${item.gradient} dark:from-[#1b4332] dark:to-[#133228] rounded-2xl p-7 hover:shadow-premium transition-all duration-500 border border-earth-100/60 dark:border-white/5 hover:-translate-y-0.5`}
              >
                <div className="flex-shrink-0 p-3 bg-white dark:bg-[#0d2010] rounded-2xl shadow-sm border border-earth-100 dark:border-white/5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0d2010] dark:text-white mb-1.5 text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="py-24 px-4 section-leaf-bg dark:bg-[#0d2010]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title">Real Results from Real Nigerians</h2>
            <p className="section-subtitle">Join thousands who have transformed their health naturally</p>
            <div className="section-divider mt-5" />
          </div>
          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* ======================== FINAL CTA ======================== */}
      <section className="remedy-hero text-white py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f14]/92 via-teal-900/85 to-emerald-800/70 z-[1]" style={{position: 'absolute', inset: 0, zIndex: 1}} />
        <div className="relative z-[2] max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold px-5 py-2 rounded-full mb-8">
            <MessageCircle size={14} className="text-emerald-300" />
            Free Consultation Available Now
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight nature-text-shadow">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-white/80 text-lg mb-4 max-w-xl mx-auto">
            Get a free consultation on WhatsApp. We&apos;ll recommend the right product for your condition.
          </p>
          <p className="text-white/60 text-sm mb-10">
            📞 08065648442 &nbsp;|&nbsp; 08137383428 &nbsp;|&nbsp; ✉️ rahinaaliyualiyu@gmail.com
          </p>
          <a
            href={WHATSAPP_CONSULT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-primary font-bold px-10 py-5 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <MessageCircle size={22} />
            Chat on WhatsApp — It&apos;s Free
          </a>
          <p className="mt-5 text-sm text-white/60">Pay only on delivery. No upfront payment required.</p>
        </div>
      </section>
    </>
  );
}
