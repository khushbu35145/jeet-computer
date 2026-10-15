import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Code,
  Menu,
  X,
  Phone,
  ChevronDown,
  Globe,
  Database,
  Building2,
  ShoppingBag,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const quickServices = [
    { title: 'Static Website Development', slug: 'static-website-development', icon: Globe, price: 'From ₹2,999' },
    { title: 'Dynamic Website Development', slug: 'dynamic-website-development', icon: Database, price: 'From ₹12,999' },
    { title: 'Business & Corporate Sites', slug: 'business-website-development', icon: Building2, price: 'From ₹5,999' },
    { title: 'E-commerce Online Stores', slug: 'ecommerce-website-development', icon: ShoppingBag, price: 'From ₹19,999' },
    { title: 'School & Coaching Portals', slug: 'education-website-development', icon: GraduationCap, price: 'Academic' },
    { title: 'Custom Web Applications', slug: 'custom-web-applications', icon: Code, price: 'Bespoke' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top micro bar for direct contact */}
      <div className="hidden lg:block bg-slate-950/80 border-b border-slate-800/60 py-1.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span>📍 Pali, Rajasthan, India</span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Phone className="w-3.5 h-3.5" /> Call: <a href="tel:7413919688" className="hover:underline">7413919688</a> / <a href="tel:8233316498" className="hover:underline">8233316498</a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Accepting New Website Projects
            </span>
            <Link to="/admin/login" className="text-slate-400 hover:text-slate-200 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                JEET <span className="text-cyan-400">WEB</span>
              </span>
              <span className="block text-[11px] font-medium tracking-wider text-slate-400 uppercase">
                Computer Education • Pali
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  location.pathname.startsWith('/services') ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                    Our Development Services
                  </div>
                  <div className="space-y-1">
                    {quickServices.map((srv) => {
                      const Icon = srv.icon;
                      return (
                        <Link
                          key={srv.slug}
                          to={`/services/${srv.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-200 group-hover:text-white">
                                {srv.title}
                              </div>
                              <div className="text-xs text-slate-400">{srv.price}</div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 px-3 py-1.5 flex justify-between items-center text-xs">
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      View all 17+ categories <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/portfolio') ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/pricing"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/pricing') ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Pricing
            </Link>

            <Link
              to="/blog"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/blog') ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-cyan-400 bg-slate-800/60' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/get-a-quote"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/get-a-quote"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-400 text-slate-950"
            >
              Free Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-6 space-y-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            All Services (17 Categories)
          </Link>
          <Link
            to="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Portfolio Demos
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Pricing Packages (from ₹2,999)
          </Link>
          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Web Insights & Blog
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            About JEET Education
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Contact & Location (Pali)
          </Link>

          <div className="pt-4 border-t border-slate-800">
            <Link
              to="/get-a-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center block px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg"
            >
              Get a Free Quote
            </Link>
            <div className="mt-4 text-center text-xs text-slate-400">
              Call us directly:{' '}
              <a href="tel:7413919688" className="text-cyan-400 font-semibold underline">
                7413919688
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
