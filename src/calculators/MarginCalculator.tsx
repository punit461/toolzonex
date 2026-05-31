'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const MarginCalculatorContent = () => {
  const [cost, setCost] = useState<string>('100');
  const [revenue, setRevenue] = useState<string>('150');
  
  const [grossProfit, setGrossProfit] = useState<string>('50');
  const [margin, setMargin] = useState<string>('33.33');
  const [markup, setMarkup] = useState<string>('50.00');

  // We need a stable way to calculate. Let's calculate from Cost & Revenue by default
  const calculateFromCostAndRevenue = (c: number, r: number) => {
    const profit = r - c;
    const marg = r > 0 ? (profit / r) * 100 : 0;
    const mark = c > 0 ? (profit / c) * 100 : 0;
    
    setGrossProfit(profit.toFixed(2));
    setMargin(marg.toFixed(2));
    setMarkup(mark.toFixed(2));
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCost(val);
    const c = parseFloat(val);
    const r = parseFloat(revenue);
    if (!isNaN(c) && !isNaN(r)) {
      calculateFromCostAndRevenue(c, r);
    }
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRevenue(val);
    const c = parseFloat(cost);
    const r = parseFloat(val);
    if (!isNaN(c) && !isNaN(r)) {
      calculateFromCostAndRevenue(c, r);
    }
  };

  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMargin(val);
    const m = parseFloat(val);
    const c = parseFloat(cost);
    if (!isNaN(m) && !isNaN(c) && m < 100) {
      // Revenue = Cost / (1 - Margin/100)
      const r = c / (1 - m / 100);
      setRevenue(r.toFixed(2));
      const profit = r - c;
      setGrossProfit(profit.toFixed(2));
      const mark = c > 0 ? (profit / c) * 100 : 0;
      setMarkup(mark.toFixed(2));
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Cost ($)"
          type="number"
          value={cost}
          onChange={handleCostChange}
          fullWidth
        />
        <TextField
          label="Revenue / Selling Price ($)"
          type="number"
          value={revenue}
          onChange={handleRevenueChange}
          fullWidth
        />
        <TextField
          label="Gross Margin (%)"
          type="number"
          value={margin}
          onChange={handleMarginChange}
          fullWidth
          helperText="Edit margin to recalculate Revenue"
        />
      </Box>

      {/* Output Panel */}
      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Results Overview</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Gross Profit</Typography>
            <Typography variant="h6" fontWeight="bold">${grossProfit}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">Gross Margin</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{margin}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" color="text.secondary">Markup</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{markup}%</Typography>
          </Paper>
        </Box>
      </Box>

    </Box>
  );
};

const MarginCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Margin vs Markup</Typography>
      <Typography variant="body1">
        **Margin** (Gross Margin) is the percentage of revenue that is profit. 
        `Margin = (Revenue - Cost) / Revenue * 100`
        <br/><br/>
        **Markup** is the percentage applied to the cost price to reach the selling price.
        `Markup = (Revenue - Cost) / Cost * 100`
        <br/><br/>
        Use this tool to find your gross profit, margin, and markup instantly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Margin Calculator"
      description="Calculate gross profit, profit margin, and markup percentage instantly. Free online margin calculator for businesses."
      url="/utilities/margin-calculator"
      content={content}
      category="Utilities"
    >
      <MarginCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MarginCalculator;
