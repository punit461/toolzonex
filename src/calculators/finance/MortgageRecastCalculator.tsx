'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

function monthlyPayment(principal: number, monthlyRate: number, months: number): number {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

const MortgageRecastCalculator = () => {
  const [balance, setBalance] = useState('300000');
  const [rate, setRate] = useState('6');
  const [remainingYears, setRemainingYears] = useState('25');
  const [lumpSum, setLumpSum] = useState('30000');

  const result = useMemo(() => {
    const bal = parseFloat(balance) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const months = (parseFloat(remainingYears) || 0) * 12;
    const lump = parseFloat(lumpSum) || 0;

    const oldPayment = monthlyPayment(bal, r, months);
    const newBalance = Math.max(bal - lump, 0);
    const newPayment = monthlyPayment(newBalance, r, months);
    const monthlySavings = oldPayment - newPayment;

    return { oldPayment, newBalance, newPayment, monthlySavings };
  }, [balance, rate, remainingYears, lumpSum]);

  const content = (
    <>
      <Typography variant="h2">How Mortgage Recasting Works</Typography>
      <Typography variant="body1">
        Recasting a mortgage means making a lump-sum payment toward your principal, then having your lender
        re-amortize the loan over the same remaining term at the same interest rate — resulting in a lower
        monthly payment. This is different from refinancing, which replaces the loan entirely and can involve a
        new rate, new term, and full underwriting. Recasting typically keeps your existing loan and rate intact,
        and usually comes with a small one-time lender fee (often a few hundred dollars) instead of full closing
        costs.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        New Balance = Current Balance − Lump Sum
        <br />
        New Payment = New Balance amortized at the same rate over the same remaining term
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $300,000 balance at 6% with 25 years remaining currently costs about {money(result.oldPayment)} a
        month. Applying a $30,000 lump sum drops the balance to {money(result.newBalance)}, which re-amortizes
        to about {money(result.newPayment)} a month at the same rate and term — a savings of roughly{' '}
        {money(result.monthlySavings)} every month going forward.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Lowering monthly payments after receiving a bonus, inheritance, or home sale proceeds.</li>
          <li>Reducing payments without the closing costs and paperwork of a full refinance.</li>
          <li>Keeping a favorable existing interest rate while still lowering monthly cash outflow.</li>
          <li>Deciding between recasting, refinancing, or simply making extra principal payments.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is recasting different from refinancing?</Typography>
      <Typography variant="body1">
        Refinancing replaces your loan with a brand-new one, which can change your rate and term and typically
        requires a credit check, appraisal, and full closing costs. Recasting keeps your original loan, rate,
        and term — it simply recalculates your payment based on a lower balance after a lump-sum payment,
        usually for a modest flat fee.
      </Typography>
      <Typography variant="h3">Does recasting shorten my loan term?</Typography>
      <Typography variant="body1">
        No — recasting keeps the same remaining term but lowers the monthly payment. If you want to pay off the
        loan faster while keeping the same payment, making extra principal payments without recasting (or
        refinancing to a shorter term) accomplishes that instead.
      </Typography>
      <Typography variant="h3">Is every mortgage eligible for recasting?</Typography>
      <Typography variant="body1">
        Not always — recasting availability and rules (minimum lump-sum amount, fees, eligible loan types)
        vary by lender and loan type. Government-backed loans like FHA or VA loans often don&apos;t allow
        recasting. Check with your loan servicer to confirm eligibility.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/mortgage-recast-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Current Mortgage Balance"
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Interest Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Remaining Term"
            type="number"
            value={remainingYears}
            onChange={(e) => setRemainingYears(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }}
          />
          <TextField
            label="Lump-Sum Extra Payment"
            type="number"
            value={lumpSum}
            onChange={(e) => setLumpSum(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">New Monthly Payment</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.newPayment)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Old Monthly Payment</Typography>
            <Typography fontWeight={600}>{money(result.oldPayment)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>New Balance After Lump Sum</Typography>
            <Typography fontWeight={600}>{money(result.newBalance)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Savings</Typography>
            <Typography fontWeight={600}>{money(result.monthlySavings)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MortgageRecastCalculator;
