'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'derive' | 'direct';

const PriceToBookRatioCalculator = () => {
  const [mode, setMode] = useState<Mode>('derive');
  const [sharePrice, setSharePrice] = useState('45');
  const [equity, setEquity] = useState('80000000');
  const [shares, setShares] = useState('10000000');
  const [bookValuePerShare, setBookValuePerShare] = useState('8');

  const result = useMemo(() => {
    const price = parseFloat(sharePrice) || 0;
    let bvps: number;
    if (mode === 'derive') {
      const eq = parseFloat(equity) || 0;
      const sh = parseFloat(shares) || 0;
      bvps = sh > 0 ? eq / sh : 0;
    } else {
      bvps = parseFloat(bookValuePerShare) || 0;
    }
    const pb = bvps > 0 ? price / bvps : 0;
    return { bvps, pb };
  }, [mode, sharePrice, equity, shares, bookValuePerShare]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Price to Book (P/B) Ratio Calculator</Typography>
      <Typography variant="body1">
        Enter the current share price, then choose how to supply book value per share. In the default mode,
        enter total shareholder equity and shares outstanding and the calculator derives book value per share
        for you. Or switch to direct entry if you already know the book value per share figure (for example
        from a stock screener) and want to enter it straight in.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Book Value Per Share = Total Shareholder Equity / Shares Outstanding
        <br />
        P/B Ratio = Share Price / Book Value Per Share
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company has $80,000,000 in total shareholder equity and 10,000,000 shares outstanding, giving a book
        value per share of $8. If the stock trades at $45 per share, the P/B ratio is 45 / 8 = 5.625, meaning
        the market values the company at over 5.6 times its book value.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Screening for potentially undervalued stocks trading close to or below book value.</li>
          <li>Comparing valuation across companies in asset-heavy industries like banking or real estate.</li>
          <li>Checking how a stock&apos;s valuation has changed relative to its underlying net asset value over time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does a P/B ratio below 1 mean?</strong> It suggests the stock trades for less than the accounting value of its net assets, which some value investors see as a potential bargain — though it can also signal the market expects continued losses or asset write-downs.</li>
          <li><strong>Is a high P/B ratio always bad?</strong> Not necessarily. Companies with strong intangible assets, brand value, or high-growth prospects — like many technology or software companies — often trade at a high P/B ratio because book value doesn&apos;t capture their true earning power.</li>
          <li><strong>Which industries is P/B most useful for?</strong> It&apos;s most meaningful for asset-heavy, capital-intensive businesses such as banks, insurers, and real estate companies, where book value closely tracks tangible net worth. It&apos;s less useful for service or tech companies with few physical assets.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/price-to-book-ratio-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Share Price" type="number" value={sharePrice}
            onChange={(e) => setSharePrice(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />

          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} fullWidth>
            <ToggleButton value="derive">Derive from Equity</ToggleButton>
            <ToggleButton value="direct">Enter Book Value Directly</ToggleButton>
          </ToggleButtonGroup>

          {mode === 'derive' ? (
            <>
              <TextField
                label="Total Shareholder Equity" type="number" value={equity}
                onChange={(e) => setEquity(e.target.value)} onFocus={(e) => e.target.select()}
                fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
              />
              <TextField
                label="Shares Outstanding" type="number" value={shares}
                onChange={(e) => setShares(e.target.value)} onFocus={(e) => e.target.select()}
                fullWidth
              />
            </>
          ) : (
            <TextField
              label="Book Value Per Share" type="number" value={bookValuePerShare}
              onChange={(e) => setBookValuePerShare(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">P/B Ratio</Typography>
            <Typography variant="h3" fontWeight="bold">{result.pb.toFixed(2)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Book Value Per Share</Typography>
            <Typography fontWeight={600}>${result.bvps.toFixed(2)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PriceToBookRatioCalculator;
