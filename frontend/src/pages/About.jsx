import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, Target, Lock, Cpu, Award, ShieldCheck, 
  Check, ArrowUpRight, Sparkles, Clock, Globe, MessageSquare 
} from 'lucide-react';

const VALUES = [
  {
    icon: Zap,
    title: 'Ultra-Fast Performance',
    desc: 'Sub-second page load times with zero bloated legacy plugins, ensuring immediate customer retention.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/25'
  },
  {
    icon: Target,
    title: 'Engineered for Conversion',
    desc: 'Bespoke WhatsApp booking pipelines, direct phone triggers, and verified Google Maps review widgets.',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/25'
  },
  {
    icon: Lock,
    title: '100% Client Ownership',
    desc: 'You hold full rights to your domain, database, and source code from day 1 with zero monthly software rent.',
    color: 'text-lime-accent',
    bg: 'bg-lime-accent/10',
    border: 'border-lime-accent/25'
  },
  {
    icon: Cpu,
    title: 'Modern Architecture',
    desc: 'Built on FastAPI Python engines, React Vite clients, and AI automation for future-proof scalability.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10',
    border: 'border-indigo-400/25'
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Local Audit',
    desc: 'We analyze your current footfall, competitors on Google Maps, and determine the optimal architecture for your tier.'
  },
  {
    step: '02',
    title: 'Bespoke UI/UX Engineering',
    desc: 'Crafting responsive mobile layouts, digital service menus, and custom interactive components matching your exact brand.'
  },
  {
    step: '03',
    title: 'FastAPI & WhatsApp Integration',
    desc: 'Developing high-speed backend routes, automated lead notification triggers, and client CMS panels.'
  },
  {
    step: '04',
    title: 'Launch, SEO & Handover',
    desc: 'Going live on enterprise CDN hosting, synchronizing Google Business Profiles, and conducting full staff handover.'
  }
];

export default function About() {
  return (
    <div className="about-page pt-28 pb-20">
      {/* Header */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-xs font-semibold uppercase tracking-wider text-lime-accent mb-6 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Mission & Architectural Vision</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Empowering Offline Businesses With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-accent via-sky-400 to-indigo-400">
              World-Class Web Engineering
            </span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            AMP Ventures was founded to bridge the digital gap for physical businesses—replacing clunky, non-converting generic templates with ultra-fast, high-converting digital storefronts.
          </p>
        </div>
      </section>

      {/* Founder Credentials Card */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="p-8 lg:p-12 rounded-3xl bg-[#111522] border border-white/[0.1] shadow-2xl backdrop-blur-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Engineering Leadership</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                  Built on Rigorous <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                    AI/ML & Networking Standards
                  </span>
                </h2>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Most web agencies deliver slow, cookie-cutter WordPress themes managed by non-technical middlemen. At AMP Ventures, every architecture is engineered from first principles.
                </p>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  Combining advanced <strong>IIT Roorkee AI/ML certification</strong> with <strong>Cisco Certified Network Associate (CCNA)</strong> enterprise infrastructure fundamentals, we engineer automated revenue engines for local salons, clinics, restaurants, and retail.
                </p>

                {/* Verified Credentials Pills */}
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-lime-accent/15 border border-lime-accent/30 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-lime-accent" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">IIT Roorkee Certified</div>
                      <div className="text-xs text-slate-400">Advanced Artificial Intelligence & Machine Learning</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-sky-400/15 border border-sky-400/30 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">Cisco Certified Network Associate (CCNA)</div>
                      <div className="text-xs text-slate-400">Enterprise Cloud Infrastructure, Routing & Cyber Security</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="lg:col-span-5 p-7 rounded-2xl bg-[#161c2c] border border-white/[0.1] shadow-xl space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-white/[0.08] pb-3">The AMP Ventures Guarantee</h3>
                
                <ul className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">95+ Google PageSpeed Guarantee</strong>
                      <span className="text-slate-400 text-xs">Zero bloated plugins slowing down mobile visitors.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">100% Code & Data Ownership</strong>
                      <span className="text-slate-400 text-xs">You hold complete control of your domain and SQLite/Postgres database.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                    <div>
                      <strong className="text-white block font-semibold mb-0.5">Direct Lead Architect Contact</strong>
                      <span className="text-slate-400 text-xs">Direct technical access—no junior ticket handlers.</span>
                    </div>
                  </li>
                </ul>

                <Link
                  to="/contact"
                  className="w-full py-3.5 rounded-xl bg-lime-accent hover:bg-lime-400 text-slate-950 font-bold text-center text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <span>Schedule Strategy Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Bento */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Core Engineering Principles</h2>
            <p className="text-slate-400 text-sm">The four pillars underlying every client deployment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((val, idx) => {
              const IconComponent = val.icon;
              return (
                <div key={idx} className="p-7 rounded-2xl bg-[#111522] border border-white/[0.08] hover:border-white/[0.18] transition-all">
                  <div className={`w-12 h-12 rounded-xl ${val.bg} ${val.border} border flex items-center justify-center mb-5`}>
                    <IconComponent className={`w-6 h-6 ${val.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Execution Process */}
      <section className="py-16 bg-[#0a0d14] border-t border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Our 4-Step Execution Workflow</h2>
            <p className="text-slate-400 text-sm">From initial consultation to live Google ranking in under 14 days.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#111522] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black font-mono text-lime-accent/80 mb-3">{s.step}</div>
                  <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
