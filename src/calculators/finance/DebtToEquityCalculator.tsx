'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DebtToEquityCalculator = () => {
  const [liabilities, setLiabilities] = useState('400000');
  const [equity, setEquity] = useState('600000');

  const ratio = useMemo(() => {
    const l = parseFloat(liabilities) || 0;
    const e = parseFloat(equity) || 0;
    if (e <= 0) return null;
    return l / e;
  }, [liabilities, equity]);

  const content = (
    <>
      <Typography variant="h2">How the Debt-to-Equity Ratio Is Calculated</Typography>
      <Typography variant="body1">
        The debt-to-equity (D/E) ratio compares how much a business relies on debt versus shareholder equity to
        finance its assets. Enter total liabilities and total shareholder equity, both taken from the same
        balance sheet, to calculate it.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Debt-to-Equity Ratio = Total Liabilities ÷ Total Shareholder Equity
      </Box>

      <Typography variant="h2">What Is a Healthy Debt-to-Equity Ratio?</Typography>
      <Typography variant="body1">
        There&apos;s no single healthy range that applies to every company — it varies significantly by
        industry. Capital-intensive industries like utilities, telecommunications, and manufacturing typically
        carry more debt relative to equity (D/E ratios of 1.5-2 or higher are common and normal), since they
        rely on debt to finance expensive infrastructure and equipment. Less capital-intensive industries, like
        many technology and services businesses, tend to run much lower D/E ratios, often below 1. Compare a
        company&apos;s ratio to others in the same industry rather than to a generic benchmark.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with $400,000 in total liabilities and $600,000 in shareholder equity has a D/E ratio of
        400,000 ÷ 600,000 = 0.67 — meaning it uses about 67 cents of debt for every dollar of equity financing.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing how leveraged a company is before investing or lending.</li>
          <li>Comparing a company&apos;s capital structure to industry peers.</li>
          <li>Tracking how a company&apos;s reliance on debt changes over time.</li>
          <li>Evaluating financial risk as part of broader due diligence.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does a high D/E ratio mean?</Typography>
      <Typography variant="body1">
        A high ratio means a company relies more heavily on debt than equity to finance its operations, which
        can amplify both returns and risk — heavier debt loads mean higher fixed interest obligations,
        regardless of how the business is performing.
      </Typography>
      <Typography variant="h3">What does a D/E ratio below 1 mean?</Typography>
      <Typography variant="body1">
        A ratio below 1 means a company has more equity than debt financing its assets, generally considered
        more conservative — though very low debt can also mean a company isn&apos;t using leverage to help fund
        growth.
      </Typography>
      <Typography variant="h3">Where do I find total liabilities and shareholder equity?</Typography>
      <Typography variant="body1">
        Both figures come from a company&apos;s balance sheet — total liabilities is usually the sum of current
        and long-term liabilities, and total shareholder equity (or stockholders&apos; equity) is listed as its
        own section, typically at the bottom of the balance sheet.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/debt-to-equity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Liabilities"
            type="number"
            fullWidth
            value={liabilities}
            onChange={(e) => setLiabilities(e.target.value)}
            onFocus={(e) => e.target.select()}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Total Shareholder Equity"
            type="number"
            fullWidth
            value={equity}
            onChange={(e) => setEquity(e.target.value)}
            onFocus={(e) => e.target.select()}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Debt-to-Equity Ratio</Typography>
            <Typography variant="h3" fontWeight="bold">
              {ratio !== null ? ratio.toFixed(2) : '—'}
            </Typography>
          </Paper>
          <Alert severity="info">
            Compare this to companies in the same industry — capital-intensive industries normally run higher
            ratios than services or technology businesses.
          </Alert>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DebtToEquityCalculator;
