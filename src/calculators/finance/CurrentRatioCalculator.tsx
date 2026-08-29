'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CurrentRatioCalculator = () => {
  const [assets, setAssets] = useState('180000');
  const [liabilities, setLiabilities] = useState('90000');

  const { ratio, band, bandColor } = useMemo(() => {
    const a = parseFloat(assets) || 0;
    const l = parseFloat(liabilities) || 0;
    const r = l > 0 ? a / l : 0;

    let bandLabel = 'Enter values to see interpretation';
    let color: 'success' | 'warning' | 'error' | 'info' = 'info';
    if (l > 0) {
      if (r < 1) {
        bandLabel = 'Below 1.0 — potential concern. Current liabilities exceed current assets, which can signal difficulty meeting short-term obligations.';
        color = 'error';
      } else if (r <= 1.5) {
        bandLabel = 'Between 1.0 and 1.5 — acceptable, but with limited cushion. Worth monitoring closely.';
        color = 'warning';
      } else if (r <= 3) {
        bandLabel = 'Between 1.5 and 3.0 — generally healthy liquidity for most industries.';
        color = 'success';
      } else {
        bandLabel = 'Above 3.0 — very strong liquidity, though it may also suggest excess assets not being put to productive use.';
        color = 'warning';
      }
    }
    return { ratio: r, band: bandLabel, bandColor: color };
  }, [assets, liabilities]);

  const content = (
    <>
      <Typography variant="h2">How the Current Ratio Is Calculated</Typography>
      <Typography variant="body1">
        The current ratio is a liquidity measure that shows whether a business has enough short-term assets
        to cover its short-term liabilities. Enter current assets (cash, receivables, inventory) and current
        liabilities (payables, short-term debt) to see the ratio and a health-band interpretation.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Current Ratio = Current Assets ÷ Current Liabilities
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with $180,000 in current assets and $90,000 in current liabilities has a current ratio of
        180,000 ÷ 90,000 = 2.0 — meaning it has $2 in short-term assets for every $1 of short-term
        liabilities, a generally healthy position.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a company&apos;s short-term financial health before investing or lending.</li>
          <li>Tracking liquidity trends over multiple reporting periods.</li>
          <li>Comparing liquidity against competitors in the same industry.</li>
          <li>Supporting loan covenant compliance checks that reference minimum current ratios.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is considered a good current ratio?</Typography>
      <Typography variant="body1">
        A ratio between 1.5 and 3.0 is generally considered healthy for most businesses. Below 1.0 can signal
        liquidity risk, while a very high ratio may indicate the business isn&apos;t deploying its assets
        efficiently.
      </Typography>
      <Typography variant="h3">How is the current ratio different from working capital?</Typography>
      <Typography variant="body1">
        Working capital is the dollar difference between current assets and current liabilities, while the
        current ratio expresses the same relationship as a proportion. Use the{' '}
        <a href="/finance/working-capital-calculator">Working Capital Calculator</a> to see the dollar figure
        alongside this ratio.
      </Typography>
      <Typography variant="h3">Does the current ratio account for how liquid assets actually are?</Typography>
      <Typography variant="body1">
        Not precisely — it treats inventory the same as cash, even though inventory can take longer to
        convert to cash. The quick ratio (which excludes inventory) offers a stricter, more conservative view
        of short-term liquidity.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/current-ratio-calculator" content={content}>
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
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Current Ratio</Typography>
            <Typography variant="h3" fontWeight="bold">{ratio.toFixed(2)}</Typography>
          </Paper>
          <Alert severity={bandColor}>{band}</Alert>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CurrentRatioCalculator;
