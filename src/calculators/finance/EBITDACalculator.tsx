'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const EBITDACalculator = () => {
  const [revenue, setRevenue] = useState('1000000');
  const [opex, setOpex] = useState('650000');
  const [depreciation, setDepreciation] = useState('80000');
  const [amortization, setAmortization] = useState('20000');

  const { operatingIncome, dAndA, ebitda, margin } = useMemo(() => {
    const rev = parseFloat(revenue) || 0;
    const ox = parseFloat(opex) || 0;
    const dep = parseFloat(depreciation) || 0;
    const amort = parseFloat(amortization) || 0;
    const dA = dep + amort;
    const opInc = rev - ox;
    const ebitdaVal = opInc + dA;
    return {
      operatingIncome: opInc,
      dAndA: dA,
      ebitda: ebitdaVal,
      margin: rev > 0 ? (ebitdaVal / rev) * 100 : 0,
    };
  }, [revenue, opex, depreciation, amortization]);

  const content = (
    <>
      <Typography variant="h2">How EBITDA Is Calculated</Typography>
      <Typography variant="body1">
        EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) measures a company&apos;s
        core operating profitability before financing and accounting decisions. This calculator uses the
        simple revenue-based formula: revenue minus operating expenses (which gives operating income), then
        adds back depreciation and amortization.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        EBITDA = Revenue − Operating Expenses + Depreciation + Amortization
      </Box>
      <Typography variant="body1">
        If you&apos;re starting from net income instead of revenue and operating expenses, use the alternate
        formula: <strong>EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization</strong>. Both
        formulas arrive at the same figure — the revenue-based version is just more convenient when you
        already know operating expenses, while the net-income version is useful when working from a completed
        income statement.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company with $1,000,000 in revenue, $650,000 in operating expenses, $80,000 in depreciation, and
        $20,000 in amortization has an operating income of $350,000. Adding back the $100,000 of depreciation
        and amortization gives an EBITDA of $450,000 — an EBITDA margin of 45%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing operating profitability between companies with different capital structures.</li>
          <li>Valuing a business for acquisition using an EV/EBITDA multiple.</li>
          <li>Assessing a company&apos;s cash-generating ability before financing and tax effects.</li>
          <li>Evaluating loan covenants that reference EBITDA thresholds.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why add back depreciation and amortization?</Typography>
      <Typography variant="body1">
        Depreciation and amortization are non-cash accounting charges that spread the cost of assets over
        time. Adding them back highlights the cash-generating power of operations, independent of how assets
        were financed or written down.
      </Typography>
      <Typography variant="h3">Is EBITDA the same as cash flow?</Typography>
      <Typography variant="body1">
        No. EBITDA ignores working capital changes, capital expenditures, interest, and taxes — all of which
        affect actual cash flow. It&apos;s a profitability proxy, not a substitute for a cash flow statement.
      </Typography>
      <Typography variant="h3">What is a good EBITDA margin?</Typography>
      <Typography variant="body1">
        It varies widely by industry. Software and services companies often see 20-40%+ margins, while
        capital-intensive or low-margin retail businesses may run in the single digits to low teens.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/ebitda-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Revenue"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Operating Expenses"
            type="number"
            value={opex}
            onChange={(e) => setOpex(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Depreciation"
            type="number"
            value={depreciation}
            onChange={(e) => setDepreciation(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Amortization"
            type="number"
            value={amortization}
            onChange={(e) => setAmortization(e.target.value)}
            fullWidth
            slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">EBITDA</Typography>
            <Typography variant="h3" fontWeight="bold">{fmt(ebitda)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Operating Income</Typography>
            <Typography fontWeight={600}>{fmt(operatingIncome)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>D&amp;A Added Back</Typography>
            <Typography fontWeight={600}>{fmt(dAndA)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>EBITDA Margin</Typography>
            <Typography fontWeight={600}>{margin.toFixed(1)}%</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EBITDACalculator;
