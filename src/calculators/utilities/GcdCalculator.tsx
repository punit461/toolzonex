'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface NumberRow {
  id: string;
  value: number;
}

let nextId = 3;

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function gcdMultiple(numbers: number[]): { result: number; steps: string[] } {
  if (numbers.length === 0) return { result: 0, steps: [] };
  if (numbers.length === 1) return { result: numbers[0], steps: [`${numbers[0]} (single number)`] };

  const steps: string[] = [];
  let result = numbers[0];
  steps.push(`Start with ${numbers[0]}`);

  for (let i = 1; i < numbers.length; i++) {
    const b = numbers[i];
    const a = result;
    result = gcd(a, b);
    steps.push(`GCD(${a}, ${b}) = ${result}`);
  }

  return { result, steps };
}

const GcdCalculator = () => {
  const [rows, setRows] = useState<NumberRow[]>([
    { id: '1', value: 48 },
    { id: '2', value: 36 },
  ]);

  const addRow = () => {
    setRows([...rows, { id: String(nextId++), value: 0 }]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const updateRow = (id: string, value: number) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, value } : r)));
  };

  const { result, steps } = useMemo(() => {
    const validNumbers = rows
      .map((r) => (Number.isNaN(r.value) ? 0 : Math.trunc(Math.abs(r.value))))
      .filter((n) => n > 0);

    if (validNumbers.length === 0) {
      return { result: 0, steps: [] };
    }

    return gcdMultiple(validNumbers);
  }, [rows]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the GCD (Greatest Common Divisor)</Typography>
      <Typography variant="body1">
        The Greatest Common Divisor (GCD) is the largest positive integer that divides all of the given numbers
        without leaving a remainder. This calculator uses the Euclidean algorithm: for two numbers, it repeatedly
        replaces the larger number with the remainder of dividing the larger by the smaller, until the remainder
        is zero. The last non-zero remainder is the GCD.
      </Typography>
      <Typography variant="body1">
        For more than two numbers, the GCD is computed pairwise: GCD(a, b, c) = GCD(GCD(a, b), c). Add two or
        more numbers below to see the step-by-step computation.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 48 and 36: 48 = 36 × 1 + 12, then 36 = 12 × 3 + 0. Since the remainder reached 0, the GCD is 12.
        This means 12 is the largest number that divides both 48 and 36 evenly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Simplifying fractions to their lowest terms (e.g. 48/36 simplifies to 4/3 using GCD 12).</li>
          <li>Finding the greatest common factor in number theory problems.</li>
          <li>Helping with Diophantine equations and modular arithmetic.</li>
          <li>Scaling ratios down to their simplest whole-number form.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the GCD of 1 and any number?</Typography>
      <Typography variant="body1">
        The GCD of 1 and any positive integer is always 1, because 1 is the only positive divisor of 1. This
        means the two numbers are &quot;coprime&quot; or &quot;relatively prime.&quot;
      </Typography>
      <Typography variant="h3">Can the GCD be larger than the smallest number?</Typography>
      <Typography variant="body1">
        No — the GCD of a set of numbers can never be larger than the smallest number in the set, since a
        divisor cannot be greater than the number it divides.
      </Typography>
      <Typography variant="h3">What happens if I enter 0?</Typography>
      <Typography variant="body1">
        Zero is excluded from the calculation. If all entries are zero, the result will be 0. For any positive
        number n, GCD(n, 0) = n.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/gcd-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Numbers</Typography>
          <Stack spacing={2}>
            {rows.map((row, index) => (
              <Stack key={row.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 56, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="Value"
                  type="number"
                  size="small"
                  fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(row.value) ? '' : row.value}
                  onChange={(e) => updateRow(row.id, e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <IconButton color="error" size="small" onClick={() => removeRow(row.id)} disabled={rows.length <= 2}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addRow} sx={{ mt: 2 }}>
            Add Number
          </Button>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">GCD</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
              {result.toLocaleString()}
            </Typography>
          </Box>

          {steps.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Step-by-Step</Typography>
              <Stack spacing={0.5}>
                {steps.map((step, i) => (
                  <Typography key={i} variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {step}
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GcdCalculator;
