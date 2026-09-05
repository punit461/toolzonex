'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const VehicleLoanAffordabilityCalculator = () => {
  const [income, setIncome] = useState('6000');
  const [existingDebts, setExistingDebts] = useState('400');
  const [term, setTerm] = useState('60');
  const [rate, setRate] = useState('7');
  const [targetDTI, setTargetDTI] = useState('36');
  const [insuranceMaintenance, setInsuranceMaintenance] = useState('150');

  const result = useMemo(() => {
    const inc = parseFloat(income) || 0;
    const debts = parseFloat(existingDebts) || 0;
    const n = parseFloat(term) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const dti = (parseFloat(targetDTI) || 0) / 100;
    const insMaint = parseFloat(insuranceMaintenance) || 0;

    const maxTotalDebt = inc * dti;
    const maxCarPayment = Math.max(0, maxTotalDebt - debts - insMaint);

    let maxLoanAmount = 0;
    if (maxCarPayment > 0 && n > 0) {
      maxLoanAmount = r > 0
        ? (maxCarPayment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n))
        : maxCarPayment * n;
    }

    return { maxTotalDebt, maxCarPayment, maxLoanAmount };
  }, [income, existingDebts, term, rate, targetDTI, insuranceMaintenance]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Vehicle Loan Affordability Calculator</Typography>
      <Typography variant="body1">
        Enter your monthly income, existing monthly debt payments, your target debt-to-income (DTI) ratio, the
        loan term and interest rate you expect, and your estimated monthly insurance and maintenance cost for
        the vehicle. The calculator first finds the maximum total debt payment your target DTI allows, then
        subtracts your existing debts and the insurance/maintenance estimate to find the maximum car payment
        you can actually afford — and finally converts that payment into a maximum loan amount.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Max Total Debt Payment = Income × Target DTI%
        <br />
        Max Car Payment = Max Total Debt Payment − Existing Debts − Insurance/Maintenance
        <br />
        Max Loan Amount = Max Car Payment × [(1+r)ⁿ − 1] / [r(1+r)ⁿ]
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With $6,000 monthly income, $400 in existing debts, a 36% target DTI, $150/month estimated insurance
        and maintenance, a 60-month term, and a 7% rate: the max total debt payment is $2,160, leaving a max
        car payment of $1,610 after existing debts and insurance/maintenance. At 7% over 60 months, that
        supports a maximum loan of roughly {money(result.maxLoanAmount)}.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a realistic car-shopping budget before visiting a dealership.</li>
          <li>Seeing how insurance and maintenance costs eat into the loan amount you can actually afford.</li>
          <li>Testing how a longer or shorter loan term changes your maximum affordable vehicle price.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the general Loan Affordability Calculator?</strong> The general Loan Affordability Calculator is a purpose-agnostic tool that only considers income, existing debts, and target DTI. This vehicle-specific tool additionally factors in ongoing insurance and maintenance costs before computing your max car payment — since those costs are unavoidable with vehicle ownership and directly reduce what you can actually put toward a loan payment.</li>
          <li><strong>Why subtract insurance and maintenance before computing the loan amount?</strong> A car payment is only part of the true cost of owning a vehicle. If insurance and maintenance aren't budgeted for up front, you risk approving yourself for a loan payment you can't actually sustain once those recurring costs are added in.</li>
          <li><strong>What DTI ratio should I target for a car loan?</strong> Many financial guidelines suggest keeping total debt payments (including a car loan) under 36% of gross income, though auto lenders individually may allow higher ratios. A lower target DTI leaves more room in your budget for savings and unexpected expenses.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/vehicle-loan-affordability-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Monthly Income" type="number" value={income} onChange={(e) => setIncome(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Existing Monthly Debt Payments" type="number" value={existingDebts} onChange={(e) => setExistingDebts(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Desired Loan Term" type="number" value={term} onChange={(e) => setTerm(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">months</InputAdornment> } }}
          />
          <TextField
            label="Interest Rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Target Debt-to-Income Ratio" type="number" value={targetDTI} onChange={(e) => setTargetDTI(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Estimated Monthly Insurance + Maintenance" type="number" value={insuranceMaintenance} onChange={(e) => setInsuranceMaintenance(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Max Affordable Loan Amount</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.maxLoanAmount)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Max Total Debt Payment</Typography>
            <Typography fontWeight={600}>{money(result.maxTotalDebt)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Max Car Payment</Typography>
            <Typography fontWeight={600}>{money(result.maxCarPayment)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VehicleLoanAffordabilityCalculator;
