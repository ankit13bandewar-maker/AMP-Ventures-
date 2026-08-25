import React from 'react';
import { Link } from 'react-router-dom';

const VALUES = [
  {
    icon: '⚡',
    title: 'Ultra Fast Speed',
    points: [
      'Instant page loading',
      'Smooth mobile experience',
      'Zero slow plugins'
    ]
  },
  {
    icon: '🎯',
    title: 'Built for Sales',
    points: [
      'Easy WhatsApp booking',
      'Clear call-to-action buttons',
      'Turns visitors into buyers'
    ]
  },
  {
    icon: '🔒',
    title: '100% Ownership',
    points: [
      'You own your website code',
      'Full control of your data',
      'No lock-in or hidden fees'
    ]
  },
  {
    icon: '🤖',
    title: 'Modern Technology',
    points: [
      'Easy photo & menu updates',
      'Smart AI chatbot assistant',
      'Future-proof clean build'
    ]
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Business Review',
    points: [
      'Understand your goals',
      'Check local competition',
      'Plan website structure'
    ]
  },
  {
    step: '02',
    title: 'Design & Layout',
    points: [
      'Clean modern design',
      'Mobile-friendly layout',
      'Match your brand style'
    ]
  },
  {
    step: '03',
    title: 'Build & Features',
    points: [
      'Fast website coding',
      'WhatsApp direct booking',
      'Instant lead forms'
    ]
  },
  {
    step: '04',
    title: 'Launch & Handover',
    points: [
      'Go live on fast server',
      'Connect Google Maps ranking',
      'Full training & ownership'
    ]
  }
];

export default function About() {
  return (
    <div className="about-page">
      {/* Header */}
      <section className="section-padding" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>
            <span>Our Mission & Vision</span>
          </div>
          <h1 className="section-title">
            Empowering Brick-and-Mortar Businesses With <span className="text-gradient">World-Class Web Engineering</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '780px', margin: '0 auto' }}>
            AMP Ventures was founded to bridge the digital divide for local physical businesses—replacing clunky, non-converting templates with ultra-fast, high-converting digital storefronts.
          </p>
        </div>
      </section>

      {/* Founder Credentials & Story Card */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '3.5rem 2.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <div className="badge badge-indigo" style={{ marginBottom: '1rem' }}>Engineering Leadership</div>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '1.25rem', lineHeight: '1.2' }}>
                  Behind AMP Ventures: <span className="text-gradient-cyan">Founder Credentials</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                  Most traditional web agencies deliver slow, cookie-cutter WordPress themes managed by non-technical middlemen. At AMP Ventures, every architecture is engineered from first principles with rigorous technical standards.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                  Combining advanced <strong>IIT Roorkee AI/ML engineering</strong> with <strong>Cisco Certified Network Associate (CCNA)</strong> infrastructure fundamentals, our platform bridges local offline retail and clinics into modern, automated revenue engines.
                </p>

                {/* Verified Credentials Pills */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem 1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '1.4rem' }}>🎓</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>IIT Roorkee Certified</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Advanced Artificial Intelligence & Machine Learning</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255, 255, 255, 0.04)', padding: '0.75rem 1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '1.4rem' }}>🌐</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>Cisco Certified Network Associate (CCNA)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enterprise Cloud Routing, Switching & Security Architecture</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Pillar Box */}
              <div style={{ background: 'rgba(15, 23, 42, 0.85)', padding: '2.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#fff' }}>The AMP Ventures Guarantee:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <span style={{ color: 'var(--success)', fontSize: '1.2rem', fontWeight: 800 }}>✓</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>95+ Google PageSpeed Guarantee</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No heavy bloated plugins that slow down mobile customer booking.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <span style={{ color: 'var(--success)', fontSize: '1.2rem', fontWeight: 800 }}>✓</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>Full Code & Data Ownership</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>You own your domain, SQLite/PostgreSQL lead database, and source code.</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem' }}>
                    <span style={{ color: 'var(--success)', fontSize: '1.2rem', fontWeight: 800 }}>✓</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>Direct WhatsApp & Call Support</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Direct access to the lead engineer—no junior support tickets.</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                    Schedule Founder Strategy Call →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Core Principles</div>
            <h2 className="section-title">How We Engineer Web Growth</h2>
            <p className="section-subtitle">The four pillars underlying every project delivered by AMP Ventures.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {VALUES.map((val, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{val.icon}</div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: '#fff' }}>{val.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {val.points.map((pt, pIdx) => (
                    <li key={pIdx} style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.45rem', lineHeight: '1.4' }}>
                      <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', marginTop: '0.15rem' }}>•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Execution Process */}
      <section className="section-padding" style={{ background: 'rgba(15, 23, 42, 0.4)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Smooth Execution</div>
            <h2 className="section-title">Our 4-Step Build Workflow</h2>
            <p className="section-subtitle">From initial brief to live Google ranking in under 14 days.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.75rem', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'rgba(99, 102, 241, 0.4)', fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: '0.75rem' }}>
                  {step.step}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.85rem', color: '#fff' }}>{step.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {step.points.map((pt, pIdx) => (
                    <li key={pIdx} style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.45rem', lineHeight: '1.4' }}>
                      <span style={{ color: 'var(--primary-light)', fontSize: '0.75rem', marginTop: '0.15rem' }}>•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
