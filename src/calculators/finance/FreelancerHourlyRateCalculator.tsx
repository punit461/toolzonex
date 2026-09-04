'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const FreelancerHourlyRateCalculatorContent = () => {
  const [income, setIncome] = useState('80000');
  const [hoursPerWeek, setHoursPerWeek] = useState('25');
  const [weeksPerYear, setWeeksPerYear] = useState('48');
  const [expenses, setExpenses] = useState('6000');
  const [bufferPercent, setBufferPercent] = useState('20');

  const result = useMemo(() => {
    const inc = parseFloat(income) || 0;
    const hrs = parseFloat(hoursPerWeek) || 0;
    const weeks = parseFloat(weeksPerYear) || 0;
    const exp = parseFloat(expenses) || 0;
    const buffer = parseFloat(bufferPercent) || 0;

    const totalBillableHours = hrs * weeks;
    if (totalBillableHours <= 0) return null;

    const targetRevenue = inc + exp;
    const baseRate = targetRevenue / totalBillableHours;
    const finalRate = baseRate * (1 + buffer / 100);

    return { totalBillableHours, targetRevenue, baseRate, finalRate };
  }, [income, hoursPerWeek, weeksPerYear, expenses, bufferPercent]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Desired Annual Income"
          type="number"
          fullWidth
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Billable Hours per Week"
          type="number"
          fullWidth
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
        />
        <TextField
          label="Weeks Worked per Year"
          type="number"
          fullWidth
          value={weeksPerYear}
          onChange={(e) => setWeeksPerYear(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="52 minus vacation, holidays, and time off"
        />
        <TextField
          label="Annual Business Expenses"
          type="number"
          fullWidth
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Equipment, software, insurance, etc."
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Buffer for Non-Billable Time"
          type="number"
          fullWidth
          value={bufferPercent}
          onChange={(e) => setBufferPercent(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Admin, marketing, and sick days on top of billable hours"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Hourly Rate to Charge</Typography>
              <Typography variant="h2" fontWeight={800} color="primary.main">{money(result.finalRate)}/hr</Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Base rate (before buffer): {money(result.baseRate)}/hr
                <br />
                Target revenue: {money(result.targetRevenue)} over {result.totalBillableHours.toFixed(0)} billable hours/year
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter positive hours and weeks to calculate</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const FreelancerHourlyRateCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Calculate Your Freelance Hourly Rate</Typography>
      <Typography variant="body1">
        Start with your desired annual income and add your annual business expenses (equipment, software,
        insurance, and other costs of running your freelance business) to find your target revenue. Dividing
        that by your total billable hours per year (billable hours per week × weeks worked per year) gives a
        base hourly rate. Finally, a buffer percentage is added on top to cover time you can&apos;t bill for —
        admin work, marketing, proposals, and sick days — since your billable hours are only part of your
        total working time.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Base Rate = (Income + Expenses) ÷ (Billable Hours/Week × Weeks/Year)
        <br />
        Rate to Charge = Base Rate × (1 + Buffer%)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For an $80,000 target income, $6,000 in annual expenses, 25 billable hours/week over 48 weeks/year
        (1,200 billable hours), the base rate is ($80,000 + $6,000) ÷ 1,200 ≈ $71.67/hr. With a 20% buffer for
        non-billable time, the recommended rate to charge is about $86/hr.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting an hourly rate when starting out as a freelancer or independent contractor.</li>
          <li>Re-evaluating your rate after expenses or income goals change.</li>
          <li>Comparing what rate is needed to match a previous salaried income.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why isn&apos;t billable hours the same as total working hours?</Typography>
      <Typography variant="body1">
        Most freelancers spend a meaningful chunk of their working time on tasks they can&apos;t directly bill
        a client for — finding new clients, sending invoices, bookkeeping, and general admin. The buffer
        percentage accounts for this so your billable hours still cover your full income goal.
      </Typography>
      <Typography variant="h3">Does this include taxes?</Typography>
      <Typography variant="body1">
        No — this calculates the rate needed to hit your target take-home income after business expenses, but
        before personal and self-employment taxes. Freelancers typically need to set aside a portion of income
        separately for taxes; see our Self-Employment Tax Calculator for that estimate.
      </Typography>
      <Typography variant="h3">What buffer percentage should I use?</Typography>
      <Typography variant="body1">
        20% is a common starting point, but it varies by how much non-billable work your business requires.
        Freelancers who spend a lot of time on marketing or client acquisition may want a higher buffer, while
        those with steady repeat clients may need less.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/freelancer-hourly-rate-calculator" content={content}>
      <FreelancerHourlyRateCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FreelancerHourlyRateCalculator;
