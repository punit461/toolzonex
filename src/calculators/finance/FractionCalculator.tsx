'use client';

import { useState } from 'react';
import {
  Box, TextField, Typography, Paper, InputAdornment,
  ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

const simplify = (n: number, d: number): [number, number] => {
  if (d === 0) return [n, d];
  const sign = d < 0 ? -1 : 1;
  const g = gcd(Math.abs(n), Math.abs(d));
  return [(n / g) * sign, (d / g) * sign];
};

const FractionCalculatorContent = () => {
  const [numA, setNumA] = useState('1');
  const [denA, setDenA] = useState('2');
  const [numB, setNumB] = useState('1');
  const [denB, setDenB] = useState('3');
  const [operation, setOperation] = useState<string>('add');

  const nA = parseInt(numA) || 0;
  const dA = parseInt(denA) || 1;
  const nB = parseInt(numB) || 0;
  const dB = parseInt(denB) || 1;

  let resNum = 0;
  let resDen = 1;

  switch (operation) {
    case 'add': {
      resNum = nA * dB + nB * dA;
      resDen = dA * dB;
      break;
    }
    case 'subtract': {
      resNum = nA * dB - nB * dA;
      resDen = dA * dB;
      break;
    }
    case 'multiply': {
      resNum = nA * nB;
      resDen = dA * dB;
      break;
    }
    case 'divide': {
      resNum = nA * dB;
      resDen = dA * nB;
      break;
    }
  }

  const [simpNum, simpDen] = simplify(resNum, resDen);
  const decimal = resDen !== 0 ? (resNum / resDen) : 0;

  const opSymbol = { add: '+', subtract: '−', multiply: '×', divide: '÷' }[operation];

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography gutterBottom fontWeight={600}>Fraction A</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              label="Numerator"
              type="number"
              value={numA}
              onChange={(e) => setNumA(e.target.value)}
              fullWidth
            />
            <Typography variant="h5" color="text.secondary">/</Typography>
            <TextField
              label="Denominator"
              type="number"
              value={denA}
              onChange={(e) => setDenA(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>

        <Box>
          <Typography gutterBottom fontWeight={600}>Operation</Typography>
          <ToggleButtonGroup
            value={operation}
            exclusive
            onChange={(_, v) => { if (v) setOperation(v); }}
            fullWidth
          >
            <ToggleButton value="add">+</ToggleButton>
            <ToggleButton value="subtract">−</ToggleButton>
            <ToggleButton value="multiply">×</ToggleButton>
            <ToggleButton value="divide">÷</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Typography gutterBottom fontWeight={600}>Fraction B</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              label="Numerator"
              type="number"
              value={numB}
              onChange={(e) => setNumB(e.target.value)}
              fullWidth
            />
            <Typography variant="h5" color="text.secondary">/</Typography>
            <TextField
              label="Denominator"
              type="number"
              value={denB}
              onChange={(e) => setDenB(e.target.value)}
              fullWidth
            />
          </Box>
        </Box>

        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {nA}/{dA} {opSymbol} {nB}/{dB}
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {simpDen === 1 ? simpNum : `${simpNum} / ${simpDen}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ≈ {decimal.toFixed(4)}
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
        <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Fraction</Typography>
            <Typography variant="h6" fontWeight="bold">
              {simpDen === 1 ? simpNum : `${simpNum} / ${simpDen}`}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Decimal</Typography>
            <Typography variant="h6" fontWeight="bold">{decimal.toFixed(4)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Operation</Typography>
            <Typography variant="body2" fontWeight="bold">{nA}/{dA} {opSymbol} {nB}/{dB}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Simplified Form</Typography>
            <Typography variant="body2" fontWeight="bold">
              {simpDen === 1 ? simpNum : `${simpNum}/${simpDen}`}
            </Typography>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ mt: 3, p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Input:</strong> {nA}/{dA} {opSymbol} {nB}/{dB}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Raw:</strong> {resNum}/{resDen}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Simplified:</strong> {simpDen === 1 ? simpNum : `${simpNum}/${simpDen}`}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const FractionCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the fraction calculator?</Typography>
      <Typography variant="body1">
        Enter the numerator and denominator for both fractions, then choose an operation (add, subtract, multiply,
        or divide). The calculator instantly shows the result as both a simplified fraction and a decimal value.
        The result is reduced to its lowest terms using the greatest common divisor (GCD).
      </Typography>

      <Typography variant="h2">Formula</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        a/b + c/d = (a×d + b×c) / (b×d)
        <br />
        a/b − c/d = (a×d − b×c) / (b×d)
        <br />
        a/b × c/d = (a×c) / (b×d)
        <br />
        a/b ÷ c/d = (a×d) / (b×c)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Add 1/2 and 1/3: the result is (1×3 + 1×2) / (2×3) = 5/6. As a decimal, that equals approximately 0.8333.
        Multiplying 1/2 × 1/3 gives 1/6 (≈ 0.1667).
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What does &quot;simplified form&quot; mean?</strong> The fraction is reduced so that the numerator and denominator share no common factor other than 1 — for example, 4/8 becomes 1/2.</li>
          <li><strong>What happens if the denominator is zero?</strong> Division by zero is mathematically undefined. The calculator will show a result of 0 for the division case if the denominator becomes zero.</li>
          <li><strong>Can I enter negative fractions?</strong> Yes — enter a negative sign in the numerator field (e.g., −3/4). The simplification step handles signs automatically.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding or subtracting recipe measurements expressed in fractions.</li>
          <li>Resolving homework problems involving fraction arithmetic.</li>
          <li>Converting mixed fraction operations into a single simplified result.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/fraction-calculator" content={content}>
      <FractionCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FractionCalculator;
