'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

const PermutationCalculator = () => {
  const [n, setN] = useState<string>('8');
  const [r, setR] = useState<string>('3');

  const result = useMemo(() => {
    const nVal = parseInt(n, 10);
    const rVal = parseInt(r, 10);
    if (Number.isNaN(nVal) || Number.isNaN(rVal) || nVal < 0 || rVal < 0) return null;
    if (rVal > nVal) return { error: 'r cannot be greater than n' };
    if (nVal > 170) return { error: 'n is too large to compute exactly (max 170)' };

    const nFact = factorial(nVal);
    const nrFact = factorial(nVal - rVal);
    const permutations = nFact / nrFact;
    return { permutations, nFact, nrFact, nVal, rVal };
  }, [n, r]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Permutations (nPr)</Typography>
      <Typography variant="body1">
        A permutation counts the number of ways to arrange r items chosen from a set of n distinct items, where
        order matters. It&apos;s calculated with the formula nPr = n! ÷ (n - r)!, where n! (n factorial) is the
        product of all positive integers up to n.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        nPr = n! ÷ (n − r)!
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        How many ways can you arrange 3 out of 8 people in a line? nPr = 8! ÷ (8 − 3)! = 8! ÷ 5! = 40,320 ÷ 120
        = 336. So there are 336 possible ordered arrangements.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Counting the number of ways to award 1st, 2nd, and 3rd place among competitors.</li>
          <li>Solving probability and combinatorics problems in statistics coursework.</li>
          <li>Calculating password or PIN possibilities when digits or characters cannot repeat.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between permutations and combinations?</Typography>
      <Typography variant="body1">
        Permutations count arrangements where order matters (ABC is different from BCA), while combinations
        count selections where order doesn&apos;t matter (ABC and BCA are considered the same group). Since
        every combination of r items can be arranged in r! different orders, nPr is always r! times larger than
        nCr for the same n and r.
      </Typography>
      <Typography variant="h3">What does 0! (zero factorial) equal?</Typography>
      <Typography variant="body1">
        0! is defined as 1 by convention. This makes formulas like nPr work correctly even when r equals n
        (choosing and arranging every item), since (n − n)! = 0! = 1.
      </Typography>
      <Typography variant="h3">What happens if r is greater than n?</Typography>
      <Typography variant="body1">
        It&apos;s not possible to arrange more items than exist in the set, so nPr is undefined when r &gt; n.
        This calculator shows an error message in that case instead of a numeric result.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/permutation-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="n (total items)" type="number" fullWidth value={n} onChange={(e) => setN(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="r (items chosen)" type="number" fullWidth value={r} onChange={(e) => setR(e.target.value)} onFocus={(e) => e.target.select()} />
        </Box>

        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {result ? (
            'error' in result ? (
              <Typography variant="body1" color="error">{result.error}</Typography>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary" gutterBottom>nPr</Typography>
                <Typography variant="h3" fontWeight={800} color="primary.main">{result.permutations.toLocaleString()}</Typography>
                <Typography variant="body2" color="text.secondary" mt={2} sx={{ fontFamily: 'monospace' }}>
                  {result.nVal}! ÷ ({result.nVal} − {result.rVal})! = {result.nFact.toLocaleString()} ÷ {result.nrFact.toLocaleString()}
                </Typography>
              </>
            )
          ) : (
            <Typography variant="body1" color="text.secondary">Enter non-negative integers for n and r</Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PermutationCalculator;
