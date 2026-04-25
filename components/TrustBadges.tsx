import Image from "next/image";
import { LucideIcon, Truck, CreditCard, Clock, ShieldCheck } from "lucide-react";

interface Badge {
  title: string;
  desc: string;
  gradient: string;
  icon?: LucideIcon;
  image?: string;
}

const badges: Badge[] = [
  {
    title: "NAFDAC Approved",
    desc: "Certified & Approved",
    gradient: "from-amber-400 to-blue-600",
    icon: ShieldCheck
  },
  { icon: Truck, title: "Free Delivery", desc: "Delivered to your doorstep", gradient: "from-blue-500 to-cyan-600" },
  { icon: CreditCard, title: "Pay on Delivery", desc: "Pay when you receive your order", gradient: "from-accent to-accent-dark" },
  { icon: Clock, title: "24/7 Support", desc: "WhatsApp anytime", gradient: "from-purple-500 to-violet-600" },
];

export default function TrustBadges() {
  return (
    <section className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-y border-white/30 dark:border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.title} className="flex flex-col items-center text-center gap-3 group">
                <div className={`w-14 h-14 bg-gradient-to-br ${badge.gradient} rounded-2xl flex items-center justify-center shadow-glass group-hover:shadow-glass-lg transition-all duration-300 group-hover:-translate-y-1 p-2`}>
                  {badge.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={badge.image}
                        alt={badge.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : Icon ? (
                    <Icon className="text-white" size={24} />
                  ) : null}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{badge.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
