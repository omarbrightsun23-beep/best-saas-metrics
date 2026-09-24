'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SUB_NICHES, AUTHOR_DATA } from './data/niches';
import { FinancialInputs, SubNicheData } from './types';
import { calculateMetrics, generateCashflowTrajectory } from './utils/financialMath';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import CalculatorControlPanel from './components/CalculatorControlPanel';
import ResultsDashboard from './components/ResultsDashboard';
import UtilityActions from './components/UtilityActions';
import EditorialNicheContent from './components/EditorialNicheContent';
import AuthorTrustBlock from './components/AuthorTrustBlock';
import CitationSection from './components/CitationSection';
import SchemaJsonLd from './components/SchemaJsonLd';
import CompareScenarioModal from './components/CompareScenarioModal';
import LegalAndStaticPagesModal, { PageTabType } from './components/LegalAndStaticPagesModal';
import Toast, { ToastMessage } from './components/Toast';
import Footer from './components/Footer';
import AdBannerSlot from './components/AdBannerSlot';
import SemanticFormulasAndGlossary from './components/SemanticFormulasAndGlossary';

export default function App() {
  // 1. Initial State Resolution (URL Params -> LocalStorage -> Default Niche)
  const [selectedNiche, setSelectedNiche] = useState<SubNicheData>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const nicheSlug = urlParams.get('niche') || window.location.pathname.replace(/^\//, '');
      const found = SUB_NICHES.find((n) => n.slug === nicheSlug);
      if (found) return found;
    }
    return SUB_NICHES[0];
  });

  const [inputs, setInputs] = useState<FinancialInputs>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const cacParam = urlParams.get('cac');
      const arpaParam = urlParams.get('arpa');
      const marginParam = urlParams.get('margin');
      const churnParam = urlParams.get('churn');
      const cycleParam = urlParams.get('cycle');
      if (cacParam || arpaParam || marginParam || churnParam) {
        return {
          cac: Number(cacParam) || SUB_NICHES[0].defaults.cac,
          arpa: Number(arpaParam) || SUB_NICHES[0].defaults.arpa,
          grossMargin: Number(marginParam) || SUB_NICHES[0].defaults.grossMargin,
          churnRate: Number(churnParam) || SUB_NICHES[0].defaults.churnRate,
          salesCycle: Number(cycleParam) || SUB_NICHES[0].defaults.salesCycle,
        };
      }
      // Check LocalStorage fallback
      try {
        const saved = localStorage.getItem('saas_calc_user_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.inputs) return parsed.inputs;
        }
      } catch (e) {
        // Fall back to default
      }
    }
    return SUB_NICHES[0].defaults;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [activePageModal, setActivePageModal] = useState<PageTabType | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#terms' || hash === '#terms-and-conditions') return 'terms';
      if (hash === '#privacy' || hash === '#privacy-policy') return 'privacy';
      if (hash === '#disclaimer' || hash === '#legal-disclaimer') return 'disclaimer';
      if (hash === '#contact' || hash === '#contact-us') return 'contact';
      if (hash === '#sitemap' || hash === '#site-map') return 'sitemap';
    }
    return null;
  });

  // Listen to hash changes for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#terms' || hash === '#terms-and-conditions') setActivePageModal('terms');
      else if (hash === '#privacy' || hash === '#privacy-policy') setActivePageModal('privacy');
      else if (hash === '#disclaimer' || hash === '#legal-disclaimer') setActivePageModal('disclaimer');
      else if (hash === '#contact' || hash === '#contact-us') setActivePageModal('contact');
      else if (hash === '#sitemap' || hash === '#site-map') setActivePageModal('sitemap');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Toast Helpers
  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 2. Computed Metrics and Cashflow Curves
  const metrics = useMemo(() => calculateMetrics(inputs), [inputs]);
  const cashflowData = useMemo(() => generateCashflowTrajectory(inputs), [inputs]);

  // 3. Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'saas_calc_user_data',
        JSON.stringify({
          inputs,
          nicheSlug: selectedNiche.slug,
          savedAt: new Date().toISOString(),
        })
      );
    } catch (e) {
      // ignore
    }
  }, [inputs, selectedNiche]);

  // 4. Browser history (popstate) synchronization for clean URLs
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === 'undefined') return;
      const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '');
      const urlParams = new URLSearchParams(window.location.search);
      const targetSlug = cleanPath || urlParams.get('niche') || SUB_NICHES[0].slug;
      const match = SUB_NICHES.find((n) => n.slug === targetSlug);
      if (match) {
        setSelectedNiche(match);
        setInputs(match.defaults);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Niche Selection with clean URL routing
  const handleSelectNiche = (niche: SubNicheData) => {
    setSelectedNiche(niche);
    setInputs(niche.defaults);
    addToast({
      type: 'info',
      message: `Loaded ${niche.name} benchmark preset assumptions.`,
    });
    const newPath = `/${niche.slug}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ nicheSlug: niche.slug }, '', newPath);
    }
  };

  const handleResetToNiche = () => {
    setInputs(selectedNiche.defaults);
    addToast({
      type: 'info',
      message: `Reset inputs to ${selectedNiche.name} default values.`,
    });
  };

  const handleOpenPageModal = (page: PageTabType) => {
    setActivePageModal(page);
    window.location.hash = `#${page}`;
  };

  const handleClosePageModal = () => {
    setActivePageModal(null);
    if (window.location.hash) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#4F46E5] selection:text-white flex flex-col">
      {/* Google E-E-A-T and JSON-LD Schema */}
      <SchemaJsonLd niche={selectedNiche} author={AUTHOR_DATA} />

      {/* Header Navigation */}
      <HeaderNav
        selectedNiche={selectedNiche}
        onSelectNiche={handleSelectNiche}
        onOpenPage={handleOpenPageModal}
      />

      {/* Left & Right Ultra-Wide Desktop Gutter Skyscraper Ads */}

      {/* Hero Section */}
      <HeroSection selectedNiche={selectedNiche} onSelectNiche={handleSelectNiche} />

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-4 sm:space-y-6 flex-1 w-full">
        {/* Utility Actions Bar */}
        <UtilityActions
          inputs={inputs}
          metrics={metrics}
          selectedNiche={selectedNiche}
          onAddToast={addToast}
          onOpenCompare={() => setIsCompareOpen(true)}
        />

        {/* Two-Column Interactive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Pane: Control Panel */}
          <div className="lg:col-span-6 space-y-6">
            <CalculatorControlPanel
              inputs={inputs}
              onChange={setInputs}
              selectedNiche={selectedNiche}
              onResetToNiche={handleResetToNiche}
            />
          </div>

          {/* Right Pane: Results Dashboard & Trajectory Chart */}
          <div className="lg:col-span-6 space-y-6">
            <ResultsDashboard
              metrics={metrics}
              inputs={inputs}
              selectedNiche={selectedNiche}
              cashflowData={cashflowData}
            />
          </div>
        </div>

        {/* Phase 2: Programmatic Editorial Niche Content */}
        <EditorialNicheContent
          niche={selectedNiche}
          inputs={inputs}
          metrics={metrics}
          onSelectNiche={handleSelectNiche}
        />

        {/* Google AdSense Compliant Banner Slot */}
        <AdBannerSlot slotId="bottom-content-ad-slot" format="horizontal" />

        {/* Semantic Formulas, GAAP Accounting Standards & Entity Definitions */}
        <SemanticFormulasAndGlossary
          niche={selectedNiche}
          inputs={inputs}
          metrics={metrics}
        />

        {/* Phase 3: E-E-A-T Author & Reviewer Box */}
        <AuthorTrustBlock author={AUTHOR_DATA} />

        {/* Phase 3: Authoritative Citations & GAAP References */}
        <CitationSection />
      </main>

      {/* Interactive Scenario Comparison Modal */}
      <CompareScenarioModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        currentInputs={inputs}
        currentMetrics={metrics}
        selectedNiche={selectedNiche}
        onApplyScenarioB={(newInputs) => {
          setInputs(newInputs);
          addToast({
            type: 'success',
            message: 'Applied optimized target scenario to active calculator.',
          });
        }}
      />


      {/* Mandatory Pages Modal (Terms & Conditions, Privacy Policy, Contact Us, Site Map) */}
      <LegalAndStaticPagesModal
        isOpen={activePageModal !== null}
        activeTab={activePageModal || 'contact'}
        onClose={handleClosePageModal}
        onSelectTab={(tab) => {
          setActivePageModal(tab);
          window.location.hash = `#${tab}`;
        }}
        onSelectNiche={handleSelectNiche}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Footer */}
      <Footer
        onSelectNiche={handleSelectNiche}
        onOpenPage={handleOpenPageModal}
      />
    </div>
  );
}
