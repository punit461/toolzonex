'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RICE_TYPES: Record<string, { ratio: number; time: number; yieldMultiplier: number }> = {
  White: { ratio: 2, time: 18, yieldMultiplier: 3 },
  Brown: { ratio: 2.5, time: 45, yieldMultiplier: 2.5 },
  Basmati: { ratio: 1.5, time: 15, yieldMultiplier: 3 },
  Jasmine: { ratio: 1.5, time: 15, yieldMultiplier: 3 },
};

const RiceCookingCalculator = () => {
  const [riceType, setRiceType] = useState('White');
  const [cups, setCups] = useState('2');

  const result = useMemo(() => {
    const c = parseFloat(cups) || 0;
    const preset = RICE_TYPES[riceType];
    return {
      water: c * preset.ratio,
      time: preset.time,
      yield: c * preset.yieldMultiplier,
    };
  }, [riceType, cups]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Rice Cooking Calculator</Typography>
      <Typography variant="body1">
        Select your rice type and enter how much dry rice you want to cook (in cups). Different rice
        varieties absorb different amounts of water and take different amounts of time — brown rice, for
        instance, has a bran layer that slows water absorption, requiring both more water and a longer cook
        time than white rice.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Water Needed = Dry Rice (cups) × Water:Rice Ratio
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        2 cups of white rice at a 2:1 water ratio needs 4 cups of water and cooks in about 18 minutes, yielding
        roughly 6 cups of cooked rice. The same 2 cups of brown rice needs 5 cups of water (2.5:1 ratio) and
        about 45 minutes to cook.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting the right water-to-rice ratio when trying a new rice variety.</li>
          <li>Planning cook time so rice finishes at the same time as the rest of a meal.</li>
          <li>Estimating cooked rice yield to know how many servings a batch will make.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these water ratios and times exact for every stove or rice cooker?</strong> They&apos;re standard published starting points for stovetop cooking. Rice cookers, altitude, pot type, and even the age of the rice can shift the ideal ratio and time slightly, so adjust based on your own results over a few batches.</li>
          <li><strong>Why does rice roughly triple in volume when cooked?</strong> Rice grains absorb water during cooking and swell significantly — white, basmati, and jasmine rice typically expand to about 3 times their dry volume, while brown rice expands somewhat less due to its intact bran layer.</li>
          <li><strong>Should I rinse rice before cooking?</strong> Rinsing removes surface starch and is commonly recommended for basmati and jasmine rice to keep grains separate and fluffy; it&apos;s optional for white and brown rice, though rinsing generally doesn&apos;t hurt.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/rice-cooking-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Rice Type" value={riceType} onChange={(e) => setRiceType(e.target.value)} fullWidth>
            {Object.keys(RICE_TYPES).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </TextField>
          <TextField label="Dry Rice (cups)" type="number" value={cups} onChange={(e) => setCups(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Water Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.water.toFixed(2)} cups</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated Cook Time</Typography>
            <Typography fontWeight={600}>{result.time} min</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Approx. Cooked Yield</Typography>
            <Typography fontWeight={600}>{result.yield.toFixed(1)} cups</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RiceCookingCalculator;
