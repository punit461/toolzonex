'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UNITS: Record<string, { label: string; toMps: number }> = {
  mph: { label: 'Miles per Hour (mph)', toMps: 0.44704 },
  kmh: { label: 'Kilometers per Hour (km/h)', toMps: 0.2777778 },
  ms: { label: 'Meters per Second (m/s)', toMps: 1 },
  knot: { label: 'Knots (kn)', toMps: 0.5144444 },
  fts: { label: 'Feet per Second (ft/s)', toMps: 0.3048 },
};

const UNIT_ORDER = ['mph', 'kmh', 'ms', 'knot', 'fts'];

const SpeedConverter = () => {
  const [value, setValue] = useState<string>('60');
  const [fromUnit, setFromUnit] = useState<string>('mph');

  const mps = useMemo(() => {
    const v = parseFloat(value);
    if (Number.isNaN(v)) return null;
    return v * UNITS[fromUnit].toMps;
  }, [value, fromUnit]);

  const content = (
    <>
      <Typography variant="h2">How to Convert Speed Units</Typography>
      <Typography variant="body1">
        Speed can be measured in several common units — miles per hour on US road signs, kilometers per hour
        almost everywhere else, meters per second in physics and science, knots at sea and in aviation, and
        feet per second in some engineering contexts. This converter treats meters per second as a common base
        unit: your input is converted to m/s first, then converted from m/s into every other supported unit.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A car traveling at 60 mph is going 60 × 0.44704 = 26.82 m/s, which is about 96.56 km/h, roughly 52.14
        knots, and 88 ft/s. Enter 60 with mph selected to see all of these calculated instantly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a car&apos;s speedometer reading between mph and km/h for international travel.</li>
          <li>Converting wind or boat speed between knots and mph or km/h for sailing and weather reports.</li>
          <li>Physics and engineering problems that require SI units (m/s) as an intermediate step.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a knot, exactly?</Typography>
      <Typography variant="body1">
        A knot is one nautical mile per hour. A nautical mile (1,852 meters) is based on one minute of latitude
        along a great circle of the Earth, which is why it doesn&apos;t divide evenly into miles or kilometers
        like other speed units do.
      </Typography>
      <Typography variant="h3">Why do aviation and marine speeds use knots instead of mph?</Typography>
      <Typography variant="body1">
        Knots are tied directly to nautical miles, which correspond to minutes of latitude on navigational
        charts, making distance and speed calculations for navigation more straightforward than converting
        through miles or kilometers.
      </Typography>
      <Typography variant="h3">How accurate are these conversion factors?</Typography>
      <Typography variant="body1">
        The factors used (for example, 1 mph = 0.44704 m/s exactly, and 1 knot = 0.5144444 m/s) are the
        internationally defined standard values, so results are accurate to the number of decimal places shown.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/speed-converter" content={content}>
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
              {mps !== null ? (mps / UNITS[key].toMps).toLocaleString(undefined, { maximumFractionDigits: 4 }) : '—'}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SpeedConverter;
