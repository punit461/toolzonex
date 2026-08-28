'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const PaintCostCalculator = () => {
  const [length, setLength] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [walls, setWalls] = useState<string>('4');
  const [doorsWindows, setDoorsWindows] = useState<string>('');
  const [coats, setCoats] = useState<string>('2');
  const [coverage, setCoverage] = useState<string>('350');
  const [price, setPrice] = useState<string>('');
  const [pricePerGallon, setPricePerGallon] = useState<string>('25');

  const result = useMemo(() => {
    const len = Number(length);
    const hgt = Number(height);
    const w = Number(walls) || 0;
    const dw = Number(doorsWindows) || 0;
    const c = Number(coats) || 1;
    const cov = Number(coverage) || 350;
    const ppg = Number(pricePerGallon) || 0;

    if (!len || !hgt || len <= 0 || hgt <= 0 || c <= 0) return null;

    const wallArea = len * hgt * w;
    const totalArea = (wallArea - dw) * c;
    if (totalArea <= 0) return null;
    const gallons = Math.ceil(totalArea / cov);
    const cost = gallons * ppg;

    return { wallArea, totalArea, gallons, cost, ppg };
  }, [length, height, walls, doorsWindows, coats, coverage, pricePerGallon]);

  const content = (
    <>
      <Typography variant="h2">How is Paint Cost Calculated?</Typography>
      <Typography variant="body1">
        First calculate the total paintable surface: wall area = length × height × number of walls, minus
        the area taken up by doors and windows. Multiply this by the number of coats for the final area. Then
        divide by the coverage rate (square feet per gallon) and round up to find how many gallons you need.
        Total cost = gallons × price per gallon.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A room that is 12 ft long and 10 ft high with 4 walls has 12 × 10 × 4 = 480 sq ft of wall surface.
        Subtracting 30 sq ft for doors and windows gives 450 sq ft, and two coats make 900 sq ft. At 350 sq
        ft per gallon, you need 900 / 350 ≈ 2.6, rounded up to 3 gallons. At $25 per gallon that is $75.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a DIY painting project budget before buying paint.</li>
          <li>Estimating how many paint cans to buy without waste.</li>
          <li>Comparing costs between different paint brands with different coverage rates.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do I need more paint than the wall area?</Typography>
      <Typography variant="body1">
        Most walls need two coats for even, lasting coverage, and you lose a little paint to waste and touch
        ups. Always round the gallon count up, since paint is sold in whole gallons (or cans).
      </Typography>
      <Typography variant="h3">Does color affect coverage?</Typography>
      <Typography variant="body1">
        Yes — dark or bold colors often require extra coats to achieve an opaque finish, and a primer may be
        needed when making a dramatic color change, which adds to the total cost.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/paint-cost-calculator" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Wall Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Wall Height (ft)" type="number" fullWidth value={height} onChange={(e) => setHeight(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Number of Walls" type="number" fullWidth value={walls} onChange={(e) => setWalls(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Doors & Windows Area (sq ft)" type="number" fullWidth value={doorsWindows} onChange={(e) => setDoorsWindows(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Number of Coats" type="number" fullWidth value={coats} onChange={(e) => setCoats(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Coverage (sq ft per gallon)" type="number" fullWidth value={coverage} onChange={(e) => setCoverage(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Price per Gallon ($)" type="number" fullWidth value={pricePerGallon} onChange={(e) => setPricePerGallon(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Total Wall Area (all coats)</Typography>
                <Typography variant="h6" fontWeight={700}>{result.totalArea.toFixed(0)} sq ft</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Gallons Needed</Typography>
                <Typography variant="h5" fontWeight={700}>{result.gallons}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Cans to Buy</Typography>
                <Typography variant="h5" fontWeight={700}>{result.gallons}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Total Cost</Typography>
                <Typography variant="h5" fontWeight={700} color="primary.main">{currency.format(result.cost)}</Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PaintCostCalculator;
