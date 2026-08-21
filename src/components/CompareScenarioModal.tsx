import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, TrendingUp, Sparkles, Sliders, Check } from 'lucide-react';
import { FinancialInputs, ComputedMetrics, SubNicheData } from '../types';
import { calculateMetrics, formatCurrency, formatCurrencyPrecise } from '../utils/financialMath';

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
  // Optimized / Scenario B assumptions (e.g. 15% lower CAC, 10% higher gross margin, 20% lower churn)
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-xs">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Sensitivity & Scenario Comparison Analysis
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Compare your baseline assumptions (Scenario A) against an optimized target scenario (Scenario B).
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 text-slate-500 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario A (Current) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Scenario A</span>
                <h4 className="text-base font-black text-slate-900">Current Assumptions</h4>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full shadow-2xs">
                Baseline
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Customer Acquisition Cost:</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(currentInputs.cac)}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly ARPA:</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(currentInputs.arpa)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span>Gross Margin:</span>
                <span className="font-mono font-bold text-slate-900">{currentInputs.grossMargin}%</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Churn:</span>
                <span className="font-mono font-bold text-slate-900">{currentInputs.churnRate}%</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Cycle:</span>
                <span className="font-mono font-bold text-slate-900">{currentInputs.salesCycle} Months</span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 space-y-2">
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Payback Period:</span>
                <span className="text-lg font-black font-mono text-slate-900">{currentMetrics.cacPaybackMonths} Mo</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Customer LTV:</span>
                <span className="text-lg font-black font-mono text-emerald-700">{formatCurrency(currentMetrics.ltv)}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">LTV:CAC Ratio:</span>
                <span className="text-lg font-black font-mono text-indigo-700">{currentMetrics.ltvCacRatio}:1</span>
              </div>
            </div>
          </div>

          {/* Scenario B (Optimized) */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-blue-200 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Scenario B</span>
                <h4 className="text-base font-black text-slate-900">Optimized Target</h4>
              </div>
              <span className="text-xs font-bold text-blue-900 bg-white border border-blue-200 px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Optimized</span>
              </span>
            </div>

            {/* Quick adjust sliders for Scenario B */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Target CAC ($):</span>
                <input
                  type="number"
                  min={100}
                  max={100000}
                  value={scenarioBInputs.cac}
                  onChange={(e) =>
                    setScenarioBInputs({
                      ...scenarioBInputs,
                      cac: Math.max(100, Math.min(100000, Number(e.target.value) || 100)),
                    })
                  }
                  className="w-24 bg-white border border-blue-200 rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900 text-xs shadow-2xs focus:outline-blue-600"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Target ARPA ($/mo):</span>
                <input
                  type="number"
                  min={10}
                  max={25000}
                  value={scenarioBInputs.arpa}
                  onChange={(e) =>
                    setScenarioBInputs({
                      ...scenarioBInputs,
                      arpa: Math.max(10, Math.min(25000, Number(e.target.value) || 10)),
                    })
                  }
                  className="w-24 bg-white border border-blue-200 rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900 text-xs shadow-2xs focus:outline-blue-600"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Target Gross Margin (%):</span>
                <input
                  type="number"
                  min={10}
                  max={99}
                  value={scenarioBInputs.grossMargin}
                  onChange={(e) =>
                    setScenarioBInputs({
                      ...scenarioBInputs,
                      grossMargin: Math.max(10, Math.min(99, Number(e.target.value) || 10)),
                    })
                  }
                  className="w-24 bg-white border border-blue-200 rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900 text-xs shadow-2xs focus:outline-blue-600"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Target Churn (%/mo):</span>
                <input
                  type="number"
                  step={0.1}
                  min={0.1}
                  max={20}
                  value={scenarioBInputs.churnRate}
                  onChange={(e) =>
                    setScenarioBInputs({
                      ...scenarioBInputs,
                      churnRate: Math.max(0.1, Math.min(20, Number(e.target.value) || 0.1)),
                    })
                  }
                  className="w-24 bg-white border border-blue-200 rounded-lg px-2 py-1 text-right font-mono font-bold text-slate-900 text-xs shadow-2xs focus:outline-blue-600"
                />
              </div>
            </div>

            <div className="border-t border-blue-200 pt-3 space-y-2">
              <div className="p-3 rounded-xl bg-white border border-blue-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Payback Period:</span>
                <span className="text-lg font-black font-mono text-slate-900">
                  {scenarioBMetrics.cacPaybackMonths} Mo{' '}
                  <span className={`text-xs font-bold ${Number(paybackDiff) <= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    ({paybackDiff} Mo)
                  </span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-blue-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">Customer LTV:</span>
                <span className="text-lg font-black font-mono text-emerald-700">
                  {formatCurrency(scenarioBMetrics.ltv)}{' '}
                  <span className="text-xs font-bold text-emerald-700">(+{formatCurrency(ltvDiff)})</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-blue-200 flex justify-between items-center shadow-2xs">
                <span className="text-xs font-bold text-slate-700">LTV:CAC Ratio:</span>
                <span className="text-lg font-black font-mono text-indigo-700">
                  {scenarioBMetrics.ltvCacRatio}:1{' '}
                  <span className="text-xs font-bold text-indigo-700">(+{ltvRatioDiff})</span>
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
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all duration-150 cursor-pointer shadow-xs hover:shadow-emerald-600/20 active:scale-95 flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Scenario B to Calculator</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all duration-150 cursor-pointer shadow-xs active:scale-95"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
