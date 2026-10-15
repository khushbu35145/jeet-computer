import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Zap,
  ShieldCheck,
  Smartphone,
  Database,
  Globe,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Layers,
  ChevronRight,
  Building2,
  ShoppingBag,
  GraduationCap,
  FileCode2,
  Clock,
  Award,
  Users
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const coreServices = [
    {
      title: 'Static Website Development',
      slug: 'static-website-development',
      icon: Globe,
      price: 'Starting at ₹2,999',
      desc: 'Superfast, ultra-secure web presence for small businesses, doctors, lawyers, and consultants. Zero database vulnerabilities.',
      tag: 'Budget Friendly'
    },
    {
      title: 'Dynamic Web Applications',
      slug: 'dynamic-website-development',
      icon: Database,
      price: 'Starting at ₹12,999',
      desc: 'Self-managed websites with custom admin dashboards, database storage, blog posting, and lead CRM capabilities.',
      tag: 'Most Popular'
    },
    {
      title: 'Business & Corporate Sites',
      slug: 'business-website-development',
      icon: Building2,
      price: 'Starting at ₹5,999',
      desc: 'Command credibility and win high-value corporate inquiries with an executive digital identity for your company.',
      tag: 'Enterprise'
    },
    {
      title: 'E-commerce Online Stores',
      slug: 'ecommerce-website-development',
      icon: ShoppingBag,
      price: 'Starting at ₹19,999',
      desc: 'Accept payments via UPI, Credit/Debit cards & NetBanking. Includes order tracking and inventory management.',
      tag: 'Sell Online'
    },
    {
      title: 'School & Coaching Portals',
      slug: 'education-website-development',
      icon: GraduationCap,
      price: 'Custom Quotes',
      desc: 'Digital campus portals with online admission forms, dynamic notice bulletins, course syllabi, and faculty showcases.',
      tag: 'Education'
    },
    {
      title: 'Custom MERN Applications',
      slug: 'custom-web-applications',
      icon: Code,
      price: 'Milestone Based',
      desc: 'Bespoke software systems, client management dashboards, and operational automation tailored to your unique rules.',
      tag: 'Bespoke'
    }
  ];

  const featuredDemos = [
    {
      title: 'Pali Marble & Granite Exporters Hub',
      category: 'Business & Corporate',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
      desc: 'Industrial export website demo featuring stone texture catalogs, RFQ inquiry generator, and WhatsApp pricing trigger.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      slug: 'pali-marble-granite-demo'
    },
    {
      title: 'Shri Krishna Academy & Coaching Portal',
      category: 'Education Portal',
      tech: ['React', 'Express', 'Tailwind', 'MongoDB'],
      desc: 'Academic portal demo featuring digital admissions, downloadable study notes, and dynamic exam notifications.',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      slug: 'shri-krishna-academy-demo'
    },
    {
      title: 'Marwar Handloom & Handicrafts Online Store',
      category: 'E-Commerce Store',
      tech: ['React', 'Razorpay', 'Node.js', 'MongoDB'],
      desc: 'Direct-to-consumer store demo with mobile UPI checkout, order management, and automated invoice generations.',
      img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      slug: 'marwar-handloom-ecommerce-demo'
    }
  ];

  const developmentSteps = [
    {
      step: '01',
      title: 'Discovery & Consultation',
      desc: 'We understand your business goals, target audience, page structure, and feature requirements.'
    },
    {
      step: '02',
      title: 'Modern UI/UX Design',
      desc: 'We craft clean, mobile-first visual layouts that reflect your brand identity and inspire trust.'
    },
    {
      step: '03',
      title: 'Full-Stack Engineering',
      desc: 'We write clean, high-performance code using modern MERN stack standards, APIs, and security best practices.'
    },
    {
      step: '04',
      title: 'Testing & Launch',
      desc: 'Cross-browser testing, SEO checklist validation, domain DNS setup, SSL configuration, and deployment.'
    },
    {
      step: '05',
      title: 'Handover & AMC Support',
      desc: 'We train your team to manage the admin panel and provide reliable ongoing technical maintenance.'
    }
  ];

  const faqs = [
    {
      q: 'What is the difference between a Static and Dynamic website?',
      a: 'A Static website contains pre-rendered pages that load lightning-fast and have zero database maintenance costs—ideal for businesses wanting a reliable digital brochure. A Dynamic website connects to a database and gives you an Admin Panel to add new pages, change prices, and manage customer inquiries without coding.'
    },
    {
      q: 'How much does website development cost with JEET Computer Education?',
      a: 'Our website packages start transparently at ₹2,999 for a Basic Static Website, ₹5,999 for a Professional Business Website, and ₹12,999 for a full Dynamic Website with Admin Panel. Custom enterprise applications receive tailored milestone quotations.'
    },
    {
      q: 'Do you provide website maintenance after launch?',
      a: 'Yes, absolutely. All packages come with complimentary initial support. We also offer affordable Annual Maintenance Contracts (AMC) starting from ₹2,500/year to keep your site updated, backed up, and running without downtime.'
    },
    {
      q: 'Can we visit your office in Pali to discuss requirements?',
      a: 'Yes! We warmly invite clients to visit our campus at JEET Computer Education in Pali, Rajasthan. You can also call us directly at 7413919688 or 8233316498.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-28">
        {/* Ambient background glows and grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* High-tech Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premier Website Development Agency in Pali, Rajasthan</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              We Build Websites That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
                Build Your Business
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              From simple static websites to powerful dynamic web applications,{' '}
              <strong className="text-white">JEET Computer Education</strong> delivers customized website solutions
              for businesses, individuals, startups, and organizations.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/portfolio"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-base border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore Our Work</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Ultra-Fast</div>
                  <div className="text-xs text-slate-400">&lt; 1s Load Speeds</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Mobile-First</div>
                  <div className="text-xs text-slate-400">100% Responsive</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Bank-Grade</div>
                  <div className="text-xs text-slate-400">SSL & Security</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Fast Turnaround</div>
                  <div className="text-xs text-slate-400">Live in 3-5 Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-600">
            What We Engineer
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Complete Website Development Services
          </p>
          <p className="text-slate-600 text-sm">
            Whether you need a sleek landing page, an e-commerce storefront, or an enterprise management portal, our team delivers production-grade web solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.slug}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{srv.price}</span>
                  <Link
                    to={`/services/${srv.slug}`}
                    className="text-xs font-semibold text-cyan-600 group-hover:text-cyan-700 flex items-center gap-1"
                  >
                    Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 px-6 py-3 rounded-xl transition-colors"
          >
            Explore All 17 Development Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* STATIC VS DYNAMIC COMPARISON SECTION */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Customer Decision Guide
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Static vs. Dynamic Websites: Which One Fits You?
            </h2>
            <p className="text-slate-400 text-sm">
              We help you choose the right architecture so you never overpay for features you don't need or compromise on scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Static Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Fast & Budget Friendly</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Static Website</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-cyan-400">₹2,999</div>
                  <div className="text-[11px] text-slate-400">Starting Price</div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Pages are pre-rendered and served directly to the visitor's browser. Ideal for businesses that want a rock-solid, high-speed digital presence without recurring database maintenance.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Blazing-fast load speeds (&lt; 1 second)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Virtually impossible to hack (No database surface)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Extremely low hosting & maintenance expenses</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>WhatsApp direct lead generation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>Requires developer to modify text/images</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/services/static-website-development"
                  className="block text-center py-3 px-4 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                >
                  Learn More About Static Sites
                </Link>
              </div>
            </div>

            {/* Dynamic Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/50 rounded-3xl p-8 space-y-6 relative overflow-hidden shadow-2xl shadow-cyan-500/10">
              <div className="absolute top-4 right-4 bg-cyan-400 text-slate-950 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Recommended for Growth
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Full Database Power</span>
                  <h3 className="text-2xl font-bold text-white mt-1">Dynamic Website & Admin</h3>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-cyan-400">₹12,999</div>
                  <div className="text-[11px] text-slate-400">Starting Price</div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                Connects to a modern MongoDB database with a protected Admin Dashboard. Manage products, write blogs, change prices, and view inquiries anytime from your phone or PC.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Custom Admin Dashboard for non-technical editing</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Lead CRM with status workflows & CSV export</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Unlimited pages, articles, and product listings</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Automated email & WhatsApp alerts</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Scalable MERN architecture for growing businesses</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/services/dynamic-website-development"
                  className="block text-center py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
                >
                  Explore Dynamic Web Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PORTFOLIO DEMOS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
              Proof of Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Demonstration Projects
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Interactive demonstrations engineered to showcase our capabilities across key industry domains.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="text-sm font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1.5"
          >
            View All Demos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDemos.map((demo) => (
            <div
              key={demo.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={demo.img}
                  alt={demo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-cyan-500/30">
                  Interactive Demo
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400">{demo.category}</div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {demo.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {demo.desc}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {demo.tech.map((t) => (
                      <span key={t} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/portfolio/${demo.slug}`}
                    className="w-full text-center block py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-cyan-500 hover:text-slate-950 text-slate-800 transition-colors"
                  >
                    Explore Demo Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEVELOPMENT PROCESS SECTION */}
      <section className="bg-slate-100/80 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
              Predictable Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 5-Stage Engineering Process
            </h2>
            <p className="text-slate-600 text-sm">
              We eliminate guesswork with transparent milestones, regular progress updates, and dedicated testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {developmentSteps.map((s, idx) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative space-y-3"
              >
                <div className="text-3xl font-black text-cyan-600/30">{s.step}</div>
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-400 text-center leading-6 text-xs font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE JEET COMPUTER EDUCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Local Excellence • Global Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Why Businesses in Pali & Rajasthan Trust JEET Computer Education
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We are not an anonymous online agency or a freelance middleman. JEET Computer Education has been a cornerstone of practical technical education and software development in Pali. When you work with us, you get local accountability, direct phone support, and in-person consultations whenever you need.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Direct Physical Presence in Pali</div>
                  <div className="text-xs text-slate-400">Visit our office or call our senior developers anytime.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">100% Asset Ownership</div>
                  <div className="text-xs text-slate-400">You own your domain, code, and hosting accounts directly.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Zero Hidden Charges</div>
                  <div className="text-xs text-slate-400">Transparent itemized quotations with clear inclusions.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">Long-term AMC & Upgrades</div>
                  <div className="text-xs text-slate-400">We stand behind our code with reliable annual maintenance.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl font-bold text-sm bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors"
              >
                Learn More About Us
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl font-semibold text-sm border border-slate-700 hover:bg-slate-900 text-white transition-colors"
              >
                Visit Office in Pali
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
            Transparent Investment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Clear, Starting Package Prices
          </h2>
          <p className="text-slate-600 text-sm">
            Provisional starting prices designed for businesses of all stages. No hidden surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Starter</span>
              <h3 className="text-2xl font-bold text-slate-900">Basic Static</h3>
              <div className="text-3xl font-extrabold text-slate-900">
                ₹2,999 <span className="text-xs font-normal text-slate-500">starting price</span>
              </div>
              <p className="text-xs text-slate-600">
                Ideal for single-page or small 3-5 page websites needing an instant professional presence.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Up to 3-5 mobile-responsive pages</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>WhatsApp click-to-chat integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Fast Google load speed & basic SEO</span>
                </li>
              </ul>
            </div>
            <Link
              to="/get-a-quote"
              className="block text-center py-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Get Custom Quote
            </Link>
          </div>

          {/* Business (Recommended) */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 border-2 border-cyan-500 shadow-xl shadow-cyan-500/10 flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan-400 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Corporate</span>
              <h3 className="text-2xl font-bold text-white">Professional Business</h3>
              <div className="text-3xl font-extrabold text-cyan-400">
                ₹5,999 <span className="text-xs font-normal text-slate-400">starting price</span>
              </div>
              <p className="text-xs text-slate-300">
                High-impact corporate web presence for established firms, traders, and local enterprises.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Up to 8-10 branded pages & animations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Interactive RFQ & Lead forms with alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Product showcase & Google Search Console</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>1 Month complimentary support</span>
                </li>
              </ul>
            </div>
            <Link
              to="/get-a-quote"
              className="block text-center py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-lg hover:scale-105 transition-all"
            >
              Get Custom Quote
            </Link>
          </div>

          {/* Dynamic */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Control</span>
              <h3 className="text-2xl font-bold text-slate-900">Dynamic + Admin</h3>
              <div className="text-3xl font-extrabold text-slate-900">
                ₹12,999 <span className="text-xs font-normal text-slate-500">starting price</span>
              </div>
              <p className="text-xs text-slate-600">
                Database-powered site with protected admin panel, blog manager, and lead CRM.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full Admin Dashboard & Database storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Lead Management CRM with CSV export</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited blog articles & service updates</span>
                </li>
              </ul>
            </div>
            <Link
              to="/get-a-quote"
              className="block text-center py-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          Domain registration, cloud hosting, and third-party APIs are billed directly at actual cost. Custom requirements receive itemized proposals.
        </div>
      </section>

      {/* FAQS ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">Got Questions?</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-cyan-600 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-xl text-slate-400 shrink-0">{activeFaq === idx ? '−' : '+'}</span>
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL HIGH-CONVERSION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Start Your Website Project Today
            </h2>
            <p className="text-cyan-100 text-sm sm:text-base leading-relaxed">
              Tell us about your project vision, required features, and budget. Our senior engineering team will analyze your requirements and provide a free consultation and quotation within 24 hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-white text-slate-950 shadow-xl hover:bg-slate-100 transition-colors"
              >
                Request Free Project Quotation
              </Link>
              <a
                href="https://wa.me/917413919688?text=Hello%20JEET%20Computer%20Education,%20I%20want%20to%20discuss%20a%20website%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-base border-2 border-white/60 hover:bg-white/10 text-white transition-colors"
              >
                Chat on WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
