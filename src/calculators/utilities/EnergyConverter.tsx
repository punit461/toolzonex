'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UNITS: Record<string, { label: string; toJoules: number }> = {
  j: { label: 'Joules (J)', toJoules: 1 },
  kj: { label: 'Kilojoules (kJ)', toJoules: 1000 },
  cal: { label: 'Calories (cal)', toJoules: 4.184 },
  kcal: { label: 'Kilocalories / Food Calories (kcal)', toJoules: 4184 },
  wh: { label: 'Watt-hours (Wh)', toJoules: 3600 },
  kwh: { label: 'Kilowatt-hours (kWh)', toJoules: 3_600_000 },
  btu: { label: 'British Thermal Units (BTU)', toJoules: 1055.06 },
  ftlb: { label: 'Foot-pounds (ft·lb)', toJoules: 1.35582 },
};

const UNIT_ORDER = ['j', 'kj', 'cal', 'kcal', 'wh', 'kwh', 'btu', 'ftlb'];

const EnergyConverter = () => {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('kwh');

  const joules = useMemo(() => {
    const v = parseFloat(value);
    if (Number.isNaN(v)) return null;
    return v * UNITS[fromUnit].toJoules;
  }, [value, fromUnit]);

  const content = (
    <>
      <Typography variant="h2">How to Convert Between Energy Units</Typography>
      <Typography variant="body1">
        Energy is measured differently depending on context — joules in physics, calories in nutrition,
        kilowatt-hours on electricity bills, and BTUs for heating and cooling equipment. This converter treats
        the joule as a common base unit: your input is converted to joules first, then converted from joules
        into every other supported unit at once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        1 kilowatt-hour (kWh), the unit your electricity bill is measured in, equals 3,600,000 joules, about
        860,421 calories, or roughly 3,412 BTU. That single kWh is also enough energy to lift a very large mass
        a considerable height, illustrated here as about 2.65 million foot-pounds.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting electricity usage (kWh) into other energy units for comparison.</li>
          <li>Converting food energy (kcal/Calories) into joules for scientific calculations.</li>
          <li>Converting heating/cooling capacity between BTU and kWh or joules.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between a calorie and a Calorie?</Typography>
      <Typography variant="body1">
        A lowercase "calorie" (small calorie) is the energy needed to raise 1 gram of water by 1°C. The
        "Calorie" used on nutrition labels is actually a kilocalorie — 1,000 small calories — which is why this
        converter lists Kilocalories/Food Calories (kcal) as the nutrition-label unit.
      </Typography>
      <Typography variant="h3">Why is a BTU not a round number of joules?</Typography>
      <Typography variant="body1">
        The BTU (British Thermal Unit) was originally defined as the energy to raise 1 pound of water by 1°F —
        an imperial-unit definition that doesn&apos;t translate to a clean round number in the metric,
        joule-based system, hence the 1,055.06 conversion factor.
      </Typography>
      <Typography variant="h3">How accurate are these conversion factors?</Typography>
      <Typography variant="body1">
        The factors used (for example, 1 kWh = 3,600,000 J exactly, and 1 cal = 4.184 J) are standard,
        internationally recognized values, so results are accurate to the number of decimal places shown.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/energy-converter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
        <TextField fullWidth label="Value" type="number" value={value} onChange={(e) => setValue(e.target.value)} onFocus={(e) => e.target.select()} />
        <FormControl fullWidth>
          <InputLabel>From Unit</InputLabel>
          <Select value={fromUnit} label="From Unit" onChange={(e) => setFromUnit(e.target.value)}>
            {UNIT_ORDER.map((key) => (
              <MenuItem key={key} value={key}>{UNITS[key].label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="subtitle1" fontWeight={600} mb={2}>Converted Values</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {UNIT_ORDER.filter((key) => key !== fromUnit).map((key) => (
          <Paper key={key} variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">{UNITS[key].label}</Typography>
            <Typography variant="body1" fontWeight={700}>
              {joules !== null ? (joules / UNITS[key].toJoules).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '—'}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EnergyConverter;
