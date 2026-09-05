'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const RefrigeratorEnergyCostCalculator = () => {
  const [wattage, setWattage] = useState('150');
  const [dutyCycle, setDutyCycle] = useState('35');
  const [rate, setRate] = useState('0.16');

  const w = parseFloat(wattage) || 0;
  const dc = parseFloat(dutyCycle) || 0;
  const r = parseFloat(rate) || 0;

  const dailyKwh = (w / 1000) * 24 * (dc / 100);
  const dailyCost = dailyKwh * r;
  const monthlyCost = dailyCost * 30;
  const annualCost = dailyCost * 365;

  const content = (
    <>
      <Typography variant="h2">How to Use the Refrigerator Energy Cost Calculator</Typography>
      <Typography variant="body1">
        Enter your refrigerator&apos;s rated wattage, its duty cycle percentage, and your electricity rate. A
        refrigerator&apos;s compressor cycles on and off to maintain temperature rather than running
        continuously, so its actual average power draw over a day is well below its rated wattage. The duty
        cycle percentage represents the share of time the compressor is actually running — around 30-40% is a
        common default estimate, adjustable if you know your model&apos;s actual figure.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Daily kWh = (Wattage / 1000) × 24 × Duty Cycle %<br />
        Cost = Daily kWh × Electricity Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 150W refrigerator running at a 35% duty cycle uses about 1.26 kWh per day (0.15 × 24 × 0.35). At
        $0.16 per kWh, that&apos;s roughly $0.20 per day, $6.05 per month, and $73.58 per year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the ongoing electricity cost of running a refrigerator or freezer.</li>
          <li>Comparing the running cost of an old refrigerator against a newer, more efficient model.</li>
          <li>Budgeting monthly or annual utility costs for a household or rental unit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Refrigerator Size Calculator?</strong> The Refrigerator Size Calculator recommends a capacity in cubic feet based on your household size — it&apos;s about how big a fridge you need. This tool instead estimates the ongoing electricity cost of running a refrigerator you already have (or are considering), based on its wattage and duty cycle.</li>
          <li><strong>Why isn't the refrigerator running at full wattage all the time?</strong> The rated wattage on a refrigerator's label reflects peak draw when the compressor is actively running, not a continuous draw. Once the interior reaches its target temperature, the compressor shuts off until temperature rises again, so actual average power use is much lower than the rated wattage over a full day.</li>
          <li><strong>Where can I find my refrigerator's actual duty cycle?</strong> It's rarely listed directly — the default of 30-40% used here is a reasonable estimate for a typical household refrigerator. For a more precise figure, a plug-in electricity usage monitor over a few days will give you your specific unit's real-world average.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/refrigerator-energy-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Refrigerator Wattage" type="number" value={wattage} onChange={(e) => setWattage(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }} />
          <TextField
            label="Duty Cycle"
            type="number"
            value={dutyCycle}
            onChange={(e) => setDutyCycle(e.target.value)}
            fullWidth
            helperText="Share of time the compressor is actively running (default ~35%)"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Electricity Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/kWh</InputAdornment> } }}
          />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Estimated Cost</Typography>
          <Stack spacing={2}>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Daily</Typography>
              <Typography variant="h6" fontWeight="bold">{money(dailyCost)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6">Monthly</Typography>
              <Typography variant="h6" fontWeight="bold">{money(monthlyCost)}</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Annual</Typography>
              <Typography variant="h6" fontWeight="bold">{money(annualCost)}</Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RefrigeratorEnergyCostCalculator;
