import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    brandName: 'JEET Computer Education',
    tagline: 'We Build Websites That Build Your Business',
    contactPhone: '7413919688',
    contactPhoneAlt: '8233316498',
    whatsappNumber: '917413919688',
    contactEmail: 'info@jeeteducation.com',
    officeAddress: 'JEET Computer Education, Near Railway Station / Main Bus Stand, Pali, Rajasthan, 306401, India',
    defaultCtaText: 'Get a Free Quote',
    maintenanceMode: false
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.admin
      .getSettings()
      .then((res) => {
        if (res.settings && res.settings.length > 0) {
          const map: Record<string, any> = {};
          res.settings.forEach((s: any) => {
            map[s.key] = s.value;
          });
          setSettings((prev: any) => ({ ...prev, ...map }));
        }
      })
      .catch((err) => console.warn('Settings load warning:', err.message));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    try {
      const itemsToUpdate = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        category: 'general',
        isPublic: true
      }));

      await api.admin.updateSettings(itemsToUpdate);
      setMsg('Website settings saved successfully!');
    } catch (err: any) {
      setMsg(`Error saving settings: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Website Configuration & Settings</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage brand identity, contact phone numbers, WhatsApp click-to-chat credentials, and office address.
        </p>
      </div>

      {msg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6 text-xs">
        {/* Brand & Tagline */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Brand Identity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Brand Name *</label>
              <input
                type="text"
                required
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tagline *</label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & WhatsApp */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Direct Communications & WhatsApp
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Phone *</label>
              <input
                type="text"
                required
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Alternate Phone</label>
              <input
                type="text"
                value={settings.contactPhoneAlt}
                onChange={(e) => setSettings({ ...settings, contactPhoneAlt: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Business Number *</label>
              <input
                type="text"
                required
                placeholder="Country code + number (e.g. 917413919688)"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Email Address *</label>
              <input
                type="email"
                required
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Default CTA Button Text</label>
              <input
                type="text"
                value={settings.defaultCtaText}
                onChange={(e) => setSettings({ ...settings, defaultCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Physical Office Address *</label>
            <textarea
              rows={2}
              required
              value={settings.officeAddress}
              onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Maintenance Toggle */}
        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="w-4 h-4 rounded text-cyan-600"
            />
            <span className="font-bold text-slate-800">
              Maintenance Mode (Temporarily displays maintenance banner to visitors)
            </span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-cyan-400" />
            <span>{saving ? 'Saving Changes...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
