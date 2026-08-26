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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12] mb-6">
            We Turn Offline Footfall Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-accent via-sky-400 to-indigo-400">
              Automated Digital Revenue
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            High-converting web applications, WhatsApp booking automations, and local Google SEO engineered for salons, clinics, restaurants, and retail boutiques.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link 
              to="/readiness-score" 
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-slate-950 bg-lime-accent hover:bg-lime-400 shadow-xl shadow-lime-accent/25 hover:scale-105 active:scale-95 transition-all text-base"
            >
              <span>Get Free Digital Audit</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>

            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] backdrop-blur-lg hover:scale-105 transition-all text-base"
            >
              <span>Explore 3 Tiers</span>
            </Link>

            <a 
              href="https://wa.me/919876543210?text=Hi%20AMP%20Ventures,%20I'd%20like%20to%20consult%20about%20a%20website%20for%20my%20business." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-base"
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

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Bento Card 1 (Large 7 Cols): Live WhatsApp Booking Simulator */}
            <div className="md:col-span-7 p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-lime-accent/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-accent badge-sm font-bold">Feature 01</span>
                  <span className="text-xs text-slate-500 font-mono">0.1s Trigger Time</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">1-Click WhatsApp Booking & Inquiry Engine</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                  No complex signups or forgotten passwords. Customers book slots, reserve tables, or request quotes directly on WhatsApp.
                </p>
              </div>

              {/* WhatsApp Chat Simulation Bubble */}
              <div className="p-4 rounded-xl bg-[#0a0d14] border border-white/[0.06] space-y-3 font-sans text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white">Client</div>
                  <div className="p-2.5 rounded-lg rounded-tl-none bg-[#1e2638] text-slate-200 max-w-[80%]">
                    Hi! I saw your haircuts on the website. Can I book a slot for tomorrow at 4 PM?
                  </div>
                </div>
                <div className="flex items-start justify-end gap-2.5">
                  <div className="p-2.5 rounded-lg rounded-tr-none bg-emerald-900/60 border border-emerald-500/30 text-emerald-100 max-w-[80%]">
                    ✨ Confirmed! Master Stylist Aarav is booked for you tomorrow at 4:00 PM. See you at High Street!
                  </div>
                  <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">Bot</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2 (5 Cols): Google Maps #1 Ranking */}
            <div className="md:col-span-5 p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-sky-400/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-info badge-sm font-bold">Feature 02</span>
                  <span className="text-xs text-sky-400 font-bold">Local SEO</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Google Maps Local Search Supremacy</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  Full Google Business Profile synchronization so your business appears first when nearby customers search on Maps.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0d14] border border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-sky-400" />
                  <div>
                    <div className="text-xs font-bold text-white">"Best Salon Near Me"</div>
                    <div className="text-[11px] text-emerald-400 font-semibold">Rank #1 on Google Maps</div>
                  </div>
                </div>
                <div className="text-lg font-extrabold text-white font-mono">4.9 ★</div>
              </div>
            </div>

            {/* Bento Card 3 (5 Cols): 100% Code Ownership */}
            <div className="md:col-span-5 p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-indigo-400/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-primary badge-sm font-bold">Feature 03</span>
                  <span className="text-xs text-indigo-400 font-bold">Zero Lock-in</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">100% Code & Domain Ownership</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  You own your code, domain, and database completely. No hidden monthly software rent or surprise hostage fees.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-lime-accent" />
                <span>Zero recurring platform subscription fees</span>
              </div>
            </div>

            {/* Bento Card 4 (7 Cols): Ultra-Fast Performance */}
            <div className="md:col-span-7 p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-emerald-400/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-success badge-sm font-bold">Feature 04</span>
                  <span className="text-xs text-emerald-400 font-bold">Sub-Second Speed</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">0.4s High-Performance Engine</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                  FastAPI asynchronous backend with React Vite client. Fast page load means zero customer bounce and instant conversions.
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRANSFORMATION_ITEMS.map((item, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-[#111522] border border-white/[0.08] flex flex-col justify-between hover:border-white/[0.18] transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{item.industry}</h3>
                    <span className={`badge ${item.badgeColor} badge-sm font-semibold`}>{item.metric}</span>
                  </div>

                  {/* Offline Bottleneck */}
                  <div className="mb-5 pb-5 border-b border-white/[0.06]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-2.5">
                      ✕ Offline Limitation:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-400">
                      {item.offlinePoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AMP Ventures Solution */}
                  <div className="mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2.5">
                      ✓ AMP Ventures Solution:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {item.solutionPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
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
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-400/10 border border-sky-400/20 mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              3 Clear Tiers Built For <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Every Stage</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              No bloated contracts, no confusion. Choose the exact tier that matches your business goals and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1 */}
            <div className="p-8 rounded-2xl bg-[#111522] border border-white/[0.08] flex flex-col justify-between hover:border-slate-400/40 transition-all">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tier 1 • Rapid Launch</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">Basic Website</h3>
                <p className="text-xs text-slate-400 mb-6">Fast, elegant 4–6 page web presence for local businesses establishing their first digital footprint.</p>
                
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-6">
                  <div className="text-xs text-slate-400">Starting at</div>
                  <div className="text-3xl font-extrabold text-white font-mono">₹9,999</div>
                  <div className="text-[11px] text-slate-400 mt-1">⏱️ 5–7 Days Delivery</div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> 4–6 Responsive Pages</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Google Business Profile Sync</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Instant Contact Form to Email</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Free SSL & Fast CDN Hosting</li>
                </ul>
              </div>

              <Link to="/contact?tier=tier1" className="w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-bold text-white text-center border border-white/[0.12] transition-all">
                Get Tier 1 Quote
              </Link>
            </div>

            {/* Tier 2 (Featured) */}
            <div className="p-8 rounded-2xl bg-[#151a26] border-2 border-sky-400/50 shadow-xl shadow-sky-500/10 flex flex-col justify-between relative transform lg:-translate-y-2">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-sky-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                ⭐ Most Popular for Local Growth
              </div>

              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Tier 2 • Full Control</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">Premium + Custom CMS</h3>
                <p className="text-xs text-slate-400 mb-6">Dynamic web app with client CMS to update menus, rates, photos, plus live Google reviews.</p>
                
                <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 mb-6">
                  <div className="text-xs text-slate-400">Starting at</div>
                  <div className="text-3xl font-extrabold text-sky-400 font-mono">₹24,999</div>
                  <div className="text-[11px] text-slate-300 mt-1">⏱️ 10–12 Days Delivery</div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-200 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-400 font-bold" /> Everything in Tier 1</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-400 font-bold" /> Lightweight Custom Admin CMS</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-400 font-bold" /> Google Reviews Live Widget</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-sky-400 font-bold" /> Direct WhatsApp Lead Pipeline</li>
                </ul>
              </div>

              <Link to="/contact?tier=tier2" className="w-full py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 text-xs font-bold text-center shadow-lg transition-all">
                Get Tier 2 Quote
              </Link>
            </div>

            {/* Tier 3 */}
            <div className="p-8 rounded-2xl bg-[#111522] border border-white/[0.08] flex flex-col justify-between hover:border-lime-accent/40 transition-all">
              <div>
                <span className="text-xs font-bold text-lime-accent uppercase tracking-wider">Tier 3 • Market Leader</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">3D WebGL & AI Automated</h3>
                <p className="text-xs text-slate-400 mb-6">Immersive 3D interactive hero, automated AI chatbot, and WhatsApp Business API integration.</p>
                
                <div className="p-4 rounded-xl bg-lime-400/10 border border-lime-400/20 mb-6">
                  <div className="text-xs text-slate-400">Starting at</div>
                  <div className="text-3xl font-extrabold text-lime-accent font-mono">₹49,999</div>
                  <div className="text-[11px] text-slate-400 mt-1">⏱️ 14–18 Days Delivery</div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Everything in Tier 2</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Interactive 3D WebGL Showcase</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Custom AI Chatbot Assistant</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-lime-accent" /> Dedicated Lead Technical Architect</li>
                </ul>
              </div>

              <Link to="/contact?tier=tier3" className="w-full py-3 rounded-xl bg-lime-accent hover:bg-lime-400 text-slate-950 text-xs font-bold text-center shadow-lg transition-all">
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
