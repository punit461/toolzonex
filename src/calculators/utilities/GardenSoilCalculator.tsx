'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GardenSoilCalculator = () => {
  const [length, setLength] = useState('10');
  const [width, setWidth] = useState('4');
  const [depth, setDepth] = useState('8');

  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;

    const cuFt = l * w * (d / 12);
    const cuYd = cuFt / 27;
    const bags = cuFt > 0 ? Math.ceil(cuFt / 1.5) : 0;

    return { cuFt, cuYd, bags };
  }, [length, width, depth]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Garden Soil Calculator</Typography>
      <Typography variant="body1">
        Enter your garden bed&apos;s length and width in feet, plus the depth of soil you want to add in
        inches, to find how much soil you need. The calculator converts depth from inches to feet so all
        three dimensions multiply together into a volume in cubic feet, then also converts that to cubic
        yards and an estimated number of standard 1.5 cubic foot bags.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Cubic Feet = Length × Width × (Depth in Inches / 12)
        <br />
        Cubic Yards = Cubic Feet / 27
        <br />
        Bags Needed = ceil(Cubic Feet / 1.5)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10 ft × 4 ft raised bed filled 8 inches deep needs 10 × 4 × (8 / 12) = 26.67 cubic feet of soil, which
        is about 0.99 cubic yards, or 18 standard 1.5 cubic foot bags (rounding up from 17.8).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much bagged or bulk garden soil to buy for a new raised bed.</li>
          <li>Budgeting soil quantity and cost before starting a vegetable or flower garden.</li>
          <li>Comparing bagged soil versus bulk delivery for larger garden projects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Should I buy bagged soil or bulk soil?</strong> For small volumes (typically under 1-2 cubic yards), bagged soil is usually more convenient. For larger beds or multiple beds, bulk soil delivered by the cubic yard is often significantly cheaper per cubic foot.</li>
          <li><strong>How deep should garden soil be for vegetables?</strong> Most vegetables do well with 8-12 inches of quality soil, though root vegetables like carrots benefit from deeper, looser soil, while shallow-rooted crops like lettuce can work with less.</li>
          <li><strong>Does this account for soil settling over time?</strong> No — this calculates the volume needed to fill the bed at your chosen depth right now. Soil naturally settles and compacts over the following weeks, so many gardeners add 10-15% extra or plan to top off the bed later.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/garden-soil-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Bed Length" type="number" value={length}
            onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Bed Width" type="number" value={width}
            onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Desired Soil Depth" type="number" value={depth}
            onChange={(e) => setDepth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Soil Needed</Typography>
            <Typography variant="h4" fontWeight="bold">{result.cuFt.toFixed(1)} cu ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Cubic Yards</Typography>
            <Typography fontWeight={600}>{result.cuYd.toFixed(2)} cu yd</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated 1.5 cu ft Bags</Typography>
            <Typography fontWeight={600}>{result.bags}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GardenSoilCalculator;
