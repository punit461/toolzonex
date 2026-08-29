'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const monthlyPayment = (principal: number, annualRate: number, years: number) => {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (n <= 0) return 0;
  return r > 0 ? (principal * r) / (1 - Math.pow(1 + r, -n)) : principal / n;
};

const RefinanceCalculator = () => {
  const [currentBalance, setCurrentBalance] = useState('300000');
  const [currentRate, setCurrentRate] = useState('7');
  const [currentRemainingTerm, setCurrentRemainingTerm] = useState('25');
  const [newRate, setNewRate] = useState('5.5');
  const [newTerm, setNewTerm] = useState('25');
  const [closingCosts, setClosingCosts] = useState('4000');

  const result = useMemo(() => {
    const balance = parseFloat(currentBalance) || 0;
    const oldRate = parseFloat(currentRate) || 0;
    const oldTerm = parseFloat(currentRemainingTerm) || 0;
    const rate = parseFloat(newRate) || 0;
    const term = parseFloat(newTerm) || 0;
    const costs = parseFloat(closingCosts) || 0;

    const oldPayment = monthlyPayment(balance, oldRate, oldTerm);
    const newPayment = monthlyPayment(balance, rate, term);
    const monthlySavings = oldPayment - newPayment;

    const oldTotalInterest = oldPayment * oldTerm * 12 - balance;
    const newTotalInterest = newPayment * term * 12 - balance;
    const totalInterestSavings = oldTotalInterest - newTotalInterest;

    const breakEvenMonths = monthlySavings > 0 ? costs / monthlySavings : null;

    return { oldPayment, newPayment, monthlySavings, totalInterestSavings, breakEvenMonths };
  }, [currentBalance, currentRate, currentRemainingTerm, newRate, newTerm, closingCosts]);

  const content = (
    <>
      <Typography variant="h2">How the Refinance Calculator Works</Typography>
      <Typography variant="body1">
        Enter your current loan balance, rate, and remaining term alongside the new rate, new term, and
        estimated closing costs for the refinance. The calculator computes the monthly payment on both
        loans, the monthly and lifetime interest savings from switching, and the break-even period —
        how many months of savings it takes to recoup the closing costs — so you can judge whether
        refinancing is worth it given how long you plan to keep the loan.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Monthly Payment = P × r / [1 − (1 + r)⁻ⁿ]
        <br />
        Break-Even (months) = Closing Costs / Monthly Savings
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $300,000 balance at 7% with 25 years remaining currently costs about $2,121/month. Refinancing
        into a 5.5% rate over 25 years drops the payment to about $1,842/month — a savings of roughly
        $279/month. With $4,000 in closing costs, the break-even point is about 14 months: after that,
        every month you keep the loan is pure savings.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether a lower refinance rate is worth the closing costs.</li>
          <li>Comparing how a shorter or longer new term changes monthly payment and total interest.</li>
          <li>Estimating how many months you need to stay in the home to break even.</li>
          <li>Weighing lifetime interest savings against near-term cash flow needs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if the new payment is higher than the old one?</Typography>
      <Typography variant="body1">
        If monthly savings are zero or negative, there&apos;s no break-even point to recoup closing
        costs from lower payments — refinancing would only make sense for other reasons, like switching
        from an adjustable to a fixed rate, or cashing out equity.
      </Typography>
      <Typography variant="h3">Should I judge a refinance only by monthly savings?</Typography>
      <Typography variant="body1">
        No — also compare total interest paid over the full loan life. Extending the term can lower your
        monthly payment while actually increasing total interest paid, even at a lower rate, so check
        both figures before deciding.
      </Typography>
      <Typography variant="h3">How long should I plan to stay in the loan to make refinancing worth it?</Typography>
      <Typography variant="body1">
        A common rule of thumb is to only refinance if you plan to keep the loan well beyond the
        break-even period shown here. If you might sell or pay off the loan sooner than that, the
        closing costs may not be fully recovered.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/refinance-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">Current Loan</Typography>
          <TextField
            label="Current Loan Balance"
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Current Rate"
              type="number"
              value={currentRate}
              onChange={(e) => setCurrentRate(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <TextField
              label="Remaining Term"
              type="number"
              value={currentRemainingTerm}
              onChange={(e) => setCurrentRemainingTerm(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">yrs</InputAdornment> } }}
            />
          </Box>

          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>New Loan</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="New Rate"
              type="number"
              value={newRate}
              onChange={(e) => setNewRate(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
            <TextField
              label="New Term"
              type="number"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
              fullWidth
              slotProps={{ input: { endAdornment: <InputAdornment position="end">yrs</InputAdornment> } }}
            />
          </Box>
          <TextField
            label="Refinance Closing Costs"
            type="number"
            value={closingCosts}
            onChange={(e) => setClosingCosts(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Monthly Payment Savings</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(result.monthlySavings)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>New Monthly Payment</Typography>
            <Typography fontWeight={600}>{fmt(result.newPayment)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Current Monthly Payment</Typography>
            <Typography fontWeight={600}>{fmt(result.oldPayment)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Interest Savings</Typography>
            <Typography fontWeight={600} color={result.totalInterestSavings >= 0 ? 'success.main' : 'error.main'}>
              {fmt(result.totalInterestSavings)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Break-Even Period</Typography>
            <Typography fontWeight={600}>
              {result.breakEvenMonths !== null ? `${result.breakEvenMonths.toFixed(1)} months` : 'No savings'}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RefinanceCalculator;
