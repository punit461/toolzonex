'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Root {
  real: number;
  imag: number;
}

const fmtNum = (n: number): string => {
  if (!isFinite(n)) return '∞';
  const r = Math.round(n * 10000) / 10000;
  return String(r);
};

const fmtRoot = (r: Root): string => {
  const re = fmtNum(r.real);
  if (Math.abs(r.imag) < 1e-9) return re;
  const sign = r.imag >= 0 ? '+' : '−';
  return `${re} ${sign} ${fmtNum(Math.abs(r.imag))}i`;
};

const solveCubic = (a: number, b: number, c: number, d: number): Root[] => {
  if (a === 0) {
    // Not a cubic; degenerate to a quadratic/linear if possible.
    if (b === 0) return c !== 0 ? [{ real: -d / c, imag: 0 }] : [];
    const disc = c * c - 4 * b * d;
    if (disc < 0) return [];
    return [
      { real: (-c + Math.sqrt(disc)) / (2 * b), imag: 0 },
      { real: (-c - Math.sqrt(disc)) / (2 * b), imag: 0 },
    ];
  }

  const A2 = b / a;
  const A1 = c / a;
  const A0 = d / a;

  const p = A1 - (A2 * A2) / 3;
  const q = (2 * A2 * A2 * A2) / 27 - (A2 * A1) / 3 + A0;
  const shift = -A2 / 3;

  const D = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);

  if (D > 1e-12) {
    const sqrtD = Math.sqrt(D);
    const u = Math.cbrt(-q / 2 + sqrtD);
    const v = Math.cbrt(-q / 2 - sqrtD);
    const realRoot = u + v + shift;
    const re = -(u + v) / 2 + shift;
    const im = (Math.sqrt(3) / 2) * (u - v);
    return [
      { real: realRoot, imag: 0 },
      { real: re, imag: im },
      { real: re, imag: -im },
    ];
  }

  if (Math.abs(D) <= 1e-12) {
    const u = Math.cbrt(-q / 2);
    return [
      { real: 2 * u + shift, imag: 0 },
      { real: -u + shift, imag: 0 },
      { real: -u + shift, imag: 0 },
    ];
  }

  // D < 0: three distinct real roots (trigonometric form).
  const r = Math.sqrt(-p / 3);
  const phi = Math.acos(Math.max(-1, Math.min(1, -q / (2 * Math.pow(r, 3)))));
  const roots: Root[] = [];
  for (let k = 0; k < 3; k++) {
    const t = 2 * r * Math.cos((phi - 2 * Math.PI * k) / 3);
    roots.push({ real: t + shift, imag: 0 });
  }
  return roots;
};

const CubicEquationSolver = () => {
  const [a, setA] = useState<string>('1');
  const [b, setB] = useState<string>('0');
  const [c, setC] = useState<string>('0');
  const [d, setD] = useState<string>('-8');

  const roots = useMemo(() => {
    return solveCubic(parseFloat(a) || 0, parseFloat(b) || 0, parseFloat(c) || 0, parseFloat(d) || 0);
  }, [a, b, c, d]);

  const content = (
    <>
      <Typography variant="h2">What is a cubic equation?</Typography>
      <Typography variant="body1">
        A cubic equation has the form ax³ + bx² + cx + d = 0, where a ≠ 0. Depending on its coefficients it
        can have one real root and two complex conjugate roots, or three real roots. This solver uses
        Cardano&apos;s method with a trigonometric fallback for three-real-root cases.
      </Typography>

      <Typography variant="h2">Method</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Depress: x = t − b/(3a) → t³ + pt + q = 0
        <br />
        Discriminant Δ = (q/2)² + (p/3)³
        <br />
        Δ &gt; 0: one real root; Δ &lt; 0: three real roots; Δ = 0: repeated roots
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For x³ − 8 = 0 (a=1, b=0, c=0, d=−8), the real root is x = 2. Complex cases appear whenever Δ &gt; 0,
        and you&apos;ll see the two conjugate roots in the result.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding roots of polynomials in algebra and calculus.</li>
          <li>Modeling volume, growth, and physics problems.</li>
          <li>Checking factorisations by locating real roots.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do I sometimes get complex roots?</Typography>
      <Typography variant="body1">
        A cubic always has three roots (counting multiplicity). When the discriminant is positive, only one
        is real and the other two are complex conjugates — the tool shows all of them.
      </Typography>
      <Typography variant="h3">What if a = 0?</Typography>
      <Typography variant="body1">
        The equation is no longer cubic. The solver degrades gracefully to a quadratic/linear solve so you
        still get the available real roots.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/cubic-equation-solver" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Solve <strong>ax³ + bx² + cx + d = 0</strong>
          </Typography>
          <TextField
            label="Coefficient a (x³)"
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            fullWidth
          />
          <TextField
            label="Coefficient b (x²)"
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            fullWidth
          />
          <TextField
            label="Coefficient c (x)"
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            fullWidth
          />
          <TextField
            label="Coefficient d (constant)"
            type="number"
            value={d}
            onChange={(e) => setD(e.target.value)}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Roots
          </Typography>
          {roots.length === 0 && (
            <Typography variant="body1" color="text.secondary">
              No real roots for the given coefficients.
            </Typography>
          )}
          {roots.map((r, i) => (
            <Paper
              key={i}
              sx={{
                p: 2,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                bgcolor: 'primary.main',
                color: 'white',
              }}
            >
              <Typography variant="h6">x{i + 1}</Typography>
              <Typography variant="h6" fontWeight="bold">
                {fmtRoot(r)}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default CubicEquationSolver;
