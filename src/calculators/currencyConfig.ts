// Shared currency list and formatting helpers used by calculators that let
// users pick which currency to display amounts in.

export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'EUR' | 'AUD' | 'CAD';

export interface CurrencyOption {
  value: CurrencyCode;
  label: string;
  symbol: string;
  locale: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { value: 'INR', label: 'Indian Rupee (₹)', symbol: '₹', locale: 'en-IN' },
  { value: 'USD', label: 'US Dollar ($)', symbol: '$', locale: 'en-US' },
  { value: 'GBP', label: 'British Pound (£)', symbol: '£', locale: 'en-GB' },
  { value: 'EUR', label: 'Euro (€)', symbol: '€', locale: 'de-DE' },
  { value: 'AUD', label: 'Australian Dollar (A$)', symbol: 'A$', locale: 'en-AU' },
  { value: 'CAD', label: 'Canadian Dollar (C$)', symbol: 'C$', locale: 'en-CA' },
];

export const currencySymbol = (code: CurrencyCode): string =>
  CURRENCIES.find((c) => c.value === code)?.symbol ?? '';

export const formatMoney = (value: number, code: CurrencyCode): string => {
  const cfg = CURRENCIES.find((c) => c.value === code) ?? CURRENCIES[0];
  return `${cfg.symbol} ${Math.round(value).toLocaleString(cfg.locale)}`;
};
