'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const BalloonPaymentCalculatorContent = () => {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [rate, setRate] = useState('6.5');
  const [amortTerm, setAmortTerm] = useState('30');
  const [balloonYears, setBalloonYears] = useState('7');

  const result = useMemo(() => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(rate) || 0;
    const n = (parseFloat(amortTerm) || 0) * 12;
    const k = (parseFloat(balloonYears) || 0) * 12;
    const r = annualRate / 100 / 12;

    if (P <= 0 || n <= 0 || r <= 0 || k <= 0 || k > n) {
      return { monthlyPayment: 0, balloonPayment: 0, totalPaidBeforeBalloon: 0 };
    }

    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const balloonPayment = P * Math.pow(1 + r, k) - monthlyPayment * ((Math.pow(1 + r, k) - 1) / r);
    const totalPaidBeforeBalloon = monthlyPayment * k;

    return { monthlyPayment, balloonPayment: Math.max(0, balloonPayment), totalPaidBeforeBalloon };
  }, [loanAmount, rate, amortTerm, balloonYears]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Loan Amount"
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Annual Interest Rate"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <TextField
          label="Full Amortization Term"
          type="number"
          value={amortTerm}
          onChange={(e) => setAmortTerm(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="The term the monthly payment is calculated over"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }}
        />
        <TextField
          label="Balloon Due Date"
          type="number"
          value={balloonYears}
          onChange={(e) => setBalloonYears(e.target.value)}
          onFocus={(e) => e.target.select()}
          fullWidth
          helperText="Years until the remaining balance is due in full"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Balloon Payment Due</Typography>
          <Typography variant="h3" fontWeight="bold">{money(result.balloonPayment)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Regular Monthly Payment</Typography>
          <Typography fontWeight={600}>{money(result.monthlyPayment)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Paid Before Balloon</Typography>
          <Typography fontWeight={600}>{money(result.totalPaidBeforeBalloon)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const BalloonPaymentCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Balloon Payment Calculator Works</Typography>
      <Typography variant="body1">
        A balloon loan calculates monthly payments as if the loan will fully amortize over a long term (like
        30 years), but requires the entire remaining balance to be paid off in a single lump sum much sooner
        (like 7 years). Enter the loan amount, annual interest rate, the full amortization term used to
        calculate the monthly payment, and the earlier balloon due date, and this calculator finds the monthly
        payment and the remaining balance due at the balloon date.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Monthly Payment = P × r(1+r)ⁿ ÷ ((1+r)ⁿ − 1)
      </Box>
      <Typography variant="body1">
        where P is the loan amount, r is the monthly interest rate, and n is the number of payments over the
        full amortization term. The balloon payment is the remaining loan balance after k payments (where k is
        the balloon term in months), found by projecting the loan balance forward using the same monthly
        payment.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $300,000 loan at 6.5% annual interest, amortized over 30 years but with a 7-year balloon, has a
        monthly payment of about $1,896. After 7 years (84 payments) of paying down that loan, the remaining
        balloon payment due is roughly $271,000 — most of the original balance, since amortization is slow in
        the early years of a long-term loan.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Evaluating a commercial mortgage or business loan with a balloon structure.</li>
          <li>Planning ahead for refinancing or a sale before the balloon payment comes due.</li>
          <li>Comparing a balloon loan&apos;s lower monthly payments against its lump-sum risk.</li>
          <li>Understanding how much equity or savings you&apos;ll need by the balloon date.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why would anyone take a loan with a balloon payment?</Typography>
      <Typography variant="body1">
        Balloon loans often have lower monthly payments than a fully amortizing loan of the same shorter term,
        since payments are calculated as if spread over a much longer period. Borrowers who expect to sell,
        refinance, or come into a lump sum of cash before the balloon date sometimes use this structure to
        reduce payments in the meantime.
      </Typography>
      <Typography variant="h3">What happens if I can&apos;t pay the balloon payment?</Typography>
      <Typography variant="body1">
        You&apos;d typically need to refinance the remaining balance into a new loan, sell the underlying
        asset, or pay it off from savings. Failing to do any of these by the due date can put you in default,
        so it&apos;s important to plan for the balloon payment well in advance.
      </Typography>
      <Typography variant="h3">Why is the balloon payment so much higher than the loan amount decreased?</Typography>
      <Typography variant="body1">
        Amortizing loans pay mostly interest in the early years and increasingly more principal later on, so a
        loan calculated over a long term (like 30 years) still has most of its original balance remaining
        after just a few years of payments — which is exactly what makes the balloon payment so large.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/balloon-payment-calculator" content={content}>
      <BalloonPaymentCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BalloonPaymentCalculator;
