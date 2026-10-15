import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { IBlogPost } from '../../types';

const defaultBlogs: any[] = [
  {
    title: 'Static vs. Dynamic Websites: Which One Does Your Business Really Need?',
    slug: 'static-vs-dynamic-websites-guide',
    excerpt: 'Confused between choosing a static website or a dynamic web application? Learn the differences in cost, speed, security, and administrative control.',
    category: 'Web Architecture',
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'JEET Technical Team',
    readTimeMinutes: 5,
    publishedAt: '2026-10-10'
  },
  {
    title: 'Why Every Local Business in Pali & Rajasthan Needs a Professional Website in 2026',
    slug: 'why-local-business-needs-website-2026',
    excerpt: 'Word-of-mouth is great, but 84% of consumers now check Google before visiting a shop. Discover why a professional website is your #1 growth lever.',
    category: 'Business Growth',
    featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    author: 'JEET Technical Team',
    readTimeMinutes: 4,
    publishedAt: '2026-10-12'
  }
];

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>(defaultBlogs);

  useEffect(() => {
    api
      .getBlogPosts()
      .then((res) => {
        if (res.posts && res.posts.length > 0) {
          setPosts(res.posts);
        }
      })
      .catch(() => {
        // Fallback default mock
      });
  }, []);

  return (
    <div className="py-12 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Web Engineering & Digital Growth Articles</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          JEET Technical Insights & Blog
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
          Practical guides, architectural comparisons, and advice on building high-conversion websites for businesses in Rajasthan.
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {post.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-600 transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-bold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 group/btn"
                >
                  Read Full Article{' '}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
