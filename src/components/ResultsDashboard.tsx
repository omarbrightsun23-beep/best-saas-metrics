import React from 'react';
import {
  Clock,
  TrendingUp,
  DollarSign,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calculator,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { ComputedMetrics, FinancialInputs, SubNicheData, CashflowPoint } from '../types';
import { formatCurrency, formatCurrencyPrecise } from '../utils/financialMath';
import TrajectoryChart from './TrajectoryChart';

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
  // Status badge evaluation
  const paybackStatus =
    metrics.paybackHealth === 'excellent'
      ? { text: 'Healthy Payback (Top Quartile)', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', icon: CheckCircle2 }
      : metrics.paybackHealth === 'moderate'
      ? { text: 'Median Industry Pace', bg: 'bg-blue-50 text-blue-800 border-blue-200', icon: Sparkles }
      : { text: 'Extended Capital Drag', bg: 'bg-amber-50 text-amber-800 border-amber-200', icon: AlertTriangle };

  const StatusIcon = paybackStatus.icon;

  // Real-time calculation numbers for formula box
  const monthlyGrossProfit = inputs.arpa * (inputs.grossMargin / 100);

  return (
    <div id="results-dashboard-pane" className="space-y-6">
      {/* 1. Primary PayPro Global CAC Payback Result Card */}
      <div className="bg-white border-2 border-blue-600/90 rounded-3xl p-6 sm:p-7 shadow-md shadow-blue-900/5 space-y-4 relative overflow-hidden">
        {/* Top subtle blue accent glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-600 text-white shadow-2xs">
              <Clock className="w-4 h-4" />
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
              Calculated CAC Payback Period
            </h2>
          </div>

          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${paybackStatus.bg}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{paybackStatus.text}</span>
          </span>
        </div>

        {/* Large Display Value */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 font-mono tracking-tight">
              {metrics.cacPaybackMonths}
            </span>
            <span className="text-lg sm:text-xl font-bold text-slate-500">Months</span>
          </div>

          <div className="text-xs text-slate-600 sm:text-right font-medium">
            <span>Breakeven achieved at: </span>
            <span className="font-bold text-blue-700 font-mono">Month {metrics.monthsToBreakeven}</span>
          </div>
        </div>

        {/* 2. Interactive PayPro Global Dynamic Formula Box (Dark Terminal Theme) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-2.5 shadow-md">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Calculator className="w-3.5 h-3.5" />
              <span>SaaS CAC Payback Formula (ASC 606 Adjusted):</span>
            </span>
            <span className="font-mono text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Live Mathematical Substitution</span>
          </div>

          {/* Formula Expression */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto shadow-inner space-y-1.5">
            <div className="text-cyan-300 font-bold">
              CAC Payback Period = CAC ÷ (ARPA × Gross Margin %)
            </div>
            <div className="text-slate-300 flex items-center gap-2 flex-wrap pt-1.5 border-t border-slate-800">
              <span className="text-slate-400">=</span>
              <span className="text-yellow-300">${inputs.cac.toLocaleString()}</span>
              <span className="text-slate-400">÷</span>
              <span className="text-slate-300">(${inputs.arpa.toLocaleString()} × {inputs.grossMargin}%)</span>
              <span className="text-slate-400">=</span>
              <span className="text-yellow-300">${inputs.cac.toLocaleString()}</span>
              <span className="text-slate-400">÷</span>
              <span className="text-emerald-400">${monthlyGrossProfit.toFixed(2)}/mo</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 inline" />
              <span className="text-cyan-400 font-black font-mono text-sm">{metrics.cacPaybackMonths} Months</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Three Compact Supporting KPI Cards with Distinct Color Theming */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* LTV:CAC Ratio */}
        <div className="bg-white border-t-4 border-t-blue-600 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-xs space-y-1.5 transition">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>LTV:CAC Ratio</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            {metrics.ltvCacRatio}:1
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {metrics.ltvCacRatio >= 3 ? (
              <span className="text-emerald-700 font-semibold">Healthy Capital Multiplier (≥ 3x)</span>
            ) : (
              <span className="text-amber-700 font-semibold">Consider Margin / Churn Optimization</span>
            )}
          </p>
        </div>

        {/* Customer Lifetime Value (LTV) */}
        <div className="bg-white border-t-4 border-t-emerald-500 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-xs space-y-1.5 transition">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Customer LTV</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            {formatCurrency(metrics.ltv)}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {metrics.customerLifespanMonths} Mo average customer lifespan
          </p>
        </div>

        {/* Monthly Net Contribution */}
        <div className="bg-white border-t-4 border-t-indigo-600 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-xs space-y-1.5 transition">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
            <span>Monthly Net / Acct</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
            {formatCurrencyPrecise(metrics.netMonthlyArpu)}
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Gross profit after hosting & COGS
          </p>
        </div>
      </div>

      {/* 4. 36-Month Breakeven Trajectory Chart */}
      <TrajectoryChart
        data={cashflowData}
        monthsToBreakeven={metrics.monthsToBreakeven}
        cacPaybackMonths={metrics.cacPaybackMonths}
      />
    </div>
  );
}

