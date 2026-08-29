'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function standardNormalCdf(z: number): number {
  const absZ = Math.abs(z);
  const p = 0.2316419;
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const t = 1 / (1 + p * absZ);
  const phi = (1 / Math.sqrt(2 * Math.PI)) * Math.exp((-absZ * absZ) / 2);
  const poly = t * (b1 + t * (b2 + t * (b3 + t * (b4 + t * b5))));
  const cdfPositive = 1 - phi * poly;
  return z >= 0 ? cdfPositive : 1 - cdfPositive;
}

const NormalDistributionCalculator = () => {
  const [mean, setMean] = useState<string>('100');
  const [stdDev, setStdDev] = useState<string>('15');
  const [xValue, setXValue] = useState<string>('115');

  const mu = parseFloat(mean);
  const sigma = parseFloat(stdDev);
  const x = parseFloat(xValue);

  const valid = !isNaN(mu) && !isNaN(sigma) && !isNaN(x) && sigma > 0;
  const z = valid ? (x - mu) / sigma : 0;
  const pdf = valid ? (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma)) : 0;
  const cdf = valid ? standardNormalCdf(z) : 0;

  const content = (
    <>
      <Typography variant="h2">How to Calculate Normal Distribution Probability</Typography>
      <Typography variant="body1">
        Enter a mean, standard deviation, and a specific x-value to find that point&apos;s probability density
        (how &quot;tall&quot; the bell curve is there) and its cumulative probability (the chance of landing at
        or below that value), based on the standard normal distribution.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        z = (x − μ) ÷ σ &nbsp;|&nbsp; PDF(x) = (1 ÷ (σ√2π)) × e^(−(x−μ)² ÷ 2σ²)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a mean of 100, a standard deviation of 15, and x = 115, the z-score is (115 − 100) ÷ 15 = 1.0,
        meaning 115 is one standard deviation above the mean. The cumulative probability at z = 1.0 is about
        84.13%, meaning roughly 84% of values fall at or below 115.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a test score&apos;s percentile given the mean and standard deviation of the class.</li>
          <li>Statistics homework involving z-scores and the standard normal distribution.</li>
          <li>Quality control checks estimating how likely a measurement is within an expected range.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between the PDF and the CDF?</Typography>
      <Typography variant="body1">
        The probability density function (PDF) describes the relative likelihood of the distribution at an
        exact point, while the cumulative distribution function (CDF) gives the total probability of landing at
        or below that point — the CDF is generally more useful for real-world questions like percentiles.
      </Typography>
      <Typography variant="h3">What does a z-score of 0 mean?</Typography>
      <Typography variant="body1">
        A z-score of 0 means the x-value equals the mean exactly, putting it right at the center of the
        distribution with a cumulative probability of 50%.
      </Typography>
      <Typography variant="h3">Is the CDF calculation exact?</Typography>
      <Typography variant="body1">
        This uses a well-known numerical approximation (accurate to about 7 decimal places) for the standard
        normal CDF, since no exact closed-form expression exists using elementary functions. That level of
        precision is more than sufficient for virtually all practical and academic uses.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/normal-distribution-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Mean (μ)" type="number" fullWidth value={mean} onChange={(e) => setMean(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Standard Deviation (σ)" type="number" fullWidth value={stdDev} onChange={(e) => setStdDev(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="X Value" type="number" fullWidth value={xValue} onChange={(e) => setXValue(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">z-score</Typography>
          <Typography variant="h4" color="primary" fontWeight={800}>{valid ? z.toFixed(4) : '—'}</Typography>
          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Probability Density</Typography>
              <Typography variant="h6">{valid ? pdf.toFixed(6) : '—'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Cumulative Probability</Typography>
              <Typography variant="h6">{valid ? `${(cdf * 100).toFixed(2)}%` : '—'}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NormalDistributionCalculator;
