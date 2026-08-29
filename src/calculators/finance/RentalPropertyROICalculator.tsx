'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const RentalPropertyROICalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState('300000');
  const [annualRent, setAnnualRent] = useState('30000');
  const [annualExpenses, setAnnualExpenses] = useState('9000');

  const { noi, roi, expenseRatio } = useMemo(() => {
    const price = parseFloat(purchasePrice) || 0;
    const rent = parseFloat(annualRent) || 0;
    const expenses = parseFloat(annualExpenses) || 0;

    const netOperatingIncome = rent - expenses;
    const returnOnInvestment = price > 0 ? (netOperatingIncome / price) * 100 : 0;
    const ratio = rent > 0 ? (expenses / rent) * 100 : 0;

    return { noi: netOperatingIncome, roi: returnOnInvestment, expenseRatio: ratio };
  }, [purchasePrice, annualRent, annualExpenses]);

  const content = (
    <>
      <Typography variant="h2">How Rental Property ROI Is Calculated</Typography>
      <Typography variant="body1">
        This calculator measures a rental property&apos;s actual return after operating costs, not just
        its gross rent. Subtract annual expenses — maintenance, property tax, insurance, and other
        recurring costs — from annual rental income to get net operating income (NOI). Dividing NOI by
        the purchase price gives a net ROI percentage that reflects the real cash a property produces
        relative to what you paid for it.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        NOI = Annual Rental Income − Annual Expenses
        <br />
        ROI = (NOI / Purchase Price) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A property bought for $300,000 that generates $30,000 in annual rent with $9,000 in annual
        expenses (maintenance, tax, insurance) has an NOI of $21,000 — a net ROI of 7%. That&apos;s the
        figure to compare against other properties or investment options, since it already accounts for
        the cost of running the property.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Screening rental properties on a true after-expense return, not just gross yield.</li>
          <li>Comparing multiple properties with different expense structures on equal footing.</li>
          <li>Deciding whether rising maintenance or tax costs still leave an acceptable return.</li>
          <li>Benchmarking rental ROI against stocks, bonds, or other investment classes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from rental yield?</Typography>
      <Typography variant="body1">
        A basic rental yield calculation often only looks at gross rent against price. This calculator
        deliberately subtracts operating expenses first, producing net operating income and a net ROI
        that better reflects actual profitability — useful once you know your real running costs.
      </Typography>
      <Typography variant="h3">What counts as an annual expense here?</Typography>
      <Typography variant="body1">
        Include maintenance and repairs, property tax, insurance, property management fees, and any
        other recurring holding costs. Leave out the mortgage payment itself if you want to see the
        property&apos;s unlevered return before financing costs.
      </Typography>
      <Typography variant="h3">What&apos;s considered a good ROI for a rental property?</Typography>
      <Typography variant="body1">
        Many investors target a net ROI (or cap rate) of 6-10%, though acceptable ranges vary widely by
        market, property type, and how much appreciation potential is factored in separately.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/rental-property-roi-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Property Purchase Price"
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Annual Rental Income"
            type="number"
            value={annualRent}
            onChange={(e) => setAnnualRent(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Annual Expenses"
            type="number"
            value={annualExpenses}
            onChange={(e) => setAnnualExpenses(e.target.value)}
            helperText="Maintenance, property tax, insurance, and other annual costs."
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Net ROI</Typography>
            <Typography variant="h3" fontWeight="bold">{roi.toFixed(2)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Net Operating Income</Typography>
            <Typography fontWeight={600}>{fmt(noi)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Expense Ratio</Typography>
            <Typography fontWeight={600}>{expenseRatio.toFixed(1)}% of rent</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RentalPropertyROICalculator;
