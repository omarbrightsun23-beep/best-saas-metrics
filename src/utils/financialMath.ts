import { CashflowPoint, ComputedMetrics, FinancialInputs } from '../types';

/**
 * Calculates exact SaaS Unit Economics and Payback Period metrics
 * adhering strictly to corporate finance and venture standards.
 */
export function calculateMetrics(inputs: FinancialInputs): ComputedMetrics {
  const cac = Math.max(1, inputs.cac);
  const arpa = Math.max(1, inputs.arpa);
  const grossMarginPct = Math.max(1, Math.min(100, inputs.grossMargin)) / 100;
  const churnRatePct = Math.max(0.001, Math.min(100, inputs.churnRate)) / 100;

  // 1. Net Monthly ARPU = ARPA * Gross Margin %
  const netMonthlyArpu = arpa * grossMarginPct;

  // 2. CAC Payback Period (Months) = CAC / Net Monthly ARPU
  const cacPaybackMonths = netMonthlyArpu > 0 ? cac / netMonthlyArpu : 999;

  // 3. Customer Lifetime Value (LTV) = (Monthly ARPU * Gross Margin %) / Monthly Churn Rate %
  const ltv = churnRatePct > 0 ? (arpa * grossMarginPct) / churnRatePct : 0;

  // 4. LTV:CAC Ratio = LTV / CAC
  const ltvCacRatio = cac > 0 ? ltv / cac : 0;

  // Additional enterprise insights
  const monthlyNetMargin = netMonthlyArpu;
  const annualContractValue = arpa * 12;
  const customerLifespanMonths = churnRatePct > 0 ? 1 / churnRatePct : 0;
  const monthsToBreakeven = Math.ceil(cacPaybackMonths);

  // 3-Year (36-month) Net Profit per Customer considering retention curve
  let threeYearGrossProfit = 0;
  for (let m = 1; m <= 36; m++) {
    const survivalRate = Math.pow(1 - churnRatePct, m - 1);
    threeYearGrossProfit += netMonthlyArpu * survivalRate;
  }
  const threeYearNetProfit = threeYearGrossProfit - cac;

  // Health indicators based on venture capital standards
  let paybackHealth: 'excellent' | 'moderate' | 'warning' = 'excellent';
  let paybackBadgeText = 'High Efficiency (< 12 mo)';
  if (cacPaybackMonths <= 12) {
    paybackHealth = 'excellent';
    paybackBadgeText = 'Top Quartile (< 12 mo)';
  } else if (cacPaybackMonths <= 18) {
    paybackHealth = 'moderate';
    paybackBadgeText = 'Healthy Benchmark (12–18 mo)';
  } else {
    paybackHealth = 'warning';
    paybackBadgeText = 'High Cash Drag (> 18 mo)';
  }

  let ltvHealth: 'excellent' | 'moderate' | 'warning' = 'excellent';
  let ltvBadgeText = 'Superb Unit ROI (≥ 3.5x)';
  if (ltvCacRatio >= 3.5) {
    ltvHealth = 'excellent';
    ltvBadgeText = 'Strong Value Creation (≥ 3.5x)';
  } else if (ltvCacRatio >= 2.0) {
    ltvHealth = 'moderate';
    ltvBadgeText = 'Moderate Viability (2.0x–3.5x)';
  } else {
    ltvHealth = 'warning';
    ltvBadgeText = 'Underperforming (< 2.0x)';
  }

  return {
    netMonthlyArpu: Number(netMonthlyArpu.toFixed(2)),
    cacPaybackMonths: Number(cacPaybackMonths.toFixed(1)),
    ltv: Math.round(ltv),
    ltvCacRatio: Number(ltvCacRatio.toFixed(1)),
    monthlyNetMargin: Number(monthlyNetMargin.toFixed(2)),
    annualContractValue: Math.round(annualContractValue),
    customerLifespanMonths: Number(customerLifespanMonths.toFixed(1)),
    monthsToBreakeven,
    threeYearNetProfit: Math.round(threeYearNetProfit),
    paybackHealth,
    ltvHealth,
    paybackBadgeText,
    ltvBadgeText,
  };
}

/**
 * Computes 36-Month Cashflow Trajectory for Recharts Visualization
 */
export function generateCashflowTrajectory(inputs: FinancialInputs): CashflowPoint[] {
  const cac = Math.max(1, inputs.cac);
  const arpa = Math.max(1, inputs.arpa);
  const grossMarginPct = inputs.grossMargin / 100;
  const churnRatePct = inputs.churnRate / 100;
  const netMonthlyArpu = arpa * grossMarginPct;

  const trajectory: CashflowPoint[] = [];

  // Month 0: Upfront CAC spent
  trajectory.push({
    month: 0,
    nominalCumulative: Math.round(-cac),
    churnAdjustedCumulative: Math.round(-cac),
    monthlyCashflow: Math.round(-cac),
  });

  let cumulativeNominal = -cac;
  let cumulativeAdjusted = -cac;

  for (let m = 1; m <= 36; m++) {
    cumulativeNominal += netMonthlyArpu;

    // Survival probability at month m
    const survivalRate = Math.pow(1 - churnRatePct, m - 1);
    const monthAdjustedMargin = netMonthlyArpu * survivalRate;
    cumulativeAdjusted += monthAdjustedMargin;

    trajectory.push({
      month: m,
      nominalCumulative: Math.round(cumulativeNominal),
      churnAdjustedCumulative: Math.round(cumulativeAdjusted),
      monthlyCashflow: Math.round(monthAdjustedMargin),
      isBreakeven: (cumulativeNominal >= 0 && trajectory[m - 1]?.nominalCumulative < 0),
    });
  }

  return trajectory;
}

export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyPrecise(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatMonths(months: number): string {
  if (months >= 999) return 'N/A';
  return `${months.toFixed(1)} Months`;
}
