import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [openFaq, setOpenFaq] = useState(0); // First item open by default for immediate preview

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section className="section-padding" style={{ background: 'rgba(15, 23, 42, 0.4)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div className="section-header">
          <div className="section-tag">Got Questions?</div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="glass-card" 
                style={{ 
                  padding: '1.25rem 1.5rem', 
                  cursor: 'pointer',
                  borderColor: isOpen ? 'rgba(99, 102, 241, 0.4)' : 'var(--border-subtle)',
                  background: isOpen ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.6)',
                  transition: 'all 0.25s ease'
                }}
                onClick={() => toggleFaq(idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '1rem', color: isOpen ? '#fff' : 'var(--text-primary)' }}>
                    {faq.q}
                  </span>
                  <div style={{ 
                    width: '28px', 
                    height: '28px', 
                    minWidth: '28px',
                    borderRadius: '50%',
                    background: isOpen ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: isOpen ? 'var(--primary-light)' : 'var(--text-muted)',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    transition: 'all 0.2s ease'
                  }}>
                    {isOpen ? '−' : '+'}
                  </div>
                </div>

                {isOpen && (
                  <div style={{ 
                    marginTop: '0.85rem', 
                    paddingTop: '0.85rem', 
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    color: 'var(--text-secondary)', 
                    fontSize: '0.92rem', 
                    lineHeight: '1.6' 
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Link below FAQ */}
        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Have a specific question about your store?{' '}
          <Link to="/contact" style={{ color: 'var(--primary-light)', fontWeight: 600, textDecoration: 'underline' }}>
            Ask our Lead Architect directly →
          </Link>
        </div>
      </div>
    </section>
  );
}
