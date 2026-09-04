'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GamingSensitivityCalculator = () => {
  const [dpi, setDpi] = useState<string>('800');
  const [sensitivity, setSensitivity] = useState<string>('0.4');

  const [dpi2, setDpi2] = useState<string>('1600');

  const d = parseFloat(dpi);
  const s = parseFloat(sensitivity);
  const d2 = parseFloat(dpi2);
  const valid = !isNaN(d) && !isNaN(s) && d > 0 && s > 0;

  const eDpi = valid ? d * s : 0;
  const matchedSensitivity = valid && !isNaN(d2) && d2 > 0 ? eDpi / d2 : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Gaming Sensitivity Calculator</Typography>
      <Typography variant="body1">
        Enter your mouse DPI (dots per inch, set in your mouse software) and your in-game sensitivity setting
        to get your effective DPI (eDPI) — the single number that actually determines how far your cursor or
        crosshair moves for a given physical mouse movement. eDPI is what makes it possible to compare
        sensitivity fairly between players who use different mice, and to carry your exact aim feel over to a
        new game or a new mouse with a different DPI.
      </Typography>

      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        eDPI = Mouse DPI × In-Game Sensitivity
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A mouse set to 800 DPI with an in-game sensitivity of 0.4 gives an eDPI of 320. If you switch to a
        mouse set to 1600 DPI and want the exact same feel, set your in-game sensitivity to 0.2 (320 ÷ 1600) to
        keep the same eDPI.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Carrying your exact aim sensitivity over when you get a new mouse with a different DPI.</li>
          <li>Matching sensitivity between two games that use different in-game sensitivity scales.</li>
          <li>Comparing your effective sensitivity against a pro player&apos;s published settings fairly.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does eDPI matter more than DPI alone?</strong> DPI by itself only tells you how sensitive the mouse hardware is — the in-game sensitivity multiplier changes the actual feel on top of that. Two players at "800 DPI" can have wildly different aim speed if their in-game sensitivity differs, but the same eDPI always feels the same.</li>
          <li><strong>Does eDPI transfer exactly between different games?</strong> Mostly, but not perfectly — different game engines can apply their sensitivity multiplier slightly differently (some use raw input, others don&apos;t), so eDPI is a very close starting point rather than a guaranteed identical feel in every single game.</li>
          <li><strong>What's a "good" eDPI?</strong> There's no universal answer — competitive players commonly land somewhere in a wide range depending on playstyle and monitor size. Use eDPI to keep your own feel consistent, not to chase someone else's exact number.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/gaming-sensitivity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Mouse DPI" type="number" value={dpi} onChange={(e) => setDpi(e.target.value)} fullWidth />
          <TextField label="In-Game Sensitivity" type="number" value={sensitivity} onChange={(e) => setSensitivity(e.target.value)} fullWidth inputProps={{ step: '0.01' }} />
          <TextField
            label="Match on a New Mouse's DPI (optional)"
            type="number"
            value={dpi2}
            onChange={(e) => setDpi2(e.target.value)}
            fullWidth
            helperText="Enter a different mouse's DPI to see the in-game sensitivity that matches your current eDPI"
          />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Effective DPI (eDPI)</Typography>
            <Typography variant="h6" fontWeight="bold">{valid ? eDpi.toFixed(1) : '—'}</Typography>
          </Paper>
          {matchedSensitivity > 0 && (
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Matching Sensitivity at {dpi2} DPI</Typography>
              <Typography variant="h6" fontWeight="bold">{matchedSensitivity.toFixed(3)}</Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GamingSensitivityCalculator;
