'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const CPCCalculator = () => {
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [adSpend, setAdSpend] = useState('2000');
  const [clicks, setClicks] = useState('800');
  const [cpc, setCpc] = useState('2.50');
  const [clicksReverse, setClicksReverse] = useState('800');

  const forwardResult = useMemo(() => {
    const spend = parseFloat(adSpend) || 0;
    const c = parseFloat(clicks) || 0;
    return c > 0 ? spend / c : 0;
  }, [adSpend, clicks]);

  const reverseResult = useMemo(() => {
    const rate = parseFloat(cpc) || 0;
    const c = parseFloat(clicksReverse) || 0;
    return rate * c;
  }, [cpc, clicksReverse]);

  const content = (
    <>
      <Typography variant="h2">How Cost Per Click Is Calculated</Typography>
      <Typography variant="body1">
        Cost per click (CPC) is the average amount you pay for each click on an ad. Use forward mode to find
        CPC from total spend and clicks, or reverse mode to estimate total spend from a known CPC and click
        count — useful for forecasting a campaign budget.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        CPC = Total Ad Spend ÷ Total Clicks
        <br />
        Total Spend = CPC × Total Clicks
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Spending $2,000 on a campaign that gets 800 clicks gives a CPC of 2,000 ÷ 800 = $2.50. Reversing it,
        budgeting for 800 clicks at an expected $2.50 CPC means planning to spend about $2,000.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking the average CPC of a completed ad campaign.</li>
          <li>Forecasting ad budget needed to hit a target number of clicks.</li>
          <li>Comparing CPC across keywords, ad groups, or platforms.</li>
          <li>Setting realistic bid limits in pay-per-click campaigns.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a good CPC?</Typography>
      <Typography variant="body1">
        It varies enormously by industry and platform — some keywords cost cents, while highly competitive
        ones (like legal or insurance terms) can cost tens of dollars per click. Compare CPC against your
        conversion rate and average order value to judge whether it&apos;s profitable.
      </Typography>
      <Typography variant="h3">Is CPC the same as cost per acquisition (CPA)?</Typography>
      <Typography variant="body1">
        No. CPC only measures the cost of a click, not whether that click leads to a sale or sign-up. CPA
        divides total spend by conversions instead of clicks, giving a more direct measure of acquisition
        cost.
      </Typography>
      <Typography variant="h3">How does CPC relate to ROAS?</Typography>
      <Typography variant="body1">
        A lower CPC generally makes it easier to achieve a higher{' '}
        <a href="/finance/roas-calculator">Return on Ad Spend (ROAS)</a>, since you&apos;re paying less to
        generate the same amount of traffic and potential revenue.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/cpc-calculator" content={content}>
      <ToggleButtonGroup value={mode} exclusive onChange={(_, val) => val && setMode(val)} size="small" fullWidth sx={{ mb: 3 }}>
        <ToggleButton value="forward">Spend + Clicks → CPC</ToggleButton>
        <ToggleButton value="reverse">CPC + Clicks → Spend</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'forward' ? (
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
              label="Total Clicks"
              type="number"
              value={clicks}
              onChange={(e) => setClicks(e.target.value)}
              fullWidth
            />
          </Box>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', alignSelf: 'center' }}>
            <Typography variant="body2">Cost Per Click</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(forwardResult)}</Typography>
          </Paper>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Cost Per Click"
              type="number"
              value={cpc}
              onChange={(e) => setCpc(e.target.value)}
              fullWidth
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
            <TextField
              label="Total Clicks"
              type="number"
              value={clicksReverse}
              onChange={(e) => setClicksReverse(e.target.value)}
              fullWidth
            />
          </Box>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', alignSelf: 'center' }}>
            <Typography variant="body2">Total Ad Spend</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(reverseResult)}</Typography>
          </Paper>
        </Box>
      )}

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CPCCalculator;
