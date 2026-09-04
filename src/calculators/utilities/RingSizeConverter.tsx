'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type System = 'us' | 'uk' | 'eu' | 'mm';

const SIZE_CHART: Record<System, number>[] = [
  { us: 4, uk: 7.5, eu: 47, mm: 14.9 },
  { us: 4.5, uk: 8.5, eu: 48, mm: 15.3 },
  { us: 5, uk: 9.5, eu: 49, mm: 15.7 },
  { us: 5.5, uk: 10.5, eu: 50.5, mm: 16.1 },
  { us: 6, uk: 11.5, eu: 51.5, mm: 16.5 },
  { us: 6.5, uk: 13, eu: 53, mm: 16.9 },
  { us: 7, uk: 14, eu: 54, mm: 17.3 },
  { us: 7.5, uk: 15, eu: 55.5, mm: 17.7 },
  { us: 8, uk: 16, eu: 56.5, mm: 18.1 },
  { us: 8.5, uk: 17.5, eu: 58, mm: 18.5 },
  { us: 9, uk: 18.5, eu: 59, mm: 18.9 },
  { us: 9.5, uk: 19.5, eu: 60.5, mm: 19.4 },
  { us: 10, uk: 20.5, eu: 61.5, mm: 19.8 },
  { us: 10.5, uk: 22, eu: 63, mm: 20.2 },
  { us: 11, uk: 23, eu: 64, mm: 20.6 },
  { us: 11.5, uk: 24, eu: 65.5, mm: 21.0 },
  { us: 12, uk: 25, eu: 66.5, mm: 21.4 },
  { us: 13, uk: 27, eu: 69, mm: 22.2 },
];

const SYSTEM_LABELS: Record<System, string> = {
  us: 'US / Canada',
  uk: 'UK / Australia',
  eu: 'EU',
  mm: 'Diameter (mm)',
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

const RingSizeConverterContent = () => {
  const [system, setSystem] = useState<System>('us');
  const [size, setSize] = useState('7');

  const result = useMemo(() => {
    const v = parseFloat(size);
    if (Number.isNaN(v) || v <= 0) return null;
    return findClosestRow(system, v);
  }, [system, size]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="ring-system">Sizing System</InputLabel>
          <Select labelId="ring-system" label="Sizing System" value={system} onChange={(e) => setSystem(e.target.value as System)}>
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
  );
};

const RingSizeConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Ring Size Converter</Typography>
      <Typography variant="body1">
        Select the sizing system you know (US/Canada, UK/Australia, EU, or inner diameter in millimeters) and
        enter your size. The converter matches it against a standard ring-size conversion chart and shows the
        equivalent size in every other system at once.
      </Typography>

      <Typography variant="h2">Why Ring Sizes Don&apos;t Convert With a Simple Formula</Typography>
      <Typography variant="body1">
        Like shoe sizes, ring sizing systems were developed independently by different regions and don&apos;t
        scale in a simple linear way against each other. This tool uses a reference conversion table, matching
        your entered size to the closest row and reading across for the other systems, rather than a single
        formula.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A US size 7 converts to approximately UK/Australia size N (14), EU size 54, and an inner diameter of
        about 17.3mm.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Buying a ring from an international jeweler that lists sizes in a different system.</li>
          <li>Converting a measured ring diameter into a standard size to order.</li>
          <li>Checking a partner&apos;s or gift recipient&apos;s ring size across regions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I measure my ring size at home?</Typography>
      <Typography variant="body1">
        Measure the inner diameter of a ring that already fits well (in millimeters) using a ruler, or wrap a
        strip of paper or string around your finger and measure its circumference, then convert. Entering the
        diameter directly into the &quot;Diameter (mm)&quot; option above gives the most direct conversion.
      </Typography>
      <Typography variant="h3">Why does my converted size feel slightly off?</Typography>
      <Typography variant="body1">
        Standard conversion charts give a reliable starting point, but band width and finger shape can affect
        how a given size actually fits — a wider band typically fits more snugly than a thin band at the same
        listed size. When possible, get sized in person at a jeweler for the most accurate fit.
      </Typography>
      <Typography variant="h3">What if my exact size isn&apos;t in the table?</Typography>
      <Typography variant="body1">
        The converter matches your entered size to the closest available row in the reference chart, so sizes
        between listed increments will show the nearest equivalent rather than an interpolated exact value.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ring-size-converter" content={content}>
      <RingSizeConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RingSizeConverter;
