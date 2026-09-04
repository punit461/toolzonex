'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LOAD_PRESETS: Record<string, { label: string; psf: number }> = {
  residential: { label: 'Residential (typical, ~50 psf)', psf: 50 },
  residentialHeavy: { label: 'Residential (heavier finishes, ~60 psf)', psf: 60 },
  lightCommercial: { label: 'Light Commercial (~80 psf)', psf: 80 },
  commercial: { label: 'Commercial / Office (~100 psf)', psf: 100 },
  custom: { label: 'Custom', psf: 0 },
};

const ColumnLoadCalculator = () => {
  const [length, setLength] = useState('12');
  const [width, setWidth] = useState('10');
  const [preset, setPreset] = useState<keyof typeof LOAD_PRESETS>('residential');
  const [customLoad, setCustomLoad] = useState('50');

  const loadPerSqFt = preset === 'custom' ? parseFloat(customLoad) || 0 : LOAD_PRESETS[preset].psf;

  const { tributaryArea, totalLoad } = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const area = l * w;
    return { tributaryArea: area, totalLoad: area * loadPerSqFt };
  }, [length, width, loadPerSqFt]);

  const content = (
    <>
      <Typography variant="h2">How Column Load Is Calculated (Simplified)</Typography>
      <Typography variant="body1">
        A column&apos;s tributary area is the portion of a floor or roof that transfers its weight down through
        that specific column — commonly estimated as half the distance to each neighboring column or support
        in both directions, multiplied together. Enter that tributary length and width, plus a load per unit
        area (in pounds per square foot), to estimate the total load carried by the column.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Load = Tributary Area (Length × Width) × Load per Square Foot
      </Box>
      <Typography variant="body1">
        The load-per-area presets combine typical live load (occupants, furniture, snow, etc.) and dead load
        (the structure&apos;s own weight) for general building types — actual values always depend on local
        building code, structure type, and specific design conditions.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A column with a 12 ft × 10 ft tributary area (120 sq ft) under a typical residential load of 50 psf
        carries an estimated total load of 120 × 50 = 6,000 lbs (3 tons).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough, early-stage sense of column loading for a DIY or educational project.</li>
          <li>Learning how tributary area and load combine to size a structural member.</li>
          <li>Comparing how different load assumptions change the estimated total load.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this safe to use for an actual construction project?</Typography>
      <Typography variant="body1">
        No. This calculator provides a simplified estimate for reference and educational purposes only. Real
        structural design must account for local building codes, snow/wind/seismic loads, load factors and
        safety margins, material properties, and column-specific engineering — always have a licensed structural
        engineer review and calculate loads for any real construction project.
      </Typography>
      <Typography variant="h3">What is tributary area?</Typography>
      <Typography variant="body1">
        Tributary area is the portion of a floor or roof whose weight is assumed to be carried by a specific
        column or support, typically found by taking half the span to each adjacent support in both directions
        and multiplying those distances together.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between live load and dead load?</Typography>
      <Typography variant="body1">
        Dead load is the permanent weight of the structure itself (framing, flooring, walls). Live load is
        temporary or variable weight (people, furniture, movable equipment, snow). The presets in this
        calculator combine typical values for both into a single number for simplicity.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/column-load-calculator" content={content}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        Simplified estimate for reference/educational purposes only — not a substitute for a licensed structural
        engineer&apos;s calculation on any real construction project.
      </Alert>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Tributary Length"
              type="number"
              fullWidth
              value={length}
              onChange={(e) => setLength(e.target.value)}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
            />
            <TextField
              label="Tributary Width"
              type="number"
              fullWidth
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>Load Type</InputLabel>
            <Select label="Load Type" value={preset} onChange={(e) => setPreset(e.target.value as keyof typeof LOAD_PRESETS)}>
              {Object.entries(LOAD_PRESETS).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {preset === 'custom' && (
            <TextField
              label="Custom Load"
              type="number"
              fullWidth
              value={customLoad}
              onChange={(e) => setCustomLoad(e.target.value)}
              onFocus={(e) => e.target.select()}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">psf</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Tributary Area</Typography>
            <Typography fontWeight={600}>{tributaryArea.toLocaleString('en-US')} sq ft</Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Total Load</Typography>
            <Typography variant="h3" fontWeight="bold">{Math.round(totalLoad).toLocaleString('en-US')} lbs</Typography>
            <Typography variant="body2" mt={1}>{(totalLoad / 2000).toFixed(2)} tons</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ColumnLoadCalculator;
