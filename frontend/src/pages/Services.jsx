import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, Check, ArrowUpRight, Zap, Layers, 
  Bot, Globe, Database, ShieldCheck, Clock, MessageSquare 
} from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'tier-1',
    tierNumber: 'Tier 1',
    name: 'Basic Static Website',
    tagline: 'Clean, lightning-fast web presence to build immediate local credibility.',
    startingPrice: '₹9,999',
    timeline: '5–7 Business Days',
    badgeColor: 'badge-ghost',
    idealFor: 'Local retail shops, solo salons, small cafes, single-doctor clinics wanting a professional online presence.',
    highlights: [
      '4–6 Custom Designed Responsive Pages (Home, About, Services, Gallery, Contact)',
      'Google Business Profile integration & Google Map embedding',
      'Contact inquiry form wired with instant email delivery alerts',
      'Lightweight, ultra-fast performance with 95+ Google Lighthouse speed score',
      'Free SSL Security Certificate & DNS / domain setup assistance',
      'Basic On-Page SEO (Meta tags, OpenGraph previews, sitemap.xml)'
    ],
    techStack: 'HTML5, Modern CSS, React Vite, Fast CDN',
    ctaLink: '/contact?tier=tier1'
  },
  {
    id: 'tier-2',
    tierNumber: 'Tier 2',
    name: 'Premium + Custom CMS',
    tagline: 'Dynamic platform allowing you to edit menus, prices, and gallery photos with zero code.',
    startingPrice: '₹24,999',
    timeline: '10–12 Business Days',
    badgeColor: 'badge-info',
    isPopular: true,
    idealFor: 'Growing restaurants with seasonal menus, busy salons with stylist rosters, wellness clinics, and specialty retail.',
    highlights: [
      'Everything included in Tier 1',
      'Lightweight Client CMS: Update your menu items, price lists, and portfolio images independently',
      'Live Google Reviews Embed Widget to display 5-star customer ratings automatically',
      'Google Analytics 4 & Search Console setup for weekly traffic visibility',
      'Direct WhatsApp Slot Booking & click-to-chat CTA buttons',
      'Optional Monthly Maintenance Retainer for ongoing updates, backups & technical security'
    ],
    techStack: 'FastAPI Backend, React SPA, SQLite/PostgreSQL CMS, Google Analytics API',
    ctaLink: '/contact?tier=tier2'
  },
  {
    id: 'tier-3',
    tierNumber: 'Tier 3',
    name: 'Premium Plus (3D & Automation)',
    tagline: 'Futuristic digital experience with interactive 3D elements, AI chatbot, and WhatsApp Business API.',
    startingPrice: '₹49,999',
    timeline: '14–18 Business Days',
    badgeColor: 'badge-accent',
    isPlus: true,
    idealFor: 'High-end fine dining, luxury aesthetics clinics, multi-location brands, and premium experience venues.',
    highlights: [
      'Everything included in Tier 2',
      'Immersive 3D WebGL / Spline interactive hero sections (e.g. 3D rotating dish, 3D salon station, or interactive product)',
      'WhatsApp Business API integration for automated appointment confirmations & reminder broadcasts',
      '24/7 AI Chatbot Assistant capable of answering visitor FAQs and capturing qualified leads automatically',
      'Centralized Lead Admin Dashboard (view chatbot + WhatsApp + form leads in a single unified view)',
      'Custom micro-animations (Framer Motion / Smooth Scroll) & VIP Priority Support SLA'
    ],
    techStack: 'FastAPI, Three.js / WebGL, AI Agent Framework, WhatsApp Cloud API, Admin UI',
    ctaLink: '/contact?tier=tier3'
  }
];

const MATRIX_FEATURES = [
  { name: 'Number of Pages', t1: '4–6 Pages', t2: 'Up to 12 Pages', t3: 'Custom / Scalable' },
  { name: 'Mobile First & Responsive', t1: 'Yes', t2: 'Yes', t3: 'Yes (Ultra-responsive)' },
  { name: 'Google Business Profile Sync', t1: 'Yes', t2: 'Yes', t3: 'Yes + Priority Map SEO' },
  { name: 'Contact Form to Email', t1: 'Yes', t2: 'Yes', t3: 'Yes + SMS / WhatsApp alerts' },
  { name: 'Client CMS Dashboard', t1: '—', t2: 'Lightweight CMS', t3: 'Full Custom CMS Portal' },
  { name: 'Live Google Reviews Widget', t1: '—', t2: 'Included', t3: 'Included + Filtered' },
  { name: 'Google Analytics & Insights', t1: '—', t2: 'Included', t3: 'Advanced Funnels' },
  { name: 'WhatsApp Click-to-Chat', t1: 'Basic wa.me link', t2: 'Dynamic pre-fills', t3: 'WhatsApp Cloud API' },
  { name: '3D Interactive / WebGL Hero', t1: '—', t2: '—', t3: 'Custom 3D Model' },
  { name: 'AI Conversational Chatbot', t1: '—', t2: '—', t3: '24/7 AI Assistant' },
  { name: 'Lead Management Portal', t1: '—', t2: '—', t3: 'Included' },
  { name: 'Support SLA & Retainer', t1: '30 Days Warranty', t2: 'Priority Email + Retainer', t3: 'VIP 24h SLA + Dedicated Manager' },
];

export default function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="services-page pt-28 pb-20">
      {/* Header */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-xs font-semibold uppercase tracking-wider text-sky-400 mb-6 shadow-inner">
            <Zap className="w-3.5 h-3.5" />
            <span>Tailored Architecture & Solutions</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Engineering Packages Engineered for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-lime-accent">
              Measurable Local ROI
            </span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            From rapid 5-day launches to immersive 3D interactive experiences, we provide clean, predictable development packages designed for offline businesses.
          </p>
        </div>
      </section>

      {/* 3 Detailed Service Cards */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          {SERVICES_DATA.map((srv) => (
            <div 
              id={srv.id} 
              key={srv.id} 
              className={`p-8 lg:p-12 rounded-3xl bg-[#111522] border ${srv.isPopular ? 'border-sky-400/50 shadow-2xl shadow-sky-500/10' : srv.isPlus ? 'border-lime-accent/50 shadow-2xl shadow-lime-accent/10' : 'border-white/[0.08]'} transition-all`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`badge ${srv.badgeColor} badge-sm font-bold uppercase tracking-wider`}>
                      {srv.tierNumber}
                    </span>
                    {srv.isPopular && <span className="text-xs font-bold text-sky-400">Most Popular</span>}
                    {srv.isPlus && <span className="text-xs font-bold text-lime-accent">Next-Gen Tech</span>}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{srv.name}</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">{srv.tagline}</p>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                    <div className="text-xs text-slate-400">Investment starting at</div>
                    <div className="text-3xl font-extrabold text-white font-mono">{srv.startingPrice}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{srv.timeline}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 bg-[#0a0d14] p-4 rounded-xl border border-white/[0.04]">
                    <strong className="text-slate-200 block mb-1">Ideal For:</strong>
                    {srv.idealFor}
                  </div>

                  <Link 
                    to={srv.ctaLink} 
                    className={`w-full py-3.5 rounded-xl font-bold text-sm text-center shadow-lg flex items-center justify-center gap-2 transition-all ${
                      srv.isPopular ? 'bg-sky-400 hover:bg-sky-300 text-slate-950' : srv.isPlus ? 'bg-lime-accent hover:bg-lime-400 text-slate-950' : 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.1]'
                    }`}
                  >
                    <span>Request {srv.tierNumber} Setup</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider text-xs border-b border-white/[0.08] pb-2">
                    Included Architecture Deliverables:
                  </h3>
                  
                  <ul className="space-y-3">
                    {srv.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${srv.isPopular ? 'text-sky-400' : srv.isPlus ? 'text-lime-accent' : 'text-slate-400'}`} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
                    <span><strong>Stack:</strong> {srv.techStack}</span>
                    <span className="text-emerald-400 font-semibold font-mono">100% Owned</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Matrix Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Feature Comparison Matrix</h2>
            <p className="text-slate-400 text-sm">Detailed side-by-side breakdown of all deliverables across our 3 tiers.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#111522]">
            <table className="table w-full text-xs sm:text-sm">
              <thead className="bg-[#0a0d14] text-slate-300 font-bold border-b border-white/[0.08]">
                <tr>
                  <th className="py-4 px-6 text-left">Platform Capabilities</th>
                  <th className="py-4 px-6 text-center text-slate-400">Tier 1 (Basic)</th>
                  <th className="py-4 px-6 text-center text-sky-400">Tier 2 (CMS)</th>
                  <th className="py-4 px-6 text-center text-lime-accent">Tier 3 (3D & AI)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {MATRIX_FEATURES.map((feat, fIdx) => (
                  <tr key={fIdx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-white">{feat.name}</td>
                    <td className="py-3.5 px-6 text-center text-slate-400">{feat.t1}</td>
                    <td className="py-3.5 px-6 text-center text-sky-300 font-medium">{feat.t2}</td>
                    <td className="py-3.5 px-6 text-center text-lime-accent font-semibold">{feat.t3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
