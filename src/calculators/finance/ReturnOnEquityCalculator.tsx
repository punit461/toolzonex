'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ReturnOnEquityCalculator = () => {
  const [netIncome, setNetIncome] = useState('120000');
  const [shareholderEquity, setShareholderEquity] = useState('800000');

  const roe = useMemo(() => {
    const ni = parseFloat(netIncome) || 0;
    const se = parseFloat(shareholderEquity) || 0;
    return se > 0 ? (ni / se) * 100 : 0;
  }, [netIncome, shareholderEquity]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Return on Equity (ROE) Calculator</Typography>
      <Typography variant="body1">
        Enter a company&apos;s net income and shareholder equity to calculate return on equity (ROE) — a
        profitability ratio that measures how much profit a company generates for every dollar shareholders
        have invested. Unlike return on assets, ROE looks only at the equity portion of a company&apos;s
        financing, so it&apos;s directly affected by how much of the company&apos;s assets are debt-financed
        versus equity-financed.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        ROE = (Net Income ÷ Shareholder Equity) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with {money(120000)} in net income and {money(800000)} in shareholder equity has an ROE of
        (120,000 ÷ 800,000) × 100 = 15%, meaning it generates 15 cents of profit for every dollar shareholders
        have invested.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Evaluating how efficiently a company turns shareholder investment into profit.</li>
          <li>Comparing ROE across companies as part of stock investment research.</li>
          <li>Tracking how a company&apos;s profitability to shareholders changes over time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How does ROE relate to Return on Assets (ROA)?</strong> ROE measures return specifically on shareholders&apos; equity — the portion of financing owners actually contributed. ROA measures return on ALL assets a company controls, regardless of financing source. Because debt-financed assets still generate income but aren&apos;t counted in the equity base, a leveraged company (one financed heavily with debt) typically shows a higher ROE than ROA — leverage amplifies ROE without necessarily improving underlying asset efficiency.</li>
          <li><strong>Can a high ROE be a warning sign?</strong> Yes — an unusually high ROE can sometimes result from heavy debt financing (leverage) rather than genuinely strong operations, or from a company with very little equity due to buybacks or accumulated losses. Compare ROE alongside ROA and debt levels to get the full picture.</li>
          <li><strong>What's a typical "good" ROE?</strong> It varies by industry, but ROE in the 15-20% range is often considered strong for many sectors. Compare a company's ROE against close industry peers rather than a single universal benchmark, since capital intensity differs widely across industries.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/return-on-equity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Net Income" type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Shareholder Equity" type="number" value={shareholderEquity} onChange={(e) => setShareholderEquity(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Return on Equity (ROE)</Typography>
            <Typography variant="h3" fontWeight="bold">{roe.toFixed(2)}%</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReturnOnEquityCalculator;
