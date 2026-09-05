'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LoanToValueCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('320000');
  const [propertyValue, setPropertyValue] = useState('400000');

  const loan = parseFloat(loanAmount) || 0;
  const value = parseFloat(propertyValue) || 0;
  const valid = loan >= 0 && value > 0;
  const ltv = valid ? (loan / value) * 100 : 0;

  const content = (
    <>
      <Typography variant="h2">How to Use the Loan to Value (LTV) Calculator</Typography>
      <Typography variant="body1">
        Enter the loan amount and the property or asset&apos;s value (its appraised value or purchase price,
        whichever a lender is using) to calculate the loan-to-value ratio — the percentage of the asset&apos;s
        value that is financed by the loan. Lenders use LTV as a key measure of risk on secured loans like
        mortgages and auto loans.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        LTV = (Loan Amount / Property Value) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A $320,000 loan on a $400,000 property gives an LTV of 80% ($320,000 ÷ $400,000 × 100). This is a
        commonly cited threshold: at 80% LTV or below on a conventional mortgage, lenders typically don&apos;t
        require private mortgage insurance (PMI). Below that threshold, LTV also generally correlates with
        lower risk to the lender and often better loan terms, since the borrower has more equity cushioning the
        loan.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a mortgage down payment is enough to avoid PMI.</li>
          <li>Comparing LTV across different down payment scenarios before buying a home or car.</li>
          <li>Estimating how much equity is required to refinance under a lender&apos;s maximum LTV threshold.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why is 80% LTV such a common benchmark?</strong> On conventional mortgages, 80% LTV (a 20% down payment) is the standard threshold below which lenders typically don&apos;t require private mortgage insurance, since the borrower&apos;s equity cushion is considered large enough to protect the lender if the loan defaults.</li>
          <li><strong>Does a lower LTV always mean better loan terms?</strong> Generally yes — lower LTV means less risk for the lender, which often translates into a lower interest rate, easier approval, and no mortgage insurance requirement. However, exact thresholds and pricing vary by lender, loan type, and loan program.</li>
          <li><strong>What value should I use for the property?</strong> Lenders typically use the lower of the appraised value or the purchase price when calculating LTV for a home purchase, and the appraised value alone for a refinance. Use whichever figure your lender has specified.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/loan-to-value-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Property / Asset Value"
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Loan-to-Value Ratio</Typography>
            <Typography variant="h6" fontWeight="bold">{valid ? `${ltv.toFixed(1)}%` : '—'}</Typography>
          </Paper>
          {valid && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {ltv <= 80
                ? 'At or below 80% LTV, conventional mortgage lenders typically do not require PMI.'
                : 'Above 80% LTV, conventional mortgage lenders typically require private mortgage insurance (PMI) until the loan is paid down further.'}
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LoanToValueCalculator;
