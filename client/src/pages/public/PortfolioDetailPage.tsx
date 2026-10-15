import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ExternalLink, CheckCircle2, Sparkles, Layers, ShieldAlert, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { IPortfolioProject } from '../../types';

export const PortfolioDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<IPortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    api
      .getProjectBySlug(slug)
      .then((res) => {
        if (res.project) {
          setProject(res.project);
        }
      })
      .catch(() => {
        // Fallback mock
        setProject({
          _id: 'default-id',
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          slug: slug,
          category: 'Business and Corporate Websites',
          shortDescription:
            'A modern, high-conversion web platform engineered for regional businesses seeking digital authority and consistent customer leads.',
          fullDescription:
            'This project was architected using modern MERN stack principles with mobile-first CSS layouts, responsive imagery, structured SEO schemas, and instant WhatsApp inquiry hooks. It showcases how businesses in Pali and Rajasthan can transition from offline-only operations to a 24/7 client generation engine.',
          techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
          features: [
            'Ultra-fast initial page load (< 900ms)',
            'Mobile-first responsive UX tested across devices',
            'Interactive inquiry forms with instant email alerts',
            'Clean URL slug hierarchy for search engine indexing',
            'Full Admin Dashboard control for ongoing content updates'
          ],
          thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
          galleryImages: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'
          ],
          isDemo: true,
          isPublished: true,
          order: 1,
          featured: true
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-slate-500">Loading project blueprint...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Project Not Found</h2>
        <Link to="/portfolio" className="text-cyan-600 font-bold hover:underline">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-14 pb-20">
      {/* Top Banner */}
      <section className="bg-slate-950 text-white pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Portfolio
          </Link>

          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {project.category}
              </span>
              <span className="bg-slate-800 text-cyan-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-cyan-500/30">
                Interactive Demo Prototype
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {project.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Showcase Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main 2 Cols: Imagery & Specs */}
          <div className="lg:col-span-2 space-y-10">
            {/* Main Mockup Screen */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>

            {/* In-depth Overview */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Project Architectural Overview</h2>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {project.fullDescription}
              </p>
            </div>

            {/* Implemented Features */}
            {project.features && project.features.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-600" /> Key Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {project.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tech Stack & CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" /> Technologies Applied
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Link
                  to={`/get-a-quote?reference=${encodeURIComponent(project.title)}`}
                  className="w-full text-center block py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 shadow-lg hover:scale-105 transition-all"
                >
                  Build a Similar Website For My Business
                </Link>

                <a
                  href={`https://wa.me/917413919688?text=Hello%20JEET%20Computer%20Education,%20I%20want%20a%20website%20similar%20to%20demo:%20${encodeURIComponent(
                    project.title
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block py-3 px-4 rounded-xl font-semibold text-xs border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors"
                >
                  Ask Pricing on WhatsApp
                </a>
              </div>
            </div>

            {/* Transparency Note */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" /> Confidentiality Notice
              </span>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                Client privacy is our utmost priority. We never expose private client database records or credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
