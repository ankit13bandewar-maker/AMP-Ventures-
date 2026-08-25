import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MockupGenerator from '../components/MockupGenerator.jsx';

const TRUST_BADGES = [
  { icon: '🎓', title: 'IIT Roorkee Certified', desc: 'AI/ML Engineering Standards' },
  { icon: '🌐', title: 'CCNA Certified Architect', desc: 'Reliable Cloud & Network Infra' },
  { icon: '⚡', title: 'Ultra Fast Delivery', desc: '5–7 Days Basic Turnaround' },
  { icon: '📈', title: 'Conversion Focused', desc: 'Engineered to drive real footfall & sales' },
];

const TRANSFORMATION_ITEMS = [
  {
    icon: '📍',
    industry: 'Salons & Luxury Spas',
    offline: 'Manual phone appointments, empty afternoon slots, and no online review visibility.',
    online: 'Automated 24/7 WhatsApp slot booking, stylist portfolio showcase, and #1 Google Map ranking.',
    metric: '+145% weekly bookings'
  },
  {
    icon: '🍽️',
    industry: 'Restaurants & Cafes',
    offline: '30% commission loss to delivery apps, printed menu reprint costs, slow table turnover.',
    online: 'Zero-commission direct QR ordering, 3D interactive specialty dishes, and automated table reservations.',
    metric: '+210% direct table orders'
  },
  {
    icon: '🩺',
    industry: 'Clinics & Diagnostics',
    offline: 'Crowded waiting rooms, lost patient records, missed consultation inquiries.',
    online: 'Doctor profile portal, pre-appointment symptom triage, and automated SMS/WhatsApp reminders.',
    metric: '94% reduction in no-shows'
  },
  {
    icon: '🛍️',
    industry: 'Retail & Boutiques',
    offline: 'Sales limited to 500m local walking radius, zero repeat customer database.',
    online: 'Digital product catalog, WhatsApp direct shopping cart, and automatic seasonal promo broadcasts.',
    metric: '+180% customer retention'
  }
];

export default function Home() {
  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="section-padding" style={{ paddingTop: '4rem', paddingBottom: '3.5rem', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>
            <span>⚡ Specialized Web Engineering for Offline Businesses</span>
          </div>

          <h1 className="section-title" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', maxWidth: '950px', margin: '0 auto 1.5rem', lineHeight: '1.15' }}>
            Take Your <span className="text-gradient">Offline Business Online</span> & Turn Footfall Into <span className="text-gradient-cyan">Automated Growth</span>
          </h1>

          <p className="section-subtitle" style={{ maxWidth: '780px', margin: '0 auto 2.5rem', fontSize: '1.2rem' }}>
            We engineer high-converting websites, WhatsApp automations, 3D interactive experiences, and local Google SEO engines for brick-and-mortar businesses.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <Link to="/readiness-score" className="btn btn-primary btn-lg">
              🎯 Check Free Digital Readiness Score
            </Link>
            <Link to="/services" className="btn btn-secondary btn-lg">
              Explore 3 Service Tiers
            </Link>
            <a 
              href="https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I'd%20like%20to%20consult%20about%20a%20website%20for%20my%20business." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp btn-lg"
            >
              💬 WhatsApp Consultation
            </a>
          </div>

          {/* Trust Badges Strip */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '1.25rem',
            maxWidth: '1100px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            {TRUST_BADGES.map((b, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.8rem' }}>{b.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>{b.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Instant Website Mockup Generator (High-Converting Tool) */}
      <section className="section-padding" style={{ background: 'rgba(15, 23, 42, 0.5)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <MockupGenerator />
        </div>
      </section>

      {/* 3. Offline to Online Transformation Blueprint */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Transformation Blueprint</div>
            <h2 className="section-title">The Difference Between "Just Surviving" & <span className="text-gradient">Thriving Online</span></h2>
            <p className="section-subtitle">
              See how we convert common offline business bottlenecks into scalable automated digital revenue channels.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {TRANSFORMATION_ITEMS.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{item.industry}</h3>
                    <span className="badge badge-emerald">{item.metric}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--danger)', fontWeight: 700, marginBottom: '0.35rem' }}>
                    ❌ The Offline Limitation:
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {item.offline}
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--success)', fontWeight: 700, marginBottom: '0.35rem' }}>
                    ✅ The AMP Ventures Solution:
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#fff', lineHeight: '1.5', fontWeight: 500 }}>
                    {item.online}
                  </p>
                </div>

                <Link to={`/portfolio?industry=${item.industry.toLowerCase().split(' ')[0]}`} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  View Live Case Study →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. 3 Service Tiers Overview */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Tiered Engineering</div>
            <h2 className="section-title">3 Clear Tiers Built For <span className="text-gradient-cyan">Every Growth Stage</span></h2>
            <p className="section-subtitle">
              No bloated contracts, no confusion. Choose the exact tier that matches your business goals and budget.
            </p>
          </div>

          <div className="pricing-grid">
            {/* Tier 1 */}
            <div className="tier-card tier-card-basic">
              <div className="tier-header">
                <div className="tier-badge" style={{ color: 'var(--tier1-color)' }}>Tier 1 • Rapid Launch</div>
                <h3 className="tier-title">Basic Static Website</h3>
                <p className="tier-desc">Fast, elegant 4–6 page web presence for local businesses establishing their first digital footprint.</p>
              </div>
              <div className="tier-price-box">
                <div className="tier-price-prefix">Starting at</div>
                <div className="tier-price">₹9,999</div>
                <div className="tier-timeline">⏱️ 5–7 Days Delivery</div>
              </div>
              <ul className="tier-features">
                <li className="feature-item highlight"><span className="feature-icon-check">✓</span> 4–6 Responsive Pages</li>
                <li className="feature-item"><span className="feature-icon-check">✓</span> Google Business Profile Sync</li>
                <li className="feature-item"><span className="feature-icon-check">✓</span> Instant Contact Form to Email</li>
                <li className="feature-item"><span className="feature-icon-check">✓</span> Free SSL & Fast CDN Hosting</li>
              </ul>
              <Link to="/contact?tier=tier1" className="btn btn-secondary" style={{ width: '100%' }}>
                Get Tier 1 Quote
              </Link>
            </div>

            {/* Tier 2 */}
            <div className="tier-card tier-card-premium">
              <div className="popular-ribbon">⭐ Most Popular for Local Growth</div>
              <div className="tier-header">
                <div className="tier-badge" style={{ color: 'var(--primary-light)' }}>Tier 2 • Full Control</div>
                <h3 className="tier-title">Premium + CMS</h3>
                <p className="tier-desc">Dynamic web application with custom client CMS to update menus, rates, photos, plus review widgets.</p>
              </div>
              <div className="tier-price-box">
                <div className="tier-price-prefix">Starting at</div>
                <div className="tier-price" style={{ color: 'var(--primary-light)' }}>₹24,999</div>
                <div className="tier-timeline">⏱️ 10–12 Days Delivery</div>
              </div>
              <ul className="tier-features">
                <li className="feature-item highlight"><span className="feature-icon-check">✓</span> Everything in Tier 1</li>
                <li className="feature-item highlight"><span className="feature-icon-check">✓</span> Lightweight Custom CMS</li>
                <li className="feature-item"><span className="feature-icon-check">✓</span> Google Reviews Live Widget</li>
                <li className="feature-item"><span className="feature-icon-check">✓</span> Google Analytics & SEO Tracking</li>
                <li className="feature-item"><span className="feature-icon-check">✓</span> Monthly Maintenance Retainer Option</li>
              </ul>
              <Link to="/contact?tier=tier2" className="btn btn-primary" style={{ width: '100%' }}>
                Get Tier 2 Quote
              </Link>
            </div>

            {/* Tier 3 */}
            <div className="tier-card tier-card-plus">
              <div className="gold-ribbon">👑 Enterprise & High-Tech</div>
              <div className="tier-header">
                <div className="tier-badge" style={{ color: 'var(--tier3-color)' }}>Tier 3 • Next-Gen Digital</div>
                <h3 className="tier-title">Premium Plus (3D & AI)</h3>
                <p className="tier-desc">Immersive 3D interactive hero, WhatsApp Business API automation, AI chatbot lead capture & client portal.</p>
              </div>
              <div className="tier-price-box">
                <div className="tier-price-prefix">Starting at</div>
                <div className="tier-price" style={{ color: 'var(--tier3-color)' }}>₹49,999</div>
                <div className="tier-timeline">⏱️ 14–18 Days Delivery</div>
              </div>
              <ul className="tier-features">
                <li className="feature-item highlight"><span className="feature-icon-check">✓</span> Everything in Tier 2</li>
                <li className="feature-item highlight"><span className="feature-icon-check">✓</span> 3D WebGL / Spline Interactive Hero</li>
                <li className="feature-item highlight"><span className="feature-icon-check">✓</span> WhatsApp Business Automation</li>
                <li className="feature-item"><span className="feature-icon-check">✓</span> AI Chatbot Assistant Included</li>
                <li className="feature-item"><span className="feature-icon-check">✓</span> Centralized Lead Admin Dashboard</li>
              </ul>
              <Link to="/contact?tier=tier3" className="btn btn-secondary" style={{ width: '100%', borderColor: 'rgba(245, 158, 11, 0.4)', color: '#FCD34D' }}>
                Get Tier 3 Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Free Digital Readiness Score Banner */}
      <section className="section-padding" style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            padding: '3.5rem 2.5rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ maxWidth: '650px' }}>
              <span className="badge badge-indigo" style={{ marginBottom: '1rem' }}>Free 60-Second Audit</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '1rem' }}>
                Where Does Your Business Stand Digitally?
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Take our free 3-question diagnostic audit. Get an instant 0–100 Digital Readiness Score, pinpoint missing revenue opportunities, and receive custom growth recommendations.
              </p>
            </div>
            <div>
              <Link to="/readiness-score" className="btn btn-primary btn-lg" style={{ boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)' }}>
                Start Free Audit Now →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
