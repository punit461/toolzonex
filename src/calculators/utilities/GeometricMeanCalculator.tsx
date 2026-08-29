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

const GeometricMeanCalculator = () => {
  const [input, setInput] = useState<string>('4, 8, 16, 2');

  const { numbers, geoMean, arithMean, error } = useMemo(() => {
    const numbers = parseNumbers(input);
    if (numbers.length === 0) return { numbers, geoMean: null, arithMean: null, error: '' };
    if (numbers.some((n) => n <= 0)) {
      return { numbers, geoMean: null, arithMean: null, error: 'All numbers must be positive for a geometric mean' };
    }
    // exp(mean(ln(x))) avoids overflow from multiplying many large numbers directly.
    const meanLog = numbers.reduce((a, n) => a + Math.log(n), 0) / numbers.length;
    const geoMean = Math.exp(meanLog);
    const arithMean = numbers.reduce((a, n) => a + n, 0) / numbers.length;
    return { numbers, geoMean, arithMean, error: '' };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the Geometric Mean</Typography>
      <Typography variant="body1">
        The geometric mean of n numbers is the nth root of their product: multiply all the values together,
        then take the nth root of the result. This calculator computes it as exp(average of the natural logs of
        each number), which is mathematically equivalent but avoids numerical overflow when multiplying many
        large values directly.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Geometric Mean = ⁿ√(x₁ × x₂ × ... × xₙ)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 4, 8, 16, and 2, the product is 4 × 8 × 16 × 2 = 1,024, and the geometric mean is the 4th root of
        1,024, which is 5.657. Compare this to the arithmetic mean of the same numbers, (4 + 8 + 16 + 2) ÷ 4 =
        7.5 — the geometric mean is always less than or equal to the arithmetic mean for positive numbers that
        aren&apos;t all identical.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Averaging growth rates or investment returns over multiple periods.</li>
          <li>Averaging ratios or index values, where the arithmetic mean would be misleading.</li>
          <li>Computing average factors of change, like population growth rate or compound interest rate.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">When should I use geometric mean instead of arithmetic mean?</Typography>
      <Typography variant="body1">
        Geometric mean is the right choice when averaging values that are multiplied together over time or
        combined multiplicatively, such as annual growth rates, investment returns, or ratios. Arithmetic mean
        works best for values that are simply added together, like test scores or measurements from repeated
        trials.
      </Typography>
      <Typography variant="h3">Why does the calculator require all positive numbers?</Typography>
      <Typography variant="body1">
        The geometric mean involves taking a root of the product of the values. If any value is zero, the
        entire product becomes zero. If any value is negative, the result can become undefined or complex for
        certain combinations, so this calculator requires strictly positive inputs.
      </Typography>
      <Typography variant="h3">Is geometric mean always smaller than arithmetic mean?</Typography>
      <Typography variant="body1">
        Yes, for any set of positive numbers that aren&apos;t all exactly equal, the geometric mean is always
        less than or equal to the arithmetic mean — this is a well-known mathematical inequality. They are
        equal only when every number in the set is identical.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/geometric-mean-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Numbers (comma, space, or line separated, all positive)</Typography>
          <TextField
            fullWidth
            multiline
            minRows={6}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 4, 8, 16, 2"
          />
        </Box>

        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {error ? (
            <Typography variant="body1" color="error" textAlign="center">{error}</Typography>
          ) : geoMean !== null ? (
            <>
              <Typography variant="h6" color="text.secondary" gutterBottom>Geometric Mean</Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
                {geoMean.toLocaleString(undefined, { maximumFractionDigits: 4 })}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Arithmetic mean for comparison: {arithMean !== null ? arithMean.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '—'}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>{numbers.length} values</Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter positive numbers to calculate</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GeometricMeanCalculator;
