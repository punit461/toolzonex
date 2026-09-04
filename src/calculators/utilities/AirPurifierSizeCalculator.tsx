'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const AirPurifierSizeCalculator = () => {
  const [length, setLength] = useState('15');
  const [width, setWidth] = useState('12');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [cadrFactor, setCadrFactor] = useState('1.5');

  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(ceilingHeight) || 0;
    const factor = parseFloat(cadrFactor) || 0;

    const area = l * w;
    const volume = area * h;
    const recommendedCadr = area * factor;

    return { area, volume, recommendedCadr };
  }, [length, width, ceilingHeight, cadrFactor]);

  const content = (
    <>
      <Typography variant="h2">How Air Purifier Size Is Calculated</Typography>
      <Typography variant="body1">
        CADR (Clean Air Delivery Rate) measures how many cubic feet of filtered air a purifier delivers per
        minute — it&apos;s the standard spec manufacturers use to indicate how effectively a unit cleans air in
        a given room size. To pick a properly sized purifier, match its CADR rating to your room&apos;s size at
        a target air changes per hour (ACH), the number of times the purifier fully cycles the room&apos;s air
        each hour. A common guideline for typical living spaces is to aim for 4-5 ACH, which works out to
        roughly room area × 1.5 as an approximate recommended CADR — a simplified rule of thumb you can adjust
        based on your own target ACH or room use (bedrooms and allergy-sensitive spaces often want a higher
        multiplier).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Room Area = Length × Width
        <br />
        Recommended CADR ≈ Room Area × Factor (default 1.5, for ~4-5 ACH)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 15 × 12 ft room has an area of 180 sq ft. Using the default factor of 1.5, the recommended CADR is
        about 270 — meaning you&apos;d want to look for an air purifier rated at roughly 270 CADR or higher to
        adequately clean that room&apos;s air.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing the right size air purifier before buying one for a bedroom, living room, or office.</li>
          <li>Checking whether an existing purifier is actually rated for the room it&apos;s placed in.</li>
          <li>Comparing purifier models by matching their CADR rating to your specific room size.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is CADR, exactly?</Typography>
      <Typography variant="body1">
        CADR (Clean Air Delivery Rate) is an independently tested rating showing how much filtered air (in
        cubic feet per minute) a purifier delivers for smoke, dust, and pollen specifically. It&apos;s printed
        on most reputable air purifiers and is the standard way to compare cleaning power across models.
      </Typography>
      <Typography variant="h3">Why does ceiling height matter if it&apos;s not in the main formula?</Typography>
      <Typography variant="body1">
        This calculator's area-based estimate assumes a standard ceiling height (around 8 ft). Room volume is
        shown separately for reference — for unusually tall or vaulted ceilings, you may want to increase the
        recommended CADR factor since there&apos;s more total air volume to clean.
      </Typography>
      <Typography variant="h3">Should allergy sufferers use a higher CADR target?</Typography>
      <Typography variant="body1">
        Yes — people with allergies, asthma, or pet sensitivities often benefit from a higher air-changes-per-hour
        target (5 or more), which means increasing the factor input above the default 1.5 to get a higher
        recommended CADR.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/air-purifier-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Room Length"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Room Width"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Ceiling Height"
            type="number"
            value={ceilingHeight}
            onChange={(e) => setCeilingHeight(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="CADR Factor (adjustable)"
            type="number"
            value={cadrFactor}
            onChange={(e) => setCadrFactor(e.target.value)}
            fullWidth
            helperText="1.5 ≈ 4-5 air changes per hour; increase for allergy-sensitive spaces"
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Recommended CADR</Typography>
            <Typography variant="h3" fontWeight="bold">{result.recommendedCadr.toFixed(0)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Room Area</Typography>
            <Typography fontWeight={600}>{result.area.toFixed(0)} sq ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Room Volume</Typography>
            <Typography fontWeight={600}>{result.volume.toFixed(0)} cu ft</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AirPurifierSizeCalculator;
