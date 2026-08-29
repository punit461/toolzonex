'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type ConfidenceLevel = '90' | '95' | '99';

const Z_SCORES: Record<ConfidenceLevel, number> = {
  '90': 1.645,
  '95': 1.96,
  '99': 2.576,
};

const ConfidenceIntervalCalculator = () => {
  const [mean, setMean] = useState<string>('50');
  const [stdDev, setStdDev] = useState<string>('10');
  const [sampleSize, setSampleSize] = useState<string>('25');
  const [confidence, setConfidence] = useState<ConfidenceLevel>('95');

  const m = parseFloat(mean);
  const s = parseFloat(stdDev);
  const n = parseFloat(sampleSize);

  const valid = !isNaN(m) && !isNaN(s) && !isNaN(n) && s >= 0 && n > 0;
  const standardError = valid ? s / Math.sqrt(n) : 0;
  const marginOfError = valid ? Z_SCORES[confidence] * standardError : 0;
  const lower = m - marginOfError;
  const upper = m + marginOfError;

  const content = (
    <>
      <Typography variant="h2">How to Calculate a Confidence Interval</Typography>
      <Typography variant="body1">
        A confidence interval gives a range around a sample mean that&apos;s likely to contain the true
        population mean. Enter your sample mean, sample standard deviation, sample size, and a confidence
        level, and this calculator finds the interval using the standard z-score approach.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Margin of Error = z × (σ ÷ √n) &nbsp;|&nbsp; CI = Mean ± Margin of Error
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A sample mean of 50, a standard deviation of 10, and a sample size of 25 give a standard error of 10 ÷
        √25 = 2. At 95% confidence (z = 1.96), the margin of error is 1.96 × 2 = 3.92, giving a confidence
        interval of roughly [46.08, 53.92].
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reporting survey results with an appropriate margin of error.</li>
          <li>Summarizing A/B test or experiment results in statistics coursework or research.</li>
          <li>Estimating a plausible range for a population parameter from sample data.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why use a z-score instead of a t-score?</Typography>
      <Typography variant="body1">
        The z-score approximation is simpler and reasonably accurate for larger sample sizes (typically n ≥ 30).
        For smaller samples, a t-distribution (which has heavier tails to account for the extra uncertainty of
        estimating from limited data) is technically more precise — treat this z-score result as a solid
        approximation rather than an exact figure for small samples.
      </Typography>
      <Typography variant="h3">What does &quot;95% confidence&quot; actually mean?</Typography>
      <Typography variant="body1">
        It means that if you repeated the same sampling process many times and built a confidence interval each
        time, about 95% of those intervals would contain the true population mean. It&apos;s not a 95%
        probability that the true mean falls within this one specific interval you calculated.
      </Typography>
      <Typography variant="h3">How does sample size affect the interval?</Typography>
      <Typography variant="body1">
        Larger sample sizes shrink the standard error (since it&apos;s divided by the square root of n), which
        narrows the confidence interval and gives a more precise estimate of the population mean.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/confidence-interval-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Sample Mean" type="number" fullWidth value={mean} onChange={(e) => setMean(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Sample Standard Deviation" type="number" fullWidth value={stdDev} onChange={(e) => setStdDev(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Sample Size (n)" type="number" fullWidth value={sampleSize} onChange={(e) => setSampleSize(e.target.value)} onFocus={(e) => e.target.select()} />
          <FormControl fullWidth size="small">
            <InputLabel>Confidence Level</InputLabel>
            <Select label="Confidence Level" value={confidence} onChange={(e) => setConfidence(e.target.value as ConfidenceLevel)}>
              <MenuItem value="90">90%</MenuItem>
              <MenuItem value="95">95%</MenuItem>
              <MenuItem value="99">99%</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">{confidence}% Confidence Interval</Typography>
          <Typography variant="h4" color="primary" fontWeight={800}>
            {valid ? `[${lower.toFixed(3)}, ${upper.toFixed(3)}]` : '—'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {valid ? `Margin of error: ±${marginOfError.toFixed(4)}` : ''}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ConfidenceIntervalCalculator;
