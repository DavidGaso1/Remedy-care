import { Leaf, Award, Users, Heart, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-dark dark:to-dark-lighter">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-6">
            <Leaf size={16} className="text-primary" />
            <span className="text-sm font-semibold text-primary">About Us</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white mb-6">
            Your Trusted Partner in <span className="text-gradient">Natural Health</span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Tubon&apos;s Care is dedicated to providing science-backed, NAFDAC-approved natural solutions 
            for your health challenges. We combine traditional herbal wisdom with modern research to deliver 
            effective, safe remedies.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white dark:bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                To make natural, effective healthcare accessible to everyone across Nigeria through 
                quality herbal remedies and exceptional customer service.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3">Quality Assurance</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                All our products are NAFDAC-approved and sourced from trusted manufacturers, 
                ensuring safety, efficacy, and compliance with health standards.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 dark:from-primary/10 dark:to-accent/20">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white mb-3">Customer First</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Your health and satisfaction are our priority. We offer free consultations, 
                nationwide delivery, and payment on delivery for your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-white to-primary-50 dark:from-dark-lighter dark:to-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-white mb-4">
              Why Choose <span className="text-gradient">Tubon&apos;s Care</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We stand out through our commitment to quality, authenticity, and customer care
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Award,
                title: "NAFDAC Approved",
                description: "All products are certified and approved by Nigeria's regulatory authority"
              },
              {
                icon: ShieldCheck,
                title: "Science-Backed",
                description: "Our remedies combine traditional wisdom with modern scientific research"
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock customer support via WhatsApp for consultations and orders"
              },
              {
                icon: Users,
                title: "Trusted by Thousands",
                description: "Join thousands of satisfied customers who have improved their health naturally"
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 p-6 bg-white dark:bg-dark rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                    <item.icon size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-dark dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white mb-6">
            Visit Our Store or Contact Us
          </h2>
          
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-bold text-dark dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-primary">📍</span> Our Location
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Ide Plaza Utako<br />
                  Ajose Adeogun Street<br />
                  Abuja, Nigeria
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-dark dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-primary">📞</span> Contact Numbers
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  08140874503<br />
                  08168750888
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Available 24/7 on WhatsApp
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Leaf size={20} />
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
