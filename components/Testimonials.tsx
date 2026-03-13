import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const colors = [
    "from-primary-50 to-earth-50",
    "from-blue-50 to-cyan-50",
    "from-earth-50 to-amber-50",
    "from-purple-50 to-violet-50",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((t, i) => (
        <div
          key={i}
          className={`card-premium p-6 bg-gradient-to-br ${colors[i % colors.length]} dark:from-[#1b4332] dark:to-[#133228] hover:-translate-y-1 transition-all duration-500`}
        >
          {/* Quote icon */}
          <div className="w-10 h-10 bg-white dark:bg-[#0d2010] rounded-xl flex items-center justify-center shadow-sm mb-4 border border-earth-100 dark:border-white/5">
            <Quote size={18} className="text-primary dark:text-primary-light" />
          </div>

          {/* Stars */}
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} size={15} className="fill-accent text-accent" />
            ))}
          </div>

          {/* Quote */}
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-earth-100 dark:border-white/5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/20">
              {t.name[0]}
            </div>
            <div>
              <p className="font-bold text-[#0d2010] dark:text-white text-sm">{t.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{t.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
