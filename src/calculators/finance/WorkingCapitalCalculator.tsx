'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const WorkingCapitalCalculator = () => {
  const [assets, setAssets] = useState('250000');
  const [liabilities, setLiabilities] = useState('150000');

  const { workingCapital, currentRatio, band, bandColor } = useMemo(() => {
    const a = parseFloat(assets) || 0;
    const l = parseFloat(liabilities) || 0;
    const wc = a - l;
    const ratio = l > 0 ? a / l : 0;

    let bandLabel = 'Enter values to see interpretation';
    let color: 'success' | 'warning' | 'error' | 'info' = 'info';
    if (l > 0) {
      if (ratio < 1) {
        bandLabel = 'Below 1.0 — potential liquidity risk. Current liabilities exceed current assets, which can strain short-term operations.';
        color = 'error';
      } else if (ratio <= 2) {
        bandLabel = 'Between 1.0 and 2.0 — generally healthy. The business can comfortably cover its short-term obligations.';
        color = 'success';
      } else {
        bandLabel = 'Above 2.0 — strong liquidity, but a very high ratio can also mean idle cash or inventory that could be put to better use.';
        color = 'warning';
      }
    }
    return { workingCapital: wc, currentRatio: ratio, band: bandLabel, bandColor: color };
  }, [assets, liabilities]);

  const content = (
    <>
      <Typography variant="h2">How Working Capital Is Calculated</Typography>
      <Typography variant="body1">
        Working capital measures a business&apos;s short-term financial health — its ability to cover
        day-to-day obligations. Enter current assets (cash, receivables, inventory) and current liabilities
        (payables, short-term debt) to see the working capital amount and the current ratio.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Working Capital = Current Assets − Current Liabilities
        <br />
        Current Ratio = Current Assets ÷ Current Liabilities
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with $250,000 in current assets and $150,000 in current liabilities has working capital of
        $100,000 and a current ratio of 1.67 — comfortably in the healthy range, meaning it has $1.67 in
        short-term assets for every $1 of short-term debt.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing whether a business can meet its short-term obligations.</li>
          <li>Comparing liquidity across competitors or over time.</li>
          <li>Supporting loan applications and investor due diligence.</li>
          <li>Spotting early warning signs of cash-flow trouble.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What counts as a current asset or current liability?</Typography>
      <Typography variant="body1">
        Current assets are cash and items expected to convert to cash within a year — cash, accounts
        receivable, and inventory. Current liabilities are obligations due within a year, such as accounts
        payable, short-term loans, and accrued expenses.
      </Typography>
      <Typography variant="h3">Is negative working capital always bad?</Typography>
      <Typography variant="body1">
        Usually it signals liquidity risk, but some business models (high-volume retailers with fast
        inventory turnover) operate with negative working capital by design. Context and industry norms
        matter.
      </Typography>
      <Typography variant="h3">What is considered a good current ratio?</Typography>
      <Typography variant="body1">
        A ratio between 1.5 and 2.0 is generally considered healthy for most industries. Below 1.0 suggests
        potential trouble covering short-term debts, while a very high ratio can indicate underused assets.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/working-capital-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Current Assets"
            type="number"
            value={assets}
            onChange={(e) => setAssets(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Current Liabilities"
            type="number"
            value={liabilities}
            onChange={(e) => setLiabilities(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: workingCapital >= 0 ? 'primary.main' : 'error.main', color: 'white' }}>
            <Typography variant="body2">Working Capital</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(workingCapital)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Current Ratio</Typography>
            <Typography fontWeight={600}>{currentRatio.toFixed(2)}</Typography>
          </Paper>
          <Alert severity={bandColor}>{band}</Alert>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WorkingCapitalCalculator;
