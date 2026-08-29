'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Term {
  id: number;
  value: string;
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

const RatioSimplifier = () => {
  const [terms, setTerms] = useState<Term[]>([
    { id: 1, value: '4' },
    { id: 2, value: '8' },
    { id: 3, value: '12' },
  ]);
  const [nextId, setNextId] = useState(4);

  const addTerm = () => {
    setTerms([...terms, { id: nextId, value: '' }]);
    setNextId(nextId + 1);
  };
  const removeTerm = (id: number) => {
    if (terms.length > 2) setTerms(terms.filter((t) => t.id !== id));
  };
  const updateTerm = (id: number, value: string) => {
    setTerms(terms.map((t) => (t.id === id ? { ...t, value } : t)));
  };

  const { simplified, error } = useMemo(() => {
    const nums = terms.map((t) => parseFloat(t.value));
    if (nums.some((n) => isNaN(n))) return { simplified: null, error: 'Enter a number for every term.' };
    if (nums.some((n) => n < 0)) return { simplified: null, error: 'All terms must be zero or positive.' };
    if (nums.every((n) => n === 0)) return { simplified: null, error: 'At least one term must be non-zero.' };

    const overallGcd = nums.reduce((acc, n) => gcd(acc, n), 0) || 1;
    const result = nums.map((n) => n / overallGcd);
    return { simplified: result, error: '' };
  }, [terms]);

  const content = (
    <>
      <Typography variant="h2">How to Simplify a Ratio</Typography>
      <Typography variant="body1">
        This is a single-purpose ratio simplifier: enter two or more numbers making up a ratio, and it reduces
        them to their smallest whole-number form by dividing every term by their greatest common divisor (GCD).
        Unlike a general ratio tool limited to two numbers, this simplifier works for ratios with any number of
        terms — 2:3, 4:8:12, or even longer ratios like 6:9:15:3.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Simplified Ratio = A ÷ GCD(A, B, C, ...) : B ÷ GCD(...) : C ÷ GCD(...)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The ratio 4 : 8 : 12 has a greatest common divisor of 4, so dividing each term by 4 simplifies it to
        1 : 2 : 3. The three-term ratio 6 : 9 : 15 has a GCD of 3, simplifying to 2 : 3 : 5.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Simplifying a recipe or mixture ratio with three or more ingredients to its lowest terms.</li>
          <li>Reducing a multi-way split (like a profit-sharing ratio between several partners) to its simplest form.</li>
          <li>Simplifying aspect ratios, gear ratios, or other multi-term proportions found in schoolwork.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the site&apos;s general Ratio Calculator?</Typography>
      <Typography variant="body1">
        The general Ratio Calculator handles exactly two numbers and also offers a "Scale to Total" mode for
        splitting a total by a ratio. This tool is a focused simplifier that accepts any number of terms — add
        as many rows as your ratio needs — for when you specifically want to simplify a multi-term ratio.
      </Typography>
      <Typography variant="h3">Can I simplify a ratio with decimal numbers?</Typography>
      <Typography variant="body1">
        This tool rounds each term to the nearest whole number before finding the GCD, since GCD is a
        whole-number concept. For a ratio made of decimals, multiply every term by 10, 100, etc. first to make
        them whole numbers, then simplify.
      </Typography>
      <Typography variant="h3">What does it mean if one of my terms is zero?</Typography>
      <Typography variant="body1">
        A zero term stays zero after simplifying — dividing zero by any GCD is still zero — as long as at least
        one other term is non-zero so a valid GCD can be found.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ratio-simplifier" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>Ratio Terms</Typography>
          {terms.map((t, idx) => (
            <Box key={t.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label={`Term ${idx + 1}`}
                type="number"
                size="small"
                fullWidth
                value={t.value}
                onChange={(e) => updateTerm(t.id, e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <IconButton onClick={() => removeTerm(t.id)} size="small" disabled={terms.length <= 2} aria-label="Remove term">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addTerm} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
            Add Term
          </Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Simplified Ratio</Typography>
          {error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Typography variant="h3" color="primary" fontWeight={800}>
              {simplified?.join(' : ')}
            </Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RatioSimplifier;
