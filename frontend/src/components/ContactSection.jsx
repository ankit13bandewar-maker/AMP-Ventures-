import React, { useState } from 'react';

export default function ContactSection({ messages, onMessageSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFeedback({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          type: 'success',
          text: data.message || 'Message received by Python FastAPI backend!'
        });
        setFormData({ name: '', email: '', message: '' });
        if (onMessageSubmitted) {
          onMessageSubmitted(data.data);
        }
      } else {
        setFeedback({
          type: 'error',
          text: data.detail ? JSON.stringify(data.detail) : 'Failed to submit message.'
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        text: 'Network error: could not reach backend API.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>💬</span>
            <span>Live Data Sync</span>
          </div>
          <h2 className="section-title">
            Send a <span className="text-gradient">Real-Time Message</span>
          </h2>
          <p className="section-desc">
            Submit a message through React. It is validated and processed asynchronously by the Python FastAPI backend, persisting in server memory.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'flex-start'
        }}>
          {/* Form Card */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: '#f8fafc' }}>
              Submit New Message
            </h3>

            {feedback && (
              <div style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
                fontSize: '0.875rem',
                background: feedback.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                border: feedback.type === 'success' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
                color: feedback.type === 'success' ? '#34d399' : '#fb7185'
              }}>
                {feedback.type === 'success' ? '✓ ' : '⚠ '} {feedback.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Message Payload</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Type your message here..."
                  className="input-field"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}>
                <span>{submitting ? 'Submitting to Backend...' : '🚀 Post to FastAPI Backend'}</span>
              </button>
            </form>
          </div>

          {/* Live Message Stream Card */}
          <div className="glass-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
                  Live Message Feed
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  State retrieved dynamically via <code>GET /api/messages</code>
                </p>
              </div>
              <span className="badge badge-frontend">
                {messages ? messages.length : 0} Messages
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '360px',
              overflowY: 'auto',
              paddingRight: '4px'
            }}>
              {(!messages || messages.length === 0) ? (
                <div style={{
                  padding: '36px 20px',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-dim)',
                  fontSize: '0.9rem'
                }}>
                  No messages submitted yet. Use the form on the left to send the first message!
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={msg.id || i}
                    style={{
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc' }}>
                        {msg.name}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                        {msg.created_at ? new Date(msg.created_at).toLocaleTimeString() : 'Just now'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#818cf8', marginBottom: '8px' }}>
                      {msg.email}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
