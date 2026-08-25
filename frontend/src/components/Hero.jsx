import React, { useState } from 'react';

export default function Hero({ healthData, statsData, backendOnline, onPing }) {
  const [activeTab, setActiveTab] = useState('health');
  const [copied, setCopied] = useState(false);

  const displayJson = activeTab === 'health' ? healthData : statsData;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(displayJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="section" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Column: Hero Copy & Actions */}
          <div>
            <div className="section-tag">
              <span style={{ fontSize: '1rem' }}>🚀</span>
              <span>Full-Stack Architecture 2.0</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '24px'
            }}>
              Architected for <span className="text-gradient">Velocity</span>.<br />
              Powered by <span className="text-gradient-cyan">Python & React</span>.
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '540px'
            }}>
              A clean full-stack web application featuring an asynchronous FastAPI Python engine, high-speed Vite + React frontend, RESTful API architecture, and real-time live telemetry.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
              <a href="#features" className="btn btn-primary">
                <span>Explore Capabilities</span>
                <span>→</span>
              </a>
              <a href="#api-tester" className="btn btn-secondary">
                <span>Open API Sandbox</span>
              </a>
              <button 
                onClick={onPing} 
                className="btn btn-outline-cyan"
                title="Send a real HTTP request to FastAPI">
                <span>⚡ Test Live Ping</span>
              </button>
            </div>

            {/* Quick Metrics Strip */}
            <div style={{
              display: 'flex',
              gap: '24px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>
                  {backendOnline ? '< 15ms' : 'Offline'}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>API Response Time</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8' }}>Async</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>FastAPI Engine</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#a855f7' }}>100%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>CORS & Type Safe</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Backend Inspector */}
          <div className="glass-card" style={{ padding: '24px', boxShadow: 'var(--shadow-glow), var(--shadow-lg)' }}>
            {/* Inspector Window Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '14px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', marginLeft: '8px' }}>
                  http://127.0.0.1:8000
                </span>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                {backendOnline ? '200 OK' : 'OFFLINE'}
              </span>
            </div>

            {/* Endpoint Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button
                onClick={() => setActiveTab('health')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeTab === 'health' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeTab === 'health' ? '#a5b4fc' : 'var(--text-dim)',
                  border: activeTab === 'health' ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600
                }}>
                GET /api/health
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: activeTab === 'stats' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeTab === 'stats' ? '#a5b4fc' : 'var(--text-dim)',
                  border: activeTab === 'stats' ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600
                }}>
                GET /api/stats
              </button>
            </div>

            {/* Code Output Viewer */}
            <div style={{ position: 'relative' }}>
              <pre className="code-snippet" style={{ maxHeight: '280px', minHeight: '180px', margin: 0 }}>
                <code>
                  {displayJson ? JSON.stringify(displayJson, null, 2) : '// Connecting to FastAPI server...'}
                </code>
              </pre>
              <button
                onClick={handleCopy}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}>
                {copied ? '✓ Copied' : 'Copy JSON'}
              </button>
            </div>

            {/* Bottom Status bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '16px',
              fontSize: '0.75rem',
              color: 'var(--text-dim)'
            }}>
              <span>Status: <strong style={{ color: backendOnline ? '#34d399' : '#f87171' }}>{backendOnline ? 'Live Connection Active' : 'Waiting for Backend'}</strong></span>
              <span>Format: application/json</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
