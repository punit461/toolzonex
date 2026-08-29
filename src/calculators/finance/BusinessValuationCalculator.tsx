'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const REVENUE_PRESETS = [
  { label: 'SaaS (3-6x)', value: 4.5 },
  { label: 'E-commerce (1-2x)', value: 1.5 },
  { label: 'Agency (0.5-1.5x)', value: 1 },
];

const EARNINGS_PRESETS = [
  { label: 'Small Business (2-4x)', value: 3 },
  { label: 'Established SME (4-6x)', value: 5 },
  { label: 'High-Growth Tech (10-15x)', value: 12 },
];

const BusinessValuationCalculator = () => {
  const [basis, setBasis] = useState<'revenue' | 'earnings'>('earnings');
  const [figure, setFigure] = useState('500000');
  const [multiple, setMultiple] = useState('4');

  const estimatedValue = useMemo(() => {
    const f = parseFloat(figure) || 0;
    const m = parseFloat(multiple) || 0;
    return f * m;
  }, [figure, multiple]);

  const presets = basis === 'revenue' ? REVENUE_PRESETS : EARNINGS_PRESETS;

  const content = (
    <>
      <Typography variant="h2">How Business Valuation by Multiple Works</Typography>
      <Typography variant="body1">
        A quick way to estimate what a business might be worth is to multiply a key financial figure —
        annual revenue or annual net income — by an industry-appropriate multiple. Revenue multiples are
        typically used for high-growth or pre-profit companies, while earnings (net income) multiples
        are more common for established, profitable businesses. Multiples vary widely by industry,
        growth rate, margins, and risk, so the presets here are starting points, not precise valuations.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Estimated Value = Revenue or Net Income × Valuation Multiple
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A small business with $500,000 in annual net income, valued at a 4x earnings multiple typical
        for an established small business, comes out to an estimated value of $2,000,000. The same
        business valued on a 1.5x revenue basis instead (if revenue were $2,000,000) would give a
        different, often lower, estimate — which is why matching the right multiple type to the
        business stage matters.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough valuation ballpark before a sale, acquisition, or investment conversation.</li>
          <li>Comparing how different industry multiples change a business&apos;s estimated value.</li>
          <li>Setting expectations ahead of a formal business appraisal.</li>
          <li>Sanity-checking a valuation offered by a buyer or investor.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do multiples vary so much by industry?</Typography>
      <Typography variant="body1">
        Multiples reflect growth potential, profit margins, risk, and how easily a business can scale.
        High-growth software companies often command higher revenue multiples than low-margin,
        capital-intensive businesses like retail or manufacturing, which are typically valued closer to
        their earnings.
      </Typography>
      <Typography variant="h3">Should I use revenue or earnings for my valuation?</Typography>
      <Typography variant="body1">
        Use earnings multiples for profitable, stable businesses where net income is a meaningful
        number. Use revenue multiples for early-stage or high-growth businesses that may not yet be
        profitable but have strong top-line growth investors are willing to pay for.
      </Typography>
      <Typography variant="h3">Is this a substitute for a professional valuation?</Typography>
      <Typography variant="body1">
        No — this multiple-based method gives a quick estimate for planning purposes. A formal business
        valuation typically also considers assets, liabilities, discounted cash flows, comparable
        transactions, and other factors a simple multiple doesn&apos;t capture.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/business-valuation-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <ToggleButtonGroup
            value={basis}
            exclusive
            onChange={(_, val) => val && setBasis(val)}
            size="small"
            fullWidth
          >
            <ToggleButton value="revenue">Revenue Multiple</ToggleButton>
            <ToggleButton value="earnings">Earnings Multiple</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {presets.map((p) => (
              <Chip key={p.label} label={p.label} size="small" variant="outlined" color="primary" onClick={() => setMultiple(String(p.value))} />
            ))}
          </Box>

          <TextField
            label={basis === 'revenue' ? 'Annual Revenue' : 'Annual Net Income'}
            type="number"
            value={figure}
            onChange={(e) => setFigure(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Valuation Multiple"
            type="number"
            value={multiple}
            onChange={(e) => setMultiple(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">×</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Business Value</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(estimatedValue)}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
              Based on {multiple}× {basis === 'revenue' ? 'annual revenue' : 'annual net income'}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BusinessValuationCalculator;
