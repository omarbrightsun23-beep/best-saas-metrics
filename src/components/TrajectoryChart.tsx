'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CashflowPoint } from '../types';
import { formatCurrency } from '../utils/financialMath';
import { TrendingUp } from 'lucide-react';

interface TrajectoryChartProps {
  data: CashflowPoint[];
  monthsToBreakeven: number;
  cacPaybackMonths: number;
}

export default function TrajectoryChart({ data, monthsToBreakeven, cacPaybackMonths }: TrajectoryChartProps) {
  const [viewMode, setViewMode] = useState<'both' | 'churnAdjusted' | 'nominal'>('both');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as CashflowPoint;
      const isPastBreakeven = point.nominalCumulative >= 0;

      return (
        <div className="bg-white border border-[#15803d] rounded-xl p-3.5 shadow-xl text-xs space-y-2 min-w-[210px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 font-bold text-slate-900">
            <span>Month {point.month}</span>
            {point.month === 0 ? (
              <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-rose-200">
                CAC Outlay
              </span>
            ) : isPastBreakeven ? (
              <span className="text-emerald-800 bg-[#eef8ed] px-1.5 py-0.5 rounded text-[10px] font-bold border border-[#d2edd0]">
                Net Profitable
              </span>
            ) : (
              <span className="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-200">
                Recovering CAC
              </span>
            )}
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center text-slate-800">
              <span className="font-medium">Nominal Cumulative:</span>
              <span className="font-mono font-bold text-[#15803d]">{formatCurrency(point.nominalCumulative)}</span>
            </div>
            <div className="flex justify-between items-center text-emerald-900">
              <span className="font-medium">Churn-Adjusted Net:</span>
              <span className="font-mono font-bold text-emerald-800">{formatCurrency(point.churnAdjustedCumulative)}</span>
            </div>
            {point.month > 0 && (
              <div className="flex justify-between items-center text-slate-600 border-t border-slate-100 pt-1.5">
                <span>Monthly Net Margin:</span>
                <span className="font-mono font-semibold text-slate-800">{formatCurrency(point.monthlyCashflow)}/mo</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (!isMounted) {
    return (
      <div id="trajectory-chart-container" className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <div className="p-1.5 rounded-lg bg-[#eef8ed] text-[#15803d] border border-[#d2edd0] shadow-2xs">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-base font-black text-slate-900">36-Month Cumulative Cashflow Trajectory</h3>
        </div>
        <div className="w-full h-64 sm:h-72 bg-slate-50/80 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400">
          Loading interactive trajectory chart...
        </div>
      </div>
    );
  }

  return (
    <div id="trajectory-chart-container" className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#eef8ed] text-[#15803d] border border-[#d2edd0] shadow-2xs">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-900">36-Month Cumulative Cashflow Trajectory</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Visualizes capital breakeven horizon and realized cash accumulation over time.
          </p>
        </div>

        {/* View Toggle */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs shadow-inner">
          <button
            type="button"
            onClick={() => setViewMode('both')}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 font-bold cursor-pointer active:scale-95 ${
              viewMode === 'both'
                ? 'bg-white text-emerald-950 shadow-xs ring-1 ring-[#d2edd0]'
                : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-200/60'
            }`}
          >
            All Curves
          </button>
          <button
            type="button"
            onClick={() => setViewMode('churnAdjusted')}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 font-bold cursor-pointer active:scale-95 ${
              viewMode === 'churnAdjusted'
                ? 'bg-white text-emerald-950 shadow-xs ring-1 ring-[#d2edd0]'
                : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-200/60'
            }`}
          >
            Churn-Adjusted
          </button>
          <button
            type="button"
            onClick={() => setViewMode('nominal')}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 font-bold cursor-pointer active:scale-95 ${
              viewMode === 'nominal'
                ? 'bg-white text-emerald-950 shadow-xs ring-1 ring-[#d2edd0]'
                : 'text-slate-600 hover:text-emerald-900 hover:bg-slate-200/60'
            }`}
          >
            Nominal
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradientNominalLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#15803d" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#15803d" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="gradientAdjustedLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              tickFormatter={(v) => (v === 0 ? 'Day 0' : `M${v}`)}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCurrency(v)}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Breakeven Horizon Reference Line */}
            <ReferenceLine
              y={0}
              stroke="#64748b"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Breakeven ($0)',
                fill: '#475569',
                fontSize: 10,
                position: 'insideTopRight',
              }}
            />
            {cacPaybackMonths > 0 && cacPaybackMonths <= 36 && (
              <ReferenceLine
                x={Math.min(36, monthsToBreakeven)}
                stroke="#15803d"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{
                  value: `Payback: ~${cacPaybackMonths} mo`,
                  fill: '#14532d',
                  fontSize: 10,
                  position: 'top',
                }}
              />
            )}
            {(viewMode === 'both' || viewMode === 'nominal') && (
              <Area
                type="monotone"
                dataKey="nominalCumulative"
                name="Nominal Cashflow"
                stroke="#15803d"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#gradientNominalLight)"
              />
            )}
            {(viewMode === 'both' || viewMode === 'churnAdjusted') && (
              <Area
                type="monotone"
                dataKey="churnAdjustedCumulative"
                name="Churn-Adjusted Net Cashflow"
                stroke="#059669"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#gradientAdjustedLight)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Highlights */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-600 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="text-slate-800 font-medium">Churn-Adjusted Realized Cashflow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
            <span className="text-slate-800 font-medium">Nominal 100% Retention Cashflow</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-600 font-medium">
          Cash Breakeven at: <strong className="text-emerald-900 font-bold">Month {monthsToBreakeven}</strong>
        </div>
      </div>
    </div>
  );
}
