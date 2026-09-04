'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const R_VALUE_PRESETS = ['13', '19', '21', '30', '38'];

const InsulationCalculator = () => {
  const [length, setLength] = useState('20');
  const [width, setWidth] = useState('15');
  const [rValue, setRValue] = useState('19');
  const [waste, setWaste] = useState('10');

  const { area, areaWithWaste } = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const wastePct = parseFloat(waste) || 0;
    const a = l * w;
    return { area: a, areaWithWaste: a * (1 + wastePct / 100) };
  }, [length, width, waste]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate How Much Insulation You Need</Typography>
      <Typography variant="body1">
        Enter the length and width of the area you&apos;re insulating — an attic floor, a wall cavity, or a
        crawlspace — and pick the R-value you&apos;re targeting for that space. The calculator multiplies length
        by width to get the area, then adds a waste allowance for trimming around joists, wiring, and
        obstructions to tell you how many square feet of that R-value batt or roll insulation to buy.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Insulation Needed = (Length × Width) × (1 + Waste %)
      </Box>
      <Typography variant="body2" color="text.secondary">
        This calculator keeps things simple by working in square footage of a given R-value product rather than
        modeling specific materials or thicknesses — batt and roll insulation is sold by R-value and coverage
        area, so &quot;you need X sq ft of R-19 insulation&quot; is exactly what you&apos;ll be shopping for.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20 ft × 15 ft attic floor has an area of 300 sq ft. With a 10% waste allowance for cutting around
        joists and fixtures, you&apos;d need about 300 × 1.10 = 330 sq ft of R-19 insulation.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating attic, wall cavity, or crawlspace insulation before an install or top-up.</li>
          <li>Comparing material needs across different target R-values.</li>
          <li>Budgeting a home insulation upgrade project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What R-value should I target?</Typography>
      <Typography variant="body1">
        Recommended R-values vary by climate zone and the part of the home — attics in colder climates often
        target R-38 to R-60, while walls commonly use R-13 to R-21. Check your local building code or an energy
        guide for your specific climate zone and application.
      </Typography>
      <Typography variant="h3">Can I mix R-values or add a second layer on top of existing insulation?</Typography>
      <Typography variant="body1">
        Yes — R-values add together, so laying a new batt over existing attic insulation increases the combined
        R-value. Calculate the additional area you&apos;re covering and the R-value of the new layer separately
        from what&apos;s already there.
      </Typography>
      <Typography variant="h3">Why does this use square footage instead of volume or thickness?</Typography>
      <Typography variant="body1">
        Batt and roll insulation products are manufactured and sold at a fixed thickness for a given R-value, so
        the amount you need to buy is simply the area you&apos;re covering — thickness is already baked into the
        product you choose, not something you calculate separately.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/insulation-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Length" type="number" value={length}
              onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
            />
            <TextField
              label="Width" type="number" value={width}
              onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
            />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Target R-Value</Typography>
            <ToggleButtonGroup
              value={rValue}
              exclusive
              onChange={(_, val: string | null) => { if (val) setRValue(val); }}
              size="small"
              sx={{ flexWrap: 'wrap' }}
            >
              {R_VALUE_PRESETS.map((r) => (
                <ToggleButton key={r} value={r}>R-{r}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
          <TextField
            label="Waste Allowance (%)"
            type="number"
            value={waste}
            onChange={(e) => setWaste(e.target.value)}
            onFocus={(e) => e.target.select()}
            fullWidth
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Area to Insulate</Typography>
            <Typography variant="h5" fontWeight={700}>{area.toLocaleString(undefined, { maximumFractionDigits: 1 })} sq ft</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">You Need</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {areaWithWaste.toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft
            </Typography>
            <Typography variant="body2" color="text.secondary">of R-{rValue} insulation</Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InsulationCalculator;
