'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type System = 'usM' | 'usW' | 'uk' | 'eu' | 'cm';

const SIZE_CHART: Record<System, number>[] = [
  { usM: 4, usW: 5.5, uk: 3.5, eu: 36, cm: 22.5 },
  { usM: 4.5, usW: 6, uk: 4, eu: 36.5, cm: 23.0 },
  { usM: 5, usW: 6.5, uk: 4.5, eu: 37.5, cm: 23.5 },
  { usM: 5.5, usW: 7, uk: 5, eu: 38, cm: 24.0 },
  { usM: 6, usW: 7.5, uk: 5.5, eu: 38.5, cm: 24.0 },
  { usM: 6.5, usW: 8, uk: 6, eu: 39, cm: 24.5 },
  { usM: 7, usW: 8.5, uk: 6.5, eu: 40, cm: 25.0 },
  { usM: 7.5, usW: 9, uk: 7, eu: 40.5, cm: 25.5 },
  { usM: 8, usW: 9.5, uk: 7.5, eu: 41, cm: 26.0 },
  { usM: 8.5, usW: 10, uk: 8, eu: 42, cm: 26.5 },
  { usM: 9, usW: 10.5, uk: 8.5, eu: 42.5, cm: 27.0 },
  { usM: 9.5, usW: 11, uk: 9, eu: 43, cm: 27.5 },
  { usM: 10, usW: 11.5, uk: 9.5, eu: 44, cm: 28.0 },
  { usM: 10.5, usW: 12, uk: 10, eu: 44.5, cm: 28.5 },
  { usM: 11, usW: 12.5, uk: 10.5, eu: 45, cm: 29.0 },
  { usM: 11.5, usW: 13, uk: 11, eu: 45.5, cm: 29.4 },
  { usM: 12, usW: 13.5, uk: 11.5, eu: 46, cm: 29.8 },
  { usM: 13, usW: 14.5, uk: 12.5, eu: 47, cm: 30.5 },
  { usM: 14, usW: 15.5, uk: 13.5, eu: 48, cm: 31.5 },
  { usM: 15, usW: 16.5, uk: 14.5, eu: 49, cm: 32.5 },
];

const SYSTEM_LABELS: Record<System, string> = {
  usM: "US Men's",
  usW: "US Women's",
  uk: 'UK',
  eu: 'EU',
  cm: 'CM (Foot Length)',
};

function findClosestRow(system: System, value: number) {
  let closest = SIZE_CHART[0];
  let smallestDiff = Math.abs(SIZE_CHART[0][system] - value);
  for (const row of SIZE_CHART) {
    const diff = Math.abs(row[system] - value);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = row;
    }
  }
  return closest;
}

const ShoeSizeConverter = () => {
  const [system, setSystem] = useState<System>('usM');
  const [size, setSize] = useState<string>('9');

  const result = useMemo(() => {
    const v = parseFloat(size);
    if (Number.isNaN(v) || v <= 0) return null;
    return findClosestRow(system, v);
  }, [system, size]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Shoe Size Converter</Typography>
      <Typography variant="body1">
        Select the sizing system you know (US Men's, US Women's, UK, EU, or CM/foot length) and enter your
        size. The converter matches your size against a standard shoe-size conversion chart and shows the
        equivalent size in every other system at once.
      </Typography>

      <Typography variant="h2">Why Shoe Sizes Don't Convert With a Simple Formula</Typography>
      <Typography variant="body1">
        Shoe sizing systems were developed independently by different countries and don't scale linearly
        against each other — a half-size step in the US system doesn't always correspond to the same fixed step
        in EU or UK sizing. That's why this tool uses a reference conversion table rather than a single
        formula, matching your entered size to the closest row and reading across for the other systems. Keep
        in mind that exact fit can still vary slightly by brand and shoe style, since manufacturers don't follow
        these charts with perfect precision.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A US Men's size 9 converts to approximately US Women's 10.5, UK 8.5, EU 42.5, and a foot length of about
        27.0 cm.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Shopping for shoes from an international retailer that lists sizes in a different system.</li>
          <li>Converting between men's and women's US sizing.</li>
          <li>Checking your foot-length measurement against a standard size chart.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does my converted size feel slightly off in a specific shoe?</Typography>
      <Typography variant="body1">
        Standard conversion charts give a reliable starting point, but individual brands and shoe styles vary
        in their exact last (the mold a shoe is built on), so the same converted size might fit differently
        between two brands. When possible, check the specific brand's own size chart for the most accurate fit.
      </Typography>
      <Typography variant="h3">How is the US Women's to US Men's conversion calculated?</Typography>
      <Typography variant="body1">
        This chart follows the common industry convention where US Women's sizing runs about 1.5 sizes larger
        than the equivalent US Men's size (e.g., a Men's 9 is roughly a Women's 10.5).
      </Typography>
      <Typography variant="h3">What if my exact size isn't in the table?</Typography>
      <Typography variant="body1">
        The converter matches your entered size to the closest available row in the reference chart, so sizes
        between listed increments will show the nearest equivalent rather than an interpolated exact value.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/shoe-size-converter" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="shoe-system">Sizing System</InputLabel>
            <Select labelId="shoe-system" label="Sizing System" value={system} onChange={(e) => setSystem(e.target.value as System)}>
              {(Object.keys(SYSTEM_LABELS) as System[]).map((key) => (
                <MenuItem key={key} value={key}>{SYSTEM_LABELS[key]}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Size"
            fullWidth
            type="number"
            onFocus={(e) => e.target.select()}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Converted Sizes</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {(Object.keys(SYSTEM_LABELS) as System[]).map((key) => (
              <Paper
                key={key}
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  bgcolor: key === system ? 'primary.main' : 'background.paper',
                  color: key === system ? 'white' : 'text.primary',
                }}
              >
                <Typography variant="h6">{SYSTEM_LABELS[key]}</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {result ? result[key] : '—'}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ShoeSizeConverter;
