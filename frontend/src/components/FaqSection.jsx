import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';

const FAQS_DATA = [
  {
    q: 'How fast will my website be designed and launched?',
    a: 'Tier 1 (Basic Website) goes live in 5–7 business days. Tier 2 (Custom CMS) takes 10–12 business days, and Tier 3 (3D & AI Automation) takes 14–18 business days. We provide a guaranteed delivery timeline upon project kickoff.'
  },
  {
    q: 'Are there any hidden monthly fees or subscriptions?',
    a: 'No hidden fees. The website build is a one-time project fee. After launch, you own 100% of your source code, domain, and data. Cloud hosting and domain renewals are standard at-cost (approx. ₹1,500–₹3,000/year) with zero lock-in.'
  },
  {
    q: 'Can I update my menu prices, photos, and services myself?',
    a: 'Yes! With Tier 2 and Tier 3, we build a lightweight, custom admin portal where you or your staff can add menu items, update prices, and upload gallery photos in seconds with zero coding knowledge.'
  },
  {
    q: 'How does the WhatsApp 1-click booking integration work?',
    a: 'We embed high-converting WhatsApp action buttons directly into your site. When visitors click to book a table, salon slot, or order a product, a pre-filled WhatsApp message opens automatically on their phone with the details ready to send.'
  },
  {
    q: 'Will my local business rank on Google Maps and search?',
    a: 'Yes. Every project includes on-page Local SEO, fast-loading structured data schema, Google Business Profile syncing, and review widget embeds to help your business rank at the top of local "near me" searches.'
  },
  {
    q: 'Can I start with a Basic site and upgrade later?',
    a: 'Absolutely. We code all websites with modular React and FastAPI architecture. You can easily add a custom CMS, review widgets, or AI chatbots whenever your business is ready without rebuilding from scratch.'
  }
];

export default function FaqSection({ title = "Frequently Asked Questions", subtitle = "Clear, straightforward answers to help you make the best decision for your business." }) {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="faq-section">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-lime-accent bg-lime-accent/10 border border-lime-accent/20 mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3">{title}</h2>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {FAQS_DATA.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div 
              key={idx} 
              className={`p-5 rounded-2xl bg-[#111522] border transition-all cursor-pointer ${isOpen ? 'border-sky-400/40 bg-[#151a26]' : 'border-white/[0.08] hover:border-white/[0.18]'}`}
              onClick={() => toggleFaq(idx)}
            >
              <div className="flex justify-between items-center gap-4">
                <span className="font-bold text-sm text-white">{faq.q}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-sky-400/20 text-sky-400' : 'bg-white/[0.05] text-slate-400'}`}>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {isOpen && (
                <div className="mt-3.5 pt-3.5 border-t border-white/[0.06] text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8 text-xs text-slate-400">
        Have a specific question about your store?{' '}
        <Link to="/contact" className="text-lime-accent font-semibold hover:underline inline-flex items-center gap-1">
          <span>Ask our Lead Architect directly</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
