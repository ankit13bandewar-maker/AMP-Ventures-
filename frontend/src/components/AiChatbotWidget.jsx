import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, Mic, MicOff, RotateCcw, MessageSquare, ArrowUpRight, Volume2, Sparkles } from 'lucide-react';
import { getApiUrl, getWhatsAppUrl } from '../apiConfig';

const INITIAL_MESSAGES = [
  {
    role: 'bot',
    content: "Hi! I'm the **AMP Ventures AI Advisor** 🚀\n\nI can help you select the ideal tier for your offline business (Salon, Clinic, Restaurant, Retail), compare package pricing, or estimate deployment timelines. What would you like to explore?",
    suggested_actions: ["Explore Tiers & Pricing", "Take Free Digital Audit", "WhatsApp Us", "How fast can we launch?"]
  }
];

const SUGGESTED_QUESTIONS = [
  "How much does Tier 2 cost?",
  "What's included in Tier 3 (3D + AI)?",
  "How fast can my salon get online?",
  "Do you provide WhatsApp booking?",
  "Can you sync Google Maps & Reviews?"
];

export default function AiChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState('hi-IN'); // 'hi-IN' (Hindi/Hinglish) or 'en-IN' (English)
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voiceToast, setVoiceToast] = useState('');
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const transcriptRef = useRef('');
  const navigate = useNavigate();

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = voiceLang;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        transcriptRef.current = '';
        const langLabel = voiceLang === 'hi-IN' ? 'हिंदी / Hinglish' : 'English';
        setVoiceToast(`सुन रहे हैं... बोलिए 🎙️ (${langLabel})`);
      };

      recognition.onresult = (event) => {
        let fullTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
          fullTranscript += event.results[i][0].transcript;
        }

        fullTranscript = fullTranscript.trim();
        if (fullTranscript) {
          transcriptRef.current = fullTranscript;
          setInput(fullTranscript);

          // Auto-send when user stops speaking for 1.3 seconds
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            const speechText = transcriptRef.current?.trim();
            if (speechText) {
              try {
                recognition.stop();
              } catch (e) {
                // Ignore stop errors
              }
              setIsListening(false);
              setVoiceToast(voiceLang === 'hi-IN' ? 'प्रश्न भेज रहे हैं... ⚡' : 'Sending your query... ⚡');
              setTimeout(() => setVoiceToast(''), 1500);
              handleSend(speechText);
              transcriptRef.current = '';
            }
          }, 1300);
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'no-speech') return;
        console.warn('Speech recognition warning:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceToast('Microphone access blocked. Please enable mic in browser.');
        } else {
          setVoiceToast('Voice recognition paused. Click mic to retry.');
        }
        setTimeout(() => setVoiceToast(''), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        const speechText = transcriptRef.current?.trim();
        if (speechText) {
          transcriptRef.current = '';
          handleSend(speechText);
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn("Speech recognition initialization error:", err);
      setSpeechSupported(false);
    }

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
    };
  }, [voiceLang]);

  const toggleSpeechRecognition = () => {
    if (!speechSupported || !recognitionRef.current) {
      setVoiceToast('Voice input is not supported in this browser.');
      setTimeout(() => setVoiceToast(''), 3000);
      return;
    }

    if (isListening) {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      try {
        recognitionRef.current.stop();
      } catch (err) {}
      setIsListening(false);
      const text = transcriptRef.current?.trim() || input.trim();
      if (text) {
        transcriptRef.current = '';
        handleSend(text);
      }
    } else {
      try {
        transcriptRef.current = '';
        recognitionRef.current.lang = voiceLang;
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Speech start:", err);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = (typeof textToSend === 'string' ? textToSend : input).trim();
    if (!text || loading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

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
            suggested_actions: data.suggested_actions || ["Explore Pricing", "Chat on WhatsApp"]
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            role: 'bot', 
            content: "We provide 3 tiers tailored for offline businesses:\n• **Tier 1 (₹9,999)**: 5-Day Launch\n• **Tier 2 (₹24,999)**: CMS + Reviews\n• **Tier 3 (₹49,999)**: 3D WebGL + AI + WhatsApp API\n\nWould you like to speak directly with our Technical Architect on WhatsApp?",
            suggested_actions: ["Chat on WhatsApp", "Explore Pricing", "Take Free Audit"]
          }
        ]);
      }
    } catch (e) {
      // Local fallback logic
      let fallbackReply = "Our Tier 1 starts at ₹9,999 (5-7 days), Tier 2 is ₹24,999 with custom CMS (10-12 days), and Tier 3 is ₹49,999 with 3D WebGL and AI automations. Would you like a personalized quote?";
      if (text.toLowerCase().includes("cost") || text.toLowerCase().includes("price") || text.toLowerCase().includes("tier")) {
        fallbackReply = "• **Tier 1 — Basic**: ₹9,999 (Fast 5-Day Setup)\n• **Tier 2 — Premium**: ₹24,999 (Dynamic CMS + Google Maps + Reviews)\n• **Tier 3 — Premium Plus**: ₹49,999 (3D Interactive WebGL + AI Agent + WhatsApp API)\n\nAll tiers come with 100% full source code ownership.";
      } else if (text.toLowerCase().includes("salon") || text.toLowerCase().includes("clinic") || text.toLowerCase().includes("restaurant")) {
        fallbackReply = "For offline salons, clinics, and restaurants, we recommend **Tier 2 (₹24,999)** or **Tier 3 (₹49,999)**. They include 1-click WhatsApp appointment/table booking, automated confirmation reminders, and local SEO dominance.";
      }
      setMessages(prev => [
        ...prev, 
        { 
          role: 'bot', 
          content: fallbackReply,
          suggested_actions: ["Explore Pricing", "Take Free Audit", "Chat on WhatsApp"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.includes("Pricing") || action.includes("Price") || action.includes("Tiers")) {
      navigate('/pricing');
      setIsOpen(false);
    } else if (action.includes("Audit") || action.includes("Diagnostic") || action.includes("Readiness")) {
      navigate('/readiness-score');
      setIsOpen(false);
    } else if (action.includes("Quote") || action.includes("Project") || action.includes("Contact")) {
      navigate('/contact');
      setIsOpen(false);
    } else if (action.includes("WhatsApp")) {
      window.open(getWhatsAppUrl("Hi AMP Ventures, I'd like to consult about a website for my business."), "_blank");
    } else {
      handleSend(action);
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
  };

  // Simple Markdown renderer for **bold** and bullet points
  const formatBotMessage = (content) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      // Parse bold segments **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <span key={lIdx} className="block leading-relaxed">
          {formattedParts}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        className="floating-btn floating-chatbot text-white" 
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with AMP Studio Advisor"
        aria-label="Toggle Studio Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white drop-shadow fill-white/10" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-lime-accent rounded-full border-2 border-[#08090d] animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Modern AI Chatbot Modal */}
      {isOpen && (
        <div className="chatbot-modal">
          
          {/* Header */}
          <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-indigo-950/60 via-[#0e1118] to-[#121622]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-lime-accent/80 p-[1.5px] shadow-md shadow-indigo-500/20">
                  <div className="w-full h-full rounded-[10px] bg-[#0c0f17] flex items-center justify-center text-lime-accent">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0e1118]"></span>
              </div>
              
              <div>
                <div className="text-sm font-extrabold text-white flex items-center gap-1.5">
                  <span>AMP Project Advisor</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">Live</span>
                </div>
                <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Instant Pricing & Technical Guide
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                title="Close Advisor"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voice Toast Alert Bar */}
          {voiceToast && (
            <div className={`px-4 py-2 text-xs flex items-center justify-between transition-all ${
              isListening ? 'bg-red-500/20 border-b border-red-500/30 text-red-300' : 'bg-indigo-500/20 border-b border-indigo-500/30 text-indigo-200'
            }`}>
              <div className="flex items-center gap-2">
                {isListening ? (
                  <div className="flex items-center gap-1">
                    <span className="speech-wave-bar" style={{ animationDelay: '0s' }}></span>
                    <span className="speech-wave-bar" style={{ animationDelay: '0.2s' }}></span>
                    <span className="speech-wave-bar" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span className="font-medium">{voiceToast}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVoiceLang(prev => prev === 'hi-IN' ? 'en-IN' : 'hi-IN')}
                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white transition-all"
                  title="Switch Voice Language"
                >
                  {voiceLang === 'hi-IN' ? '🇮🇳 हिंदी' : '🌐 Eng'}
                </button>
                {isListening && (
                  <button 
                    onClick={toggleSpeechRecognition}
                    className="text-[10px] uppercase font-bold text-red-400 underline"
                  >
                    Send Now
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Scrollable Messages Area */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5 custom-chat-scrollbar bg-[#080a0f]/60">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs shadow-md transition-all ${
                    m.role === 'user' 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-xs shadow-indigo-600/20' 
                      : 'bg-[#121622] text-slate-200 border border-white/[0.08] rounded-bl-xs shadow-black/40'
                  }`}
                >
                  <div className="leading-relaxed">
                    {m.role === 'bot' ? formatBotMessage(m.content) : m.content}
                  </div>

                  {/* Interactive Action Chips */}
                  {m.suggested_actions && m.suggested_actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex flex-wrap gap-1.5">
                      {m.suggested_actions.map((act, aIdx) => (
                        <button 
                          key={aIdx} 
                          className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] hover:bg-lime-accent hover:text-slate-950 text-slate-200 border border-white/[0.08] flex items-center gap-1 font-medium transition-all" 
                          onClick={() => handleActionClick(act)}
                        >
                          <span>{act}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-70" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start">
                <div className="bg-[#121622] text-slate-400 text-xs px-4 py-3 rounded-2xl rounded-bl-xs border border-white/[0.08] flex items-center gap-2">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                  <span className="text-[11px]">AI Advisor analyzing request...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel Bar */}
          {messages.length <= 3 && (
            <div className="px-3.5 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar bg-[#0b0e16] border-t border-white/[0.06]">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">
                Suggestions:
              </span>
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleSend(q)}
                  className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 hover:text-white whitespace-nowrap transition-all flex-shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Row with Speech-To-Text Mic & Language Toggle */}
          <form 
            className="p-3 border-t border-white/[0.08] flex items-center gap-2 bg-[#0e1118]"
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            {/* Microphone Button */}
            <button 
              type="button"
              onClick={toggleSpeechRecognition}
              title={isListening ? "Stop & Send Voice Query" : `Speak in ${voiceLang === 'hi-IN' ? 'Hindi (हिंदी)' : 'English'}`}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center relative ${
                isListening 
                  ? 'mic-listening border-red-500 bg-red-500/20 text-red-400 shadow-lg shadow-red-500/40 animate-pulse' 
                  : 'bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white border-white/[0.08]'
              }`}
            >
              {isListening ? (
                <Mic className="w-4 h-4 text-red-400" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            {/* Language Switch Pill */}
            <button
              type="button"
              onClick={() => {
                const nextLang = voiceLang === 'hi-IN' ? 'en-IN' : 'hi-IN';
                setVoiceLang(nextLang);
                if (isListening && recognitionRef.current) {
                  try { recognitionRef.current.stop(); } catch (e) {}
                  setIsListening(false);
                }
              }}
              title={`Active Voice Language: ${voiceLang === 'hi-IN' ? 'Hindi / Hinglish (Click to switch to English)' : 'English (Click to switch to Hindi)'}`}
              className="px-2 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-[10px] font-bold text-slate-300 hover:text-white transition-all flex-shrink-0"
            >
              {voiceLang === 'hi-IN' ? '🇮🇳 हि' : '🌐 En'}
            </button>

            {/* Input Box */}
            <input 
              ref={inputRef}
              type="text" 
              placeholder={
                isListening 
                  ? (voiceLang === 'hi-IN' ? "सुन रहे हैं... बोलिए (बोलना बंद करते ही उत्तर मिलेगा)" : "Listening... Speak now (auto-sends on pause)")
                  : (voiceLang === 'hi-IN' ? "पूछिए या बोलिए (उदा. वेबसाइट का खर्च कितना है?)" : "Ask about pricing, tiers, or speak...")
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />

            {/* Send Button */}
            <button 
              type="submit" 
              className="p-2.5 rounded-xl bg-lime-accent text-slate-950 hover:bg-lime-400 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-lime-400/20"
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
