import React, { useState } from 'react';
import { getApiUrl } from '../apiConfig';

const PRESETS = [
  {
    name: 'Health Check',
    method: 'GET',
    endpoint: '/api/health',
    body: ''
  },
  {
    name: 'Live Stats',
    method: 'GET',
    endpoint: '/api/stats',
    body: ''
  },
  {
    name: 'All Features',
    method: 'GET',
    endpoint: '/api/features',
    body: ''
  },
  {
    name: 'Filter Features (Backend)',
    method: 'GET',
    endpoint: '/api/features?category=Backend',
    body: ''
  },
  {
    name: 'Message History',
    method: 'GET',
    endpoint: '/api/messages',
    body: ''
  },
  {
    name: 'Post Message (Contact)',
    method: 'POST',
    endpoint: '/api/contact',
    body: JSON.stringify({
      name: "Alex Johnson",
      email: "alex@example.com",
      message: "Testing API sandbox from React client!"
    }, null, 2)
  }
];

export default function ApiTester({ onExecuteRequest }) {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [method, setMethod] = useState(PRESETS[0].method);
  const [endpoint, setEndpoint] = useState(PRESETS[0].endpoint);
  const [requestBody, setRequestBody] = useState(PRESETS[0].body);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [latency, setLatency] = useState(null);

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setMethod(preset.method);
    setEndpoint(preset.endpoint);
    setRequestBody(preset.body);
  };

  const handleRun = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    
    const startTime = performance.now();
    try {
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (method === 'POST' && requestBody.trim()) {
        try {
          // validate json
          JSON.parse(requestBody);
          options.body = requestBody;
        } catch (err) {
          setStatus(400);
          setResponse({ error: 'Invalid JSON in request body: ' + err.message });
          setLoading(false);
          return;
        }
      }

      const res = await fetch(getApiUrl(endpoint), options);
      const data = await res.json();
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);

      setStatus(res.status);
      setLatency(duration);
      setResponse(data);

      if (onExecuteRequest) {
        onExecuteRequest({
          method,
          url: endpoint,
          status: res.status,
          latency: duration,
          time: new Date().toLocaleTimeString()
        });
      }
    } catch (error) {
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      setStatus('ERR');
      setLatency(duration);
      setResponse({
        error: 'Network request failed',
        details: error.message,
        hint: 'Ensure Python FastAPI backend is running on http://127.0.0.1:8000'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="api-tester" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>⚡</span>
            <span>Developer Sandbox</span>
          </div>
          <h2 className="section-title">
            Interactive <span className="text-gradient">API Playground</span>
          </h2>
          <p className="section-desc">
            Test backend REST endpoints directly in real-time. Inspect request payloads, response bodies, status codes, and execution latency.
          </p>
        </div>

        {/* Preset Selector Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(p)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selectedPreset.name === p.name ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedPreset.name === p.name ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: selectedPreset.name === p.name ? '#a5b4fc' : 'var(--text-muted)'
              }}>
              <span style={{ color: p.method === 'POST' ? '#f472b6' : '#38bdf8', marginRight: '6px' }}>{p.method}</span>
              {p.name}
            </button>
          ))}
        </div>

        {/* Playground Grid: Request Builder & Response Inspector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Request Panel */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#f8fafc' }}>
              Request Configuration
            </h3>

            {/* URL Input Bar */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                style={{
                  padding: '10px 14px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: method === 'POST' ? '#f472b6' : '#38bdf8',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  outline: 'none'
                }}>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>

              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="input-field"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                placeholder="/api/health"
              />
            </div>

            {/* Request Body (for POST) */}
            {method === 'POST' && (
              <div style={{ marginBottom: '16px' }}>
                <label className="input-label" style={{ marginBottom: '6px', display: 'block' }}>
                  Request Payload (JSON)
                </label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="input-field"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    minHeight: '140px'
                  }}
                />
              </div>
            )}

            {/* Run Button */}
            <button
              onClick={handleRun}
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}>
              <span>{loading ? 'Executing...' : '⚡ Send Request'}</span>
            </button>
          </div>

          {/* Response Panel */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                Response Output
              </h3>

              {status && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className={`badge ${status === 200 ? 'badge-success' : 'badge-amber'}`}>
                    {status} {status === 200 ? 'OK' : ''}
                  </span>
                  {latency && (
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                      {latency}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            <pre className="code-snippet" style={{ height: '240px', margin: 0 }}>
              <code>
                {loading
                  ? '// Sending HTTP request to FastAPI...'
                  : response
                  ? JSON.stringify(response, null, 2)
                  : '// Click "Send Request" to test endpoint.'}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
