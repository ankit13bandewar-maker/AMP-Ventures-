import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowUpRight, ShieldCheck, CheckCircle2, 
  TrendingUp, MessageSquare, MapPin, Zap, Clock, 
  Layers, PhoneCall, QrCode, Globe, Check, Award
} from 'lucide-react';
import MockupGenerator from '../components/MockupGenerator.jsx';
import FaqSection from '../components/FaqSection.jsx';
import { getWhatsAppUrl } from '../apiConfig';

const TRUST_BADGES = [
  { icon: Award, title: 'High-Performance Code', desc: 'Sub-Second Core Web Vitals' },
  { icon: ShieldCheck, title: 'Enterprise Cloud Infra', desc: 'Fast Global CDN & SSL Secured' },
  { icon: Clock, title: '5–7 Days Delivery', desc: 'Rapid Production Turnaround' },
  { icon: TrendingUp, title: '100% Ownership', desc: 'Zero Monthly Software Retainers' },
];

const TRANSFORMATION_ITEMS = [
  {
    icon: MapPin,
    industry: 'Salons & Luxury Spas',
    metric: '+145% Bookings',
    badgeClass: 'bg-lime-400/10 text-lime-400 border border-lime-400/25',
    offlinePoints: [
      'Manual Calls',
      'Empty Slots',
      'Zero Reviews'
    ],
    solutionPoints: [
      'WhatsApp Booking',
      'Digital Menu',
      'Auto Reviews'
    ]
  },
  {
    icon: QrCode,
    industry: 'Restaurants & Cafes',
    metric: '+210% Direct Orders',
    badgeClass: 'bg-sky-400/10 text-sky-400 border border-sky-400/25',
    offlinePoints: [
      'High Commissions',
      'Paper Menus',
      'Slow Ordering'
    ],
    solutionPoints: [
      'QR Ordering',
      '3D Food',
      'Instant Tables'
    ]
  },
  {
    icon: Globe,
    industry: 'Retail & Boutiques',
    metric: '+180% Repeat Sales',
    badgeClass: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/25',
    offlinePoints: [
      'Limited Hours',
      'No Catalog',
      'Zero Reach'
    ],
    solutionPoints: [
      '24/7 Catalog',
      'WhatsApp Checkout',
      'Direct Alerts'
    ]
  }
];

export default function Home() {
  return (
    <div className="home-page pt-24">
      {/* 1. Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-xs font-semibold uppercase tracking-wider text-lime-accent mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Specialized Web Engineering for Offline Businesses</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-4 sm:mb-6">
            We Build the Online Presence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-accent via-sky-400 to-indigo-400">
              Your Business Is Missing
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
            We build websites, automated booking, and local search visibility — so every customer searching nearby finds you first.
          </p>

          {/* Mobile Quick Value Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto mb-8 sm:mb-10 text-[11px] font-semibold text-slate-300">
            <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center gap-1.5 shadow-sm">
              <span className="text-lime-accent">⚡</span> 5-Day Rapid Launch
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center gap-1.5 shadow-sm">
              <span className="text-emerald-400">📱</span> WhatsApp Booking
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center gap-1.5 shadow-sm">
              <span className="text-sky-400">📍</span> Google Maps #1 SEO
            </span>
            <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center gap-1.5 shadow-sm">
              <span className="text-indigo-400">🔒</span> 100% Code Ownership
            </span>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto">
            <Link 
              to="/readiness-score" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-slate-950 bg-lime-accent hover:bg-lime-400 shadow-xl shadow-lime-accent/25 hover:scale-105 active:scale-95 transition-all text-sm sm:text-base"
            >
              <span>Get Free Digital Audit</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <Link 
              to="/services" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] backdrop-blur-lg hover:scale-105 transition-all text-sm sm:text-base"
            >
              <span>Explore 3 Tiers</span>
            </Link>

            <a 
              href={getWhatsAppUrl("Hi AMP Ventures, I'd like to consult about a website for my business.")} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-sm sm:text-base"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Trust Badges Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            {TRUST_BADGES.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div key={idx} className="p-3.5 rounded-xl bg-[#111522]/80 border border-white/[0.08] backdrop-blur-md flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-lime-accent/10 border border-lime-accent/25 flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-4 h-4 text-lime-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">{b.title}</div>
                    <div className="text-[11px] text-slate-400">{b.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. Feature Grid Showcase (Longer Boxes with Clear Readable Typography) */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
              Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">High-Conversion Local Growth</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Everything your website needs to turn visitors into paying customers.
            </p>
          </div>

          {/* 2-Column Balanced Grid with Longer Boxes & Clear Typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Feature 01: WhatsApp Booking */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-lime-accent/40 transition-all flex flex-col justify-between">
              <div className="mb-4">
                <div className="mb-2.5">
                  <span className="badge badge-accent badge-sm font-bold text-xs">Feature 01</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug">1-Click WhatsApp Booking</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Direct appointment booking and customer inquiries with zero friction.
                </p>
              </div>

              {/* WhatsApp Chat Simulation */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#0a0d14] border border-white/[0.06] space-y-2 font-sans">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">U</div>
                  <div className="px-2.5 py-1.5 rounded-lg rounded-tl-none bg-[#1e2638] text-slate-200 text-xs leading-normal">
                    Can I book a slot for tomorrow at 4 PM?
                  </div>
                </div>
                <div className="flex items-start justify-end gap-2">
                  <div className="px-2.5 py-1.5 rounded-lg rounded-tr-none bg-emerald-900/60 border border-emerald-500/30 text-emerald-100 text-xs leading-normal">
                    ✨ Confirmed! Slot booked for 4:00 PM.
                  </div>
                  <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">✓</div>
                </div>
              </div>
            </div>

            {/* Feature 02: Google Maps Search Dominance */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-sky-400/40 transition-all flex flex-col justify-between">
              <div className="mb-4">
                <div className="mb-2.5">
                  <span className="badge badge-info badge-sm font-bold text-xs">Feature 02</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug">Google Maps Dominance</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Rank #1 on Google Maps when nearby clients search for your services.
                </p>
              </div>

              {/* Google Maps Ranking Proof */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0a0d14] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">"Best Local Business Near Me"</div>
                    <div className="text-[11px] sm:text-xs text-emerald-400 font-semibold mt-0.5">Rank #1 on Google Maps</div>
                  </div>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-white font-mono">4.9 ★</div>
              </div>
            </div>

            {/* Feature 03: 100% Asset Ownership */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-indigo-400/40 transition-all flex flex-col justify-between">
              <div className="mb-4">
                <div className="mb-2.5">
                  <span className="badge badge-primary badge-sm font-bold text-xs">Feature 03</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug">100% Asset Ownership</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Complete code and domain ownership with zero monthly software fees.
                </p>
              </div>

              {/* Ownership Proof Element */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0a0d14] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">Full Asset Transfer</div>
                    <div className="text-[11px] sm:text-xs text-indigo-300 font-semibold mt-0.5">Zero monthly platform rent</div>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-bold">100% Yours</span>
              </div>
            </div>

            {/* Feature 04: Loads Instantly */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-emerald-400/40 transition-all flex flex-col justify-between">
              <div className="mb-4">
                <div className="mb-2.5">
                  <span className="badge badge-success badge-sm font-bold text-xs">Feature 04</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug">Loads Instantly</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Ultra-fast page loads so visitors never bounce before exploring.
                </p>
              </div>

              {/* Compressed 3-Stat Horizontal Strip */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0a0d14] border border-white/[0.06] flex items-center justify-around text-center">
                <div>
                  <div className="text-sm sm:text-base font-bold text-lime-accent font-mono leading-tight">&lt; 0.4s</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Load Time</div>
                </div>
                <div className="h-6 w-px bg-white/[0.08]" />
                <div>
                  <div className="text-sm sm:text-base font-bold text-sky-400 font-mono leading-tight">100/100</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">SEO Score</div>
                </div>
                <div className="h-6 w-px bg-white/[0.08]" />
                <div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400 font-mono leading-tight">99.9%</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Uptime SLA</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Instant Website Mockup Generator (High-Converting Interactive Tool) */}
      <section className="py-16 bg-[#0a0d14] border-y border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-6xl">
          <MockupGenerator />
        </div>
      </section>

      {/* 5. Offline to Online Transformation Blueprint */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-lime-accent bg-lime-accent/10 border border-lime-accent/20 mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Transformation Blueprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              From Manual Struggles to <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-accent to-sky-400">Automated Growth</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              See how going online helps local businesses save time, get more customers, and grow daily revenue.
            </p>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-4">
            <span>← Swipe between industries →</span>
          </div>

          <div className="mobile-snap-carousel md:grid md:grid-cols-3 gap-6 no-scrollbar">
            {TRANSFORMATION_ITEMS.map((item, idx) => (
              <div key={idx} className="mobile-snap-card p-6 sm:p-7 rounded-2xl bg-[#111522] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.18] transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{item.industry}</h3>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] sm:text-[11px] whitespace-nowrap flex-shrink-0 shadow-sm ${item.badgeClass}`}>
                      {item.metric}
                    </span>
                  </div>

                  {/* Offline Bottleneck */}
                  <div className="mb-4 pb-4 border-b border-white/[0.06]">
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-2">
                      ✕ Offline Bottleneck:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {item.offlinePoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AMP Ventures Solution */}
                  <div className="mb-5">
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                      ✓ AMP Growth Stack:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-200">
                      {item.solutionPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link to="/services" className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white text-center border border-white/[0.08] transition-all flex items-center justify-center gap-1.5">
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 3 Service Tiers Overview */}
      <section className="py-20 bg-[#0e1118]/60 border-t border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-400/10 border border-sky-400/20 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              3 Clear Tiers Built For <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Every Stage</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-base">
              No bloated contracts. Choose the exact tier that matches your business goals and budget.
            </p>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex lg:hidden items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-4">
            <span>← Swipe to compare all 3 tiers →</span>
          </div>

          <div className="mobile-snap-carousel lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch no-scrollbar">
            
            {/* Tier 1 */}
            <div className="mobile-snap-card p-6 sm:p-8 rounded-2xl bg-[#111522] border border-white/[0.08] flex flex-col justify-between hover:border-slate-400/40 transition-all">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tier 1 • Rapid Launch</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-1.5">Basic Website</h3>
                <p className="text-xs text-slate-400 mb-4 sm:mb-6">Fast 4–6 page web presence for businesses establishing their first digital footprint.</p>
                
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-5">
                  <div className="text-[11px] text-slate-400">Starting at</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹9,999</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">⏱️ 5–7 Days Delivery</div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> 4–6 Responsive Pages</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Google Business Maps Sync</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Instant Form to Email</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Free SSL & Fast CDN Hosting</li>
                </ul>
              </div>

              <Link to="/contact?tier=tier1" className="w-full py-2.5 sm:py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-bold text-white text-center border border-white/[0.12] transition-all">
                Get Tier 1 Quote
              </Link>
            </div>

            {/* Tier 2 (Featured) */}
            <div className="mobile-snap-card p-6 sm:p-8 rounded-2xl bg-[#151a26] border-2 border-sky-400/50 shadow-xl shadow-sky-500/10 flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-400 text-slate-950 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap">
                ⭐ Most Popular for Local Growth
              </div>

              <div>
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Tier 2 • Full Control</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-1.5">Premium + Custom CMS</h3>
                <p className="text-xs text-slate-400 mb-4 sm:mb-6">Dynamic web app with client CMS to update menus, rates, photos, plus Google reviews.</p>
                
                <div className="p-3.5 sm:p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 mb-5">
                  <div className="text-[11px] text-slate-400">Starting at</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">₹24,999</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">⏱️ 10–12 Days Delivery</div>
                </div>

                <ul className="space-y-2 text-xs text-slate-200 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-400 font-bold" /> Everything in Tier 1</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-400 font-bold" /> Custom Admin Content CMS</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-400 font-bold" /> Google Reviews Live Widget</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-400 font-bold" /> Direct WhatsApp Lead Pipeline</li>
                </ul>
              </div>

              <Link to="/contact?tier=tier2" className="w-full py-2.5 sm:py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-bold text-center shadow-lg transition-all">
                Get Tier 2 Quote
              </Link>
            </div>

            {/* Tier 3 */}
            <div className="mobile-snap-card p-6 sm:p-8 rounded-2xl bg-[#111522] border border-white/[0.08] flex flex-col justify-between hover:border-lime-accent/40 transition-all">
              <div>
                <span className="text-[11px] font-bold text-lime-accent uppercase tracking-wider">Tier 3 • Market Leader</span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-1.5">3D WebGL & AI Automated</h3>
                <p className="text-xs text-slate-400 mb-4 sm:mb-6">3D interactive hero, automated AI chatbot, and WhatsApp Business API integration.</p>
                
                <div className="p-3.5 sm:p-4 rounded-xl bg-lime-400/10 border border-lime-400/20 mb-5">
                  <div className="text-[11px] text-slate-400">Starting at</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-lime-accent font-mono">₹49,999</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">⏱️ 14–18 Days Delivery</div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Everything in Tier 2</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Interactive 3D WebGL Hero</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Custom AI Chatbot Assistant</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Dedicated Technical Architect</li>
                </ul>
              </div>

              <Link to="/contact?tier=tier3" className="w-full py-2.5 sm:py-3 rounded-xl bg-lime-accent hover:bg-lime-400 text-slate-950 text-xs font-bold text-center shadow-lg transition-all">
                Get Tier 3 Quote
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <FaqSection />
        </div>
      </section>

    </div>
  );
}
