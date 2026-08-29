'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FREQUENCIES = [
  { label: 'Annually', value: 1 },
  { label: 'Semi-Annually', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 },
];

const EffectiveInterestRateCalculator = () => {
  const [nominalRate, setNominalRate] = useState('6');
  const [frequency, setFrequency] = useState(12);

  const { ear, difference } = useMemo(() => {
    const r = (parseFloat(nominalRate) || 0) / 100;
    const n = frequency;
    const earVal = n > 0 ? (Math.pow(1 + r / n, n) - 1) * 100 : 0;
    return { ear: earVal, difference: earVal - (parseFloat(nominalRate) || 0) };
  }, [nominalRate, frequency]);

  const content = (
    <>
      <Typography variant="h2">How Effective Interest Rate Is Calculated</Typography>
      <Typography variant="body1">
        The effective annual rate (EAR) shows the true annual interest rate once compounding within the year
        is taken into account. A nominal rate of 6% compounded monthly earns more than 6% over a year, because
        each month&apos;s interest itself starts earning interest.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        EAR = (1 + r/n)^n − 1
        <br />
        Where r = nominal annual rate, n = number of compounding periods per year
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A nominal annual rate of 6% compounded monthly (n = 12) gives an EAR of (1 + 0.06/12)^12 − 1 ≈
        6.17%. The more frequently interest compounds, the larger the gap between the nominal rate and the
        effective rate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing loan or savings account offers that compound at different frequencies.</li>
          <li>Understanding the true cost of a credit card&apos;s daily-compounding APR.</li>
          <li>Evaluating the real return on a certificate of deposit or savings bond.</li>
          <li>Converting between nominal and effective rates for financial modeling.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is EAR always higher than the nominal rate?</Typography>
      <Typography variant="body1">
        Because compounding means interest is calculated on previously earned interest as well as the
        principal. The more frequently that happens within a year, the more the effective rate exceeds the
        stated nominal rate.
      </Typography>
      <Typography variant="h3">Does compounding frequency matter a lot?</Typography>
      <Typography variant="body1">
        The difference shrinks as compounding gets more frequent — going from monthly to daily compounding
        makes a much smaller difference than going from annual to monthly. Beyond daily compounding, the rate
        approaches (but never quite reaches) continuous compounding.
      </Typography>
      <Typography variant="h3">Should I compare loans using nominal or effective rate?</Typography>
      <Typography variant="body1">
        Always compare effective annual rates when evaluating loans or investments with different compounding
        frequencies — it&apos;s the only way to see the true apples-to-apples annual cost or return.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/effective-interest-rate-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Nominal Annual Interest Rate"
            type="number"
            value={nominalRate}
            onChange={(e) => setNominalRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
          <Box>
            <Typography gutterBottom>Compounding Frequency</Typography>
            <Select
              fullWidth
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
            >
              {FREQUENCIES.map((f) => (
                <MenuItem key={f.value} value={f.value}>{f.label}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Effective Annual Rate (EAR)</Typography>
            <Typography variant="h3" fontWeight="bold">{ear.toFixed(3)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Difference from Nominal Rate</Typography>
            <Typography fontWeight={600}>+{difference.toFixed(3)}%</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default EffectiveInterestRateCalculator;
