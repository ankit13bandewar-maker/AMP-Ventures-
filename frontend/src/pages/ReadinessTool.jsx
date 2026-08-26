import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, AlertTriangle, ArrowUpRight, 
  MessageSquare, Activity, Check, RefreshCw 
} from 'lucide-react';
import { getApiUrl, getWhatsAppUrl } from '../apiConfig';

const INDUSTRIES = [
  'Salon & Luxury Spa',
  'Restaurant & Cafe',
  'Clinic & Dental Center',
  'Retail Store & Boutique',
  'Gym & Fitness Studio',
  'Other Local Service'
];

export default function ReadinessTool() {
  const [form, setForm] = useState({
    business_name: '',
    city: '',
    industry: 'Salon & Luxury Spa',
    has_website: false,
    has_google_maps: false,
    has_social: false,
    accepts_online_booking: false,
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAudit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(getApiUrl('/api/readiness-score'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        throw new Error("Audit service error");
      }
    } catch (err) {
      // Local calculation fallback
      let score = 15;
      const checklist = [];

      if (form.has_website) {
        score += 30;
        checklist.push({
          item: 'Existing Website Online',
          status: 'optimal',
          impact: 'High',
          description: 'Your business has a web presence, but modern mobile conversion architecture can 3x your lead count.'
        });
      } else {
        checklist.push({
          item: 'Professional Web Presence',
          status: 'missing',
          impact: 'Critical',
          description: 'Over 80% of local customers search online before visiting. You are losing customers directly to competitors.'
        });
      }

      if (form.has_google_maps) {
        score += 25;
        checklist.push({
          item: 'Google Maps Local Listing',
          status: 'optimal',
          impact: 'High',
          description: 'Map listing active. Linking high-speed website and customer review widgets will push you to #1 spot.'
        });
      } else {
        checklist.push({
          item: 'Google Business Profile & 5-Star Reviews',
          status: 'missing',
          impact: 'Critical',
          description: 'You are missing out on local "near me" map search rankings in ' + (form.city || 'your city') + '.'
        });
      }

      if (form.accepts_online_booking) {
        score += 20;
        checklist.push({
          item: 'Online Booking & Ordering',
          status: 'optimal',
          impact: 'Medium',
          description: 'Digital orders/bookings active. Automating via WhatsApp Business API can reduce no-shows to near 0%.'
        });
      } else {
        checklist.push({
          item: 'Automated Online Booking & Catalog',
          status: 'missing',
          impact: 'High',
          description: 'Relying only on manual phone calls loses after-hours bookings and creates bottleneck rush hours.'
        });
      }

      if (form.has_social) {
        score += 10;
        checklist.push({
          item: 'Social Media Engagement',
          status: 'optimal',
          impact: 'Medium',
          description: 'Instagram/Facebook active. Connecting bio link directly to your high-converting website converts followers to paid clients.'
        });
      } else {
        checklist.push({
          item: 'Social Media to Website Funnel',
          status: 'missing',
          impact: 'Medium',
          description: 'Zero social conversion pipeline. You need verified photo showcases and instant booking triggers.'
        });
      }

      const recTier = score < 40 ? 'Tier 1 — Basic Website (₹9,999)' : score < 70 ? 'Tier 2 — Premium + CMS (₹24,999)' : 'Tier 3 — 3D & AI Automation (₹49,999)';
      const level = score < 40 ? 'Low Digital Maturity (High Risk of Losing Local Footfall)' : score < 70 ? 'Moderate Digital Maturity (Significant Untapped Revenue)' : 'High Digital Maturity (Optimization Stage)';

      setResult({
        score,
        level,
        summary: `Your business has scored ${score}/100 in digital readiness. There are immediate opportunities to increase monthly bookings by establishing a dedicated WhatsApp & SEO pipeline.`,
        potential_revenue_boost: '+35% to +60% within 90 days',
        checklist,
        recommended_tier: recTier,
        recommended_tier_reason: 'Based on your current setup, upgrading with this tier provides the maximum ROI by eliminating your identified gaps.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="readiness-tool-page pt-28 pb-20">
      {/* Header */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-xs font-semibold uppercase tracking-wider text-sky-400 mb-6 shadow-inner">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Engine</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Free Digital Readiness <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-lime-accent">
              & Revenue Gap Audit
            </span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Take this 60-second diagnostic to calculate your online maturity score, identify lost revenue bottlenecks, and discover your optimal growth tier.
          </p>
        </div>
      </section>

      {/* Main Audit Box */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {!result ? (
            <div className="p-8 lg:p-10 rounded-3xl bg-[#111522] border border-white/[0.1] shadow-2xl backdrop-blur-2xl">
              <form onSubmit={handleAudit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Business Name *</label>
                    <input 
                      type="text" 
                      name="business_name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-sky-400 focus:outline-none transition-colors"
                      placeholder="e.g. Luxe Glow Salon"
                      value={form.business_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">City / Location *</label>
                    <input 
                      type="text" 
                      name="city"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-sky-400 focus:outline-none transition-colors"
                      placeholder="e.g. Bengaluru"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Industry Sector</label>
                  <select 
                    name="industry"
                    className="w-full px-4 py-3 rounded-xl bg-[#0e1118] border border-white/[0.1] text-white text-sm focus:border-sky-400 focus:outline-none transition-colors"
                    value={form.industry}
                    onChange={handleChange}
                  >
                    {INDUSTRIES.map((ind, idx) => (
                      <option key={idx} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Audit Checklist Checkboxes */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300">Current Setup (Select all that apply):</div>

                  <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-slate-300">
                    <input 
                      type="checkbox" 
                      name="has_website"
                      checked={form.has_website}
                      onChange={handleChange}
                      className="checkbox checkbox-accent checkbox-sm rounded-md"
                    />
                    <span>We currently have an active company website</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-slate-300">
                    <input 
                      type="checkbox" 
                      name="has_google_maps"
                      checked={form.has_google_maps}
                      onChange={handleChange}
                      className="checkbox checkbox-accent checkbox-sm rounded-md"
                    />
                    <span>We have a verified Google Business Profile / Google Maps listing</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-slate-300">
                    <input 
                      type="checkbox" 
                      name="accepts_online_booking"
                      checked={form.accepts_online_booking}
                      onChange={handleChange}
                      className="checkbox checkbox-accent checkbox-sm rounded-md"
                    />
                    <span>Customers can book slots or order online (not just manual phone calls)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-slate-300">
                    <input 
                      type="checkbox" 
                      name="has_social"
                      checked={form.has_social}
                      onChange={handleChange}
                      className="checkbox checkbox-accent checkbox-sm rounded-md"
                    />
                    <span>We actively post on Instagram / Facebook</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email (For report copy)</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-sky-400 focus:outline-none transition-colors"
                      placeholder="owner@business.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">WhatsApp Number (Optional)</label>
                    <input 
                      type="tel" 
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-sm focus:border-sky-400 focus:outline-none transition-colors"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl bg-lime-accent hover:bg-lime-400 text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Analyzing Digital Architecture...' : 'Generate Instant Diagnostic Score'}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* Result Screen */
            <div className="p-8 lg:p-10 rounded-3xl bg-[#111522] border border-white/[0.1] shadow-2xl backdrop-blur-2xl space-y-8">
              <div className="text-center">
                <span className="badge badge-info badge-sm font-bold uppercase tracking-wider mb-2">Diagnostic Complete</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Digital Maturity Audit</h2>
                <p className="text-xs text-slate-400 mt-1">For: <strong className="text-white">{form.business_name}</strong> ({form.city})</p>
              </div>

              {/* Score Box */}
              <div className="p-6 rounded-2xl bg-[#151a26] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="w-24 h-24 rounded-2xl bg-[#0a0d14] border-2 border-lime-accent/40 flex flex-col items-center justify-center flex-shrink-0">
                  <div className={`text-3xl font-black font-mono ${result.score > 70 ? 'text-emerald-400' : result.score > 40 ? 'text-amber-400' : 'text-rose-400'}`}>
                    {result.score}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">/ 100</div>
                </div>

                <div className="space-y-1.5 flex-grow">
                  <div className="text-sm font-bold text-white">{result.level}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{result.summary}</p>
                  <div className="pt-2 flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Estimated Revenue Opportunity:</span>
                    <span className="badge badge-accent badge-sm font-bold">{result.potential_revenue_boost}</span>
                  </div>
                </div>
              </div>

              {/* Actionable Gap Checklist */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Identified Growth Gaps & Action Items:</h3>
                
                <div className="space-y-2.5">
                  {result.checklist.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3.5">
                      {item.status === 'optimal' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-grow">
                        <div className="flex justify-between items-center mb-1">
                          <strong className="text-xs font-bold text-white">{item.item}</strong>
                          <span className={`badge ${item.status === 'optimal' ? 'badge-success' : 'badge-warning'} badge-xs font-semibold`}>
                            {item.impact} Impact
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Solution Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-[#121624] border border-indigo-500/30 space-y-4">
                <span className="badge badge-primary badge-sm font-bold uppercase tracking-wider">Recommended Setup</span>
                <h4 className="text-lg font-bold text-white">{result.recommended_tier}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{result.recommended_tier_reason}</p>
                
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link to="/contact" className="px-5 py-2.5 rounded-xl bg-lime-accent text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5">
                    <span>Fix These Gaps With Us</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <a 
                    href={getWhatsAppUrl(`Hi AMP Ventures, I got a score of ${result.score}/100 for ${form.business_name} and want to improve it.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Strategy Chat</span>
                  </a>
                </div>
              </div>

              <div className="text-center pt-2">
                <button 
                  onClick={() => setResult(null)} 
                  className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 font-medium"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Audit Another Business</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
