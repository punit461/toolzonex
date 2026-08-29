'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UNITS: Record<string, { label: string; toWatts: number }> = {
  w: { label: 'Watts (W)', toWatts: 1 },
  kw: { label: 'Kilowatts (kW)', toWatts: 1000 },
  mw: { label: 'Megawatts (MW)', toWatts: 1000000 },
  hp: { label: 'Horsepower - Mechanical (hp)', toWatts: 745.699872 },
  hpM: { label: 'Horsepower - Metric (PS)', toWatts: 735.49875 },
  btuh: { label: 'BTU per Hour (BTU/hr)', toWatts: 0.29307107 },
  ftlbmin: { label: 'Foot-Pounds per Minute', toWatts: 0.0225969658 },
  cals: { label: 'Calories per Second (cal/s)', toWatts: 4.184 },
};

const UNIT_ORDER = ['w', 'kw', 'mw', 'hp', 'hpM', 'btuh', 'ftlbmin', 'cals'];

const PowerConverter = () => {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('kw');

  const watts = useMemo(() => {
    const v = parseFloat(value);
    if (Number.isNaN(v)) return null;
    return v * UNITS[fromUnit].toWatts;
  }, [value, fromUnit]);

  const content = (
    <>
      <Typography variant="h2">How to Convert Power Units</Typography>
      <Typography variant="body1">
        Power measures the rate at which energy is transferred or converted, and it&apos;s expressed in many
        different units depending on the field — watts and kilowatts for electrical devices, horsepower for
        engines, and BTU per hour for heating and cooling equipment. This converter uses watts as a common base
        unit: every input value is first converted to watts using its exact conversion factor, then converted
        from watts into every other supported unit at once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3 kW electric motor is equal to 3,000 W, about 4.02 mechanical horsepower (3,000 ÷ 745.7), and roughly
        10,235 BTU/hr (3,000 ÷ 0.29307107). Enter 3 with kilowatts selected as the source unit to see all of
        these values calculated at once.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing an appliance&apos;s wattage rating to an engine&apos;s horsepower rating.</li>
          <li>Converting an air conditioner&apos;s BTU/hr rating to kilowatts for energy calculations.</li>
          <li>Translating specification sheets between metric (kW, PS) and imperial (hp) power units.</li>
          <li>Estimating electrical load in watts from a generator or motor rated in horsepower.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between mechanical and metric horsepower?</Typography>
      <Typography variant="body1">
        Mechanical horsepower (used in the US and UK) equals 745.699872 watts, while metric horsepower (PS,
        common in Europe) equals 735.49875 watts. They are close but not identical, so this converter treats
        them as separate units.
      </Typography>
      <Typography variant="h3">Why is watts used as the base unit?</Typography>
      <Typography variant="body1">
        Watts is the SI unit of power, and every other unit here has a precisely defined conversion factor into
        watts. Converting everything to watts first, then out to each target unit, keeps the math consistent
        and avoids compounding rounding errors from unit-to-unit conversion tables.
      </Typography>
      <Typography variant="h3">How accurate are these conversions?</Typography>
      <Typography variant="body1">
        The conversion factors used are the standard internationally recognized values (for example, 1
        mechanical horsepower = 745.699872 W exactly), so results are accurate to the number of decimal places
        shown.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/power-converter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 4 }}>
        <TextField
          fullWidth
          label="Value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
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
              {watts !== null ? (watts / UNITS[key].toWatts).toLocaleString(undefined, { maximumFractionDigits: 6 }) : '—'}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PowerConverter;
