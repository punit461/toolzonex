'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const COMPOUNDING_OPTIONS = [
  { label: 'Daily (365)', value: 365 },
  { label: 'Monthly (12)', value: 12 },
  { label: 'Quarterly (4)', value: 4 },
  { label: 'Semi-Annually (2)', value: 2 },
  { label: 'Annually (1)', value: 1 },
];

const APYCalculatorContent = () => {
  const [interestRate, setInterestRate] = useState('5');
  const [compounding, setCompounding] = useState(12);

  const r = (parseFloat(interestRate) || 0) / 100;
  const apy = Math.pow(1 + r / compounding, compounding) - 1;
  const apyPercent = apy * 100;
  const effectiveRate = (Math.pow(1 + r / compounding, compounding) - 1) * 100;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Nominal Interest Rate"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          fullWidth
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
        <Box>
          <Typography gutterBottom fontWeight={600}>Compounding Frequency</Typography>
          <Select
            fullWidth
            value={compounding}
            onChange={(e) => setCompounding(Number(e.target.value))}
          >
            {COMPOUNDING_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </Box>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            The nominal rate is the stated annual rate before compounding. APY accounts for the effect
            of compounding within the year.
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">APY</Typography>
            <Typography variant="h6" fontWeight="bold">{apyPercent.toFixed(4)}%</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Effective Annual Rate</Typography>
            <Typography variant="body2" fontWeight="bold">{effectiveRate.toFixed(4)}%</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Nominal Rate</Typography>
            <Typography variant="body2" fontWeight="bold">{r * 100}%</Typography>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>APY is always equal to or higher than the nominal rate</strong> because compounding adds
            previously earned interest back into the principal.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const APYCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the APY calculator?</Typography>
      <Typography variant="body1">
        Enter the nominal (stated) annual interest rate and select how often interest compounds — daily,
        monthly, quarterly, semi-annually, or annually. The calculator shows the Annual Percentage Yield (APY),
        which is the real return you earn once compounding is taken into account.
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        APY = (1 + r/n)<sup>n</sup> − 1
        <br />
        r = nominal annual rate, n = compounding periods per year
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A savings account advertises 5% interest compounded monthly. The APY is (1 + 0.05/12)<sup>12</sup> − 1
        ≈ 5.1162%. You effectively earn 5.1162% per year, not just 5%, because each month&apos;s interest is
        added back to the principal before the next month&apos;s interest is calculated.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is the difference between APY and APR?</strong> APY includes compounding; APR does not. For the same nominal rate, a product that compounds daily will have a higher APY than one that compounds annually.</li>
          <li><strong>Why does compounding frequency matter?</strong> More frequent compounding means interest is added to the principal sooner, which increases the effective return for the same nominal rate.</li>
          <li><strong>Is APY the same as effective annual rate (EAR)?</strong> Yes — APY and EAR are effectively the same metric.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing savings accounts or CDs that advertise different nominal rates and compounding frequencies.</li>
          <li>Understanding the real return on a fixed deposit or bond after accounting for compounding.</li>
          <li>Evaluating whether a higher nominal rate with less frequent compounding beats a lower rate with daily compounding.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/apy-calculator" content={content}>
      <APYCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default APYCalculator;
