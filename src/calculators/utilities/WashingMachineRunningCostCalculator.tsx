'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const WashingMachineRunningCostCalculator = () => {
  const [wattage, setWattage] = useState('500');
  const [cycleHours, setCycleHours] = useState('1');
  const [loadsPerWeek, setLoadsPerWeek] = useState('5');
  const [rate, setRate] = useState('0.16');

  const w = parseFloat(wattage) || 0;
  const hrs = parseFloat(cycleHours) || 0;
  const loads = parseFloat(loadsPerWeek) || 0;
  const r = parseFloat(rate) || 0;

  const weeklyKwh = (w / 1000) * hrs * loads;
  const weeklyCost = weeklyKwh * r;
  const monthlyCost = weeklyCost * 4.33;
  const annualCost = weeklyCost * 52;

  const content = (
    <>
      <Typography variant="h2">How to Use the Washing Machine Running Cost Calculator</Typography>
      <Typography variant="body1">
        Enter your washing machine&apos;s wattage per cycle, the average length of a cycle, how many loads you
        run per week, and your electricity rate. The calculator multiplies these together to estimate your
        washing machine&apos;s weekly electricity cost, then scales it up to a monthly and annual figure.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Weekly Cost = (Wattage / 1000) × Cycle Hours × Loads per Week × Electricity Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 500W washing machine run for 1 hour per cycle, 5 loads a week, at $0.16 per kWh uses 2.5 kWh per week
        (0.5 × 1 × 5), costing about $0.40 per week, $1.73 per month, and $20.80 per year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the ongoing electricity cost of doing laundry at home.</li>
          <li>Comparing running costs between washing machine models or wash settings.</li>
          <li>Checking how reducing loads per week or cycle length affects your utility bill.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Where do I find my washing machine's wattage?</strong> Check the rating label on the machine itself (usually inside the door or on the back panel) or the manufacturer's spec sheet — it's often listed in watts or as amps and volts, which you can multiply together to get watts.</li>
          <li><strong>Does this include hot water heating cost?</strong> No — this estimates only the washing machine's own electrical draw for the motor, pump, and controls. If you wash primarily on a hot or warm cycle, your water heater's energy use to heat that water is a separate cost not included here.</li>
          <li><strong>Does cycle type affect wattage?</strong> Yes — heavy-duty, sanitize, or extended cycles typically draw more power over a longer time than a quick or delicate cycle. Use the wattage and cycle length for your typical, most-used setting for the most representative estimate.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/washing-machine-running-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Wattage per Cycle" type="number" value={wattage} onChange={(e) => setWattage(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }} />
          <TextField label="Average Cycle Length" type="number" value={cycleHours} onChange={(e) => setCycleHours(e.target.value)} fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }} />
          <TextField label="Loads per Week" type="number" value={loadsPerWeek} onChange={(e) => setLoadsPerWeek(e.target.value)} fullWidth />
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
              <Typography variant="h6">Weekly</Typography>
              <Typography variant="h6" fontWeight="bold">{money(weeklyCost)}</Typography>
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

export default WashingMachineRunningCostCalculator;
