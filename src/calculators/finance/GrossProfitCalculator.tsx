'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const GrossProfitCalculator = () => {
  const [revenue, setRevenue] = useState('50000');
  const [cogs, setCogs] = useState('30000');

  const { grossProfit, grossMargin } = useMemo(() => {
    const rev = parseFloat(revenue) || 0;
    const cost = parseFloat(cogs) || 0;
    const profit = rev - cost;
    return { grossProfit: profit, grossMargin: rev > 0 ? (profit / rev) * 100 : 0 };
  }, [revenue, cogs]);

  const content = (
    <>
      <Typography variant="h2">How Gross Profit Is Calculated</Typography>
      <Typography variant="body1">
        Gross profit is the money left over after subtracting the direct cost of producing goods or services
        (cost of goods sold, or COGS) from revenue. It shows how efficiently a business turns sales into
        profit before accounting for overhead, marketing, and other operating expenses.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Gross Profit = Revenue − COGS
        <br />
        Gross Margin (%) = (Gross Profit ÷ Revenue) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A business with $50,000 in revenue and $30,000 in cost of goods sold has a gross profit of $20,000,
        which is a gross margin of 40% — meaning 40 cents of every sales dollar remains after covering direct
        production costs.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pricing products or services to hit a target margin.</li>
          <li>Comparing profitability across product lines or business units.</li>
          <li>Benchmarking margins against industry competitors.</li>
          <li>Tracking whether rising costs are eroding profitability over time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What counts as cost of goods sold?</Typography>
      <Typography variant="body1">
        COGS includes direct costs tied to producing what&apos;s sold — raw materials, direct labor, and
        manufacturing overhead. It excludes indirect costs like marketing, rent, and administrative salaries.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between gross profit and net profit?</Typography>
      <Typography variant="body1">
        Gross profit only subtracts COGS from revenue. Net profit goes further, deducting operating expenses,
        interest, and taxes to arrive at the actual bottom-line earnings.
      </Typography>
      <Typography variant="h3">What is a good gross margin?</Typography>
      <Typography variant="body1">
        It varies widely by industry — software companies often see 70-90% margins, while retailers and
        grocers may run 20-30%. Compare your margin against businesses in the same sector.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/gross-profit-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Revenue"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Cost of Goods Sold (COGS)"
            type="number"
            value={cogs}
            onChange={(e) => setCogs(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Gross Profit</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(grossProfit)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Gross Margin</Typography>
            <Typography fontWeight={600}>{grossMargin.toFixed(1)}%</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GrossProfitCalculator;
