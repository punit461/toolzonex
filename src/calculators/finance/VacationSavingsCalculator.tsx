'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const VacationSavingsCalculator = () => {
  const [targetCost, setTargetCost] = useState('3000');
  const [monthsUntilTrip, setMonthsUntilTrip] = useState('10');
  const [currentSavings, setCurrentSavings] = useState('500');

  const result = useMemo(() => {
    const target = parseFloat(targetCost) || 0;
    const months = parseFloat(monthsUntilTrip) || 0;
    const current = parseFloat(currentSavings) || 0;

    const amountNeeded = Math.max(0, target - current);
    const monthlySavings = months > 0 ? amountNeeded / months : amountNeeded;
    const percentSaved = target > 0 ? Math.min(100, (current / target) * 100) : 0;

    return { amountNeeded, monthlySavings, percentSaved };
  }, [targetCost, monthsUntilTrip, currentSavings]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Your Required Monthly Vacation Savings</Typography>
      <Typography variant="body1">
        This calculator works backward from a savings goal: enter your target vacation cost — you can use an
        estimate from our Travel Budget Calculator, or any figure you already have — how many months you have
        until the trip, and how much you&apos;ve already saved toward it. It then tells you exactly how much
        to set aside each month to reach your goal in time.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Monthly Savings Needed = (Target Cost − Current Savings) ÷ Months Until Trip
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $3,000 trip planned for 10 months from now, with $500 already saved, leaves $2,500 still needed.
        Spread over 10 months, that&apos;s $250 per month to hit the goal right on time.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting up a recurring automatic transfer into a dedicated vacation savings account.</li>
          <li>Checking whether a trip is realistic on your current timeline and savings rate.</li>
          <li>Seeing how much sooner you could travel by increasing your monthly savings amount.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Travel Budget Calculator?</Typography>
      <Typography variant="body1">
        The Travel Budget Calculator estimates what a trip will cost in total, based on trip length and
        per-day spending. This calculator instead takes a target cost — however you arrived at it — and works
        out the monthly savings plan needed to afford it by a given date. Use the Travel Budget Calculator
        first to estimate your target cost, then use this one to plan how to save for it.
      </Typography>
      <Typography variant="h3">What if I can&apos;t save the required monthly amount?</Typography>
      <Typography variant="body1">
        Either push back the trip date to spread the same savings goal over more months, or reduce your target
        vacation cost by trimming the budget in a category like lodging or activities.
      </Typography>
      <Typography variant="h3">Should I account for price increases like inflation or flight costs rising?</Typography>
      <Typography variant="body1">
        This calculator uses a fixed target cost, so if you expect prices to rise before your trip, it&apos;s
        worth padding your target cost estimate by a small buffer (5-10%) rather than using today&apos;s exact
        prices.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/vacation-savings-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Target Vacation Cost"
            type="number"
            value={targetCost}
            onChange={(e) => setTargetCost(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Months Until Trip"
            type="number"
            value={monthsUntilTrip}
            onChange={(e) => setMonthsUntilTrip(e.target.value)}
            fullWidth
          />
          <TextField
            label="Current Savings Toward Trip"
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Required Monthly Savings</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.monthlySavings)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Amount Still Needed</Typography>
            <Typography fontWeight={600}>{money(result.amountNeeded)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Already Saved</Typography>
            <Typography fontWeight={600}>{result.percentSaved.toFixed(1)}% of goal</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VacationSavingsCalculator;
