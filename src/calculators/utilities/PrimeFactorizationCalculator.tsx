'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface FactorStep {
  quotient: number;
  divisor: number;
}

function primeFactorize(n: number): { factors: Record<number, number>; steps: FactorStep[] } {
  const factors: Record<number, number> = {};
  const steps: FactorStep[] = [];
  let remaining = Math.trunc(Math.abs(n));
  let divisor = 2;

  while (divisor * divisor <= remaining) {
    while (remaining % divisor === 0) {
      factors[divisor] = (factors[divisor] || 0) + 1;
      steps.push({ quotient: remaining, divisor });
      remaining /= divisor;
    }
    divisor++;
  }
  if (remaining > 1) {
    factors[remaining] = (factors[remaining] || 0) + 1;
    steps.push({ quotient: 1, divisor: remaining });
  }

  return { factors, steps };
}

function formatFactors(factors: Record<number, number>): string {
  const entries = Object.entries(factors)
    .map(([base, exp]) => (exp === 1 ? base : `${base}^${exp}`));
  return entries.join(' × ');
}

function superscript(n: number): string {
  const map: Record<string, string> = { '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3', '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079' };
  return String(n).split('').map((d) => map[d] || d).join('');
}

const PrimeFactorizationCalculator = () => {
  const [input, setInput] = useState<string>('360');

  const { number, factors, steps, formatted } = useMemo(() => {
    const n = parseInt(input, 10);
    if (isNaN(n) || n < 2) {
      return { number: 0, factors: {}, steps: [] as FactorStep[], formatted: '' };
    }
    const { factors, steps } = primeFactorize(n);
    const formatted = Object.entries(factors)
      .map(([base, exp]) => (exp === 1 ? base : `${base}${superscript(exp)}`))
      .join(' \u00D7 ');
    return { number: n, factors, steps, formatted };
  }, [input]);

  const content = (
    <>
      <Typography variant="h2">How Prime Factorization Works</Typography>
      <Typography variant="body1">
        Prime factorization breaks a composite number down into a product of prime numbers. Starting with the
        smallest prime (2), we divide the number repeatedly by each prime until it is no longer divisible, then
        move to the next prime. This continues until the remaining value is 1.
      </Typography>
      <Typography variant="body1">
        Every integer greater than 1 has a unique prime factorization (the Fundamental Theorem of Arithmetic).
        Enter a number below to see its prime factors and each division step.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 360: 360 ÷ 2 = 180, 180 ÷ 2 = 90, 90 ÷ 2 = 45, 45 ÷ 3 = 15, 15 ÷ 3 = 5, 5 ÷ 5 = 1. So
        360 = 2³ × 3² × 5.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the GCD or LCM of numbers using their prime factors.</li>
          <li>Simplifying square roots and radicals (e.g. √360 = 6√10).</li>
          <li>Cryptography — RSA encryption relies on the difficulty of factoring large numbers.</li>
          <li>Number theory and math homework involving divisibility.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is prime factorization unique?</Typography>
      <Typography variant="body1">
        Yes — the Fundamental Theorem of Arithmetic guarantees that every integer greater than 1 has exactly
        one prime factorization (up to the order of the factors).
      </Typography>
      <Typography variant="h3">How do I factor very large numbers?</Typography>
      <Typography variant="body1">
        For very large numbers (hundreds of digits), prime factorization becomes computationally expensive. This
        calculator handles numbers that fit within standard integer ranges. For extremely large numbers, specialized
        algorithms like the General Number Field Sieve are used.
      </Typography>
      <Typography variant="h3">What is the prime factorization of a prime number?</Typography>
      <Typography variant="body1">
        A prime number&apos;s only prime factor is itself. For example, 17 = 17¹ — it cannot be broken down
        further.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/prime-factorization-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography gutterBottom>Enter a number (≥ 2)</Typography>
          <TextField
            fullWidth
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 360"
          />

          {steps.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Division Steps</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Divide</TableCell>
                    <TableCell>By</TableCell>
                    <TableCell>Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {steps.map((step, i) => (
                    <TableRow key={i}>
                      <TableCell>{step.quotient === 1 ? steps[i - 1]?.quotient ?? number : (i === 0 ? number : steps[i - 1]?.quotient ?? number)}</TableCell>
                      <TableCell>{step.divisor}</TableCell>
                      <TableCell>{step.quotient}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Prime Factorization</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', wordBreak: 'break-word' }}>
              {number >= 2 ? formatted : '—'}
            </Typography>
            {number >= 2 && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontFamily: 'monospace' }}>
                {formatFactors(factors)}
              </Typography>
            )}
          </Box>

          {number >= 2 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Unique Factors</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.entries(factors).map(([base, exp]) => (
                  <Box key={base} sx={{ px: 2, py: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {base}{superscript(exp)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PrimeFactorizationCalculator;
