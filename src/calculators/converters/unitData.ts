// Conversion factors are exact where a unit has a legally-defined exact
// value (SI prefixes, inch/pound/gallon per US customary definitions);
// month/year use the Gregorian calendar average since neither has a fixed length.

export interface UnitDef {
  id: string;
  label: string;
  /** Multiply a value in this unit by `toBase` to get the base-unit value. */
  toBase: number;
}

export interface UnitCategory {
  slug: string;
  name: string;
  baseUnitLabel: string;
  units: UnitDef[];
}

export const LENGTH: UnitCategory = {
  slug: 'length',
  name: 'Length',
  baseUnitLabel: 'meters',
  units: [
    { id: 'meter', label: 'Meter (m)', toBase: 1 },
    { id: 'kilometer', label: 'Kilometer (km)', toBase: 1_000 },
    { id: 'centimeter', label: 'Centimeter (cm)', toBase: 0.01 },
    { id: 'millimeter', label: 'Millimeter (mm)', toBase: 0.001 },
    { id: 'micrometer', label: 'Micrometer (μm)', toBase: 1e-6 },
    { id: 'nanometer', label: 'Nanometer (nm)', toBase: 1e-9 },
    { id: 'mile', label: 'Mile (mi)', toBase: 1_609.344 },
    { id: 'yard', label: 'Yard (yd)', toBase: 0.9144 },
    { id: 'foot', label: 'Foot (ft)', toBase: 0.3048 },
    { id: 'inch', label: 'Inch (in)', toBase: 0.0254 },
    { id: 'light-year', label: 'Light Year (ly)', toBase: 9_460_730_472_580_800 },
  ],
};

export const AREA: UnitCategory = {
  slug: 'area',
  name: 'Area',
  baseUnitLabel: 'square meters',
  units: [
    { id: 'sq-meter', label: 'Square Meter (m²)', toBase: 1 },
    { id: 'sq-kilometer', label: 'Square Kilometer (km²)', toBase: 1_000_000 },
    { id: 'sq-centimeter', label: 'Square Centimeter (cm²)', toBase: 0.0001 },
    { id: 'sq-micrometer', label: 'Square Micrometer (μm²)', toBase: 1e-12 },
    { id: 'hectare', label: 'Hectare (ha)', toBase: 10_000 },
    { id: 'sq-yard', label: 'Square Yard (yd²)', toBase: 0.83612736 },
    { id: 'sq-foot', label: 'Square Foot (ft²)', toBase: 0.09290304 },
    { id: 'sq-inch', label: 'Square Inch (in²)', toBase: 0.00064516 },
    { id: 'acre', label: 'Acre', toBase: 4_046.8564224 },
  ],
};

export const VOLUME: UnitCategory = {
  slug: 'volume',
  name: 'Volume',
  baseUnitLabel: 'liters',
  units: [
    { id: 'liter', label: 'Liter (L)', toBase: 1 },
    { id: 'milliliter', label: 'Milliliter (mL)', toBase: 0.001 },
    { id: 'cubic-meter', label: 'Cubic Meter (m³)', toBase: 1_000 },
    { id: 'cubic-kilometer', label: 'Cubic Kilometer (km³)', toBase: 1e12 },
    { id: 'cubic-centimeter', label: 'Cubic Centimeter (cm³)', toBase: 0.001 },
    { id: 'cubic-millimeter', label: 'Cubic Millimeter (mm³)', toBase: 1e-6 },
    { id: 'us-gallon', label: 'US Gallon (gal)', toBase: 3.785411784 },
    { id: 'us-quart', label: 'US Quart (qt)', toBase: 0.946352946 },
    { id: 'us-pint', label: 'US Pint (pt)', toBase: 0.473176473 },
    { id: 'us-cup', label: 'US Cup', toBase: 0.2365882365 },
    { id: 'us-fluid-ounce', label: 'US Fluid Ounce (fl oz)', toBase: 0.0295735295625 },
  ],
};

export const WEIGHT: UnitCategory = {
  slug: 'weight',
  name: 'Weight',
  baseUnitLabel: 'kilograms',
  units: [
    { id: 'kilogram', label: 'Kilogram (kg)', toBase: 1 },
    { id: 'gram', label: 'Gram (g)', toBase: 0.001 },
    { id: 'milligram', label: 'Milligram (mg)', toBase: 1e-6 },
    { id: 'metric-ton', label: 'Metric Ton (t)', toBase: 1_000 },
    { id: 'long-ton', label: 'Long Ton (UK)', toBase: 1_016.0469088 },
    { id: 'short-ton', label: 'Short Ton (US)', toBase: 907.18474 },
    { id: 'pound', label: 'Pound (lb)', toBase: 0.45359237 },
    { id: 'ounce', label: 'Ounce (oz)', toBase: 0.028349523125 },
    { id: 'carat', label: 'Carat (ct)', toBase: 0.0002 },
    { id: 'amu', label: 'Atomic Mass Unit (u)', toBase: 1.66053906660e-27 },
  ],
};

export const TIME: UnitCategory = {
  slug: 'time',
  name: 'Time',
  baseUnitLabel: 'seconds',
  units: [
    { id: 'second', label: 'Second (s)', toBase: 1 },
    { id: 'millisecond', label: 'Millisecond (ms)', toBase: 0.001 },
    { id: 'microsecond', label: 'Microsecond (μs)', toBase: 1e-6 },
    { id: 'nanosecond', label: 'Nanosecond (ns)', toBase: 1e-9 },
    { id: 'picosecond', label: 'Picosecond (ps)', toBase: 1e-12 },
    { id: 'minute', label: 'Minute (min)', toBase: 60 },
    { id: 'hour', label: 'Hour (hr)', toBase: 3_600 },
    { id: 'day', label: 'Day', toBase: 86_400 },
    { id: 'week', label: 'Week', toBase: 604_800 },
    { id: 'month', label: 'Month (avg.)', toBase: 2_629_746 },
    { id: 'year', label: 'Year (avg.)', toBase: 31_556_952 },
  ],
};

export const UNIT_CATEGORIES: Record<string, UnitCategory> = {
  length: LENGTH,
  area: AREA,
  volume: VOLUME,
  weight: WEIGHT,
  time: TIME,
};

export function convert(value: number, fromUnit: UnitDef, toUnit: UnitDef): number {
  return (value * fromUnit.toBase) / toUnit.toBase;
}

// Temperature isn't a simple multiplicative factor (different zero points),
// so it's modeled separately with explicit conversion functions.
export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export const TEMPERATURE_UNITS: { id: TemperatureUnit; label: string }[] = [
  { id: 'celsius', label: 'Celsius (°C)' },
  { id: 'fahrenheit', label: 'Fahrenheit (°F)' },
  { id: 'kelvin', label: 'Kelvin (K)' },
];

function toCelsius(value: number, unit: TemperatureUnit): number {
  if (unit === 'celsius') return value;
  if (unit === 'fahrenheit') return (value - 32) * (5 / 9);
  return value - 273.15; // kelvin
}

function fromCelsius(value: number, unit: TemperatureUnit): number {
  if (unit === 'celsius') return value;
  if (unit === 'fahrenheit') return value * (9 / 5) + 32;
  return value + 273.15; // kelvin
}

export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  return fromCelsius(toCelsius(value, from), to);
}
