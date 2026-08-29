'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const DividendYieldCalculator = () => {
  const [dividendPerShare, setDividendPerShare] = useState('2.50');
  const [sharePrice, setSharePrice] = useState('80');

  const { yieldPct, quarterlyEstimate } = useMemo(() => {
    const dps = parseFloat(dividendPerShare) || 0;
    const price = parseFloat(sharePrice) || 0;
    return {
      yieldPct: price > 0 ? (dps / price) * 100 : 0,
      quarterlyEstimate: dps / 4,
    };
  }, [dividendPerShare, sharePrice]);

  const content = (
    <>
      <Typography variant="h2">How Dividend Yield Is Calculated</Typography>
      <Typography variant="body1">
        Dividend yield measures the annual dividend income a stock pays relative to its current share price,
        expressed as a percentage. Enter the annual dividend per share and the current share price to see the
        yield.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Dividend Yield (%) = (Annual Dividend per Share ÷ Share Price) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A stock paying $2.50 per share annually and trading at $80 has a dividend yield of (2.50 ÷ 80) × 100 =
        3.125%. If dividends are paid quarterly, each payment would be roughly $0.625 per share.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing income potential across dividend-paying stocks.</li>
          <li>Screening for income-focused investments in a portfolio.</li>
          <li>Tracking how yield changes as a stock&apos;s price moves.</li>
          <li>Evaluating whether a high yield reflects strong income or a falling share price.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does dividend yield change without the dividend changing?</Typography>
      <Typography variant="body1">
        Yield is calculated against the current share price, so it moves inversely with price even if the
        dividend payment itself stays flat. A falling stock price pushes the yield up, and a rising price
        pushes it down.
      </Typography>
      <Typography variant="h3">Is a higher dividend yield always better?</Typography>
      <Typography variant="body1">
        Not necessarily. An unusually high yield can signal that the market expects the dividend to be cut, or
        that the share price has dropped sharply due to underlying business problems. Check the company&apos;s
        payout ratio and financial health before assuming a high yield is a bargain.
      </Typography>
      <Typography variant="h3">Does dividend yield include stock buybacks?</Typography>
      <Typography variant="body1">
        No — dividend yield only reflects cash dividends paid per share. Buybacks return value to
        shareholders differently and aren&apos;t part of this calculation.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/dividend-yield-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Annual Dividend per Share"
            type="number"
            value={dividendPerShare}
            onChange={(e) => setDividendPerShare(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Current Share Price"
            type="number"
            value={sharePrice}
            onChange={(e) => setSharePrice(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Dividend Yield</Typography>
            <Typography variant="h3" fontWeight="bold">{yieldPct.toFixed(2)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Est. Quarterly Payment</Typography>
            <Typography fontWeight={600}>{fmt(quarterlyEstimate)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DividendYieldCalculator;
