'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

// Finds the simplest fraction within a tight tolerance of the decimal using
// the continued-fraction algorithm. This naturally recovers exact fractions
// for both terminating decimals (0.25 -> 1/4) and simple repeating decimals
// entered to enough precision (0.333333333 -> 1/3), since both cases produce
// a short continued-fraction expansion.
function decimalToFraction(value: number, tolerance = 1e-9): { numerator: number; denominator: number } {
  const sign = value < 0 ? -1 : 1;
  value = Math.abs(value);
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = value;
  for (let i = 0; i < 64; i++) {
    const a = Math.floor(b);
    const h = a * h1 + h2;
    const k = a * k1 + k2;
    h2 = h1; h1 = h;
    k2 = k1; k1 = k;
    if (Math.abs(value - h1 / k1) < tolerance * value || k1 === 0) break;
    if (Math.abs(b - a) < 1e-12) break;
    b = 1 / (b - a);
  }
  return { numerator: sign * h1, denominator: k1 };
}

const DecimalToFractionCalculator = () => {
  const [input, setInput] = useState<string>('0.75');

  const result = useMemo(() => {
    const value = parseFloat(input);
    if (Number.isNaN(value)) return null;
    const { numerator, denominator } = decimalToFraction(value);
    const g = gcd(numerator, denominator);
    return { numerator: numerator / g, denominator: denominator / g, value };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How to Convert a Decimal to a Fraction</Typography>
      <Typography variant="body1">
        For a terminating decimal, the standard method is to write the digits after the decimal point as the
        numerator over a power of 10 (matching the number of decimal places), then simplify by dividing both by
        their greatest common divisor (GCD). This calculator uses a continued-fraction algorithm instead, which
        finds the simplest fraction that matches your input to a very tight tolerance — this handles
        terminating decimals exactly and also recovers common repeating decimals (like 0.333333333 → 1/3) when
        you type enough repeating digits.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        0.75 = 75/100 = 3/4 (dividing by GCD of 25) &nbsp;|&nbsp; 0.333333333 ≈ 1/3
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering 0.75 gives 75/100, and since GCD(75, 100) = 25, dividing both by 25 simplifies it to 3/4.
        Entering 0.125 gives 125/1000, which simplifies to 1/8. Entering 0.666666667 (rounded from 2/3) is
        recognized as 2/3.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting measurements (like 0.5 inches) into fraction form for woodworking or cooking.</li>
          <li>Checking homework answers that require fraction rather than decimal form.</li>
          <li>Simplifying calculator or spreadsheet output into a cleaner fraction for a report.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this work for repeating decimals?</Typography>
      <Typography variant="body1">
        Yes, as long as you type enough repeating digits for the pattern to be recognizable (for example,
        0.142857143 for 1/7). The algorithm finds the simplest fraction within a tiny tolerance of your input,
        which correctly recovers common repeating fractions when given sufficient precision.
      </Typography>
      <Typography variant="h3">What about irrational numbers like π?</Typography>
      <Typography variant="body1">
        Irrational numbers (like π or √2) cannot be expressed as an exact fraction by definition. If you enter
        a truncated value like 3.14159265, the calculator will return the closest simple fraction it can find
        within its tolerance (such as the well-known approximation 355/113), but this is always an
        approximation, not an exact equivalent.
      </Typography>
      <Typography variant="h3">Why is the denominator sometimes a large or unexpected number?</Typography>
      <Typography variant="body1">
        If a decimal doesn&apos;t match a simple fraction closely, the algorithm may need a larger denominator
        to represent it within the tolerance. Very long or seemingly random decimal inputs will tend to produce
        larger denominators than clean fractions like halves, thirds, or quarters.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/decimal-to-fraction-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6, alignItems: 'center' }}>
        <TextField
          fullWidth
          label="Decimal Number"
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={(e) => e.target.select()}
          placeholder="e.g. 0.75"
        />

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Fraction</Typography>
              <Typography variant="h3" fontWeight={800} color="primary.main" sx={{ fontFamily: 'monospace' }}>
                {result.numerator}/{result.denominator}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {result.value} ≈ {result.numerator} ÷ {result.denominator}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter a decimal number to convert</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DecimalToFractionCalculator;
