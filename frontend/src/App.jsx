import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AiChatbotWidget from './components/AiChatbotWidget.jsx';
import WhatsAppFloating from './components/WhatsAppFloating.jsx';

// Pages
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Pricing from './pages/Pricing.jsx';
import Portfolio from './pages/Portfolio.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ReadinessTool from './pages/ReadinessTool.jsx';
import Blog from './pages/Blog.jsx';
import AdminLeads from './pages/AdminLeads.jsx';

// Scroll to top automatically on route change
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-wrapper">
        {/* Ambient Glowing Background Layer */}
        <div className="ambient-bg">
          <div className="ambient-glow-1" />
          <div className="ambient-glow-2" />
          <div className="ambient-glow-3" />
          <div className="cyber-grid" />
        </div>

        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic Route Pages */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/readiness-score" element={<ReadinessTool />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin" element={<AdminLeads />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global Floating Action Hub */}
        <div className="floating-actions-container">
          <WhatsAppFloating />
          <AiChatbotWidget />
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
