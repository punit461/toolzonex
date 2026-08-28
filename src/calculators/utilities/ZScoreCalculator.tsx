'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

function normalCDF(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function getInterpretation(z: number): string {
  const abs = Math.abs(z);
  if (abs < 0.5) return 'Very close to the mean — the value is typical.';
  if (abs < 1) return 'Within one standard deviation — fairly common.';
  if (abs < 2) return 'Within two standard deviations — somewhat unusual.';
  if (abs < 3) return 'Within three standard deviations — rare.';
  return 'More than three standard deviations — very rare / outlier.';
}

const ZScoreCalculator = () => {
  const [value, setValue] = useState<string>('75');
  const [mean, setMean] = useState<string>('70');
  const [stdDev, setStdDev] = useState<string>('8');

  const { zScore, percentile, interpretation, error } = useMemo(() => {
    const x = parseFloat(value);
    const mu = parseFloat(mean);
    const sigma = parseFloat(stdDev);

    if (isNaN(x) || isNaN(mu) || isNaN(sigma)) {
      return { zScore: 0, percentile: 50, interpretation: '', error: 'Please enter valid numbers for all fields.' };
    }
    if (sigma <= 0) {
      return { zScore: 0, percentile: 50, interpretation: '', error: 'Standard deviation must be greater than zero.' };
    }

    const zScore = (x - mu) / sigma;
    const percentile = normalCDF(zScore) * 100;
    const interpretation = getInterpretation(zScore);

    return { zScore, percentile, interpretation, error: '' };
  }, [value, mean, stdDev]);

  const fmt = (v: number) => v.toLocaleString(undefined, { maximumFractionDigits: 4 });
  const pct = (v: number) => v.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const content = (
    <>
      <Typography variant="h2">How the Z-Score Works</Typography>
      <Typography variant="body1">
        A Z-score (standard score) tells you how many standard deviations a data point is from the mean. The
        formula is <strong>z = (X − μ) / σ</strong>, where X is the value, μ is the population mean, and σ is
        the standard deviation.
      </Typography>
      <Typography variant="body1">
        A positive z-score means the value is above the mean; a negative z-score means it is below. The
        z-score is then used to find the percentile — the percentage of data points that fall below this
        value — using the standard normal distribution.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If a student scored 75 on a test where the mean was 70 and the standard deviation was 8: z = (75 − 70)
        / 8 = 0.625. This corresponds to roughly the 73rd percentile — the student scored higher than about
        73% of test-takers.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing scores from different distributions (e.g. SAT vs. ACT).</li>
          <li>Identifying outliers in a dataset.</li>
          <li>Standardizing test scores, financial returns, or measurement data.</li>
          <li>Quality control and statistical process control.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does a z-score of 0 mean?</Typography>
      <Typography variant="body1">
        A z-score of 0 means the value is exactly equal to the mean — it sits right in the center of the
        distribution, at the 50th percentile.
      </Typography>
      <Typography variant="h3">Can z-scores be negative?</Typography>
      <Typography variant="body1">
        Yes — a negative z-score simply means the value is below the mean. A z-score of −2 means the value is
        two standard deviations below the mean.
      </Typography>
      <Typography variant="h3">Is the percentile exact?</Typography>
      <Typography variant="body1">
        The percentile shown is an approximation based on the standard normal distribution (using the error
        function). For very large or very small z-scores, the result approaches 0% or 100% but never exactly
        reaches them.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/z-score-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <TextField
            fullWidth
            label="Value (X)"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Mean (μ)"
            type="number"
            value={mean}
            onChange={(e) => setMean(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Standard Deviation (σ)"
            type="number"
            value={stdDev}
            onChange={(e) => setStdDev(e.target.value)}
            sx={{ mb: 3 }}
          />

          {!error && (
            <Box sx={{ px: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Percentile: {pct(percentile)}th
              </Typography>
              <Slider
                value={percentile}
                min={0}
                max={100}
                disabled
                sx={{ color: 'primary.main' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">0%</Typography>
                <Typography variant="caption" color="text.secondary">100%</Typography>
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
            {error ? (
              <Typography variant="body1" color="error" textAlign="center">{error}</Typography>
            ) : (
              <>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>Z-Score</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {fmt(zScore)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">Percentile</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{pct(percentile)}th</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">CDF Value</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{fmt(normalCDF(zScore))}</Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Interpretation</Typography>
                  <Typography variant="body1">{interpretation}</Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ZScoreCalculator;
