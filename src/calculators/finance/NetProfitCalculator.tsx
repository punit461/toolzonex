'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const NetProfitCalculator = () => {
  const [totalRevenue, setTotalRevenue] = useState('100000');
  const [totalExpenses, setTotalExpenses] = useState('72000');

  const { netProfit, margin } = useMemo(() => {
    const revenue = parseFloat(totalRevenue) || 0;
    const expenses = parseFloat(totalExpenses) || 0;
    const profit = revenue - expenses;
    const marginPct = revenue > 0 ? (profit / revenue) * 100 : 0;
    return { netProfit: profit, margin: marginPct };
  }, [totalRevenue, totalExpenses]);

  const content = (
    <>
      <Typography variant="h2">How Net Profit and Margin Are Calculated</Typography>
      <Typography variant="body1">
        Net profit is what remains after subtracting all expenses — cost of goods sold, operating
        expenses, interest, and taxes — from total revenue. Dividing net profit by total revenue gives
        the net profit margin, a percentage that shows how much of every dollar in sales actually turns
        into profit.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Net Profit = Total Revenue − Total Expenses
        <br />
        Net Profit Margin = (Net Profit / Total Revenue) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A business with $100,000 in total revenue and $72,000 in total expenses (covering cost of
        goods, operating costs, interest, and taxes) has a net profit of $28,000 — a 28% net profit
        margin. That means 28 cents of every revenue dollar is retained as profit.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking overall business profitability after all costs are accounted for.</li>
          <li>Comparing profit margins across different periods, products, or business lines.</li>
          <li>Benchmarking your margin against industry averages.</li>
          <li>Tracking whether cost-cutting or pricing changes are improving profitability.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between net profit and gross profit?</Typography>
      <Typography variant="body1">
        Gross profit only subtracts the cost of goods sold (COGS) from revenue, ignoring operating
        expenses, interest, and taxes. Net profit subtracts all expenses, giving the true bottom-line
        result of the business.
      </Typography>
      <Typography variant="h3">What counts as a total expense here?</Typography>
      <Typography variant="body1">
        Include everything that reduces your bottom line: cost of goods sold, rent, salaries,
        marketing, interest on debt, and taxes. Leaving out any major cost category will overstate your
        real net profit and margin.
      </Typography>
      <Typography variant="h3">What is a good net profit margin?</Typography>
      <Typography variant="body1">
        It varies significantly by industry — software and services businesses often see margins above
        15-20%, while retail and grocery businesses commonly operate on margins of just 2-5%. Compare
        your margin against similar businesses in your industry rather than a single universal target.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/net-profit-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Revenue"
            type="number"
            value={totalRevenue}
            onChange={(e) => setTotalRevenue(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Total Expenses"
            type="number"
            value={totalExpenses}
            onChange={(e) => setTotalExpenses(e.target.value)}
            helperText="Cost of goods sold, operating expenses, interest, and taxes combined."
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Net Profit</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(netProfit)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Net Profit Margin</Typography>
            <Typography fontWeight={600} color={margin >= 0 ? 'success.main' : 'error.main'}>
              {margin.toFixed(2)}%
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NetProfitCalculator;
