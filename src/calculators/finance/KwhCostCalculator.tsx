'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const KwhCostCalculatorContent = () => {
  const [wattage, setWattage] = useState('1500');
  const [hoursPerDay, setHoursPerDay] = useState('2');
  const [price, setPrice] = useState('0.15');

  const result = useMemo(() => {
    const w = parseFloat(wattage) || 0;
    const h = parseFloat(hoursPerDay) || 0;
    const p = parseFloat(price) || 0;

    const dailyKwh = (w / 1000) * h;
    const dailyCost = dailyKwh * p;

    return {
      dailyKwh,
      dailyCost,
      monthlyCost: dailyCost * 30,
      annualCost: dailyCost * 365,
    };
  }, [wattage, hoursPerDay, price]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Appliance Wattage"
          type="number"
          value={wattage}
          onChange={(e) => setWattage(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
        />
        <TextField
          label="Hours Used Per Day"
          type="number"
          value={hoursPerDay}
          onChange={(e) => setHoursPerDay(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">hours</InputAdornment> } }}
        />
        <TextField
          label="Electricity Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Daily Cost</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.dailyCost)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Daily Energy Use</Typography>
          <Typography fontWeight={600}>{result.dailyKwh.toFixed(3)} kWh</Typography>
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
  );
};

const KwhCostCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the kWh Cost Calculator Work?</Typography>
      <Typography variant="body1">
        Enter an appliance&apos;s wattage, how many hours a day you run it, and your electricity price
        per kilowatt-hour. The calculator converts watts to kilowatts, multiplies by hours used to get
        daily energy consumption in kWh, and multiplies that by your electricity price to get the daily
        cost. It then scales that daily cost up to monthly (×30) and annual (×365) figures.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1,500W space heater run for 2 hours a day uses 3 kWh daily. At $0.15 per kWh, that costs $0.45
        a day, about $13.50 a month, and roughly $164.25 a year — just from that one appliance.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding out which appliance is driving up an electricity bill.</li>
          <li>Deciding whether a more energy-efficient replacement appliance is worth the upfront cost.</li>
          <li>Estimating the added cost of running a space heater, AC unit, or pool pump.</li>
          <li>Budgeting electricity costs for a home office setup or server/gaming PC.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where do I find an appliance&apos;s wattage?</Typography>
      <Typography variant="body1">
        Check the label or nameplate on the appliance itself, its manual, or the manufacturer&apos;s
        spec sheet — it&apos;s usually listed in watts (W). If only amps and voltage are given, wattage
        equals amps × voltage.
      </Typography>
      <Typography variant="h3">Does this account for standby power when the appliance is off?</Typography>
      <Typography variant="body1">
        No — this calculator only estimates active-use cost based on the hours you specify. Many
        electronics draw a small amount of standby (&quot;phantom&quot;) power even when off or idle,
        which isn&apos;t included here.
      </Typography>
      <Typography variant="h3">Where do I find my electricity price per kWh?</Typography>
      <Typography variant="body1">
        Check a recent utility bill — it&apos;s usually listed as a per-kWh rate, sometimes broken into
        tiers or time-of-use periods. Use your average or peak rate depending on when the appliance
        typically runs.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/kwh-cost-calculator" content={content}>
      <KwhCostCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default KwhCostCalculator;
