import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  RefreshCw, Search, Users, Activity, Database, 
  Phone, Mail, FileSpreadsheet, ShieldCheck 
} from 'lucide-react';
import { getApiUrl } from '../apiConfig';

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [readinessChecks, setReadinessChecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Leads
      const leadsRes = await fetch(getApiUrl('/api/leads'));
      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }

      // Fetch Readiness Checks
      const readRes = await fetch(getApiUrl('/api/readiness-score'));
      if (readRes.ok) {
        const readData = await readRes.json();
        setReadinessChecks(readData.checks || []);
      }
    } catch (err) {
      console.warn("Using sample mock leads for offline demonstration", err);
      setLeads([
        {
          id: 101,
          name: "Rajesh Verma",
          business_name: "Verma Dental Clinic",
          email: "rajesh@vermadental.com",
          phone: "+91 98765 12345",
          tier: "Tier 2 - Premium (CMS & Reviews)",
          budget: "₹25,000 - ₹35,000",
          message: "Need online patient appointment booking and Google review sync.",
          status: "New",
          created_at: new Date().toISOString()
        },
        {
          id: 102,
          name: "Pooja Malhotra",
          business_name: "Glow & Shine Luxury Salon",
          email: "pooja@glowshine.in",
          phone: "+91 98111 22334",
          tier: "Tier 3 - Premium Plus (3D & Automation)",
          budget: "₹50,000+",
          message: "Interested in 3D salon showcase and WhatsApp automated appointment confirmations.",
          status: "Contacted",
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredLeads = leads.filter(l => 
    l.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.tier?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Internal Lead Operations</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Lead Intelligence & CRM</h1>
            <p className="text-xs text-slate-400 mt-1">Live SQLite database records captured across web forms & diagnostic tools.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href={getApiUrl('/api/leads/export.csv')} 
              className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold border border-white/[0.08] flex items-center gap-2 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </a>
            <button 
              onClick={fetchData} 
              className="px-4 py-2.5 rounded-xl bg-lime-accent text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md hover:bg-lime-400 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="p-6 rounded-2xl bg-[#111522] border border-white/[0.08]">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between mb-2">
              <span>Total Captured Leads</span>
              <Users className="w-4 h-4 text-lime-accent" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{leads.length}</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111522] border border-white/[0.08]">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between mb-2">
              <span>Audits Completed</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">{readinessChecks.length}</div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111522] border border-white/[0.08]">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between mb-2">
              <span>Database Engine</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-2 mt-2 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>SQLite Active</span>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'leads' ? 'bg-white/[0.12] text-white shadow-sm' : 'bg-white/[0.03] text-slate-400 hover:text-white'}`}
              onClick={() => setActiveTab('leads')}
            >
              Project Inquiries ({leads.length})
            </button>
            <button 
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'audits' ? 'bg-white/[0.12] text-white shadow-sm' : 'bg-white/[0.03] text-slate-400 hover:text-white'}`}
              onClick={() => setActiveTab('audits')}
            >
              Readiness Audits ({readinessChecks.length})
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by business, name, or tier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 w-full sm:w-72"
            />
          </div>
        </div>

        {/* Leads Table */}
        {activeTab === 'leads' && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#111522] overflow-x-auto">
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No lead inquiries recorded yet. Submit one via the <Link to="/contact" className="text-lime-accent underline">Contact Page</Link>.
              </div>
            ) : (
              <table className="table w-full text-xs">
                <thead className="bg-[#0a0d14] text-slate-400 font-bold border-b border-white/[0.08]">
                  <tr>
                    <th className="py-4 px-6 text-left">ID</th>
                    <th className="py-4 px-6 text-left">Business & Contact</th>
                    <th className="py-4 px-6 text-left">Selected Tier</th>
                    <th className="py-4 px-6 text-left">Budget & Notes</th>
                    <th className="py-4 px-6 text-left">Status</th>
                    <th className="py-4 px-6 text-center">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-6 font-mono text-lime-accent font-bold">#{lead.id}</td>
                      <td className="py-3.5 px-6">
                        <strong className="text-white block text-sm">{lead.business_name}</strong>
                        <span className="text-slate-400 text-[11px]">{lead.name} • {lead.phone}</span>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="badge badge-info badge-sm font-semibold">{lead.tier}</span>
                      </td>
                      <td className="py-3.5 px-6 max-w-xs">
                        <div className="text-slate-300 font-medium">{lead.budget}</div>
                        <div className="text-slate-400 text-[11px] truncate">{lead.message || 'No specific notes'}</div>
                      </td>
                      <td className="py-3.5 px-6">
                        <span className={`badge ${lead.status === 'New' ? 'badge-accent' : 'badge-ghost'} badge-xs font-bold`}>
                          {lead.status || 'New'}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <a 
                          href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20this%20is%20AMP%20Ventures%20regarding%20your%20website%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-[11px] inline-flex items-center gap-1 hover:bg-emerald-500/25"
                        >
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Readiness Audits Table */}
        {activeTab === 'audits' && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#111522] p-8 text-center text-xs text-slate-400">
            {readinessChecks.length === 0 ? (
              <span>No completed readiness checks logged yet. Take one on the <Link to="/readiness-score" className="text-sky-400 underline">Audit Page</Link>.</span>
            ) : (
              <span>{readinessChecks.length} audits logged in backend.</span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
