'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WallpaperRollCalculatorContent = () => {
  const [rollWidth, setRollWidth] = useState('20.5');
  const [rollLength, setRollLength] = useState('33');
  const [wasteAllowance, setWasteAllowance] = useState('15');

  const result = useMemo(() => {
    const wIn = parseFloat(rollWidth) || 0;
    const lFt = parseFloat(rollLength) || 0;
    const waste = parseFloat(wasteAllowance) || 0;

    const wFt = wIn / 12;
    const grossArea = wFt * lFt;
    const usableArea = grossArea * (1 - waste / 100);

    return { grossArea, usableArea };
  }, [rollWidth, rollLength, wasteAllowance]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Roll Width" type="number" value={rollWidth}
          onChange={(e) => setRollWidth(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Standard single rolls are commonly ~20.5 inches wide"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
        />
        <TextField
          label="Roll Length" type="number" value={rollLength}
          onChange={(e) => setRollLength(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Standard single rolls are commonly ~33 feet long"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
        />
        <TextField
          label="Pattern Repeat Waste Allowance" type="number" value={wasteAllowance}
          onChange={(e) => setWasteAllowance(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Higher for large/busy pattern repeats, lower for plain wallpaper"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Usable Coverage Per Roll</Typography>
          <Typography variant="h3" fontWeight="bold">{result.usableArea.toFixed(1)} sq ft</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Gross Roll Area (No Waste)</Typography>
          <Typography fontWeight={600}>{result.grossArea.toFixed(1)} sq ft</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const WallpaperRollCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Wallpaper Roll Calculator Works</Typography>
      <Typography variant="body1">
        This is a simple reference calculator for a single roll of wallpaper — enter the roll&apos;s width and
        length and a waste allowance for pattern matching, and it tells you the usable coverage area you can
        expect from that one roll. Multiply gross area by (1 − waste allowance) to get the realistic usable
        area after trimming and pattern-matching losses.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Usable Coverage = (Roll Width × Roll Length) × (1 − Waste Allowance %)
      </Box>
      <Typography variant="body1">
        This tool only calculates coverage for one roll. If you want to figure out how many rolls a whole room
        needs — accounting for wall perimeter, height, and door/window cutouts — use our separate Wallpaper
        Calculator instead.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A standard roll 20.5 inches (about 1.71 ft) wide and 33 ft long has a gross area of 1.71 × 33 ≈ 56.4 sq
        ft. With a 15% waste allowance for pattern matching, the usable coverage is about 56.4 × 0.85 ≈ 47.9 sq
        ft — though many installers use a more conservative ~30 sq ft usable estimate to be safe.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a specific wallpaper product&apos;s real usable coverage before buying.</li>
          <li>Comparing coverage between rolls of different dimensions.</li>
          <li>Understanding how a pattern&apos;s repeat size affects usable coverage.</li>
          <li>Feeding a more accurate per-roll coverage figure into a full room wallpaper calculation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the main Wallpaper Calculator?</Typography>
      <Typography variant="body1">
        This tool only calculates the usable coverage of a single roll, as a quick reference. Our separate
        Wallpaper Calculator handles the full room job — wall perimeter, area, door/window cutouts, and total
        rolls needed — using a roll coverage figure like the one this tool produces.
      </Typography>
      <Typography variant="h3">What waste allowance should I use?</Typography>
      <Typography variant="body1">
        Plain wallpaper with no pattern can use a low allowance (5-10%), while wallpaper with a large pattern
        repeat that needs careful matching between strips often needs 15-25% or more. Check the
        manufacturer&apos;s specific pattern repeat guidance when available.
      </Typography>
      <Typography variant="h3">Why do roll dimensions vary between products?</Typography>
      <Typography variant="body1">
        Wallpaper isn&apos;t manufactured to one universal size — European rolls, American rolls, and
        specialty/designer wallpaper all commonly ship in different widths and lengths. Always check the
        specific product&apos;s label rather than assuming a standard size.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/wallpaper-roll-calculator" content={content}>
      <WallpaperRollCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WallpaperRollCalculator;
