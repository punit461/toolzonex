'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const iterativeFactorial = (n: number): number => {
  if (n < 0) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
};

const CombinationCalculator = () => {
  const [mode, setMode] = useState<'combination' | 'permutation'>('combination');
  const [n, setN] = useState<number>(10);
  const [r, setR] = useState<number>(3);

  const { result, formulaText } = useMemo(() => {
    const nNum = Number(n);
    const rNum = Number(r);

    if (
      Number.isNaN(nNum) ||
      Number.isNaN(rNum) ||
      nNum < 0 ||
      rNum < 0 ||
      rNum > nNum
    ) {
      return { result: NaN, formulaText: 'Provide valid values (0 ≤ r ≤ n).' };
    }

    if (mode === 'combination') {
      const numerator = iterativeFactorial(nNum);
      const denominator = iterativeFactorial(rNum) * iterativeFactorial(nNum - rNum);
      const value = Math.round(numerator / denominator);
      return {
        result: value,
        formulaText: `${nNum}C${rNum} = ${nNum}! / (${rNum}! × ${nNum - rNum}!) = ${value}`,
      };
    }

    const numerator = iterativeFactorial(nNum);
    const denominator = iterativeFactorial(nNum - rNum);
    const value = Math.round(numerator / denominator);
    return {
      result: value,
      formulaText: `${nNum}P${rNum} = ${nNum}! / ${nNum - rNum}! = ${value}`,
    };
  }, [mode, n, r]);

  const content = (
    <>
      <Typography variant="h2">How It Works</Typography>
      <Typography variant="body1">
        A <strong>combination</strong> (nCr) counts the number of ways to choose r items from a set of n
        without regard to order: nCr = n! / (r!(n − r)!). A <strong>permutation</strong> (nPr) counts the
        number of ways to arrange r items chosen from n, where order matters: nPr = n! / (n − r)!.
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        This tool uses an iterative factorial to avoid overflowing for larger values of n, giving exact integer
        results.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing 3 books out of 5 to take on a trip yields 5C3 = 10 possible combinations, but arranging 3 of
        those 5 books on a shelf yields 5P3 = 60 permutations.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Counting possible selections for teams, committees, or prize winners.</li>
          <li>Probability problems in statistics and gaming.</li>
          <li>Arranging subsets where order matters (passwords, racing podiums).</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between nCr and nPr?</Typography>
      <Typography variant="body1">
        nCr (combinations) ignores order, while nPr (permutations) counts arrangements where order matters. For
        the same n and r, nPr is always larger or equal to nCr.
      </Typography>
      <Typography variant="h3">What does n choose r mean?</Typography>
      <Typography variant="body1">
        "n choose r" (nCr) is the number of distinct r-item subsets you can form from a set of n items,
        regardless of the order you pick them.
      </Typography>
      <Typography variant="h3">Why use an iterative factorial?</Typography>
      <Typography variant="body1">
        Iterative multiplication avoids the recursion stack and produces exact integers, which is preferable for
        very large n where floating-point precision would otherwise be lost.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/combination-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Calculation Type</Typography>
            <ToggleButtonGroup
              color="primary"
              value={mode}
              exclusive
              onChange={(_, value) => {
                if (value) setMode(value);
              }}
              fullWidth
              size="small"
            >
              <ToggleButton value="combination" sx={{ fontWeight: 600 }}>Combination (nCr)</ToggleButton>
              <ToggleButton value="permutation" sx={{ fontWeight: 600 }}>Permutation (nPr)</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>n (total items)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(n) ? '' : n}
              onChange={(e) => setN(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">n</InputAdornment> } }}
            />
          </Box>

          <Box>
            <Typography gutterBottom>r (choose/arrange)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(r) ? '' : r}
              onChange={(e) => setR(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">r</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Result ({mode === 'combination' ? 'nCr' : 'nPr'})
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '4rem', color: 'primary.main', my: 2 }}>
              {Number.isNaN(result) ? '—' : result.toLocaleString()}
            </Typography>
            <Box sx={{ bgcolor: 'background.paper', px: 3, py: 1, borderRadius: 2, border: '1px solid #E5E5E5' }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {formulaText}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CombinationCalculator;
