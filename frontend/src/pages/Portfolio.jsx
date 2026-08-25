import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const CASE_STUDIES = [
  {
    id: 'salon-luxe-glow',
    title: 'Luxe Glow Unisex Salon & Spa',
    industry: 'Salon & Spa',
    category: 'salon',
    tier: 'Tier 2 — Premium',
    tagline: 'From walk-ins only to 120+ weekly automated online bookings',
    location: 'Bengaluru, India',
    metrics: {
      primary: '+145% Bookings',
      speed: '0.6s Load',
      rating: '4.9 ★ (210+ Reviews)'
    },
    challenge: 'Relied purely on foot traffic and phone calls. High missed appointment rate during peak hours and zero presence on Google Maps.',
    solution: 'Built a sleek React web app with stylist portfolio cards, service rate calculator, Google Reviews sync, and direct WhatsApp 1-click slot booking.',
    deliverables: [
      '6-Page Custom Web Application',
      'Stylist & Pricing CMS Portal',
      'Google Maps 360 & Reviews Widget',
      'Direct WhatsApp Booking Flow'
    ],
    gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)'
  },
  {
    id: 'restaurant-saffron-bistro',
    title: 'Saffron Hearth Fine Dine & Cafe',
    industry: 'Restaurant & Cafe',
    category: 'restaurant',
    tier: 'Tier 3 — Premium Plus',
    tagline: '3D Interactive Culinary Menu & Direct Table Reservations',
    location: 'New Delhi, India',
    metrics: {
      primary: '+210% Table Orders',
      speed: '4,500+ Scans/mo',
      rating: '92% Retention'
    },
    challenge: 'Lost 28% margins to food delivery aggregator apps and suffered frequent weekend table walk-outs due to poor queue management.',
    solution: 'Engineered an interactive 3D WebGL rotating dish showcase, contact-free QR digital menu, and WhatsApp Business API table confirmation broadcast.',
    deliverables: [
      '3D Interactive WebGL Dish Showcase',
      'Dynamic QR Digital Menu Engine',
      'WhatsApp Table Reservation Automation',
      'Lead & Diners Admin Dashboard'
    ],
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)'
  },
  {
    id: 'clinic-apex-dental',
    title: 'Apex Dental Care & Implant Center',
    industry: 'Clinic & Healthcare',
    category: 'clinic',
    tier: 'Tier 2 — Premium',
    tagline: 'Streamlined patient appointments & pre-consultation triage',
    location: 'Hyderabad, India',
    metrics: {
      primary: '94% Less No-Shows',
      speed: '0.5s Load',
      rating: '4.8 ★ (180+ Reviews)'
    },
    challenge: 'Front desk overwhelmed by repetitive phone inquiries regarding doctor timings, procedure costs, and appointment reschedules.',
    solution: 'Developed a clinical consultation portal with interactive doctor profiles, procedure pricing breakdown, and automated appointment calendar integration.',
    deliverables: [
      'Doctor Profiles & Specialties Portal',
      'Interactive Consultation Booking Form',
      'Google Maps Local SEO Optimization',
      'Client Testimonial Video Carousels'
    ],
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)'
  },
  {
    id: 'retail-velvet-thread',
    title: 'Velvet Thread Designer Boutique',
    industry: 'Retail & Boutique',
    category: 'retail',
    tier: 'Tier 1 — Basic',
    tagline: 'Expanding local boutique reach from 500m radius to citywide orders',
    location: 'Mumbai, India',
    metrics: {
      primary: '+180% Inquiries',
      speed: '0.4s Load',
      rating: '100% Mobile Ready'
    },
    challenge: 'Neighborhood boutique struggled to showcase seasonal apparel collections to customers who could not visit during regular store hours.',
    solution: 'Designed a lightweight, ultra-fast static catalog showcase with high-res seasonal lookbooks and 1-tap WhatsApp product inquiry buttons.',
    deliverables: [
      '5-Page High Fashion Static Showcase',
      'WhatsApp 1-Tap Product Ordering',
      'Instagram Feed & Map Integration',
      'Optimized Mobile Speed & SEO'
    ],
    gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)'
  }
];

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('industry') || 'all';
  const [selectedCase, setSelectedCase] = useState(null);

  const filteredStudies = activeCategory === 'all' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(item => item.category === activeCategory);

  const handleFilterChange = (cat) => {
    if (cat === 'all') {
      searchParams.delete('industry');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ industry: cat });
    }
  };

  return (
    <div className="portfolio-page">
      {/* Header */}
      <section className="section-padding" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>
            <span>Proven Track Record</span>
          </div>
          <h1 className="section-title">
            Offline Businesses Transformed into <span className="text-gradient">Digital Leaders</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '750px', margin: '0 auto' }}>
            Explore real architecture case studies across salons, clinics, restaurants, and retail stores powered by AMP Ventures.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container">
        <div className="portfolio-filters">
          <button 
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Industries
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'salon' ? 'active' : ''}`}
            onClick={() => handleFilterChange('salon')}
          >
            ✂️ Salons & Spas
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'restaurant' ? 'active' : ''}`}
            onClick={() => handleFilterChange('restaurant')}
          >
            🍽️ Restaurants & Cafes
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'clinic' ? 'active' : ''}`}
            onClick={() => handleFilterChange('clinic')}
          >
            🩺 Clinics & Healthcare
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'retail' ? 'active' : ''}`}
            onClick={() => handleFilterChange('retail')}
          >
            🛍️ Retail & Boutiques
          </button>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="portfolio-grid">
            {filteredStudies.map((study) => (
              <div key={study.id} className="glass-card portfolio-card">
                {/* Visual Header */}
                <div className="portfolio-thumb" style={{ background: study.gradient }}>
                  <div className="portfolio-thumb-content">
                    <span className="badge" style={{ background: 'rgba(0,0,0,0.4)', color: '#fff', marginBottom: '0.5rem' }}>
                      {study.tier}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{study.title}</h3>
                    <p style={{ fontSize: '0.82rem', opacity: 0.9 }}>📍 {study.location}</p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="portfolio-body">
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary-light)', marginBottom: '0.5rem' }}>
                    "{study.tagline}"
                  </div>

                  {/* Metrics Strip */}
                  <div className="metric-strip">
                    <div>
                      <div className="metric-val">{study.metrics.primary}</div>
                      <div className="metric-lbl">Growth Impact</div>
                    </div>
                    <div>
                      <div className="metric-val">{study.metrics.speed}</div>
                      <div className="metric-lbl">Speed / Volume</div>
                    </div>
                    <div>
                      <div className="metric-val">{study.metrics.rating}</div>
                      <div className="metric-lbl">Customer Trust</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <strong>The Solution:</strong> {study.solution}
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      style={{ flexGrow: 1 }}
                      onClick={() => setSelectedCase(study)}
                    >
                      View Full Architecture Details
                    </button>
                    <Link to={`/contact?tier=${study.tier.toLowerCase().includes('tier 3') ? 'tier3' : study.tier.toLowerCase().includes('tier 2') ? 'tier2' : 'tier1'}`} className="btn btn-primary btn-sm">
                      Get Similar Site
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {selectedCase && (
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
          <div className="glass-card" style={{ maxWidth: '650px', width: '100%', padding: '2.5rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>{selectedCase.industry} • {selectedCase.tier}</span>
                <h2 style={{ fontSize: '1.8rem' }}>{selectedCase.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedCase(null)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--danger)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>The Challenge</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{selectedCase.challenge}</p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--success)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>The Engineered Architecture</h4>
              <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: '1.6' }}>{selectedCase.solution}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--primary-light)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Key Deliverables Provided</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedCase.deliverables.map((del, dIdx) => (
                  <li key={dIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    <span style={{ color: 'var(--success)' }}>✓</span> {del}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link 
                to={`/contact?tier=${selectedCase.tier.toLowerCase().includes('tier 3') ? 'tier3' : selectedCase.tier.toLowerCase().includes('tier 2') ? 'tier2' : 'tier1'}`}
                className="btn btn-primary" 
                style={{ flexGrow: 1 }}
                onClick={() => setSelectedCase(null)}
              >
                Build A Solution Like This For My Business →
              </Link>
              <button className="btn btn-secondary" onClick={() => setSelectedCase(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
