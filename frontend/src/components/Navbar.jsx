import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Menu, X, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../apiConfig';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar-themed fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-xl border-b">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        
        {/* Brand Monogram & Name */}
        <Link to="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-primary to-lime-accent/80 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[10px] flex items-center justify-center transition-colors bg-[#0e1118]">
              <Sparkles className="w-5 h-5 text-lime-accent transition-transform group-hover:rotate-12" />
            </div>
          </div>
          <div>
            <div className="font-extrabold text-lg tracking-tight flex items-center gap-1.5 transition-colors text-white">
              <span>AMP</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">VENTURES</span>
            </div>
            <div className="text-[11px] font-medium tracking-wider uppercase transition-colors text-slate-400">
              <span>Web Development Agency</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1 list-none p-0 m-0">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-white bg-white/[0.08] shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              Blogs
            </NavLink>
          </li>
        </ul>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <Link 
            to="/readiness-score" 
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all text-sky-400 bg-sky-400/10 border border-sky-400/25 hover:bg-sky-400/20"
          >
            <span>Free Audit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-slate-900 bg-lime-accent hover:bg-lime-400 shadow-lg shadow-lime-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <button 
            className="md:hidden p-2 rounded-lg transition-colors border text-slate-300 hover:text-white bg-white/[0.05] border-white/[0.08]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-2xl border-b px-6 py-6 flex flex-col gap-3 transition-colors bg-[#0e1118]/95 border-white/[0.08]">
          <Link 
            to="/" 
            className="font-medium py-2 border-b flex justify-between items-center text-slate-200 border-white/[0.05]"
          >
            Home <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link 
            to="/about" 
            className="font-medium py-2 border-b flex justify-between items-center text-slate-200 border-white/[0.05]"
          >
            About <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link 
            to="/services" 
            className="font-medium py-2 border-b flex justify-between items-center text-slate-200 border-white/[0.05]"
          >
            Services <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link 
            to="/pricing" 
            className="font-medium py-2 border-b flex justify-between items-center text-slate-200 border-white/[0.05]"
          >
            Pricing & Plans <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link 
            to="/blog" 
            className="font-medium py-2 border-b flex justify-between items-center text-slate-200 border-white/[0.05]"
          >
            Blogs <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link 
            to="/readiness-score" 
            className="font-medium py-2 border-b flex justify-between items-center text-sky-400 border-white/[0.05]"
          >
            Free Digital Audit Tool <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/admin" 
            className="font-medium py-2 border-b flex justify-between items-center text-amber-400 border-white/[0.05]"
          >
            Admin Lead Portal <ArrowUpRight className="w-4 h-4" />
          </Link>
          
          <div className="pt-3 flex flex-col gap-2.5">
            <Link to="/contact" className="w-full py-3 rounded-xl bg-lime-accent text-slate-950 font-bold text-center text-sm shadow-md">
              Start Your Project
            </Link>
            <a 
              href={getWhatsAppUrl("Hi AMP Ventures, I would like to discuss taking my business online.")} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-3 rounded-xl font-semibold text-center text-sm flex items-center justify-center gap-2 border bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
