'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RealRateOfReturnCalculator = () => {
  const [nominalReturn, setNominalReturn] = useState('8');
  const [inflationRate, setInflationRate] = useState('3');

  const { fisherReal, approxReal } = useMemo(() => {
    const nominal = parseFloat(nominalReturn) || 0;
    const inflation = parseFloat(inflationRate) || 0;

    const fisher = ((1 + nominal / 100) / (1 + inflation / 100) - 1) * 100;
    const approx = nominal - inflation;

    return { fisherReal: fisher, approxReal: approx };
  }, [nominalReturn, inflationRate]);

  const content = (
    <>
      <Typography variant="h2">How Real Rate of Return Is Calculated</Typography>
      <Typography variant="body1">
        Your nominal (stated) investment return doesn&apos;t tell the whole story — inflation erodes the
        purchasing power of those gains. The real rate of return strips inflation out, showing how much your
        money actually grew in terms of what it can buy. Many people approximate it by simply subtracting
        inflation from the nominal return, but the more accurate method is the Fisher equation, which properly
        accounts for the compounding interaction between the two rates. This calculator uses the Fisher
        equation for its main result and shows the simple approximation alongside it for comparison.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Fisher Equation: Real Rate = [(1 + Nominal) ÷ (1 + Inflation)] − 1
        <br />
        Simple Approximation: Real Rate ≈ Nominal − Inflation
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An investment with an 8% nominal return during a year of 3% inflation has a Fisher real rate of return
        of (1.08 ÷ 1.03) − 1 = 4.85%. The simple approximation gives 8% − 3% = 5%, which is close but slightly
        overstates the real return — the gap grows wider as the rates involved get larger.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Judging whether an investment is actually growing your wealth after inflation.</li>
          <li>Comparing returns across different time periods with different inflation rates.</li>
          <li>Setting realistic long-term retirement or savings growth assumptions.</li>
          <li>Evaluating whether a savings account or bond yield is keeping pace with rising prices.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why use the Fisher equation instead of simple subtraction?</Typography>
      <Typography variant="body1">
        Simple subtraction ignores the fact that inflation also eats into the return earned on top of the
        original investment, not just the principal. The Fisher equation divides by (1 + inflation) to capture
        that compounding effect, making it more accurate — especially when nominal returns or inflation are high.
      </Typography>
      <Typography variant="h3">Can the real rate of return be negative?</Typography>
      <Typography variant="body1">
        Yes — if inflation is higher than your nominal return, the real rate of return is negative, meaning
        your money is losing purchasing power even though its dollar value grew.
      </Typography>
      <Typography variant="h3">What inflation rate should I use?</Typography>
      <Typography variant="body1">
        Use the inflation rate for the same period as your nominal return, typically measured by a consumer
        price index (CPI) for that year or timeframe, so the two figures line up correctly.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/real-rate-of-return-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Nominal (Stated) Return"
            type="number"
            value={nominalReturn}
            onChange={(e) => setNominalReturn(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <TextField
            label="Inflation Rate"
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Real Rate of Return (Fisher Equation)</Typography>
            <Typography variant="h3" fontWeight="bold">{fisherReal.toFixed(2)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Simple Approximation</Typography>
            <Typography fontWeight={600}>{approxReal.toFixed(2)}%</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RealRateOfReturnCalculator;
