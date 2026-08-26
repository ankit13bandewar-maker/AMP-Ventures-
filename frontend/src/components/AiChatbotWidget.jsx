import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { getApiUrl } from '../apiConfig';

const INITIAL_MESSAGES = [
  {
    role: 'bot',
    content: "Hi there! I'm the **AMP Ventures AI Advisor**. Are you looking to launch a high-converting website for your salon, clinic, restaurant, or retail boutique? Ask me anything about our 3 tiers, pricing, or timelines!"
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
      const response = await fetch(getApiUrl('/api/chatbot'), {
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
            content: data.reply || "I'd be glad to help you pick the best tier for your business.",
            suggested_actions: data.suggested_actions || []
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'bot', 
            content: "I recommend checking our **Tier 2 (₹24,999)** for dynamic CMS or chatting with us directly on WhatsApp (+91 9876543210).",
            suggested_actions: ["Chat on WhatsApp", "Explore Pricing"]
          }
        ]);
      }
    } catch (e) {
      // Local graceful fallback
      let fallbackReply = "Our Tier 1 starts at ₹9,999 (5-7 days), Tier 2 is ₹24,999 with custom CMS (10-12 days), and Tier 3 is ₹49,999 with 3D WebGL and AI automations. Would you like a custom quote?";
      if (text.toLowerCase().includes("cost") || text.toLowerCase().includes("price") || text.toLowerCase().includes("tier")) {
        fallbackReply = "Tier 1: ₹9,999 (4-6 pages static)\nTier 2: ₹24,999 (Custom CMS + Google Reviews)\nTier 3: ₹49,999 (3D WebGL + AI Chatbot + WhatsApp API)\n\nAll packages include 100% code ownership.";
      }
      setMessages(prev => [
        ...prev, 
        { 
          role: 'bot', 
          content: fallbackReply,
          suggested_actions: ["Explore Pricing", "Request Quote", "Chat on WhatsApp"]
        }
      ]);
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
        className="floating-btn floating-chatbot bg-gradient-to-br from-indigo-600 via-primary to-indigo-700 text-white shadow-xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all duration-200" 
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AMP Ventures AI Advisor"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white drop-shadow" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-lime-accent rounded-full border-2 border-indigo-700"></span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-modal bg-[#0e1118]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl rounded-2xl">
          {/* Header */}
          <div className="chat-header p-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">AMP AI Advisor</div>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  Online • Instant Consultation
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="chat-messages-container p-4 space-y-3 max-h-[350px] overflow-y-auto">
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-bubble ${m.role === 'user' ? 'chat-bubble-user bg-indigo-600 text-white ml-auto' : 'chat-bubble-bot bg-[#151a26] text-slate-200 border border-white/[0.08]'}`}>
                <div className="text-xs leading-relaxed whitespace-pre-line">{m.content}</div>
                {m.suggested_actions && m.suggested_actions.length > 0 && (
                  <div className="chat-actions mt-2.5 flex flex-wrap gap-1.5">
                    {m.suggested_actions.map((act, aIdx) => (
                      <button 
                        key={aIdx} 
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 border border-white/[0.1] transition-all" 
                        onClick={() => handleActionClick(act)}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble chat-bubble-bot bg-[#151a26] text-slate-400 text-xs flex items-center gap-2 border border-white/[0.08]">
                <span>AI Advisor is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts if conversation is fresh */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 flex gap-1.5 overflow-x-auto bg-[#0a0d14]/70 border-t border-white/[0.05]">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleSend(q)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-slate-400 hover:text-white whitespace-nowrap transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Row */}
          <form 
            className="chat-input-row p-3 border-t border-white/[0.08] flex items-center gap-2 bg-[#0e1118]"
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <input 
              type="text" 
              placeholder="Ask about pricing, tiers, or advice..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button 
              type="submit" 
              className="p-2 rounded-xl bg-lime-accent text-slate-950 hover:bg-lime-400 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!input.trim() || loading}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
