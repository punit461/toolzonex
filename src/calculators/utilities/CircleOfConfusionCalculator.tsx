'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SENSOR_PRESETS: Record<string, number> = {
  'Full Frame (43.3mm)': 43.3,
  'APS-C (28.2mm)': 28.2,
  'Micro Four Thirds (21.6mm)': 21.6,
  '1-inch (15.9mm)': 15.9,
  'Custom': 0,
};

const CircleOfConfusionCalculator = () => {
  const [preset, setPreset] = useState('Full Frame (43.3mm)');
  const [customDiagonal, setCustomDiagonal] = useState('43.3');

  const diagonal = preset === 'Custom' ? parseFloat(customDiagonal) : SENSOR_PRESETS[preset];
  const valid = !isNaN(diagonal) && diagonal > 0;
  const coc = valid ? diagonal / 1500 : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Circle of Confusion Calculator</Typography>
      <Typography variant="body1">
        The circle of confusion (CoC) is the largest blur spot the human eye still perceives as an
        acceptably sharp point when viewing a print or screen at a normal distance. It scales with sensor
        size — smaller sensors need a smaller circle of confusion because their images are enlarged more to
        reach the same final output size. Pick a common sensor format preset, or enter a custom sensor
        diagonal in millimeters, to calculate the standard circle of confusion value for that sensor.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Circle of Confusion (mm) = Sensor Diagonal (mm) ÷ 1500
      </Box>
      <Typography variant="body1">
        This 1/1500th-of-the-diagonal rule is a widely used photographic approximation that gives a
        practical, standardized CoC value for common depth-of-field calculations.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A full-frame sensor has a diagonal of about 43.3mm, giving a circle of confusion of 43.3 ÷ 1500 ≈
        0.029mm (commonly rounded to 0.03mm). An APS-C sensor, with a smaller 28.2mm diagonal, has a
        smaller CoC of about 0.019mm, reflecting the fact that its images need more enlargement to reach
        the same output size.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the correct circle of confusion value to plug into a depth-of-field or hyperfocal distance calculator.</li>
          <li>Understanding why smaller sensors are rated with different CoC constants in photography references.</li>
          <li>Comparing the sharpness tolerance implied by different camera formats before buying gear.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Depth of Field Calculator?</strong> The Depth of Field Calculator computes near and far focus limits, and it needs a circle-of-confusion value as one of its inputs to do that. This tool is a companion calculator that figures out what that CoC value should actually be for your specific sensor format — use this one first, then feed the result into the depth-of-field calculation.</li>
          <li><strong>Why isn&apos;t there one universal circle of confusion value for all cameras?</strong> Because sensor size determines how much an image must be enlarged to reach a standard viewing size (like an 8×10 print), and more enlargement makes any given blur spot more visible — so smaller sensors are assigned a proportionally smaller, stricter CoC value.</li>
          <li><strong>Can I use a custom circle of confusion value instead of the standard one?</strong> Yes — some photographers use tighter custom CoC values for large prints or critical sharpness work. Enter your sensor&apos;s exact diagonal under &quot;Custom&quot; if you know it precisely, or adjust the resulting value manually for your own sharpness standard.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/circle-of-confusion-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField select label="Sensor Format" value={preset} onChange={(e) => setPreset(e.target.value)} fullWidth>
            {Object.keys(SENSOR_PRESETS).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </TextField>
          {preset === 'Custom' && (
            <TextField
              label="Custom Sensor Diagonal (mm)"
              type="number"
              value={customDiagonal}
              onChange={(e) => setCustomDiagonal(e.target.value)}
              fullWidth
            />
          )}
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Circle of Confusion</Typography>
            <Typography variant="h3" fontWeight="bold">{valid ? coc.toFixed(4) : '—'}</Typography>
            <Typography variant="body2">mm</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CircleOfConfusionCalculator;
