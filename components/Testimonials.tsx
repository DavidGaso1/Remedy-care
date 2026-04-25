import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const colors = [
    "from-primary-50/60 to-cyan-50/60",
    "from-blue-50/60 to-cyan-50/60",
    "from-cyan-50/60 to-emerald-50/60",
    "from-purple-50/60 to-violet-50/60",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((t, i) => (
        <div
          key={i}
          className={`p-6 bg-gradient-to-br ${colors[i % colors.length]} dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/10 hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-500`}
        >
          {/* Quote icon */}
          <div className="w-10 h-10 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm mb-4 border border-white/40 dark:border-white/10">
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
          <div className="flex items-center gap-3 pt-4 border-t border-white/30 dark:border-white/10">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/20">
              {t.name[0]}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{t.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
