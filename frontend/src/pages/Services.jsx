import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SERVICES_DATA = [
  {
    id: 'tier-1',
    tierNumber: 'Tier 1',
    name: 'Basic Static Website',
    tagline: 'Clean, lightning-fast web presence to build immediate local credibility.',
    startingPrice: '₹9,999',
    timeline: '5–7 Business Days',
    badgeColor: 'var(--tier1-color)',
    idealFor: 'Local retail shops, solo salons, small cafes, single-doctor clinics wanting a professional online card.',
    highlights: [
      '4–6 Custom Designed Responsive Pages (Home, About, Services, Gallery, Contact)',
      'Google Business Profile integration & Google Map embedding',
      'Contact inquiry form wired with instant email delivery alerts',
      'Lightweight, ultra-fast performance with 95+ Google Lighthouse speed score',
      'Free SSL Security Certificate & DNS / domain setup assistance',
      'Basic On-Page SEO (Meta tags, OpenGraph previews, sitemap.xml)'
    ],
    techStack: 'HTML5, Modern CSS, React/Vite, Fast CDN',
    ctaLink: '/contact?tier=tier1'
  },
  {
    id: 'tier-2',
    tierNumber: 'Tier 2',
    name: 'Premium + Custom CMS',
    tagline: 'Dynamic platform allowing you to edit menus, prices, and gallery photos with zero code.',
    startingPrice: '₹24,999',
    timeline: '10–12 Business Days',
    badgeColor: 'var(--primary-light)',
    isPopular: true,
    idealFor: 'Growing restaurants with seasonal menus, busy salons with stylist rosters, wellness clinics, and specialty retail.',
    highlights: [
      'Everything included in Tier 1',
      'Lightweight Client CMS: Update your menu items, price lists, and portfolio images independently',
      'Live Google Reviews Embed Widget to display 5-star customer ratings automatically',
      'Google Analytics 4 & Search Console setup for weekly traffic visibility',
      'Direct WhatsApp Slot Booking & click-to-chat CTA buttons',
      'Optional Monthly Maintenance Retainer for ongoing updates, backups & technical security'
    ],
    techStack: 'FastAPI Backend, React SPA, SQLite/PostgreSQL CMS, Google Analytics API',
    ctaLink: '/contact?tier=tier2'
  },
  {
    id: 'tier-3',
    tierNumber: 'Tier 3',
    name: 'Premium Plus (3D & Automation)',
    tagline: 'Futuristic digital experience with interactive 3D elements, AI chatbot, and WhatsApp Business API.',
    startingPrice: '₹49,999',
    timeline: '14–18 Business Days',
    badgeColor: 'var(--tier3-color)',
    isPlus: true,
    idealFor: 'High-end fine dining, luxury aesthetics clinics, multi-location brands, and premium experience venues.',
    highlights: [
      'Everything included in Tier 2',
      'Immersive 3D WebGL / Spline interactive hero sections (e.g. 3D rotating dish, 3D salon station, or interactive product)',
      'WhatsApp Business API integration for automated appointment confirmations & reminder broadcasts',
      '24/7 AI Chatbot Assistant capable of answering visitor FAQs and capturing qualified leads automatically',
      'Centralized Lead Admin Dashboard (view chatbot + WhatsApp + form leads in a single unified view)',
      'Custom micro-animations (Framer Motion / Smooth Scroll) & VIP Priority Support SLA'
    ],
    techStack: 'FastAPI, Three.js / WebGL, AI Agent Framework, WhatsApp Cloud API, Admin UI',
    ctaLink: '/contact?tier=tier3'
  }
];

const MATRIX_FEATURES = [
  { name: 'Number of Pages', t1: '4–6 Pages', t2: 'Up to 12 Pages', t3: 'Custom / Scalable' },
  { name: 'Mobile First & Responsive', t1: '✓ Yes', t2: '✓ Yes', t3: '✓ Yes (Ultra-responsive)' },
  { name: 'Google Business Profile Sync', t1: '✓ Yes', t2: '✓ Yes', t3: '✓ Yes + Priority Map SEO' },
  { name: 'Contact Form to Email', t1: '✓ Yes', t2: '✓ Yes', t3: '✓ Yes + SMS / WhatsApp alerts' },
  { name: 'Client CMS Dashboard', t1: '—', t2: '✓ Lightweight CMS', t3: '✓ Full Custom CMS Portal' },
  { name: 'Live Google Reviews Widget', t1: '—', t2: '✓ Included', t3: '✓ Included + Filtered' },
  { name: 'Google Analytics & Traffic Insights', t1: '—', t2: '✓ Included', t3: '✓ Advanced Conversion Funnels' },
  { name: 'WhatsApp Click-to-Chat', t1: '✓ Basic wa.me link', t2: '✓ Dynamic pre-fill triggers', t3: '✓ WhatsApp Cloud API Automation' },
  { name: '3D Interactive / WebGL Hero', t1: '—', t2: '—', t3: '✓ Custom 3D Interactive Model' },
  { name: 'AI Conversational Chatbot', t1: '—', t2: '—', t3: '✓ 24/7 AI Lead Gen Assistant' },
  { name: 'Centralized Lead Management Portal', t1: '—', t2: '—', t3: '✓ Included' },
  { name: 'Support SLA & Retainer Option', t1: '30 Days Warranty', t2: 'Priority Email + Retainer', t3: 'VIP 24h SLA + Dedicated Manager' },
];

export default function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="services-page">
      {/* Header */}
      <section className="section-padding" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>
            <span>Tailored Architecture</span>
          </div>
          <h1 className="section-title">
            Engineered Web Solutions For <span className="text-gradient">Offline Leaders</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '750px', margin: '0 auto' }}>
            We do not sell generic cookie-cutter templates. Every website is custom coded to convert local visitors into paying customers.
          </p>
        </div>
      </section>

      {/* Deep-Dive Tier Cards */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {SERVICES_DATA.map((tier) => (
              <div 
                key={tier.id} 
                id={tier.id} 
                className="glass-card" 
                style={{ 
                  padding: '2.5rem',
                  border: tier.isPopular ? '2px solid var(--primary)' : tier.isPlus ? '1px solid rgba(245,158,11,0.4)' : '1px solid var(--border-subtle)',
                  boxShadow: tier.isPopular ? 'var(--shadow-glow)' : tier.isPlus ? 'var(--shadow-gold)' : 'var(--shadow-md)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <span className="badge" style={{ color: tier.badgeColor, background: 'rgba(255,255,255,0.06)' }}>
                        {tier.tierNumber}
                      </span>
                      {tier.isPopular && <span className="badge badge-indigo">⭐ Most Popular</span>}
                      {tier.isPlus && <span className="badge badge-amber">👑 Enterprise Grade</span>}
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tier.name}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '680px' }}>{tier.tagline}</p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Starting from</div>
                    <div style={{ fontSize: '2.4rem', fontWeight: 800, color: tier.isPlus ? '#FCD34D' : '#ffffff' }}>{tier.startingPrice}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>⏱️ {tier.timeline}</div>
                  </div>
                </div>

                {/* Ideal For Note */}
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '1.75rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--primary-light)', fontSize: '0.88rem' }}>🎯 Ideal For: </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tier.idealFor}</span>
                </div>

                {/* Deliverables Checklist */}
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>What is Included:</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.85rem', marginBottom: '2rem' }}>
                  {tier.highlights.map((h, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--success)', fontWeight: 800 }}>✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Footer of card */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <strong>Tech Backbone:</strong> {tier.techStack}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link to={tier.ctaLink} className={`btn ${tier.isPopular ? 'btn-primary' : 'btn-secondary'}`}>
                      Select {tier.tierNumber} & Get Quote →
                    </Link>
                    <a 
                      href={`https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I'm%20interested%20in%20${encodeURIComponent(tier.name)}.`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-whatsapp btn-sm"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix Table */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Feature Matrix</div>
            <h2 className="section-title">Technical Tier Comparison</h2>
            <p className="section-subtitle">A granular look at the features and capabilities across all 3 tiers.</p>
          </div>

          <div className="glass-card" style={{ overflowX: 'auto', padding: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                  <th style={{ padding: '1rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Feature / Capability</th>
                  <th style={{ padding: '1rem', fontSize: '0.95rem', color: 'var(--tier1-color)' }}>Tier 1: Basic</th>
                  <th style={{ padding: '1rem', fontSize: '0.95rem', color: 'var(--primary-light)' }}>Tier 2: Premium (CMS)</th>
                  <th style={{ padding: '1rem', fontSize: '0.95rem', color: '#FCD34D' }}>Tier 3: Premium Plus (3D)</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX_FEATURES.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>{row.name}</td>
                    <td style={{ padding: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{row.t1}</td>
                    <td style={{ padding: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: row.t2.startsWith('✓') ? 600 : 400 }}>{row.t2}</td>
                    <td style={{ padding: '1rem', fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>{row.t3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
