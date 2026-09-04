'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Gender = 'women' | 'men';
type System = 'us' | 'uk' | 'eu' | 'intl';

interface SizeRow {
  us: number | string;
  uk: number | string;
  eu: number | string;
  intl: string;
}

const WOMENS_CHART: SizeRow[] = [
  { us: 0, uk: 4, eu: 32, intl: 'XXS' },
  { us: 2, uk: 6, eu: 34, intl: 'XS' },
  { us: 4, uk: 8, eu: 36, intl: 'S' },
  { us: 6, uk: 10, eu: 38, intl: 'S' },
  { us: 8, uk: 12, eu: 40, intl: 'M' },
  { us: 10, uk: 14, eu: 42, intl: 'M' },
  { us: 12, uk: 16, eu: 44, intl: 'L' },
  { us: 14, uk: 18, eu: 46, intl: 'L' },
  { us: 16, uk: 20, eu: 48, intl: 'XL' },
  { us: 18, uk: 22, eu: 50, intl: 'XXL' },
];

const MENS_CHART: SizeRow[] = [
  { us: 34, uk: 34, eu: 44, intl: 'XS' },
  { us: 36, uk: 36, eu: 46, intl: 'S' },
  { us: 38, uk: 38, eu: 48, intl: 'S' },
  { us: 40, uk: 40, eu: 50, intl: 'M' },
  { us: 42, uk: 42, eu: 52, intl: 'M' },
  { us: 44, uk: 44, eu: 54, intl: 'L' },
  { us: 46, uk: 46, eu: 56, intl: 'L' },
  { us: 48, uk: 48, eu: 58, intl: 'XL' },
  { us: 50, uk: 50, eu: 60, intl: 'XXL' },
  { us: 52, uk: 52, eu: 62, intl: 'XXXL' },
];

const SYSTEM_LABELS: Record<System, string> = {
  us: 'US',
  uk: 'UK',
  eu: 'EU',
  intl: 'International (S/M/L)',
};

function findClosestRow(chart: SizeRow[], system: 'us' | 'uk' | 'eu', value: number) {
  let closest = chart[0];
  let smallestDiff = Math.abs(Number(chart[0][system]) - value);
  for (const row of chart) {
    const diff = Math.abs(Number(row[system]) - value);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = row;
    }
  }
  return closest;
}

function findClosestByIntl(chart: SizeRow[], value: string) {
  return chart.find((row) => row.intl === value) ?? chart[Math.floor(chart.length / 2)];
}

const ClothingSizeConverterContent = () => {
  const [gender, setGender] = useState<Gender>('women');
  const [system, setSystem] = useState<System>('us');
  const [size, setSize] = useState('8');

  const chart = gender === 'women' ? WOMENS_CHART : MENS_CHART;

  const handleGenderChange = (val: Gender) => {
    setGender(val);
    const newChart = val === 'women' ? WOMENS_CHART : MENS_CHART;
    if (system !== 'intl') setSize(String(newChart[0][system]));
  };

  const result = useMemo(() => {
    if (system === 'intl') {
      return findClosestByIntl(chart, size.toUpperCase());
    }
    const v = parseFloat(size);
    if (Number.isNaN(v)) return null;
    return findClosestRow(chart, system, v);
  }, [chart, system, size]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ToggleButtonGroup value={gender} exclusive onChange={(_, val) => val && handleGenderChange(val)} size="small" fullWidth>
          <ToggleButton value="women">Women&apos;s</ToggleButton>
          <ToggleButton value="men">Men&apos;s</ToggleButton>
        </ToggleButtonGroup>

        <FormControl fullWidth>
          <InputLabel id="clothing-system">Sizing System</InputLabel>
          <Select
            labelId="clothing-system" label="Sizing System" value={system}
            onChange={(e) => {
              const newSystem = e.target.value as System;
              setSystem(newSystem);
              setSize(newSystem === 'intl' ? 'M' : String(chart[0][newSystem]));
            }}
          >
            {(Object.keys(SYSTEM_LABELS) as System[]).map((key) => (
              <MenuItem key={key} value={key}>{SYSTEM_LABELS[key]}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {system === 'intl' ? (
          <FormControl fullWidth>
            <InputLabel id="clothing-size">Size</InputLabel>
            <Select labelId="clothing-size" label="Size" value={size} onChange={(e) => setSize(e.target.value)}>
              {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <FormControl fullWidth>
            <InputLabel id="clothing-size-num">Size</InputLabel>
            <Select labelId="clothing-size-num" label="Size" value={size} onChange={(e) => setSize(e.target.value)}>
              {chart.map((row) => (
                <MenuItem key={String(row[system])} value={String(row[system])}>{row[system]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
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

const ClothingSizeConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Clothing Size Converter</Typography>
      <Typography variant="body1">
        Choose Women&apos;s or Men&apos;s sizing (since the two use entirely different charts), select the
        sizing system you know (US, UK, EU, or International S/M/L), and pick your size. The converter matches
        it against a standard clothing-size conversion chart and shows the equivalent size in every other
        system at once.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A US Women&apos;s size 8 converts to approximately UK 12, EU 40, and International size M. A US
        Men&apos;s size 40 converts to approximately UK 40, EU 50, and International size M.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Shopping from an international clothing retailer that lists sizes differently.</li>
          <li>Converting a size for a gift when you only know it in one system.</li>
          <li>Checking International S/M/L equivalents against a numeric size.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do men&apos;s and women&apos;s sizes use different charts?</Typography>
      <Typography variant="body1">
        Men&apos;s and women&apos;s clothing is cut to different body proportions and follows separate, largely
        unrelated numbering conventions in most sizing systems — a &quot;size 8&quot; in women&apos;s clothing
        has no direct relationship to any men&apos;s size, which is why this tool keeps the two charts
        completely separate.
      </Typography>
      <Typography variant="h3">Why does the same size vary between brands?</Typography>
      <Typography variant="body1">
        Clothing sizing isn&apos;t tightly regulated, and brands frequently use their own fit models and
        measurements — a phenomenon often called &quot;vanity sizing.&quot; This converter uses widely
        referenced standard charts as a reliable starting point, but always check a specific brand&apos;s own
        size chart when possible for the most accurate fit.
      </Typography>
      <Typography variant="h3">Is International sizing the same everywhere?</Typography>
      <Typography variant="body1">
        Roughly, but not exactly — International S/M/L/XL labels are a simplified, widely used convention
        rather than a single global legal standard, so exact measurements behind each letter size can still
        vary somewhat by brand and country.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/clothing-size-converter" content={content}>
      <ClothingSizeConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ClothingSizeConverter;
