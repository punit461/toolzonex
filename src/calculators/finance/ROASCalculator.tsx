'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const ROASCalculator = () => {
  const [adSpend, setAdSpend] = useState('5000');
  const [revenue, setRevenue] = useState('20000');

  const { roas, roasPct, profit } = useMemo(() => {
    const spend = parseFloat(adSpend) || 0;
    const rev = parseFloat(revenue) || 0;
    const ratio = spend > 0 ? rev / spend : 0;
    return { roas: ratio, roasPct: ratio * 100, profit: rev - spend };
  }, [adSpend, revenue]);

  const content = (
    <>
      <Typography variant="h2">How ROAS Is Calculated</Typography>
      <Typography variant="body1">
        Return on Ad Spend (ROAS) measures how much revenue you generate for every dollar spent on
        advertising. Enter your total ad spend and the revenue it generated to see your ROAS as both a ratio
        and a percentage.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        ROAS = Revenue ÷ Ad Spend
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Spending $5,000 on ads that generate $20,000 in revenue gives a ROAS of 20,000 ÷ 5,000 = 4, often
        written as &quot;4:1&quot; or 400%. That means every $1 spent on ads returned $4 in revenue.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Evaluating the performance of a specific ad campaign or channel.</li>
          <li>Comparing ROAS across platforms (search, social, display) to allocate budget.</li>
          <li>Setting minimum ROAS targets before scaling ad spend.</li>
          <li>Reporting campaign performance to stakeholders or clients.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a good ROAS?</Typography>
      <Typography variant="body1">
        A commonly cited baseline is 4:1 (400%), meaning $4 in revenue per $1 spent, but the right target
        depends on your profit margins. Low-margin businesses need a higher ROAS to be profitable than
        high-margin ones.
      </Typography>
      <Typography variant="h3">Is ROAS the same as ROI?</Typography>
      <Typography variant="body1">
        No. ROAS compares revenue to ad spend only, while ROI (return on investment) typically factors in all
        costs, including product cost and overhead, to measure actual profit relative to total investment.
      </Typography>
      <Typography variant="h3">Can ROAS be misleading?</Typography>
      <Typography variant="body1">
        Yes — a high ROAS doesn&apos;t guarantee profitability if your product margins are thin or if it
        ignores other costs like fulfillment and returns. Always check ROAS alongside your actual profit
        margins.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/roas-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Ad Spend"
            type="number"
            value={adSpend}
            onChange={(e) => setAdSpend(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Revenue Generated from Ads"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">ROAS</Typography>
            <Typography variant="h3" fontWeight="bold">{roas.toFixed(2)}:1</Typography>
            <Typography variant="body2">{roasPct.toFixed(0)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Revenue Minus Ad Spend</Typography>
            <Typography fontWeight={600}>{fmt(profit)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ROASCalculator;
