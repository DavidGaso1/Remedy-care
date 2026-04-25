"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open === i
              ? "border-primary/50 bg-primary-50/50 dark:bg-primary/20 shadow-glass"
              : "border-white/40 dark:border-white/20 hover:border-primary/30 dark:hover:border-primary/40 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl"
            }`}
        >
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-slate-900 dark:text-white transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`faq-answer-${i}`}
          >
            <span className="text-sm">{item.q}</span>
            <ChevronDown
              size={18}
              className={`text-primary dark:text-primary-light transition-transform duration-300 flex-shrink-0 ml-4 ${open === i ? "rotate-180" : ""
                }`}
            />
          </button>
          <div
            id={`faq-answer-${i}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
