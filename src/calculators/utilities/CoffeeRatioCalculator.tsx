'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem, ToggleButtonGroup, ToggleButton, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RATIO_PRESETS = ['1:15', '1:16', '1:17', '1:18', 'Custom'];

const CoffeeRatioCalculator = () => {
  const [ratioPreset, setRatioPreset] = useState('1:16');
  const [customRatio, setCustomRatio] = useState('16');
  const [solveFor, setSolveFor] = useState<'water' | 'coffee'>('water');
  const [coffeeGrams, setCoffeeGrams] = useState('20');
  const [waterGrams, setWaterGrams] = useState('320');

  const ratio = ratioPreset === 'Custom' ? parseFloat(customRatio) : parseFloat(ratioPreset.split(':')[1]);
  const validRatio = !isNaN(ratio) && ratio > 0;

  const coffee = parseFloat(coffeeGrams);
  const water = parseFloat(waterGrams);

  let resultWater = 0;
  let resultCoffee = 0;
  if (solveFor === 'water' && validRatio && !isNaN(coffee) && coffee > 0) {
    resultWater = coffee * ratio;
  }
  if (solveFor === 'coffee' && validRatio && !isNaN(water) && water > 0) {
    resultCoffee = water / ratio;
  }

  const waterResultGrams = solveFor === 'water' ? resultWater : water;
  const ml = waterResultGrams;
  const cups = ml / 236.588;

  const content = (
    <>
      <Typography variant="h2">How to Use the Coffee Ratio Calculator</Typography>
      <Typography variant="body1">
        A brew ratio expresses how much water to use per gram of coffee grounds — a 1:16 ratio means 16
        grams of water for every 1 gram of coffee. Pick a common brew ratio (or enter a custom one), choose
        whether you&apos;re solving for the water amount or the coffee amount, and enter the known value to
        get the other.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Water (g) = Coffee (g) × Ratio<br />
        Coffee (g) = Water (g) ÷ Ratio
      </Box>
      <Typography variant="body1">
        Since water&apos;s density is close enough to 1g per 1ml for kitchen purposes, the water weight in
        grams is also shown converted to milliliters and standard 8oz cups for convenience.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At a 1:16 ratio, 20 grams of coffee needs 20 × 16 = 320 grams of water — about 320ml, or roughly
        1.35 cups. A stronger 1:15 ratio would need only 300 grams of water for the same 20 grams of
        coffee, while a lighter 1:18 ratio would need 360 grams.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Scaling a pour-over or drip coffee recipe up or down while keeping the same strength.</li>
          <li>Converting a favorite brew ratio between grams of coffee and grams/ml of water.</li>
          <li>Dialing in a personal preferred strength by testing different ratios against the same coffee dose.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What ratio should I start with?</strong> 1:16 is a widely used starting point for drip and pour-over coffee. Use 1:15 for a stronger cup or 1:17–1:18 for a milder one, then adjust to taste.</li>
          <li><strong>Does the ratio change for espresso?</strong> Yes — espresso uses much tighter ratios (commonly around 1:2), well outside the drip-coffee presets here. This calculator is aimed at drip, pour-over, and immersion brewing ratios.</li>
          <li><strong>Is 1 gram of water really equal to 1 milliliter?</strong> Very close — water's density is almost exactly 1g/ml at typical brewing temperatures, so using a kitchen scale in grams for both coffee and water gives you an accurate, repeatable measurement without needing a separate liquid measuring cup.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/coffee-ratio-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Brew Ratio" value={ratioPreset} onChange={(e) => setRatioPreset(e.target.value)} fullWidth>
            {RATIO_PRESETS.map((r) => (
              <MenuItem key={r} value={r}>{r === 'Custom' ? 'Custom' : `${r} (coffee:water)`}</MenuItem>
            ))}
          </TextField>
          {ratioPreset === 'Custom' && (
            <TextField
              label="Custom Ratio (1 : X)"
              type="number"
              value={customRatio}
              onChange={(e) => setCustomRatio(e.target.value)}
              fullWidth
            />
          )}
          <ToggleButtonGroup value={solveFor} exclusive onChange={(_, v) => v && setSolveFor(v)} size="small">
            <ToggleButton value="water">Solve for Water</ToggleButton>
            <ToggleButton value="coffee">Solve for Coffee</ToggleButton>
          </ToggleButtonGroup>
          {solveFor === 'water' ? (
            <TextField
              label="Coffee Grounds"
              type="number"
              value={coffeeGrams}
              onChange={(e) => setCoffeeGrams(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">g</InputAdornment> } }}
            />
          ) : (
            <TextField
              label="Water Amount"
              type="number"
              value={waterGrams}
              onChange={(e) => setWaterGrams(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">g</InputAdornment> } }}
            />
          )}
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          {solveFor === 'water' ? (
            <>
              <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="body2">Water Needed</Typography>
                <Typography variant="h3" fontWeight="bold">{validRatio && resultWater > 0 ? resultWater.toFixed(0) : '—'}</Typography>
                <Typography variant="body2">grams</Typography>
              </Paper>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>≈ ml / cups</Typography>
                <Typography fontWeight={600}>{validRatio && resultWater > 0 ? `${ml.toFixed(0)} ml / ${cups.toFixed(2)} cups` : '—'}</Typography>
              </Paper>
            </>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Coffee Needed</Typography>
              <Typography variant="h3" fontWeight="bold">{validRatio && resultCoffee > 0 ? resultCoffee.toFixed(1) : '—'}</Typography>
              <Typography variant="body2">grams</Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CoffeeRatioCalculator;
