'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const EducationLoanCalculator = () => {
  const [amount, setAmount] = useState<string>('1000000');
  const [rate, setRate] = useState<string>('9');
  const [tenure, setTenure] = useState<string>('10');
  const [moratorium, setMoratorium] = useState<string>('12');

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const p = parseFloat(amount) || 0;
    const r = (parseFloat(rate) || 0) / 12 / 100;
    const n = (parseFloat(tenure) || 0) * 12;
    const m = parseFloat(moratorium) || 0;

    if (p === 0 || r === 0 || n === 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };

    const pAfterMoratorium = p * Math.pow(1 + r, m);
    const emiVal = (pAfterMoratorium * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiVal * n;
    return {
      emi: Math.round(emiVal),
      totalInterest: Math.round(totalPay - p),
      totalPayment: Math.round(totalPay),
    };
  }, [amount, rate, tenure, moratorium]);

  const content = (
    <>
      <Typography variant="h2">How to use?</Typography>
      <Typography variant="body1">
        Enter the loan amount, annual interest rate, repayment tenure, and the
        moratorium (course + grace) period. Interest accrues during the moratorium
        and is added to the principal before EMI repayment begins.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A ₹10,00,000 loan at 9% for 10 years with a 12-month moratorium: the principal
        grows during the moratorium, then the standard EMI formula is applied for 120
        months.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a moratorium period?</strong> The time during study and a grace period after, when you usually don't pay EMIs but interest may accrue.</li>
          <li><strong>Why is total interest higher with a moratorium?</strong> Unpaid interest compounds onto the principal, increasing the amount you eventually repay.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning repayment for student/education loans.</li>
          <li>Comparing lenders with different moratorium terms.</li>
          <li>Estimating post-study monthly obligations.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/education-loan-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Loan Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
          <TextField label="Interest Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">% p.a.</InputAdornment> }} />
          <TextField label="Tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">Yr</InputAdornment> }} />
          <TextField label="Moratorium Period" type="number" value={moratorium} onChange={(e) => setMoratorium(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">Months</InputAdornment> }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">Monthly EMI</Typography>
            <Typography variant="h6" fontWeight="bold">₹{emi.toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'secondary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">Total Interest</Typography>
            <Typography variant="h6" fontWeight="bold">₹{totalInterest.toLocaleString()}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'action.hover' }}>
            <Typography variant="h6">Total Payment</Typography>
            <Typography variant="h6" fontWeight="bold">₹{totalPayment.toLocaleString()}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EducationLoanCalculator;
