'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const money = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

const EconomicValueAddedCalculator = () => {
  const [nopat, setNopat] = useState('1200000');
  const [investedCapital, setInvestedCapital] = useState('8000000');
  const [wacc, setWacc] = useState('10');

  const result = useMemo(() => {
    const n = parseFloat(nopat) || 0;
    const ic = parseFloat(investedCapital) || 0;
    const w = parseFloat(wacc) || 0;

    const capitalCharge = ic * (w / 100);
    const eva = n - capitalCharge;

    return { capitalCharge, eva };
  }, [nopat, investedCapital, wacc]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Economic Value Added (EVA) Calculator</Typography>
      <Typography variant="body1">
        Enter Net Operating Profit After Tax (NOPAT), the amount of invested capital deployed in the business,
        and the Weighted Average Cost of Capital (WACC) as a percentage. EVA measures whether a company is
        actually creating value above and beyond what it costs to fund its capital — a positive EVA means the
        business is generating returns higher than its cost of capital, while a negative EVA means it is
        destroying value even if it&apos;s accounting-profitable.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        EVA = NOPAT − (Invested Capital × WACC%)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A company has NOPAT of $1,200,000, invested capital of $8,000,000, and a WACC of 10%. The capital
        charge is $8,000,000 × 10% = $800,000, so EVA = $1,200,000 − $800,000 = $400,000. The business is
        creating $400,000 of economic value beyond its cost of capital.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Evaluating whether a business unit or investment is truly creating shareholder value, not just accounting profit.</li>
          <li>Comparing capital efficiency across divisions or competitors that use different amounts of invested capital.</li>
          <li>Supporting capital allocation decisions by identifying where returns exceed (or fall short of) the cost of capital.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does a negative EVA mean?</strong> A negative EVA means the business isn&apos;t generating enough operating profit to cover the cost of the capital invested in it — it can be accounting-profitable while still destroying economic value for shareholders.</li>
          <li><strong>How is NOPAT different from net income?</strong> NOPAT is operating profit after tax but before financing costs like interest, so it reflects the profitability of core operations independent of how the company is financed — net income includes interest expense and other non-operating items.</li>
          <li><strong>Where does the WACC figure come from?</strong> WACC blends the cost of a company&apos;s debt and equity, weighted by how much of each is used to fund the business. It&apos;s typically calculated separately (or sourced from financial data providers) and entered here as an input.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/economic-value-added-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Net Operating Profit After Tax (NOPAT)" type="number" value={nopat}
            onChange={(e) => setNopat(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Invested Capital" type="number" value={investedCapital}
            onChange={(e) => setInvestedCapital(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
          />
          <TextField
            label="Weighted Average Cost of Capital (WACC)" type="number" value={wacc}
            onChange={(e) => setWacc(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Economic Value Added (EVA)</Typography>
            <Typography variant="h3" fontWeight="bold">{money(result.eva)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Capital Charge</Typography>
            <Typography fontWeight={600}>{money(result.capitalCharge)}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EconomicValueAddedCalculator;
