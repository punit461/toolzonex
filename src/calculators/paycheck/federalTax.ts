// 2025 federal tax-year figures (IRS Rev. Proc. 2024-40). These are
// inflation-adjusted annually -- verify against irs.gov before relying on
// this for tax planning.

export type FilingStatus = 'single' | 'marriedJoint' | 'headOfHousehold';

export interface TaxBracket {
  rate: number; // e.g. 0.10 for 10%
  upTo: number; // upper bound of this bracket, Infinity for the top bracket
}

export const FEDERAL_BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { rate: 0.10, upTo: 11_925 },
    { rate: 0.12, upTo: 48_475 },
    { rate: 0.22, upTo: 103_350 },
    { rate: 0.24, upTo: 197_300 },
    { rate: 0.32, upTo: 250_525 },
    { rate: 0.35, upTo: 626_350 },
    { rate: 0.37, upTo: Infinity },
  ],
  marriedJoint: [
    { rate: 0.10, upTo: 23_850 },
    { rate: 0.12, upTo: 96_950 },
    { rate: 0.22, upTo: 206_700 },
    { rate: 0.24, upTo: 394_600 },
    { rate: 0.32, upTo: 501_050 },
    { rate: 0.35, upTo: 751_600 },
    { rate: 0.37, upTo: Infinity },
  ],
  headOfHousehold: [
    { rate: 0.10, upTo: 17_000 },
    { rate: 0.12, upTo: 64_850 },
    { rate: 0.22, upTo: 103_350 },
    { rate: 0.24, upTo: 197_300 },
    { rate: 0.32, upTo: 250_500 },
    { rate: 0.35, upTo: 626_350 },
    { rate: 0.37, upTo: Infinity },
  ],
};

export const FEDERAL_STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 15_000,
  marriedJoint: 30_000,
  headOfHousehold: 22_500,
};

/** Applies a progressive bracket table to a taxable-income amount. */
export function applyBrackets(taxableIncome: number, brackets: TaxBracket[]): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  let lowerBound = 0;
  for (const { rate, upTo } of brackets) {
    if (taxableIncome <= lowerBound) break;
    const bandAmount = Math.min(taxableIncome, upTo) - lowerBound;
    tax += bandAmount * rate;
    lowerBound = upTo;
  }
  return tax;
}

export function calculateFederalTax(grossAnnualIncome: number, filingStatus: FilingStatus): number {
  const taxableIncome = Math.max(0, grossAnnualIncome - FEDERAL_STANDARD_DEDUCTION[filingStatus]);
  return applyBrackets(taxableIncome, FEDERAL_BRACKETS[filingStatus]);
}

// FICA -- 2025 figures (SSA.gov). The Social Security wage base changes
// annually; Medicare rates/thresholds have been stable since 2013.
export const SOCIAL_SECURITY_RATE = 0.062;
export const SOCIAL_SECURITY_WAGE_BASE_2025 = 176_100;
export const MEDICARE_RATE = 0.0145;
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200_000,
  marriedJoint: 250_000,
  headOfHousehold: 200_000,
};

export function calculateFICA(grossAnnualIncome: number, filingStatus: FilingStatus) {
  const socialSecurity = Math.min(grossAnnualIncome, SOCIAL_SECURITY_WAGE_BASE_2025) * SOCIAL_SECURITY_RATE;
  const medicare = grossAnnualIncome * MEDICARE_RATE;
  const additionalMedicareThreshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus];
  const additionalMedicare = Math.max(0, grossAnnualIncome - additionalMedicareThreshold) * ADDITIONAL_MEDICARE_RATE;
  return {
    socialSecurity,
    medicare: medicare + additionalMedicare,
    total: socialSecurity + medicare + additionalMedicare,
  };
}
