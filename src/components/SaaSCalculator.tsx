'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SUB_NICHES, AUTHOR_DATA } from '../data/niches';
import { FinancialInputs, SubNicheData } from '../types';
import { calculateMetrics, generateCashflowTrajectory } from '../utils/financialMath';
import HeaderNav from './HeaderNav';
import HeroSection from './HeroSection';
import CalculatorControlPanel from './CalculatorControlPanel';
import ResultsDashboard from './ResultsDashboard';
import UtilityActions from './UtilityActions';
import EditorialNicheContent from './EditorialNicheContent';
import AuthorTrustBlock from './AuthorTrustBlock';
import CitationSection from './CitationSection';
import CompareScenarioModal from './CompareScenarioModal';
import VercelConfigModal from './VercelConfigModal';
import LegalAndStaticPagesModal, { PageTabType } from './LegalAndStaticPagesModal';
import Toast, { ToastMessage } from './Toast';
import Footer from './Footer';
import AdBannerSlot from './AdBannerSlot';
import SemanticFormulasAndGlossary from './SemanticFormulasAndGlossary';

interface SaaSCalculatorProps {
  initialNicheSlug?: string;
  isNextRouter?: boolean;
}

export default function SaaSCalculator({
  initialNicheSlug,
  isNextRouter = false,
}: SaaSCalculatorProps) {
  // 1. Initial State Resolution
  const [selectedNiche, setSelectedNiche] = useState<SubNicheData>(() => {
    if (initialNicheSlug) {
      const match = SUB_NICHES.find((n) => n.slug === initialNicheSlug);
      if (match) return match;
    }
    if (typeof window !== 'undefined') {
      const pathSlug = window.location.pathname.replace(/^\/|\/$/g, '');
      const urlParams = new URLSearchParams(window.location.search);
      const targetSlug = pathSlug || urlParams.get('niche') || SUB_NICHES[0].slug;
      const found = SUB_NICHES.find((n) => n.slug === targetSlug);
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
          cac: Number(cacParam) || selectedNiche.defaults.cac,
          arpa: Number(arpaParam) || selectedNiche.defaults.arpa,
          grossMargin: Number(marginParam) || selectedNiche.defaults.grossMargin,
          churnRate: Number(churnParam) || selectedNiche.defaults.churnRate,
          salesCycle: Number(cycleParam) || selectedNiche.defaults.salesCycle,
        };
      }
      try {
        const saved = localStorage.getItem('saas_calc_user_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.inputs) return parsed.inputs;
        }
      } catch (e) {
        // Safe localStorage ignore
      }
    }
    return selectedNiche.defaults;
  });

  // Sync state if initialNicheSlug prop changes
  useEffect(() => {
    if (initialNicheSlug) {
      const match = SUB_NICHES.find((n) => n.slug === initialNicheSlug);
      if (match && match.slug !== selectedNiche.slug) {
        setSelectedNiche(match);
        setInputs(match.defaults);
      }
    }
  }, [initialNicheSlug, selectedNiche.slug]);

  // Modals & Navigation state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isVercelModalOpen, setIsVercelModalOpen] = useState(false);
  const [activePageModal, setActivePageModal] = useState<PageTabType | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // 2. Perform Calculations
  const metrics = useMemo(() => calculateMetrics(inputs), [inputs]);
  const cashflowData = useMemo(
    () => generateCashflowTrajectory(inputs),
    [inputs]
  );

  // 3. LocalStorage persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'saas_calc_user_data',
          JSON.stringify({
            inputs,
            nicheSlug: selectedNiche.slug,
            updatedAt: new Date().toISOString(),
          })
        );
      } catch (e) {
        // Storage full/disabled
      }
    }
  }, [inputs, selectedNiche]);

  // 4. Browser history synchronization for clean URLs
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

  // Handle Niche Selection
  const handleSelectNiche = (niche: SubNicheData) => {
    setSelectedNiche(niche);
    setInputs(niche.defaults);
    addToast({
      type: 'info',
      message: `Loaded ${niche.name} benchmark preset assumptions.`,
    });

    if (isNextRouter && typeof window !== 'undefined') {
      window.location.href = `/${niche.slug}`;
    } else if (typeof window !== 'undefined') {
      const newPath = `/${niche.slug}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ nicheSlug: niche.slug }, '', newPath);
      }
    }
  };

  const handleResetToNiche = () => {
    setInputs(selectedNiche.defaults);
    addToast({
      type: 'info',
      message: `Restored default benchmark parameters for ${selectedNiche.name}.`,
    });
  };

  const handleOpenPageModal = (page: PageTabType) => {
    setActivePageModal(page);
    if (typeof window !== 'undefined') {
      window.location.hash = page;
    }
  };

  const handleClosePageModal = () => {
    setActivePageModal(null);
    if (typeof window !== 'undefined' && window.location.hash) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#15803d] selection:text-white flex flex-col">
      {/* Header Navigation */}
      <HeaderNav
        selectedNiche={selectedNiche}
        onSelectNiche={handleSelectNiche}
        onOpenPage={handleOpenPageModal}
      />

      {/* Ultra-Wide Desktop Gutter Skyscraper Ads */}
      <AdBannerSlot slotId="desktop-gutter-skyscraper-left" format="skyscraper-left" />
      <AdBannerSlot slotId="desktop-gutter-skyscraper-right" format="skyscraper-right" />

      {/* Hero Section */}
      <HeroSection selectedNiche={selectedNiche} onSelectNiche={handleSelectNiche} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5 space-y-4 sm:space-y-6 flex-1 w-full">
        {/* Utility Actions Bar */}
        <UtilityActions
          inputs={inputs}
          metrics={metrics}
          selectedNiche={selectedNiche}
          onAddToast={addToast}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenVercelConfig={() => setIsVercelModalOpen(true)}
        />

        {/* Two-Column Interactive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <CalculatorControlPanel
              inputs={inputs}
              onChange={setInputs}
              selectedNiche={selectedNiche}
              onResetToNiche={handleResetToNiche}
            />
          </div>
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

        {/* Phase 3: Authoritative Citations & References */}
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

      {/* Vercel Configuration Modal */}
      <VercelConfigModal
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
      />

      {/* Mandatory Pages Modal */}
      <LegalAndStaticPagesModal
        isOpen={activePageModal !== null}
        activeTab={activePageModal || 'contact'}
        onClose={handleClosePageModal}
        onSelectTab={(tab) => {
          setActivePageModal(tab);
          if (typeof window !== 'undefined') {
            window.location.hash = tab;
          }
        }}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Global Footer */}
      <Footer
        onSelectNiche={handleSelectNiche}
        onOpenPage={handleOpenPageModal}
      />
    </div>
  );
}
