import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const INITIAL_MESSAGES = [
  {
    role: 'bot',
    content: "👋 Hi there! I'm the **AMP Ventures AI Advisor**. Are you looking to launch a website for your salon, clinic, restaurant, or retail store? Ask me anything about our 3 tiers, pricing, or timelines!"
  }
];

const SUGGESTED_QUESTIONS = [
  "How much does a website cost?",
  "What is included in Tier 2?",
  "How fast can my salon get online?",
  "Do you handle WhatsApp booking?"
];

export default function AiChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = (typeof textToSend === 'string' ? textToSend : input).trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    if (typeof textToSend !== 'string') setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [
          ...prev, 
          { 
            role: 'bot', 
            content: data.reply,
            suggested_actions: data.suggested_actions,
            recommended_tier: data.recommended_tier
          }
        ]);
      } else {
        throw new Error("Chatbot API error");
      }
    } catch (err) {
      // Friendly local fallback logic
      setTimeout(() => {
        let fallbackReply = "AMP Ventures specializes in converting local offline businesses into digital leaders! Our 3 service tiers range from Tier 1 (₹9,999 Basic Static) to Tier 2 (₹24,999 CMS + Reviews) and Tier 3 (₹49,999 3D + WhatsApp Automation).";
        if (text.toLowerCase().includes("cost") || text.toLowerCase().includes("price")) {
          fallbackReply = "Our pricing is transparent:\n• Tier 1 (Basic): ₹9,999\n• Tier 2 (Premium + CMS): ₹24,999\n• Tier 3 (Premium Plus 3D): ₹49,999\nWould you like a custom proposal?";
        } else if (text.toLowerCase().includes("time") || text.toLowerCase().includes("fast")) {
          fallbackReply = "We deliver rapid turnarounds: 5–7 business days for Tier 1, 10–12 days for Tier 2, and 14–18 days for Tier 3 3D & Automation builds.";
        }
        setMessages(prev => [
          ...prev,
          {
            role: 'bot',
            content: fallbackReply,
            suggested_actions: ["Get Custom Quote", "Check Digital Readiness"]
          }
        ]);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.includes("Pricing") || action.includes("Price")) {
      navigate('/pricing');
      setIsOpen(false);
    } else if (action.includes("Readiness") || action.includes("Audit")) {
      navigate('/readiness-score');
      setIsOpen(false);
    } else if (action.includes("Quote") || action.includes("Tier")) {
      navigate('/contact');
      setIsOpen(false);
    } else if (action.includes("WhatsApp")) {
      window.open("https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I%20chatted%20with%20your%20AI%20and%20want%20to%20discuss%20a%20project.", "_blank");
    } else {
      handleSend(action);
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      <button 
        className="floating-btn floating-chatbot" 
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AMP Ventures AI Advisor"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-modal">
          {/* Header */}
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: '#fff' }}>
                ⚡
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>AMP AI Advisor</div>
                <div style={{ fontSize: '0.72rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                  Online • Instant Replies
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
                <div style={{ whiteSpace: 'pre-line' }}>{m.content}</div>
                {m.suggested_actions && m.suggested_actions.length > 0 && (
                  <div className="chat-actions">
                    {m.suggested_actions.map((act, aIdx) => (
                      <button key={aIdx} className="chat-action-pill" onClick={() => handleActionClick(act)}>
                        {act}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble chat-bubble-bot" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AI Advisor is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts if conversation is fresh */}
          {messages.length <= 2 && (
            <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.4rem', overflowX: 'auto', background: 'rgba(15, 23, 42, 0.6)' }}>
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleSend(q)}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Row */}
          <form 
            className="chat-input-row"
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <input 
              type="text" 
              placeholder="Ask about pricing, tiers, or advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flexGrow: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.6rem 0.85rem',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button 
              type="submit" 
              className="btn btn-primary btn-sm"
              disabled={!input.trim() || loading}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
