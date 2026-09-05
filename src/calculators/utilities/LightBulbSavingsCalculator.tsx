'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const LightBulbSavingsCalculator = () => {
  const [incandescentWatts, setIncandescentWatts] = useState('60');
  const [ledWatts, setLedWatts] = useState('9');
  const [hoursPerDay, setHoursPerDay] = useState('5');
  const [rate, setRate] = useState('0.15');
  const [pricePremium, setPricePremium] = useState('4');

  const result = useMemo(() => {
    const incW = parseFloat(incandescentWatts) || 0;
    const ledW = parseFloat(ledWatts) || 0;
    const h = parseFloat(hoursPerDay) || 0;
    const r = parseFloat(rate) || 0;
    const premium = parseFloat(pricePremium) || 0;

    const wattDiff = Math.max(incW - ledW, 0);
    const dailySavings = (wattDiff / 1000) * h * r;
    const monthlySavings = dailySavings * 30;
    const annualSavings = dailySavings * 365;
    const paybackDays = dailySavings > 0 && premium > 0 ? premium / dailySavings : 0;

    return { dailySavings, monthlySavings, annualSavings, paybackDays };
  }, [incandescentWatts, ledWatts, hoursPerDay, rate, pricePremium]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Light Bulb Savings Calculator</Typography>
      <Typography variant="body1">
        Enter the wattage of an incandescent bulb and the wattage of its LED equivalent, how many hours per day
        it&apos;s used, and your electricity rate. The calculator finds the wattage difference between the two
        bulbs and converts that into daily, monthly, and annual cost savings from switching. If you enter the
        extra upfront cost of the LED bulb, it also estimates how many days of use it takes for the energy
        savings to pay back that price difference.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Daily Savings = ((Incandescent W − LED W) / 1000) × Hours Per Day × Electricity Rate
        <br />
        Payback Period (days) = LED Price Premium / Daily Savings
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 60W incandescent bulb replaced with a 9W LED equivalent, used 5 hours a day at $0.15/kWh, saves
        ((60-9)/1000) × 5 × 0.15 = $0.038 per day — about $1.15 a month or $13.95 a year. If the LED bulb cost
        $4 more upfront, it pays that back in 4 / 0.038 ≈ 105 days.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether switching a specific bulb to LED is worth the upfront cost.</li>
          <li>Estimating total household savings from replacing multiple incandescent bulbs with LEDs.</li>
          <li>Comparing payback periods across bulbs used for different amounts of time each day.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the LED Wattage Calculator?</strong> The LED Wattage Calculator sums total power draw across many LEDs or an entire LED strip, useful for power supply sizing. This tool instead compares the cost savings from switching a single bulb from incandescent to its LED equivalent, including an optional payback-period estimate.</li>
          <li><strong>Are LED bulbs really that much more efficient?</strong> Yes — LEDs typically use roughly 75-85% less energy than incandescent bulbs to produce the same amount of light, which is why even a small per-bulb wattage difference adds up to meaningful savings over months and years of use.</li>
          <li><strong>Does this account for LED bulb lifespan?</strong> No — this only calculates energy cost savings. LED bulbs also typically last many times longer than incandescent bulbs, which means additional savings from not having to buy and replace incandescent bulbs as often, on top of the energy savings shown here.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/light-bulb-savings-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Incandescent Bulb Wattage" type="number" value={incandescentWatts}
            onChange={(e) => setIncandescentWatts(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
          />
          <TextField
            label="Equivalent LED Bulb Wattage" type="number" value={ledWatts}
            onChange={(e) => setLedWatts(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">W</InputAdornment> } }}
          />
          <TextField
            label="Hours Used Per Day" type="number" value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
          <TextField
            label="Electricity Rate" type="number" value={rate}
            onChange={(e) => setRate(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment>, endAdornment: <InputAdornment position="end">/ kWh</InputAdornment> } }}
          />
          <TextField
            label="LED Price Premium (optional)" type="number" value={pricePremium}
            onChange={(e) => setPricePremium(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
            helperText="Extra upfront cost of the LED bulb vs the incandescent bulb, for payback-period calculation"
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Annual Savings</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.annualSavings)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily Savings</Typography>
            <Typography fontWeight={600}>{money(result.dailySavings)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Savings</Typography>
            <Typography fontWeight={600}>{money(result.monthlySavings)}</Typography>
          </Paper>
          {result.paybackDays > 0 && (
            <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Payback Period</Typography>
              <Typography fontWeight={600}>{Math.ceil(result.paybackDays)} days</Typography>
            </Paper>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LightBulbSavingsCalculator;
