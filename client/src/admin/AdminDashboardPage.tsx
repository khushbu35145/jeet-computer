import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Image,
  FileText,
  Layers,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';
import { IEnquiry } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>({
    totalEnquiries: 0,
    newEnquiries: 0,
    inProgressEnquiries: 0,
    completedEnquiries: 0,
    publishedPortfolio: 0,
    publishedBlogs: 0,
    totalServices: 0
  });
  const [statusSummary, setStatusSummary] = useState<Record<string, number>>({});
  const [recentEnquiries, setRecentEnquiries] = useState<IEnquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = () => {
    setLoading(true);
    api.admin
      .getDashboardStats()
      .then((res) => {
        if (res.stats) setStats(res.stats);
        if (res.statusSummary) setStatusSummary(res.statusSummary);
        if (res.recentEnquiries) setRecentEnquiries(res.recentEnquiries);
      })
      .catch((err) => {
        console.warn('Dashboard fetch warning:', err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const metricCards = [
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'New / Uncontacted', value: stats.newEnquiries, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'In Development', value: stats.inProgressEnquiries, icon: Clock, color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Completed Projects', value: stats.completedEnquiries, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Portfolio Demos', value: stats.publishedPortfolio, icon: Image, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Published Blogs', value: stats.publishedBlogs, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time enquiry metrics, project pipelines, and content publishing status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Metrics</span>
          </button>
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm flex items-center gap-1.5"
          >
            <span>Open Enquiry CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-slate-500 leading-tight">
                  {card.label}
                </span>
                <div className={`w-7 h-7 rounded-lg ${card.bg} ${card.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* Status Summary Pipeline Badges */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-600" />
          Enquiry Pipeline Status Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          {Object.entries(statusSummary).map(([statusName, count]) => (
            <div
              key={statusName}
              className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center space-y-1"
            >
              <div className="text-base font-extrabold text-slate-900">{count}</div>
              <div className="text-[10px] font-medium text-slate-500 truncate" title={statusName}>
                {statusName}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Recent Customer Inquiries</h3>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1"
          >
            View All in CRM <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No customer enquiries recorded yet. Submissions from the public quote form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Website Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-700">
                      {enquiry.refNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{enquiry.fullName}</div>
                      <div className="text-[11px] text-slate-400">{enquiry.businessName || 'N/A'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div>{enquiry.mobile}</div>
                      <div className="text-[11px] text-slate-400">{enquiry.email}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{enquiry.websiteType}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(enquiry.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/enquiries?id=${enquiry._id}`}
                        className="text-cyan-600 hover:text-cyan-800 font-bold"
                      >
                        Open CRM →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
