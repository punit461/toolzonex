'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment, FormControlLabel, Switch } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DrivewayAreaCalculator = () => {
  const [length1, setLength1] = useState('40');
  const [width1, setWidth1] = useState('12');
  const [hasSecond, setHasSecond] = useState(false);
  const [length2, setLength2] = useState('15');
  const [width2, setWidth2] = useState('20');

  const l1 = parseFloat(length1) || 0;
  const w1 = parseFloat(width1) || 0;
  const l2 = parseFloat(length2) || 0;
  const w2 = parseFloat(width2) || 0;

  const area1 = l1 * w1;
  const area2 = hasSecond ? l2 * w2 : 0;
  const totalSqFt = area1 + area2;
  const totalSqYd = totalSqFt / 9;

  const content = (
    <>
      <Typography variant="h2">How to Use the Driveway Area Calculator</Typography>
      <Typography variant="body1">
        Enter your driveway&apos;s length and width to get its area. Many driveways aren&apos;t a single simple
        rectangle — for an L-shaped driveway, a two-width driveway, or an added parking pad, turn on the second
        section toggle and enter that section&apos;s own length and width. The calculator adds both sections
        together for a total area.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Area = Length × Width (per section)<br />
        Total Area = Section 1 + Section 2 (if added)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 40 × 12 ft main driveway section (480 sq ft) with an added 15 × 20 ft parking pad section (300 sq ft)
        gives a total driveway area of 780 sq ft, or 86.7 sq yd.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Measuring the total area of an L-shaped or irregular driveway made of two rectangular sections.</li>
          <li>Getting a square footage or square yardage figure to request paving or concrete quotes.</li>
          <li>Comparing the size of different driveway layout options before construction.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this calculate paving or concrete cost?</strong> No — this tool calculates area only, in both square feet and square yards. Square yardage is commonly used when requesting quotes for paving, concrete, or asphalt materials, so having both figures on hand makes it easier to get an accurate cost estimate from a contractor.</li>
          <li><strong>What if my driveway has more than two sections?</strong> Calculate any additional rectangular sections separately (length × width) and add their area to the total shown here manually.</li>
          <li><strong>How do I handle a curved or irregular edge?</strong> Approximate the curved area as a rectangle using its average width, or break it into smaller rectangular sections and add them together — for most driveway estimates, a reasonable rectangular approximation is accurate enough.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/driveway-area-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <Typography variant="subtitle1" fontWeight={600}>Section 1</Typography>
          <Stack direction="row" spacing={1.5}>
            <TextField label="Length" type="number" value={length1} onChange={(e) => setLength1(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} />
            <TextField label="Width" type="number" value={width1} onChange={(e) => setWidth1(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} />
          </Stack>

          <FormControlLabel
            control={<Switch checked={hasSecond} onChange={(e) => setHasSecond(e.target.checked)} />}
            label="Add a second section (L-shaped / two-width driveway)"
          />
          {hasSecond && (
            <>
              <Typography variant="subtitle1" fontWeight={600}>Section 2</Typography>
              <Stack direction="row" spacing={1.5}>
                <TextField label="Length" type="number" value={length2} onChange={(e) => setLength2(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} />
                <TextField label="Width" type="number" value={width2} onChange={(e) => setWidth2(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} />
              </Stack>
            </>
          )}
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Total Area</Typography>
            <Typography variant="h6" fontWeight="bold">{totalSqFt.toFixed(1)} sq ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">In Square Yards</Typography>
            <Typography variant="h6" fontWeight="bold">{totalSqYd.toFixed(2)} sq yd</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DrivewayAreaCalculator;
