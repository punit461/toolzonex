'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LoanInterestRateCalculatorContent = () => {
  const [principal, setPrincipal] = useState<string>('100000');
  const [emi, setEmi] = useState<string>('2500');
  const [tenureMonths, setTenureMonths] = useState<string>('60');

  const P = parseFloat(principal) || 0;
  const PMT = parseFloat(emi) || 0;
  const n = parseFloat(tenureMonths) || 0;

  const emiAt = (r: number, p: number, months: number) => {
    if (r === 0) return p / months;
    const growth = Math.pow(1 + r, months);
    return (p * r * growth) / (growth - 1);
  };

  let annualRate: number | null = null;
  let monthlyRate: number | null = null;
  let totalPayment = 0;
  let totalInterest = 0;
  let invalid = P <= 0 || PMT <= 0 || n <= 0;

  if (!invalid && PMT < P / n) {
    invalid = true;
  }

  if (!invalid) {
    let low = 0;
    let high = 0.00001;
    let iter = 0;
    while (emiAt(high, P, n) < PMT && iter < 60) {
      high *= 2;
      iter++;
    }
    if (emiAt(high, P, n) < PMT) {
      invalid = true;
    } else {
      const mid = (() => {
        let lo = low;
        let hi = high;
        for (let i = 0; i < 60; i++) {
          const m = (lo + hi) / 2;
          if (emiAt(m, P, n) < PMT) lo = m;
          else hi = m;
        }
        return (lo + hi) / 2;
      })();
      monthlyRate = mid;
      annualRate = mid * 12 * 100;
      totalPayment = PMT * n;
      totalInterest = totalPayment - P;
    }
  }

  const money = (v: number) => `$${v.toFixed(2)}`;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Loan Amount"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="EMI (Monthly Payment)"
          type="number"
          value={emi}
          onChange={(e) => setEmi(e.target.value)}
          fullWidth
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />
        <TextField
          label="Tenure (Months)"
          type="number"
          value={tenureMonths}
          onChange={(e) => setTenureMonths(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">mo</InputAdornment> } }}
        />

        {invalid && (
          <Typography variant="body2" color="error">
            Enter a valid loan amount, EMI, and tenure. The EMI must be at least the zero-interest
            payment of {P > 0 ? money(P / (n > 0 ? n : 1)) : '$0.00'} (P / n) for a solution to exist.
          </Typography>
        )}

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            P × r × (1 + r)^n / ((1 + r)^n − 1) = EMI
          </Typography>
          {annualRate !== null && monthlyRate !== null && (
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
              {P} × {(monthlyRate).toFixed(6)} × (1 + {(monthlyRate).toFixed(6)})^n ÷
              ((1 + {(monthlyRate).toFixed(6)})^n − 1) ≈ {PMT.toFixed(2)}
            </Typography>
          )}
        </Paper>
      </Box>

      <Box>
        <Paper
          sx={{
            p: 4,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 4,
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            {annualRate !== null ? `${annualRate.toFixed(2)}%` : '--'}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Approximate Annual Interest Rate
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Monthly Interest Rate</Typography>
            <Typography variant="body2" fontWeight="bold">
              {monthlyRate !== null ? `${(monthlyRate * 100).toFixed(3)}%` : '--'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total Amount Payable (EMI × n)</Typography>
            <Typography variant="body2" fontWeight="bold">
              {annualRate !== null ? money(totalPayment) : '--'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Total Interest</Typography>
            <Typography variant="body2" fontWeight="bold">
              {annualRate !== null ? money(totalInterest) : '--'}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const LoanInterestRateCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Loan Interest Rate Calculator Work?</Typography>
      <Typography variant="body1">
        Given a loan amount, a fixed monthly payment (EMI), and a tenure in months, this calculator
        works out the implied annual interest rate. The monthly payment satisfies the EMI formula
        P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the loan amount, r the monthly interest rate,
        and n the number of months. Because the formula cannot be rearranged to solve for r directly,
        the calculator finds r numerically using a bisection method: it brackets the monthly rate
        between a low and a high guess, then repeatedly halves the range until the formula reproduces
        your EMI to within a tiny margin. The estimated rate is then converted to an annual figure by
        multiplying by 12, so the result is an approximation, not an exact closed-form answer.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Borrow $100,000 over 60 months with a $2,500 monthly payment. Trying monthly rates step by
        step, a rate near 1.44% per month reproduces the $2,500 EMI almost exactly, so the annual
        rate works out to roughly 17.27%. Over the loan your total payments come to $150,000, of
        which $50,000 is interest. A lower payment stretches the same loan to a lower implied rate,
        and a higher payment implies a higher rate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Benchmarking an existing loan offer against advertised interest rates.</li>
          <li>Checking whether a quoted EMI implies a fair rate before signing.</li>
          <li>Comparing personal loan or auto loan offers with different fees bundled in.</li>
          <li>Understanding how much interest a fixed monthly commitment really costs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is the result only approximate?</Typography>
      <Typography variant="body1">
        The EMI formula cannot be solved for the interest rate with a simple formula. The calculator
        estimates it with an iterative bisection search, which gets closer with each step but never
        reaches an exact value. For practical purposes the result is accurate to several decimal
        places.
      </Typography>
      <Typography variant="h3">What if my EMI is too low to find a rate?</Typography>
      <Typography variant="body1">
        Every loan has a minimum payment equal to the principal divided by the number of months — the
        amount needed if interest were zero. If your EMI is below that, no positive interest rate can
        match it, and the calculator shows the error instead of inventing a rate.
      </Typography>
      <Typography variant="h3">Does the calculator account for prepayment or bank fees?</Typography>
      <Typography variant="body1">
        No. It assumes a fixed EMI with no early repayment and no processing or administrative fees
        folded into the payment. Such fees would widen the gap between the quoted rate and your
        effective rate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/loan-interest-rate-calculator" content={content}>
      <LoanInterestRateCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoanInterestRateCalculator;