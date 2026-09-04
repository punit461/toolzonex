'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const DoubleTimePayCalculator = () => {
  const [rate, setRate] = useState('20');
  const [totalHours, setTotalHours] = useState('13');

  const result = useMemo(() => {
    const r = parseFloat(rate) || 0;
    const h = Math.max(0, parseFloat(totalHours) || 0);

    const regularHours = Math.min(h, 8);
    const overtimeHours = Math.min(Math.max(h - 8, 0), 4);
    const doubleHours = Math.max(h - 12, 0);

    const regularPay = regularHours * r;
    const overtimePay = overtimeHours * r * 1.5;
    const doublePay = doubleHours * r * 2;
    const totalPay = regularPay + overtimePay + doublePay;

    return { regularHours, overtimeHours, doubleHours, regularPay, overtimePay, doublePay, totalPay };
  }, [rate, totalHours]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Double Time Pay Calculator</Typography>
      <Typography variant="body1">
        Enter your hourly rate and the total hours worked in a single day. This calculator automatically
        splits your hours across three tiers modeled on California&apos;s well-known daily overtime structure:
        the first 8 hours pay your regular rate (1×), hours 8 through 12 pay time-and-a-half (1.5×), and any
        hours beyond 12 pay double time (2×). Each tier&apos;s pay is calculated separately and summed into a
        total for the day.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Hours 0–8: Regular Rate (1×)
        <br />
        Hours 8–12: 1.5× Rate
        <br />
        Hours 12+: 2× Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At a $20/hr rate working 13 hours in one day: the first 8 hours pay $160 at regular rate, the next 4
        hours (hours 8-12) pay $120 at 1.5×, and the final 1 hour beyond 12 pays $40 at double time — for a
        total of $320 for the day.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Calculating pay for a long single-day shift under California-style daily overtime rules.</li>
          <li>Checking a paycheck that includes both time-and-a-half and double-time tiers in one day.</li>
          <li>Estimating labor costs before scheduling extended shifts in jurisdictions with daily overtime thresholds.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Overtime Pay Calculator?</strong> The Overtime Pay Calculator applies ONE flat, user-chosen overtime multiplier uniformly to all overtime hours you enter — you decide the split and the multiplier yourself. This tool instead implements the specific TIERED daily-threshold structure (regular → 1.5× → 2×) used in double-time jurisdictions, automatically calculating each tier from the total hours worked in a single day rather than requiring you to split them manually.</li>
          <li><strong>Does every state use this 8/12-hour tiered structure?</strong> No — this structure mirrors California's daily overtime law specifically. Most other US states only require overtime after 40 hours in a week, with no separate daily double-time tier. Check your local labor law to confirm which structure applies to you.</li>
          <li><strong>Does this calculator also apply weekly overtime rules?</strong> No — this calculates tiers based only on the single day's total hours entered. Weekly overtime thresholds (like the federal 40-hour rule) would need to be checked separately across your full week.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/double-time-pay-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Hourly Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Total Hours Worked (in one day)" type="number" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Pay for the Day</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.totalPay)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Regular (0–8 hrs, {result.regularHours.toFixed(1)} hrs)</Typography>
            <Typography fontWeight={600}>{money(result.regularPay)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>1.5× (8–12 hrs, {result.overtimeHours.toFixed(1)} hrs)</Typography>
            <Typography fontWeight={600}>{money(result.overtimePay)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>2× (12+ hrs, {result.doubleHours.toFixed(1)} hrs)</Typography>
            <Typography fontWeight={600}>{money(result.doublePay)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DoubleTimePayCalculator;
