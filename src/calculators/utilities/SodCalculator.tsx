'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SQFT_PER_ROLL = 9;
const SQFT_PER_PALLET = 450;

const SodCalculator = () => {
  const [length, setLength] = useState<string>('40');
  const [width, setWidth] = useState<string>('25');

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    if (Number.isNaN(l) || Number.isNaN(w) || l <= 0 || w <= 0) return null;
    const area = l * w;
    return {
      area,
      rolls: Math.ceil(area / SQFT_PER_ROLL),
      pallets: Math.ceil(area / SQFT_PER_PALLET),
    };
  }, [length, width]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Sod Calculator</Typography>
      <Typography variant="body1">
        Enter your lawn&apos;s length and width to find its total area, then see exactly how many sod rolls
        or pallets you need to order. A standard sod roll covers 9 square feet, and a standard pallet holds
        enough rolls to cover about 450 square feet — this calculator rounds up to the next whole roll or
        pallet, since suppliers only sell in whole units.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Area = Length × Width &nbsp;|&nbsp; Rolls = ⌈Area ÷ 9⌉ &nbsp;|&nbsp; Pallets = ⌈Area ÷ 450⌉
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A lawn measuring 40 ft × 25 ft has an area of 1,000 sq ft. That needs ⌈1,000 ÷ 9⌉ = 112 sod rolls, or
        ⌈1,000 ÷ 450⌉ = 3 pallets (which would actually deliver 1,350 sq ft of sod, more than enough with a
        little left over for cuts and waste).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Ordering the exact number of sod rolls or pallets needed for a new lawn installation.</li>
          <li>Budgeting a sod project by getting a materials count before requesting supplier quotes.</li>
          <li>Comparing whether it&apos;s more economical to order individual rolls or a full pallet.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Lawn Area Calculator?</strong> The Lawn Area Calculator only computes total square footage for irregularly-shaped yards made of multiple sections — it doesn't tell you how much material to buy. This Sod Calculator takes that same length-times-width area concept one step further and converts it directly into a sod rolls and pallets order count.</li>
          <li><strong>How is this different from the Topsoil Calculator?</strong> The Topsoil Calculator estimates the volume (and weight) of loose soil needed to fill an area to a certain depth — it deals in cubic feet or cubic yards of soil. This calculator instead counts discrete sod units (rolls and pallets) needed to cover a surface area — sod is sold by the piece, not by volume.</li>
          <li><strong>Should I order extra sod beyond the calculated amount?</strong> Yes — it's common practice to add 5-10% extra to account for irregular lawn edges, cutting around obstacles like trees or flower beds, and pieces damaged in handling. This calculator shows the exact area-based minimum; round up further if your lawn has a lot of curves or corners.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/sod-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Lawn Length" type="number" value={length}
            onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Lawn Width" type="number" value={width}
            onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Lawn Area</Typography>
            <Typography variant="h3" fontWeight="bold">{result ? `${result.area.toLocaleString()} sq ft` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Sod Rolls Needed</Typography>
            <Typography fontWeight={600}>{result ? result.rolls.toLocaleString() : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Sod Pallets Needed</Typography>
            <Typography fontWeight={600}>{result ? result.pallets.toLocaleString() : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SodCalculator;
