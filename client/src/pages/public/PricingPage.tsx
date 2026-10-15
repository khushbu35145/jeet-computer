import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Sparkles, HelpCircle, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { api } from '../../services/api';
import { IPricingPackage } from '../../types';

const defaultPackages: any[] = [
  {
    title: 'Basic Static Website',
    slug: 'basic-static-website',
    startingPrice: 2999,
    priceNote: 'Provisional starting price for up to 3-5 pages.',
    isCustomQuote: false,
    deliveryTimeEstimate: '3 - 5 Working Days',
    tagline: 'Ideal for local shops, service professionals, and startups needing an instant web card.',
    featuresIncluded: [
      'Up to 3-5 responsive pages (Home, About, Services, Contact)',
      'Direct WhatsApp click-to-chat integration',
      'Google Maps location embed & mobile tap-to-call',
      'Ultra-fast load times with basic On-page SEO',
      '1 Year standard deployment assistance'
    ],
    exclusions: [
      'Custom admin panel / database',
      'E-commerce shopping cart & payments',
      'Domain registration and third-party hosting fees (billed directly at actuals)'
    ],
    isRecommended: false,
    badge: 'Starter'
  },
  {
    title: 'Professional Business Website',
    slug: 'professional-business-website',
    startingPrice: 5999,
    priceNote: 'Provisional starting price for 5-8 branded pages.',
    isCustomQuote: false,
    deliveryTimeEstimate: '5 - 8 Working Days',
    tagline: 'High-impact corporate web platform for established businesses and firms seeking qualified leads.',
    featuresIncluded: [
      'Up to 8-10 customized high-impact pages',
      'Modern branded UI/UX with smooth animations',
      'Interactive Request-for-Quote (RFQ) forms with email alerts',
      'Product / Service showcase catalog',
      'Customer testimonials & event photo gallery',
      'Advanced On-Page SEO & Google Search Console indexing',
      '1 Month complimentary priority support'
    ],
    exclusions: [
      'Shopping cart & online customer checkout',
      'Paid third-party API subscriptions (SMS / WhatsApp Business API)'
    ],
    isRecommended: true,
    badge: 'Most Popular'
  },
  {
    title: 'Dynamic Website with Admin Panel',
    slug: 'dynamic-website-admin-panel',
    startingPrice: 12999,
    priceNote: 'Provisional starting price including custom admin dashboard and MongoDB database.',
    isCustomQuote: false,
    deliveryTimeEstimate: '10 - 15 Working Days',
    tagline: 'Complete self-managed web solution with full database control and lead CRM.',
    featuresIncluded: [
      'Unlimited dynamic pages, posts, and services',
      'Secure password-protected Admin Dashboard',
      'Manage services, products, FAQs & customer reviews',
      'Lead management CRM with status updates & CSV export',
      'MongoDB database integration',
      'Role-based admin access & activity audit logging',
      'Rich text editor for articles & updates',
      'Automated customer and admin email notifications',
      '3 Months complimentary priority maintenance'
    ],
    exclusions: [
      'Multi-vendor marketplace infrastructure',
      'Dedicated third-party payment gateway merchant account setup fees'
    ],
    isRecommended: false,
    badge: 'Full Control'
  },
  {
    title: 'E-commerce Website',
    slug: 'ecommerce-website',
    startingPrice: 19999,
    priceNote: 'Provisional starting price. Covers product catalog, cart, and payment gateway integration.',
    isCustomQuote: false,
    deliveryTimeEstimate: '15 - 22 Working Days',
    tagline: 'Full-featured online store to sell your products and accept payments nationwide.',
    featuresIncluded: [
      'Product management with variants (size, color, stock)',
      'Indian payment gateway (Razorpay/UPI/Cards/Netbanking)',
      'Shopping cart & streamlined mobile checkout',
      'Order tracking, customer dashboard & PDF invoices',
      'Coupon codes, discount banners & promotional popups',
      'Inventory stock level alerts',
      'WhatsApp order confirmation helper',
      'Comprehensive admin sales dashboard'
    ],
    exclusions: [
      'Payment gateway transaction fees (typically 1.8% - 2% charged by gateway provider)',
      'Logistics / Shipping API integration fees (Shiprocket / Delhivery billed separately at actuals)'
    ],
    isRecommended: false,
    badge: 'Sell Online'
  },
  {
    title: 'Custom Web Application',
    slug: 'custom-web-application',
    startingPrice: 29999,
    priceNote: 'Custom quotation based on detailed scope of work and functional specifications.',
    isCustomQuote: true,
    deliveryTimeEstimate: '3 - 6 Weeks (Milestone based)',
    tagline: 'Tailored enterprise software, portals, ERP modules, and bespoke management systems.',
    featuresIncluded: [
      'Custom full-stack MERN architecture engineered to spec',
      'Multi-role permissions (Superadmin, Branch Manager, Staff, Client)',
      'Complex business logic, calculations, and reporting',
      'Automated background tasks, jobs, and cron schedules',
      'Third-party API integrations & webhooks',
      'High-security headers, encryption, and audit logs',
      'Automated unit & integration test coverage',
      'Dedicated staging server & thorough user training'
    ],
    exclusions: [
      'Custom quotation tailored to exact system architecture document'
    ],
    isRecommended: false,
    badge: 'Enterprise'
  }
];

export const PricingPage: React.FC = () => {
  const [packages, setPackages] = useState<any[]>(defaultPackages);

  useEffect(() => {
    api
      .getPricing()
      .then((res) => {
        if (res.packages && res.packages.length > 0) {
          setPackages(res.packages);
        }
      })
      .catch(() => {
        // Fallback to defaultPackages gracefully
      });
  }, []);

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Honest, Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Website Development Packages
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
          Every package includes transparent inclusions and exclusions. No unexpected renewal surprises or hidden lock-ins.
        </p>

        {/* Clear Disclaimer */}
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 text-left">
          <strong>Important Pricing Notice:</strong> The prices listed below represent provisional starting prices. The actual cost of any project is tailored to your exact page count, design complexity, customized integrations, and content volume. Domain names and third-party cloud hosting are billed directly at actual provider costs to ensure 100% asset ownership.
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className={`rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between ${
                pkg.isRecommended
                  ? 'bg-slate-950 text-white border-2 border-cyan-400 shadow-2xl shadow-cyan-500/15 relative lg:-translate-y-2'
                  : 'bg-white text-slate-800 border border-slate-200/90 shadow-sm hover:shadow-xl'
              }`}
            >
              {pkg.isRecommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider">
                  Recommended Package
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        pkg.isRecommended ? 'text-cyan-400' : 'text-cyan-700'
                      }`}
                    >
                      {pkg.badge || 'Package'}
                    </span>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                        pkg.isRecommended ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      ⏱ {pkg.deliveryTimeEstimate}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">{pkg.title}</h3>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      pkg.isRecommended ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-b border-slate-200/40">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                      {pkg.isCustomQuote ? 'Custom Quote' : `₹${pkg.startingPrice.toLocaleString('en-IN')}`}
                    </span>
                    {!pkg.isCustomQuote && (
                      <span
                        className={`text-xs ${pkg.isRecommended ? 'text-slate-400' : 'text-slate-500'}`}
                      >
                        starting price
                      </span>
                    )}
                  </div>
                  {pkg.priceNote && (
                    <p
                      className={`text-[11px] mt-1.5 ${
                        pkg.isRecommended ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {pkg.priceNote}
                    </p>
                  )}
                </div>

                {/* Inclusions */}
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    Included Features:
                  </div>
                  <ul className="space-y-2 text-xs">
                    {pkg.featuresIncluded?.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={pkg.isRecommended ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-slate-200/20">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Exclusions / Billed Separately:
                    </div>
                    <ul className="space-y-2 text-xs">
                      {pkg.exclusions?.map((exc: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-slate-400">
                          <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <Link
                  to={`/get-a-quote?package=${encodeURIComponent(pkg.title)}`}
                  className={`w-full text-center block py-3.5 px-4 rounded-xl font-bold text-xs transition-all ${
                    pkg.isRecommended
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-lg hover:scale-105'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  Get Custom Quote for {pkg.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs on Pricing */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 text-center">Pricing & Billing Transparency</h3>
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-slate-900">Why are domain and hosting billed separately?</h4>
            <p className="mt-1">
              Many agencies register domain names under their own accounts, holding client businesses hostage during disputes. At JEET Computer Education, we assist you in purchasing your domain name directly from standard registrars like Namecheap or Hostinger in YOUR name, guaranteeing full lifetime ownership.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900">What are the milestone payment terms?</h4>
            <p className="mt-1">
              We operate on transparent milestone stages: 30% advance on project kickoff, 40% upon completing design approval and staging demonstration, and the final 30% balance upon final deployment to your live domain.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Do you offer GST invoices?</h4>
            <p className="mt-1">
              Yes, official tax invoices with full compliance are provided for all commercial and institutional projects.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
