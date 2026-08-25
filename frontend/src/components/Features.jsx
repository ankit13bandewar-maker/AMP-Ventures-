import React, { useState } from 'react';

export default function Features({ features }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Backend', 'Frontend', 'Styling', 'Architecture', 'DevOps', 'Extensibility'];

  const filteredFeatures = selectedCategory === 'All' 
    ? features 
    : features.filter(f => f.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="features" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>✨</span>
            <span>Core Capabilities</span>
          </div>
          <h2 className="section-title">
            Engineered for <span className="text-gradient">Maximum Performance</span>
          </h2>
          <p className="section-desc">
            A battle-tested architecture combining Python's robust backend processing with React's fluid, interactive interface.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginBottom: '48px'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: selectedCategory === cat 
                  ? 'var(--grad-primary)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)',
                boxShadow: selectedCategory === cat ? '0 4px 15px rgba(99, 102, 241, 0.35)' : 'none'
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredFeatures.map(item => (
            <div 
              key={item.id} 
              className="glass-card" 
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px'
              }}>
              <div>
                {/* Card Top: Icon & Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {item.icon}
                  </div>
                  {item.badge && (
                    <span className={`badge ${
                      item.category === 'Backend' ? 'badge-backend' :
                      item.category === 'Frontend' ? 'badge-frontend' :
                      item.category === 'Styling' ? 'badge-styling' :
                      item.category === 'DevOps' ? 'badge-amber' : 'badge-success'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Card Title & Description */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: '#f8fafc',
                  letterSpacing: '-0.01em'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6
                }}>
                  {item.description}
                </p>
              </div>

              {/* Bottom Tag */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                fontSize: '0.8rem',
                color: 'var(--text-dim)'
              }}>
                <span>Layer: <strong style={{ color: '#cbd5e1' }}>{item.category}</strong></span>
                <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Ready ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
