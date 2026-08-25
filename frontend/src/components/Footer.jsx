import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer bloomx-footer">
      {/* Top Geometric Prism Diamond Banner */}
      <div className="footer-geometric-banner">
        <div className="prism-diamond-pattern"></div>
      </div>

      <div className="container footer-content-container">
        {/* 4 Columns Grid */}
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Certification */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '1rem', textDecoration: 'none' }}>
              <div className="brand-icon">⚡</div>
              <div>
                <div className="brand-text" style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                  AMP <span className="text-gradient-cyan">VENTURES</span>
                </div>
                <span className="brand-tag" style={{ color: 'var(--primary-light)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Web Development Agency
                </span>
              </div>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem', maxWidth: '300px' }}>
              Specialized web engineering, WhatsApp automation & local SEO for offline businesses.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '0.5rem 0.85rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '1.1rem' }}>🎓</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary-light)' }}>IIT Roorkee AI/ML • CCNA</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="footer-nav-col">
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
              <li><Link to="/blog" className="footer-link">Blogs</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Work / Solutions */}
          <div className="footer-nav-col">
            <h4 className="footer-title">Our Work</h4>
            <ul className="footer-list">
              <li><Link to="/services#tier-1" className="footer-link">Website & Development</Link></li>
              <li><Link to="/services#tier-2" className="footer-link">WhatsApp Automation</Link></li>
              <li><Link to="/services#tier-3" className="footer-link">3D & AI Interactive</Link></li>
              <li><Link to="/services" className="footer-link">Local SEO & Google Maps</Link></li>
              <li><Link to="/readiness-score" className="footer-link">Free Audit Tool</Link></li>
            </ul>
          </div>

          {/* Column 4: Let's Connect */}
          <div className="footer-nav-col">
            <h4 className="footer-title">Let's Connect</h4>
            <ul className="footer-list footer-contact-list">
              <li>
                <a href="tel:+919876543210" className="footer-contact-link">+91 9876543210</a>
              </li>
              <li>
                <a href="tel:+919876543211" className="footer-contact-link">+91 9876543211</a>
              </li>
              <li>
                <a href="mailto:contact@ampventures.agency" className="footer-contact-link">contact@ampventures.agency</a>
              </li>
              <li>
                <a href="mailto:bd@ampventures.agency" className="footer-contact-link">bd@ampventures.agency</a>
              </li>
              <li style={{ marginTop: '0.4rem' }}>
                <a 
                  href="https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I'd%20like%20to%20consult%20about%20a%20website%20for%20my%20business." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-whatsapp-pill"
                >
                  💬 WhatsApp Direct Chat
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="footer-divider-line"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          {/* Social Icons */}
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-square-btn" aria-label="Facebook">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-square-btn" aria-label="Instagram">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-square-btn" aria-label="LinkedIn">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-square-btn" aria-label="YouTube">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

          {/* Policy Links & Copyright */}
          <div className="footer-legal-center">
            <div className="legal-links-row">
              <Link to="/about" className="legal-link">Terms & Conditions</Link>
              <span className="legal-separator">•</span>
              <Link to="/about" className="legal-link">Privacy Policy</Link>
              <span className="legal-separator">•</span>
              <Link to="/pricing" className="legal-link">Refund & Cancellation Policy</Link>
            </div>
            <div className="copyright-text">
              All rights reserved by © {new Date().getFullYear()} AMP Ventures Agency
            </div>
          </div>

          {/* Crafted & Scroll-To-Top */}
          <div className="footer-crafted-col">
            <span className="crafted-text">Crafted by <strong>AMP Ventures</strong></span>
            <button 
              onClick={scrollToTop} 
              className="scroll-top-btn" 
              aria-label="Scroll to top"
              title="Back to Top"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

