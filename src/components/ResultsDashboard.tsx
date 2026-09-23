'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Download } from 'lucide-react';
import { ComputedMetrics, FinancialInputs, SubNicheData, CashflowPoint } from '../types';

const TrajectoryChart = dynamic(() => import('./TrajectoryChart'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-900/60 rounded-xl flex items-center justify-center text-slate-400 text-sm border border-slate-800">
      Loading trajectory chart...
    </div>
  ),
});

interface ResultsDashboardProps {
  metrics: ComputedMetrics;
  inputs: FinancialInputs;
  selectedNiche: SubNicheData;
  cashflowData: CashflowPoint[];
}

export default function ResultsDashboard({
  metrics,
  inputs,
  selectedNiche,
  cashflowData,
}: ResultsDashboardProps) {
  const monthlyGrossProfit = inputs.arpa * (inputs.grossMargin / 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="results-dashboard-pane" className="space-y-6">
      {/* Primary Summary Card */}
      <div className="bg-[#eef8ed] border border-[#d2edd0] rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-5 text-slate-900 shadow-2xs">
        {/* Top Hero Metric */}
        <div className="space-y-1 border-b border-[#d2edd0]/80 pb-4">
          <div className="text-sm sm:text-base font-semibold text-slate-700">
            CAC Payback Period
          </div>
          <div className="text-4xl sm:text-5xl font-black text-slate-950 font-mono tracking-tight">
            {metrics.cacPaybackMonths}{' '}
            <span className="text-2xl sm:text-3xl font-bold text-slate-600 font-sans">
              Months
            </span>
          </div>
          <p className="text-xs text-slate-500">
            The estimated duration to break even on customer acquisition spend.
          </p>
        </div>

        {/* Key-Value Breakdown Rows */}
        <div className="space-y-4 text-xs">
          {/* Row 1: Breakeven Milestone */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-slate-800 font-semibold text-sm">
              <span>Breakeven Milestone</span>
              <span className="font-mono font-bold text-slate-950">
                Month {metrics.monthsToBreakeven}
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              First calendar month where cumulative gross profit surpasses CAC.
            </p>
          </div>

          {/* Row 2: Gross Profit per Account */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-slate-800 font-semibold text-sm">
              <span>Monthly Gross Profit / Account</span>
              <span className="font-mono font-bold text-slate-950">
                ${monthlyGrossProfit.toFixed(2)} / mo
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              ARPA adjusted for {inputs.grossMargin}% software gross margin.
            </p>
          </div>

          {/* Row 3: LTV:CAC Ratio */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-slate-800 font-semibold text-sm">
              <span>LTV:CAC Ratio</span>
              <span className="font-mono font-bold text-slate-950">
                {metrics.ltvCacRatio} : 1
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Lifetime customer return multiple (Target: ≥ 3.0x).
            </p>
          </div>

          {/* Row 4: Customer LTV */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-slate-800 font-semibold text-sm">
              <span>Customer Lifetime Value (LTV)</span>
              <span className="font-mono font-bold text-slate-950">
                ${metrics.ltv.toLocaleString()}
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Projected lifetime gross revenue over {metrics.customerLifespanMonths} months.
            </p>
          </div>

          {/* Row 5: Top Quartile VC Target */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-slate-800 font-semibold text-sm">
              <span>VC Benchmark Target</span>
              <span className="font-mono font-bold text-emerald-800">
                {selectedNiche.benchmarkContext.topQuartilePayback}
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Top-quartile efficiency benchmark for {selectedNiche.shortName}.
            </p>
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="pt-3 border-t border-[#d2edd0]/80 space-y-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900">
              Export Executive Model Summary
            </h3>
            <p className="text-xs text-slate-600">
              Download complete 36-month capital efficiency schedule and executive sensitivity table.
            </p>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#15803d] hover:bg-[#166534] active:bg-[#14532d] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-98"
          >
            <Download className="w-4 h-4 text-white" />
            <span>Export Executive Summary</span>
          </button>
        </div>
      </div>

      {/* 36-Month Breakeven Trajectory Chart Card */}
      <TrajectoryChart
        data={cashflowData}
        monthsToBreakeven={metrics.monthsToBreakeven}
        cacPaybackMonths={metrics.cacPaybackMonths}
      />
    </div>
  );
}
