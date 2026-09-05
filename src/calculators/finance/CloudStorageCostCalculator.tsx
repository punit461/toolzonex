'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Unit = 'GB' | 'TB';

const PROVIDER_PRESETS: { label: string; ratePerGb: number }[] = [
  { label: 'AWS S3 Standard (~$0.023/GB)', ratePerGb: 0.023 },
  { label: 'Google Cloud Storage (~$0.020/GB)', ratePerGb: 0.020 },
  { label: 'Azure Blob Storage (~$0.018/GB)', ratePerGb: 0.018 },
  { label: 'Backblaze B2 (~$0.005/GB)', ratePerGb: 0.005 },
  { label: 'Custom Rate', ratePerGb: 0 },
];

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const CloudStorageCostCalculator = () => {
  const [amount, setAmount] = useState('500');
  const [unit, setUnit] = useState<Unit>('GB');
  const [provider, setProvider] = useState(PROVIDER_PRESETS[0].label);
  const [customRate, setCustomRate] = useState('0.023');

  const { amountGb, rate, monthlyCost, annualCost } = useMemo(() => {
    const raw = parseFloat(amount) || 0;
    const amountGb = unit === 'TB' ? raw * 1024 : raw;
    const preset = PROVIDER_PRESETS.find((p) => p.label === provider);
    const rate = provider === 'Custom Rate' ? (parseFloat(customRate) || 0) : (preset?.ratePerGb ?? 0);
    const monthlyCost = amountGb * rate;
    return { amountGb, rate, monthlyCost, annualCost: monthlyCost * 12 };
  }, [amount, unit, provider, customRate]);

  const content = (
    <>
      <Typography variant="h2">How to Estimate Cloud Storage Cost</Typography>
      <Typography variant="body1">
        Enter how much data you plan to store, in GB or TB, and pick a provider preset rate or enter your own
        custom rate per GB. The calculator multiplies your storage amount by the monthly rate to estimate
        monthly cost, then scales that up to an annual estimate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Monthly Cost = Storage Amount (GB) × Rate per GB
      </Box>
      <Typography variant="body2" color="text.secondary">
        The preset provider rates are illustrative ballpark examples of standard-tier list pricing — actual
        rates vary by storage class (standard, infrequent access, archive), region, committed-use discounts,
        and change over time. Check your provider&apos;s current pricing page for an exact quote.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Storing 500 GB at an illustrative AWS S3 Standard rate of $0.023/GB costs about 500 × 0.023 = $11.50 per
        month, or roughly $138 per year — before accounting for data transfer or request fees, which most
        providers bill separately.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Ballparking monthly and annual cloud storage costs before choosing a provider or tier.</li>
          <li>Comparing rough cost differences between storage providers at the same data volume.</li>
          <li>Budgeting cloud infrastructure costs as stored data grows over time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these provider rates exact?</Typography>
      <Typography variant="body1">
        No — they&apos;re rounded, illustrative examples of common standard-tier pricing at the time of writing.
        Cloud storage pricing is tiered, region-specific, and changes over time, so always check the current
        pricing page for an exact number, or use the custom rate option with your actual quoted price.
      </Typography>
      <Typography variant="h3">Does this include data transfer or API request costs?</Typography>
      <Typography variant="body1">
        No — this estimates storage cost only. Most cloud providers bill data egress (downloading data out) and
        API requests separately from storage, and those can add meaningfully to a real bill depending on usage
        patterns.
      </Typography>
      <Typography variant="h3">Why do rates differ so much between storage classes?</Typography>
      <Typography variant="body1">
        Providers price storage classes based on access frequency and retrieval speed — &quot;archive&quot; or
        &quot;cold&quot; tiers cost far less per GB than standard storage but charge more (and take longer) to
        retrieve data, while frequently accessed data belongs in standard-tier storage despite the higher
        per-GB rate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/cloud-storage-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <TextField
              label="Storage Amount" type="number" value={amount}
              onChange={(e) => setAmount(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth
            />
            <ToggleButtonGroup
              value={unit}
              exclusive
              onChange={(_, val: Unit | null) => { if (val) setUnit(val); }}
              size="small"
            >
              <ToggleButton value="GB">GB</ToggleButton>
              <ToggleButton value="TB">TB</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Select value={provider} onChange={(e) => setProvider(e.target.value)} fullWidth>
            {PROVIDER_PRESETS.map((p) => (
              <MenuItem key={p.label} value={p.label}>{p.label}</MenuItem>
            ))}
          </Select>

          {provider === 'Custom Rate' && (
            <TextField
              label="Custom Rate per GB" type="number" value={customRate}
              onChange={(e) => setCustomRate(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ GB</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Storage Amount</Typography>
            <Typography fontWeight={600}>{amountGb.toLocaleString(undefined, { maximumFractionDigits: 1 })} GB</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Rate</Typography>
            <Typography fontWeight={600}>${rate.toFixed(4)} / GB</Typography>
          </Paper>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Monthly Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(monthlyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Annual Cost</Typography>
            <Typography fontWeight={600}>{fmt(annualCost)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CloudStorageCostCalculator;
