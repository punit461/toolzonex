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

const VarianceCalculator = () => {
  const [input, setInput] = useState<string>('10, 12, 23, 23, 16, 23, 21, 16');

  const { mean, populationVariance, sampleVariance, populationStdDev, sampleStdDev, count } = useMemo(() => {
    const numbers = parseNumbers(input);
    const n = numbers.length;
    if (n === 0) {
      return { mean: 0, populationVariance: 0, sampleVariance: 0, populationStdDev: 0, sampleStdDev: 0, count: 0 };
    }

    const mean = numbers.reduce((sum, x) => sum + x, 0) / n;
    const squaredDiffs = numbers.map((x) => (x - mean) ** 2);
    const populationVariance = squaredDiffs.reduce((sum, x) => sum + x, 0) / n;
    const sampleVariance = n > 1 ? squaredDiffs.reduce((sum, x) => sum + x, 0) / (n - 1) : 0;

    return {
      mean,
      populationVariance,
      sampleVariance,
      populationStdDev: Math.sqrt(populationVariance),
      sampleStdDev: Math.sqrt(sampleVariance),
      count: n,
    };
  }, [input]);

  const fmt = (v: number) => v.toLocaleString(undefined, { maximumFractionDigits: 4 });

  const content = (
    <>
      <Typography variant="h2">How to Calculate Variance</Typography>
      <Typography variant="body1">
        Variance quantifies how far a set of numbers is spread from their mean. It is calculated by: (1) finding
        the mean, (2) subtracting the mean from each value and squaring the result, and (3) averaging those
        squared differences.
      </Typography>
      <Typography variant="body1">
        <strong>Population variance</strong> (σ²) divides by n and is used when your data is the entire
        population. <strong>Sample variance</strong> (s²) divides by n−1 to correct for bias when your data is
        a sample of a larger population. Enter comma-separated numbers below to see both.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 10, 12, 23, 23, 16, 23, 21, 16: the mean is 18. The squared differences from the mean are 64, 36,
        25, 25, 4, 25, 9, 4 — totaling 192. Population variance = 192/8 = 24. Sample variance = 192/7 ≈ 27.4286.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Measuring the spread or dispersion of data in statistics.</li>
          <li>Comparing the consistency between two datasets (lower variance = more consistent).</li>
          <li>Foundation for calculating standard deviation, confidence intervals, and more.</li>
          <li>Quality control and process capability analysis.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between variance and standard deviation?</Typography>
      <Typography variant="body1">
        Variance is the average of squared deviations from the mean, while standard deviation is the square root
        of variance. Standard deviation is in the same units as the original data, making it more intuitive to
        interpret. Both measure spread, but standard deviation is more commonly reported.
      </Typography>
      <Typography variant="h3">Why are there two formulas for variance?</Typography>
      <Typography variant="body1">
        Population variance divides by n, suitable when you have data for every member of the group. Sample
        variance divides by n−1 (Bessel&apos;s correction) to produce an unbiased estimate when working with a
        subset of the population.
      </Typography>
      <Typography variant="h3">Can variance be negative?</Typography>
      <Typography variant="body1">
        No — variance is always zero or positive, since it is based on squared differences. A variance of zero
        means all values are identical.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/variance-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Numbers (comma, space, or line separated)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 10, 12, 23, 23, 16, 23, 21, 16"
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
                <Typography variant="subtitle2" color="text.secondary">Population Variance σ²</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{fmt(populationVariance)}</Typography>
                <Typography variant="caption" color="text.secondary">σ = {fmt(populationStdDev)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Sample Variance s²</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{fmt(sampleVariance)}</Typography>
                <Typography variant="caption" color="text.secondary">s = {fmt(sampleStdDev)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default VarianceCalculator;
