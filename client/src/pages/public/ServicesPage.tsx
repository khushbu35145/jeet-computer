import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Database,
  Building2,
  ShoppingBag,
  GraduationCap,
  Code,
  Layout,
  RefreshCw,
  Compass,
  Briefcase,
  Calendar,
  Newspaper,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { api } from '../../services/api';
import { IService } from '../../types';

// Default static fallback services if backend API is cold or starting
const defaultServices = [
  {
    title: 'Static Website Development',
    slug: 'static-website-development',
    tagline: 'Blazing-fast, ultra-secure, and budget-friendly websites starting at ₹2,999.',
    overview: 'Ideal for small businesses, retailers, and professionals who need a fast, low-maintenance digital presence. Zero database vulnerabilities and maximum reliability.',
    badge: 'Budget Friendly',
    order: 1
  },
  {
    title: 'Dynamic Website Development',
    slug: 'dynamic-website-development',
    tagline: 'Feature-rich web applications with custom admin panels starting at ₹12,999.',
    overview: 'Engineered for growing businesses requiring regular content updates, product catalogs, customer inquiry management, and dynamic data storage.',
    badge: 'Most Popular',
    order: 2
  },
  {
    title: 'Business & Corporate Websites',
    slug: 'business-website-development',
    tagline: 'Authoritative, lead-generating digital headquarters starting at ₹5,999.',
    overview: 'Establish unmatched credibility, capture high-value corporate inquiries, and outshine competitors with an executive-grade web platform.',
    badge: 'Corporate',
    order: 3
  },
  {
    title: 'E-commerce Online Stores',
    slug: 'ecommerce-website-development',
    tagline: 'Sell products online with Indian payment gateways (UPI/Cards) starting at ₹19,999.',
    overview: 'Complete online storefronts with shopping carts, order tracking, customer invoices, and zero marketplace commission.',
    badge: 'Sell Online',
    order: 4
  },
  {
    title: 'School, College & Coaching Portals',
    slug: 'education-website-development',
    tagline: 'Academic management and student admission portals.',
    overview: 'Dedicated digital portals for admissions, course syllabus, faculty profiles, and dynamic exam/event notice bulletins.',
    badge: 'Academic',
    order: 5
  },
  {
    title: 'Custom Web Applications',
    slug: 'custom-web-applications',
    tagline: 'Bespoke MERN software engineered to your exact operational workflows.',
    overview: 'Custom dashboards, role-based workflows, automated calculations, and reporting systems tailored for enterprise efficiency.',
    badge: 'Bespoke',
    order: 6
  },
  {
    title: 'Portfolio & Personal Websites',
    slug: 'portfolio-website-development',
    tagline: 'Showcase your creative work, achievements, and professional resume.',
    overview: 'Designed for photographers, architects, designers, doctors, and chartered accountants seeking a polished personal brand.',
    badge: 'Branding',
    order: 7
  },
  {
    title: 'Blog, News & Magazine Portals',
    slug: 'blog-news-portal-development',
    tagline: 'High-traffic content publishing platforms with rich text editors.',
    overview: 'Optimized for fast article reading, category tagging, social media sharing, and Google AdSense monetization.',
    badge: 'Content',
    order: 8
  },
  {
    title: 'Job Portals & Recruitment Boards',
    slug: 'job-portal-development',
    tagline: 'Connecting local job seekers with regional employers and businesses.',
    overview: 'Job posting forms, candidate resume uploads, applicant filtering, and automated email notifications.',
    badge: 'Portals',
    order: 9
  },
  {
    title: 'Real Estate & Property Hubs',
    slug: 'real-estate-website-development',
    tagline: 'Property listings with location filters, floor plans, and lead inquiries.',
    overview: 'Engineered for property brokers, builders, and colonizers across Rajasthan with visual map pins and inquiry capture.',
    badge: 'Real Estate',
    order: 10
  },
  {
    title: 'Hotel, Resort & Restaurant Websites',
    slug: 'hotel-restaurant-website-development',
    tagline: 'Hospitality showcases with banquet booking and visual food menus.',
    overview: 'Attract tourists and banquet reservations with room availability checkers, wedding hall inquiry wizards, and menus.',
    badge: 'Hospitality',
    order: 11
  },
  {
    title: 'Booking & Appointment Websites',
    slug: 'booking-appointment-website-development',
    tagline: 'Time-slot booking for clinics, salons, consultants, and service pros.',
    overview: 'Calendar integrations, automatic client confirmation SMS/WhatsApp, and appointment rescheduling without manual calls.',
    badge: 'Booking',
    order: 12
  },
  {
    title: 'Website Redesign & Modernization',
    slug: 'website-redesign-maintenance',
    tagline: 'Revamp slow, outdated websites into mobile-first, high-converting platforms.',
    overview: 'Upgrade legacy PHP/WordPress sites to blazing-fast modern React & Node architectures with updated SEO rankings.',
    badge: 'Modernization',
    order: 13
  }
];

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<any[]>(defaultServices);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .getServices()
      .then((res) => {
        if (res.services && res.services.length > 0) {
          setServices(res.services);
        }
      })
      .catch(() => {
        // Keeps defaultServices fallback gracefully
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Spectrum Web Engineering Services</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Website Development Solutions For Every Stage
        </h1>
        <p className="max-w-3xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
          From simple, cost-effective static websites to custom enterprise MERN web applications, explore our 17+ tailored development categories designed for businesses in Pali and across Rajasthan.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.slug}
              className="group bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    <Globe className="w-6 h-6" />
                  </div>
                  {srv.badge && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {srv.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs font-semibold text-cyan-700">{srv.tagline}</p>

                <p className="text-sm text-slate-600 leading-relaxed">{srv.overview}</p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/services/${srv.slug}`}
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 group/btn"
                >
                  View Details & Features{' '}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/get-a-quote"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-bold">Have custom requirements not listed above?</h3>
            <p className="text-slate-400 text-sm">
              We specialize in custom web architectures, integrations, and unique customer portals. Speak with our lead developers in Pali.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/get-a-quote"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors"
            >
              Discuss Custom Project
            </Link>
            <a
              href="tel:7413919688"
              className="px-5 py-3.5 rounded-xl font-semibold text-sm border border-slate-700 hover:bg-slate-800 text-white transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" /> 7413919688
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
