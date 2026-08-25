import React, { useState } from 'react';

export default function Telemetry({ statsData, backendOnline, latency, logs, onPing }) {
  const [pinging, setPinging] = useState(false);

  const handlePingClick = async () => {
    setPinging(true);
    await onPing();
    setTimeout(() => setPinging(false), 300);
  };

  return (
    <section id="telemetry" className="section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.4) 50%, transparent 100%)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>📊</span>
            <span>Live Health Telemetry</span>
          </div>
          <h2 className="section-title">
            Real-Time <span className="text-gradient-cyan">System Observability</span>
          </h2>
          <p className="section-desc">
            Monitor API round-trip latency, backend server health, active routes, and client-server request streaming.
          </p>
        </div>

        {/* Telemetry Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Card 1: Latency */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>API Latency</span>
              <span className="badge badge-success">Live Ping</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span>{backendOnline ? (latency || 12) : '--'}</span>
              <span style={{ fontSize: '1rem', color: 'var(--text-dim)', fontWeight: 600 }}>ms</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '8px' }}>
              Round-trip from React client to FastAPI server
            </p>
          </div>

          {/* Card 2: Backend Engine */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Backend Engine</span>
              <span className="badge badge-backend">FastAPI</span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Python 3.14
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '8px' }}>
              Asynchronous ASGI server powered by Uvicorn
            </p>
          </div>

          {/* Card 3: Status */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Operational Status</span>
              <span className={`pulse-dot ${backendOnline ? 'online' : 'offline'}`} />
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: backendOnline ? '#34d399' : '#fb7185', letterSpacing: '-0.02em' }}>
              {backendOnline ? '100% Healthy' : 'Disconnected'}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '8px' }}>
              {backendOnline ? 'Accepting REST API requests' : 'Server not responding'}
            </p>
          </div>

          {/* Card 4: Total Messages */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Messages Handled</span>
              <span className="badge badge-styling">Stateful</span>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f472b6', letterSpacing: '-0.02em' }}>
              {statsData ? statsData.messages_received : 0}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '8px' }}>
              Processed in FastAPI runtime memory
            </p>
          </div>
        </div>

        {/* Live Request Stream & Controls */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                Live Request Logs & Telemetry Stream
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Real-time record of all HTTP transactions between Frontend & Backend
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handlePingClick}
                disabled={pinging}
                className="btn btn-primary"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                <span>{pinging ? 'Pinging...' : '⚡ Trigger Ping'}</span>
              </button>
            </div>
          </div>

          {/* Log Table / List */}
          <div style={{
            maxHeight: '260px',
            overflowY: 'auto',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(11, 15, 25, 0.7)'
          }}>
            {logs.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                No requests sent yet. Click "Trigger Ping" or test endpoints below.
              </div>
            ) : (
              logs.map((log, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    borderBottom: idx !== logs.length - 1 ? '1px solid rgba(255, 255, 255, 0.04)' : 'none',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: log.method === 'POST' ? 'rgba(236, 72, 153, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                      color: log.method === 'POST' ? '#f472b6' : '#818cf8'
                    }}>
                      {log.method}
                    </span>
                    <span style={{ color: '#e2e8f0' }}>{log.url}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: log.status < 300 ? '#34d399' : '#f87171', fontWeight: 600 }}>
                      {log.status} {log.status === 200 ? 'OK' : ''}
                    </span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      {log.latency}ms
                    </span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                      {log.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
