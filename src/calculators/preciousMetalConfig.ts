// Shared config for GoldRateCalculator and SilverRateCalculator — weight
// unit conversion, rate-quoting conventions, and region-based currency/tax
// presets (GST only applies in India; other regions use sales tax/VAT or
// none at all).

import { CurrencyCode, CURRENCIES, currencySymbol, formatMoney } from './currencyConfig';

export { CURRENCIES, currencySymbol, formatMoney };
export type { CurrencyCode, CurrencyOption } from './currencyConfig';

export type WeightUnit = 'g' | 'kg' | 'ozt';

export interface UnitOption {
  value: string;
  label: string;
  grams: number;
}

export const WEIGHT_UNITS: UnitOption[] = [
  { value: 'g', label: 'Grams (g)', grams: 1 },
  { value: 'kg', label: 'Kilograms (kg)', grams: 1000 },
  { value: 'ozt', label: 'Troy Ounce (oz t)', grams: 31.1034768 },
];

export const RATE_UNITS: UnitOption[] = [
  { value: 'g1', label: 'per gram', grams: 1 },
  { value: 'g10', label: 'per 10 grams', grams: 10 },
  { value: 'kg', label: 'per kilogram', grams: 1000 },
  { value: 'ozt', label: 'per troy ounce', grams: 31.1034768 },
];

export const gramsFor = (units: UnitOption[], value: string): number =>
  units.find((u) => u.value === value)?.grams ?? 1;

export type Region = 'india' | 'us' | 'uk' | 'custom';

export interface RegionPreset {
  value: Region;
  label: string;
  currency: CurrencyCode;
  taxLabel: string;
  defaultTaxPct: number;
  taxNote: string;
}

// Default tax rates are a starting point, not tax advice — sales tax/VAT on
// jewelry varies by state, product type, and whether it's investment-grade
// bullion. Users can always override the percentage directly.
export const REGIONS: RegionPreset[] = [
  { value: 'india', label: 'India', currency: 'INR', taxLabel: 'GST', defaultTaxPct: 3, taxNote: 'Standard GST on gold/silver in India is 3%.' },
  { value: 'us', label: 'United States', currency: 'USD', taxLabel: 'Sales Tax', defaultTaxPct: 0, taxNote: 'US sales tax on precious metals varies by state — many states exempt bullion but tax jewelry. Set your local rate.' },
  { value: 'uk', label: 'United Kingdom', currency: 'GBP', taxLabel: 'VAT', defaultTaxPct: 20, taxNote: 'UK standard VAT is 20% on jewelry; investment-grade gold bullion is VAT-exempt.' },
  { value: 'custom', label: 'Custom / Other', currency: 'USD', taxLabel: 'Tax', defaultTaxPct: 0, taxNote: 'Pick a currency and enter whatever local tax rate applies, or 0 if none.' },
];
