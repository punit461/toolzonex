'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const MortgageDownPaymentCalculator = () => {
  const [homePrice, setHomePrice] = useState('400000');
  const [downPaymentPercent, setDownPaymentPercent] = useState('10');

  const { downPaymentAmount, loanAmount, avoidsPMI, amountToAvoidPMI } = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const pct = parseFloat(downPaymentPercent) || 0;
    const amount = (price * pct) / 100;
    const loan = price - amount;
    const twentyPercent = price * 0.2;

    return {
      downPaymentAmount: amount,
      loanAmount: loan,
      avoidsPMI: pct >= 20,
      amountToAvoidPMI: Math.max(0, twentyPercent - amount),
    };
  }, [homePrice, downPaymentPercent]);

  const content = (
    <>
      <Typography variant="h2">How the Mortgage Down Payment Calculator Works</Typography>
      <Typography variant="body1">
        Enter the home price and your target down payment percentage. The calculator shows the dollar
        amount you&apos;ll need upfront and the resulting mortgage loan amount you&apos;ll finance. It
        also flags whether your down payment reaches the 20% threshold that, on conventional US
        mortgages, typically avoids private mortgage insurance (PMI) — an added monthly cost lenders
        charge on smaller down payments to protect themselves against default risk.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Down Payment = Home Price × Down Payment %
        <br />
        Loan Amount = Home Price − Down Payment
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        On a $400,000 home with a 10% down payment, you&apos;d put down $40,000 and finance $360,000.
        That falls short of the 20% ($80,000) needed to avoid PMI, so the lender would likely add a PMI
        charge to the monthly payment until enough equity is built up. Putting down the full 20% instead
        avoids that extra cost entirely.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out how much cash to save before buying a home.</li>
          <li>Checking whether a planned down payment clears the 20% PMI-avoidance threshold.</li>
          <li>Comparing loan amounts across different down payment percentages.</li>
          <li>Preparing figures for a mortgage pre-approval conversation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does 20% down avoid PMI?</Typography>
      <Typography variant="body1">
        On conventional US mortgages, lenders generally require private mortgage insurance when the
        down payment is below 20%, since a smaller down payment means more risk of loss if the borrower
        defaults. Once you reach 20% equity, PMI is typically not required (or can later be removed).
      </Typography>
      <Typography variant="h3">Can I still get a mortgage with less than 20% down?</Typography>
      <Typography variant="body1">
        Yes — many conventional loans allow down payments as low as 3-5%, and government-backed
        programs like FHA, VA, and USDA loans can require even less. You&apos;ll typically pay mortgage
        insurance until you build enough equity or refinance.
      </Typography>
      <Typography variant="h3">Does a bigger down payment always make financial sense?</Typography>
      <Typography variant="body1">
        Not necessarily. A larger down payment lowers your loan balance, monthly payment, and avoids
        PMI, but it also ties up more cash that could otherwise be used for emergencies, renovations, or
        other investments — weigh liquidity needs alongside the PMI savings.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/mortgage-down-payment-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Home Price"
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Down Payment Percentage"
            type="number"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />

          {avoidsPMI ? (
            <Alert severity="success">
              A {downPaymentPercent}% down payment meets the 20% threshold that typically avoids PMI on
              a conventional mortgage.
            </Alert>
          ) : (
            <Alert severity="warning">
              Below 20% down, lenders typically require PMI. Adding {fmt(amountToAvoidPMI)} more to
              your down payment would reach the 20% PMI-avoidance threshold.
            </Alert>
          )}
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Down Payment Amount</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(downPaymentAmount)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Mortgage Loan Amount</Typography>
            <Typography fontWeight={600}>{fmt(loanAmount)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MortgageDownPaymentCalculator;
