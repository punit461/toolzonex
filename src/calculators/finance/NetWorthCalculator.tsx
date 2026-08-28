'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

const NetWorthCalculator = () => {
  const [savings, setSavings] = useState('10000');
  const [investments, setInvestments] = useState('25000');
  const [property, setProperty] = useState('200000');
  const [otherAssets, setOtherAssets] = useState('5000');
  const [mortgage, setMortgage] = useState('150000');
  const [loans, setLoans] = useState('15000');
  const [creditCards, setCreditCards] = useState('3000');
  const [otherLiabilities, setOtherLiabilities] = useState('2000');

  const result = useMemo(() => {
    const totalAssets = (parseFloat(savings) || 0) + (parseFloat(investments) || 0) + (parseFloat(property) || 0) + (parseFloat(otherAssets) || 0);
    const totalLiabilities = (parseFloat(mortgage) || 0) + (parseFloat(loans) || 0) + (parseFloat(creditCards) || 0) + (parseFloat(otherLiabilities) || 0);
    const netWorth = totalAssets - totalLiabilities;
    return { totalAssets, totalLiabilities, netWorth };
  }, [savings, investments, property, otherAssets, mortgage, loans, creditCards, otherLiabilities]);

  const content = (
    <>
      <Typography variant="h2">How is Net Worth Calculated?</Typography>
      <Typography variant="body1">
        Net worth is calculated by subtracting your total liabilities (debts) from your total assets (what you own). It gives you a snapshot of your financial health at a single point in time.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Net Worth = Total Assets − Total Liabilities
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If you have $240,000 in assets (savings, investments, property) and $170,000 in liabilities (mortgage, loans, credit cards), your net worth is $70,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Tracking your overall financial health over time.</li>
          <li>Planning for retirement or major life milestones.</li>
          <li>Evaluating whether you can afford a large purchase or investment.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What counts as an asset?</Typography>
      <Typography variant="body1">
        Assets include cash, savings accounts, investments, real estate equity, vehicles, and any other items of monetary value you own.
      </Typography>
      <Typography variant="h3">Can net worth be negative?</Typography>
      <Typography variant="body1">
        Yes. If your debts exceed your assets, your net worth is negative. This is common early in life (e.g., student loans) and can improve over time.
      </Typography>
      <Typography variant="h3">How often should I calculate my net worth?</Typography>
      <Typography variant="body1">
        Most financial advisors recommend calculating it monthly or quarterly to track your progress toward financial goals.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/net-worth-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box>
          <Typography variant="h6" fontWeight={600} mb={2}>Assets</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Savings" type="number" value={savings} onChange={(e) => setSavings(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
            <TextField label="Investments" type="number" value={investments} onChange={(e) => setInvestments(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
            <TextField label="Property Value" type="number" value={property} onChange={(e) => setProperty(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
            <TextField label="Other Assets" type="number" value={otherAssets} onChange={(e) => setOtherAssets(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          </Box>
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={600} mb={2}>Liabilities</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Mortgage" type="number" value={mortgage} onChange={(e) => setMortgage(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
            <TextField label="Loans" type="number" value={loans} onChange={(e) => setLoans(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
            <TextField label="Credit Cards" type="number" value={creditCards} onChange={(e) => setCreditCards(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
            <TextField label="Other Liabilities" type="number" value={otherLiabilities} onChange={(e) => setOtherLiabilities(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          </Box>
        </Box>
      </Box>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 2, py: 2, bgcolor: result.netWorth >= 0 ? 'success.light' : 'error.light', borderRadius: 1 }}>
          <Typography variant="body2" color={result.netWorth >= 0 ? 'success.contrastText' : 'error.contrastText'}>Net Worth</Typography>
          <Typography variant="h3" fontWeight="bold" color={result.netWorth >= 0 ? 'success.contrastText' : 'error.contrastText'}>{fmt(result.netWorth)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Total Assets</Typography>
          <Typography fontWeight={600} color="success.main">{fmt(result.totalAssets)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Total Liabilities</Typography>
          <Typography fontWeight={600} color="error.main">{fmt(result.totalLiabilities)}</Typography>
        </Box>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default NetWorthCalculator;
