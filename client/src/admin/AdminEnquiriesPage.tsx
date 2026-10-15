import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  Search,
  Download,
  Filter,
  Eye,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  FileText,
  DollarSign,
  UserCheck,
  Send,
  X
} from 'lucide-react';
import { api, getStoredToken } from '../services/api';
import { IEnquiry } from '../types';

export const AdminEnquiriesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const highlightedId = searchParams.get('id');

  const [enquiries, setEnquiries] = useState<IEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<IEnquiry | null>(null);

  // CRM Update Form States
  const [crmStatus, setCrmStatus] = useState<any>('New');
  const [crmQuoteAmount, setCrmQuoteAmount] = useState<number | ''>('');
  const [crmAssignedTo, setCrmAssignedTo] = useState('');
  const [crmFollowUpDate, setCrmFollowUpDate] = useState('');
  const [newNote, setNewNote] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');

  const statuses = [
    'All',
    'New',
    'Contacted',
    'Requirement Discussion',
    'Quotation Sent',
    'Negotiation',
    'Approved',
    'In Development',
    'Completed',
    'Rejected'
  ];

  const fetchEnquiries = () => {
    setLoading(true);
    api.admin
      .getEnquiries({
        status: statusFilter === 'All' ? undefined : statusFilter,
        search: searchQuery.trim() || undefined
      })
      .then((res) => {
        if (res.enquiries) {
          setEnquiries(res.enquiries);
          if (highlightedId) {
            const found = res.enquiries.find((e) => e._id === highlightedId);
            if (found) openEnquiryModal(found);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to load enquiries:', err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const openEnquiryModal = (enquiry: IEnquiry) => {
    setSelectedEnquiry(enquiry);
    setCrmStatus(enquiry.status);
    setCrmQuoteAmount(enquiry.quoteAmount !== undefined ? enquiry.quoteAmount : '');
    setCrmAssignedTo(enquiry.assignedTo || '');
    setCrmFollowUpDate(enquiry.followUpDate ? enquiry.followUpDate.slice(0, 10) : '');
    setNewNote('');
    setUpdateMsg('');
  };

  const handleUpdateCRM = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;
    setUpdating(true);
    setUpdateMsg('');

    try {
      const payload: any = {
        status: crmStatus,
        quoteAmount: crmQuoteAmount !== '' ? Number(crmQuoteAmount) : undefined,
        assignedTo: crmAssignedTo.trim() || undefined,
        followUpDate: crmFollowUpDate ? new Date(crmFollowUpDate).toISOString() : undefined
      };

      if (newNote.trim()) {
        payload.internalNote = newNote.trim();
      }

      const res = await api.admin.updateEnquiry(selectedEnquiry._id, payload);
      setUpdateMsg('Enquiry CRM details updated successfully!');
      setSelectedEnquiry(res.enquiry);
      setNewNote('');
      fetchEnquiries();
    } catch (err: any) {
      setUpdateMsg(`Error updating: ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const handleExportCSV = () => {
    const token = getStoredToken();
    const exportUrl = `${import.meta.env.VITE_API_BASE_URL || '/api/v1'}/admin/enquiries/export`;
    
    // Fetch directly with authorization header and trigger browser download
    fetch(exportUrl, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      credentials: 'include'
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jeet-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => {
        alert('Failed to export CSV: ' + err.message);
      });
  };

  const getStatusBadgeClass = (st: string) => {
    switch (st) {
      case 'New':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Approved':
      case 'In Development':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Rejected':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Enquiry CRM
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming project enquiries, track discussion stages, record quotes, and assign staff.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-xs cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-600" />
          <span>Export Authorized Enquiries (CSV)</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ref, name, mobile, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-cyan-500"
          />
        </form>
      </div>

      {/* Enquiries Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-2">
            <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-400">Loading enquiries from MongoDB...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-20 text-center text-xs text-slate-400">
            No inquiries match your current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Ref Number</th>
                  <th className="py-3.5 px-4">Client / Business</th>
                  <th className="py-3.5 px-4">Phone / City</th>
                  <th className="py-3.5 px-4">Website Category</th>
                  <th className="py-3.5 px-4">Budget / Quote</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-700">
                      {e.refNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{e.fullName}</div>
                      <div className="text-[11px] text-slate-400">{e.businessName || 'Individual'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{e.mobile}</div>
                      <div className="text-[11px] text-slate-400">{e.city}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-700 block">{e.websiteType}</span>
                      <span className="text-[10px] text-slate-400">{e.preference}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-700">{e.approxBudget || 'Flexible'}</div>
                      {e.quoteAmount ? (
                        <div className="text-[11px] font-bold text-emerald-600">
                          Quote: ₹{e.quoteAmount.toLocaleString('en-IN')}
                        </div>
                      ) : null}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(
                          e.status
                        )}`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(e.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => openEnquiryModal(e)}
                        className="px-3 py-1.5 rounded-lg font-bold text-xs bg-slate-100 hover:bg-cyan-500 hover:text-slate-950 text-slate-700 transition-colors cursor-pointer"
                      >
                        Manage CRM
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CRM Details & Status Update Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-600">
                  {selectedEnquiry.refNumber}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedEnquiry.fullName}{' '}
                  {selectedEnquiry.businessName ? `(${selectedEnquiry.businessName})` : ''}
                </h2>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {updateMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                {updateMsg}
              </div>
            )}

            {/* Client Contact & Project Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Contact Phone:</span>
                <a href={`tel:${selectedEnquiry.mobile}`} className="font-bold text-slate-900 hover:underline">
                  📞 {selectedEnquiry.mobile}
                </a>
                <div className="mt-1">
                  <a
                    href={`https://wa.me/${selectedEnquiry.mobile.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                      selectedEnquiry.fullName
                    )},%20this%20is%20JEET%20Computer%20Education%20regarding%20your%20website%20enquiry%20(${
                      selectedEnquiry.refNumber
                    }).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Direct
                  </a>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Email Address:</span>
                <a href={`mailto:${selectedEnquiry.email}`} className="font-bold text-slate-900 hover:underline">
                  ✉️ {selectedEnquiry.email}
                </a>
                <div className="text-slate-500 mt-1">📍 {selectedEnquiry.city}</div>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Target Budget / Date:</span>
                <span className="font-bold text-slate-900 block">{selectedEnquiry.approxBudget || 'Flexible'}</span>
                <span className="text-slate-500">{selectedEnquiry.expectedDate || 'Standard delivery'}</span>
              </div>
            </div>

            {/* Description & Requirements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Project Requirements & Description:
              </h4>
              <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.projectDescription}
              </p>
            </div>

            {/* Features Requested */}
            {selectedEnquiry.featuresRequired && selectedEnquiry.featuresRequired.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Requested Functionalities:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEnquiry.featuresRequired.map((f, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 text-[11px] font-semibold border border-cyan-200"
                    >
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CRM Management Form */}
            <form onSubmit={handleUpdateCRM} className="border-t border-slate-100 pt-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                CRM Pipeline & Quotation Controls:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Enquiry Status
                  </label>
                  <select
                    value={crmStatus}
                    onChange={(e) => setCrmStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-semibold focus:outline-none focus:border-cyan-500"
                  >
                    {statuses
                      .filter((s) => s !== 'All')
                      .map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Quote Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 15000"
                    value={crmQuoteAmount}
                    onChange={(e) => setCrmQuoteAmount(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Assign Developer / Staff
                  </label>
                  <input
                    type="text"
                    placeholder="Staff name"
                    value={crmAssignedTo}
                    onChange={(e) => setCrmAssignedTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={crmFollowUpDate}
                    onChange={(e) => setCrmFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Internal Notes History */}
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-bold text-slate-700">
                  Add Internal Note (Never exposed to public clients):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Called client. Agreed on 5-page dynamic layout with Razorpay. Staging ready next Tuesday."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-5 py-2 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-sm cursor-pointer disabled:opacity-50 whitespace-nowrap"
                  >
                    {updating ? 'Updating...' : 'Save CRM Record'}
                  </button>
                </div>
              </div>

              {/* Existing Notes Log */}
              {selectedEnquiry.internalNotes && selectedEnquiry.internalNotes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Internal Notes History:
                  </span>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto">
                    {selectedEnquiry.internalNotes.map((noteItem, idx) => (
                      <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                          <span className="font-bold text-slate-700">{noteItem.author}</span>
                          <span>{new Date(noteItem.createdAt).toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-slate-800">{noteItem.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
