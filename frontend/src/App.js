import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import Home from '@/pages/Home';
import About from '@/pages/About';
import MaritimeServices from '@/pages/MaritimeServices';
import LogisticsServices from '@/pages/LogisticsServices';
import VesselChartering from '@/pages/VesselChartering';
import VesselBrokerage from '@/pages/VesselBrokerage';
import PortAgency from '@/pages/PortAgency';
import PortsRegions from '@/pages/PortsRegions';
import Projects from '@/pages/Projects';
import Investors from '@/pages/Investors';
import News from '@/pages/News';
import NewsArticle from '@/pages/NewsArticle';
import Contact from '@/pages/Contact';
import Admin from '@/pages/Admin';
import { ScrollProgress } from '@/components/ui-extras/ScrollProgress';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/maritime-services" element={<MaritimeServices />} />
          <Route path="/logistics-services" element={<LogisticsServices />} />
          <Route path="/vessel-chartering" element={<VesselChartering />} />
          <Route path="/vessel-brokerage" element={<VesselBrokerage />} />
          <Route path="/port-agency-husbandry" element={<PortAgency />} />
          <Route path="/ports-regions" element={<PortsRegions />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgress />
        <AnimatedRoutes />
        <Toaster richColors position="top-right" closeButton theme="light" />
      </BrowserRouter>
    </div>
  );
}
