'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Chip, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const quickInputs = [
  { label: '₹5L @ 8.5% · EMI ₹10k', principal: '500000', rate: '8.5', payment: '10000' },
  { label: '₹10L @ 9% · EMI ₹15k', principal: '1000000', rate: '9', payment: '15000' },
  { label: '₹20L @ 7.5% · EMI ₹25k', principal: '2000000', rate: '7.5', payment: '25000' },
];

const LoanTermCalculatorContent = () => {
  const [principal, setPrincipal] = useState<string>('500000');
  const [annualRate, setAnnualRate] = useState<string>('8.5');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('10000');

  const P = parseFloat(principal) || 0;
  const annual = parseFloat(annualRate) || 0;
  const PMT = parseFloat(monthlyPayment) || 0;
  const r = annual / 12 / 100;

  const notCovered = P > 0 && r > 0 && PMT > 0 && PMT <= P * r;

  let months: number | null = null;
  if (P <= 0 || annual <= 0 || PMT <= 0) {
    months = null;
  } else if (notCovered) {
    months = null;
  } else if (r === 0) {
    months = Math.ceil(P / PMT);
  } else {
    months = Math.ceil(-Math.log(1 - (P * r) / PMT) / Math.log(1 + r));
  }

  const years = months !== null ? Math.floor(months / 12) : 0;
  const remMonths = months !== null ? months % 12 : 0;
  const totalPaid = months !== null ? PMT * months : 0;
  const totalInterest = months !== null ? totalPaid - P : 0;
  const monthsLabel = months !== null
    ? (years > 0 ? `${years} yr ${remMonths} mo` : `${remMonths} mo`)
    : '--';

  const money = (v: number) => `$${v.toFixed(2)}`;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {quickInputs.map((q) => (
            <Chip
              key={q.label}
              label={q.label}
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => {
                setPrincipal(q.principal);
                setAnnualRate(q.rate);
                setMonthlyPayment(q.payment);
              }}
            />
          ))}
        </Box>
        <TextField
          label="Loan Amount"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Annual Interest Rate (%)"
          type="number"
          value={annualRate}
          onChange={(e) => setAnnualRate(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <TextField
          label="Monthly Payment"
          type="number"
          value={monthlyPayment}
          onChange={(e) => setMonthlyPayment(e.target.value)}
          fullWidth
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          }}
        />

        {notCovered && (
          <Alert severity="warning">
            Your monthly payment covers the monthly interest but nothing on the principal. The loan
            will never be paid off — increase the payment or lower the rate.
          </Alert>
        )}

        {months === null && !notCovered && (
          <Typography variant="body2" color="error">
            Enter a valid loan amount, interest rate, and monthly payment to see a result.
          </Typography>
        )}

        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            n = −ln(1 − (P × r) / PMT) / ln(1 + r)
          </Typography>
          {months !== null && (
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', mt: 0.5 }}>
              −ln(1 − ({P} × {r.toFixed(6)}) / {PMT.toFixed(2)}) / ln(1 + {r.toFixed(6)}) ≈ {months} months
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
            {monthsLabel}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {months !== null ? `${months} monthly payments` : 'Loan Term'}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total Interest Paid</Typography>
            <Typography variant="body2" fontWeight="bold">
              {months !== null ? money(totalInterest) : '--'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Total Paid</Typography>
            <Typography variant="body2" fontWeight="bold">
              {months !== null ? money(totalPaid) : '--'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Principal</Typography>
            <Typography variant="body2" fontWeight="bold">{P > 0 ? money(P) : '--'}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const LoanTermCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the Loan Term Calculator Work?</Typography>
      <Typography variant="body1">
        Enter the loan amount, the annual interest rate, and the monthly payment you can afford. The
        calculator uses the closed-form loan formula n = −ln(1 − (P × r) / PMT) / ln(1 + r), where P
        is the principal, r is the monthly interest rate (annual rate divided by 12), and PMT is the
        monthly payment. The result is the number of months it takes to fully clear the loan. If your
        payment does not even cover the interest accruing each month, no repayment term exists and the
        calculator warns you instead.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Take a $500,000 loan at 8.5% per year with a $10,000 monthly payment. The monthly rate is
        0.7083% and the formula gives about 62 months, so the loan clears in roughly 5 years and 2
        months. Over that period you pay about $620,000 in total, of which around $120,000 is
        interest. Paying $15,000 a month instead would cut the term and slash the interest bill.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning how quickly you can retire a home, car, or personal loan.</li>
          <li>Comparing payoff timelines for different monthly payment amounts.</li>
          <li>Deciding whether a bigger EMI is worth the reduced interest cost.</li>
          <li>Setting repayment goals for debt consolidation plans.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does my loan never get paid off?</Typography>
      <Typography variant="body1">
        If your monthly payment is equal to or less than the interest charged that month (P × r), the
        principal never decreases. No number of payments can finish the loan, so the calculator shows a
        warning instead of a misleading number.
      </Typography>
      <Typography variant="h3">What happens if I pay extra each month?</Typography>
      <Typography variant="body1">
        Every rupee or dollar over the monthly interest goes straight to the principal. This shortens
        the term and reduces the total interest paid, which is why even small extra payments help.
      </Typography>
      <Typography variant="h3">Why is the result rounded up?</Typography>
      <Typography variant="body1">
        The formula can produce a fractional number of months. Since payments are made in whole
        months, an exact payoff requires rounding up to the next full month for the final balance to
        be fully cleared.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/loan-term-calculator" content={content}>
      <LoanTermCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoanTermCalculator;