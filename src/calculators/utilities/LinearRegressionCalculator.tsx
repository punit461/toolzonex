'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Point {
  x: string;
  y: string;
}

const LinearRegressionCalculator = () => {
  const [points, setPoints] = useState<Point[]>([
    { x: '1', y: '2.2' },
    { x: '2', y: '4.1' },
    { x: '3', y: '5.8' },
    { x: '4', y: '8.3' },
    { x: '5', y: '9.9' },
  ]);

  const result = useMemo(() => {
    const valid = points
      .map((p) => ({ x: parseFloat(p.x), y: parseFloat(p.y) }))
      .filter((p) => !Number.isNaN(p.x) && !Number.isNaN(p.y));

    const n = valid.length;
    if (n < 2) return null;

    const sumX = valid.reduce((a, p) => a + p.x, 0);
    const sumY = valid.reduce((a, p) => a + p.y, 0);
    const sumXY = valid.reduce((a, p) => a + p.x * p.y, 0);
    const sumX2 = valid.reduce((a, p) => a + p.x * p.x, 0);
    const sumY2 = valid.reduce((a, p) => a + p.y * p.y, 0);

    const denom = n * sumX2 - sumX * sumX;
    if (denom === 0) return null;

    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;

    const rDenom = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const r = rDenom === 0 ? 0 : (n * sumXY - sumX * sumY) / rDenom;
    const rSquared = r * r;

    return { slope, intercept, rSquared, n };
  }, [points]);

  const updatePoint = (index: number, field: keyof Point, value: string) => {
    setPoints((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const addPoint = () => setPoints((prev) => [...prev, { x: '', y: '' }]);
  const removePoint = (index: number) => setPoints((prev) => prev.filter((_, i) => i !== index));

  const content = (
    <>
      <Typography variant="h2">How Linear Regression Works</Typography>
      <Typography variant="body1">
        Linear regression finds the straight line, y = mx + b, that best fits a set of (x, y) data points by
        minimizing the sum of squared vertical distances between the line and each point (the &quot;least
        squares&quot; method). The slope (m) shows how much y changes per unit of x, the intercept (b) is the
        predicted y value when x is 0, and R² (the coefficient of determination) shows how well the line fits
        the data, from 0 (no fit) to 1 (perfect fit).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        m = (nΣxy − ΣxΣy) ÷ (nΣx² − (Σx)²) &nbsp;|&nbsp; b = (Σy − mΣx) ÷ n
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For the points (1, 2.2), (2, 4.1), (3, 5.8), (4, 8.3), and (5, 9.9), the least-squares line comes out to
        approximately y = 1.95x + 0.13, with an R² close to 0.998 — indicating the points fall very close to a
        straight line.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the trend line for a scatter plot of experimental or business data.</li>
          <li>Predicting a y value for a new x value based on an established linear relationship.</li>
          <li>Checking how strongly two variables are linearly correlated using R².</li>
          <li>Statistics coursework covering least-squares regression.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does R² actually tell me?</Typography>
      <Typography variant="body1">
        R² represents the proportion of variation in y that&apos;s explained by the linear relationship with x.
        An R² of 0.998 means about 99.8% of the variation in y is explained by the fitted line, while values
        closer to 0 mean the linear model explains very little of the pattern in the data.
      </Typography>
      <Typography variant="h3">How many data points do I need?</Typography>
      <Typography variant="body1">
        At least 2 points are needed to define a line mathematically, but 2 points will always produce a
        perfect R² of 1 regardless of any real relationship. Meaningful regression analysis typically needs
        several data points to reveal whether a genuine linear trend exists.
      </Typography>
      <Typography variant="h3">What if my data isn&apos;t actually linear?</Typography>
      <Typography variant="body1">
        Linear regression will still produce a best-fit straight line and an R² value, but a low R² is a signal
        that the relationship between x and y may be curved, cyclical, or otherwise non-linear, and a different
        type of model might describe the data better.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/linear-regression-calculator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        {points.map((point, i) => (
          <Box key={i} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 2, alignItems: 'center' }}>
            <TextField
              label={`x${i + 1}`}
              type="number"
              value={point.x}
              onChange={(e) => updatePoint(i, 'x', e.target.value)}
              onFocus={(e) => e.target.select()}
              fullWidth
            />
            <TextField
              label={`y${i + 1}`}
              type="number"
              value={point.y}
              onChange={(e) => updatePoint(i, 'y', e.target.value)}
              onFocus={(e) => e.target.select()}
              fullWidth
            />
            <IconButton onClick={() => removePoint(i)} disabled={points.length <= 2} aria-label="Remove point">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddIcon />} onClick={addPoint} variant="outlined" sx={{ alignSelf: 'flex-start' }}>
          Add Data Point
        </Button>
      </Box>

      <Paper sx={{ p: 3, bgcolor: 'action.hover' }}>
        {result ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2, textAlign: 'center' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Slope (m)</Typography>
              <Typography variant="h5" fontWeight={800} color="primary.main">{result.slope.toFixed(4)}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Intercept (b)</Typography>
              <Typography variant="h5" fontWeight={800} color="primary.main">{result.intercept.toFixed(4)}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">R²</Typography>
              <Typography variant="h5" fontWeight={800} color="primary.main">{result.rSquared.toFixed(4)}</Typography>
            </Box>
            <Box sx={{ gridColumn: '1 / -1' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                y = {result.slope.toFixed(4)}x {result.intercept >= 0 ? '+' : '−'} {Math.abs(result.intercept).toFixed(4)}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary" textAlign="center">Enter at least 2 valid (x, y) points with varying x values</Typography>
        )}
      </Paper>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LinearRegressionCalculator;
