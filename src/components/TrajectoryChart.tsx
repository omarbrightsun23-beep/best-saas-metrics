'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Layers } from 'lucide-react';
import { CashflowPoint } from '../types';

interface TrajectoryChartProps {
  data: CashflowPoint[];
  monthsToBreakeven: number;
  cacPaybackMonths: number;
}

export default function TrajectoryChart({
  data,
  monthsToBreakeven,
  cacPaybackMonths,
}: TrajectoryChartProps) {
  const [timeHorizon, setTimeHorizon] = useState<12 | 24 | 36>(36);

  const displayData = data.slice(0, timeHorizon + 1);

  const formatCurrency = (val: number) => {
    if (Math.abs(val) >= 1000) {
      return `$${(val / 1000).toFixed(1)}k`;
    }
    return `$${Math.round(val)}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const point: CashflowPoint = payload[0].payload;
      return (
        <div className="bg-white border border-indigo-200 rounded-xl p-3.5 shadow-xl text-xs space-y-2 min-w-[210px]">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="font-bold text-slate-800">Month {label}</span>
            {point.month === monthsToBreakeven && (
              <span className="text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-indigo-200">
                Breakeven
              </span>
            )}
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between items-center text-slate-600">
              <span>Cohort Retained:</span>
              <span className="font-mono font-bold text-slate-900">{point.retainedCustomers.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Nominal Net:</span>
              <span className="font-mono font-bold text-indigo-600">{formatCurrency(point.nominalCumulative)}</span>
            </div>
            <div className="flex justify-between items-center text-violet-900">
              <span>Churn-Adjusted Net:</span>
              <span className="font-mono font-bold text-violet-700">{formatCurrency(point.churnAdjustedCumulative)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 pt-1 border-t border-slate-100">
              <span>Monthly Margin:</span>
              <span className="font-mono text-slate-700">{formatCurrency(point.monthlyCashflow)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="trajectory-chart-container" className="bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Cumulative Cashflow Trajectory
            </h3>
            <p className="text-xs text-slate-500">
              Gross margin-adjusted CAC amortization with compound cohort decay
            </p>
          </div>
        </div>

        {/* Time Horizon Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <div className="px-2 text-slate-400 hidden sm:flex items-center gap-1 text-[11px]">
            <Layers className="w-3 h-3" />
            <span>Horizon:</span>
          </div>
          <button
            type="button"
            onClick={() => setTimeHorizon(12)}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              timeHorizon === 12
                ? 'bg-white text-indigo-950 shadow-xs ring-1 ring-indigo-200 font-bold'
                : 'text-slate-600 hover:text-indigo-900 hover:bg-slate-200/60'
            }`}
          >
            12 Mo
          </button>
          <button
            type="button"
            onClick={() => setTimeHorizon(24)}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              timeHorizon === 24
                ? 'bg-white text-indigo-950 shadow-xs ring-1 ring-indigo-200 font-bold'
                : 'text-slate-600 hover:text-indigo-900 hover:bg-slate-200/60'
            }`}
          >
            24 Mo
          </button>
          <button
            type="button"
            onClick={() => setTimeHorizon(36)}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              timeHorizon === 36
                ? 'bg-white text-indigo-950 shadow-xs ring-1 ring-indigo-200 font-bold'
                : 'text-slate-600 hover:text-indigo-900 hover:bg-slate-200/60'
            }`}
          >
            36 Mo
          </button>
        </div>
      </div>

      <div className="h-[280px] sm:h-[320px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={displayData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cashflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              tickFormatter={(m) => `M${m}`}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Breakeven Horizon Marker */}
            <ReferenceLine
              y={0}
              stroke="#64748b"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />
            <ReferenceLine
              x={monthsToBreakeven}
              stroke="#6366F1"
              strokeDasharray="3 3"
              strokeWidth={1.5}
            />
            <Area
              type="monotone"
              dataKey="churnAdjustedCumulative"
              fill="url(#cashflowGradient)"
              stroke="#6366F1"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: '#6366F1', stroke: '#ffffff', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="nominalCumulative"
              stroke="#8B5CF6"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Key Takeaway */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span className="text-slate-700 font-medium">Churn-Adjusted Net Cashflow</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
            <span className="text-slate-700 font-medium">Nominal (Zero Churn)</span>
          </div>
        </div>
        <div className="text-slate-600 font-medium">
          Cash Breakeven at: <strong className="text-indigo-900 font-bold">Month {monthsToBreakeven}</strong>
        </div>
      </div>
    </div>
  );
}
