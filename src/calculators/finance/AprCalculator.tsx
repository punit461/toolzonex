'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

const AprCalculator = () => {
  const [principal, setPrincipal] = useState('25000');
  const [rate, setRate] = useState('6');
  const [years, setYears] = useState('5');
  const [fees, setFees] = useState('500');

  const result = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const F = parseFloat(fees) || 0;

    const n = 12;
    const N = n * t;
    const monthlyRate = r / n;
    const monthlyPayment = monthlyRate === 0 ? P / N : (P * monthlyRate * Math.pow(1 + monthlyRate, N)) / (Math.pow(1 + monthlyRate, N) - 1);
    const totalPaid = monthlyPayment * N;
    const totalInterest = totalPaid - P;
    const totalCost = totalInterest + F;

    const apr = P > 0 && N > 0 ? (2 * n * totalCost) / (P * (N + 1)) : 0;
    const aprPercent = apr * 100;

    return { monthlyPayment, totalPaid, totalInterest, totalCost, aprPercent };
  }, [principal, rate, years, fees]);

  const content = (
    <>
      <Typography variant="h2">How is APR Calculated?</Typography>
      <Typography variant="body1">
        APR (Annual Percentage Rate) reflects the true yearly cost of a loan, including fees. It is higher than the nominal interest rate because it factors in origination fees and other charges spread across the loan term.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        APR ≈ (2 × n × I) / (P × (N + 1))
        <br />
        Where n = payments per year, I = total interest + fees, P = principal, N = total payments
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $25,000 loan at 6% for 5 years with $500 in fees has a monthly payment of about $483. The total interest is roughly $3,988. Adding $500 in fees, the APR comes out to approximately 6.8%, which is higher than the 6% nominal rate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing loan offers from different lenders on an apples-to-apples basis.</li>
          <li>Understanding the true cost of a mortgage, auto loan, or personal loan.</li>
          <li>Evaluating whether refinancing would save you money.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between APR and interest rate?</Typography>
      <Typography variant="body1">
        The interest rate only covers the cost of borrowing the principal. APR includes the interest rate plus fees and other loan costs, giving a more complete picture of what you'll pay.
      </Typography>
      <Typography variant="h3">Is a lower APR always better?</Typography>
      <Typography variant="body1">
        Generally yes, but also consider the loan term, total cost, and any prepayment penalties. A lower APR with a much longer term could cost more overall.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/apr-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Loan Amount" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Interest Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <TextField label="Loan Term" type="number" value={years} onChange={(e) => setYears(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">Years</InputAdornment> } }} fullWidth />
          <TextField label="Total Fees" type="number" value={fees} onChange={(e) => setFees(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">APR</Typography>
            <Typography variant="h3" fontWeight="bold">{result.aprPercent.toFixed(2)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Monthly Payment</Typography>
            <Typography fontWeight={600}>{fmt(result.monthlyPayment)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Interest</Typography>
            <Typography fontWeight={600}>{fmt(result.totalInterest)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Fees + Interest</Typography>
            <Typography fontWeight={600}>{fmt(result.totalCost)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default AprCalculator;
