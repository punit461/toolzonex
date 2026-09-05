'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ApplianceRunningCostCalculator = () => {
  const [watts, setWatts] = useState('1200');
  const [hours, setHours] = useState('2');
  const [rate, setRate] = useState('0.15');

  const result = useMemo(() => {
    const w = parseFloat(watts) || 0;
    const h = parseFloat(hours) || 0;
    const r = parseFloat(rate) || 0;

    const dailyCost = (w / 1000) * h * r;
    return {
      dailyCost,
      monthlyCost: dailyCost * 30,
      annualCost: dailyCost * 365,
    };
  }, [watts, hours, rate]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Appliance Running Cost Calculator</Typography>
      <Typography variant="body1">
        Enter any appliance&apos;s wattage, how many hours a day it runs, and your electricity rate per
        kilowatt-hour to estimate its running cost. This is the generic, any-wattage version that works for any
        single appliance — enter the wattage printed on the appliance&apos;s label or manual, along with a
        realistic estimate of daily usage hours.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Daily Cost = (Watts / 1000) × Hours Per Day × Rate per kWh
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1,200W appliance used 2 hours a day at $0.15 per kWh costs (1,200 / 1000) × 2 × 0.15 = $0.36 per day,
        about $10.80 a month, and roughly $131.40 a year.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the running cost of any household appliance from its wattage label.</li>
          <li>Comparing running costs between two appliances before buying a replacement.</li>
          <li>Spotting which appliances contribute most to a monthly electricity bill.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Appliance Wattage Calculator?</strong> The Appliance Wattage Calculator solves Ohm&apos;s Law (P = V × I) for whichever one of watts, volts, or amps you don&apos;t know — it doesn&apos;t compute a dollar cost. This calculator takes a known wattage and turns it into an estimated running cost in dollars.</li>
          <li><strong>How is this different from the AC Running Cost or Computer Electricity Cost calculators?</strong> Those are device-specific tools with built-in assumptions — for example, the computer calculator splits power draw into separate idle and load states. This is the generic, single-wattage version that works for any appliance: space heaters, hair dryers, dehumidifiers, and anything else with a fixed running wattage.</li>
          <li><strong>Where do I find my electricity rate?</strong> Check a recent electricity bill — it&apos;s usually listed as a per-kWh rate, sometimes broken into tiers. Use your average or marginal rate for the most realistic estimate.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/appliance-running-cost-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Wattage" type="number" value={watts}
            onChange={(e) => setWatts(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
          />
          <TextField
            label="Hours Used Per Day" type="number" value={hours}
            onChange={(e) => setHours(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
          <TextField
            label="Electricity Rate" type="number" value={rate}
            onChange={(e) => setRate(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Daily Cost</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.dailyCost)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Cost</Typography>
            <Typography fontWeight={600}>{money(result.monthlyCost)}</Typography>
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

export default ApplianceRunningCostCalculator;
