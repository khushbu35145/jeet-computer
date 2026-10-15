import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Sparkles, Phone, MessageCircle } from 'lucide-react';

const generalFaqs = [
  {
    category: 'General & Architecture',
    q: 'What is the main difference between a Static and a Dynamic website?',
    a: 'A static website delivers fixed content directly to users—making it extremely fast, cost-effective, and virtually hack-proof, but requires a developer to make textual or photo changes. A dynamic website connects to a database and includes an intuitive Admin Dashboard, allowing you to create new pages, edit prices, upload photos, and manage client inquiries yourself anytime without technical knowledge.'
  },
  {
    category: 'Process & Timelines',
    q: 'How long does it take to deliver our website?',
    a: 'A Basic Static Website is typically ready within 3 to 5 working days. A Professional Business Website takes 5 to 8 working days. Dynamic websites and E-commerce stores typically take 10 to 20 working days depending on the volume of content and custom features required.'
  },
  {
    category: 'Pricing & Domains',
    q: 'Are domain name and hosting included in the package price?',
    a: 'Our listed prices represent our transparent website design, development, and engineering fees. Domain registration (.com or .in) and hosting are billed at actual cost directly through top providers (Hostinger, Namecheap, AWS), ensuring that YOU own 100% of your digital assets. We handle the technical setup and DNS configuration completely free of charge.'
  },
  {
    category: 'Technical & Responsive',
    q: 'Will our website work properly on mobile phones and tablets?',
    a: 'Yes, 100%. Every single website we engineer is strictly mobile-first and fully responsive across smartphones, tablets, laptops, and wide desktop screens.'
  },
  {
    category: 'Maintenance & AMC',
    q: 'Do you provide maintenance and updates after website launch?',
    a: 'Yes! All packages include complimentary post-launch support (from 1 to 3 months depending on package). We also offer flexible Annual Maintenance Contracts (AMC) starting from just ₹2,500/year for regular backups, security patches, and content updates.'
  },
  {
    category: 'Location & Consultation',
    q: 'Can we visit your office in Pali to discuss our project in person?',
    a: 'Absolutely! We welcome local business owners and entrepreneurs to visit JEET Computer Education in Pali, Rajasthan. You can also call us directly at 7413919688 or 8233316498 to schedule a consultation.'
  }
];

export const FAQPage: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge & Answers</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
          Clear answers to common questions about website types, timelines, domain ownership, and ongoing support.
        </p>
      </section>

      {/* Accordion */}
      <section className="max-w-4xl mx-auto px-4 space-y-4">
        {generalFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
          >
            <button
              onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-cyan-600 text-base"
            >
              <span>{faq.q}</span>
              <span className="text-xl text-slate-400 shrink-0">{activeIdx === idx ? '−' : '+'}</span>
            </button>
            {activeIdx === idx && (
              <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider block mb-2">
                  Category: {faq.category}
                </span>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Direct Contact Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold">Still have questions?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Our engineers are always happy to explain the nuances of web technologies in simple, plain terms.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href="tel:7413919688"
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" /> Call: 7413919688
            </a>
            <Link
              to="/get-a-quote"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs border border-slate-700 hover:bg-slate-800 text-white transition-colors"
            >
              Request Free Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
