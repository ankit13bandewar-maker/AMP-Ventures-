import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ArrowUpRight, ShieldCheck, Clock, Zap } from 'lucide-react';
import FaqSection from '../components/FaqSection.jsx';

const PRICING_TIERS = [
  {
    id: 'tier1',
    name: 'Tier 1 — Basic',
    badge: 'Rapid Launch',
    price: '₹9,999',
    timeline: '5–7 Days Delivery',
    description: 'Perfect for local shops, cafes & clinics needing a fast, professional online storefront.',
    features: [
      '4–6 Custom Responsive Pages',
      'Mobile-First Layout & Speed Tuning',
      'Google Maps & Business Profile Link',
      'Contact Form → Instant Email Alerts',
      'Free SSL Certificate & Hosting Setup',
      '1 Round of Design Revisions',
      '30-Day Post Launch Support'
    ],
    ctaText: 'Get Tier 1 Proposal',
    ctaLink: '/contact?tier=tier1',
    badgeColor: 'badge-ghost',
    btnClass: 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.12]'
  },
  {
    id: 'tier2',
    name: 'Tier 2 — Premium',
    badge: 'Most Popular for Local Growth',
    isPopular: true,
    price: '₹24,999',
    timeline: '10–12 Days Delivery',
    description: 'Empowers business owners with a custom CMS to edit items, prices, and photos with zero code.',
    features: [
      'Everything in Tier 1',
      'Lightweight Custom CMS Dashboard',
      'Self-serve Menu & Price Editor',
      'Live Google Reviews Embed Widget',
      'Google Analytics 4 & Traffic Dashboard',
      'Direct WhatsApp Booking CTAs',
      'Optional Maintenance Retainer',
      '60-Day Priority Support'
    ],
    ctaText: 'Start Tier 2 Build',
    ctaLink: '/contact?tier=tier2',
    badgeColor: 'badge-info',
    btnClass: 'bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-lg'
  },
  {
    id: 'tier3',
    name: 'Tier 3 — Premium Plus',
    badge: '3D WebGL & AI Automation',
    isPlus: true,
    price: '₹49,999',
    timeline: '14–18 Days Delivery',
    description: 'Immersive 3D interactive hero, WhatsApp Business API automation, and 24/7 AI chatbot.',
    features: [
      'Everything in Tier 2',
      '3D Interactive WebGL / Spline Hero Model',
      'WhatsApp Business API Automation',
      '24/7 AI Conversational Lead Bot',
      'Centralized Lead Management Dashboard',
      'High-Performance CDN & Custom Animations',
      'Dedicated Tech Lead & Priority SLA'
    ],
    ctaText: 'Book Tier 3 Consultation',
    ctaLink: '/contact?tier=tier3',
    badgeColor: 'badge-accent',
    btnClass: 'bg-lime-accent hover:bg-lime-400 text-slate-950 shadow-lg'
  }
];

export default function Pricing() {
  return (
    <div className="pricing-page pt-28 pb-20">
      {/* Header */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-xs font-semibold uppercase tracking-wider text-lime-accent mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Investment</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Simple, Transparent Pricing For <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-accent via-sky-400 to-indigo-400">
              Measurable Business ROI
            </span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Every package is engineered to pay for itself through increased local search visibility, higher customer conversion, and direct WhatsApp bookings.
          </p>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier) => (
              <div 
                key={tier.id} 
                className={`p-8 rounded-3xl bg-[#111522] border ${tier.isPopular ? 'border-sky-400/50 shadow-2xl shadow-sky-500/10 lg:-translate-y-2' : tier.isPlus ? 'border-lime-accent/50 shadow-2xl shadow-lime-accent/10' : 'border-white/[0.08]'} flex flex-col justify-between transition-all`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`badge ${tier.badgeColor} badge-sm font-bold uppercase tracking-wider`}>
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-2">{tier.name}</h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">{tier.description}</p>

                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
                    <div className="text-xs text-slate-400">Fixed Project Fee</div>
                    <div className="text-4xl font-extrabold text-white font-mono my-1">{tier.price}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{tier.timeline}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Deliverables Included:</div>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.isPopular ? 'text-sky-400' : tier.isPlus ? 'text-lime-accent' : 'text-slate-400'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link 
                  to={tier.ctaLink} 
                  className={`w-full py-3.5 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 transition-all ${tier.btnClass}`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <FaqSection />
        </div>
      </section>

    </div>
  );
}
