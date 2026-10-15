import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Data Protection & Confidentiality</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last Updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            When you submit a project enquiry or contact JEET Computer Education, we collect basic contact information including your full name, business name, email address, mobile phone number, city, and project specifications.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to prepare project quotations, understand technical requirements, provide milestone updates, and communicate via phone or WhatsApp regarding your website development.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Absolute Privacy & Non-Disclosure</h2>
          <p>
            We strictly do NOT sell, rent, lease, or distribute customer details, phone numbers, or email addresses to any third-party marketing companies. All customer project information is stored securely in our protected database.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Contact & Inquiries</h2>
          <p>
            For any privacy inquiries or to request deletion of your enquiry record from our CRM database, please contact us at{' '}
            <a href="mailto:info@jeeteducation.com" className="text-cyan-600 underline font-semibold">
              info@jeeteducation.com
            </a>{' '}
            or call 7413919688.
          </p>
        </section>
      </div>
    </div>
  );
};
