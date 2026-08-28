'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const fmt = (n: number): string => {
  if (!isFinite(n)) return '∞';
  const r = Math.round(n * 10000) / 10000;
  return String(r);
};

const emptyMatrix = (d: number): string[][] =>
  Array.from({ length: d }, () => Array.from({ length: d }, () => '0'));

const toNum = (m: string[][]): number[][] => m.map((row) => row.map((v) => parseFloat(v) || 0));

const add = (a: number[][], b: number[][]): number[][] =>
  a.map((row, i) => row.map((v, j) => v + b[i][j]));

const subtract = (a: number[][], b: number[][]): number[][] =>
  a.map((row, i) => row.map((v, j) => v - b[i][j]));

const multiply = (a: number[][], b: number[][]): number[][] => {
  const d = a.length;
  const out = emptyMatrix(d).map((row) => row.map(() => 0));
  for (let i = 0; i < d; i++)
    for (let j = 0; j < d; j++)
      for (let k = 0; k < d; k++) out[i][j] += a[i][k] * b[k][j];
  return out;
};

const transpose = (a: number[][]): number[][] =>
  a.map((_, i) => a.map((row) => row[i]));

const determinant = (a: number[][]): number => {
  const d = a.length;
  if (d === 2) return a[0][0] * a[1][1] - a[0][1] * a[1][0];
  return (
    a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
    a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
    a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0])
  );
};

const inverse = (a: number[][]): number[][] | null => {
  const d = a.length;
  const det = determinant(a);
  if (det === 0) return null;
  if (d === 2) {
    return [
      [a[1][1] / det, -a[0][1] / det],
      [-a[1][0] / det, a[0][0] / det],
    ];
  }
  const cof = (r: number, c: number): number => {
    const minor = a
      .filter((_, i) => i !== r)
      .map((row) => row.filter((_, j) => j !== c));
    const sign = (r + c) % 2 === 0 ? 1 : -1;
    return sign * determinant(minor);
  };
  const adj = a.map((_, i) => a.map((__, j) => cof(j, i)));
  return adj.map((row) => row.map((v) => v / det));
};

const MatrixCalculator = () => {
  const [dim, setDim] = useState<number>(2);
  const [op, setOp] = useState<string>('add');
  const [A, setA] = useState<string[][]>(emptyMatrix(2));
  const [B, setB] = useState<string[][]>(emptyMatrix(2));

  const needsTwo = op === 'add' || op === 'subtract' || op === 'multiply';

  const onDimChange = (d: number) => {
    setDim(d);
    setA(emptyMatrix(d));
    setB(emptyMatrix(d));
  };

  const setCell = (
    setter: React.Dispatch<React.SetStateAction<string[][]>>,
    i: number,
    j: number,
    val: string
  ) => {
    setter((prev) => {
      const next = prev.map((row) => [...row]);
      next[i][j] = val;
      return next;
    });
  };

  const result = useMemo(() => {
    const a = toNum(A);
    const b = toNum(B);
    switch (op) {
      case 'add':
        return { single: null as number | null, matrix: add(a, b) };
      case 'subtract':
        return { single: null, matrix: subtract(a, b) };
      case 'multiply':
        return { single: null, matrix: multiply(a, b) };
      case 'transpose':
        return { single: null, matrix: transpose(a) };
      case 'determinant':
        return { single: determinant(a), matrix: null };
      case 'inverse': {
        const inv = inverse(a);
        return { single: null, matrix: inv, singular: inv === null };
      }
      default:
        return { single: null, matrix: a };
    }
  }, [op, A, B]);

  const content = (
    <>
      <Typography variant="h2">What is a matrix calculator?</Typography>
      <Typography variant="body1">
        A matrix calculator performs linear-algebra operations on 2&times;2 and 3&times;3 matrices —
        addition, subtraction, multiplication, the determinant, the inverse, and the transpose. These
        operations underpin systems of equations, computer graphics, and data transformations.
      </Typography>

      <Typography variant="h2">Formulas</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        (A + B)ᵢⱼ = Aᵢⱼ + Bᵢⱼ &nbsp;|&nbsp; (A &minus; B)ᵢⱼ = Aᵢⱼ &minus; Bᵢⱼ
        <br />
        (AB)ᵢⱼ = Σₖ Aᵢₖ Bₖⱼ &nbsp;|&nbsp; (Aᵀ)ᵢⱼ = Aⱼᵢ
        <br />
        det([[a,b],[c,d]]) = ad &minus; bc
        <br />
        A⁻¹ = adj(A) / det(A)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For A = [[1,2],[3,4]] and B = [[5,6],[7,8]], A + B = [[6,8],[10,12]] and det(A) = 1&times;4
        &minus; 2&times;3 = &minus;2.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Solving small systems of linear equations.</li>
          <li>Computing transformations in 2D/3D graphics.</li>
          <li>Quickly checking determinant or inverse values by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What happens if a matrix is not invertible?</Typography>
      <Typography variant="body1">
        A matrix whose determinant is zero is &quot;singular&quot; and has no inverse. This tool shows a
        Singular matrix message instead of a numeric result.
      </Typography>
      <Typography variant="h3">Can I multiply matrices of different sizes here?</Typography>
      <Typography variant="body1">
        This tool keeps both matrices the same square size (2&times;2 or 3&times;3) so addition,
        subtraction, and multiplication are always defined.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/matrix-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="matrix-dim">Size</InputLabel>
              <Select
                labelId="matrix-dim"
                label="Size"
                value={dim}
                onChange={(e) => onDimChange(Number(e.target.value))}
              >
                <MenuItem value={2}>2 &times; 2</MenuItem>
                <MenuItem value={3}>3 &times; 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="matrix-op">Operation</InputLabel>
              <Select labelId="matrix-op" label="Operation" value={op} onChange={(e) => setOp(e.target.value)}>
                <MenuItem value="add">Add (A + B)</MenuItem>
                <MenuItem value="subtract">Subtract (A &minus; B)</MenuItem>
                <MenuItem value="multiply">Multiply (A &times; B)</MenuItem>
                <MenuItem value="determinant">Determinant (det A)</MenuItem>
                <MenuItem value="inverse">Inverse (A⁻¹)</MenuItem>
                <MenuItem value="transpose">Transpose (Aᵀ)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Matrix A
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${dim}, 80px)`,
                gap: 1,
              }}
            >
              {A.map((row, i) =>
                row.map((cell, j) => (
                  <TextField
                    key={`a-${i}-${j}`}
                    size="small"
                    type="number"
                    value={cell}
                    onChange={(e) => setCell(setA, i, j, e.target.value)}
                    sx={{ '& input': { textAlign: 'center' } }}
                  />
                ))
              )}
            </Box>
          </Box>

          {needsTwo && (
            <Box>
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Matrix B
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${dim}, 80px)`,
                  gap: 1,
                }}
              >
                {B.map((row, i) =>
                  row.map((cell, j) => (
                    <TextField
                      key={`b-${i}-${j}`}
                      size="small"
                      type="number"
                      value={cell}
                      onChange={(e) => setCell(setB, i, j, e.target.value)}
                      sx={{ '& input': { textAlign: 'center' } }}
                    />
                  ))
                )}
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Result
          </Typography>
          {result.single !== null && (
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                bgcolor: 'primary.main',
                color: 'white',
              }}
            >
              <Typography variant="h6">Determinant</Typography>
              <Typography variant="h6" fontWeight="bold">
                {fmt(result.single)}
              </Typography>
            </Paper>
          )}
          {result.matrix && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${dim}, 1fr)`,
                gap: 1,
                maxWidth: 360,
              }}
            >
              {result.matrix.map((row, i) =>
                row.map((cell, j) => (
                  <Paper key={`r-${i}-${j}`} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h6">{fmt(cell)}</Typography>
                  </Paper>
                ))
              )}
            </Box>
          )}
          {op === 'inverse' && result.singular && (
            <Typography variant="body1" color="error" mt={2}>
              Singular matrix — the determinant is zero, so no inverse exists.
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default MatrixCalculator;
