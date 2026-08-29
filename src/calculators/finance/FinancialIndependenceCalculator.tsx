'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const FinancialIndependenceCalculator = () => {
  const [annualExpenses, setAnnualExpenses] = useState('40000');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('1500');
  const [expectedReturn, setExpectedReturn] = useState('7');

  const { fiNumber, yearsToFI } = useMemo(() => {
    const expenses = parseFloat(annualExpenses) || 0;
    const rate = parseFloat(withdrawalRate) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const contribution = parseFloat(monthlyContribution) || 0;
    const returnRate = (parseFloat(expectedReturn) || 0) / 100 / 12;

    const target = rate > 0 ? expenses / (rate / 100) : 0;

    let years: number | null = null;
    if (target > 0) {
      if (savings >= target) {
        years = 0;
      } else if (contribution <= 0 && returnRate <= 0) {
        years = null;
      } else {
        let balance = savings;
        let months = 0;
        const maxMonths = 1200;
        while (balance < target && months < maxMonths) {
          balance = balance * (1 + returnRate) + contribution;
          months++;
        }
        years = months < maxMonths ? months / 12 : null;
      }
    }

    return { fiNumber: target, yearsToFI: years };
  }, [annualExpenses, withdrawalRate, currentSavings, monthlyContribution, expectedReturn]);

  const content = (
    <>
      <Typography variant="h2">How Your Financial Independence Number Is Calculated</Typography>
      <Typography variant="body1">
        Your FI number is the portfolio size needed to sustainably cover your annual expenses using a
        safe withdrawal rate, commonly set at 4% based on historical market research. Dividing annual
        expenses by the withdrawal rate gives the target portfolio. From there, the calculator projects
        how many years of saving and compounding it will take to reach that number, given your current
        savings, monthly contributions, and expected investment return.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        FI Number = Annual Expenses / Safe Withdrawal Rate
        <br />
        (e.g. Annual Expenses / 0.04 = 25 × Annual Expenses)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With $40,000 in annual expenses and a 4% withdrawal rate, the FI number is $1,000,000 — 25 times
        annual expenses. Starting from $50,000 in savings, contributing $1,500 a month, and earning a 7%
        average annual return, it would take roughly 21 years to reach that $1,000,000 target.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a concrete savings target for early retirement or financial independence.</li>
          <li>Estimating how many years of saving remain until reaching that target.</li>
          <li>Testing how a higher monthly contribution shortens the timeline.</li>
          <li>Comparing FI numbers under different safe withdrawal rate assumptions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is 4% the default withdrawal rate?</Typography>
      <Typography variant="body1">
        The 4% rule comes from historical research (the Trinity study) suggesting a diversified
        portfolio could sustain a 4% inflation-adjusted annual withdrawal over a 30-year retirement with
        a low risk of running out of money. It&apos;s a widely used starting point, not a guarantee.
      </Typography>
      <Typography variant="h3">Should I use a lower withdrawal rate for a longer retirement?</Typography>
      <Typography variant="body1">
        Many people planning an early retirement of 40+ years use a more conservative rate, like 3-3.5%,
        which raises the FI number but reduces the risk of depleting savings over a longer time horizon.
      </Typography>
      <Typography variant="h3">Does this account for inflation?</Typography>
      <Typography variant="body1">
        The expected return you enter should ideally be a real (inflation-adjusted) return if you want
        the years-to-FI estimate to reflect purchasing power accurately. Using a nominal return without
        adjusting for inflation will understate how long it actually takes in real terms.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/financial-independence-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Annual Expenses"
            type="number"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Safe Withdrawal Rate"
            type="number"
            value={withdrawalRate}
            onChange={(e) => setWithdrawalRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Current Savings (optional)"
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Monthly Contribution (optional)"
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Expected Annual Return (optional)"
            type="number"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Financial Independence Number</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(fiNumber)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Estimated Years to FI</Typography>
            <Typography fontWeight={600}>
              {yearsToFI === null ? '100+ years' : yearsToFI === 0 ? 'Already there!' : `${yearsToFI.toFixed(1)} years`}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FinancialIndependenceCalculator;
