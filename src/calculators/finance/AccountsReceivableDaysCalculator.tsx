'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const AccountsReceivableDaysCalculator = () => {
  const [receivables, setReceivables] = useState('50000');
  const [creditSales, setCreditSales] = useState('600000');
  const [days, setDays] = useState('365');

  const dso = useMemo(() => {
    const ar = parseFloat(receivables) || 0;
    const sales = parseFloat(creditSales) || 0;
    const d = parseFloat(days) || 0;
    return sales > 0 ? (ar / sales) * d : 0;
  }, [receivables, creditSales, days]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Accounts Receivable Days Calculator (DSO)</Typography>
      <Typography variant="body1">
        Enter your accounts receivable balance, total credit sales for the period, and the number of days in
        that period (365 for a full year, 90 for a quarter, or any custom period). This calculates Days Sales
        Outstanding (DSO) — a measure of how many days on average it takes your business to collect payment
        after making a credit sale. A lower DSO means customers are paying faster, which improves cash flow.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        DSO = (Accounts Receivable ÷ Total Credit Sales) × Days
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A business with {money(50000)} in accounts receivable and {money(600000)} in credit sales over a
        365-day year has a DSO of (50,000 ÷ 600,000) × 365 ≈ {dso.toFixed(1)} days — meaning it takes roughly{' '}
        {dso.toFixed(0)} days on average to collect payment after a sale.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Monitoring how quickly a business is collecting on credit sales over time.</li>
          <li>Comparing collection speed against industry peers or internal targets.</li>
          <li>Spotting early warning signs of cash flow trouble from slowing collections.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What's a good DSO?</strong> It depends heavily on your industry and standard payment terms, but a DSO close to or below your stated payment terms (e.g., 30-45 days for net-30 or net-45 terms) is generally considered healthy. A DSO significantly higher than your terms suggests collection problems.</li>
          <li><strong>Should I use total sales or only credit sales?</strong> Use only credit sales — cash sales are collected immediately and shouldn't be included, since DSO specifically measures the collection cycle for sales made on credit.</li>
          <li><strong>How does DSO relate to the Accounts Payable Days Calculator?</strong> DSO measures how fast you collect from customers, while Days Payable Outstanding (DPO) measures how long you take to pay your own suppliers. Comparing the two together shows your overall cash conversion timing — see the Accounts Payable Days Calculator for the DPO side.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/accounts-receivable-days-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Accounts Receivable" type="number" value={receivables} onChange={(e) => setReceivables(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Total Credit Sales" type="number" value={creditSales} onChange={(e) => setCreditSales(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Days in Period" type="number" value={days} onChange={(e) => setDays(e.target.value)} fullWidth
            helperText="365 for a year, 90 for a quarter, or any custom period"
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Days Sales Outstanding (DSO)</Typography>
            <Typography variant="h3" fontWeight="bold">{dso.toFixed(1)} days</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AccountsReceivableDaysCalculator;
