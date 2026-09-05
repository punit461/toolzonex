'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type AppType = 'new' | 'overseed';

const DEFAULT_RATES: Record<AppType, string> = {
  new: '6',
  overseed: '3',
};

const LawnSeedCalculator = () => {
  const [area, setArea] = useState('5000');
  const [appType, setAppType] = useState<AppType>('new');
  const [rate, setRate] = useState(DEFAULT_RATES.new);

  useEffect(() => {
    setRate(DEFAULT_RATES[appType]);
  }, [appType]);

  const seedNeeded = useMemo(() => {
    const a = parseFloat(area) || 0;
    const r = parseFloat(rate) || 0;
    return (a / 1000) * r;
  }, [area, rate]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Lawn Seed Calculator</Typography>
      <Typography variant="body1">
        Enter your lawn area in square feet and choose whether you&apos;re seeding a brand new lawn (bare soil)
        or overseeding an existing lawn to thicken it up. Each application type has a different recommended
        seeding rate per 1,000 square feet — new lawns need much more seed since there&apos;s no existing grass
        to fill in gaps. The default rate for your selection is editable if your seed bag recommends a
        different rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Seed Needed (lbs) = (Area / 1000) × Rate per 1,000 sq ft
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5,000 sq ft new lawn at the default rate of 6 lbs per 1,000 sq ft needs (5,000 / 1000) × 6 = 30 lbs
        of seed. The same lawn, if just overseeding at 3 lbs per 1,000 sq ft, would need only 15 lbs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Buying the right amount of grass seed before starting a new lawn from scratch.</li>
          <li>Budgeting seed for an annual or seasonal overseeding to thicken thinning turf.</li>
          <li>Comparing seed cost between a full reseed and a lighter overseeding maintenance approach.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does a new lawn need so much more seed than overseeding?</strong> A new lawn starts from bare soil, so every seed needs to establish and fill in the space on its own. Overseeding fills gaps in an already-established lawn, so a lighter rate is enough to thicken the turf without wasting seed or causing overcrowding.</li>
          <li><strong>Should I use the exact rate this tool defaults to?</strong> Treat the defaults as a reasonable general starting point — always check the seed bag&apos;s label for the specific grass species and blend you&apos;re using, since recommended rates vary by grass type, and adjust the rate field to match.</li>
          <li><strong>Does this account for seed waste or uneven coverage?</strong> No — it calculates the straightforward amount based on area and rate. Many gardeners buy a small extra margin (5-10%) to account for uneven spreading, wind, or birds eating exposed seed.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/lawn-seed-calculator" content={content}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={appType}
          exclusive
          onChange={(_, val: AppType | null) => { if (val) setAppType(val); }}
          size="small"
        >
          <ToggleButton value="new">New Lawn</ToggleButton>
          <ToggleButton value="overseed">Overseeding</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Lawn Area (sq ft)" type="number" value={area} onChange={(e) => setArea(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField
            label="Seeding Rate (lbs per 1,000 sq ft)"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            onFocus={(e) => e.target.select()}
            fullWidth
            helperText="Adjust if your seed bag recommends a different rate"
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Seed Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{seedNeeded.toFixed(1)} lbs</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LawnSeedCalculator;
