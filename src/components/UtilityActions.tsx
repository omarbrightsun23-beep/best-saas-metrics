import React, { useState } from 'react';
import {
  Download,
  Share2,
  BookmarkCheck,
  RotateCcw,
  Check,
  GitCompare,
} from 'lucide-react';
import { ComputedMetrics, FinancialInputs, SubNicheData } from '../types';
import { generateAuditPdf } from '../utils/pdfExport';
import { ToastMessage } from './Toast';

interface UtilityActionsProps {
  inputs: FinancialInputs;
  metrics: ComputedMetrics;
  selectedNiche: SubNicheData;
  onAddToast: (toast: Omit<ToastMessage, 'id'>) => void;
  onOpenCompare: () => void;
}

export default function UtilityActions({
  inputs,
  metrics,
  selectedNiche,
  onAddToast,
  onOpenCompare,
}: UtilityActionsProps) {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // PDF Export
  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      await generateAuditPdf(inputs, metrics, selectedNiche, 'SaaS Leadership');
      onAddToast({
        type: 'success',
        message: 'Executive PDF Audit Report exported successfully.',
      });
    } catch (err) {
      console.error(err);
      onAddToast({
        type: 'error',
        message: 'Could not generate PDF report. Please verify pop-up permissions.',
      });
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Share Link
  const handleShareLink = async () => {
    try {
      const params = new URLSearchParams({
        niche: selectedNiche.slug,
        cac: inputs.cac.toString(),
        arpa: inputs.arpa.toString(),
        margin: inputs.grossMargin.toString(),
        churn: inputs.churnRate.toString(),
        cycle: inputs.salesCycle.toString(),
      });
      const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);

      onAddToast({
        type: 'success',
        message: 'Direct link copied to clipboard.',
      });
    } catch (e) {
      onAddToast({
        type: 'info',
        message: 'URL updated with your custom metrics.',
      });
    }
  };

  // Save to Local Storage
  const handleSaveModel = () => {
    try {
      localStorage.setItem(
        'saas_calc_user_data',
        JSON.stringify({
          niche: selectedNiche.slug,
          inputs,
          savedAt: new Date().toISOString(),
        })
      );
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
      onAddToast({
        type: 'success',
        message: 'Assumptions saved to your browser.',
      });
    } catch (e) {
      onAddToast({
        type: 'error',
        message: 'Could not save model state.',
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-xs">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-slate-800">{selectedNiche.name}</span>
        <span className="text-slate-400">•</span>
        <span className="text-slate-500">Live Client-Side Calculation</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={onOpenCompare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
        >
          <GitCompare className="w-3.5 h-3.5 text-blue-600" />
          <span>Compare Scenario</span>
        </button>

        <button
          type="button"
          onClick={handleSaveModel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
        >
          {isSaved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <BookmarkCheck className="w-3.5 h-3.5 text-slate-600" />}
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>

        <button
          type="button"
          onClick={handleShareLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition cursor-pointer"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-600" />}
          <span>{isCopied ? 'Link Copied' : 'Share'}</span>
        </button>

        <button
          type="button"
          onClick={handleExportPdf}
          disabled={isExportingPdf}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExportingPdf ? 'Exporting...' : 'Export PDF'}</span>
        </button>
      </div>
    </div>
  );
}
