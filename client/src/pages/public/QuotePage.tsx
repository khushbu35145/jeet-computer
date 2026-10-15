import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageCircle,
  FileText,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { api } from '../../services/api';

export const QuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledService = searchParams.get('service') || searchParams.get('package') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    mobile: '',
    city: 'Pali',
    websiteType: prefilledService || 'Static Website Development',
    isRedesign: false,
    preference: 'Not Sure / Need Advice',
    pagesRequired: '3-5 Pages',
    featuresRequired: [] as string[],
    approxBudget: '₹5,000 - ₹15,000',
    expectedDate: 'Within 2-3 Weeks',
    domainHostingStatus: 'Need JEET team to purchase & setup for us',
    referenceUrl: '',
    projectDescription: '',
    consentPrivacyPolicy: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successData, setSuccessData] = useState<{
    refNumber: string;
    whatsappFollowupUrl: string;
  } | null>(null);

  const websiteTypes = [
    'Static Website Development',
    'Dynamic Website Development',
    'Business and Corporate Websites',
    'E-commerce Websites',
    'School, College and Coaching Institute Websites',
    'Portfolio and Personal Websites',
    'Blog, News and Magazine Websites',
    'Job Portals',
    'Real Estate Websites',
    'Hotel and Restaurant Websites',
    'Booking and Appointment Websites',
    'Landing Pages',
    'Custom Web Applications',
    'Admin Dashboards and Management Systems',
    'Website Redesign and Maintenance'
  ];

  const availableFeatures = [
    'Admin Dashboard & CMS',
    'User Login & Registration',
    'MongoDB Database Integration',
    'Product / Service Catalog',
    'Online UPI / Razorpay Payment',
    'Appointment / Booking Calendar',
    'Blog & Article Publisher',
    'Live Search & Category Filters',
    'Student / Client Portal',
    'Direct WhatsApp Click-to-Chat',
    'Automated Email Notifications',
    'Custom Contact & RFQ Forms'
  ];

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => {
      const exists = prev.featuresRequired.includes(feature);
      return {
        ...prev,
        featuresRequired: exists
          ? prev.featuresRequired.filter((f) => f !== feature)
          : [...prev.featuresRequired, feature]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.projectDescription.trim() || formData.projectDescription.length < 10) {
      setErrorMsg('Please provide a brief description of your project (min 10 characters)');
      return;
    }
    if (!formData.consentPrivacyPolicy) {
      setErrorMsg('Please agree to the privacy policy to submit your quote request');
      return;
    }

    setSubmitting(true);

    try {
      const res = await api.submitEnquiry(formData);
      setSuccessData({
        refNumber: res.refNumber,
        whatsappFollowupUrl: res.whatsappFollowupUrl
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit enquiry. Please try again or message us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="py-20 max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Enquiry Received Successfully!</h1>
        <p className="text-slate-600 text-sm">
          Thank you for choosing JEET Computer Education. Your project inquiry has been logged in our secure database.
        </p>

        <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Your Unique Reference Number</div>
          <div className="text-2xl font-mono font-bold text-cyan-400">{successData.refNumber}</div>
          <div className="text-xs text-slate-400">Keep this reference handy for quick follow-ups.</div>
        </div>

        <div className="space-y-3 pt-4">
          <a
            href={successData.whatsappFollowupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all"
          >
            <MessageCircle className="w-5 h-5" /> Connect on WhatsApp with Ref #{successData.refNumber}
          </a>

          <Link
            to="/"
            className="block text-center py-3 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-12">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick 24-Hour Project Consultation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Request a Free Website Quotation
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Tell us about your website vision, required features, and budget. Our senior engineering team will evaluate your requirements and provide an itemized proposal.
        </p>
      </section>

      {/* Main Form Box */}
      <section className="max-w-4xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-10"
        >
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Contact Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold flex items-center justify-center">
                1
              </span>
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Business / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Marwar Handicrafts Pvt Ltd"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@business.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 7413919688"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pali, Jodhpur, Sumerpur, or Other"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Website Type & Scope */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold flex items-center justify-center">
                2
              </span>
              Project Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Website Category *
                </label>
                <select
                  value={formData.websiteType}
                  onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-cyan-500"
                >
                  {websiteTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Static or Dynamic Preference
                </label>
                <select
                  value={formData.preference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preference: e.target.value as any
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Not Sure / Need Advice">Not Sure / Need Advice</option>
                  <option value="Static Website">Static Website (Faster, Low Maintenance)</option>
                  <option value="Dynamic Website">Dynamic Website (Admin Panel & Database)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Pages Needed
                </label>
                <select
                  value={formData.pagesRequired}
                  onChange={(e) => setFormData({ ...formData, pagesRequired: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="1-3 Pages">1 - 3 Pages (Landing / Visiting Card)</option>
                  <option value="3-5 Pages">3 - 5 Pages (Standard Starter)</option>
                  <option value="5-10 Pages">5 - 10 Pages (Comprehensive Corporate)</option>
                  <option value="10+ Pages">10+ Pages (Large Portal / Catalog)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Approximate Budget
                </label>
                <select
                  value={formData.approxBudget}
                  onChange={(e) => setFormData({ ...formData, approxBudget: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="₹2,999 - ₹5,000">₹2,999 - ₹5,000 (Basic Static)</option>
                  <option value="₹5,000 - ₹12,000">₹5,000 - ₹12,000 (Business Site)</option>
                  <option value="₹12,000 - ₹25,000">₹12,000 - ₹25,000 (Dynamic / Store)</option>
                  <option value="₹25,000+">₹25,000+ (Custom Web App)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={formData.isRedesign}
                    onChange={(e) => setFormData({ ...formData, isRedesign: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500"
                  />
                  <span className="text-xs text-slate-700 font-medium">
                    This is a redesign of an existing website (not a brand new site).
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Required Features Checklist */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold flex items-center justify-center">
                3
              </span>
              Desired Functionality & Features
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {availableFeatures.map((feat) => {
                const checked = formData.featuresRequired.includes(feat);
                return (
                  <label
                    key={feat}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      checked
                        ? 'bg-cyan-50/70 border-cyan-400 text-slate-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleFeatureToggle(feat)}
                      className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 mt-0.5"
                    />
                    <span>{feat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 4: Project Details & Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold flex items-center justify-center">
                4
              </span>
              Project Description & Requirements
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tell us about your project, target audience, and specific goals *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe what your business does and what you want visitors to do on your website (e.g., call, fill RFQ form, buy products, book appointments)..."
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reference Website URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.referenceUrl}
                onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Privacy Consent & Submit */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.consentPrivacyPolicy}
                onChange={(e) => setFormData({ ...formData, consentPrivacyPolicy: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-600 focus:ring-cyan-500 mt-0.5"
              />
              <span className="text-xs text-slate-600 leading-normal">
                I agree to the{' '}
                <Link to="/privacy-policy" className="text-cyan-600 underline font-semibold">
                  Privacy Policy
                </Link>{' '}
                and authorize JEET Computer Education to contact me regarding this project enquiry.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-white text-slate-950 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <span>Generating Project Reference...</span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Submit Project Enquiry & Get Quotation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
