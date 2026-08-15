import { calculateFederalTax, calculateFICA, type FilingStatus } from './federalTax';
import { calculateStateTax, type StateTaxConfig } from './stateTax';

export type PayFrequency = 'annual' | 'monthly' | 'biweekly' | 'weekly';

export const PAY_PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  biweekly: 26,
  weekly: 52,
};

export interface PaycheckBreakdown {
  grossAnnual: number;
  federalTax: number;
  socialSecurity: number;
  medicare: number;
  stateTax: number;
  totalTax: number;
  netAnnual: number;
  effectiveTaxRate: number;
}

export function calculatePaycheck(
  grossAnnualIncome: number,
  filingStatus: FilingStatus,
  stateConfig: StateTaxConfig,
): PaycheckBreakdown {
  const gross = Math.max(0, grossAnnualIncome);
  const federalTax = calculateFederalTax(gross, filingStatus);
  const fica = calculateFICA(gross, filingStatus);
  const stateTax = calculateStateTax(gross, filingStatus, stateConfig);
  const totalTax = federalTax + fica.total + stateTax;
  const netAnnual = gross - totalTax;

  return {
    grossAnnual: gross,
    federalTax,
    socialSecurity: fica.socialSecurity,
    medicare: fica.medicare,
    stateTax,
    totalTax,
    netAnnual,
    effectiveTaxRate: gross > 0 ? totalTax / gross : 0,
  };
}

export function forPeriod(annualAmount: number, frequency: PayFrequency): number {
  return annualAmount / PAY_PERIODS_PER_YEAR[frequency];
}
