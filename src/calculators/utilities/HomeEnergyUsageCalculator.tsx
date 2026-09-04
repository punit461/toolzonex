'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Intensity = 'low' | 'medium' | 'high';

const FACTORS: Record<Intensity, number> = { low: 0.5, medium: 0.8, high: 1.2 };
const LABELS: Record<Intensity, string> = {
  low: 'Low (0.5 kWh/sq ft/mo)',
  medium: 'Medium (0.8 kWh/sq ft/mo)',
  high: 'High (1.2 kWh/sq ft/mo)',
};

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const HomeEnergyUsageCalculator = () => {
  const [sqft, setSqft] = useState<string>('1800');
  const [intensity, setIntensity] = useState<Intensity>('medium');
  const [rate, setRate] = useState<string>('0.15');

  const result = useMemo(() => {
    const s = parseFloat(sqft) || 0;
    const r = parseFloat(rate) || 0;
    const monthlyKwh = s * FACTORS[intensity];
    const monthlyCost = monthlyKwh * r;
    return { monthlyKwh, monthlyCost, annualCost: monthlyCost * 12 };
  }, [sqft, intensity, rate]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Home Energy Usage Calculator</Typography>
      <Typography variant="body1">
        Enter your home&apos;s square footage, pick a usage-intensity level, and your electricity rate to get
        a rough whole-home electricity usage and cost estimate. Usage intensity represents average kWh
        consumed per square foot per month — Low (0.5) suits an efficient, mostly-empty-during-the-day home,
        Medium (0.8) is a typical household, and High (1.2) fits homes with heavy air conditioning, electric
        heating, or lots of always-on devices.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Monthly kWh = Sq Ft × Intensity Factor &nbsp;&nbsp;|&nbsp;&nbsp; Monthly Cost = Monthly kWh × Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An 1,800 sq ft home at Medium intensity (0.8 kWh/sq ft/mo) uses about 1,800 × 0.8 = 1,440 kWh per
        month. At $0.15 per kWh, that&apos;s roughly $216 per month, or about $2,592 per year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a ballpark annual electricity budget when moving into a new home.</li>
          <li>Comparing rough energy costs between homes of different sizes before buying or renting.</li>
          <li>Sanity-checking whether an unusually high electricity bill is out of line with typical usage.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How accurate is this estimate?</strong> This is a rough, whole-home ballpark based on typical average kWh-per-square-foot figures — it is not an audit of your actual electricity bill. Real usage depends heavily on climate, insulation, appliance efficiency, occupancy patterns, and local utility rate structures (including tiered pricing), so treat the result as a planning estimate rather than a precise prediction.</li>
          <li><strong>How is this different from the Appliance Running Cost Calculator?</strong> The Appliance Running Cost Calculator estimates the cost of a single device from its wattage and daily hours of use — it's precise for one appliance but doesn't tell you anything about your whole home. This Home Energy Usage Calculator instead works at the whole-house level, estimating total electricity usage from square footage and a general usage-intensity level, without needing to know any individual appliance's wattage.</li>
          <li><strong>How do I know if my home is Low, Medium, or High intensity?</strong> Consider your climate and habits: homes with minimal air conditioning or heating, efficient appliances, and low occupancy tend toward Low; a typical family home with normal AC/heating use fits Medium; homes with electric heating, heavy AC use in a hot climate, a pool pump, or many electronics running constantly tend toward High.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/home-energy-usage-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Home Size" type="number" value={sqft}
            onChange={(e) => setSqft(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <FormControl fullWidth>
            <InputLabel>Usage Intensity</InputLabel>
            <Select label="Usage Intensity" value={intensity} onChange={(e) => setIntensity(e.target.value as Intensity)}>
              <MenuItem value="low">{LABELS.low}</MenuItem>
              <MenuItem value="medium">{LABELS.medium}</MenuItem>
              <MenuItem value="high">{LABELS.high}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Electricity Rate" type="number" value={rate}
            onChange={(e) => setRate(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Monthly Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.monthlyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Usage</Typography>
            <Typography fontWeight={600}>{result.monthlyKwh.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Annual Cost</Typography>
            <Typography fontWeight={600}>{money(result.annualCost)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HomeEnergyUsageCalculator;
