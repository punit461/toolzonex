'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface NumberRow {
  id: string;
  value: number;
}

let nextId = 3;

function primeFactorize(n: number): Record<number, number> {
  const factors: Record<number, number> = {};
  let num = Math.trunc(Math.abs(n));
  let divisor = 2;
  while (num > 1 && divisor * divisor <= num) {
    while (num % divisor === 0) {
      factors[divisor] = (factors[divisor] || 0) + 1;
      num /= divisor;
    }
    divisor++;
  }
  if (num > 1) factors[num] = (factors[num] || 0) + 1;
  return factors;
}

const LcmCalculator = () => {
  const [rows, setRows] = useState<NumberRow[]>([
    { id: '1', value: 4 },
    { id: '2', value: 6 },
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

  const { lcm, primes, factorizations, validNumbers } = useMemo(() => {
    const validNumbers = rows
      .map((r) => (Number.isNaN(r.value) ? 0 : Math.trunc(Math.abs(r.value))))
      .filter((n) => n > 0);

    if (validNumbers.length === 0) {
      return { lcm: 0, primes: [] as number[], factorizations: [] as Record<number, number>[], validNumbers };
    }

    const factorizations = validNumbers.map((n) => primeFactorize(n));
    const primeSet = new Set<number>();
    factorizations.forEach((f) => Object.keys(f).forEach((p) => primeSet.add(Number(p))));
    const primes = Array.from(primeSet).sort((a, b) => a - b);

    let lcm = 1;
    for (const p of primes) {
      const maxExp = Math.max(...factorizations.map((f) => f[p] || 0));
      lcm *= Math.pow(p, maxExp);
    }

    return { lcm, primes, factorizations, validNumbers };
  }, [rows]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the LCM (Least Common Multiple)</Typography>
      <Typography variant="body1">
        The Least Common Multiple (LCM) of a set of numbers is the smallest positive number that is exactly
        divisible by every number in the set. This calculator finds the LCM using prime factorization: it breaks
        each number down into its prime factors, then takes the highest power of every prime that appears across
        all the numbers and multiplies them together.
      </Typography>
      <Typography variant="body1">
        Add two or more numbers below and the calculator shows both the LCM and the step-by-step prime
        factorization used to find it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 4 and 6: 4 = 2², and 6 = 2 × 3. Taking the highest power of each prime (2² and 3¹) gives
        LCM = 2² × 3 = 12 — the smallest number divisible by both 4 and 6.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a common denominator when adding or subtracting fractions.</li>
          <li>Solving word problems about repeating events, like when two flashing lights next align.</li>
          <li>Scheduling problems involving multiple recurring intervals.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is LCM different from GCD?</Typography>
      <Typography variant="body1">
        LCM (Least Common Multiple) is the smallest number that all your numbers divide into evenly, while GCD
        (Greatest Common Divisor) is the largest number that divides evenly into all of them. They&apos;re
        related by the formula LCM(a,b) × GCD(a,b) = a × b for two numbers.
      </Typography>
      <Typography variant="h3">Can I find the LCM of more than two numbers?</Typography>
      <Typography variant="body1">
        Yes — add as many rows as you need. The prime factorization method used here scales naturally to any
        number of values by taking the highest power of each prime across every number entered.
      </Typography>
      <Typography variant="h3">What happens if I enter a 0 or a negative number?</Typography>
      <Typography variant="body1">
        LCM is only defined for positive integers, so zero and negative entries are excluded from the
        calculation entirely — only enter positive whole numbers for a meaningful result.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/lcm-calculator" content={content}>
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
            <Typography variant="h6" color="text.secondary">LCM</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
              {lcm.toLocaleString()}
            </Typography>
          </Box>

          {primes.length > 0 && (
            <Box sx={{ mt: 3, overflowX: 'auto' }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Prime Factorization Breakdown</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    {primes.map((p) => <TableCell key={p} align="center">{p}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {validNumbers.map((n, i) => (
                    <TableRow key={i}>
                      <TableCell>{n}</TableCell>
                      {primes.map((p) => <TableCell key={p} align="center">{factorizations[i][p] || 0}</TableCell>)}
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Highest Power</TableCell>
                    {primes.map((p) => (
                      <TableCell key={p} align="center" sx={{ fontWeight: 700 }}>
                        {Math.max(...factorizations.map((f) => f[p] || 0))}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LcmCalculator;
