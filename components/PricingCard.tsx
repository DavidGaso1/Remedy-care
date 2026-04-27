import { MessageCircle, Star } from "lucide-react";
import { PricingPack } from "@/lib/products";

interface Props {
  pack: PricingPack;
  onOrder: () => void;
}

export default function PricingCard({ pack, onOrder }: Props) {
  const savings = pack.originalPrice - pack.salePrice;
  const savingsPct = Math.round((savings / pack.originalPrice) * 100);

  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
        pack.recommended
          ? "bg-white/70 dark:bg-white/5 backdrop-blur-xl ring-2 ring-primary shadow-glass-lg"
          : "bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-glass hover:shadow-glass-lg"
      }`}
    >
      {pack.recommended && (
        <div className="bg-green-500/10 border-b border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-2 text-center uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-current" /> Most Popular
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        {/* Pack Name */}
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center mb-3">
          {pack.label}
        </p>

        {/* Price */}
        <div className="text-center mb-4">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">N{pack.salePrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-sm text-slate-400 dark:text-slate-500 line-through">N{pack.originalPrice.toLocaleString()}</span>
            <span className="text-xs font-bold text-primary dark:text-primary-light bg-primary-50 dark:bg-primary/10 border border-primary/10 px-2 py-0.5 rounded-full">
              -{savingsPct}%
            </span>
          </div>
        </div>

        {/* Bottles */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-8 h-8 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-full flex items-center justify-center text-primary dark:text-primary-light font-bold text-sm">
            {pack.bottles}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            {pack.bottles} {pack.bottles === 1 ? "bottle" : "bottles"}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-5 leading-relaxed">
          {pack.description}
        </p>

        {pack.includedProducts && pack.includedProducts.length > 0 && (
          <div className="mb-5 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/40 dark:border-white/10">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">Included Products:</p>
            <ul className="space-y-1.5">
              {pack.includedProducts.map((prod, idx) => (
                <li key={idx} className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                  <span className="text-primary/70 mt-0.5">•</span>
                  <span>{prod}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onOrder}
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 font-bold rounded-full w-full py-3.5 px-6 transition-all duration-300 shadow-glass"
        >
          <MessageCircle size={20} className="text-white flex-shrink-0" />
          <span className="text-white">Order Now</span>
        </button>
      </div>
    </div>
  );
}
