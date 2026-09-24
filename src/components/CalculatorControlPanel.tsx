'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
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

  const handleResetWithConfirmation = () => {
    const isConfirmed = window.confirm(
      `Reset assumptions to ${selectedNiche.name} industry baseline defaults?`
    );
    if (isConfirmed) {
      onResetToNiche();
    }
  };

  return (
    <div
      id="calculator-control-panel"
      className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-7 shadow-xs"
    >
      {/* Title & Reset Button */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Financial Assumptions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Calibrate customer acquisition costs and unit economics parameters.
          </p>
        </div>
        <button
          id="btn-reset-niche-defaults"
          type="button"
          onClick={handleResetWithConfirmation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition cursor-pointer shadow-2xs"
          title={`Reset inputs to ${selectedNiche.shortName} baseline`}
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset</span>
        </button>
      </div>

      {/* Inputs List */}
      <div className="space-y-6">
        {/* 1. Customer Acquisition Cost (CAC) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="input-cac-number" className="text-sm font-bold text-slate-900">
              Customer Acquisition Cost (CAC)
            </label>
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <span className="text-xs text-slate-400 font-bold mr-0.5">$</span>
              <input
                id="input-cac-number"
                type="number"
                min={100}
                max={100000}
                step={250}
                value={inputs.cac}
                onChange={(e) => handleCacChange(Number(e.target.value))}
                className="w-20 text-right text-sm font-black text-slate-900 font-mono outline-none border-none p-0 bg-transparent"
              />
            </div>
          </div>
          <input
            id="slider-cac"
            type="range"
            min={500}
            max={50000}
            step={250}
            value={inputs.cac}
            onChange={(e) => handleCacChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#6366F1]"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-400">
            <span>$500</span>
            <span>$50,000</span>
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Total fully loaded sales &amp; marketing spend per acquired account.
          </p>
        </div>

        {/* 2. Average Monthly Revenue / Account (ARPA) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="input-arpa-number" className="text-sm font-bold text-slate-900">
              Average Revenue per Account (ARPA)
            </label>
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <span className="text-xs text-slate-400 font-bold mr-0.5">$</span>
              <input
                id="input-arpa-number"
                type="number"
                min={10}
                max={25000}
                step={25}
                value={inputs.arpa}
                onChange={(e) => handleArpaChange(Number(e.target.value))}
                className="w-20 text-right text-sm font-black text-slate-900 font-mono outline-none border-none p-0 bg-transparent"
              />
              <span className="text-[10px] text-slate-400 font-medium ml-1">/mo</span>
            </div>
          </div>
          <input
            id="slider-arpa"
            type="range"
            min={50}
            max={5000}
            step={25}
            value={inputs.arpa}
            onChange={(e) => handleArpaChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#6366F1]"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-400">
            <span>$50/mo</span>
            <span>$5,000/mo</span>
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Monthly recurring revenue (MRR) generated per active customer.
          </p>
        </div>

        {/* 3. Gross Margin (%) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="input-margin-number" className="text-sm font-bold text-slate-900">
              Software Gross Margin
            </label>
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <input
                id="input-margin-number"
                type="number"
                min={10}
                max={99}
                step={1}
                value={inputs.grossMargin}
                onChange={(e) => handleGrossMarginChange(Number(e.target.value))}
                className="w-12 text-right text-sm font-black text-slate-900 font-mono outline-none border-none p-0 bg-transparent"
              />
              <span className="text-xs text-slate-400 font-bold ml-1">%</span>
            </div>
          </div>
          <input
            id="slider-margin"
            type="range"
            min={30}
            max={95}
            step={1}
            value={inputs.grossMargin}
            onChange={(e) => handleGrossMarginChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#6366F1]"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-400">
            <span>30%</span>
            <span>95%</span>
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Revenue remaining after direct COGS (cloud hosting, third-party APIs, support).
          </p>
        </div>

        {/* 4. Monthly Churn Rate (%) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="input-churn-number" className="text-sm font-bold text-slate-900">
              Monthly Logo Churn Rate
            </label>
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <input
                id="input-churn-number"
                type="number"
                min={0.1}
                max={20}
                step={0.1}
                value={inputs.churnRate}
                onChange={(e) => handleChurnChange(Number(e.target.value))}
                className="w-12 text-right text-sm font-black text-slate-900 font-mono outline-none border-none p-0 bg-transparent"
              />
              <span className="text-xs text-slate-400 font-bold ml-1">%</span>
            </div>
          </div>
          <input
            id="slider-churn"
            type="range"
            min={0.2}
            max={8}
            step={0.1}
            value={inputs.churnRate}
            onChange={(e) => handleChurnChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#6366F1]"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-400">
            <span>0.2%/mo</span>
            <span>8.0%/mo</span>
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Percentage of customers who cancel or non-renew subscriptions each month.
          </p>
        </div>

        {/* 5. Sales Cycle Length */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="input-sales-cycle-number" className="text-sm font-bold text-slate-900">
              Sales Cycle Duration
            </label>
            <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
              <input
                id="input-sales-cycle-number"
                type="number"
                min={1}
                max={24}
                step={1}
                value={inputs.salesCycle}
                onChange={(e) => handleSalesCycleChange(Number(e.target.value))}
                className="w-10 text-right text-sm font-black text-slate-900 font-mono outline-none border-none p-0 bg-transparent"
              />
              <span className="text-[10px] text-slate-400 font-medium ml-1">mo</span>
            </div>
          </div>
          <input
            id="slider-sales-cycle"
            type="range"
            min={1}
            max={18}
            step={1}
            value={inputs.salesCycle}
            onChange={(e) => handleSalesCycleChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#6366F1]"
          />
          <div className="flex justify-between text-[11px] font-medium text-slate-400">
            <span>1 Month</span>
            <span>18 Months</span>
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Average elapsed time from initial demo/pipeline discovery to contract signoff.
          </p>
        </div>
      </div>
    </div>
  );
}
