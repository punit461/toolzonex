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
  /** Flat per-filer tax credit some states use instead of (or alongside) a deduction -- subtracted from tax owed, not from taxable income. */
  credit?: Record<FilingStatus, number>;
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
  alabama: {
    slug: 'alabama',
    name: 'Alabama',
    hasIncomeTax: true,
    standardDeduction: { single: 4_500, marriedJoint: 11_500, headOfHousehold: 6_750 },
    brackets: {
      single: [{ rate: 0.02, upTo: 500 }, { rate: 0.04, upTo: 3_000 }, { rate: 0.05, upTo: Infinity }],
      marriedJoint: [{ rate: 0.02, upTo: 1_000 }, { rate: 0.04, upTo: 6_000 }, { rate: 0.05, upTo: Infinity }],
      headOfHousehold: [{ rate: 0.02, upTo: 500 }, { rate: 0.04, upTo: 3_000 }, { rate: 0.05, upTo: Infinity }],
    },
    notes: 'Standard deduction combines the base standard deduction and personal exemption. Head of household deduction approximated at 1.5x single.',
  },
  arkansas: {
    slug: 'arkansas',
    name: 'Arkansas',
    hasIncomeTax: true,
    standardDeduction: { single: 2_410, marriedJoint: 4_820, headOfHousehold: 3_615 },
    brackets: {
      single: [{ rate: 0.02, upTo: 4_500 }, { rate: 0.039, upTo: Infinity }],
      marriedJoint: [{ rate: 0.02, upTo: 4_500 }, { rate: 0.039, upTo: Infinity }],
      headOfHousehold: [{ rate: 0.02, upTo: 4_500 }, { rate: 0.039, upTo: Infinity }],
    },
    credit: { single: 29, marriedJoint: 58, headOfHousehold: 29 },
    notes: 'Includes Arkansas\'s small per-filer tax credit (subtracted from tax owed, not from taxable income). Head of household deduction approximated at 1.5x single.',
  },
  connecticut: {
    slug: 'connecticut',
    name: 'Connecticut',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 24_000, headOfHousehold: 22_500 },
    brackets: {
      single: [
        { rate: 0.02, upTo: 10_000 }, { rate: 0.045, upTo: 50_000 }, { rate: 0.055, upTo: 100_000 },
        { rate: 0.06, upTo: 200_000 }, { rate: 0.065, upTo: 250_000 }, { rate: 0.069, upTo: 500_000 },
        { rate: 0.0699, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.02, upTo: 20_000 }, { rate: 0.045, upTo: 100_000 }, { rate: 0.055, upTo: 200_000 },
        { rate: 0.06, upTo: 400_000 }, { rate: 0.065, upTo: 500_000 }, { rate: 0.069, upTo: 1_000_000 },
        { rate: 0.0699, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.02, upTo: 10_000 }, { rate: 0.045, upTo: 50_000 }, { rate: 0.055, upTo: 100_000 },
        { rate: 0.06, upTo: 200_000 }, { rate: 0.065, upTo: 250_000 }, { rate: 0.069, upTo: 500_000 },
        { rate: 0.0699, upTo: Infinity },
      ],
    },
    notes: 'Connecticut actually uses a personal exemption plus a phase-out "recapture" mechanism at higher incomes, not a simple deduction — this models the exemption as a standard deduction as a simplification. Head of household bracket table approximated using single\'s.',
  },
  delaware: {
    slug: 'delaware',
    name: 'Delaware',
    hasIncomeTax: true,
    standardDeduction: { single: 3_250, marriedJoint: 6_500, headOfHousehold: 4_875 },
    brackets: {
      single: [
        { rate: 0, upTo: 2_000 }, { rate: 0.022, upTo: 5_000 }, { rate: 0.039, upTo: 10_000 },
        { rate: 0.048, upTo: 20_000 }, { rate: 0.052, upTo: 25_000 }, { rate: 0.0555, upTo: 60_000 },
        { rate: 0.066, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0, upTo: 2_000 }, { rate: 0.022, upTo: 5_000 }, { rate: 0.039, upTo: 10_000 },
        { rate: 0.048, upTo: 20_000 }, { rate: 0.052, upTo: 25_000 }, { rate: 0.0555, upTo: 60_000 },
        { rate: 0.066, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0, upTo: 2_000 }, { rate: 0.022, upTo: 5_000 }, { rate: 0.039, upTo: 10_000 },
        { rate: 0.048, upTo: 20_000 }, { rate: 0.052, upTo: 25_000 }, { rate: 0.0555, upTo: 60_000 },
        { rate: 0.066, upTo: Infinity },
      ],
    },
    credit: { single: 110, marriedJoint: 220, headOfHousehold: 110 },
    notes: 'Includes Delaware\'s small per-filer tax credit. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  hawaii: {
    slug: 'hawaii',
    name: 'Hawaii',
    hasIncomeTax: true,
    standardDeduction: { single: 5_544, marriedJoint: 11_088, headOfHousehold: 8_316 },
    brackets: {
      single: [
        { rate: 0.014, upTo: 9_600 }, { rate: 0.032, upTo: 14_400 }, { rate: 0.055, upTo: 19_200 },
        { rate: 0.064, upTo: 24_000 }, { rate: 0.068, upTo: 36_000 }, { rate: 0.072, upTo: 48_000 },
        { rate: 0.076, upTo: 125_000 }, { rate: 0.079, upTo: 175_000 }, { rate: 0.0825, upTo: 225_000 },
        { rate: 0.09, upTo: 275_000 }, { rate: 0.10, upTo: 325_000 }, { rate: 0.11, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.014, upTo: 19_200 }, { rate: 0.032, upTo: 28_800 }, { rate: 0.055, upTo: 38_400 },
        { rate: 0.064, upTo: 48_000 }, { rate: 0.068, upTo: 72_000 }, { rate: 0.072, upTo: 96_000 },
        { rate: 0.076, upTo: 250_000 }, { rate: 0.079, upTo: 350_000 }, { rate: 0.0825, upTo: 450_000 },
        { rate: 0.09, upTo: 550_000 }, { rate: 0.10, upTo: 650_000 }, { rate: 0.11, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.014, upTo: 9_600 }, { rate: 0.032, upTo: 14_400 }, { rate: 0.055, upTo: 19_200 },
        { rate: 0.064, upTo: 24_000 }, { rate: 0.068, upTo: 36_000 }, { rate: 0.072, upTo: 48_000 },
        { rate: 0.076, upTo: 125_000 }, { rate: 0.079, upTo: 175_000 }, { rate: 0.0825, upTo: 225_000 },
        { rate: 0.09, upTo: 275_000 }, { rate: 0.10, upTo: 325_000 }, { rate: 0.11, upTo: Infinity },
      ],
    },
    notes: 'Standard deduction combines the base standard deduction and personal exemption. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  kansas: {
    slug: 'kansas',
    name: 'Kansas',
    hasIncomeTax: true,
    standardDeduction: { single: 12_765, marriedJoint: 26_560, headOfHousehold: 19_148 },
    brackets: {
      single: [{ rate: 0.052, upTo: 23_000 }, { rate: 0.0558, upTo: Infinity }],
      marriedJoint: [{ rate: 0.052, upTo: 46_000 }, { rate: 0.0558, upTo: Infinity }],
      headOfHousehold: [{ rate: 0.052, upTo: 23_000 }, { rate: 0.0558, upTo: Infinity }],
    },
    notes: 'Standard deduction combines the base standard deduction and Kansas\'s large personal exemption. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  maine: {
    slug: 'maine',
    name: 'Maine',
    hasIncomeTax: true,
    standardDeduction: { single: 20_150, marriedJoint: 40_300, headOfHousehold: 30_225 },
    brackets: {
      single: [{ rate: 0.058, upTo: 26_800 }, { rate: 0.0675, upTo: 63_450 }, { rate: 0.0715, upTo: Infinity }],
      marriedJoint: [{ rate: 0.058, upTo: 53_600 }, { rate: 0.0675, upTo: 126_900 }, { rate: 0.0715, upTo: Infinity }],
      headOfHousehold: [{ rate: 0.058, upTo: 26_800 }, { rate: 0.0675, upTo: 63_450 }, { rate: 0.0715, upTo: Infinity }],
    },
    notes: 'Standard deduction combines the base standard deduction and personal exemption. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  maryland: {
    slug: 'maryland',
    name: 'Maryland',
    hasIncomeTax: true,
    standardDeduction: { single: 5_900, marriedJoint: 11_850, headOfHousehold: 8_850 },
    brackets: {
      single: [
        { rate: 0.02, upTo: 1_000 }, { rate: 0.03, upTo: 2_000 }, { rate: 0.04, upTo: 3_000 },
        { rate: 0.0475, upTo: 100_000 }, { rate: 0.05, upTo: 125_000 }, { rate: 0.0525, upTo: 150_000 },
        { rate: 0.055, upTo: 250_000 }, { rate: 0.0575, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.02, upTo: 1_000 }, { rate: 0.03, upTo: 2_000 }, { rate: 0.04, upTo: 3_000 },
        { rate: 0.0475, upTo: 150_000 }, { rate: 0.05, upTo: 175_000 }, { rate: 0.0525, upTo: 225_000 },
        { rate: 0.055, upTo: 300_000 }, { rate: 0.0575, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.02, upTo: 1_000 }, { rate: 0.03, upTo: 2_000 }, { rate: 0.04, upTo: 3_000 },
        { rate: 0.0475, upTo: 100_000 }, { rate: 0.05, upTo: 125_000 }, { rate: 0.0525, upTo: 150_000 },
        { rate: 0.055, upTo: 250_000 }, { rate: 0.0575, upTo: Infinity },
      ],
    },
    notes: 'State tax only — every Maryland county (plus Baltimore City) also levies its own local income tax, typically 2.25%-3.2%, not included here. Standard deduction combines the base deduction and personal exemption; head of household deduction approximated at 1.5x single.',
  },
  minnesota: {
    slug: 'minnesota',
    name: 'Minnesota',
    hasIncomeTax: true,
    standardDeduction: { single: 14_950, marriedJoint: 29_900, headOfHousehold: 22_425 },
    brackets: {
      single: [
        { rate: 0.0535, upTo: 32_570 }, { rate: 0.068, upTo: 106_990 },
        { rate: 0.0785, upTo: 198_630 }, { rate: 0.0985, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.0535, upTo: 47_620 }, { rate: 0.068, upTo: 189_180 },
        { rate: 0.0785, upTo: 330_410 }, { rate: 0.0985, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.0535, upTo: 32_570 }, { rate: 0.068, upTo: 106_990 },
        { rate: 0.0785, upTo: 198_630 }, { rate: 0.0985, upTo: Infinity },
      ],
    },
    notes: 'Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  missouri: {
    slug: 'missouri',
    name: 'Missouri',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 30_000, headOfHousehold: 22_500 },
    brackets: {
      single: [
        { rate: 0, upTo: 1_313 }, { rate: 0.02, upTo: 2_626 }, { rate: 0.025, upTo: 3_939 },
        { rate: 0.03, upTo: 5_252 }, { rate: 0.035, upTo: 6_565 }, { rate: 0.04, upTo: 7_878 },
        { rate: 0.045, upTo: 9_191 }, { rate: 0.047, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0, upTo: 1_313 }, { rate: 0.02, upTo: 2_626 }, { rate: 0.025, upTo: 3_939 },
        { rate: 0.03, upTo: 5_252 }, { rate: 0.035, upTo: 6_565 }, { rate: 0.04, upTo: 7_878 },
        { rate: 0.045, upTo: 9_191 }, { rate: 0.047, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0, upTo: 1_313 }, { rate: 0.02, upTo: 2_626 }, { rate: 0.025, upTo: 3_939 },
        { rate: 0.03, upTo: 5_252 }, { rate: 0.035, upTo: 6_565 }, { rate: 0.04, upTo: 7_878 },
        { rate: 0.045, upTo: 9_191 }, { rate: 0.047, upTo: Infinity },
      ],
    },
    notes: 'Kansas City and St. Louis both levy an additional 1% local earnings tax on residents (and on income earned within city limits), not included here. Head of household deduction approximated at 1.5x single.',
  },
  montana: {
    slug: 'montana',
    name: 'Montana',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 30_000, headOfHousehold: 22_500 },
    brackets: {
      single: [{ rate: 0.047, upTo: 21_100 }, { rate: 0.059, upTo: Infinity }],
      marriedJoint: [{ rate: 0.047, upTo: 42_200 }, { rate: 0.059, upTo: Infinity }],
      headOfHousehold: [{ rate: 0.047, upTo: 21_100 }, { rate: 0.059, upTo: Infinity }],
    },
    notes: 'Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  nebraska: {
    slug: 'nebraska',
    name: 'Nebraska',
    hasIncomeTax: true,
    standardDeduction: { single: 8_600, marriedJoint: 17_200, headOfHousehold: 12_900 },
    brackets: {
      single: [
        { rate: 0.0246, upTo: 4_030 }, { rate: 0.0351, upTo: 24_120 },
        { rate: 0.0501, upTo: 38_870 }, { rate: 0.052, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.0246, upTo: 8_040 }, { rate: 0.0351, upTo: 48_250 },
        { rate: 0.0501, upTo: 77_730 }, { rate: 0.052, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.0246, upTo: 4_030 }, { rate: 0.0351, upTo: 24_120 },
        { rate: 0.0501, upTo: 38_870 }, { rate: 0.052, upTo: Infinity },
      ],
    },
    credit: { single: 171, marriedJoint: 342, headOfHousehold: 171 },
    notes: 'Includes Nebraska\'s small per-filer tax credit. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  'new-jersey': {
    slug: 'new-jersey',
    name: 'New Jersey',
    hasIncomeTax: true,
    standardDeduction: { single: 1_000, marriedJoint: 2_000, headOfHousehold: 1_500 },
    brackets: {
      single: [
        { rate: 0.014, upTo: 20_000 }, { rate: 0.0175, upTo: 35_000 }, { rate: 0.035, upTo: 40_000 },
        { rate: 0.05525, upTo: 75_000 }, { rate: 0.0637, upTo: 500_000 }, { rate: 0.0897, upTo: 1_000_000 },
        { rate: 0.1075, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.014, upTo: 50_000 }, { rate: 0.0245, upTo: 70_000 }, { rate: 0.035, upTo: 80_000 },
        { rate: 0.05525, upTo: 150_000 }, { rate: 0.0637, upTo: 500_000 }, { rate: 0.0897, upTo: 1_000_000 },
        { rate: 0.1075, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.014, upTo: 20_000 }, { rate: 0.0175, upTo: 35_000 }, { rate: 0.035, upTo: 40_000 },
        { rate: 0.05525, upTo: 75_000 }, { rate: 0.0637, upTo: 500_000 }, { rate: 0.0897, upTo: 1_000_000 },
        { rate: 0.1075, upTo: Infinity },
      ],
    },
    notes: 'New Jersey uses a personal exemption rather than a standard deduction. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  'new-mexico': {
    slug: 'new-mexico',
    name: 'New Mexico',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 30_000, headOfHousehold: 22_500 },
    brackets: {
      single: [
        { rate: 0.015, upTo: 5_500 }, { rate: 0.032, upTo: 16_500 }, { rate: 0.043, upTo: 33_500 },
        { rate: 0.047, upTo: 66_500 }, { rate: 0.049, upTo: 210_000 }, { rate: 0.059, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.015, upTo: 8_000 }, { rate: 0.032, upTo: 25_000 }, { rate: 0.043, upTo: 50_000 },
        { rate: 0.047, upTo: 100_000 }, { rate: 0.049, upTo: 315_000 }, { rate: 0.059, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.015, upTo: 5_500 }, { rate: 0.032, upTo: 16_500 }, { rate: 0.043, upTo: 33_500 },
        { rate: 0.047, upTo: 66_500 }, { rate: 0.049, upTo: 210_000 }, { rate: 0.059, upTo: Infinity },
      ],
    },
    notes: 'Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  'north-dakota': {
    slug: 'north-dakota',
    name: 'North Dakota',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 30_000, headOfHousehold: 22_500 },
    brackets: {
      single: [{ rate: 0, upTo: 48_475 }, { rate: 0.0195, upTo: 244_825 }, { rate: 0.025, upTo: Infinity }],
      marriedJoint: [{ rate: 0, upTo: 80_975 }, { rate: 0.0195, upTo: 298_075 }, { rate: 0.025, upTo: Infinity }],
      headOfHousehold: [{ rate: 0, upTo: 48_475 }, { rate: 0.0195, upTo: 244_825 }, { rate: 0.025, upTo: Infinity }],
    },
    notes: 'Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  ohio: {
    slug: 'ohio',
    name: 'Ohio',
    hasIncomeTax: true,
    standardDeduction: { single: 2_400, marriedJoint: 4_800, headOfHousehold: 3_600 },
    brackets: {
      single: [{ rate: 0, upTo: 26_050 }, { rate: 0.0275, upTo: 100_000 }, { rate: 0.035, upTo: Infinity }],
      marriedJoint: [{ rate: 0, upTo: 26_050 }, { rate: 0.0275, upTo: 100_000 }, { rate: 0.035, upTo: Infinity }],
      headOfHousehold: [{ rate: 0, upTo: 26_050 }, { rate: 0.0275, upTo: 100_000 }, { rate: 0.035, upTo: Infinity }],
    },
    notes: 'State tax only — nearly every Ohio municipality and many school districts also levy their own local income tax (commonly 1-2.5%), not included here. Ohio uses a personal exemption rather than a standard deduction; head of household approximated at 1.5x single.',
  },
  oklahoma: {
    slug: 'oklahoma',
    name: 'Oklahoma',
    hasIncomeTax: true,
    standardDeduction: { single: 7_350, marriedJoint: 14_700, headOfHousehold: 11_025 },
    brackets: {
      single: [
        { rate: 0.0025, upTo: 1_000 }, { rate: 0.0075, upTo: 2_500 }, { rate: 0.0175, upTo: 3_750 },
        { rate: 0.0275, upTo: 4_900 }, { rate: 0.0375, upTo: 7_200 }, { rate: 0.0475, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.0025, upTo: 2_000 }, { rate: 0.0075, upTo: 5_000 }, { rate: 0.0175, upTo: 7_500 },
        { rate: 0.0275, upTo: 9_800 }, { rate: 0.0375, upTo: 14_400 }, { rate: 0.0475, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.0025, upTo: 1_000 }, { rate: 0.0075, upTo: 2_500 }, { rate: 0.0175, upTo: 3_750 },
        { rate: 0.0275, upTo: 4_900 }, { rate: 0.0375, upTo: 7_200 }, { rate: 0.0475, upTo: Infinity },
      ],
    },
    notes: 'Standard deduction combines the base standard deduction and personal exemption. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  oregon: {
    slug: 'oregon',
    name: 'Oregon',
    hasIncomeTax: true,
    standardDeduction: { single: 2_800, marriedJoint: 5_600, headOfHousehold: 4_200 },
    brackets: {
      single: [
        { rate: 0.0475, upTo: 4_400 }, { rate: 0.0675, upTo: 11_050 },
        { rate: 0.0875, upTo: 125_000 }, { rate: 0.099, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.0475, upTo: 8_800 }, { rate: 0.0675, upTo: 22_100 },
        { rate: 0.0875, upTo: 250_000 }, { rate: 0.099, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.0475, upTo: 4_400 }, { rate: 0.0675, upTo: 11_050 },
        { rate: 0.0875, upTo: 125_000 }, { rate: 0.099, upTo: Infinity },
      ],
    },
    credit: { single: 250, marriedJoint: 500, headOfHousehold: 250 },
    notes: 'Includes Oregon\'s small per-filer tax credit. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  'rhode-island': {
    slug: 'rhode-island',
    name: 'Rhode Island',
    hasIncomeTax: true,
    standardDeduction: { single: 16_000, marriedJoint: 32_000, headOfHousehold: 24_000 },
    brackets: {
      single: [{ rate: 0.0375, upTo: 79_900 }, { rate: 0.0475, upTo: 181_650 }, { rate: 0.0599, upTo: Infinity }],
      marriedJoint: [{ rate: 0.0375, upTo: 79_900 }, { rate: 0.0475, upTo: 181_650 }, { rate: 0.0599, upTo: Infinity }],
      headOfHousehold: [{ rate: 0.0375, upTo: 79_900 }, { rate: 0.0475, upTo: 181_650 }, { rate: 0.0599, upTo: Infinity }],
    },
    notes: 'Standard deduction combines the base standard deduction and personal exemption. Head of household deduction approximated at 1.5x single.',
  },
  'south-carolina': {
    slug: 'south-carolina',
    name: 'South Carolina',
    hasIncomeTax: true,
    standardDeduction: { single: 15_000, marriedJoint: 30_000, headOfHousehold: 22_500 },
    brackets: {
      single: [{ rate: 0, upTo: 3_560 }, { rate: 0.03, upTo: 17_830 }, { rate: 0.062, upTo: Infinity }],
      marriedJoint: [{ rate: 0, upTo: 3_560 }, { rate: 0.03, upTo: 17_830 }, { rate: 0.062, upTo: Infinity }],
      headOfHousehold: [{ rate: 0, upTo: 3_560 }, { rate: 0.03, upTo: 17_830 }, { rate: 0.062, upTo: Infinity }],
    },
    notes: 'Head of household deduction approximated at 1.5x single.',
  },
  vermont: {
    slug: 'vermont',
    name: 'Vermont',
    hasIncomeTax: true,
    standardDeduction: { single: 12_500, marriedJoint: 25_050, headOfHousehold: 18_750 },
    brackets: {
      single: [
        { rate: 0.0335, upTo: 47_900 }, { rate: 0.066, upTo: 116_000 },
        { rate: 0.076, upTo: 242_000 }, { rate: 0.0875, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.0335, upTo: 79_950 }, { rate: 0.066, upTo: 193_300 },
        { rate: 0.076, upTo: 294_600 }, { rate: 0.0875, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.0335, upTo: 47_900 }, { rate: 0.066, upTo: 116_000 },
        { rate: 0.076, upTo: 242_000 }, { rate: 0.0875, upTo: Infinity },
      ],
    },
    notes: 'Standard deduction combines the base standard deduction and personal exemption. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
  },
  virginia: {
    slug: 'virginia',
    name: 'Virginia',
    hasIncomeTax: true,
    standardDeduction: { single: 9_430, marriedJoint: 18_860, headOfHousehold: 14_145 },
    brackets: {
      single: [
        { rate: 0.02, upTo: 3_000 }, { rate: 0.03, upTo: 5_000 },
        { rate: 0.05, upTo: 17_000 }, { rate: 0.0575, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.02, upTo: 3_000 }, { rate: 0.03, upTo: 5_000 },
        { rate: 0.05, upTo: 17_000 }, { rate: 0.0575, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.02, upTo: 3_000 }, { rate: 0.03, upTo: 5_000 },
        { rate: 0.05, upTo: 17_000 }, { rate: 0.0575, upTo: Infinity },
      ],
    },
    notes: 'Standard deduction combines the base standard deduction and personal exemption. Head of household deduction approximated at 1.5x single.',
  },
  'west-virginia': {
    slug: 'west-virginia',
    name: 'West Virginia',
    hasIncomeTax: true,
    standardDeduction: { single: 2_000, marriedJoint: 4_000, headOfHousehold: 3_000 },
    brackets: {
      single: [
        { rate: 0.0222, upTo: 10_000 }, { rate: 0.0296, upTo: 25_000 }, { rate: 0.0333, upTo: 40_000 },
        { rate: 0.0444, upTo: 60_000 }, { rate: 0.0482, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.0222, upTo: 10_000 }, { rate: 0.0296, upTo: 25_000 }, { rate: 0.0333, upTo: 40_000 },
        { rate: 0.0444, upTo: 60_000 }, { rate: 0.0482, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.0222, upTo: 10_000 }, { rate: 0.0296, upTo: 25_000 }, { rate: 0.0333, upTo: 40_000 },
        { rate: 0.0444, upTo: 60_000 }, { rate: 0.0482, upTo: Infinity },
      ],
    },
    notes: 'West Virginia uses a personal exemption rather than a standard deduction. Head of household deduction approximated at 1.5x single.',
  },
  wisconsin: {
    slug: 'wisconsin',
    name: 'Wisconsin',
    hasIncomeTax: true,
    standardDeduction: { single: 14_260, marriedJoint: 26_510, headOfHousehold: 21_390 },
    brackets: {
      single: [
        { rate: 0.035, upTo: 14_680 }, { rate: 0.044, upTo: 29_370 },
        { rate: 0.053, upTo: 323_290 }, { rate: 0.0765, upTo: Infinity },
      ],
      marriedJoint: [
        { rate: 0.035, upTo: 19_580 }, { rate: 0.044, upTo: 39_150 },
        { rate: 0.053, upTo: 431_060 }, { rate: 0.0765, upTo: Infinity },
      ],
      headOfHousehold: [
        { rate: 0.035, upTo: 14_680 }, { rate: 0.044, upTo: 29_370 },
        { rate: 0.053, upTo: 323_290 }, { rate: 0.0765, upTo: Infinity },
      ],
    },
    notes: 'Standard deduction combines the base standard deduction and personal exemption. Head of household deduction approximated at 1.5x single, bracket table reuses single\'s.',
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
  if (config.credit) {
    tax = Math.max(0, tax - config.credit[filingStatus]);
  }
  return tax;
}
