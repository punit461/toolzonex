'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RebarCalculator = () => {
  const [length, setLength] = useState<string>('20');
  const [width, setWidth] = useState<string>('20');
  const [spacing, setSpacing] = useState<string>('12');

  const l = parseFloat(length);
  const w = parseFloat(width);
  const s = parseFloat(spacing);

  const valid = !isNaN(l) && !isNaN(w) && !isNaN(s) && l > 0 && w > 0 && s > 0;

  const barsAlongLength = valid ? Math.floor((w * 12) / s) + 1 : 0;
  const barsAlongWidth = valid ? Math.floor((l * 12) / s) + 1 : 0;
  const totalBars = barsAlongLength + barsAlongWidth;
  const totalLength = valid ? barsAlongLength * l + barsAlongWidth * w : 0;

  const content = (
    <>
      <Typography variant="h2">How to Calculate Rebar for a Slab</Typography>
      <Typography variant="body1">
        Enter your slab&apos;s length and width along with the on-center spacing you want between rebar
        pieces, and this calculator finds how many bars run in each direction to form a grid, plus the total
        number of pieces and combined linear length needed.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Bars per Direction = ⌊(Cross Dimension × 12 ÷ Spacing)⌋ + 1
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20 ft × 20 ft slab with 12-inch on-center spacing needs ⌊(20×12÷12)⌋+1 = 21 bars running each
        direction, for 42 bars total. Since each bar in one direction spans 20 ft, the total combined length is
        21×20 + 21×20 = 840 linear feet.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a rebar grid for a concrete driveway, patio, or slab foundation.</li>
          <li>Estimating rebar quantities to order for a DIY concrete pour.</li>
          <li>Checking spacing assumptions against a project&apos;s structural drawings.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this include overlap for splicing bars?</Typography>
      <Typography variant="body1">
        No — this calculates the straight total length before adding any lap splice overlap. When two rebar
        pieces need to be joined end-to-end, they&apos;re typically overlapped by roughly 12 to 24 times the bar
        diameter (check your local code or engineer&apos;s spec), so add extra length to your order to cover
        those splices.
      </Typography>
      <Typography variant="h3">What spacing should I use?</Typography>
      <Typography variant="body1">
        Residential slabs commonly use 12 to 18 inches on-center spacing, but the right spacing depends on the
        slab&apos;s thickness, expected load, and local building code — check project-specific structural
        drawings or consult an engineer for anything load-bearing.
      </Typography>
      <Typography variant="h3">What if I need different spacing in each direction?</Typography>
      <Typography variant="body1">
        This calculator assumes the same spacing in both directions to form a square grid. If your project
        calls for different spacing along the length versus the width, run the calculation twice — once for
        each direction&apos;s spacing — and combine the results.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/rebar-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Slab Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Slab Width (ft)" type="number" fullWidth value={width} onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Rebar Spacing, On-Center (inches)" type="number" fullWidth value={spacing} onChange={(e) => setSpacing(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Total Rebar Pieces</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{valid ? totalBars : '—'}</Typography>
          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Running Each Direction</Typography>
              <Typography variant="h6">{valid ? `${barsAlongLength} / ${barsAlongWidth}` : '—'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Total Length</Typography>
              <Typography variant="h6">{valid ? `${totalLength.toFixed(0)} ft` : '—'}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RebarCalculator;
