import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check backend health periodically
    const checkHealth = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/health', { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          setBackendOnline(true);
        } else {
          setBackendOnline(false);
        }
      } catch (err) {
        // Fallback check on relative path
        try {
          const res = await fetch('/api/health', { signal: AbortSignal.timeout(3000) });
          setBackendOnline(res.ok);
        } catch {
          setBackendOnline(false);
        }
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="brand-icon">⚡</div>
          <div>
            <div className="brand-text">AMP <span className="text-gradient-cyan">VENTURES</span></div>
            <span className="brand-tag">Agency Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Services & Tiers
            </NavLink>
          </li>
          <li>
            <NavLink to="/pricing" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Case Studies
            </NavLink>
          </li>
          <li>
            <NavLink to="/readiness-score" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Free Audit Tool
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Growth Blog
            </NavLink>
          </li>
        </ul>

        {/* Right CTA & Status */}
        <div className="nav-actions">
          <div className="status-indicator-badge" title={backendOnline ? "API Engine Operational" : "Connecting to Local API..."}>
            <span className="status-dot" style={{ background: backendOnline ? '#10B981' : '#F59E0B' }}></span>
            <span>{backendOnline ? 'API Active' : 'Connecting'}</span>
          </div>

          <Link to="/contact" className="btn btn-primary btn-sm">
            Get Custom Quote
          </Link>

          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="mobile-nav-link">Home <span>→</span></Link>
        <Link to="/services" className="mobile-nav-link">Services & Tiers <span>→</span></Link>
        <Link to="/pricing" className="mobile-nav-link">Pricing & Plans <span>→</span></Link>
        <Link to="/portfolio" className="mobile-nav-link">Case Studies <span>→</span></Link>
        <Link to="/readiness-score" className="mobile-nav-link">Free Readiness Score <span>→</span></Link>
        <Link to="/about" className="mobile-nav-link">About & Founder <span>→</span></Link>
        <Link to="/blog" className="mobile-nav-link">Growth Blog <span>→</span></Link>
        <Link to="/admin" className="mobile-nav-link" style={{ color: '#F59E0B' }}>Admin Portal <span>→</span></Link>
        <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>Get Custom Quote</Link>
          <a 
            href="https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I%20would%20like%20to%20discuss%20taking%20my%20business%20online." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-whatsapp" 
            style={{ width: '100%' }}
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
