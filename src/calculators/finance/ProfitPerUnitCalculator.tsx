'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const ProfitPerUnitCalculator = () => {
  const [sellingPrice, setSellingPrice] = useState('25');
  const [costPerUnit, setCostPerUnit] = useState('15');
  const [unitsSold, setUnitsSold] = useState('200');

  const { profitPerUnit, totalProfit, marginPercent } = useMemo(() => {
    const price = parseFloat(sellingPrice) || 0;
    const cost = parseFloat(costPerUnit) || 0;
    const units = parseFloat(unitsSold) || 0;

    const perUnit = price - cost;
    return {
      profitPerUnit: perUnit,
      totalProfit: perUnit * units,
      marginPercent: price > 0 ? (perUnit / price) * 100 : 0,
    };
  }, [sellingPrice, costPerUnit, unitsSold]);

  const content = (
    <>
      <Typography variant="h2">How Profit Per Unit Is Calculated</Typography>
      <Typography variant="body1">
        Profit per unit tells you exactly how much you keep from selling a single item, before multiplying by
        volume — a view that&apos;s especially useful for small businesses, e-commerce sellers, and anyone
        comparing profitability across individual products or SKUs. It&apos;s simply the selling price minus
        the cost to produce or acquire one unit, then scaled up by units sold to see total profit. This is
        distinct from a whole-business gross profit calculation, which works from total revenue and total cost
        of goods sold across every product combined.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Profit Per Unit = Selling Price − Cost Per Unit
        <br />
        Total Profit = Profit Per Unit × Units Sold
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A product that sells for $25 and costs $15 to make earns $10 profit per unit, a 40% margin. Selling
        200 units of it generates $2,000 in total profit.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing profitability across individual products or SKUs, not just the whole business.</li>
          <li>Deciding which products in a catalog deserve more marketing spend or shelf space.</li>
          <li>Setting a minimum selling price to hit a target profit margin per item.</li>
          <li>Checking whether a wholesale or bulk discount still leaves an acceptable per-unit profit.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a gross profit calculator?</Typography>
      <Typography variant="body1">
        A gross profit calculator typically works at the whole-business level — total revenue minus total cost
        of goods sold. This tool works at the individual product level, showing profit for one unit and one
        product line, which is more useful when comparing multiple products against each other.
      </Typography>
      <Typography variant="h3">What should I include in cost per unit?</Typography>
      <Typography variant="body1">
        Include everything directly tied to producing or acquiring that one unit — materials, manufacturing or
        wholesale cost, and per-unit packaging or shipping. Shared overhead like rent or salaries is usually
        better handled separately at the business level rather than allocated per unit.
      </Typography>
      <Typography variant="h3">Can profit per unit be negative?</Typography>
      <Typography variant="body1">
        Yes — if your cost per unit exceeds your selling price, you&apos;re losing money on every sale of that
        product, which is an important signal to raise prices, cut costs, or discontinue the product line.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/profit-per-unit-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Selling Price Per Unit"
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Cost Per Unit"
            type="number"
            value={costPerUnit}
            onChange={(e) => setCostPerUnit(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Units Sold"
            type="number"
            value={unitsSold}
            onChange={(e) => setUnitsSold(e.target.value)}
            fullWidth
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Profit</Typography>
            <Typography variant="h3" fontWeight="bold">{money(totalProfit)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Profit Per Unit</Typography>
            <Typography fontWeight={600}>{money(profitPerUnit)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Profit Margin</Typography>
            <Typography fontWeight={600}>{marginPercent.toFixed(1)}%</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ProfitPerUnitCalculator;
