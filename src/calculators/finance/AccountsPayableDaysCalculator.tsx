'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const AccountsPayableDaysCalculator = () => {
  const [payables, setPayables] = useState('40000');
  const [cogs, setCogs] = useState('480000');
  const [days, setDays] = useState('365');

  const dpo = useMemo(() => {
    const ap = parseFloat(payables) || 0;
    const c = parseFloat(cogs) || 0;
    const d = parseFloat(days) || 0;
    return c > 0 ? (ap / c) * d : 0;
  }, [payables, cogs, days]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Accounts Payable Days Calculator (DPO)</Typography>
      <Typography variant="body1">
        Enter your accounts payable balance, cost of goods sold (COGS) for the period, and the number of days
        in that period (365 for a full year, 90 for a quarter, or a custom range). This calculates Days
        Payable Outstanding (DPO) — how many days on average your business takes to pay its own suppliers
        after receiving an invoice. A higher DPO means you&apos;re holding onto cash longer before paying
        bills.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        DPO = (Accounts Payable ÷ COGS) × Days
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A business with {money(40000)} in accounts payable and {money(480000)} in COGS over a 365-day year has
        a DPO of (40,000 ÷ 480,000) × 365 ≈ {dpo.toFixed(1)} days — meaning it takes roughly {dpo.toFixed(0)}{' '}
        days on average to pay its suppliers after receiving an invoice.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Evaluating how effectively a business is managing supplier payment timing.</li>
          <li>Comparing payment practices against industry norms or supplier payment terms.</li>
          <li>Assessing overall cash-flow health alongside accounts receivable collection speed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How does DPO relate to DSO?</strong> DPO measures how long you take to pay suppliers, while Days Sales Outstanding (DSO) measures how long it takes you to collect from customers — see the Accounts Receivable Days Calculator for that side. A business collecting faster than it pays (low DSO, high DPO) has favorable cash-flow timing, since it holds cash from sales longer than it needs to before its own bills come due.</li>
          <li><strong>Is a higher DPO always better?</strong> Not necessarily — while a higher DPO can improve short-term cash flow, stretching payments too far can damage supplier relationships, risk late fees, or signal financial distress. Balance DPO against maintaining healthy supplier terms.</li>
          <li><strong>Why use COGS instead of total purchases?</strong> COGS is commonly used as a proxy for the value of goods and services a business owes suppliers for, since detailed purchase data isn't always available externally. If you have precise total credit purchases figures, you can substitute that for a more exact DPO.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/accounts-payable-days-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Accounts Payable" type="number" value={payables} onChange={(e) => setPayables(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Cost of Goods Sold (COGS)" type="number" value={cogs} onChange={(e) => setCogs(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Days in Period" type="number" value={days} onChange={(e) => setDays(e.target.value)} fullWidth
            helperText="365 for a year, 90 for a quarter, or any custom period"
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Days Payable Outstanding (DPO)</Typography>
            <Typography variant="h3" fontWeight="bold">{dpo.toFixed(1)} days</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AccountsPayableDaysCalculator;
