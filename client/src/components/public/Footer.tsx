import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Phone, Mail, MapPin, Globe, Shield, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Banner CTA */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Ready to build a website that drives real business?
            </h3>
            <p className="text-slate-400 mt-1 text-base">
              Get an honest, transparent quotation tailored to your business needs in Pali & Western Rajasthan.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/get-a-quote"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all"
            >
              Get a Free Quote Now
            </Link>
            <a
              href="https://wa.me/917413919688?text=Hello%20JEET%20Computer%20Education,%20I%20want%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl font-semibold text-sm border border-slate-700 text-white hover:bg-slate-800 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  JEET <span className="text-cyan-400">WEB</span>
                </span>
                <span className="block text-xs text-slate-400">JEET Computer Education</span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We build websites that build your business. From lightweight, high-speed static websites to full-featured dynamic web portals and e-commerce stores, engineered with precision in Pali, Rajasthan.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Near Railway Station / Main Bus Stand, Pali, Rajasthan, 306401, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <a href="tel:7413919688" className="hover:text-white">7413919688</a> /{' '}
                  <a href="tel:8233316498" className="hover:text-white">8233316498</a>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:info@jeeteducation.com" className="hover:text-white">info@jeeteducation.com</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="https://jeeteducation.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  https://jeeteducation.com <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Website Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services/static-website-development" className="hover:text-cyan-400 transition-colors">
                  Static Website (from ₹2,999)
                </Link>
              </li>
              <li>
                <Link to="/services/dynamic-website-development" className="hover:text-cyan-400 transition-colors">
                  Dynamic Website & Admin CMS
                </Link>
              </li>
              <li>
                <Link to="/services/business-website-development" className="hover:text-cyan-400 transition-colors">
                  Corporate & Business Sites
                </Link>
              </li>
              <li>
                <Link to="/services/ecommerce-website-development" className="hover:text-cyan-400 transition-colors">
                  E-commerce & UPI Store
                </Link>
              </li>
              <li>
                <Link to="/services/education-website-development" className="hover:text-cyan-400 transition-colors">
                  School & Coaching Portals
                </Link>
              </li>
              <li>
                <Link to="/services/custom-web-applications" className="hover:text-cyan-400 transition-colors">
                  Custom MERN Web Apps
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-cyan-400 hover:underline">
                  View All 17 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Explore & Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/portfolio" className="hover:text-cyan-400 transition-colors">
                  Interactive Demos & Portfolio
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-cyan-400 transition-colors">
                  Transparent Pricing Packages
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-cyan-400 transition-colors">
                  Web Architecture Articles
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/get-a-quote" className="hover:text-cyan-400 transition-colors font-semibold text-cyan-300">
                  Project Cost Calculator
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  About JEET Computer Education
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Office Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  Admin Panel Login
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-slate-900/90 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-300 font-medium">Demonstration Notice:</div>
              <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                All showcased portfolio mockups are labeled as illustrative demonstrations to protect client confidentiality until verified client project releases.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} JEET Computer Education, Pali, Rajasthan. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Built with modern MERN Stack & <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Rajasthan Businesses.
          </div>
        </div>
      </div>
    </footer>
  );
};
