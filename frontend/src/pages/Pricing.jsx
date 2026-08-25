import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PRICING_TIERS = [
  {
    id: 'tier1',
    name: 'Tier 1 — Basic',
    badge: 'Static Web Presence',
    price: '₹9,999',
    timeline: '5–7 Days Delivery',
    description: 'Perfect for local shops, cafes & clinics needing a fast, professional online storefront.',
    features: [
      '4–6 Custom Responsive Pages',
      'Mobile-First Layout & Speed Tuning',
      'Google Maps & Business Profile Link',
      'Contact Form → Instant Email Alerts',
      'Free SSL Certificate & Hosting Setup',
      '1 Round of Design Revisions',
      '30-Day Post Launch Support'
    ],
    ctaText: 'Get Tier 1 Proposal',
    ctaLink: '/contact?tier=tier1',
    cardClass: 'tier-card-basic',
    accentColor: 'var(--tier1-color)'
  },
  {
    id: 'tier2',
    name: 'Tier 2 — Premium',
    badge: 'Most Popular',
    isPopular: true,
    price: '₹24,999',
    timeline: '10–12 Days Delivery',
    description: 'Empowers business owners with a custom CMS to edit items, prices, and photos with zero code.',
    features: [
      'Everything in Tier 1',
      'Lightweight Custom CMS Dashboard',
      'Self-serve Menu & Price Editor',
      'Live Google Reviews Embed Widget',
      'Google Analytics 4 & Traffic Dashboard',
      'Direct WhatsApp Booking CTAs',
      'Optional ₹2,999/mo Maintenance Retainer',
      '60-Day Priority Support'
    ],
    ctaText: 'Start Tier 2 Build',
    ctaLink: '/contact?tier=tier2',
    cardClass: 'tier-card-premium',
    accentColor: 'var(--primary-light)'
  },
  {
    id: 'tier3',
    name: 'Tier 3 — Premium Plus',
    badge: 'High-Tech & 3D',
    isPlus: true,
    price: '₹49,999',
    timeline: '14–18 Days Delivery',
    description: 'Immersive 3D interactive hero, WhatsApp Business API automation, and 24/7 AI chatbot.',
    features: [
      'Everything in Tier 2',
      '3D Interactive WebGL / Spline Hero Model',
      'WhatsApp Business API Automation',
      '24/7 AI Conversational Lead Bot',
      'Centralized Lead Management Dashboard',
      'High-Performance CDN & Custom Animations',
      'Dedicated Tech Lead & Priority SLA'
    ],
    ctaText: 'Book Tier 3 Consultation',
    ctaLink: '/contact?tier=tier3',
    cardClass: 'tier-card-plus',
    accentColor: '#FCD34D'
  }
];

const PRICING_FAQS = [
  {
    q: 'Are there any hidden recurring fees or subscriptions?',
    a: 'No hidden fees. The build price is a one-time project fee. After launch, you own your website and code 100%. Hosting and domain costs are billed directly at cost (approx ₹1,500–₹3,000/year) unless you opt for our optional monthly maintenance retainer.'
  },
  {
    q: 'How does payment work?',
    a: 'We work on a milestone basis: 50% initial deposit upon project agreement and design sign-off, and 50% upon final testing, deployment, and handover of all admin access.'
  },
  {
    q: 'Can I upgrade from Tier 1 to Tier 2 or 3 later?',
    a: 'Absolutely! Because our code architecture is clean, modular, and built on FastAPI + React, you can seamlessly add a CMS, reviews widget, or 3D/AI capabilities down the road without throwing away your original site.'
  },
  {
    q: 'What is the Optional Maintenance Retainer?',
    a: 'For Tier 2 & 3 clients who prefer hands-off peace of mind, we offer a ₹2,999/mo retainer covering high-speed managed cloud hosting, weekly database backups, security patches, and up to 3 hours of content/menu updates each month.'
  }
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="pricing-page">
      {/* Header */}
      <section className="section-padding" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>
            <span>Transparent Investment</span>
          </div>
          <h1 className="section-title">
            Simple, Transparent Pricing For <span className="text-gradient">Real ROI</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '720px', margin: '0 auto' }}>
            Every package is engineered to pay for itself through increased local visibility, customer inquiries, and direct bookings.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="pricing-grid">
            {PRICING_TIERS.map((tier) => (
              <div key={tier.id} className={`tier-card ${tier.cardClass}`}>
                {tier.isPopular && <div className="popular-ribbon">⭐ Most Popular</div>}
                {tier.isPlus && <div className="gold-ribbon">👑 Premium 3D & AI</div>}

                <div className="tier-header">
                  <div className="tier-badge" style={{ color: tier.accentColor }}>{tier.badge}</div>
                  <h3 className="tier-title">{tier.name}</h3>
                  <p className="tier-desc">{tier.description}</p>
                </div>

                <div className="tier-price-box">
                  <div className="tier-price-prefix">One-time investment</div>
                  <div className="tier-price" style={{ color: tier.isPlus ? '#FCD34D' : '#ffffff' }}>
                    {tier.price}
                  </div>
                  <div className="tier-timeline">⏱️ {tier.timeline}</div>
                </div>

                <ul className="tier-features">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className={`feature-item ${fIdx < 3 ? 'highlight' : ''}`}>
                      <span className="feature-icon-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to={tier.ctaLink} 
                  className={`btn ${tier.isPopular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  {tier.ctaText} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retainer Banner */}
      <section className="section-padding" style={{ paddingTop: '1rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: '680px' }}>
              <div className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>Optional Peace of Mind</div>
              <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Monthly Agency Maintenance Retainer</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Never worry about server down-time, domain renewals, or broken links. For <strong>₹2,999/month</strong>, our engineering team manages your hosting, updates menus and banner graphics, monitors SEO rankings, and provides priority technical support.
              </p>
            </div>
            <div>
              <a 
                href="https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I'd%20like%20to%20learn%20more%20about%20the%20Monthly%20Maintenance%20Retainer."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Inquire About Retainer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding" style={{ background: 'rgba(15, 23, 42, 0.4)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="section-header">
            <div className="section-tag">Common Questions</div>
            <h2 className="section-title">Pricing & Process FAQs</h2>
            <p className="section-subtitle">Everything you need to know before starting your project with AMP Ventures.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PRICING_FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ padding: '1.25rem 1.75rem', cursor: 'pointer' }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '1.2rem', color: 'var(--primary-light)' }}>
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaq === idx && (
                  <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
