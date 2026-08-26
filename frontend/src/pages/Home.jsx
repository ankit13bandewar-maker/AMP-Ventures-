import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowUpRight, ShieldCheck, CheckCircle2, 
  TrendingUp, MessageSquare, MapPin, Zap, Clock, 
  Layers, PhoneCall, QrCode, Globe, Check, Award, SlidersHorizontal
} from 'lucide-react';
import MockupGenerator from '../components/MockupGenerator.jsx';
import FaqSection from '../components/FaqSection.jsx';

const TRUST_BADGES = [
  { icon: Award, title: 'High-Performance Code', desc: 'Sub-Second Core Web Vitals' },
  { icon: ShieldCheck, title: 'Enterprise Cloud Infra', desc: 'Fast Global CDN & SSL Secured' },
  { icon: Clock, title: '5–7 Days Delivery', desc: 'Rapid Production Turnaround' },
  { icon: TrendingUp, title: '100% Ownership', desc: 'Zero Monthly Software Retainers' },
];

const ROI_DATA = {
  salon: { label: 'Salon & Luxury Spa', avgTicket: 1200, onlineBookingRate: 0.35 },
  clinic: { label: 'Healthcare & Clinic', avgTicket: 1500, onlineBookingRate: 0.40 },
  restaurant: { label: 'Restaurant & Cafe', avgTicket: 800, onlineBookingRate: 0.25 },
  boutique: { label: 'Retail & Boutique', avgTicket: 2000, onlineBookingRate: 0.20 }
};

const TRANSFORMATION_ITEMS = [
  {
    icon: MapPin,
    industry: 'Salons & Luxury Spas',
    metric: '+145% weekly bookings',
    badgeColor: 'badge-accent',
    offlinePoints: [
      'Manual phone calls interrupting stylists',
      'Empty mid-week appointment slots',
      'Zero verified Google Maps reviews'
    ],
    solutionPoints: [
      '24/7 1-click WhatsApp slot booking',
      'Digital stylist portfolio & service menu',
      'Automated Google Review collection engine'
    ]
  },
  {
    icon: QrCode,
    industry: 'Restaurants & Cafes',
    metric: '+210% direct table orders',
    badgeColor: 'badge-info',
    offlinePoints: [
      'Paying 25-30% aggregator commissions',
      'Costly printed menus with outdated prices',
      'Slow manual ordering during peak rush'
    ],
    solutionPoints: [
      'Direct table QR digital ordering menu',
      'Interactive 3D dish previews on mobile',
      'Instant WhatsApp table confirmations'
    ]
  },
  {
    icon: Globe,
    industry: 'Retail & Boutiques',
    metric: '+180% repeat customers',
    badgeColor: 'badge-success',
    offlinePoints: [
      'Sales limited strictly to store opening hours',
      'No customer catalog database',
      'Zero outstation inquiries'
    ],
    solutionPoints: [
      'Always-on digital luxury catalog',
      'Direct WhatsApp checkout & payment links',
      'Automated new-arrival announcement alerts'
    ]
  }
];

export default function Home() {
  const [selectedIndustry, setSelectedIndustry] = useState('salon');
  const [monthlyFootfall, setMonthlyFootfall] = useState(400);

  // Dynamic ROI calculation
  const industryConfig = ROI_DATA[selectedIndustry];
  const estimatedNewOnlineBookings = Math.round(monthlyFootfall * industryConfig.onlineBookingRate * 0.45);
  const estimatedMonthlyBoost = estimatedNewOnlineBookings * industryConfig.avgTicket;

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
            We Turn Offline Footfall Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-accent via-sky-400 to-indigo-400">
              Automated Digital Revenue
            </span>
          </h1>

          {/* Subtitle - Punchy on mobile, detailed on desktop */}
          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
            High-converting web apps, automated WhatsApp booking engines, and Google Maps local SEO for salons, clinics, restaurants, and retail boutiques.
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
              href="https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I'd%20like%20to%20consult%20about%20a%20website%20for%20my%20business." 
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

      {/* 2. Interactive Live ROI Revenue Calculator */}
      <section className="py-12 bg-[#0e1118]/60 border-y border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 rounded-2xl bg-[#151a26]/90 border border-white/[0.1] shadow-2xl backdrop-blur-xl">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-400/10 border border-sky-400/20 mb-2">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Interactive Growth Simulator</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">How much revenue are you losing offline?</h3>
              </div>
              
              {/* Industry Selector */}
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(ROI_DATA).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedIndustry(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedIndustry === key
                        ? 'bg-lime-accent text-slate-950 shadow-md'
                        : 'bg-white/[0.05] text-slate-400 hover:text-white'
                    }`}
                  >
                    {ROI_DATA[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-300">Estimated Monthly Walk-ins / Clients</span>
                    <span className="text-sm font-bold text-lime-accent font-mono">{monthlyFootfall} customers</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="50"
                    value={monthlyFootfall}
                    onChange={(e) => setMonthlyFootfall(Number(e.target.value))}
                    className="range range-accent range-sm w-full cursor-pointer accent-[#d2f829]"
                  />
                  <div className="w-full flex justify-between text-[11px] text-slate-500 px-1 mt-1 font-mono">
                    <span>100</span>
                    <span>500</span>
                    <span>1,000</span>
                    <span>2,000+</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.05]">
                  💡 <strong>How this works:</strong> Offline businesses without 24/7 digital booking lose ~35% of potential clients who search after business hours or leave without scheduling their next appointment.
                </div>
              </div>

              {/* Calculated Output Stat Box */}
              <div className="md:col-span-5 p-6 rounded-xl bg-gradient-to-br from-[#1b2234] to-[#121624] border border-lime-accent/30 shadow-lg text-center space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Monthly Revenue Gain</div>
                <div className="text-3xl lg:text-4xl font-extrabold text-lime-accent font-mono">
                  +₹{estimatedMonthlyBoost.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  from <span className="text-white font-bold font-mono">+{estimatedNewOnlineBookings}</span> automated online bookings/mo
                </div>
                <Link
                  to={`/contact?tier=tier2&industry=${selectedIndustry}`}
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-xs font-bold text-white border border-white/[0.1] transition-all"
                >
                  <span>Claim Your Custom Setup</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Asymmetric Bento Grid Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Engineered Specifically For <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">High-Conversion Local Growth</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Every website we build is integrated with our proven offline-to-online growth stack.
            </p>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-4">
            <span>← Swipe to explore architecture →</span>
          </div>

          {/* Bento Grid (Swipeable on mobile, Grid on desktop) */}
          <div className="mobile-snap-carousel md:grid md:grid-cols-12 gap-6 no-scrollbar">
            
            {/* Bento Card 1 (Large 7 Cols): Live WhatsApp Booking Simulator */}
            <div className="mobile-snap-card md:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-lime-accent/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-accent badge-sm font-bold">Feature 01</span>
                  <span className="text-[11px] text-slate-500 font-mono">0.1s Trigger</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">1-Click WhatsApp Booking Engine</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                  No complex signups. Customers book slots, reserve tables, or request quotes directly on WhatsApp.
                </p>
              </div>

              {/* WhatsApp Chat Simulation Bubble */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#0a0d14] border border-white/[0.06] space-y-2.5 font-sans text-xs">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">User</div>
                  <div className="p-2 rounded-lg rounded-tl-none bg-[#1e2638] text-slate-200 max-w-[85%] text-[11px]">
                    Can I book a slot for tomorrow at 4 PM?
                  </div>
                </div>
                <div className="flex items-start justify-end gap-2">
                  <div className="p-2 rounded-lg rounded-tr-none bg-emerald-900/60 border border-emerald-500/30 text-emerald-100 max-w-[85%] text-[11px]">
                    ✨ Confirmed! Slot booked for tomorrow 4:00 PM.
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">Bot</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2 (5 Cols): Google Maps #1 Ranking */}
            <div className="mobile-snap-card md:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-sky-400/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-info badge-sm font-bold">Feature 02</span>
                  <span className="text-[11px] text-sky-400 font-bold">Local SEO</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Google Maps Search Dominance</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  Full Google Business Profile sync so your business appears #1 when nearby clients search.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0a0d14] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-6 h-6 text-sky-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">"Best Salon Near Me"</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">Rank #1 on Google Maps</div>
                  </div>
                </div>
                <div className="text-base font-extrabold text-white font-mono">4.9 ★</div>
              </div>
            </div>

            {/* Bento Card 3 (5 Cols): 100% Code Ownership */}
            <div className="mobile-snap-card md:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-indigo-400/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-primary badge-sm font-bold">Feature 03</span>
                  <span className="text-[11px] text-indigo-400 font-bold">Zero Lock-in</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">100% Code & Domain Ownership</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  You own your code and domain completely. Zero monthly software rent or surprise fees.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-lime-accent flex-shrink-0" />
                <span>Zero recurring platform subscription fees</span>
              </div>
            </div>

            {/* Bento Card 4 (7 Cols): Ultra-Fast Performance */}
            <div className="mobile-snap-card md:col-span-7 p-6 sm:p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-emerald-400/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-success badge-sm font-bold">Feature 04</span>
                  <span className="text-[11px] text-emerald-400 font-bold">Sub-Second</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">0.4s High-Speed Engine</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  FastAPI asynchronous backend with React client. Fast page load means zero bounce rate.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-lg bg-[#0a0d14] border border-white/[0.04]">
                  <div className="text-lg font-bold text-lime-accent font-mono">&lt; 0.4s</div>
                  <div className="text-[10px] text-slate-400">Load Time</div>
                </div>
                <div className="p-3 rounded-lg bg-[#0a0d14] border border-white/[0.04]">
                  <div className="text-lg font-bold text-sky-400 font-mono">100/100</div>
                  <div className="text-[10px] text-slate-400">SEO Score</div>
                </div>
                <div className="p-3 rounded-lg bg-[#0a0d14] border border-white/[0.04]">
                  <div className="text-lg font-bold text-emerald-400 font-mono">99.9%</div>
                  <div className="text-[10px] text-slate-400">Uptime SLA</div>
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
              See how we convert common offline business bottlenecks into scalable automated digital revenue channels.
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-white">{item.industry}</h3>
                    <span className={`badge ${item.badgeColor} badge-sm font-semibold text-[10px]`}>{item.metric}</span>
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
