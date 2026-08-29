'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const LoanAffordabilityCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState('6000');
  const [existingDebts, setExistingDebts] = useState('500');
  const [loanTerm, setLoanTerm] = useState('5');
  const [interestRate, setInterestRate] = useState('9');
  const [targetDTI, setTargetDTI] = useState('36');

  const { maxMonthlyPayment, maxLoanAmount } = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const debts = parseFloat(existingDebts) || 0;
    const years = parseFloat(loanTerm) || 0;
    const rate = parseFloat(interestRate) || 0;
    const dti = parseFloat(targetDTI) || 0;

    const totalAllowedDebt = income * (dti / 100);
    const maxPayment = Math.max(0, totalAllowedDebt - debts);

    const monthlyRate = rate / 12 / 100;
    const n = years * 12;
    let loan = 0;
    if (maxPayment > 0 && n > 0) {
      loan = monthlyRate > 0
        ? (maxPayment * (1 - Math.pow(1 + monthlyRate, -n))) / monthlyRate
        : maxPayment * n;
    }

    return { maxMonthlyPayment: maxPayment, maxLoanAmount: loan };
  }, [monthlyIncome, existingDebts, loanTerm, interestRate, targetDTI]);

  const content = (
    <>
      <Typography variant="h2">How Maximum Loan Affordability Is Calculated</Typography>
      <Typography variant="body1">
        This calculator finds the biggest loan you can take on without exceeding a target
        debt-to-income (DTI) ratio. It multiplies your monthly income by the target DTI to find the
        total monthly debt payments you can carry, subtracts your existing monthly debts to find the
        room left for a new loan payment, then converts that payment capacity into a maximum loan
        amount using the loan term and interest rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Max Monthly Payment = (Monthly Income × Target DTI %) − Existing Debts
        <br />
        Max Loan Amount = Max Payment × [1 − (1 + r)⁻ⁿ] / r
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With $6,000 monthly income, $500 in existing debts, a 36% target DTI, a 5-year term, and a 9%
        interest rate, the total allowed debt payment is $2,160, leaving $1,660 available for a new
        loan payment. At 9% over 5 years, that payment capacity supports a maximum loan of roughly
        $79,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding out how much you could realistically borrow before applying for a loan.</li>
          <li>Checking how existing debts limit your available borrowing capacity.</li>
          <li>Testing how a shorter or longer term changes the maximum affordable loan.</li>
          <li>Preparing for a lender conversation with a realistic borrowing ceiling in mind.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What DTI ratio do lenders typically use?</Typography>
      <Typography variant="body1">
        Many lenders cap total DTI (including the new loan) around 36-43%, though this varies by loan
        type and lender. Mortgage lenders often use the 28/36 rule, while personal loan and auto lenders
        may allow different thresholds.
      </Typography>
      <Typography variant="h3">Why do my existing debts reduce the loan amount so much?</Typography>
      <Typography variant="body1">
        The target DTI caps your total monthly debt obligations, not just the new loan. Every dollar
        already committed to other debts is a dollar less available for a new loan payment, which is
        why paying down existing debt can meaningfully raise how much you can borrow.
      </Typography>
      <Typography variant="h3">Does this include taxes, insurance, or fees?</Typography>
      <Typography variant="body1">
        No — this estimates borrowing capacity based on principal and interest only. Loan origination
        fees, insurance requirements, or other add-on costs specific to your lender aren&apos;t
        included and could affect the actual amount you qualify for.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/loan-affordability-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Monthly Income"
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Existing Monthly Debts"
            type="number"
            value={existingDebts}
            onChange={(e) => setExistingDebts(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Desired Loan Term"
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }}
          />
          <TextField
            label="Interest Rate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Target Debt-to-Income Ratio"
            type="number"
            value={targetDTI}
            onChange={(e) => setTargetDTI(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Max Affordable Loan Amount</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(maxLoanAmount)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Max Monthly Payment</Typography>
            <Typography fontWeight={600}>{fmt(maxMonthlyPayment)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoanAffordabilityCalculator;
