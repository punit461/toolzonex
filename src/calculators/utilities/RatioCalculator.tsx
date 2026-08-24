'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

const RatioCalculator = () => {
  const [mode, setMode] = useState<'simplify' | 'scale'>('simplify');

  const [valueA, setValueA] = useState<number>(4);
  const [valueB, setValueB] = useState<number>(8);

  const [ratioA, setRatioA] = useState<number>(2);
  const [ratioB, setRatioB] = useState<number>(3);
  const [targetTotal, setTargetTotal] = useState<number>(100);

  const simplified = useMemo(() => {
    const a = Number.isNaN(valueA) ? 0 : valueA;
    const b = Number.isNaN(valueB) ? 0 : valueB;
    const divisor = gcd(a, b) || 1;
    return { simpA: a / divisor, simpB: b / divisor };
  }, [valueA, valueB]);

  const scaled = useMemo(() => {
    const a = Number.isNaN(ratioA) ? 0 : ratioA;
    const b = Number.isNaN(ratioB) ? 0 : ratioB;
    const total = Number.isNaN(targetTotal) ? 0 : targetTotal;
    const sumParts = a + b;
    if (sumParts === 0) return { partA: 0, partB: 0 };
    return { partA: (a / sumParts) * total, partB: (b / sumParts) * total };
  }, [ratioA, ratioB, targetTotal]);

  const content = (
    <>
      <Typography variant="h2">How to Simplify or Scale a Ratio</Typography>
      <Typography variant="body1">
        A ratio compares two values. This calculator has two modes: <strong>Simplify</strong> reduces any two
        numbers to their simplest whole-number ratio using their greatest common divisor (GCD), while
        <strong> Scale to Total</strong> takes a ratio (like 2:3) and splits a target total into parts that keep
        that exact ratio.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Simplified Ratio = A ÷ GCD(A, B) : B ÷ GCD(A, B)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Simplifying 4 : 8 gives 1 : 2 (dividing both by their GCD, 4). Scaling the ratio 2 : 3 to a total of 100
        splits it into 40 and 60 — each part keeps the same 2:3 proportion.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Simplifying a recipe, mixture, or aspect ratio to its simplest whole-number form.</li>
          <li>Splitting a bonus, profit, or shared bill between people or groups in a given ratio.</li>
          <li>Scaling up or down a paint, concrete, or chemical mixture ratio to a specific batch size.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does &quot;simplifying&quot; a ratio actually do?</Typography>
      <Typography variant="body1">
        It divides both numbers by their greatest common divisor (GCD) — the largest number that divides evenly
        into both — leaving the smallest possible whole numbers that still represent the exact same proportion.
      </Typography>
      <Typography variant="h3">How does the &quot;Scale to Total&quot; mode work?</Typography>
      <Typography variant="body1">
        It treats your ratio&apos;s two numbers as proportional parts of a whole, then divides your target total
        between them in that same proportion — for example, a 2:3 ratio always splits any total into 40% and
        60% shares.
      </Typography>
      <Typography variant="h3">Can I use decimal numbers in a ratio?</Typography>
      <Typography variant="body1">
        The Scale to Total mode works fine with decimals. The Simplify mode is designed for whole numbers since
        GCD is a whole-number concept — for decimal ratios, first multiply both values by 10, 100, etc. to make
        them whole numbers before simplifying.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ratio-calculator" content={content}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          color="primary"
          value={mode}
          exclusive
          onChange={(_, value) => { if (value) setMode(value); }}
        >
          <ToggleButton value="simplify" sx={{ px: 4, fontWeight: 600 }}>Simplify Ratio</ToggleButton>
          <ToggleButton value="scale" sx={{ px: 4, fontWeight: 600 }}>Scale to Total</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {mode === 'simplify' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              label="Value A"
              type="number"
              fullWidth
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(valueA) ? '' : valueA}
              onChange={(e) => setValueA(e.target.value === '' ? NaN : Number(e.target.value))}
            />
            <Typography variant="h5">:</Typography>
            <TextField
              label="Value B"
              type="number"
              fullWidth
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(valueB) ? '' : valueB}
              onChange={(e) => setValueB(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">Simplified Ratio</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
              {simplified.simpA} : {simplified.simpB}
            </Typography>
          </Box>
        </Box>
      )}

      {mode === 'scale' && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <TextField
                label="Ratio A"
                type="number"
                fullWidth
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(ratioA) ? '' : ratioA}
                onChange={(e) => setRatioA(e.target.value === '' ? NaN : Number(e.target.value))}
              />
              <Typography variant="h5">:</Typography>
              <TextField
                label="Ratio B"
                type="number"
                fullWidth
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(ratioB) ? '' : ratioB}
                onChange={(e) => setRatioB(e.target.value === '' ? NaN : Number(e.target.value))}
              />
            </Box>
            <TextField
              label="Target Total"
              type="number"
              fullWidth
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(targetTotal) ? '' : targetTotal}
              onChange={(e) => setTargetTotal(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Split</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Part A</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {scaled.partA.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Part B</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {scaled.partB.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RatioCalculator;
