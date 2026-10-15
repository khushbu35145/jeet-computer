import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Layers, Sparkles, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { IPortfolioProject } from '../../types';

const defaultProjects: any[] = [
  {
    title: 'Pali Marble & Granite Exporters Hub',
    slug: 'pali-marble-granite-demo',
    category: 'Business and Corporate Websites',
    shortDescription: 'Industrial export website demonstration featuring stone texture catalogs, RFQ inquiry generator, and WhatsApp pricing trigger.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    isDemo: true
  },
  {
    title: 'Shri Krishna Academy & Coaching Portal',
    slug: 'shri-krishna-academy-demo',
    category: 'School, College and Coaching Institute Websites',
    shortDescription: 'Demonstration education portal featuring digital admissions, downloadable syllabus, and dynamic exam notifications.',
    techStack: ['React', 'Express', 'MongoDB', 'Tailwind CSS'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    isDemo: true
  },
  {
    title: 'Marwar Handloom & Handicrafts Online Store',
    slug: 'marwar-handloom-ecommerce-demo',
    category: 'E-commerce Websites',
    shortDescription: 'Demonstration e-commerce store with mobile UPI checkout, order management, and automated invoice generations.',
    techStack: ['React', 'Razorpay', 'Node.js', 'MongoDB'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    isDemo: true
  },
  {
    title: 'Rajasthan Heritage Resort & Dining Booking Hub',
    slug: 'rajasthan-heritage-resort-demo',
    category: 'Hotel and Restaurant Websites',
    shortDescription: 'Demonstration hospitality website with room availability check, banquet hall inquiry, and food menu showcase.',
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Express'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    isDemo: true
  },
  {
    title: 'Vedic Realty & Properties Hub',
    slug: 'vedic-realty-properties-demo',
    category: 'Real Estate Websites',
    shortDescription: 'Demonstration property directory featuring area filters, plot dimensions, and scheduled site-visit booking.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Maps API'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    isDemo: true
  },
  {
    title: 'Dr. Sharma Healthcare Clinic & Appointments',
    slug: 'dr-sharma-clinic-demo',
    category: 'Booking and Appointment Websites',
    shortDescription: 'Demonstration clinic portal with doctor timing schedules, patient token booking, and WhatsApp reminders.',
    techStack: ['React', 'Tailwind CSS', 'MongoDB'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    isDemo: true
  }
];

export const PortfolioPage: React.FC = () => {
  const [projects, setProjects] = useState<any[]>(defaultProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);

  const categories = [
    'All',
    'Business and Corporate Websites',
    'E-commerce Websites',
    'School, College and Coaching Institute Websites',
    'Hotel and Restaurant Websites',
    'Real Estate Websites',
    'Booking and Appointment Websites'
  ];

  useEffect(() => {
    api
      .getPortfolio(selectedCategory === 'All' ? undefined : selectedCategory)
      .then((res) => {
        if (res.projects && res.projects.length > 0) {
          setProjects(res.projects);
        }
      })
      .catch(() => {
        // graceful fallback to default mock projects
      });
  }, [selectedCategory]);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 space-y-14">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Demonstrations & Capabilities</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Explore Our Web Development Work
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
          Browse our live project demonstrations built across key industry sectors. Every project is engineered for speed, clean UX, and high conversions.
        </p>

        {/* Mandatory Transparency Alert */}
        <div className="max-w-3xl mx-auto mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Transparent Demonstration Notice:</span>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              In accordance with our strict ethics policy, all portfolio items below are functional demonstration prototypes designed to showcase technical capabilities and UX standards without infringing on client NDAs.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={p.thumbnailUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-cyan-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-cyan-500/30">
                    Interactive Demo
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-bold text-cyan-700 uppercase tracking-wider">
                    {p.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {p.shortDescription}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {p.techStack?.map((t: string) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/portfolio/${p.slug}`}
                  className="w-full text-center block py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-cyan-500 hover:text-slate-950 text-slate-800 transition-colors"
                >
                  View Demo Architecture & Features →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
