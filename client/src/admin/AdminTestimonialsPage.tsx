import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, XCircle, Trash2, MessageSquareQuote, ShieldAlert, X } from 'lucide-react';
import { api } from '../services/api';
import { ITestimonial } from '../types';

export const AdminTestimonialsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = () => {
    setLoading(true);
    api.admin
      .getTestimonials()
      .then((res) => {
        if (res.testimonials) setTestimonials(res.testimonials);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleAddNew = () => {
    setEditingTestimonial({
      clientName: '',
      clientRole: 'Business Owner',
      businessName: '',
      city: 'Pali',
      review: '',
      rating: 5,
      isApproved: true,
      isPublished: true,
      isVerified: true
    });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (t: ITestimonial) => {
    try {
      await api.admin.updateTestimonial(t._id, {
        isPublished: !t.isPublished,
        isApproved: true
      });
      fetchTestimonials();
    } catch (err: any) {
      alert(`Error toggling: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial record?')) return;
    try {
      await api.admin.deleteTestimonial(id);
      fetchTestimonials();
    } catch (err: any) {
      alert(`Error deleting: ${err.message}`);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingTestimonial._id) {
        await api.admin.updateTestimonial(editingTestimonial._id, editingTestimonial);
      } else {
        await api.admin.createTestimonial(editingTestimonial);
      }
      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      alert(`Error saving testimonial: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Testimonial Moderation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Strict approval workflow. Only verified, authorized client reviews may be published.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Verified Review
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Strict Policy:</strong> Never fabricate customer feedback or client logos. Only publish reviews where direct permission from the client has been obtained.
        </span>
      </div>

      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400">Loading reviews...</div>
      ) : testimonials.length === 0 ? (
        <div className="py-20 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200 p-8">
          No client testimonials published yet. Click "Add Verified Review" once client authorization is granted.
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Business / City</th>
                  <th className="py-3 px-4">Review Text</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Approval Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {testimonials.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{t.clientName}</td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{t.businessName || 'Individual'}</div>
                      <div className="text-[10px] text-slate-400">{t.city}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs text-slate-700 line-clamp-2">{t.review}</td>
                    <td className="py-3 px-4 font-bold text-amber-500">{'★'.repeat(t.rating)}</td>
                    <td className="py-3 px-4">
                      {t.isPublished ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published
                        </span>
                      ) : (
                        <span className="text-amber-700 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Pending Review
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleTogglePublish(t)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer"
                      >
                        {t.isPublished ? 'Unpublish' : 'Approve & Publish'}
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
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
      {isModalOpen && editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Add Authorized Testimonial</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.clientName}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={editingTestimonial.businessName}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Testimonial Review Text *</label>
                <textarea
                  rows={4}
                  required
                  value={editingTestimonial.review}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTestimonial.isApproved}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, isApproved: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600"
                  />
                  <span className="font-bold text-slate-800">Verified & Approved</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTestimonial.isPublished}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, isPublished: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-600"
                  />
                  <span className="font-bold text-slate-800">Publish Immediately</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
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
                  {saving ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
