import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, DollarSign, X } from 'lucide-react';
import { api } from '../services/api';
import { IPricingPackage } from '../types';

export const AdminPricingPage: React.FC = () => {
  const [packages, setPackages] = useState<IPricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState('');
  const [exclusionsText, setExclusionsText] = useState('');

  const fetchPackages = () => {
    setLoading(true);
    api.admin
      .getPricing()
      .then((res) => {
        if (res.packages) setPackages(res.packages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddNew = () => {
    setEditingPkg({
      title: '',
      slug: '',
      startingPrice: 4999,
      priceNote: 'Provisional starting price. Depends on specific functional requirements.',
      isCustomQuote: false,
      deliveryTimeEstimate: '3-7 working days',
      tagline: '',
      featuresIncluded: [],
      exclusions: [],
      isRecommended: false,
      isActive: true,
      order: packages.length + 1,
      badge: 'Starter'
    });
    setFeaturesText('Mobile Responsive Design\nWhatsApp Click-to-Chat\nBasic SEO Setup');
    setExclusionsText('Database CMS\nCustom payment gateway');
    setIsModalOpen(true);
  };

  const handleEdit = (pkg: IPricingPackage) => {
    setEditingPkg({ ...pkg });
    setFeaturesText(pkg.featuresIncluded?.join('\n') || '');
    setExclusionsText(pkg.exclusions?.join('\n') || '');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete package "${title}"?`)) return;
    try {
      await api.admin.deletePricingPackage(id);
      fetchPackages();
    } catch (err: any) {
      alert(`Error deleting: ${err.message}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...editingPkg,
        featuresIncluded: featuresText.split('\n').map((l) => l.trim()).filter(Boolean),
        exclusions: exclusionsText.split('\n').map((l) => l.trim()).filter(Boolean)
      };

      if (editingPkg._id) {
        await api.admin.updatePricingPackage(editingPkg._id, payload);
      } else {
        await api.admin.createPricingPackage(payload);
      }
      setIsModalOpen(false);
      fetchPackages();
    } catch (err: any) {
      alert(`Error saving package: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Pricing Packages Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure package tiers, starting prices, feature lists, and exclusions.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Pricing Tier
        </button>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400">Loading pricing packages...</div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Package Title</th>
                  <th className="py-3 px-4">Starting Price</th>
                  <th className="py-3 px-4">Delivery Estimate</th>
                  <th className="py-3 px-4">Badge / Recommended</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {packages.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-500">#{pkg.order}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm">{pkg.title}</div>
                      <div className="text-[11px] text-slate-400">{pkg.tagline}</div>
                    </td>
                    <td className="py-3 px-4 font-extrabold text-cyan-700 text-sm">
                      {pkg.isCustomQuote ? 'Custom Quote' : `₹${pkg.startingPrice.toLocaleString('en-IN')}`}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{pkg.deliveryTimeEstimate}</td>
                    <td className="py-3 px-4">
                      {pkg.isRecommended && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800 mr-2">
                          ★ Recommended
                        </span>
                      )}
                      {pkg.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {pkg.badge}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {pkg.isActive ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      ) : (
                        <span className="text-slate-400 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Disabled
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id, pkg.title)}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && editingPkg && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                {editingPkg._id ? 'Edit Pricing Package' : 'Create Pricing Package'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Package Title *</label>
                  <input
                    type="text"
                    required
                    value={editingPkg.title}
                    onChange={(e) => setEditingPkg({ ...editingPkg, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingPkg.slug}
                    onChange={(e) => setEditingPkg({ ...editingPkg, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Starting Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingPkg.startingPrice}
                    onChange={(e) => setEditingPkg({ ...editingPkg, startingPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Delivery Estimate</label>
                  <input
                    type="text"
                    value={editingPkg.deliveryTimeEstimate}
                    onChange={(e) => setEditingPkg({ ...editingPkg, deliveryTimeEstimate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={editingPkg.badge || ''}
                    onChange={(e) => setEditingPkg({ ...editingPkg, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline *</label>
                <input
                  type="text"
                  required
                  value={editingPkg.tagline}
                  onChange={(e) => setEditingPkg({ ...editingPkg, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Features Included (one per line)</label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Exclusions (one per line)</label>
                <textarea
                  rows={3}
                  value={exclusionsText}
                  onChange={(e) => setExclusionsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isRecommended}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isRecommended: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600"
                  />
                  <span className="font-bold text-slate-800">Mark as Recommended Package</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isActive}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600"
                  />
                  <span className="font-bold text-slate-800">Enable on Website</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-sm"
                >
                  {saving ? 'Saving...' : 'Save Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
