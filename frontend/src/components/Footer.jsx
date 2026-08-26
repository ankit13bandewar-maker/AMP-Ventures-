import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ArrowUp, MessageSquare, Phone, Mail } from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, getWhatsAppUrl } from '../apiConfig';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer bloomx-footer border-t border-white/[0.08] bg-[#07090e]">
      {/* Top Geometric Prism Diamond Banner */}
      <div className="footer-geometric-banner">
        <div className="prism-diamond-pattern"></div>
      </div>

      <div className="container footer-content-container">
        {/* 4 Columns Grid */}
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Certification */}
          <div className="footer-brand-col">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-lime-accent transition-colors">
                AMP <span className="text-lime-accent">Ventures</span>
              </span>
            </Link>
            <p className="footer-tagline text-xs text-slate-400 leading-relaxed mb-6">
              Specialized web engineering, WhatsApp booking automations, and local Google SEO engineered for offline business growth.
            </p>
            <div className="footer-cert-badge">
              <span className="cert-icon-wrap">
                <Award className="w-3.5 h-3.5 text-lime-accent" />
              </span>
              <span>100% Code Ownership • Zero Rent</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-nav-col">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/services" className="footer-link">3-Tier Solutions</Link></li>
              <li><Link to="/pricing" className="footer-link">Transparent Pricing</Link></li>
              <li><Link to="/readiness-score" className="footer-link">Digital Audit Score</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Studio</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="footer-nav-col">
            <h4 className="footer-title">Solutions</h4>
            <ul className="footer-list">
              <li><Link to="/services#tier-1" className="footer-link">High-Converting Website</Link></li>
              <li><Link to="/services#tier-2" className="footer-link">WhatsApp Booking Automation</Link></li>
              <li><Link to="/services#tier-3" className="footer-link">3D & AI Interactive Engine</Link></li>
              <li><Link to="/services" className="footer-link">Google Maps Local SEO</Link></li>
              <li><Link to="/readiness-score" className="footer-link text-sky-400">Free Digital Audit Tool</Link></li>
            </ul>
          </div>

          {/* Column 4: Let's Connect */}
          <div className="footer-nav-col">
            <h4 className="footer-title">Direct Contact</h4>
            <ul className="footer-list footer-contact-list">
              <li>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="footer-contact-link flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@ampventures.agency" className="footer-contact-link flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>contact@ampventures.agency</span>
                </a>
              </li>
              <li style={{ marginTop: '0.6rem' }}>
                <a 
                  href={getWhatsAppUrl("Hi AMP Ventures, I'd like to consult about a website for my business.")} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-bold hover:bg-emerald-500/25 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Direct Chat</span>
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
          </div>

          {/* Policy Links & Copyright */}
          <div className="footer-legal-center">
            <div className="legal-links-row">
              <Link to="/about" className="legal-link">Terms & Conditions</Link>
              <span className="legal-separator">•</span>
              <Link to="/about" className="legal-link">Privacy Policy</Link>
              <span className="legal-separator">•</span>
              <Link to="/pricing" className="legal-link">Refund Policy</Link>
            </div>
            <div className="copyright-text">
              © {new Date().getFullYear()} AMP Ventures Web Engineering Agency. All rights reserved.
            </div>
          </div>

          {/* Crafted & Scroll-To-Top */}
          <div className="footer-crafted-col">
            <span className="crafted-text text-xs text-slate-400">Engineering for <strong>Offline Growth</strong></span>
            <button 
              onClick={scrollToTop} 
              className="scroll-top-btn flex items-center justify-center text-white bg-[#151a26] border border-sky-400 hover:bg-sky-400 hover:text-slate-950 transition-all shadow-md" 
              aria-label="Scroll to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
