import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      let leadsRes;
      try {
        leadsRes = await fetch('http://127.0.0.1:8000/api/leads');
      } catch {
        leadsRes = await fetch('/api/leads');
      }

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }

      // Fetch Readiness Checks
      let readRes;
      try {
        readRes = await fetch('http://127.0.0.1:8000/api/readiness-score');
      } catch {
        readRes = await fetch('/api/readiness-score');
      }

      if (readRes.ok) {
        const readData = await readRes.json();
        setReadinessChecks(readData.checks || []);
      }
    } catch (err) {
      console.warn("Using sample mock leads for offline demonstration", err);
      // Sample mock data for instant preview if backend is standalone
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
    <div className="admin-page">
      {/* Header */}
      <section className="section-padding" style={{ paddingTop: '3.5rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div className="section-tag">Internal Lead Operations</div>
              <h1 style={{ fontSize: '2.2rem' }}>AMP Ventures <span className="text-gradient">Lead Intelligence</span></h1>
              <p style={{ color: 'var(--text-secondary)' }}>Live SQLite database records captured across web forms & diagnostic tools.</p>
            </div>
            <button onClick={fetchData} className="btn btn-secondary btn-sm">
              🔄 Refresh Records
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Inbound Leads</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{leads.length}</div>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audits Completed</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--secondary)' }}>{readinessChecks.length}</div>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Database Backend</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.4rem' }}>SQLite Active</div>
            </div>
          </div>

          {/* Tabs & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                className={`filter-btn ${activeTab === 'leads' ? 'active' : ''}`}
                onClick={() => setActiveTab('leads')}
              >
                Project Inquiries ({leads.length})
              </button>
              <button 
                className={`filter-btn ${activeTab === 'audits' ? 'active' : ''}`}
                onClick={() => setActiveTab('audits')}
              >
                Readiness Score Checks ({readinessChecks.length})
              </button>
            </div>

            <input 
              type="text" 
              placeholder="Search by business, name, or tier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ maxWidth: '320px', padding: '0.5rem 1rem' }}
            />
          </div>

          {/* Leads Table */}
          {activeTab === 'leads' && (
            <div className="glass-card" style={{ overflowX: 'auto', padding: '1rem' }}>
              {filteredLeads.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No lead inquiries recorded yet. Submit one via the <Link to="/contact" style={{ color: 'var(--primary-light)' }}>Contact Page</Link>.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>ID</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Business & Contact</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tier Selected</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Budget / Message</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Status</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--primary-light)' }}>
                          #{lead.id}
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{lead.business_name}</strong>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lead.name} • {lead.phone}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lead.email}</div>
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <span className="badge badge-indigo">{lead.tier}</span>
                        </td>
                        <td style={{ padding: '0.85rem', maxWidth: '280px' }}>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Budget: {lead.budget}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {lead.message || 'No specific notes'}
                          </div>
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <span className="badge badge-emerald">{lead.status || 'New'}</span>
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <a 
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20this%20is%20AMP%20Ventures%20regarding%20your%20inquiry%20for%20${encodeURIComponent(lead.business_name)}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-whatsapp btn-sm"
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                            >
                              WhatsApp
                            </a>
                            <a 
                              href={`mailto:${lead.email}?subject=AMP%20Ventures%20Proposal%20for%20${encodeURIComponent(lead.business_name)}`}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem' }}
                            >
                              Email
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Readiness Checks Tab */}
          {activeTab === 'audits' && (
            <div className="glass-card" style={{ overflowX: 'auto', padding: '1rem' }}>
              {readinessChecks.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No readiness audits submitted yet.
                </div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>ID</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Business & City</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Industry</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Score</th>
                      <th style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Website Present?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {readinessChecks.map((chk) => (
                      <tr key={chk.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.85rem', fontFamily: 'var(--font-mono)' }}>#{chk.id}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <strong style={{ color: '#fff' }}>{chk.business_name}</strong>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{chk.city}</div>
                        </td>
                        <td style={{ padding: '0.85rem' }}>{chk.industry}</td>
                        <td style={{ padding: '0.85rem' }}>
                          <span className={`badge ${chk.score > 70 ? 'badge-emerald' : chk.score > 40 ? 'badge-amber' : 'badge-indigo'}`}>
                            {chk.score} / 100
                          </span>
                        </td>
                        <td style={{ padding: '0.85rem' }}>
                          {chk.has_website ? '✅ Yes' : '❌ No Website'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
