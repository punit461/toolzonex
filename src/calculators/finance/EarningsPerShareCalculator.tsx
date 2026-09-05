'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);

const EarningsPerShareCalculator = () => {
  const [netIncome, setNetIncome] = useState('5000000');
  const [preferredDividends, setPreferredDividends] = useState('200000');
  const [shares, setShares] = useState('2000000');

  const result = useMemo(() => {
    const ni = parseFloat(netIncome) || 0;
    const pd = parseFloat(preferredDividends) || 0;
    const s = parseFloat(shares) || 0;

    const available = ni - pd;
    const eps = s > 0 ? available / s : 0;

    return { available, eps };
  }, [netIncome, preferredDividends, shares]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Earnings Per Share (EPS) Calculator</Typography>
      <Typography variant="body1">
        Enter a company&apos;s net income, any preferred dividends paid out, and the weighted average number of
        common shares outstanding during the period. Preferred dividends are subtracted first because that
        income belongs to preferred shareholders, not common shareholders — what&apos;s left is divided across
        the weighted average share count to get earnings per common share.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        EPS = (Net Income − Preferred Dividends) / Weighted Average Shares Outstanding
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company reports $5,000,000 in net income and paid $200,000 in preferred dividends, with a weighted
        average of 2,000,000 common shares outstanding during the year. Earnings available to common
        shareholders is $4,800,000, giving an EPS of $4,800,000 / 2,000,000 = $2.40 per share.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing a company&apos;s profitability per share across different reporting periods.</li>
          <li>Feeding EPS into other valuation metrics like the P/E ratio.</li>
          <li>Evaluating how new share issuance or a buyback would dilute or boost per-share earnings.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why subtract preferred dividends?</strong> Preferred shareholders have a priority claim on dividends before common shareholders. EPS specifically measures earnings attributable to common stock, so preferred dividends are removed from net income first.</li>
          <li><strong>What is "weighted average shares outstanding"?</strong> It&apos;s the average number of shares outstanding over the reporting period, weighted by how long each share count was in effect — this accounts for shares issued or repurchased partway through the period rather than just using the ending share count.</li>
          <li><strong>What is the difference between basic and diluted EPS?</strong> Basic EPS uses actual shares outstanding, as calculated here. Diluted EPS also factors in potential shares from options, warrants, and convertible securities, which typically makes diluted EPS slightly lower than basic EPS.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/earnings-per-share-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Net Income" type="number" value={netIncome}
            onChange={(e) => setNetIncome(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Preferred Dividends" type="number" value={preferredDividends}
            onChange={(e) => setPreferredDividends(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Weighted Average Shares Outstanding" type="number" value={shares}
            onChange={(e) => setShares(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Earnings Per Share</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.eps)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Earnings Available to Common Shareholders</Typography>
            <Typography fontWeight={600}>{money(result.available)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EarningsPerShareCalculator;
