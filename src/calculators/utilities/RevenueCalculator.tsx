'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RevenueCalculator = () => {
  const [units, setUnits] = useState('500');
  const [price, setPrice] = useState('100');
  const [other, setOther] = useState('0');
  const [discount, setDiscount] = useState('0');
  const [costPerUnit, setCostPerUnit] = useState('');
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const result = useMemo(() => {
    const numUnits = parseFloat(units) || 0;
    const unitPrice = parseFloat(price) || 0;
    const otherRevenue = parseFloat(other) || 0;
    const discountPct = Math.min(100, Math.max(0, parseFloat(discount) || 0)) / 100;

    const grossRevenue = numUnits * unitPrice;
    const discountAmount = grossRevenue * discountPct;
    const netRevenue = grossRevenue - discountAmount + otherRevenue;

    const cost = parseFloat(costPerUnit) || 0;
    const totalCost = cost * numUnits;
    const profit = cost > 0 ? netRevenue - totalCost : null;
    const margin = profit !== null && netRevenue > 0 ? (profit / netRevenue) * 100 : null;

    return { numUnits, unitPrice, otherRevenue, grossRevenue, discountAmount, netRevenue, cost, totalCost, profit, margin };
  }, [units, price, other, discount, costPerUnit]);

  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

  const periodLabel = period === 'monthly' ? 'month' : 'year';

  const content = (
    <>
      <Typography variant="h2">How is Revenue Calculated?</Typography>
      <Typography variant="body1">
        Gross revenue is units sold × price per unit. A discount reduces this total, and any additional revenue (subscriptions, fees, services) is added on top to arrive at net revenue. If you provide a cost per unit, profit is net revenue minus total cost, with profit margin expressed as a percentage of net revenue.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Net Revenue = Units × Price × (1 − Discount%) + Other Revenue
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selling 500 units at $100 each with a 10% discount and $1,000 in other revenue gives gross revenue of $50,000, a discount of $5,000, and net revenue of $46,000. If each unit costs $60 to produce, profit is $46,000 − $30,000 = $16,000, a ~34.8% margin.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Forecasting revenue for a new product launch.</li>
          <li>Modeling how discounts and promotions affect top-line sales.</li>
          <li>Estimating profit and margin for unit-cost businesses.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between gross and net revenue?</Typography>
      <Typography variant="body1">
        Gross revenue is total sales before any deductions. Net revenue subtracts discounts and returns (and here adds other income) to reflect what you realistically collect.
      </Typography>
      <Typography variant="h3">How is profit margin calculated?</Typography>
      <Typography variant="body1">
        Profit margin is profit divided by net revenue, multiplied by 100. It shows what percentage of each revenue dollar is retained after covering the cost of goods sold.
      </Typography>
      <Typography variant="h3">Should I use monthly or yearly figures?</Typography>
      <Typography variant="body1">
        Use whichever matches your planning horizon. The numbers scale identically given the same units, price, and cost — the toggle simply labels the results. Choose monthly for short-term budgeting and yearly for annual forecasts.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/revenue-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField select label="Period" value={period} onChange={(e) => setPeriod(e.target.value as 'monthly' | 'yearly')} fullWidth>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </TextField>
          <TextField label="Units Sold" type="number" value={units} onChange={(e) => setUnits(e.target.value)} fullWidth />
          <TextField label="Price per Unit" type="number" value={price} onChange={(e) => setPrice(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Other Revenue (optional)" type="number" value={other} onChange={(e) => setOther(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
          <TextField label="Discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <TextField label="Cost per Unit (optional)" type="number" value={costPerUnit} onChange={(e) => setCostPerUnit(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Net Revenue</Typography>
            <Typography variant="h3" fontWeight="bold">{money.format(result.netRevenue)}</Typography>
            <Typography variant="body2">per {periodLabel}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Gross Revenue</Typography>
            <Typography fontWeight={600}>{money.format(result.grossRevenue)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Discount Amount</Typography>
            <Typography fontWeight={600}>−{money.format(result.discountAmount)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Other Revenue</Typography>
            <Typography fontWeight={600}>+{money.format(result.otherRevenue)}</Typography>
          </Paper>
          {result.cost > 0 ? (
            <>
              <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Total Cost ({nf0.format(result.numUnits)} units × {money.format(result.cost)})</Typography>
                <Typography fontWeight={600}>&minus;{money.format(result.totalCost)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Profit</Typography>
                <Typography fontWeight={600}>{money.format(result.profit ?? 0)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Profit Margin</Typography>
                <Typography fontWeight={600}>{result.margin !== null ? result.margin.toFixed(1) : '0.0'}%</Typography>
              </Paper>
            </>
          ) : (
            <Paper sx={{ p: 2, bgcolor: 'action.hover' }}>
              <Typography variant="body2" color="text.secondary">
                Enter a cost per unit to see profit and margin.
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default RevenueCalculator;
