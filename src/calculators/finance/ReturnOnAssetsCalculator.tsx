'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (v: number) => `$${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ReturnOnAssetsCalculator = () => {
  const [netIncome, setNetIncome] = useState('120000');
  const [totalAssets, setTotalAssets] = useState('1500000');

  const roa = useMemo(() => {
    const ni = parseFloat(netIncome) || 0;
    const ta = parseFloat(totalAssets) || 0;
    return ta > 0 ? (ni / ta) * 100 : 0;
  }, [netIncome, totalAssets]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Return on Assets (ROA) Calculator</Typography>
      <Typography variant="body1">
        Enter a company&apos;s net income and total assets to calculate return on assets (ROA) — a
        profitability ratio that measures how efficiently a company uses everything it owns, regardless of
        how those assets were financed (debt or equity), to generate profit. A higher ROA means the company
        is generating more profit per dollar of assets it controls.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        ROA = (Net Income ÷ Total Assets) × 100
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with {money(120000)} in net income and {money(1500000)} in total assets has an ROA of
        (120,000 ÷ 1,500,000) × 100 = 8%, meaning it generates 8 cents of profit for every dollar of assets
        it owns.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing how efficiently different companies use their assets to generate profit.</li>
          <li>Tracking a single company&apos;s asset efficiency over multiple periods.</li>
          <li>Evaluating asset-heavy businesses (manufacturing, real estate) where efficient asset use is critical.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How does ROA relate to Return on Equity (ROE)?</strong> ROA measures return on ALL assets a company controls, regardless of whether they were financed with debt or equity. ROE measures return specifically on shareholders&apos; equity — the portion owners actually funded. A leveraged company (one financed heavily with debt) typically shows a higher ROE than ROA, since debt-financed assets aren&apos;t counted in the equity base but still contribute to net income.</li>
          <li><strong>What counts as a good ROA?</strong> It varies significantly by industry — asset-light businesses like software companies often post ROAs well above 15-20%, while asset-heavy industries like utilities or manufacturing often run in the low single digits. Compare ROA against companies in the same industry rather than against a universal benchmark.</li>
          <li><strong>Why use total assets instead of just equity?</strong> Total assets capture everything a company uses to generate income, including assets funded by debt. This makes ROA a useful measure of operational efficiency independent of a company&apos;s financing choices, unlike ROE which is affected by leverage.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/return-on-assets-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Net Income" type="number" value={netIncome} onChange={(e) => setNetIncome(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Total Assets" type="number" value={totalAssets} onChange={(e) => setTotalAssets(e.target.value)} fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Return on Assets (ROA)</Typography>
            <Typography variant="h3" fontWeight="bold">{roa.toFixed(2)}%</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReturnOnAssetsCalculator;
