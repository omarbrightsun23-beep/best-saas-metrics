'use client';

import React, { useState, useEffect } from 'react';
import { X, Sliders, Check } from 'lucide-react';
import { FinancialInputs, ComputedMetrics, SubNicheData } from '../types';
import { calculateMetrics, formatCurrency } from '../utils/financialMath';

interface CompareScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInputs: FinancialInputs;
  currentMetrics: ComputedMetrics;
  selectedNiche: SubNicheData;
  onApplyScenarioB?: (inputs: FinancialInputs) => void;
}

export default function CompareScenarioModal({
  isOpen,
  onClose,
  currentInputs,
  currentMetrics,
  selectedNiche,
  onApplyScenarioB,
}: CompareScenarioModalProps) {
  // Optimized / Scenario B assumptions (e.g. 20% lower CAC, 15% higher ARPA, 5% higher margin, 25% lower churn)
  const [scenarioBInputs, setScenarioBInputs] = useState<FinancialInputs>(() => ({
    cac: Math.max(500, Math.round(currentInputs.cac * 0.8)),
    arpa: Math.round(currentInputs.arpa * 1.15),
    grossMargin: Math.min(95, Math.round(currentInputs.grossMargin + 5)),
    churnRate: Math.max(0.5, Number((currentInputs.churnRate * 0.75).toFixed(2))),
    salesCycle: Math.max(1, currentInputs.salesCycle - 1),
  }));

  // Sync when opened or currentInputs changes
  useEffect(() => {
    if (isOpen) {
      setScenarioBInputs({
        cac: Math.max(500, Math.round(currentInputs.cac * 0.8)),
        arpa: Math.round(currentInputs.arpa * 1.15),
        grossMargin: Math.min(95, Math.round(currentInputs.grossMargin + 5)),
        churnRate: Math.max(0.5, Number((currentInputs.churnRate * 0.75).toFixed(2))),
        salesCycle: Math.max(1, currentInputs.salesCycle - 1),
      });
    }
  }, [isOpen, currentInputs]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scenarioBMetrics = calculateMetrics(scenarioBInputs);
  const paybackDiff = (scenarioBMetrics.cacPaybackMonths - currentMetrics.cacPaybackMonths).toFixed(1);
  const ltvDiff = scenarioBMetrics.ltv - currentMetrics.ltv;
  const ltvRatioDiff = (scenarioBMetrics.ltvCacRatio - currentMetrics.ltvCacRatio).toFixed(1);

  const handleApply = () => {
    if (onApplyScenarioB) {
      onApplyScenarioB(scenarioBInputs);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-scenario-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#EEF2FF] text-[#4F46E5] border border-[#E0E7FF]">
                <Sliders className="w-4 h-4" />
              </span>
              <h2 id="compare-scenario-title" className="text-xl font-black text-slate-900">
                Sensitivity Scenario Comparison
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Model a target scenario against current baseline assumptions for {selectedNiche.name}.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Close Comparison Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: Current Model */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Scenario A (Current Baseline)
              </span>
              <span className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Customer Acquisition Cost:</span>
                <span className="font-mono font-bold text-slate-900">${currentInputs.cac.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Monthly ARPA:</span>
                <span className="font-mono font-bold text-slate-900">${currentInputs.arpa.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Software Gross Margin:</span>
                <span className="font-mono font-bold text-slate-900">{currentInputs.grossMargin}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Monthly Logo Churn:</span>
                <span className="font-mono font-bold text-slate-900">{currentInputs.churnRate}%</span>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-3 space-y-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Payback Period:</span>
                <span className="text-lg font-black font-mono text-slate-900">
                  {currentMetrics.cacPaybackMonths} Mo
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Customer LTV:</span>
                <span className="text-lg font-black font-mono text-slate-900">
                  {formatCurrency(currentMetrics.ltv)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">LTV:CAC Ratio:</span>
                <span className="text-lg font-black font-mono text-slate-900">
                  {currentMetrics.ltvCacRatio}:1
                </span>
              </div>
            </div>
          </div>

          {/* Column B: Optimized Target */}
          <div className="bg-[#EEF2FF]/60 border border-[#E0E7FF] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E0E7FF] pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                Scenario B (Target Sensitivity)
              </span>
              <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <label htmlFor="compare-cac" className="text-slate-700 font-medium">Target CAC:</label>
                <div className="flex items-center">
                  <span className="text-slate-400 font-bold mr-1">$</span>
                  <input
                    id="compare-cac"
                    type="number"
                    value={scenarioBInputs.cac}
                    onChange={(e) =>
                      setScenarioBInputs({
                        ...scenarioBInputs,
                        cac: Math.max(100, Number(e.target.value) || 500),
                      })
                    }
                    className="w-24 bg-white border border-[#E0E7FF] rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900 text-xs shadow-2xs focus:outline-[#4F46E5]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="compare-arpa" className="text-slate-700 font-medium">Target ARPA:</label>
                <div className="flex items-center">
                  <span className="text-slate-400 font-bold mr-1">$</span>
                  <input
                    id="compare-arpa"
                    type="number"
                    value={scenarioBInputs.arpa}
                    onChange={(e) =>
                      setScenarioBInputs({
                        ...scenarioBInputs,
                        arpa: Math.max(10, Number(e.target.value) || 50),
                      })
                    }
                    className="w-24 bg-white border border-[#E0E7FF] rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900 text-xs shadow-2xs focus:outline-[#4F46E5]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="compare-margin" className="text-slate-700 font-medium">Target Gross Margin %:</label>
                <input
                  id="compare-margin"
                  type="number"
                  value={scenarioBInputs.grossMargin}
                  onChange={(e) =>
                    setScenarioBInputs({
                      ...scenarioBInputs,
                      grossMargin: Math.max(10, Math.min(99, Number(e.target.value) || 80)),
                    })
                  }
                  className="w-24 bg-white border border-[#E0E7FF] rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900 text-xs shadow-2xs focus:outline-[#4F46E5]"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="compare-churn" className="text-slate-700 font-medium">Target Monthly Churn %:</label>
                <input
                  id="compare-churn"
                  type="number"
                  step={0.1}
                  value={scenarioBInputs.churnRate}
                  onChange={(e) =>
                    setScenarioBInputs({
                      ...scenarioBInputs,
                      churnRate: Math.max(0.1, Math.min(20, Number(e.target.value) || 0.1)),
                    })
                  }
                  className="w-24 bg-white border border-[#E0E7FF] rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900 text-xs shadow-2xs focus:outline-[#4F46E5]"
                />
              </div>
            </div>
            <div className="border-t border-[#E0E7FF] pt-3 space-y-2">
              <div className="p-3 rounded-xl bg-white border border-[#E0E7FF] flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Payback Period:</span>
                <span className="text-lg font-black font-mono text-slate-900">
                  {scenarioBMetrics.cacPaybackMonths} Mo{' '}
                  <span className={`text-xs font-bold ${Number(paybackDiff) <= 0 ? 'text-indigo-600' : 'text-rose-700'}`}>
                    ({paybackDiff} Mo)
                  </span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E0E7FF] flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Customer LTV:</span>
                <span className="text-lg font-black font-mono text-indigo-800">
                  {formatCurrency(scenarioBMetrics.ltv)}{' '}
                  <span className="text-xs font-bold text-indigo-600">(+{formatCurrency(ltvDiff)})</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E0E7FF] flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">LTV:CAC Ratio:</span>
                <span className="text-lg font-black font-mono text-indigo-950">
                  {scenarioBMetrics.ltvCacRatio}:1{' '}
                  <span className="text-xs font-bold text-indigo-600">(+{ltvRatioDiff})</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 pt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleApply}
            className="px-4 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white text-xs font-bold transition-all duration-150 cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Scenario B to Calculator</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all duration-150 cursor-pointer active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
