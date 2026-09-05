'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DebtRatioCalculator = () => {
  const [liabilities, setLiabilities] = useState<string>('450000');
  const [assets, setAssets] = useState<string>('1000000');

  const result = useMemo(() => {
    const l = parseFloat(liabilities);
    const a = parseFloat(assets);
    if (Number.isNaN(l) || Number.isNaN(a) || a <= 0 || l < 0) return null;
    const ratio = l / a;
    return { ratio, percent: ratio * 100 };
  }, [liabilities, assets]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Debt Ratio Calculator</Typography>
      <Typography variant="body1">
        Enter a company&apos;s total liabilities and total assets to calculate its debt ratio — a leverage
        metric that shows what portion of a company&apos;s assets are financed through debt rather than
        equity. A lower debt ratio generally signals a more conservative capital structure, while a higher
        ratio means more of the company&apos;s assets are funded by borrowing.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Debt Ratio = Total Liabilities / Total Assets
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with $450,000 in total liabilities and $1,000,000 in total assets has a debt ratio of
        450,000 ÷ 1,000,000 = 0.45, or 45%. That means 45% of the company&apos;s assets are financed with
        debt, and the remaining 55% with equity.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing how much of a company&apos;s asset base is financed by debt versus equity.</li>
          <li>Comparing leverage across companies in the same industry using a common metric.</li>
          <li>Screening potential investments or loan applicants for excessive debt exposure.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Debt-to-Equity Calculator?</strong> Both measure leverage from the same balance sheet, but they use different denominators. The Debt-to-Equity Calculator divides total liabilities by total shareholder equity, showing how debt compares to equity directly. This Debt Ratio Calculator instead divides total liabilities by total assets, showing what share of everything the company owns is funded by debt. The two ratios move together but aren&apos;t interchangeable — a company can have a moderate debt ratio and still a high debt-to-equity ratio if its equity base is small.</li>
          <li><strong>What's considered a healthy debt ratio?</strong> There's no single universal cutoff, but a debt ratio below 0.5 (50%) is often viewed as conservative, meaning more than half of assets are equity-financed. Ratios above 0.6-0.7 are considered more highly leveraged, though acceptable levels vary a lot by industry — capital-intensive sectors like utilities and real estate typically run higher than software or services companies.</li>
          <li><strong>Where do I find total liabilities and total assets?</strong> Both figures come directly from a company's balance sheet. Total assets is usually the top-line total (current plus non-current assets), and total liabilities is the corresponding total on the liabilities side, listed just above the shareholder equity section.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/debt-ratio-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Liabilities" type="number" value={liabilities}
            onChange={(e) => setLiabilities(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Total Assets" type="number" value={assets}
            onChange={(e) => setAssets(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Debt Ratio</Typography>
            <Typography variant="h3" fontWeight="bold">{result ? `${result.percent.toFixed(1)}%` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>As a Decimal</Typography>
            <Typography fontWeight={600}>{result ? result.ratio.toFixed(3) : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DebtRatioCalculator;
