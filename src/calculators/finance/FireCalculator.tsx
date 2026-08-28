'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, LinearProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

const FireCalculator = () => {
  const [expenses, setExpenses] = useState('40000');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlySavings, setMonthlySavings] = useState('1500');
  const [returnRate, setReturnRate] = useState('7');

  const result = useMemo(() => {
    const annualExpenses = parseFloat(expenses) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlySavings) || 0;
    const r = (parseFloat(returnRate) || 0) / 100;

    const fireNumber = annualExpenses * 25;
    const monthlyRate = r / 12;
    const annualReturn = monthly * 12;

    let balance = savings;
    let yearsToFire = 0;
    const projections: { year: number; balance: number; progress: number }[] = [];

    if (fireNumber <= savings) {
      yearsToFire = 0;
    } else if (monthly === 0 && r === 0) {
      yearsToFire = Infinity;
    } else {
      for (let y = 1; y <= 100; y++) {
        for (let m = 0; m < 12; m++) {
          balance = balance * (1 + monthlyRate) + monthly;
        }
        projections.push({ year: y, balance: Math.round(balance), progress: Math.min((balance / fireNumber) * 100, 100) });
        if (balance >= fireNumber && yearsToFire === 0) {
          yearsToFire = y;
        }
      }
    }

    const progress = fireNumber > 0 ? Math.min((savings / fireNumber) * 100, 100) : 0;

    return { fireNumber, yearsToFire, balance: Math.round(balance), progress, projections: projections.slice(0, 30) };
  }, [expenses, currentSavings, monthlySavings, returnRate]);

  const content = (
    <>
      <Typography variant="h2">How Does the FIRE Calculator Work?</Typography>
      <Typography variant="body1">
        FIRE (Financial Independence, Retire Early) calculates how long it will take to reach financial independence based on the 4% rule. Your FIRE number is 25 times your annual expenses — the amount you need invested to safely withdraw 4% per year indefinitely.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        FIRE Number = Annual Expenses × 25
        <br />
        Uses compound growth with monthly contributions
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With $40,000 in annual expenses, your FIRE number is $1,000,000. If you have $50,000 saved and add $1,500/month at 7% returns, you'll reach FIRE in approximately 20 years.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning an early retirement timeline.</li>
          <li>Understanding how savings rate impacts your path to financial independence.</li>
          <li>Setting concrete financial goals with measurable milestones.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the 4% rule?</Typography>
      <Typography variant="body1">
        The 4% rule suggests you can safely withdraw 4% of your portfolio annually in retirement without running out of money over a 30-year period. Multiply annual expenses by 25 to get your target.
      </Typography>
      <Typography variant="h3">Is FIRE realistic for everyone?</Typography>
      <Typography variant="body1">
        FIRE requires a high savings rate. The higher your savings rate relative to expenses, the faster you'll reach independence. Adjusting expenses downward is often the most powerful lever.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/fire-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Annual Expenses" type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Current Savings" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Monthly Savings" type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Expected Annual Return" type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">FIRE Number</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.fireNumber)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Years to FIRE</Typography>
            <Typography fontWeight={600}>{result.yearsToFire === Infinity ? 'Never' : result.yearsToFire === 0 ? 'Already there!' : `~${result.yearsToFire} years`}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Current Progress</Typography>
              <Typography variant="body2" fontWeight={600}>{result.progress.toFixed(1)}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={result.progress} sx={{ height: 10, borderRadius: 5 }} />
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Current Savings</Typography>
            <Typography fontWeight={600}>{fmt(parseFloat(currentSavings) || 0)}</Typography>
          </Paper>
        </Box>
      </Box>

      {result.projections.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" fontWeight={600} mb={1}>Yearly Projection</Typography>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {result.projections.map((p) => (
              <Box key={p.year} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 0.5 }}>
                <Typography variant="body2" sx={{ minWidth: 50 }}>Yr {p.year}</Typography>
                <LinearProgress variant="determinate" value={p.progress} sx={{ flex: 1, height: 8, borderRadius: 4 }} />
                <Typography variant="body2" sx={{ minWidth: 100, textAlign: 'right' }}>{fmt(p.balance)}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default FireCalculator;
