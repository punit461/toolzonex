'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface GutterSize {
  label: string;
  // Max roof area (sq ft) this gutter can adequately drain at a 1 in/hr design storm intensity.
  maxAreaAt1InHr: number;
}

const GUTTER_SIZES: GutterSize[] = [
  { label: '4-inch K-style', maxAreaAt1InHr: 3400 },
  { label: '5-inch K-style', maxAreaAt1InHr: 5500 },
  { label: '6-inch K-style', maxAreaAt1InHr: 7900 },
];

const RainGutterCapacityCalculator = () => {
  const [roofArea, setRoofArea] = useState('4000');
  const [intensity, setIntensity] = useState('1');
  const [gutterIndex, setGutterIndex] = useState(1);

  const gutter = GUTTER_SIZES[gutterIndex];

  const result = useMemo(() => {
    const area = parseFloat(roofArea) || 0;
    const rate = parseFloat(intensity) || 1;

    // Capacity scales inversely with rainfall intensity relative to the 1 in/hr reference.
    const effectiveMaxArea = rate > 0 ? gutter.maxAreaAt1InHr / rate : gutter.maxAreaAt1InHr;
    const adequate = area <= effectiveMaxArea;

    let recommended = gutter.label;
    if (!adequate) {
      const bigger = GUTTER_SIZES.find((g) => area <= (rate > 0 ? g.maxAreaAt1InHr / rate : g.maxAreaAt1InHr));
      recommended = bigger ? bigger.label : 'Larger than 6-inch (consider multiple downspouts)';
    }

    return { effectiveMaxArea, adequate, recommended };
  }, [roofArea, intensity, gutter]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Rain Gutter Capacity Calculator</Typography>
      <Typography variant="body1">
        Enter your roof&apos;s catchment area, a design-storm rainfall intensity in inches per hour (1 in/hr is
        a common illustrative default for sizing), and select your gutter size. The calculator compares your
        roof area against the maximum area that gutter size can typically drain at that rainfall intensity,
        based on commonly published K-style gutter sizing tables, and tells you whether it&apos;s adequate or
        whether you should upsize.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Effective Max Roof Area = Gutter&apos;s Rated Max Area (at 1 in/hr) / Rainfall Intensity (in/hr)
        <br />
        Adequate if Roof Area ≤ Effective Max Roof Area
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4,000 sq ft roof at a 1 in/hr design storm intensity, draining through a 5-inch K-style gutter rated
        to handle up to about 5,500 sq ft at that intensity, is adequately sized with room to spare. The same
        roof at a heavier 1.5 in/hr storm intensity effectively lowers that gutter&apos;s capacity to about
        5,500 / 1.5 ≈ 3,667 sq ft — no longer enough, so a 6-inch gutter would be recommended instead.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether existing gutters can handle heavy rainfall without overflowing.</li>
          <li>Sizing new gutters correctly when replacing a roof or building a home addition.</li>
          <li>Deciding whether to add extra downspouts instead of upsizing the whole gutter run.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Rainfall Collection Calculator?</strong> The Rainfall Collection Calculator estimates the total volume of water you could harvest into a rain barrel or cistern from a roof over time. This tool answers a different question — whether your gutter system&apos;s size can adequately drain your roof during a heavy rain event without overflowing.</li>
          <li><strong>What rainfall intensity should I design for?</strong> Many gutter sizing guidelines use a 1 in/hr storm as a standard reference point, but check your local climate data for a more accurate design storm intensity — areas prone to intense downpours may need to plan for a higher rate.</li>
          <li><strong>Are these gutter capacity figures exact for every manufacturer?</strong> No — these are reasonable illustrative figures consistent with commonly published K-style gutter sizing tables. Actual capacity varies by gutter profile, slope, and number/placement of downspouts, so consult your gutter manufacturer&apos;s specifications for a precise design.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/rain-gutter-capacity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Roof Area" type="number" value={roofArea}
            onChange={(e) => setRoofArea(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <TextField
            label="Design Rainfall Intensity" type="number" value={intensity}
            onChange={(e) => setIntensity(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
            helperText="Default 1 in/hr is a common illustrative design-storm rate"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">in/hr</InputAdornment> } }}
          />
          <FormControl fullWidth>
            <InputLabel>Gutter Size</InputLabel>
            <Select
              value={gutterIndex}
              label="Gutter Size"
              onChange={(e: SelectChangeEvent<number>) => setGutterIndex(Number(e.target.value))}
            >
              {GUTTER_SIZES.map((g, i) => (
                <MenuItem key={g.label} value={i}>{g.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: result.adequate ? 'success.main' : 'error.main', color: 'white' }}>
            <Typography variant="body2">{result.adequate ? 'Adequate' : 'Not Adequate — Consider Upsizing'}</Typography>
            <Typography variant="h5" fontWeight="bold">{gutter.label}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Effective Max Roof Area for This Gutter</Typography>
            <Typography fontWeight={600}>{result.effectiveMaxArea.toFixed(0)} sq ft</Typography>
          </Paper>
          {!result.adequate && (
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Recommended Size</Typography>
              <Typography fontWeight={600}>{result.recommended}</Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RainGutterCapacityCalculator;
