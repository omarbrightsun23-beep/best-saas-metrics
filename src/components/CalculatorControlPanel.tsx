import React, { useState } from 'react';
import { RotateCcw, DollarSign, Percent, Clock, HelpCircle, ChevronUp, ChevronDown, SlidersHorizontal, Sparkles } from 'lucide-react';
import { FinancialInputs, SubNicheData } from '../types';

interface CalculatorControlPanelProps {
  inputs: FinancialInputs;
  onChange: (inputs: FinancialInputs) => void;
  selectedNiche: SubNicheData;
  onResetToNiche: () => void;
}

export default function CalculatorControlPanel({
  inputs,
  onChange,
  selectedNiche,
  onResetToNiche,
}: CalculatorControlPanelProps) {
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleCacChange = (val: number) => {
    const clamped = Math.max(100, Math.min(100000, Number.isNaN(val) ? 500 : val));
    onChange({ ...inputs, cac: clamped });
  };

  const handleArpaChange = (val: number) => {
    const clamped = Math.max(10, Math.min(25000, Number.isNaN(val) ? 50 : val));
    onChange({ ...inputs, arpa: clamped });
  };

  const handleGrossMarginChange = (val: number) => {
    const clamped = Math.max(10, Math.min(99, Number.isNaN(val) ? 10 : val));
    onChange({ ...inputs, grossMargin: clamped });
  };

  const handleChurnChange = (val: number) => {
    const clamped = Math.max(0.1, Math.min(20, Number.isNaN(val) ? 0.5 : Number(val.toFixed(2))));
    onChange({ ...inputs, churnRate: clamped });
  };

  const handleSalesCycleChange = (val: number) => {
    const clamped = Math.max(1, Math.min(24, Number.isNaN(val) ? 1 : Math.round(val)));
    onChange({ ...inputs, salesCycle: clamped });
  };

  const stepAdjust = (field: keyof FinancialInputs, delta: number, min: number, max: number) => {
    const current = inputs[field];
    const updated = Math.max(min, Math.min(max, Number((current + delta).toFixed(2))));
    onChange({ ...inputs, [field]: updated });
    setActiveField(field);
  };

  const handleResetWithConfirmation = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to reset your custom assumptions to the ${selectedNiche.name} industry baseline benchmarks?`
    );
    if (isConfirmed) {
      onResetToNiche();
    }
  };

  return (
    <div
      id="calculator-control-panel"
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 lg:p-8 shadow-sm space-y-6"
    >
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <SlidersHorizontal className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Financial Assumptions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Adjust core growth levers or benchmark against {selectedNiche.name}
          </p>
        </div>

        <button
          id="btn-reset-niche-defaults"
          type="button"
          onClick={handleResetWithConfirmation}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white text-xs font-bold border border-slate-200 hover:border-blue-600 active:scale-95 transition-all duration-150 cursor-pointer shrink-0 shadow-2xs hover:shadow-md hover:shadow-blue-600/20 group"
          title={`Reset inputs to ${selectedNiche.shortName} industry averages`}
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform duration-200" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Financial Inputs List */}
      <div className="space-y-6">
        {/* 1. CAC Input Card */}
        <div
          onFocus={() => setActiveField('cac')}
          className={`p-4 sm:p-5 rounded-2xl space-y-3.5 transition-all duration-200 group ${
            activeField === 'cac'
              ? 'bg-blue-50/40 border-2 border-blue-500 ring-4 ring-blue-500/10 shadow-md shadow-blue-500/5'
              : 'bg-slate-50/70 border-2 border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md hover:shadow-blue-500/5'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <label htmlFor="input-cac-number" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span
                  className={`p-1 rounded-lg transition-colors ${
                    activeField === 'cac'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-100/80 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                </span>
                <span className={activeField === 'cac' ? 'text-blue-950 font-black' : ''}>
                  Customer Acquisition Cost (CAC)
                </span>
                {activeField === 'cac' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600 text-white animate-pulse">
                    Active
                  </span>
                )}
              </label>
              <span className="text-[11px] text-slate-500 block mt-0.5 ml-7">
                Total fully loaded sales & marketing spend per acquired account
              </span>
            </div>

            {/* Input Box with Step Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => stepAdjust('cac', -500, 100, 100000)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Decrease CAC by $500"
              >
                -
              </button>
              <div
                className={`flex items-center bg-white rounded-xl px-3 py-1.5 shadow-2xs transition-all duration-150 ${
                  activeField === 'cac'
                    ? 'border-2 border-blue-500 ring-3 ring-blue-500/20'
                    : 'border-2 border-slate-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/20'
                }`}
              >
                <span className="text-sm text-slate-400 font-bold mr-1">$</span>
                <input
                  id="input-cac-number"
                  type="number"
                  min={100}
                  max={100000}
                  step={250}
                  value={inputs.cac}
                  onFocus={() => setActiveField('cac')}
                  onChange={(e) => handleCacChange(Number(e.target.value))}
                  className="w-24 bg-transparent text-right text-sm sm:text-base font-black text-slate-900 focus:outline-hidden font-mono tracking-tight"
                />
              </div>
              <button
                type="button"
                onClick={() => stepAdjust('cac', 500, 100, 100000)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Increase CAC by $500"
              >
                +
              </button>
            </div>
          </div>

          <input
            id="slider-cac"
            type="range"
            min={500}
            max={50000}
            step={250}
            value={inputs.cac}
            onFocus={() => setActiveField('cac')}
            onChange={(e) => handleCacChange(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:accent-blue-700"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-500 pt-0.5">
            <span>$500</span>
            <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {selectedNiche.shortName} Range: ${selectedNiche.benchmarks.cacRange[0].toLocaleString()} – ${selectedNiche.benchmarks.cacRange[1].toLocaleString()}
            </span>
            <span>$50,000</span>
          </div>
        </div>

        {/* 2. ARPA Input Card */}
        <div
          onFocus={() => setActiveField('arpa')}
          className={`p-4 sm:p-5 rounded-2xl space-y-3.5 transition-all duration-200 group ${
            activeField === 'arpa'
              ? 'bg-blue-50/40 border-2 border-blue-500 ring-4 ring-blue-500/10 shadow-md shadow-blue-500/5'
              : 'bg-slate-50/70 border-2 border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md hover:shadow-blue-500/5'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <label htmlFor="input-arpa-number" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span
                  className={`p-1 rounded-lg transition-colors ${
                    activeField === 'arpa'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-indigo-100/80 text-indigo-700 group-hover:bg-blue-600 group-hover:text-white'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                </span>
                <span className={activeField === 'arpa' ? 'text-blue-950 font-black' : ''}>
                  Average Monthly Revenue / Account (ARPA)
                </span>
                {activeField === 'arpa' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600 text-white animate-pulse">
                    Active
                  </span>
                )}
              </label>
              <span className="text-[11px] text-slate-500 block mt-0.5 ml-7">
                Monthly Recurring Revenue (MRR) generated per active customer
              </span>
            </div>

            {/* Input Box with Step Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => stepAdjust('arpa', -50, 10, 25000)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Decrease ARPA by $50"
              >
                -
              </button>
              <div
                className={`flex items-center bg-white rounded-xl px-3 py-1.5 shadow-2xs transition-all duration-150 ${
                  activeField === 'arpa'
                    ? 'border-2 border-blue-500 ring-3 ring-blue-500/20'
                    : 'border-2 border-slate-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/20'
                }`}
              >
                <span className="text-sm text-slate-400 font-bold mr-1">$</span>
                <input
                  id="input-arpa-number"
                  type="number"
                  min={10}
                  max={25000}
                  step={25}
                  value={inputs.arpa}
                  onFocus={() => setActiveField('arpa')}
                  onChange={(e) => handleArpaChange(Number(e.target.value))}
                  className="w-20 bg-transparent text-right text-sm sm:text-base font-black text-slate-900 focus:outline-hidden font-mono tracking-tight"
                />
                <span className="text-xs text-slate-400 font-medium ml-1">/mo</span>
              </div>
              <button
                type="button"
                onClick={() => stepAdjust('arpa', 50, 10, 25000)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Increase ARPA by $50"
              >
                +
              </button>
            </div>
          </div>

          <input
            id="slider-arpa"
            type="range"
            min={50}
            max={5000}
            step={25}
            value={inputs.arpa}
            onFocus={() => setActiveField('arpa')}
            onChange={(e) => handleArpaChange(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:accent-blue-700"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-500 pt-0.5">
            <span>$50/mo</span>
            <span className="text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
              {selectedNiche.shortName} Typical: ${selectedNiche.benchmarks.arpaRange[0]} – ${selectedNiche.benchmarks.arpaRange[1]}/mo
            </span>
            <span>$5,000/mo</span>
          </div>
        </div>

        {/* 3. Gross Margin Input Card */}
        <div
          onFocus={() => setActiveField('grossMargin')}
          className={`p-4 sm:p-5 rounded-2xl space-y-3.5 transition-all duration-200 group ${
            activeField === 'grossMargin'
              ? 'bg-blue-50/40 border-2 border-blue-500 ring-4 ring-blue-500/10 shadow-md shadow-blue-500/5'
              : 'bg-slate-50/70 border-2 border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md hover:shadow-blue-500/5'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <label htmlFor="input-margin-number" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span
                  className={`p-1 rounded-lg transition-colors ${
                    activeField === 'grossMargin'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-emerald-100/80 text-emerald-700 group-hover:bg-blue-600 group-hover:text-white'
                  }`}
                >
                  <Percent className="w-4 h-4" />
                </span>
                <span className={activeField === 'grossMargin' ? 'text-blue-950 font-black' : ''}>
                  Software Gross Margin Percentage
                </span>
                {activeField === 'grossMargin' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600 text-white animate-pulse">
                    Active
                  </span>
                )}
              </label>
              <span className="text-[11px] text-slate-500 block mt-0.5 ml-7">
                Revenue remaining after direct COGS (cloud hosting, APIs, customer support)
              </span>
            </div>

            {/* Input Box with Step Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => stepAdjust('grossMargin', -1, 10, 99)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Decrease Margin by 1%"
              >
                -
              </button>
              <div
                className={`flex items-center bg-white rounded-xl px-3 py-1.5 shadow-2xs transition-all duration-150 ${
                  activeField === 'grossMargin'
                    ? 'border-2 border-blue-500 ring-3 ring-blue-500/20'
                    : 'border-2 border-slate-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/20'
                }`}
              >
                <input
                  id="input-margin-number"
                  type="number"
                  min={10}
                  max={99}
                  step={1}
                  value={inputs.grossMargin}
                  onFocus={() => setActiveField('grossMargin')}
                  onChange={(e) => handleGrossMarginChange(Number(e.target.value))}
                  className="w-14 bg-transparent text-right text-sm sm:text-base font-black text-slate-900 focus:outline-hidden font-mono tracking-tight"
                />
                <span className="text-sm text-slate-400 font-bold ml-1">%</span>
              </div>
              <button
                type="button"
                onClick={() => stepAdjust('grossMargin', 1, 10, 99)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Increase Margin by 1%"
              >
                +
              </button>
            </div>
          </div>

          <input
            id="slider-margin"
            type="range"
            min={10}
            max={95}
            step={1}
            value={inputs.grossMargin}
            onFocus={() => setActiveField('grossMargin')}
            onChange={(e) => handleGrossMarginChange(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:accent-blue-700"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-500 pt-0.5">
            <span>10%</span>
            <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              Sector Median: {selectedNiche.benchmarks.grossMarginMedian}%
            </span>
            <span>95%</span>
          </div>
        </div>

        {/* 4. Churn Rate Input Card */}
        <div
          onFocus={() => setActiveField('churnRate')}
          className={`p-4 sm:p-5 rounded-2xl space-y-3.5 transition-all duration-200 group ${
            activeField === 'churnRate'
              ? 'bg-blue-50/40 border-2 border-blue-500 ring-4 ring-blue-500/10 shadow-md shadow-blue-500/5'
              : 'bg-slate-50/70 border-2 border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md hover:shadow-blue-500/5'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <label htmlFor="input-churn-number" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span
                  className={`p-1 rounded-lg transition-colors ${
                    activeField === 'churnRate'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-orange-100/80 text-orange-700 group-hover:bg-blue-600 group-hover:text-white'
                  }`}
                >
                  <Percent className="w-4 h-4" />
                </span>
                <span className={activeField === 'churnRate' ? 'text-blue-950 font-black' : ''}>
                  Monthly Logo Churn Rate
                </span>
                {activeField === 'churnRate' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600 text-white animate-pulse">
                    Active
                  </span>
                )}
              </label>
              <span className="text-[11px] text-slate-500 block mt-0.5 ml-7">
                Percentage of subscribers canceling or downgrading each month
              </span>
            </div>

            {/* Input Box with Step Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => stepAdjust('churnRate', -0.25, 0.1, 20)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Decrease Churn by 0.25%"
              >
                -
              </button>
              <div
                className={`flex items-center bg-white rounded-xl px-3 py-1.5 shadow-2xs transition-all duration-150 ${
                  activeField === 'churnRate'
                    ? 'border-2 border-blue-500 ring-3 ring-blue-500/20'
                    : 'border-2 border-slate-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/20'
                }`}
              >
                <input
                  id="input-churn-number"
                  type="number"
                  min={0.1}
                  max={20}
                  step={0.1}
                  value={inputs.churnRate}
                  onFocus={() => setActiveField('churnRate')}
                  onChange={(e) => handleChurnChange(Number(e.target.value))}
                  className="w-14 bg-transparent text-right text-sm sm:text-base font-black text-slate-900 focus:outline-hidden font-mono tracking-tight"
                />
                <span className="text-sm text-slate-400 font-bold ml-1">%</span>
              </div>
              <button
                type="button"
                onClick={() => stepAdjust('churnRate', 0.25, 0.1, 20)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Increase Churn by 0.25%"
              >
                +
              </button>
            </div>
          </div>

          <input
            id="slider-churn"
            type="range"
            min={0.5}
            max={10}
            step={0.1}
            value={inputs.churnRate}
            onFocus={() => setActiveField('churnRate')}
            onChange={(e) => handleChurnChange(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:accent-blue-700"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-500 pt-0.5">
            <span>0.5% /mo</span>
            <span className="text-orange-700 font-semibold bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
              Sector Median: {selectedNiche.benchmarks.churnRateMedian}% /mo
            </span>
            <span>10% /mo</span>
          </div>
        </div>

        {/* 5. Sales Cycle Input Card */}
        <div
          onFocus={() => setActiveField('salesCycle')}
          className={`p-4 sm:p-5 rounded-2xl space-y-3.5 transition-all duration-200 group ${
            activeField === 'salesCycle'
              ? 'bg-blue-50/40 border-2 border-blue-500 ring-4 ring-blue-500/10 shadow-md shadow-blue-500/5'
              : 'bg-slate-50/70 border-2 border-slate-200/80 hover:border-blue-300 hover:bg-white hover:shadow-md hover:shadow-blue-500/5'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div>
              <label htmlFor="input-cycle-number" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span
                  className={`p-1 rounded-lg transition-colors ${
                    activeField === 'salesCycle'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-violet-100/80 text-violet-700 group-hover:bg-blue-600 group-hover:text-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </span>
                <span className={activeField === 'salesCycle' ? 'text-blue-950 font-black' : ''}>
                  Average Sales Cycle Length
                </span>
                {activeField === 'salesCycle' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-600 text-white animate-pulse">
                    Active
                  </span>
                )}
              </label>
              <span className="text-[11px] text-slate-500 block mt-0.5 ml-7">
                Lag between initial prospect contact and signed contract closure
              </span>
            </div>

            {/* Input Box with Step Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => stepAdjust('salesCycle', -1, 1, 24)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Decrease cycle by 1 month"
              >
                -
              </button>
              <div
                className={`flex items-center bg-white rounded-xl px-3 py-1.5 shadow-2xs transition-all duration-150 ${
                  activeField === 'salesCycle'
                    ? 'border-2 border-blue-500 ring-3 ring-blue-500/20'
                    : 'border-2 border-slate-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-500/20'
                }`}
              >
                <input
                  id="input-cycle-number"
                  type="number"
                  min={1}
                  max={24}
                  step={1}
                  value={inputs.salesCycle}
                  onFocus={() => setActiveField('salesCycle')}
                  onChange={(e) => handleSalesCycleChange(Number(e.target.value))}
                  className="w-12 bg-transparent text-right text-sm sm:text-base font-black text-slate-900 focus:outline-hidden font-mono tracking-tight"
                />
                <span className="text-xs text-slate-400 font-medium ml-1">mo</span>
              </div>
              <button
                type="button"
                onClick={() => stepAdjust('salesCycle', 1, 1, 24)}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 active:bg-blue-600 active:text-white active:border-blue-600 active:scale-90 font-bold flex items-center justify-center text-xs transition-all cursor-pointer shadow-2xs"
                title="Increase cycle by 1 month"
              >
                +
              </button>
            </div>
          </div>

          <input
            id="slider-sales-cycle"
            type="range"
            min={1}
            max={12}
            step={1}
            value={inputs.salesCycle}
            onFocus={() => setActiveField('salesCycle')}
            onChange={(e) => handleSalesCycleChange(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:accent-blue-700"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-500 pt-0.5">
            <span>1 Month</span>
            <span className="text-violet-700 font-semibold bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100">
              Sector Median: {selectedNiche.benchmarks.salesCycleMedian} Mo
            </span>
            <span>12 Months</span>
          </div>
        </div>
      </div>
    </div>
  );
}
