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
      className={`relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1.5 ${
        pack.recommended
          ? "bg-gradient-to-b from-white to-primary-50 dark:from-[#1b4332] dark:to-[#133228] ring-2 ring-primary shadow-nature"
          : "bg-white dark:bg-[#1b4332] border border-earth-100 dark:border-white/5 shadow-soft hover:shadow-premium"
      }`}
    >
      {pack.recommended && (
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold px-3 py-2 text-center uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-current" /> Most Popular
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        {/* Pack Name */}
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center mb-2">
          {pack.label}
        </p>

        {/* Price */}
        <div className="text-center mb-3">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-extrabold text-[#0d2010] dark:text-white">₦{pack.salePrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-sm text-slate-400 dark:text-slate-500 line-through">₦{pack.originalPrice.toLocaleString()}</span>
            <span className="text-xs font-bold text-primary dark:text-primary-light bg-primary-50 dark:bg-primary/10 border border-primary/10 px-2 py-0.5 rounded-full">
              -{savingsPct}%
            </span>
          </div>
        </div>

        {/* Bottles */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-7 h-7 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-full flex items-center justify-center text-primary dark:text-primary-light font-bold text-xs">
            {pack.bottles}
          </span>
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {pack.bottles} {pack.bottles === 1 ? "bottle" : "bottles"}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-5 leading-relaxed">
          {pack.description}
        </p>

        {pack.includedProducts && pack.includedProducts.length > 0 && (
          <div className="mb-5 bg-earth-50 dark:bg-[#133228] rounded-xl p-3 border border-earth-100 dark:border-white/5">
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

        {/* Order Button */}
        <button
          onClick={onOrder}
          className={`mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 ${
            pack.recommended
              ? "bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-700 text-white shadow-premium shadow-primary/20"
              : "bg-primary hover:bg-primary-dark text-white shadow-soft"
          }`}
        >
          <MessageCircle size={15} />
          Order Now
        </button>
      </div>
    </div>
  );
}
