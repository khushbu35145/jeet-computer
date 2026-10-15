import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Globe,
  Database,
  Building2,
  ShoppingBag,
  GraduationCap,
  Code,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Phone,
  HelpCircle,
  Clock,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { api } from '../../services/api';
import { IService } from '../../types';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    api
      .getServiceBySlug(slug)
      .then((res) => {
        if (res.service) {
          setService(res.service);
        }
      })
      .catch(() => {
        // Fallback default mock data if backend not yet running or during initial load
        setService({
          _id: 'default-id',
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          slug: slug,
          tagline: 'Engineered for high performance, modern user experience, and measurable business results.',
          overview:
            'At JEET Computer Education, we develop tailored web solutions designed to help businesses, institutes, and individuals in Pali, Rajasthan, and beyond establish a high-trust digital presence.',
          suitableCustomers: ['Small & Medium Enterprises', 'Local Retailers', 'Professionals & Consultants', 'Institutions'],
          features: [
            '100% Mobile, Tablet & Desktop responsive layout',
            'Ultra-fast load times optimized for Indian mobile networks',
            'Direct WhatsApp click-to-chat integration for immediate customer contact',
            'On-page SEO optimization & Google Search Console indexing',
            'Free SSL certificate & domain configuration assistance'
          ],
          developmentOptions: ['Modern React + Vite', 'HTML5 + Tailwind CSS', 'Full-stack MERN (Node.js & MongoDB)'],
          benefits: [
            'Attract more customer inquiries around the clock',
            'Build instant professional credibility against local competitors',
            '100% intellectual property ownership'
          ],
          faqs: [
            {
              question: 'How long does this project take to develop?',
              answer: 'Standard projects are delivered within 3 to 10 working days, depending on content volume and feature scope.'
            },
            {
              question: 'Will you help us with domain and hosting setup?',
              answer: 'Yes! We configure your domain and cloud hosting completely free of technical hassles.'
            }
          ],
          iconName: 'Globe',
          order: 1,
          isPublished: true,
          ctaText: 'Get a Free Quote'
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-slate-500">Loading service specifications...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Service Not Found</h2>
        <p className="text-slate-600">The requested development service is unavailable or currently unpublished.</p>
        <Link to="/services" className="text-cyan-600 font-bold hover:underline">
          ← Back to All Services
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20">
      {/* Breadcrumb & Hero */}
      <section className="bg-slate-950 text-white pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> All Services
          </Link>

          <div className="max-w-3xl space-y-4">
            {service.badge && (
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {service.badge}
              </span>
            )}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {service.title}
            </h1>
            <p className="text-lg text-cyan-300 font-medium">
              {service.tagline}
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {service.overview}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to={`/get-a-quote?service=${encodeURIComponent(service.title)}`}
                className="px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all"
              >
                {service.ctaText || 'Get a Free Quote for This Service'}
              </Link>
              <a
                href={`https://wa.me/917413919688?text=Hello%20JEET%20Computer%20Education,%20I%20am%20interested%20in%20${encodeURIComponent(
                  service.title
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm border border-slate-700 hover:bg-slate-800 text-white transition-colors"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main 2 Cols */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-600" />
                  Key Included Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suitable Customers */}
            {service.suitableCustomers && service.suitableCustomers.length > 0 && (
              <div className="bg-slate-100/70 rounded-3xl p-8 border border-slate-200 space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Who Is This Service Ideal For?</h3>
                <div className="flex flex-wrap gap-2">
                  {service.suitableCustomers.map((cust, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-white text-slate-800 font-semibold text-xs border border-slate-200 shadow-xs"
                    >
                      ✓ {cust}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Development Stack & Architecture */}
            {service.developmentOptions && service.developmentOptions.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Technology Stack & Delivery Options
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {service.developmentOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 text-center"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Business Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Service Specific FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {service.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-cyan-600 text-sm"
                      >
                        <span>{faq.question}</span>
                        <span className="text-lg text-slate-400 shrink-0">
                          {activeFaq === idx ? '−' : '+'}
                        </span>
                      </button>
                      {activeFaq === idx && (
                        <div className="px-6 pb-4 text-xs text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Quote Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-7 border border-slate-800 shadow-xl space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Direct Inquiries
                </span>
                <h4 className="text-xl font-bold">Request Quotation</h4>
                <p className="text-xs text-slate-400">
                  Ready to develop your {service.title.toLowerCase()}? Get an exact price quote and milestone breakdown.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/get-a-quote?service=${encodeURIComponent(service.title)}`}
                  className="w-full text-center block py-3 px-4 rounded-xl font-bold text-xs bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-lg"
                >
                  Start Project Enquiry Form
                </Link>

                <a
                  href={`https://wa.me/917413919688?text=Hello%20JEET%20Computer%20Education,%20I%20want%20pricing%20for%20${encodeURIComponent(
                    service.title
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block py-3 px-4 rounded-xl font-semibold text-xs border border-slate-700 text-white hover:bg-slate-800 transition-colors"
                >
                  Quick WhatsApp Chat
                </a>
              </div>

              <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 space-y-1">
                <div>Or speak directly with our engineers:</div>
                <a href="tel:7413919688" className="text-cyan-400 font-bold hover:underline block text-sm">
                  📞 7413919688
                </a>
              </div>
            </div>

            {/* Related Portfolio Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-slate-900">Want to see live work?</h4>
              <p className="text-xs text-slate-600">
                Explore our interactive demonstrations built with the same modern MERN architecture.
              </p>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700"
              >
                Browse Portfolio Demonstrations <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
