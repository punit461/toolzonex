'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RESOLUTION_MULTIPLIERS: Record<string, { min: number; max: number }> = {
  '1080p': { min: 2.5, max: 3.5 },
  '4K': { min: 1.5, max: 2.5 },
  '8K': { min: 1.0, max: 1.5 },
};

const ScreenViewingDistanceCalculator = () => {
  const [diagonal, setDiagonal] = useState('65');
  const [resolution, setResolution] = useState('4K');

  const result = useMemo(() => {
    const d = parseFloat(diagonal) || 0;
    const { min, max } = RESOLUTION_MULTIPLIERS[resolution];
    return {
      minFeet: (d * min) / 12,
      maxFeet: (d * max) / 12,
    };
  }, [diagonal, resolution]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Screen Viewing Distance Calculator</Typography>
      <Typography variant="body1">
        Enter your screen&apos;s diagonal size in inches and select its resolution. Higher-resolution screens
        pack more pixels into the same diagonal, so individual pixels become indiscernible at a closer
        distance — meaning you can sit closer to a 4K or 8K screen than a 1080p screen of the same size and
        still get a sharp, immersive picture without visible pixelation.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Recommended Distance = Screen Diagonal × Resolution Multiplier Range
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 65&quot; 4K TV, using a roughly 1.5-2.5× multiplier range, gives a recommended viewing distance of
        about (65×1.5)/12 ≈ 8.1 ft to (65×2.5)/12 ≈ 13.5 ft. The same 65&quot; screen in 1080p needs a wider,
        farther range — roughly 13.5 ft to 19 ft — to avoid seeing individual pixels.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding where to place a couch or seating relative to a new TV.</li>
          <li>Comparing how close you can sit to a 4K vs. 1080p screen of the same size.</li>
          <li>Choosing the right screen size for a room with a fixed viewing distance.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why is the recommended distance a range instead of one number?</strong> Personal preference, eyesight, and content type (movies vs. fast-action gaming vs. detailed text) all shift the ideal distance within a reasonable range — these are commonly published guideline ranges, not a single precise number.</li>
          <li><strong>Why can I sit closer to a 4K screen than a 1080p screen of the same size?</strong> A 4K screen packs roughly 4 times as many pixels into the same physical area as 1080p, so pixels are much smaller and closer together — meaning your eye can be closer to the screen before those pixels become individually visible.</li>
          <li><strong>Does this apply to computer monitors too?</strong> The same underlying principle applies, but monitors are typically viewed much closer than TVs and often prioritize a wider field of view or higher pixel density for detailed work, so monitor-specific ergonomic guidelines may differ from these TV-oriented ranges.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/screen-viewing-distance-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Screen Diagonal Size (inches)" type="number" value={diagonal} onChange={(e) => setDiagonal(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField select label="Resolution" value={resolution} onChange={(e) => setResolution(e.target.value)} fullWidth>
            {Object.keys(RESOLUTION_MULTIPLIERS).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Recommended Viewing Distance</Typography>
            <Typography variant="h4" fontWeight="bold">
              {result.minFeet.toFixed(1)} – {result.maxFeet.toFixed(1)} ft
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ScreenViewingDistanceCalculator;
