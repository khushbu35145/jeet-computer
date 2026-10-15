import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Clock, User, Calendar, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { IBlogPost } from '../../types';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    api
      .getBlogPostBySlug(slug)
      .then((res) => {
        if (res.post) {
          setPost(res.post);
          setRelatedPosts(res.relatedPosts || []);
        }
      })
      .catch(() => {
        // Fallback mock
        setPost({
          _id: 'default-blog',
          title: 'Static vs. Dynamic Websites: Which One Does Your Business Really Need?',
          slug: slug,
          excerpt:
            'Confused between choosing a static website or a dynamic web application? Learn the differences in cost, speed, security, and administrative control.',
          content: `
            <p>When planning to build an online presence for your business in Rajasthan or anywhere in India, one of the first technical decisions you encounter is whether to build a <strong>static website</strong> or a <strong>dynamic website</strong>.</p>
            
            <h3>What is a Static Website?</h3>
            <p>A static website consists of web pages that display fixed content to all visitors. The pages are pre-built using HTML5, modern CSS, and JavaScript.</p>
            <ul>
              <li><strong>Super Fast Speed:</strong> Because there is no database processing on each visit, pages load almost instantaneously.</li>
              <li><strong>Maximum Security:</strong> With no database or server-side scripting running behind it, static sites are practically impervious to SQL injection or CMS plugin exploits.</li>
              <li><strong>Low Cost:</strong> Development starts at just ₹2,999, with minimal hosting overhead.</li>
            </ul>

            <h3>What is a Dynamic Website?</h3>
            <p>A dynamic website is powered by a backend database (such as MongoDB or MySQL) and a content management system (CMS) or custom admin dashboard.</p>
            <ul>
              <li><strong>Administrative Freedom:</strong> You can add new blog posts, change product prices, and upload festival greetings anytime from your mobile or PC without touching code.</li>
              <li><strong>Customer Interactions:</strong> Supports user accounts, product catalogs, shopping carts, and dynamic inquiry filters.</li>
            </ul>

            <h3>Which One Should You Choose?</h3>
            <p>If you run a local service business, law office, or clinic and simply need a trustworthy digital visiting card that captures WhatsApp inquiries, a <strong>Static Website</strong> is the most cost-effective choice. If you manage an institute, trading firm, or store that updates offerings regularly, invest in a <strong>Dynamic Website</strong>.</p>
          `,
          category: 'Web Architecture',
          tags: ['Static Website', 'Dynamic Website', 'MERN Stack'],
          featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          author: 'JEET Technical Team',
          isPublished: true,
          readTimeMinutes: 5,
          createdAt: '2026-10-10'
        });
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-slate-500">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <Link to="/blog" className="text-cyan-600 font-bold hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Article Header */}
      <section className="bg-slate-950 text-white pt-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> All Articles
          </Link>

          <div className="space-y-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-400" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" /> {post.readTimeMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Article */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-sm space-y-8">
          <div className="rounded-2xl overflow-hidden max-h-[450px] bg-slate-900">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Consultation CTA Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-slate-900 text-white space-y-4">
            <h3 className="text-xl font-bold text-white">Need advice on choosing the right website?</h3>
            <p className="text-xs text-slate-300">
              Our engineering team in Pali provides free technical consultations to help you determine the optimal tech stack for your budget.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/get-a-quote"
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors"
              >
                Request Free Quote
              </Link>
              <a
                href="tel:7413919688"
                className="px-5 py-2.5 rounded-xl font-semibold text-xs border border-slate-700 hover:bg-slate-800 text-white transition-colors"
              >
                Call: 7413919688
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
