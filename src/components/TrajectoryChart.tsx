import React, { useState } from 'react';
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

  // Custom Tooltip component for Light Theme
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload as CashflowPoint;
      const isPastBreakeven = point.nominalCumulative >= 0;

      return (
        <div className="bg-white border border-blue-200 rounded-xl p-3.5 shadow-xl text-xs space-y-2 min-w-[210px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 font-bold text-slate-900">
            <span>Month {point.month}</span>
            {point.month === 0 ? (
              <span className="text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-rose-200">
                CAC Outlay
              </span>
            ) : isPastBreakeven ? (
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                Net Profitable
              </span>
            ) : (
              <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-200">
                Recovering CAC
              </span>
            )}
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center text-blue-900">
              <span className="font-medium">Nominal Cumulative:</span>
              <span className="font-mono font-bold text-blue-700">{formatCurrency(point.nominalCumulative)}</span>
            </div>
            <div className="flex justify-between items-center text-emerald-900">
              <span className="font-medium">Churn-Adjusted Net:</span>
              <span className="font-mono font-bold text-emerald-700">{formatCurrency(point.churnAdjustedCumulative)}</span>
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

  return (
    <div id="trajectory-chart-container" className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 shadow-2xs">
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
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200/60'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/60'
            }`}
          >
            All Curves
          </button>
          <button
            type="button"
            onClick={() => setViewMode('churnAdjusted')}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 font-bold cursor-pointer active:scale-95 ${
              viewMode === 'churnAdjusted'
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200/60'
                : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-200/60'
            }`}
          >
            Churn-Adjusted
          </button>
          <button
            type="button"
            onClick={() => setViewMode('nominal')}
            className={`px-3.5 py-1.5 rounded-lg transition-all duration-150 font-bold cursor-pointer active:scale-95 ${
              viewMode === 'nominal'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200/60'
                : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/60'
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
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
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
                stroke="#059669"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{
                  value: `Payback: ~${cacPaybackMonths} mo`,
                  fill: '#065f46',
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
                stroke="#2563eb"
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
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-slate-800 font-medium">Nominal 100% Retention Cashflow</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-600 font-medium">
          Cash Breakeven at: <strong className="text-emerald-700 font-bold">Month {monthsToBreakeven}</strong>
        </div>
      </div>
    </div>
  );
}
