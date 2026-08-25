import React from 'react';
import { Link } from 'react-router-dom';

const VALUES = [
  {
    icon: '⚡',
    title: 'Performance & Speed First',
    desc: 'Slow websites kill local sales. We code lightweight, bloat-free React and FastAPI applications with sub-second page loads.'
  },
  {
    icon: '🎯',
    title: 'Conversion, Not Fluff',
    desc: 'A pretty site that brings zero calls or walk-ins is useless. Every button, layout, and copy block is engineered to turn visitors into paying customers.'
  },
  {
    icon: '🔒',
    title: 'Zero Vendor Lock-in',
    desc: 'You own your codebase, database, domain, and assets 100%. We provide transparent documentation and clean code handover.'
  },
  {
    icon: '🤖',
    title: 'Future-Proof Tech',
    desc: 'From custom CMS to 3D WebGL visuals and AI conversational assistants, we prepare your offline business for the next decade of web standards.'
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Local Audit',
    desc: 'We analyze your current foot-traffic bottlenecks, audit local Google Maps competitors in your city, and define your core conversion goals.'
  },
  {
    step: '02',
    title: 'Bespoke UI/UX Architecture',
    desc: 'We design a high-contrast, modern interface tailored specifically to your offline industry (salon, clinic, restaurant, or retail store).'
  },
  {
    step: '03',
    title: 'Fullstack Engineering & Integrations',
    desc: 'We build your decoupled frontend and backend, wiring WhatsApp click-to-chat, contact forms, CMS editors, and automated notifications.'
  },
  {
    step: '04',
    title: 'Launch, Map Sync & Growth Handover',
    desc: 'We deploy to high-speed CDN servers, link your Google Business Profile for local SEO ranking, and provide video training for your team.'
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {VALUES.map((val, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{val.icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem' }}>{val.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{val.desc}</p>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'rgba(99, 102, 241, 0.3)', fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: '1rem' }}>
                  {step.step}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: '#fff' }}>{step.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
