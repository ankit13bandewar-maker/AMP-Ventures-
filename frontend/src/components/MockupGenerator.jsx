import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApiUrl } from '../apiConfig';

const INDUSTRIES = [
  { id: 'salon', label: '✂️ Salon & Luxury Spa', defaultName: 'Luxe Glow Unisex Salon' },
  { id: 'restaurant', label: '🍽️ Restaurant & Cafe', defaultName: 'Saffron Hearth Bistro' },
  { id: 'clinic', label: '🩺 Clinic & Diagnostics', defaultName: 'Apex Health & Diagnostics' },
  { id: 'retail', label: '🛍️ Boutique & Retail Store', defaultName: 'Velvet Thread Studio' }
];

const THEMES = [
  { id: 'indigo', name: 'Cyber Indigo', color: '#6366F1' },
  { id: 'emerald', name: 'Neon Emerald', color: '#10B981' },
  { id: 'gold', name: 'Luxury Amber', color: '#F59E0B' },
  { id: 'cyan', name: 'Electric Cyan', color: '#06B6D4' },
  { id: 'rose', name: 'Crimson Rose', color: '#F43F5E' }
];

const FALLBACK_TEMPLATES = {
  salon: {
    tagline: 'Luxury Unisex Salon & Wellness Spa',
    hero_headline: 'Elevate Your Style & Radiance',
    hero_subheadline: 'Master stylist haircuts, bespoke bridal makeovers, and rejuvenating therapeutic spas.',
    hero_image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80',
    cta_text: 'Book Slot on WhatsApp',
    services: [
      {
        title: 'Signature Hair Styling & Spa',
        price: '₹1,499',
        desc: 'Customized cut, keratin wash & blowout with senior stylist',
        badge: 'Popular',
        image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Organic Glow Skin Facial',
        price: '₹2,199',
        desc: 'Deep ultrasonic pore cleansing with 24K gold serum',
        badge: 'Trending',
        image_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Bridal & HD Glam Makeover',
        price: '₹4,999',
        desc: 'Complete airbrush session with hair setup & draping',
        badge: 'VIP',
        image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [
      {
        author: 'Ananya Sharma',
        rating: 5,
        text: 'Booked my haircut online in 20 seconds. Zero wait time and exceptional service!',
        time_ago: '2 days ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  restaurant: {
    tagline: 'Artisanal Woodfired Kitchen & Craft Cafe',
    hero_headline: 'Savor Extraordinary Gourmet Dining',
    hero_subheadline: 'Farm-to-fork ingredients, authentic woodfired recipes, and unforgettable handcrafted cocktails.',
    hero_image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    cta_text: 'Reserve Table Online',
    services: [
      {
        title: "Chef's Truffle Platter",
        price: '₹899',
        desc: 'Truffle butter infused specialties with fresh sourdough',
        badge: 'Chef Special',
        image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Neapolitan Wood-Fired Pizza',
        price: '₹649',
        desc: 'Slow-fermented crust with San Marzano tomatoes & burrata',
        badge: 'Bestseller',
        image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Artisanal Mocktail & Dessert',
        price: '₹499',
        desc: 'Smoked botanical fizz paired with warm Belgian lava cake',
        badge: 'Must Try',
        image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [
      {
        author: 'Vikram Sethi',
        rating: 5,
        text: 'Instant online reservation booked us prime window seats. Food was phenomenal!',
        time_ago: 'Yesterday',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  clinic: {
    tagline: 'Advanced Multispecialty Clinic & Care',
    hero_headline: 'Exceptional Patient Care & Diagnostics',
    hero_subheadline: 'Senior board-certified physicians, zero-queue appointments, and same-day digital lab reports.',
    hero_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    cta_text: 'Book Doctor Consultation',
    services: [
      {
        title: 'Full Body Health Screening',
        price: '₹1,999',
        desc: '65+ vital parameters, doctor review & digital report in 4 hrs',
        badge: 'Essential',
        image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Senior Specialist Consultation',
        price: '₹799',
        desc: 'One-on-one clinical assessment with department chief',
        badge: 'Verified',
        image_url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Rapid Diagnostics & Labs',
        price: '₹1,299',
        desc: 'Automated digital test results delivered via WhatsApp',
        badge: 'Fast',
        image_url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [
      {
        author: 'Dr. Sunil Gupta',
        rating: 5,
        text: 'Very organized clinic. WhatsApp appointment updates made our visit completely seamless.',
        time_ago: '4 days ago',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
      }
    ]
  },
  retail: {
    tagline: 'Curated Designer Apparel & Boutique Studio',
    hero_headline: 'Discover Signature Handcrafted Fashion',
    hero_subheadline: 'Exclusive artisanal collections, bespoke tailor fittings, and express same-day doorstep deliveries.',
    hero_image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    cta_text: 'Shop on WhatsApp',
    services: [
      {
        title: 'Handcrafted Silk & Festive Wear',
        price: '₹2,499',
        desc: 'Artisan woven pure textiles with modern silhouette cuts',
        badge: 'New Arrival',
        image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: '925 Silver Fine Jewelry',
        price: '₹1,899',
        desc: 'Hallmarked jewelry with natural semi-precious gemstones',
        badge: 'Trending',
        image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
      },
      {
        title: 'Custom Bespoke Tailoring',
        price: '₹999',
        desc: 'Personalized 3D fitting session with senior fashion stylist',
        badge: 'Custom',
        image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'
      }
    ],
    reviews: [
      {
        author: 'Sneha Patil',
        rating: 5,
        text: 'Ordered straight from their digital catalog with instant WhatsApp confirmation. Love it!',
        time_ago: '3 days ago',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80'
      }
    ]
  }
};

export default function MockupGenerator() {
  const [businessName, setBusinessName] = useState('Saffron Hearth Bistro');
  const [city, setCity] = useState('Bengaluru');
  const [industry, setIndustry] = useState('restaurant');
  const [themeColor, setThemeColor] = useState('#F59E0B');
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [simulationToast, setSimulationToast] = useState(null);

  // Trigger simulated interactive action toast
  const triggerSimulation = (actionName) => {
    setSimulationToast(`⚡ Live Simulation Triggered: "${actionName}" for ${businessName || 'Business'}`);
    setTimeout(() => setSimulationToast(null), 4000);
  };

  useEffect(() => {
    const updatePreview = async () => {
      setLoading(true);
      try {
        const res = await fetch(getApiUrl('/api/generate-mockup'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            business_name: businessName || 'Your Business',
            city: city || 'Your City',
            industry: industry,
            theme_color: themeColor
          })
        });

        if (res && res.ok) {
          const data = await res.json();
          setPreviewData(data);
        } else {
          throw new Error('API unavailable, using fallback');
        }
      } catch {
        // Fallback local template
        const t = FALLBACK_TEMPLATES[industry] || FALLBACK_TEMPLATES.restaurant;
        setPreviewData({
          business_name: businessName || 'Your Business',
          city: city || 'Your City',
          industry: industry.charAt(0).toUpperCase() + industry.slice(1),
          tagline: t.tagline,
          hero_headline: `${t.hero_headline} at ${businessName || 'Your Business'}`,
          hero_subheadline: `${t.hero_subheadline} in the heart of ${city || 'your city'}.`,
          hero_image: t.hero_image,
          accent_color: themeColor,
          services: t.services,
          reviews: t.reviews,
          cta_text: t.cta_text,
          booking_phone: '+91 98765 43210',
          rating: 4.9,
          review_count: '450+ Verified Reviews',
          address: `100ft Road, Prime High Street, ${city || 'Bengaluru'}`
        });
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(updatePreview, 200);
    return () => clearTimeout(debounceTimer);
  }, [businessName, city, industry, themeColor]);

  const handleIndustryChange = (indId) => {
    setIndustry(indId);
    const item = INDUSTRIES.find(i => i.id === indId);
    if (item) {
      setBusinessName(item.defaultName);
      if (indId === 'salon') setThemeColor('#6366F1');
      else if (indId === 'restaurant') setThemeColor('#F59E0B');
      else if (indId === 'clinic') setThemeColor('#06B6D4');
      else if (indId === 'retail') setThemeColor('#F43F5E');
    }
  };

  const domainSlug = (businessName || 'mybusiness')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 18);

  return (
    <div className="mockup-generator-section" style={{ position: 'relative' }}>
      <div className="section-header">
        <div className="section-tag">Instant AI Storefront Engine</div>
        <h2 className="section-title">
          Live Interactive <span className="text-gradient">Website Simulation</span>
        </h2>
        <p className="section-subtitle">
          Customize your business details below and test the interactive booking simulation in real time.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Column: Interactive Customizer Controls */}
        <div className="glass-card" style={{ padding: '1.75rem', position: 'sticky', top: '90px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>⚡ Storefront Customizer</h3>
            {loading && <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>Updating...</span>}
          </div>

          {/* 1. Industry Selector */}
          <div className="form-group" style={{ marginBottom: '1.1rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>1. Choose Business Industry</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => handleIndustryChange(ind.id)}
                  className={`filter-btn ${industry === ind.id ? 'active' : ''}`}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.55rem 0.6rem',
                    textAlign: 'center',
                    height: 'auto',
                    borderColor: industry === ind.id ? themeColor : 'rgba(255,255,255,0.1)'
                  }}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Business Name */}
          <div className="form-group" style={{ marginBottom: '1.1rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>2. Business / Brand Name</label>
            <input
              type="text"
              className="form-input"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g. Saffron Hearth Bistro"
              style={{ fontSize: '0.9rem', padding: '0.65rem 0.85rem' }}
            />
          </div>

          {/* 3. City */}
          <div className="form-group" style={{ marginBottom: '1.1rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>3. City / Neighborhood</label>
            <input
              type="text"
              className="form-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Bengaluru, Mumbai, Delhi"
              style={{ fontSize: '0.9rem', padding: '0.65rem 0.85rem' }}
            />
          </div>

          {/* 4. Brand Accent Color */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ fontSize: '0.85rem' }}>4. Brand Theme Accent</label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setThemeColor(theme.color)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: theme.color,
                    border: themeColor === theme.color ? '3px solid #ffffff' : '2px solid transparent',
                    cursor: 'pointer',
                    boxShadow: themeColor === theme.color ? `0 0 14px ${theme.color}` : 'none',
                    transform: themeColor === theme.color ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.2s ease'
                  }}
                  title={theme.name}
                />
              ))}
            </div>
          </div>

          {/* CTA Conversion Box */}
          <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link
              to={`/contact?tier=tier2&business=${encodeURIComponent(businessName)}`}
              className="btn btn-primary"
              style={{
                width: '100%',
                marginBottom: '0.75rem',
                background: `linear-gradient(135deg, ${themeColor} 0%, #4338CA 100%)`,
                boxShadow: `0 8px 20px ${themeColor}44`
              }}
            >
              🚀 Launch This Website in 5 Days →
            </Link>
            <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ⚡ Includes Google Business Map Link + WhatsApp Ordering + CMS
            </div>
          </div>
        </div>

        {/* Right Column: High-Fidelity Simulated Device Frame */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          {/* Device Mockup Wrapper */}
          <div
            className="device-mockup-frame"
            style={{
              width: '100%',
              maxWidth: viewMode === 'mobile' ? '380px' : '100%',
              background: '#0B0F19',
              borderRadius: '20px',
              border: `1.5px solid rgba(255, 255, 255, 0.15)`,
              boxShadow: `0 25px 60px rgba(0,0,0,0.85), 0 0 40px ${themeColor}22`,
              overflow: 'hidden',
              transition: 'max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative'
            }}
          >
            {/* Simulated Browser Chrome Topbar */}
            <div
              style={{
                background: '#111827',
                padding: '0.75rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Traffic Lights */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
              </div>

              {/* Simulated Address Bar */}
              <div
                style={{
                  flexGrow: 1,
                  background: '#070B12',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '30px',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontFamily: 'var(--font-mono)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ color: '#10B981', fontSize: '0.75rem' }}>🔒</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>https://www.{domainSlug || 'business'}.in</span>
              </div>

              {/* Viewport Switcher Buttons */}
              <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '2px', borderRadius: '8px' }}>
                <button
                  type="button"
                  onClick={() => setViewMode('desktop')}
                  style={{
                    background: viewMode === 'desktop' ? themeColor : 'transparent',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 7px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                  title="Desktop View"
                >
                  💻
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mobile')}
                  style={{
                    background: viewMode === 'mobile' ? themeColor : 'transparent',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '3px 7px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                  title="Mobile View"
                >
                  📱
                </button>
              </div>
            </div>

            {/* Interactive Toast Banner */}
            {simulationToast && (
              <div
                style={{
                  position: 'absolute',
                  top: '55px',
                  left: '15px',
                  right: '15px',
                  zIndex: 99,
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#fff',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
                  animation: 'fadeIn 0.3s ease-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{simulationToast}</span>
                <button
                  onClick={() => setSimulationToast(null)}
                  style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}
                >
                  ×
                </button>
              </div>
            )}

            {/* Simulated Live Website Content Canvas */}
            {previewData && (
              <div
                style={{
                  background: '#080C16',
                  color: '#F8FAFC',
                  padding: viewMode === 'mobile' ? '1rem' : '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  fontFamily: 'var(--font-sans)',
                  maxHeight: '620px',
                  overflowY: 'auto'
                }}
              >
                {/* 1. Header Navigation Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: `linear-gradient(135deg, ${themeColor} 0%, #4338CA 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 900,
                        fontSize: '0.95rem',
                        boxShadow: `0 0 10px ${themeColor}66`
                      }}
                    >
                      ⚡
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff', lineHeight: 1.1 }}>
                        {previewData.business_name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        📍 {previewData.city} • Open Now
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {viewMode === 'desktop' && (
                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        <span>Menu & Rates</span>
                        <span>Reviews</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => triggerSimulation('Instant WhatsApp Inquiry')}
                      style={{
                        background: themeColor,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '0.35rem 0.85rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: `0 0 12px ${themeColor}55`
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                {/* 2. Hero Section with Media & CTAs */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${themeColor}18 0%, rgba(15,23,42,0.85) 100%)`,
                    borderRadius: '16px',
                    border: `1px solid ${themeColor}33`,
                    padding: viewMode === 'mobile' ? '1rem' : '1.35rem',
                    display: 'grid',
                    gridTemplateColumns: viewMode === 'mobile' ? '1fr' : '1.1fr 0.9fr',
                    gap: '1.25rem',
                    alignItems: 'center'
                  }}
                >
                  {/* Left Hero Details */}
                  <div>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: `${themeColor}22`,
                        border: `1px solid ${themeColor}44`,
                        color: themeColor,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        marginBottom: '0.6rem'
                      }}
                    >
                      <span>✨</span> {previewData.tagline}
                    </div>

                    <h4
                      style={{
                        fontSize: viewMode === 'mobile' ? '1.15rem' : '1.35rem',
                        color: '#fff',
                        fontWeight: 800,
                        marginBottom: '0.45rem',
                        lineHeight: 1.25
                      }}
                    >
                      {previewData.hero_headline}
                    </h4>

                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.45,
                        marginBottom: '1rem'
                      }}
                    >
                      {previewData.hero_subheadline}
                    </p>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => triggerSimulation(`WhatsApp Direct Booking: "${previewData.cta_text}"`)}
                        style={{
                          background: '#25D366',
                          color: '#fff',
                          border: 'none',
                          padding: '0.45rem 0.9rem',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)'
                        }}
                      >
                        <span>💬</span> {previewData.cta_text}
                      </button>

                      <button
                        type="button"
                        onClick={() => triggerSimulation('Google Maps Location Direction Click')}
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          color: '#fff',
                          border: '1px solid rgba(255,255,255,0.15)',
                          padding: '0.45rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        📍 Directions
                      </button>
                    </div>
                  </div>

                  {/* Right Hero Image Card */}
                  <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: viewMode === 'mobile' ? '150px' : '170px' }}>
                    <img
                      src={previewData.hero_image}
                      alt={previewData.business_name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.9)'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        right: '8px',
                        background: 'rgba(11, 15, 25, 0.85)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', color: '#F59E0B', fontWeight: 800 }}>
                        ★ 4.9 <span style={{ color: '#fff', fontWeight: 500, fontSize: '0.65rem' }}>({previewData.review_count})</span>
                      </div>
                      <span style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 600 }}>
                        ● Google Maps Sync
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Featured Offerings & Services Grid */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      🔥 Popular Offerings & Instant Booking
                    </span>
                    <span style={{ fontSize: '0.7rem', color: themeColor, fontWeight: 600, cursor: 'pointer' }} onClick={() => triggerSimulation('View Full Catalog')}>
                      View All →
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {previewData.services.map((svc, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.07)',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.2s ease, border-color 0.2s ease'
                        }}
                      >
                        {/* Service Thumbnail Photo */}
                        {svc.image_url && (
                          <div style={{ height: '90px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                            <img
                              src={svc.image_url}
                              alt={svc.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {svc.badge && (
                              <span
                                style={{
                                  position: 'absolute',
                                  top: '6px',
                                  right: '6px',
                                  background: themeColor,
                                  color: '#fff',
                                  fontSize: '0.62rem',
                                  fontWeight: 800,
                                  padding: '2px 6px',
                                  borderRadius: '6px',
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.5)'
                                }}
                              >
                                {svc.badge}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Service Body */}
                        <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                              {svc.title}
                            </div>
                          </div>

                          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.35, marginBottom: '0.65rem', flexGrow: 1 }}>
                            {svc.desc}
                          </div>

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: '0.88rem', fontWeight: 900, color: themeColor }}>
                              {svc.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => triggerSimulation(`Booked: ${svc.title} (${svc.price})`)}
                              style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '6px',
                                padding: '3px 8px',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              + Book
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Live Google Reviews Social Proof Card */}
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    flexDirection: viewMode === 'mobile' ? 'column' : 'row',
                    alignItems: viewMode === 'mobile' ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {previewData.reviews && previewData.reviews[0]?.avatar && (
                      <img
                        src={previewData.reviews[0].avatar}
                        alt="Reviewer"
                        style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #10B981' }}
                      />
                    )}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ color: '#F59E0B', fontSize: '0.75rem' }}>★★★★★</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>
                          {previewData.reviews && previewData.reviews[0]?.author}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 600 }}>✓ Verified Google Review</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>
                        "{previewData.reviews && previewData.reviews[0]?.text}"
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerSimulation('Google Reviews Modal Opened')}
                    style={{
                      background: 'rgba(16,185,129,0.15)',
                      color: '#10B981',
                      border: '1px solid rgba(16,185,129,0.3)',
                      borderRadius: '8px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    View 450+ Reviews →
                  </button>
                </div>

              </div>
            )}
          </div>

          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            <span>💡 <em>Click any button inside the preview to test interactive simulation</em></span>
          </div>
        </div>

      </div>
    </div>
  );
}
