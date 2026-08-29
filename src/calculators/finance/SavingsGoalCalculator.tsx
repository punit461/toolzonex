'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const SavingsGoalCalculator = () => {
  const [goalAmount, setGoalAmount] = useState('20000');
  const [currentSavings, setCurrentSavings] = useState('2000');
  const [months, setMonths] = useState('24');
  const [annualReturn, setAnnualReturn] = useState('4');

  const { requiredMonthly, totalContributions, totalGrowth } = useMemo(() => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const n = parseFloat(months) || 0;
    const r = (parseFloat(annualReturn) || 0) / 100 / 12;

    if (n <= 0) return { requiredMonthly: 0, totalContributions: 0, totalGrowth: 0 };

    const futureValueOfCurrent = current * Math.pow(1 + r, n);
    const remaining = goal - futureValueOfCurrent;

    let monthly = 0;
    if (remaining > 0) {
      if (r > 0) {
        monthly = remaining / ((Math.pow(1 + r, n) - 1) / r);
      } else {
        monthly = remaining / n;
      }
    }

    const contributions = monthly * n;
    const growth = goal - current - contributions;

    return { requiredMonthly: Math.max(0, monthly), totalContributions: contributions, totalGrowth: growth };
  }, [goalAmount, currentSavings, months, annualReturn]);

  const content = (
    <>
      <Typography variant="h2">How the Required Monthly Contribution Is Calculated</Typography>
      <Typography variant="body1">
        Enter your savings goal, what you&apos;ve already saved, the time you have to reach the goal,
        and an expected annual return (use 0% for a simple cash savings plan with no growth). The
        calculator projects your current savings forward with compounding, finds the remaining gap to
        your goal, and solves for the fixed monthly contribution needed to close that gap by your
        deadline.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Required Monthly = (Goal − Current Savings × (1+r)ⁿ) / [((1+r)ⁿ − 1) / r]
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Saving toward a $20,000 goal with $2,000 already saved, over 24 months, at a 4% expected annual
        return, requires contributing roughly $726 per month. Without any investment growth (0% return),
        the same goal would require about $750 per month — growth does some of the work for you.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning monthly savings for a house down payment, wedding, or vacation.</li>
          <li>Setting an emergency fund target and the monthly amount to build it.</li>
          <li>Checking how a higher expected return reduces the required monthly contribution.</li>
          <li>Adjusting a timeline to make a goal&apos;s monthly requirement more affordable.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if I set the expected return to 0%?</Typography>
      <Typography variant="body1">
        With 0% return, the calculator simply divides the remaining gap to your goal evenly across the
        months remaining — appropriate for cash savings goals where you don&apos;t expect meaningful
        investment growth over the timeframe.
      </Typography>
      <Typography variant="h3">Should I use a conservative or optimistic return rate?</Typography>
      <Typography variant="body1">
        For shorter-term goals (under 3-5 years), a conservative rate — or 0% — is safer, since
        market volatility could leave you short if you assume high growth. For longer-term goals,
        a moderate long-term average return may be reasonable.
      </Typography>
      <Typography variant="h3">What if the required monthly contribution is negative or zero?</Typography>
      <Typography variant="body1">
        That means your current savings, projected forward with the expected return, are already
        enough to reach the goal without any further contributions — the calculator shows $0 as the
        required monthly amount in that case.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/savings-goal-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Savings Goal Amount"
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Current Savings"
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Months to Reach Goal"
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            fullWidth
          />
          <TextField
            label="Expected Annual Return (optional)"
            type="number"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            fullWidth
            helperText="Use 0 for a simple cash savings plan with no growth."
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Required Monthly Contribution</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(requiredMonthly)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Contributions</Typography>
            <Typography fontWeight={600}>{fmt(totalContributions)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Investment Growth</Typography>
            <Typography fontWeight={600} color="success.main">{fmt(Math.max(0, totalGrowth))}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SavingsGoalCalculator;
