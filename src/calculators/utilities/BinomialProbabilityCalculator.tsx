'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MAX_N = 100;

// Numerically stable iterative combination: C(n,k) = product_{i=1}^{k} (n-k+i)/i
const combination = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  const kk = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= kk; i++) {
    result *= (n - kk + i) / i;
  }
  return result;
};

const binomialPmf = (n: number, k: number, p: number): number => {
  if (p === 0) return k === 0 ? 1 : 0;
  if (p === 1) return k === n ? 1 : 0;
  return combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
};

const BinomialProbabilityCalculator = () => {
  const [trials, setTrials] = useState('10');
  const [successes, setSuccesses] = useState('4');
  const [probability, setProbability] = useState('50');

  const result = useMemo(() => {
    const n = Math.min(MAX_N, Math.max(0, Math.round(parseFloat(trials) || 0)));
    const k = Math.max(0, Math.round(parseFloat(successes) || 0));
    const p = Math.min(100, Math.max(0, parseFloat(probability) || 0)) / 100;

    if (k > n) return { valid: false, exact: 0, cumulative: 0, n, k };

    const exact = binomialPmf(n, k, p);
    let cumulative = 0;
    for (let i = 0; i <= k; i++) {
      cumulative += binomialPmf(n, i, p);
    }

    return { valid: true, exact, cumulative, n, k };
  }, [trials, successes, probability]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Binomial Probability Calculator</Typography>
      <Typography variant="body1">
        Enter the number of independent trials (n), the number of successes you want the probability for (k),
        and the probability of success on each individual trial (p). The binomial distribution applies whenever
        you repeat the same trial a fixed number of times, each trial has only two outcomes, and the probability
        of success stays the same every time — like flipping a coin 10 times or testing 20 products for defects.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        P(X = k) = C(n, k) × p^k × (1 − p)^(n − k)
        <br />
        where C(n, k) = n! / (k! × (n − k)!)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Flipping a fair coin (p = 50%) 10 times, the probability of getting exactly 4 heads is
        C(10,4) × 0.5⁴ × 0.5⁶ = 210 × 0.0625 × 0.015625 ≈ 20.5%. The cumulative probability of getting 4 or
        fewer heads out of 10 flips is about 37.7%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the probability of a specific number of successes across repeated trials, like coin flips or dice rolls.</li>
          <li>Quality control — estimating the probability of finding a certain number of defective items in a sample batch.</li>
          <li>Statistics coursework covering the binomial distribution and its cumulative probability.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the generic Probability Calculator?</strong> The generic Probability Calculator handles single events and combinations of two independent events (both happening, or at least one happening). This calculator is specifically for the binomial distribution — repeating the same trial many times and asking about the count of successes across all those repeated trials.</li>
          <li><strong>Why is n capped at 100?</strong> Very large trial counts can push factorial-based combination math into floating-point overflow or precision loss. This calculator uses a numerically stable iterative method for C(n,k) rather than computing raw factorials, and the cap keeps results both fast and reliable.</li>
          <li><strong>What&apos;s the difference between P(X = k) and P(X ≤ k)?</strong> P(X = k), the exact probability, is the chance of getting precisely k successes. P(X ≤ k), the cumulative probability, is the chance of getting k successes or fewer — it&apos;s the sum of the exact probabilities for every outcome from 0 up to k.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/binomial-probability-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Number of Trials (n)" type="number" value={trials}
            onChange={(e) => setTrials(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth helperText={`Capped at ${MAX_N}`}
          />
          <TextField
            label="Number of Successes (k)" type="number" value={successes}
            onChange={(e) => setSuccesses(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
          />
          <TextField
            label="Probability of Success Per Trial" type="number" value={probability}
            onChange={(e) => setProbability(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">P(X = {result.k})</Typography>
            <Typography variant="h4" fontWeight="bold">{result.valid ? `${(result.exact * 100).toFixed(3)}%` : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>P(X ≤ {result.k})</Typography>
            <Typography fontWeight={600}>{result.valid ? `${(result.cumulative * 100).toFixed(3)}%` : '—'}</Typography>
          </Paper>
          {!result.valid && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              Successes (k) cannot exceed the number of trials (n).
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BinomialProbabilityCalculator;
