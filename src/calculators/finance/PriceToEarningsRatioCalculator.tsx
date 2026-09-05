'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PriceToEarningsRatioCalculatorContent = () => {
  const [price, setPrice] = useState('150');
  const [eps, setEps] = useState('6');

  const p = parseFloat(price);
  const e = parseFloat(eps);
  const valid = !isNaN(p) && !isNaN(e) && e !== 0;
  const peRatio = valid ? p / e : 0;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Share Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
        <TextField
          label="Earnings Per Share (EPS)"
          type="number"
          value={eps}
          onChange={(e) => setEps(e.target.value)}
          fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
        />
      </Stack>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Price-to-Earnings (P/E) Ratio</Typography>
          <Typography variant="h4" fontWeight="bold">{valid ? `${peRatio.toFixed(2)}×` : '—'}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const PriceToEarningsRatioCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Price-to-Earnings (P/E) Ratio Calculator</Typography>
      <Typography variant="body1">
        Enter a stock&apos;s current share price and its earnings per share (EPS) to calculate its
        price-to-earnings ratio — one of the most commonly cited valuation metrics in investing. The P/E
        ratio expresses how many dollars investors are currently paying for each dollar of the
        company&apos;s reported earnings.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        P/E Ratio = Share Price ÷ Earnings Per Share (EPS)
      </Box>
      <Typography variant="body1">
        In general terms, a higher P/E can suggest the market expects stronger future growth from the
        company (or that the stock may be overvalued relative to its current earnings), while a lower P/E
        can suggest the stock is undervalued (or that the market expects slower growth ahead). This is
        general education, not investment advice — what counts as a &quot;high&quot; or &quot;low&quot; P/E
        varies a great deal by industry and sector, so comparing a P/E ratio only makes sense against similar
        companies or the company&apos;s own historical average.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A stock trading at $150 per share with earnings per share of $6 has a P/E ratio of 25 — meaning
        investors are paying $25 for every $1 of the company&apos;s current annual earnings.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a quick valuation snapshot for a stock before researching it further.</li>
          <li>Comparing the relative valuation of two companies within the same industry.</li>
          <li>Tracking how a company&apos;s own P/E ratio has changed over time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What counts as a &quot;good&quot; P/E ratio?</strong> There&apos;s no single universal answer — reasonable P/E ranges vary a lot by industry and sector, and a ratio that looks high in one industry might be perfectly normal in a faster-growing one. Always compare against similar companies rather than a fixed number.</li>
          <li><strong>What does a negative P/E ratio mean?</strong> A negative P/E happens when a company has negative earnings (a net loss), which makes the ratio less meaningful as a valuation tool for that period — investors often look at other metrics for unprofitable companies.</li>
          <li><strong>Is this financial advice?</strong> No — this tool is for general education only. It doesn&apos;t account for growth expectations, debt, industry context, or any other factors that go into a real investment decision, and shouldn&apos;t be used as the sole basis for buying or selling a stock.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/price-to-earnings-ratio-calculator" content={content}>
      <PriceToEarningsRatioCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PriceToEarningsRatioCalculator;
