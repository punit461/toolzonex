'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DividendPayoutRatioCalculator = () => {
  const [dps, setDps] = useState('1.20');
  const [eps, setEps] = useState('4.00');

  const result = useMemo(() => {
    const d = parseFloat(dps) || 0;
    const e = parseFloat(eps) || 0;
    if (e <= 0) return { valid: false, payout: 0, retention: 0 };

    const payout = (d / e) * 100;
    const retention = 100 - payout;
    return { valid: true, payout, retention };
  }, [dps, eps]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Dividend Payout Ratio Calculator</Typography>
      <Typography variant="body1">
        Enter dividends paid per share and earnings per share (EPS) to see what percentage of a company&apos;s
        earnings is being returned to shareholders as dividends. The remainder — the retention ratio — is the
        share of earnings the company keeps to reinvest in the business, pay down debt, or build cash reserves.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Payout Ratio = (Dividends Per Share / EPS) × 100
        <br />
        Retention Ratio = 100 − Payout Ratio
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company pays $1.20 per share in dividends and reports $4.00 in earnings per share. Payout Ratio =
        (1.20 / 4.00) × 100 = 30%, meaning it pays out 30% of earnings as dividends and retains the other 70%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing how sustainable a company&apos;s dividend is relative to its actual earnings.</li>
          <li>Comparing capital allocation strategy between growth-focused and income-focused companies.</li>
          <li>Screening dividend stocks for payout ratios that leave room for future dividend growth.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What counts as a healthy payout ratio?</strong> It varies by industry and company maturity — mature, stable companies often pay out 40-60% of earnings, while high-growth companies typically retain most or all earnings and pay a low or zero dividend. A payout ratio consistently above 100% (paying out more than is earned) is a warning sign that a dividend cut may be coming.</li>
          <li><strong>How is this different from dividend yield?</strong> Dividend yield divides the annual dividend by the current share price, measuring the cash return relative to what you&apos;d pay for the stock today. Payout ratio instead divides the dividend by earnings per share, measuring what fraction of profit is being distributed — the two use completely different denominators and answer different questions.</li>
          <li><strong>Can I use total dividends and net income instead of per-share figures?</strong> Yes — the ratio comes out the same whether you use total dividends paid divided by net income, or dividends per share divided by earnings per share, as long as you&apos;re consistent and use the same share count basis for both figures.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/dividend-payout-ratio-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Dividends Paid Per Share" type="number" value={dps}
            onChange={(e) => setDps(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Earnings Per Share (EPS)" type="number" value={eps}
            onChange={(e) => setEps(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Dividend Payout Ratio</Typography>
            <Typography variant="h3" fontWeight="bold">{result.valid ? `${result.payout.toFixed(1)}%` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Retention Ratio</Typography>
            <Typography fontWeight={600}>{result.valid ? `${result.retention.toFixed(1)}%` : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DividendPayoutRatioCalculator;
