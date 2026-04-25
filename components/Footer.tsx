import Link from "next/link";
import { Leaf, Phone, Clock, Truck, CreditCard, ShieldCheck } from "lucide-react";

export default function Footer() {
  const siteName = "Remedy Care";

  return (
    <footer className="relative text-white overflow-hidden bg-slate-900">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-primary-light via-accent to-primary-light" />

      {/* Leaf pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322D3EE' fill-opacity='0.06'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-light to-primary rounded-xl flex items-center justify-center shadow-md">
                <Leaf size={18} className="text-white" />
              </div>
              <h3 className="font-extrabold text-lg">
                {siteName.split(' ')[0]} <span className="text-gradient">{siteName.split(' ').slice(1).join(' ')}</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Science-backed natural solutions for your health challenges.
              NAFDAC approved. Pay on delivery nationwide.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent-light text-sm uppercase tracking-wider">Our Products</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-slate-400">
              {[
                { href: "/ed-sexual-health", label: "Sexual Health" },
                { href: "/prostate", label: "Prostate Health" },
                { href: "/diabetes", label: "Diabetes Control" },
                { href: "/infection", label: "Infection Relief" },
                { href: "/joint-pain", label: "Joint Pain" },
                { href: "/blood-pressure", label: "Blood Pressure" },
                { href: "/ulcer", label: "Ulcer Relief" },
                { href: "/cancer", label: "Cancer Support" },
                { href: "/female-infertility", label: "Female Infertility" },
                { href: "/hemorrhoid-pile", label: "Hemorrhoid" },
                { href: "/hepatitis", label: "Hepatitis" },
                { href: "/liver-disease", label: "Liver Disease" },
                { href: "/stroke", label: "Stroke Recovery" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary-light transition-colors duration-300 flex items-center gap-2 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/5">
              <Link href="/about" className="text-sm font-semibold text-primary hover:text-primary-light transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                About us
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent-light text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div>
                <p className="font-semibold text-slate-300 mb-1">Address:</p>
                <p className="flex items-start gap-2">
                  <span className="text-primary-light mt-0.5">📍</span>
                  <span>
                    <strong>Abuja Office:</strong><br />
                    Shop 1, Abori Garden and Restaurants,<br />
                    off Funmilayo Ransom kuti Road,<br />
                    Garki, Area3
                  </span>
                </p>
                <p className="flex items-start gap-2 mt-3">
                  <span className="text-primary-light mt-0.5">📍</span>
                  <span>
                    <strong>Niger State Office:</strong><br />
                    No 1 Aliyu Wali sardauna crescent,<br />
                    OPP. Union Bank,<br />
                    Suleja, Niger State
                  </span>
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-300 mb-1">Phone:</p>
                <p className="flex items-center gap-2"><Phone size={16} className="text-cyan-300" /> 08065648442</p>
                <p className="flex items-center gap-2"><Phone size={16} className="text-cyan-300" /> 08137383428</p>
              </div>
              <div>
                <p className="font-semibold text-slate-300 mb-1">Email:</p>
                <p className="flex items-center gap-2"><span className="text-cyan-300">✉️</span> rahinaaliyualiyu@gmail.com</p>
              </div>
              <p className="flex items-center gap-2"><Clock size={16} className="text-cyan-300" /> Available 24/7</p>
              <p className="flex items-center gap-2"><Truck size={16} className="text-cyan-300" /> Free delivery nationwide</p>
              <p className="flex items-center gap-2"><CreditCard size={16} className="text-cyan-300" /> Payment on delivery</p>
              <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-cyan-300" /> NAFDAC approved products</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col items-center gap-2">
          <p className="text-sm text-slate-500">© 2025 {siteName}. All rights reserved.</p>
          <p className="text-xs text-slate-600">
            These products are not intended to diagnose, treat, cure or prevent any disease. Consult your healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
