'use client';

import { useState, useMemo, useEffect } from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { IconButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type CategoryKey = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'time';

interface UnitDef {
  label: string;
  toBase: number;
}

const FACTOR_GROUPS: Record<Exclude<CategoryKey, 'temperature'>, { label: string; units: Record<string, UnitDef> }> = {
  length: {
    label: 'Length',
    units: {
      mm: { label: 'Millimeters (mm)', toBase: 0.001 },
      cm: { label: 'Centimeters (cm)', toBase: 0.01 },
      m: { label: 'Meters (m)', toBase: 1 },
      km: { label: 'Kilometers (km)', toBase: 1000 },
      in: { label: 'Inches (in)', toBase: 0.0254 },
      ft: { label: 'Feet (ft)', toBase: 0.3048 },
      yd: { label: 'Yards (yd)', toBase: 0.9144 },
      mi: { label: 'Miles (mi)', toBase: 1609.344 },
    },
  },
  weight: {
    label: 'Weight / Mass',
    units: {
      mg: { label: 'Milligrams (mg)', toBase: 0.001 },
      g: { label: 'Grams (g)', toBase: 1 },
      kg: { label: 'Kilograms (kg)', toBase: 1000 },
      tonne: { label: 'Tonnes (t)', toBase: 1000000 },
      oz: { label: 'Ounces (oz)', toBase: 28.349523125 },
      lb: { label: 'Pounds (lb)', toBase: 453.59237 },
    },
  },
  area: {
    label: 'Area',
    units: {
      m2: { label: 'Square Meters (m²)', toBase: 1 },
      km2: { label: 'Square Kilometers (km²)', toBase: 1000000 },
      ft2: { label: 'Square Feet (ft²)', toBase: 0.09290304 },
      acre: { label: 'Acres', toBase: 4046.8564224 },
      hectare: { label: 'Hectares (ha)', toBase: 10000 },
    },
  },
  volume: {
    label: 'Volume',
    units: {
      ml: { label: 'Milliliters (ml)', toBase: 0.001 },
      l: { label: 'Liters (l)', toBase: 1 },
      gallon: { label: 'US Gallons (gal)', toBase: 3.785411784 },
      quart: { label: 'US Quarts (qt)', toBase: 0.946352946 },
      m3: { label: 'Cubic Meters (m³)', toBase: 1000 },
    },
  },
  speed: {
    label: 'Speed',
    units: {
      mps: { label: 'Meters/Second (m/s)', toBase: 1 },
      kmph: { label: 'Kilometers/Hour (km/h)', toBase: 0.2777778 },
      mph: { label: 'Miles/Hour (mph)', toBase: 0.44704 },
      knot: { label: 'Knots (kn)', toBase: 0.5144444 },
    },
  },
  time: {
    label: 'Time',
    units: {
      sec: { label: 'Seconds (s)', toBase: 1 },
      min: { label: 'Minutes (min)', toBase: 60 },
      hour: { label: 'Hours (hr)', toBase: 3600 },
      day: { label: 'Days', toBase: 86400 },
      week: { label: 'Weeks', toBase: 604800 },
    },
  },
};

const TEMPERATURE_UNITS: Record<string, string> = {
  celsius: 'Celsius (°C)',
  fahrenheit: 'Fahrenheit (°F)',
  kelvin: 'Kelvin (K)',
};

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: 'length', label: 'Length' },
  { key: 'weight', label: 'Weight / Mass' },
  { key: 'temperature', label: 'Temperature' },
  { key: 'area', label: 'Area' },
  { key: 'volume', label: 'Volume' },
  { key: 'speed', label: 'Speed' },
  { key: 'time', label: 'Time' },
];

function getUnitOptions(category: CategoryKey): { value: string; label: string }[] {
  if (category === 'temperature') {
    return Object.entries(TEMPERATURE_UNITS).map(([value, label]) => ({ value, label }));
  }
  return Object.entries(FACTOR_GROUPS[category].units).map(([value, def]) => ({ value, label: def.label }));
}

function toCelsius(value: number, unit: string): number {
  if (unit === 'celsius') return value;
  if (unit === 'fahrenheit') return (value - 32) * (5 / 9);
  if (unit === 'kelvin') return value - 273.15;
  return value;
}

function fromCelsius(celsius: number, unit: string): number {
  if (unit === 'celsius') return celsius;
  if (unit === 'fahrenheit') return celsius * (9 / 5) + 32;
  if (unit === 'kelvin') return celsius + 273.15;
  return celsius;
}

function convert(value: number, from: string, to: string, category: CategoryKey): number {
  if (category === 'temperature') {
    return fromCelsius(toCelsius(value, from), to);
  }
  const units = FACTOR_GROUPS[category].units;
  const fromDef = units[from];
  const toDef = units[to];
  if (!fromDef || !toDef) return 0;
  return (value * fromDef.toBase) / toDef.toBase;
}

const UnitConverter = () => {
  const [category, setCategory] = useState<CategoryKey>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const options = getUnitOptions(category);
    setFromUnit(options[0]?.value ?? '');
    setToUnit(options[1]?.value ?? options[0]?.value ?? '');
  }, [category]);

  const unitOptions = useMemo(() => getUnitOptions(category), [category]);

  const result = useMemo(() => {
    if (Number.isNaN(value) || !fromUnit || !toUnit) return 0;
    return convert(value, fromUnit, toUnit, category);
  }, [value, fromUnit, toUnit, category]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const content = (
    <>
      <Typography variant="h2">How to Use This Unit Converter</Typography>
      <Typography variant="body1">
        Pick a category — Length, Weight/Mass, Temperature, Area, Volume, Speed, or Time — then choose the unit
        you&apos;re converting from and the unit you want to convert to. Enter a value and the converted result
        updates instantly. Use the swap button to quickly reverse the conversion direction.
      </Typography>
      <Typography variant="body1">
        Temperature is handled differently from the other categories, since Celsius, Fahrenheit, and Kelvin
        aren&apos;t related by a simple multiplication factor — this converter applies the correct formula for
        each pair automatically.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Converting 1 meter to feet gives 3.2808 ft. Converting 100°C (boiling point of water) to Fahrenheit gives
        212°F, and to Kelvin gives 373.15 K.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting recipe measurements between metric and US customary units.</li>
          <li>Converting a weather temperature reading between Celsius and Fahrenheit.</li>
          <li>Converting distances, speeds, or land area between metric and imperial systems for travel, fitness, or real estate.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does temperature need special formulas instead of a simple factor?</Typography>
      <Typography variant="body1">
        Celsius, Fahrenheit, and Kelvin scales don&apos;t share a common zero point, so converting between them
        requires both a multiplication and an addition or subtraction step (like °F = °C × 9/5 + 32), unlike
        length or weight, which convert with a single multiplication factor.
      </Typography>
      <Typography variant="h3">How accurate are the conversion factors used?</Typography>
      <Typography variant="body1">
        The conversion factors used (for example, 1 inch = 2.54 cm exactly, and 1 pound = 453.59237 grams
        exactly) are the internationally defined standard values, so results are accurate to the precision
        shown.
      </Typography>
      <Typography variant="h3">Why do the unit options change when I switch category?</Typography>
      <Typography variant="body1">
        Each category — Length, Weight, Temperature, Area, Volume, Speed, and Time — has its own set of relevant
        units, so switching category automatically resets the &quot;from&quot; and &quot;to&quot; dropdowns to a
        sensible pair of units for that category.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/unit-converter" content={content}>
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value as CategoryKey)}>
            {CATEGORIES.map((c) => (
              <MenuItem key={c.key} value={c.key}>{c.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr auto 1fr' }, gap: 2, alignItems: 'center', mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel>From</InputLabel>
            <Select value={fromUnit} label="From" onChange={(e) => setFromUnit(e.target.value)}>
              {unitOptions.map((u) => (
                <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton onClick={swapUnits} sx={{ mx: 'auto' }} aria-label="Swap units">
            <SwapHorizIcon />
          </IconButton>

          <FormControl fullWidth>
            <InputLabel>To</InputLabel>
            <Select value={toUnit} label="To" onChange={(e) => setToUnit(e.target.value)}>
              {unitOptions.map((u) => (
                <MenuItem key={u.value} value={u.value}>{u.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          fullWidth
          label="Value"
          type="number"
          sx={{ mb: 4 }}
          onFocus={(e) => e.target.select()}
          value={Number.isNaN(value) ? '' : value}
          onChange={(e) => setValue(e.target.value === '' ? NaN : Number(e.target.value))}
        />

        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>Result</Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
            {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnitConverter;
