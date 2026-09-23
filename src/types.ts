export interface FinancialInputs {
  cac: number; // Customer Acquisition Cost ($500 - $50,000)
  arpa: number; // Average Revenue Per Account monthly ($50 - $5,000)
  grossMargin: number; // Gross Margin percentage (10% - 95%)
  churnRate: number; // Monthly Logo Churn percentage (0.5% - 10%)
  salesCycle: number; // Sales Cycle Duration in months (1 - 12)
}

export interface ComputedMetrics {
  netMonthlyArpu: number;
  cacPaybackMonths: number;
  ltv: number;
  ltvCacRatio: number;
  monthlyNetMargin: number;
  annualContractValue: number;
  customerLifespanMonths: number;
  monthsToBreakeven: number;
  threeYearNetProfit: number;
  paybackHealth: 'excellent' | 'moderate' | 'warning';
  ltvHealth: 'excellent' | 'moderate' | 'warning';
  paybackBadgeText: string;
  ltvBadgeText: string;
}

export interface CashflowPoint {
  month: number;
  nominalCumulative: number;
  churnAdjustedCumulative: number;
  monthlyCashflow: number;
  isBreakeven?: boolean;
}

export interface NicheBenchmark {
  cacRange: [number, number];
  arpaRange: [number, number];
  grossMarginMedian: number;
  churnRateMedian: number;
  salesCycleMedian: number;
  targetPaybackMedian: number;
  targetLtvCacMedian: number;
}

export interface SubNicheData {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  badge: string;
  description: string;
  defaults: FinancialInputs;
  benchmarks: NicheBenchmark;
  benchmarkContext: {
    topQuartilePayback: string;
    medianPayback: string;
    bottomQuartilePayback: string;
    topQuartileLtvCac: string;
    analysis: string;
  };
  reductionStrategies: {
    title: string;
    category: 'Sales Motion' | 'Pricing & Packaging' | 'Product Onboarding' | 'Retention & Expansion';
    impact: 'High' | 'Medium' | 'Critical';
    description: string;
    actionableTactic: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}

export interface AuthorProfile {
  name: string;
  title: string;
  credentials: string;
  bio: string;
  linkedinUrl: string;
  reviewerName: string;
  reviewerTitle: string;
  datePublished: string;
  dateModified: string;
}
