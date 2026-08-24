'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function formatNum(n: number): string {
  return Number.isFinite(n) ? parseFloat(n.toFixed(4)).toString() : '—';
}

const QuadraticEquationSolver = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-3);
  const [c, setC] = useState<number>(2);

  const result = useMemo(() => {
    const av = Number.isNaN(a) ? 0 : a;
    const bv = Number.isNaN(b) ? 0 : b;
    const cv = Number.isNaN(c) ? 0 : c;

    if (av === 0) {
      return { invalid: true } as const;
    }

    const discriminant = bv * bv - 4 * av * cv;
    const vertexX = -bv / (2 * av);
    const vertexY = cv - (bv * bv) / (4 * av);

    if (discriminant > 0) {
      const sqrtD = Math.sqrt(discriminant);
      const x1 = (-bv + sqrtD) / (2 * av);
      const x2 = (-bv - sqrtD) / (2 * av);
      return { invalid: false, discriminant, type: 'real-distinct', x1, x2, vertexX, vertexY } as const;
    }
    if (discriminant === 0) {
      const x = -bv / (2 * av);
      return { invalid: false, discriminant, type: 'real-repeated', x, vertexX, vertexY } as const;
    }
    const real = -bv / (2 * av);
    const imag = Math.sqrt(-discriminant) / (2 * av);
    return { invalid: false, discriminant, type: 'complex', real, imag: Math.abs(imag), vertexX, vertexY } as const;
  }, [a, b, c]);

  const content = (
    <>
      <Typography variant="h2">How to Solve a Quadratic Equation</Typography>
      <Typography variant="body1">
        A quadratic equation has the form ax² + bx + c = 0, where a, b, and c are coefficients and a ≠ 0. Enter
        the three coefficients below to find its roots using the quadratic formula, along with the discriminant
        and the equation&apos;s vertex form.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        x = (−b ± √(b² − 4ac)) ÷ 2a
      </Box>
      <Typography variant="body1">
        The discriminant (b² − 4ac) tells you what kind of roots to expect: positive means two distinct real
        roots, zero means one repeated real root, and negative means two complex (imaginary) roots.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For x² − 3x + 2 = 0 (a=1, b=−3, c=2), the discriminant is (−3)² − 4(1)(2) = 1, which is positive, giving
        two real roots: x = 2 and x = 1.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Solving algebra homework problems involving quadratic equations.</li>
          <li>Finding the roots of a parabola, such as where a projectile&apos;s height equals zero.</li>
          <li>Finding a parabola&apos;s vertex (maximum or minimum point) for graphing or optimization problems.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does a negative discriminant mean?</Typography>
      <Typography variant="body1">
        A negative discriminant means the equation has no real roots — the parabola never crosses the x-axis.
        Instead, it has two complex conjugate roots of the form p ± qi, where i is the imaginary unit
        (√−1).
      </Typography>
      <Typography variant="h3">What is vertex form and why does it matter?</Typography>
      <Typography variant="body1">
        Vertex form rewrites the equation as a(x − h)² + k, where (h, k) is the vertex — the parabola&apos;s
        highest or lowest point. It&apos;s useful for quickly reading off the maximum or minimum value of the
        expression without solving for the roots.
      </Typography>
      <Typography variant="h3">What if I enter a = 0?</Typography>
      <Typography variant="body1">
        With a = 0 the equation is no longer quadratic — it becomes linear (bx + c = 0) — so this calculator
        requires a non-zero value for a to solve it as a proper quadratic equation.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/quadratic-equation-solver" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>ax² + bx + c = 0</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            <TextField
              label="a"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(a) ? '' : a}
              onChange={(e) => setA(e.target.value === '' ? NaN : Number(e.target.value))}
            />
            <TextField
              label="b"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(b) ? '' : b}
              onChange={(e) => setB(e.target.value === '' ? NaN : Number(e.target.value))}
            />
            <TextField
              label="c"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(c) ? '' : c}
              onChange={(e) => setC(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {result.invalid ? (
              <Typography variant="body1" color="error" textAlign="center">
                &quot;a&quot; cannot be 0 — this is not a quadratic equation.
              </Typography>
            ) : (
              <>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Discriminant</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{formatNum(result.discriminant)}</Typography>

                <Typography variant="subtitle2" color="text.secondary" gutterBottom>Roots</Typography>
                {result.type === 'real-distinct' && (
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
                    x₁ = {formatNum(result.x1)}, x₂ = {formatNum(result.x2)}
                  </Typography>
                )}
                {result.type === 'real-repeated' && (
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
                    x = {formatNum(result.x)} (repeated)
                  </Typography>
                )}
                {result.type === 'complex' && (
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
                    x = {formatNum(result.real)} ± {formatNum(result.imag)}i
                  </Typography>
                )}

                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mt: 1 }}>Vertex</Typography>
                <Typography variant="body1">
                  ({formatNum(result.vertexX)}, {formatNum(result.vertexY)})
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default QuadraticEquationSolver;
