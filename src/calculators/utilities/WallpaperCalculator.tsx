'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WallpaperCalculatorContent = () => {
  const [length, setLength] = useState('14');
  const [width, setWidth] = useState('12');
  const [height, setHeight] = useState('8');
  const [subtractArea, setSubtractArea] = useState('20');
  const [rollCoverage, setRollCoverage] = useState('30');

  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const subtract = parseFloat(subtractArea) || 0;
    const coverage = parseFloat(rollCoverage) || 0;

    const perimeter = 2 * (l + w);
    const grossArea = perimeter * h;
    const netArea = Math.max(0, grossArea - subtract);
    const rolls = coverage > 0 ? Math.ceil(netArea / coverage) : 0;

    return { perimeter, grossArea, netArea, rolls };
  }, [length, width, height, subtractArea, rollCoverage]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Room Length" type="number" value={length}
            onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Room Width" type="number" value={width}
            onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
        </Box>
        <TextField
          label="Wall Height" type="number" value={height}
          onChange={(e) => setHeight(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
        />
        <TextField
          label="Doors/Windows Area to Subtract" type="number" value={subtractArea}
          onChange={(e) => setSubtractArea(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
        />
        <TextField
          label="Usable Coverage Per Roll" type="number" value={rollCoverage}
          onChange={(e) => setRollCoverage(e.target.value)} onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Common single rolls cover ~30 sq ft usable after pattern-matching waste"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Rolls Needed</Typography>
          <Typography variant="h3" fontWeight="bold">{result.rolls}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Wall Perimeter</Typography>
          <Typography fontWeight={600}>{result.perimeter.toFixed(1)} ft</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Gross Wall Area</Typography>
          <Typography fontWeight={600}>{result.grossArea.toFixed(0)} sq ft</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Net Wallpaper Area</Typography>
          <Typography fontWeight={600}>{result.netArea.toFixed(0)} sq ft</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const WallpaperCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Wallpaper Calculator Works</Typography>
      <Typography variant="body1">
        Enter your room&apos;s length and width to get the wall perimeter, then the wall height to get the
        total wall area. Subtract the combined area of doors and windows you won&apos;t be papering over, then
        divide the remaining net area by the usable coverage of a single roll (accounting for pattern-matching
        waste) to get the number of rolls needed for the whole room.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Rolls = (Perimeter × Height − Door/Window Area) ÷ Usable Coverage Per Roll
      </Box>
      <Typography variant="body1">
        This tool calculates the full room job — perimeter, gross area, net area, and roll count together. If
        you already know your total area and just want to check how far a single roll goes on its own, see our
        separate Wallpaper Roll Calculator for that narrower reference calculation.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 14 ft × 12 ft room with 8 ft walls has a perimeter of 2 × (14 + 12) = 52 ft, giving a gross wall area
        of 52 × 8 = 416 sq ft. Subtracting 20 sq ft for doors and windows leaves 396 sq ft. At 30 sq ft of
        usable coverage per roll, that&apos;s 396 ÷ 30 = 13.2, rounded up to 14 rolls.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many rolls to buy before a wallpapering project.</li>
          <li>Budgeting material costs for a room renovation.</li>
          <li>Comparing material needs between different rooms before choosing a wallpaper pattern.</li>
          <li>Avoiding running short mid-project by buying with a reasonable waste margin.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is usable coverage less than the roll&apos;s full size?</Typography>
      <Typography variant="body1">
        Most wallpaper rolls have a nominal size larger than what you can actually use, since pattern matching
        between strips, trimming at ceiling and floor lines, and waste from mistakes all reduce the effective
        coverage. A common rule of thumb is around 30 sq ft of usable coverage per single roll, though busier
        repeat patterns waste more.
      </Typography>
      <Typography variant="h3">Should I round up or buy extra rolls?</Typography>
      <Typography variant="body1">
        Yes — this calculator already rounds up to the next whole roll, but many installers recommend buying
        one extra roll beyond that for touch-ups, mistakes, or future repairs, especially for patterns that may
        be discontinued later.
      </Typography>
      <Typography variant="h3">Does this account for the wallpaper pattern repeat?</Typography>
      <Typography variant="body1">
        Not directly — pattern repeat waste is folded into the &quot;usable coverage per roll&quot; figure you
        enter. Wallpapers with a large pattern repeat need a lower usable-coverage estimate than plain or
        small-repeat patterns; check the manufacturer&apos;s own coverage guidance for your specific
        wallpaper.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/wallpaper-calculator" content={content}>
      <WallpaperCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WallpaperCalculator;
