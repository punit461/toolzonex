'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MulchCalculator = () => {
  const [length, setLength] = useState<string>('20');
  const [width, setWidth] = useState<string>('10');
  const [depthIn, setDepthIn] = useState<string>('3');
  const [bagSize, setBagSize] = useState<string>('2');

  const { cubicFeet, cubicYards, bagsNeeded, valid } = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depthIn);
    const bag = parseFloat(bagSize);

    if (isNaN(l) || isNaN(w) || isNaN(d) || l <= 0 || w <= 0 || d <= 0) {
      return { cubicFeet: 0, cubicYards: 0, bagsNeeded: null, valid: false };
    }

    const area = l * w;
    const cf = area * (d / 12);
    const cy = cf / 27;
    const bags = !isNaN(bag) && bag > 0 ? Math.ceil(cf / bag) : null;

    return { cubicFeet: cf, cubicYards: cy, bagsNeeded: bags, valid: true };
  }, [length, width, depthIn, bagSize]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Mulch Needed</Typography>
      <Typography variant="body1">
        To find how much mulch you need, multiply the area you want to cover by your desired mulch depth
        (converted to feet) to get the volume in cubic feet, then convert to cubic yards for bulk orders — or
        to a bag count if you&apos;re buying bagged mulch.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Volume (cu ft) = Length × Width × (Depth in inches ÷ 12) &nbsp;|&nbsp; Cubic Yards = Cubic Feet ÷ 27
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20&nbsp;ft × 10&nbsp;ft garden bed (200 sq ft) mulched 3 inches deep needs 200 × (3 ÷ 12) = 50 cubic
        feet of mulch, which is 50 ÷ 27 ≈ 1.85 cubic yards. Using standard 2 cubic ft bags, that&apos;s
        50 ÷ 2 = 25 bags.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much bagged or bulk mulch to buy for a garden bed or landscaping project.</li>
          <li>Comparing the cost of buying mulch in bulk (by the cubic yard) versus in bags.</li>
          <li>Planning mulch depth for weed suppression (typically 2-4 inches) versus decorative use.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How deep should I apply mulch?</Typography>
      <Typography variant="body1">
        A depth of 2-4 inches is typical for most garden beds — enough to suppress weeds and retain soil
        moisture without smothering plant roots. Avoid piling mulch directly against tree trunks or plant stems.
      </Typography>
      <Typography variant="h3">Is it cheaper to buy mulch in bulk or in bags?</Typography>
      <Typography variant="body1">
        Bulk mulch (sold by the cubic yard) is almost always cheaper per unit volume than bagged mulch once you
        need more than a couple of cubic yards, though bagged mulch is more convenient for small areas or if you
        don&apos;t have a way to haul loose material.
      </Typography>
      <Typography variant="h3">Does mulch need to be replaced every year?</Typography>
      <Typography variant="body1">
        Organic mulch breaks down over time and typically needs topping up annually or every couple of years,
        depending on the material — wood chips and bark last longer than finer mulches like shredded leaves or
        straw.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/mulch-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="Width (ft)" type="number" fullWidth value={width} onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          <TextField label="Mulch Depth (in)" type="number" fullWidth value={depthIn} onChange={(e) => setDepthIn(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Bag Size (cu ft, optional)" type="number" fullWidth value={bagSize} onChange={(e) => setBagSize(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Mulch Volume Needed</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? `${cubicFeet.toFixed(1)} cu ft` : '—'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {valid ? `${cubicYards.toFixed(2)} cu yd` : ''}
          </Typography>
          {bagsNeeded !== null && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              ≈ {bagsNeeded} bags
            </Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MulchCalculator;
