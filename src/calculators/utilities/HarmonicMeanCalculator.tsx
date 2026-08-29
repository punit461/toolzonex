'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
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

const HarmonicMeanCalculator = () => {
  const [input, setInput] = useState<string>('60, 40, 80');

  const { numbers, harmonicMean, arithMean, error } = useMemo(() => {
    const numbers = parseNumbers(input);
    if (numbers.length === 0) return { numbers, harmonicMean: null, arithMean: null, error: '' };
    if (numbers.some((n) => n <= 0)) {
      return { numbers, harmonicMean: null, arithMean: null, error: 'All numbers must be positive for a harmonic mean' };
    }
    const reciprocalSum = numbers.reduce((a, n) => a + 1 / n, 0);
    const harmonicMean = numbers.length / reciprocalSum;
    const arithMean = numbers.reduce((a, n) => a + n, 0) / numbers.length;
    return { numbers, harmonicMean, arithMean, error: '' };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the Harmonic Mean</Typography>
      <Typography variant="body1">
        The harmonic mean of n numbers is n divided by the sum of the reciprocals of each number. It gives more
        weight to smaller values than the arithmetic mean does, which makes it the right choice for averaging
        rates and ratios rather than plain quantities.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Harmonic Mean = n ÷ (1/x₁ + 1/x₂ + ... + 1/xₙ)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        If you drive the same distance three times at 60, 40, and 80 mph, your true average speed for the whole
        trip is the harmonic mean: 3 ÷ (1/60 + 1/40 + 1/80) ≈ 54.5 mph — not the arithmetic mean of 60, which
        would overstate your actual average speed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Averaging speeds traveled over equal distances (e.g. multiple legs of a trip).</li>
          <li>Averaging rates like price-to-earnings ratios in finance, where the arithmetic mean is misleading.</li>
          <li>Computing average resistance of parallel electrical resistors or similar rate-based quantities.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">When should I use harmonic mean instead of arithmetic mean?</Typography>
      <Typography variant="body1">
        Use harmonic mean when averaging rates defined as a ratio (like distance per time) over equal amounts of
        the denominator — such as speed over equal distances, not equal times. If you traveled for equal
        durations instead, the arithmetic mean would be the correct average.
      </Typography>
      <Typography variant="h3">Why is the harmonic mean always the smallest of the three Pythagorean means?</Typography>
      <Typography variant="body1">
        For any set of positive numbers, harmonic mean ≤ geometric mean ≤ arithmetic mean, with equality only
        when all the numbers are identical. The harmonic mean is pulled down more strongly by small values since
        it works with reciprocals.
      </Typography>
      <Typography variant="h3">Why must all the numbers be positive?</Typography>
      <Typography variant="body1">
        The harmonic mean relies on taking the reciprocal of each value. A zero value would make its reciprocal
        undefined (division by zero), and negative values can produce misleading or undefined results, so this
        calculator requires strictly positive inputs.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/harmonic-mean-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Numbers (comma, space, or line separated, all positive)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 60, 40, 80"
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>{error}</Typography>
          )}
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Harmonic Mean</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {harmonicMean !== null ? harmonicMean.toFixed(4) : '—'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Arithmetic Mean (for comparison)</Typography>
          <Typography variant="h5" fontWeight={700}>
            {arithMean !== null ? arithMean.toFixed(4) : '—'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {numbers.length > 0 ? `${numbers.length} values` : ''}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HarmonicMeanCalculator;
