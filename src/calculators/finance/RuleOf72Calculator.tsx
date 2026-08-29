'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RuleOf72Calculator = () => {
  const [rate, setRate] = useState('8');
  const [targetYears, setTargetYears] = useState('9');

  const yearsToDouble = useMemo(() => {
    const r = parseFloat(rate) || 0;
    return r > 0 ? 72 / r : 0;
  }, [rate]);

  const requiredRate = useMemo(() => {
    const y = parseFloat(targetYears) || 0;
    return y > 0 ? 72 / y : 0;
  }, [targetYears]);

  const content = (
    <>
      <Typography variant="h2">How the Rule of 72 Works</Typography>
      <Typography variant="body1">
        The Rule of 72 is a quick mental-math shortcut for estimating how long it takes an investment to
        double at a fixed annual rate of return, or the reverse — what rate you&apos;d need to double your
        money in a target number of years. Divide 72 by the annual interest rate to get the years to double;
        divide 72 by the years available to get the required rate.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Years to Double = 72 ÷ Annual Rate (%)
        <br />
        Required Rate = 72 ÷ Years to Double
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        At an 8% annual return, an investment doubles in about 72 ÷ 8 = 9 years. Conversely, if you want your
        money to double in exactly 9 years, you&apos;d need an annual return of about 72 ÷ 9 = 8%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly estimating how long savings or investments take to double.</li>
          <li>Comparing the growth speed of different investment options without a calculator handy.</li>
          <li>Setting a target return rate needed to hit a doubling goal by a certain age.</li>
          <li>Understanding how compounding interest accelerates wealth growth over time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is the Rule of 72?</Typography>
      <Typography variant="body1">
        It&apos;s a close approximation for annual rates roughly between 6% and 10%, with the exact doubling
        time given by ln(2) / ln(1 + r). Outside that range, the estimate drifts slightly, but it&apos;s
        accurate enough for quick mental math in almost all practical cases.
      </Typography>
      <Typography variant="h3">Does the Rule of 72 assume compounding?</Typography>
      <Typography variant="body1">
        Yes — it assumes the return compounds annually. It does not apply cleanly to simple (non-compounding)
        interest, where growth is linear rather than exponential.
      </Typography>
      <Typography variant="h3">Can I use it for inflation too?</Typography>
      <Typography variant="body1">
        Yes — the same shortcut estimates how long it takes prices to double at a given inflation rate. For
        example, at 3% annual inflation, prices roughly double every 24 years.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/rule-of-72-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Rate → Years to Double</Typography>
          <TextField
            label="Annual Interest Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            sx={{ mb: 3 }}
          />
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Years to Double</Typography>
            <Typography variant="h3" fontWeight="bold">{yearsToDouble.toFixed(1)}</Typography>
          </Paper>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Years → Required Rate</Typography>
          <TextField
            label="Target Years to Double"
            type="number"
            value={targetYears}
            onChange={(e) => setTargetYears(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">Yr</InputAdornment> } }}
            sx={{ mb: 3 }}
          />
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
            <Typography variant="body2">Required Annual Rate</Typography>
            <Typography variant="h3" fontWeight="bold">{requiredRate.toFixed(2)}%</Typography>
          </Paper>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RuleOf72Calculator;
