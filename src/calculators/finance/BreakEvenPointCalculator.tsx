'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const BreakEvenPointCalculator = () => {
  const [fixedCosts, setFixedCosts] = useState('20000');
  const [pricePerUnit, setPricePerUnit] = useState('50');
  const [variableCost, setVariableCost] = useState('30');

  const { contributionMargin, breakEvenUnits, breakEvenRevenue, valid } = useMemo(() => {
    const fixed = parseFloat(fixedCosts) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    const variable = parseFloat(variableCost) || 0;
    const margin = price - variable;
    const isValid = margin > 0;
    const units = isValid ? fixed / margin : 0;
    return {
      contributionMargin: margin,
      breakEvenUnits: units,
      breakEvenRevenue: units * price,
      valid: isValid,
    };
  }, [fixedCosts, pricePerUnit, variableCost]);

  const content = (
    <>
      <Typography variant="h2">How Break-Even Point Is Calculated</Typography>
      <Typography variant="body1">
        The break-even point is the number of units you need to sell for total revenue to exactly cover total
        costs — the point where profit is zero. It depends on your fixed costs (rent, salaries, and other
        costs that don&apos;t change with volume), the price per unit, and the variable cost per unit
        (materials, direct labor).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Contribution Margin = Price per Unit − Variable Cost per Unit
        <br />
        Break-Even Units = Fixed Costs ÷ Contribution Margin
        <br />
        Break-Even Revenue = Break-Even Units × Price per Unit
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With $20,000 in fixed costs, a $50 price per unit, and a $30 variable cost per unit, the contribution
        margin is $20. Break-even units = 20,000 ÷ 20 = 1,000 units, generating break-even revenue of
        1,000 × $50 = $50,000. Selling beyond 1,000 units starts generating profit.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a minimum sales target before launching a new product.</li>
          <li>Deciding whether a proposed price covers costs at a realistic sales volume.</li>
          <li>Evaluating how a change in fixed or variable costs shifts the break-even point.</li>
          <li>Comparing pricing strategies for their impact on required sales volume.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens if variable cost is higher than the price?</Typography>
      <Typography variant="body1">
        If the variable cost per unit equals or exceeds the price, the contribution margin is zero or
        negative, meaning every unit sold loses money and break-even is mathematically impossible — the price
        needs to be raised or costs cut.
      </Typography>
      <Typography variant="h3">What counts as a fixed cost versus a variable cost?</Typography>
      <Typography variant="body1">
        Fixed costs stay the same regardless of sales volume, like rent, salaried staff, and insurance.
        Variable costs scale directly with units sold, like raw materials, packaging, and sales commissions.
      </Typography>
      <Typography variant="h3">Does break-even analysis guarantee profitability?</Typography>
      <Typography variant="body1">
        No — it only tells you the point where profit is zero. Actual profitability depends on hitting or
        exceeding that sales volume consistently, along with managing costs and demand over time.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/break-even-point-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Fixed Costs"
            type="number"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Price per Unit"
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Variable Cost per Unit"
            type="number"
            value={variableCost}
            onChange={(e) => setVariableCost(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          {valid ? (
            <>
              <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="body2">Break-Even Units</Typography>
                <Typography variant="h3" fontWeight="bold">{Math.ceil(breakEvenUnits).toLocaleString()}</Typography>
              </Paper>
              <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Break-Even Revenue</Typography>
                <Typography fontWeight={600}>{fmt(breakEvenRevenue)}</Typography>
              </Paper>
              <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Contribution Margin per Unit</Typography>
                <Typography fontWeight={600}>{fmt(contributionMargin)}</Typography>
              </Paper>
            </>
          ) : (
            <Alert severity="error">
              The price per unit must be greater than the variable cost per unit for a break-even point to
              exist.
            </Alert>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BreakEvenPointCalculator;
