import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Credential */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1rem' }}>
              <div className="brand-icon">⚡</div>
              <div>
                <div className="brand-text">AMP <span className="text-gradient-cyan">VENTURES</span></div>
                <span className="brand-tag">Web Development Agency</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: '1.6' }}>
              High-converting digital architecture for brick-and-mortar businesses. We engineer fast, scalable web apps and customer acquisition pipelines for salons, clinics, restaurants, and retail shops.
            </p>
            <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.35rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Founder Credentials</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-light)' }}>🎓 IIT Roorkee Certified AI/ML | CCNA</span>
            </div>
          </div>

          {/* Col 2: Solutions / Tiers */}
          <div>
            <h4 className="footer-col-title">Service Tiers</h4>
            <ul className="footer-links">
              <li><Link to="/services#tier-1" className="footer-link">Tier 1: Basic Website</Link></li>
              <li><Link to="/services#tier-2" className="footer-link">Tier 2: Premium + CMS</Link></li>
              <li><Link to="/services#tier-3" className="footer-link">Tier 3: 3D + Automation</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing Comparison</Link></li>
              <li><Link to="/readiness-score" className="footer-link">Digital Readiness Tool</Link></li>
            </ul>
          </div>

          {/* Col 3: Industry Verticals */}
          <div>
            <h4 className="footer-col-title">Industries</h4>
            <ul className="footer-links">
              <li><Link to="/portfolio?industry=salon" className="footer-link">Salons & Luxury Spas</Link></li>
              <li><Link to="/portfolio?industry=restaurant" className="footer-link">Restaurants & Cafes</Link></li>
              <li><Link to="/portfolio?industry=clinic" className="footer-link">Clinics & Healthcare</Link></li>
              <li><Link to="/portfolio?industry=retail" className="footer-link">Retail & Boutiques</Link></li>
              <li><Link to="/portfolio" className="footer-link">All Case Studies</Link></li>
            </ul>
          </div>

          {/* Col 4: Quick Contact */}
          <div>
            <h4 className="footer-col-title">Direct Connection</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Ready to take your business online? Get in touch directly with our lead architect.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <a 
                href="https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I'd%20like%20to%20consult%20about%20a%20website%20for%20my%20business." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp btn-sm"
                style={{ width: 'fit-content' }}
              >
                💬 Instant WhatsApp Chat
              </a>
              <Link to="/contact" className="btn btn-secondary btn-sm" style={{ width: 'fit-content' }}>
                ✉️ Send Project Brief
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} AMP VENTURES Agency. All rights reserved. Built with FastAPI + React.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/admin" className="footer-link" style={{ color: '#F59E0B' }}>Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
