import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const INDUSTRIES = [
  'Salon & Luxury Spa',
  'Restaurant & Cafe',
  'Clinic & Dental Center',
  'Retail Store & Boutique',
  'Gym & Fitness Studio',
  'Other Local Service'
];

export default function ReadinessTool() {
  const [form, setForm] = useState({
    business_name: '',
    city: '',
    industry: 'Salon & Luxury Spa',
    has_website: false,
    has_google_maps: false,
    has_social: false,
    accepts_online_booking: false,
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAudit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      try {
        res = await fetch('http://127.0.0.1:8000/api/readiness-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } catch (err) {
        res = await fetch('/api/readiness-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      }

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        throw new Error("Audit service error");
      }
    } catch (err) {
      // Local calculation fallback
      let score = 15;
      const checklist = [];

      if (form.has_website) {
        score += 30;
        checklist.push({
          item: 'Existing Website Online',
          status: 'optimal',
          impact: 'High',
          description: 'Your business has a web presence, but modern mobile conversion architecture can 3x your lead count.'
        });
      } else {
        checklist.push({
          item: 'Professional Web Presence',
          status: 'missing',
          impact: 'Critical',
          description: 'Over 80% of local customers search online before visiting. You are losing customers directly to competitors.'
        });
      }

      if (form.has_google_maps) {
        score += 25;
        checklist.push({
          item: 'Google Maps Local Listing',
          status: 'optimal',
          impact: 'High',
          description: 'Map listing active. Linking high-speed website and customer review widgets will push you to #1 spot.'
        });
      } else {
        checklist.push({
          item: 'Google Business Profile & 5-Star Reviews',
          status: 'missing',
          impact: 'Critical',
          description: 'You are missing out on local "near me" map search rankings in ' + (form.city || 'your city') + '.'
        });
      }

      if (form.accepts_online_booking) {
        score += 20;
        checklist.push({
          item: 'Online Booking / Order Flow',
          status: 'optimal',
          impact: 'High',
          description: 'Digital ordering active. Automated WhatsApp reminders can reduce no-shows by 90%.'
        });
      } else {
        checklist.push({
          item: '24/7 Automated WhatsApp Slot Booking',
          status: 'missing',
          impact: 'Critical',
          description: 'Customers cannot book after hours or during busy store shifts. You lose up to 40% of impulse bookings.'
        });
      }

      setResult({
        score: Math.min(100, score),
        level: score < 40 ? 'Critical Digital Gap' : score < 70 ? 'Moderate Digital Maturity' : 'Optimized Foundation',
        summary: `Your business "${form.business_name || 'Business'}" in ${form.city || 'City'} is capturing only a fraction of its true local online revenue potential.`,
        potential_revenue_boost: score < 40 ? '+60% to +120% Inbound Growth' : '+30% to +50% Footfall Increase',
        checklist: checklist,
        recommended_tier: score < 40 ? 'Tier 1 — Basic or Tier 2 — Premium' : 'Tier 2 — Premium (CMS & Reviews)',
        recommended_tier_reason: 'A high-converting web storefront integrated with Google Maps and WhatsApp will immediately capture local search demand.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="readiness-page">
      {/* Header */}
      <section className="section-padding" style={{ paddingTop: '4rem', paddingBottom: '2.5rem' }}>
        <div className="container text-center">
          <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>
            <span>Free 60-Second Lead Magnet</span>
          </div>
          <h1 className="section-title">
            Digital Readiness <span className="text-gradient">Audit & Score</span>
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '750px', margin: '0 auto' }}>
            Find out what's stopping your local business from dominating search results and capturing high-margin online bookings.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container readiness-container">
          {!result ? (
            <div className="glass-card readiness-card">
              <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Analyze Your Business's Digital Strength
              </h2>

              <form onSubmit={handleAudit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className="form-group">
                    <label className="form-label">Business Name *</label>
                    <input 
                      type="text" 
                      name="business_name"
                      required
                      className="form-input" 
                      placeholder="e.g. Royal Crown Barbers"
                      value={form.business_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City / Location *</label>
                    <input 
                      type="text" 
                      name="city"
                      required
                      className="form-input" 
                      placeholder="e.g. Mumbai, Bengaluru, Delhi"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Industry Type</label>
                  <select 
                    name="industry"
                    className="form-select"
                    value={form.industry}
                    onChange={handleChange}
                  >
                    {INDUSTRIES.map((ind, idx) => (
                      <option key={idx} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Audit Checklist Checkboxes */}
                <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Current Setup (Check all that apply):</div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    <input 
                      type="checkbox" 
                      name="has_website"
                      checked={form.has_website}
                      onChange={handleChange}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>We currently have an active company website</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    <input 
                      type="checkbox" 
                      name="has_google_maps"
                      checked={form.has_google_maps}
                      onChange={handleChange}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>We have a Google Business Profile / Google Maps listing</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    <input 
                      type="checkbox" 
                      name="accepts_online_booking"
                      checked={form.accepts_online_booking}
                      onChange={handleChange}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>Customers can book appointments or order items online (not just phone calls)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    <input 
                      type="checkbox" 
                      name="has_social"
                      checked={form.has_social}
                      onChange={handleChange}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                    <span>We actively post on Instagram / Facebook</span>
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email (To receive copy of report)</label>
                    <input 
                      type="email" 
                      name="email"
                      className="form-input" 
                      placeholder="owner@business.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp Number (Optional)</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="form-input" 
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg" 
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  {loading ? 'Analyzing Digital Gaps...' : 'Generate Instant Diagnostic Score →'}
                </button>
              </form>
            </div>
          ) : (
            /* Result Screen */
            <div className="glass-card readiness-card">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Diagnostic Results</span>
                <h2 style={{ fontSize: '2rem' }}>Digital Maturity Report</h2>
                <p style={{ color: 'var(--text-secondary)' }}>For: <strong>{form.business_name}</strong> ({form.city})</p>
              </div>

              {/* Visual Gauge Box */}
              <div className="score-gauge-box" style={{ '--score-pct': result.score }}>
                <div className="score-circle">
                  <div className="score-circle-inner">
                    <div className="score-number" style={{ color: result.score > 70 ? '#10B981' : result.score > 40 ? '#F59E0B' : '#EF4444' }}>
                      {result.score}
                    </div>
                    <div className="score-max">/ 100</div>
                  </div>
                </div>

                <div>
                  <div className="score-summary-title">{result.level}</div>
                  <p className="score-summary-desc">{result.summary}</p>
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Revenue Opportunity:</span>
                    <span className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>{result.potential_revenue_boost}</span>
                  </div>
                </div>
              </div>

              {/* Actionable Gap Checklist */}
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Identified Growth Gaps & Action Items:</h3>
              <div className="gap-checklist">
                {result.checklist.map((item, idx) => (
                  <div key={idx} className={`gap-item status-${item.status}`}>
                    <div style={{ fontSize: '1.4rem' }}>
                      {item.status === 'optimal' ? '✅' : '⚠️'}
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <strong style={{ color: '#fff', fontSize: '0.98rem' }}>{item.item}</strong>
                        <span className={`badge ${item.status === 'optimal' ? 'badge-emerald' : 'badge-amber'}`}>
                          {item.impact} Impact
                        </span>
                      </div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommended Solution Card */}
              <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0.9) 100%)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-md)', padding: '1.75rem', margin: '2rem 0' }}>
                <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Recommended Solution</span>
                <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>{result.recommended_tier}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {result.recommended_tier_reason}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/contact" className="btn btn-primary">
                    Fix These Gaps With AMP Ventures →
                  </Link>
                  <a 
                    href={`https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I%20got%20a%20score%20of%20${result.score}/100%20for%20${encodeURIComponent(form.business_name)}%20and%20would%20like%20to%20discuss%20improving%20it.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    💬 Discuss Report on WhatsApp
                  </a>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={() => setResult(null)} 
                  className="btn btn-secondary btn-sm"
                >
                  ← Test Another Business
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
