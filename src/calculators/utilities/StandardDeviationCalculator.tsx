'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
}

const StandardDeviationCalculator = () => {
  const [input, setInput] = useState<string>('4, 8, 6, 5, 3, 7, 9, 2');

  const { mean, populationStdDev, sampleStdDev, populationVariance, sampleVariance, count } = useMemo(() => {
    const numbers = parseNumbers(input);
    const n = numbers.length;
    if (n === 0) {
      return { mean: 0, populationStdDev: 0, sampleStdDev: 0, populationVariance: 0, sampleVariance: 0, count: 0 };
    }

    const mean = numbers.reduce((sum, x) => sum + x, 0) / n;
    const squaredDiffs = numbers.map((x) => (x - mean) ** 2);
    const populationVariance = squaredDiffs.reduce((sum, x) => sum + x, 0) / n;
    const sampleVariance = n > 1 ? squaredDiffs.reduce((sum, x) => sum + x, 0) / (n - 1) : 0;
    const populationStdDev = Math.sqrt(populationVariance);
    const sampleStdDev = Math.sqrt(sampleVariance);

    return { mean, populationStdDev, sampleStdDev, populationVariance, sampleVariance, count: n };
  }, [input]);

  const fmt = (v: number) => v.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const content = (
    <>
      <Typography variant="h2">How to Calculate Standard Deviation</Typography>
      <Typography variant="body1">
        Standard deviation measures how spread out numbers are from the mean. It is calculated by: (1) finding
        the mean of all values, (2) computing each value&apos;s squared difference from the mean, (3) averaging
        those squared differences (the variance), and (4) taking the square root.
      </Typography>
      <Typography variant="body1">
        There are two versions: <strong>population standard deviation</strong> (divides by n, for the full
        dataset) and <strong>sample standard deviation</strong> (divides by n−1, when your data is a sample of a
        larger population). Enter comma-separated numbers below to see both.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 4, 8, 6, 5, 3, 7, 9, 2: the mean is 5.5. The squared differences are 2.25, 6.25, 0.25, 0.25,
        6.25, 2.25, 12.25, 12.25. Population variance = 42/8 = 5.25, so population σ ≈ 2.2913. Sample variance
        = 42/7 = 6, so sample s ≈ 2.4495.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Measuring the consistency or volatility of data (test scores, stock prices, measurements).</li>
          <li>Determining if a dataset has significant variability or is tightly clustered.</li>
          <li>Statistical analysis, quality control, and scientific research.</li>
          <li>Comparing the spread of two different datasets.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">When should I use population vs. sample standard deviation?</Typography>
      <Typography variant="body1">
        Use population standard deviation when your data represents the entire group you care about. Use sample
        standard deviation when your data is a subset of a larger population — the n−1 correction (Bessel&apos;s
        correction) compensates for the bias inherent in estimating from a sample.
      </Typography>
      <Typography variant="h3">What does a high or low standard deviation mean?</Typography>
      <Typography variant="body1">
        A low standard deviation means data points tend to be close to the mean (consistent). A high standard
        deviation means data points are spread out over a wider range (variable).
      </Typography>
      <Typography variant="h3">What units is standard deviation in?</Typography>
      <Typography variant="body1">
        Standard deviation is expressed in the same units as the original data. If your data is in meters, the
        standard deviation is also in meters.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/standard-deviation-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Numbers (comma, space, or line separated)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 4, 8, 6, 5, 3, 7, 9, 2"
          />
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>Mean</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
                {fmt(mean)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {count} value{count === 1 ? '' : 's'}
              </Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Population σ</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{fmt(populationStdDev)}</Typography>
                <Typography variant="caption" color="text.secondary">σ² = {fmt(populationVariance)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Sample s</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{fmt(sampleStdDev)}</Typography>
                <Typography variant="caption" color="text.secondary">s² = {fmt(sampleVariance)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StandardDeviationCalculator;
