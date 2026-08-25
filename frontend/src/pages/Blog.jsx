import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: '5 Reasons Local Salons Lose 50% of Customers Without an Online Portal',
    excerpt: 'Over 68% of salon clients look to book haircuts and spa slots between 9 PM and midnight—hours when your receptionist is asleep.',
    category: 'Salons & Spas',
    readTime: '4 min read',
    date: 'August 2026',
    author: 'AMP Engineering Team',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'The Zero-Commission Playbook: How Restaurants Retain 30% Higher Margins',
    excerpt: 'Food aggregators charge 25–32% in commissions. Discover how direct QR digital menus and WhatsApp ordering return full control to restaurateurs.',
    category: 'Restaurants',
    readTime: '6 min read',
    date: 'August 2026',
    author: 'Lead Architect',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Local Google Maps SEO: How to Rank #1 for "Near Me" Searches in 14 Days',
    excerpt: 'A complete breakdown of linking high-speed schema markup, Google Reviews widgets, and local citations to dominate your city map pack.',
    category: 'Local SEO',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'AMP Engineering Team',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Why Static Templates Fail: The Case for Lightweight Custom CMS Architecture',
    excerpt: 'Why local store owners abandon WordPress within 6 months and why lightweight, decoupled CMS setups provide lasting ROI.',
    category: 'Architecture',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'Lead Architect',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'WhatsApp Commerce: How Local Boutiques Convert Browsers into Daily Buyers',
    excerpt: 'How retail boutiques turn Instagram followers and walk-ins into a VIP broadcast channel with instant 1-click cart checkout.',
    category: 'Retail & Commerce',
    readTime: '4 min read',
    date: 'August 2026',
    author: 'AMP Engineering Team',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Speed Equals Revenue: Why Sub-Second Load Times Double In-Store Footfall',
    excerpt: 'Every 100ms delay in mobile load time reduces conversions by 7%. How headless architecture delivers ultra-fast local experiences.',
    category: 'Performance',
    readTime: '5 min read',
    date: 'August 2026',
    author: 'Lead Architect',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="blog-page">
      {/* Header */}
      <section className="section-padding" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>
            <span>Growth Knowledge Hub</span>
          </div>
          <h1 className="section-title">
            Offline-to-Online <span className="text-gradient">Growth Insights</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
            Practical, fluff-free guides and case studies on engineering sustainable digital growth for brick-and-mortar retail and service businesses.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {BLOG_POSTS.map((post) => (
              <div key={post.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ 
                  height: '160px', 
                  backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.85) 100%), url(${post.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex', 
                  alignItems: 'flex-end', 
                  padding: '1.25rem',
                  position: 'relative'
                }}>
                  <span className="badge" style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}>
                    {post.category}
                  </span>
                </div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    <span>{post.date}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: '1.35' }}>{post.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {post.excerpt}
                  </p>
                  <button 
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => setSelectedArticle(post)}
                  >
                    Read Guide Summary →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Audit CTA Strip */}
      <section className="section-padding" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(15,23,42,0.9) 100%)', border: '1px solid var(--border-glow)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>Want a Personalized Growth Roadmap for Your Shop?</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
              Run our free Digital Readiness Score tool or book a 1-on-1 strategy call with our Lead Architect today.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/readiness-score" className="btn btn-primary">Take Free Readiness Audit</Link>
              <Link to="/contact" className="btn btn-secondary">Get Custom Proposal</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Article Modal */}
      {selectedArticle && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '620px', width: '100%', padding: '2.5rem', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span className="badge badge-indigo">{selectedArticle.category}</span>
              <button 
                onClick={() => setSelectedArticle(null)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>{selectedArticle.title}</h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              By {selectedArticle.author} • {selectedArticle.date} • {selectedArticle.readTime}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              {selectedArticle.excerpt}
            </p>
            <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
              In today's hyper-local economy, physical foot traffic is increasingly decided on smartphones before the customer ever steps out of their house. Having a fast, high-converting digital storefront ensures that when local buyers search on Google or Instagram, your business wins the first impression and the booking.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/contact" className="btn btn-primary" style={{ flexGrow: 1 }} onClick={() => setSelectedArticle(null)}>
                Implement This Strategy With Us →
              </Link>
              <button className="btn btn-secondary" onClick={() => setSelectedArticle(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
