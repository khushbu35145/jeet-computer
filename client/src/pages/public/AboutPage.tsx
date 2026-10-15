import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Award,
  Users,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-12 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Local Accountability • Modern Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About JEET Computer Education
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed">
          Empowering businesses, institutions, and individuals across Western Rajasthan with reliable, modern, and production-oriented website solutions.
        </p>
      </section>

      {/* Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600">
              Our Digital Mission
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              From Practical Tech Training to Production Web Engineering
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Based in Pali, Rajasthan, <strong>JEET Computer Education</strong> was established with a focus on delivering practical, cutting-edge technical education. As businesses throughout the region experienced a pressing need to transition into the digital economy, we expanded our dedicated software engineering services to deliver enterprise-grade web development directly to local businesses, manufacturers, schools, and startups.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Unlike remote freelance brokers or rigid template vendors who abandon clients after launch, JEET provides local accountability, direct in-person consultations, and ongoing technical maintenance.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Asset Ownership for Clients</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <div className="text-2xl font-black text-cyan-600">Zero</div>
                <div className="text-xs text-slate-500 mt-0.5">Hidden Lock-In Fees</div>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-cyan-400">Our Core Principles</h3>
            <ul className="space-y-4 text-xs text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Transparency First:</strong>
                  We provide itemized, honest quotations with clear inclusions and exclusions.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Modern Standards:</strong>
                  We engineer with the MERN stack (MongoDB, Express, React, Node.js), Vite, and Tailwind CSS for mobile-first speed.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-sm">Dedicated Local Support:</strong>
                  You can call us directly or visit our office in Pali anytime for requirement updates or training.
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-800">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white"
              >
                Contact & Visit Us in Pali <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
