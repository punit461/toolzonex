'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function monthlyPayment(principal: number, monthlyRate: number, months: number): number {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

function simulate(principal: number, monthlyRate: number, payment: number, cap = 1200) {
  let balance = principal;
  let months = 0;
  let totalInterest = 0;
  while (balance > 0.01 && months < cap) {
    months++;
    const interest = balance * monthlyRate;
    totalInterest += interest;
    let principalPortion = payment - interest;
    if (principalPortion <= 0) {
      // Payment doesn't even cover interest — loan never pays off.
      return { months: Infinity, totalInterest: Infinity };
    }
    if (principalPortion > balance) principalPortion = balance;
    balance -= principalPortion;
  }
  return { months, totalInterest };
}

const ExtraPaymentSavingsCalculator = () => {
  const [principal, setPrincipal] = useState('20000');
  const [rate, setRate] = useState('6');
  const [termMonths, setTermMonths] = useState('60');
  const [extra, setExtra] = useState('100');

  const result = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = parseFloat(termMonths) || 0;
    const ex = parseFloat(extra) || 0;

    const basePayment = monthlyPayment(p, r, n);
    const baseline = simulate(p, r, basePayment);
    const withExtra = simulate(p, r, basePayment + ex);

    const monthsSaved = baseline.months - withExtra.months;
    const interestSaved = baseline.totalInterest - withExtra.totalInterest;

    return { basePayment, baseline, withExtra, monthsSaved, interestSaved };
  }, [principal, rate, termMonths, extra]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Extra Payment Savings Calculator</Typography>
      <Typography variant="body1">
        Enter your loan principal, annual interest rate, and term, plus an extra amount you plan to add to
        every monthly payment. The calculator simulates the loan month by month twice: once with only the
        standard payment, and once adding your extra amount to principal every single month. Because the
        extra amount reduces the balance faster, less interest accrues each month, which shortens the payoff
        time and reduces total interest paid.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Standard Payment = P × r / [1 − (1+r)⁻ⁿ]
        <br />
        Each month: Interest = Balance × r; Principal Paid = Payment (+ Extra) − Interest
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $20,000 loan at 6% over 60 months has a standard payment of about {money(result.basePayment)}/month,
        paying off in {Number.isFinite(result.baseline.months) ? result.baseline.months : '—'} months with
        about {Number.isFinite(result.baseline.totalInterest) ? money(result.baseline.totalInterest) : '—'} in
        total interest. Adding $100 extra every month instead pays it off in{' '}
        {Number.isFinite(result.withExtra.months) ? result.withExtra.months : '—'} months, saving roughly{' '}
        {Number.isFinite(result.interestSaved) ? money(result.interestSaved) : '—'} in interest.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether to commit to a recurring extra monthly payment on a car, personal, or student loan.</li>
          <li>Seeing exactly how many months sooner a loan is paid off with a modest recurring extra amount.</li>
          <li>Comparing different extra-payment amounts to find one that fits your budget while still meaningfully cutting interest.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Mortgage Recast Calculator?</strong> Mortgage recasting is a ONE-TIME lump-sum payment that lowers your monthly PAYMENT while keeping the original term the same. This tool instead models a RECURRING extra amount added every month on top of your existing payment — the payment stays higher than the minimum, but the loan pays off FASTER and saves interest, rather than lowering the payment.</li>
          <li><strong>How is this different from the Debt Payoff Calculator?</strong> The Debt Payoff Calculator handles MULTIPLE debts at once using Snowball or Avalanche strategies to decide which debt gets extra payments first. This tool is for a SINGLE loan only, showing the direct effect of adding one extra amount to that one loan's payment every month.</li>
          <li><strong>Does the extra payment need to stay the same every month?</strong> This calculator assumes a fixed extra amount every month for simplicity. In reality, even irregular extra payments will still shorten your payoff time and save interest — just re-run the calculator with an average extra amount for a rough estimate.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/extra-payment-savings-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Loan Principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Annual Interest Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Loan Term" type="number" value={termMonths} onChange={(e) => setTermMonths(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">months</InputAdornment> } }}
          />
          <TextField
            label="Extra Monthly Payment" type="number" value={extra} onChange={(e) => setExtra(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Interest Saved</Typography>
            <Typography variant="h3" fontWeight="bold">
              {Number.isFinite(result.interestSaved) ? money(result.interestSaved) : '—'}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Time Saved</Typography>
            <Typography fontWeight={600}>
              {Number.isFinite(result.monthsSaved) ? `${result.monthsSaved} months` : '—'}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Baseline Payoff</Typography>
            <Typography fontWeight={600}>
              {Number.isFinite(result.baseline.months) ? `${result.baseline.months} months` : '—'}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>New Payoff With Extra</Typography>
            <Typography fontWeight={600}>
              {Number.isFinite(result.withExtra.months) ? `${result.withExtra.months} months` : '—'}
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExtraPaymentSavingsCalculator;
