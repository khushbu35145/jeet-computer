import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Terms & Conditions</h1>
        <p className="text-xs text-slate-500">Last Updated: October 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Project Scope & Quotations</h2>
          <p>
            All listed package prices represent starting estimates for standard baseline features. Formal development commences upon mutual agreement of the written scope of work and receipt of the agreed milestone advance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Asset Ownership & Credentials</h2>
          <p>
            Upon receipt of final project payment, full ownership of custom code, assets, graphics created specifically for the project, and hosting credentials transfers completely to the client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Third-Party Services</h2>
          <p>
            Third-party services including domain names, cloud hosting servers (AWS, Hostinger), SMS gateways, WhatsApp Business APIs, and payment gateways (Razorpay, PhonePe) are subject to their respective terms and fees.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Revisions & Support</h2>
          <p>
            Complimentary support periods (1 to 3 months depending on package) cover bug fixes, minor textual updates, and operational guidance. Structural feature additions after sign-off will be quoted as separate milestones.
          </p>
        </section>
      </div>
    </div>
  );
};
