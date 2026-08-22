// 2025 state income-tax figures for the pilot states. Sourced from each
// state's published brackets -- these change periodically, verify against
// the state's Department of Revenue before relying on this for tax planning.
import { applyBrackets, FEDERAL_STANDARD_DEDUCTION, type FilingStatus, type TaxBracket } from './federalTax';

export interface StateTaxConfig {
  slug: string;
  name: string;
  hasIncomeTax: boolean;
  standardDeduction?: Record<FilingStatus, number>;
  brackets?: Record<FilingStatus, TaxBracket[]>;
  /** Extra flat surcharge rate applied above a threshold (e.g. CA's Mental Health Services Tax). */
  surcharge?: { rate: number; threshold: number };
  notes?: string;
}

const CA_BRACKETS_SINGLE: TaxBracket[] = [
  { rate: 0.01, upTo: 10_756 },
  { rate: 0.02, upTo: 25_499 },
  { rate: 0.04, upTo: 40_245 },
  { rate: 0.06, upTo: 55_866 },
  { rate: 0.08, upTo: 70_606 },
  { rate: 0.093, upTo: 360_659 },
  { rate: 0.103, upTo: 432_787 },
  { rate: 0.113, upTo: 721_314 },
  { rate: 0.123, upTo: Infinity },
];

const CA_BRACKETS_MFJ: TaxBracket[] = [
  { rate: 0.01, upTo: 21_512 },
  { rate: 0.02, upTo: 50_998 },
  { rate: 0.04, upTo: 80_490 },
  { rate: 0.06, upTo: 111_732 },
  { rate: 0.08, upTo: 141_212 },
  { rate: 0.093, upTo: 721_318 },
  { rate: 0.103, upTo: 865_574 },
  { rate: 0.113, upTo: 1_442_628 },
  { rate: 0.123, upTo: Infinity },
];

const NY_BRACKETS_SINGLE: TaxBracket[] = [
  { rate: 0.04, upTo: 8_500 },
  { rate: 0.045, upTo: 11_700 },
  { rate: 0.0525, upTo: 13_900 },
  { rate: 0.055, upTo: 80_650 },
  { rate: 0.06, upTo: 215_400 },
  { rate: 0.0685, upTo: 1_077_550 },
  { rate: 0.0965, upTo: 5_000_000 },
  { rate: 0.103, upTo: 25_000_000 },
  { rate: 0.109, upTo: Infinity },
];

const NY_BRACKETS_MFJ: TaxBracket[] = [
  { rate: 0.04, upTo: 17_150 },
  { rate: 0.045, upTo: 23_600 },
  { rate: 0.0525, upTo: 27_900 },
  { rate: 0.055, upTo: 161_550 },
  { rate: 0.06, upTo: 323_200 },
  { rate: 0.0685, upTo: 2_155_350 },
  { rate: 0.0965, upTo: 5_000_000 },
  { rate: 0.103, upTo: 25_000_000 },
  { rate: 0.109, upTo: Infinity },
];

// Flat-rate states: modeled as a single-bracket table so the same
// applyBrackets() logic handles them -- no separate flat-tax code path needed.
const flatBracket = (rate: number): TaxBracket[] => [{ rate, upTo: Infinity }];
const ZERO_DEDUCTION: Record<FilingStatus, number> = { single: 0, marriedJoint: 0, headOfHousehold: 0 };

export const STATE_TAX_CONFIGS: Record<string, StateTaxConfig> = {
  texas: { slug: 'texas', name: 'Texas', hasIncomeTax: false },
  florida: { slug: 'florida', name: 'Florida', hasIncomeTax: false },
  washington: { slug: 'washington', name: 'Washington', hasIncomeTax: false },
  nevada: { slug: 'nevada', name: 'Nevada', hasIncomeTax: false },
  tennessee: { slug: 'tennessee', name: 'Tennessee', hasIncomeTax: false },
  wyoming: { slug: 'wyoming', name: 'Wyoming', hasIncomeTax: false },
  'south-dakota': { slug: 'south-dakota', name: 'South Dakota', hasIncomeTax: false },
  alaska: { slug: 'alaska', name: 'Alaska', hasIncomeTax: false },
  'new-hampshire': { slug: 'new-hampshire', name: 'New Hampshire', hasIncomeTax: false },
  pennsylvania: {
    slug: 'pennsylvania',
    name: 'Pennsylvania',
    hasIncomeTax: true,
    standardDeduction: ZERO_DEDUCTION,
    brackets: { single: flatBracket(0.0307), marriedJoint: flatBracket(0.0307), headOfHousehold: flatBracket(0.0307) },
    notes: 'Flat 3.07% state tax on all compensation, no standard deduction. Does not include local Earned Income Tax (EIT), which most PA municipalities also levy.',
  },
  illinois: {
    slug: 'illinois',
    name: 'Illinois',
    hasIncomeTax: true,
    standardDeduction: { single: 2_775, marriedJoint: 5_550, headOfHousehold: 2_775 },
    brackets: { single: flatBracket(0.0495), marriedJoint: flatBracket(0.0495), headOfHousehold: flatBracket(0.0495) },
    notes: 'Flat 4.95% state tax after the personal exemption.',
  },
  colorado: {
    slug: 'colorado',
    name: 'Colorado',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 30_000, headOfHousehold: 22_500 },
    brackets: { single: flatBracket(0.044), marriedJoint: flatBracket(0.044), headOfHousehold: flatBracket(0.044) },
    notes: 'Flat 4.4% tax on federal taxable income (approximated here using the federal standard deduction).',
  },
  arizona: {
    slug: 'arizona',
    name: 'Arizona',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 30_000, headOfHousehold: 22_500 },
    brackets: { single: flatBracket(0.025), marriedJoint: flatBracket(0.025), headOfHousehold: flatBracket(0.025) },
    notes: 'Flat 2.5% state tax.',
  },
  'north-carolina': {
    slug: 'north-carolina',
    name: 'North Carolina',
    hasIncomeTax: true,
    standardDeduction: { single: 12_750, marriedJoint: 25_500, headOfHousehold: 19_125 },
    brackets: { single: flatBracket(0.045), marriedJoint: flatBracket(0.045), headOfHousehold: flatBracket(0.045) },
    notes: 'Flat 4.5% state tax.',
  },
  michigan: {
    slug: 'michigan',
    name: 'Michigan',
    hasIncomeTax: true,
    standardDeduction: { single: 5_600, marriedJoint: 11_200, headOfHousehold: 5_600 },
    brackets: { single: flatBracket(0.0425), marriedJoint: flatBracket(0.0425), headOfHousehold: flatBracket(0.0425) },
    notes: 'Flat 4.25% state tax after the personal exemption. Does not include local city income tax (e.g. Detroit).',
  },
  california: {
    slug: 'california',
    name: 'California',
    hasIncomeTax: true,
    standardDeduction: { single: 5_540, marriedJoint: 11_080, headOfHousehold: 5_540 },
    brackets: { single: CA_BRACKETS_SINGLE, marriedJoint: CA_BRACKETS_MFJ, headOfHousehold: CA_BRACKETS_SINGLE },
    surcharge: { rate: 0.01, threshold: 1_000_000 },
    notes: 'Includes the 1% Mental Health Services Tax on taxable income above $1,000,000.',
  },
  'new-york': {
    slug: 'new-york',
    name: 'New York',
    hasIncomeTax: true,
    standardDeduction: { single: 8_000, marriedJoint: 16_050, headOfHousehold: 11_200 },
    brackets: { single: NY_BRACKETS_SINGLE, marriedJoint: NY_BRACKETS_MFJ, headOfHousehold: NY_BRACKETS_SINGLE },
    notes: 'State tax only -- does not include NYC or Yonkers local income tax.',
  },
  utah: {
    slug: 'utah',
    name: 'Utah',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 30_000, headOfHousehold: 22_500 },
    brackets: { single: flatBracket(0.0465), marriedJoint: flatBracket(0.0465), headOfHousehold: flatBracket(0.0465) },
    notes: 'Flat 4.65% state tax (approximated here using the federal standard deduction; Utah uses a state taxpayer credit rather than a separate deduction).',
  },
  kentucky: {
    slug: 'kentucky',
    name: 'Kentucky',
    hasIncomeTax: true,
    standardDeduction: { single: 3_160, marriedJoint: 6_320, headOfHousehold: 3_160 },
    brackets: { single: flatBracket(0.04), marriedJoint: flatBracket(0.04), headOfHousehold: flatBracket(0.04) },
    notes: 'Flat 4% state tax.',
  },
  massachusetts: {
    slug: 'massachusetts',
    name: 'Massachusetts',
    hasIncomeTax: true,
    standardDeduction: { single: 4_400, marriedJoint: 8_800, headOfHousehold: 6_800 },
    brackets: { single: flatBracket(0.05), marriedJoint: flatBracket(0.05), headOfHousehold: flatBracket(0.05) },
    surcharge: { rate: 0.04, threshold: 1_000_000 },
    notes: 'Flat 5% state tax, plus the additional 4% "Millionaires Tax" surtax on taxable income above $1,000,000.',
  },
  indiana: {
    slug: 'indiana',
    name: 'Indiana',
    hasIncomeTax: true,
    standardDeduction: { single: 1_000, marriedJoint: 2_000, headOfHousehold: 1_000 },
    brackets: { single: flatBracket(0.0305), marriedJoint: flatBracket(0.0305), headOfHousehold: flatBracket(0.0305) },
    notes: 'Flat 3.05% state tax after the personal exemption. Does not include county income tax, which every Indiana county also levies.',
  },
  georgia: {
    slug: 'georgia',
    name: 'Georgia',
    hasIncomeTax: true,
    standardDeduction: { single: 12_000, marriedJoint: 24_000, headOfHousehold: 18_000 },
    brackets: { single: flatBracket(0.0539), marriedJoint: flatBracket(0.0539), headOfHousehold: flatBracket(0.0539) },
    notes: 'Flat 5.39% state tax (Georgia moved from progressive brackets to a flat rate in 2024).',
  },
  mississippi: {
    slug: 'mississippi',
    name: 'Mississippi',
    hasIncomeTax: true,
    standardDeduction: ZERO_DEDUCTION,
    brackets: {
      single: [{ rate: 0, upTo: 10_000 }, { rate: 0.047, upTo: Infinity }],
      marriedJoint: [{ rate: 0, upTo: 10_000 }, { rate: 0.047, upTo: Infinity }],
      headOfHousehold: [{ rate: 0, upTo: 10_000 }, { rate: 0.047, upTo: Infinity }],
    },
    notes: 'No tax on the first $10,000 of taxable income, 4.7% above that.',
  },
  idaho: {
    slug: 'idaho',
    name: 'Idaho',
    hasIncomeTax: true,
    standardDeduction: FEDERAL_STANDARD_DEDUCTION,
    brackets: { single: flatBracket(0.053), marriedJoint: flatBracket(0.053), headOfHousehold: flatBracket(0.053) },
    notes: 'Flat 5.3% state tax (cut from 5.695%, effective January 1, 2025). Uses the federal standard deduction.',
  },
  iowa: {
    slug: 'iowa',
    name: 'Iowa',
    hasIncomeTax: true,
    standardDeduction: FEDERAL_STANDARD_DEDUCTION,
    brackets: { single: flatBracket(0.038), marriedJoint: flatBracket(0.038), headOfHousehold: flatBracket(0.038) },
    notes: 'Flat 3.8% state tax, effective tax year 2025 (Iowa Senate File 2442). Uses the federal standard deduction.',
  },
  louisiana: {
    slug: 'louisiana',
    name: 'Louisiana',
    hasIncomeTax: true,
    standardDeduction: { single: 12_500, marriedJoint: 25_000, headOfHousehold: 25_000 },
    brackets: { single: flatBracket(0.03), marriedJoint: flatBracket(0.03), headOfHousehold: flatBracket(0.03) },
    notes: 'Flat 3% state tax, effective tax year 2025. Personal/dependent exemptions were eliminated and replaced by this larger standard deduction.',
  },
};

export function calculateStateTax(
  grossAnnualIncome: number,
  filingStatus: FilingStatus,
  config: StateTaxConfig,
): number {
  if (!config.hasIncomeTax || !config.brackets || !config.standardDeduction) return 0;
  const taxableIncome = Math.max(0, grossAnnualIncome - config.standardDeduction[filingStatus]);
  let tax = applyBrackets(taxableIncome, config.brackets[filingStatus]);
  if (config.surcharge && taxableIncome > config.surcharge.threshold) {
    tax += (taxableIncome - config.surcharge.threshold) * config.surcharge.rate;
  }
  return tax;
}
