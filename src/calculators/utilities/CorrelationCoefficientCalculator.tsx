'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Point {
  id: string;
  x: number;
  y: number;
}

let nextId = 5;

const CorrelationCoefficientCalculator = () => {
  const [points, setPoints] = useState<Point[]>([
    { id: '1', x: 1, y: 2 },
    { id: '2', x: 2, y: 4 },
    { id: '3', x: 3, y: 5 },
    { id: '4', x: 4, y: 8 },
  ]);

  const addPoint = () => setPoints([...points, { id: String(nextId++), x: 0, y: 0 }]);
  const removePoint = (id: string) => setPoints(points.filter((p) => p.id !== id));
  const updatePoint = (id: string, field: 'x' | 'y', val: number) => {
    setPoints(points.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  };

  const r = useMemo(() => {
    const valid = points.filter((p) => !Number.isNaN(p.x) && !Number.isNaN(p.y));
    const n = valid.length;
    if (n < 2) return null;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (const p of valid) {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumX2 += p.x * p.x;
      sumY2 += p.y * p.y;
    }
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    return denominator !== 0 ? numerator / denominator : null;
  }, [points]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the Pearson Correlation Coefficient</Typography>
      <Typography variant="body1">
        The Pearson correlation coefficient (r) measures the strength and direction of a linear relationship
        between two numeric variables. It ranges from -1 (a perfect negative relationship) to +1 (a perfect
        positive relationship), with 0 meaning no linear relationship. Add your x/y data pairs below to compute
        r.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        r = (nΣxy − ΣxΣy) ÷ √[(nΣx² − (Σx)²)(nΣy² − (Σy)²)]
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The pairs (1,2), (2,4), (3,5), and (4,8) give n=4, Σx=10, Σy=19, Σxy=57, Σx²=30, and Σy²=109. Plugging
        into the formula: r = (4×57 − 10×19) ÷ √[(4×30 − 100)(4×109 − 361)] = 38 ÷ √1,500 ≈ 0.98, indicating a
        very strong positive relationship.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether two variables — like study hours and test scores — move together.</li>
          <li>Quick statistical sanity-checks before building a regression model.</li>
          <li>Evaluating the relationship between marketing spend and sales, or similar business metrics.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does an r value close to 0 versus ±1 mean?</Typography>
      <Typography variant="body1">
        An r near 0 means little to no linear relationship between the two variables — knowing one tells you
        almost nothing about the other. An r close to +1 or -1 means the variables track each other closely in
        a straight-line pattern, either both increasing together (positive) or one increasing as the other
        decreases (negative).
      </Typography>
      <Typography variant="h3">Does correlation imply causation?</Typography>
      <Typography variant="body1">
        No — a strong correlation only shows that two variables move together, not that one causes the other.
        Both could be driven by a third factor, or the relationship could be coincidental, especially with a
        small dataset.
      </Typography>
      <Typography variant="h3">How many data points do I need for a meaningful result?</Typography>
      <Typography variant="body1">
        Mathematically, the formula works with as few as 2 pairs, but a correlation from just a handful of
        points can be misleadingly high or low. For a result you can actually rely on, aim for at least 5-10 or
        more data points, and more for noisy real-world data.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/correlation-coefficient-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Data Points (x, y)</Typography>
          <Stack spacing={2}>
            {points.map((p, index) => (
              <Stack key={p.id} direction="row" spacing={1.5} alignItems="center">
                <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                <TextField
                  label="x" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(p.x) ? '' : p.x}
                  onChange={(e) => updatePoint(p.id, 'x', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <TextField
                  label="y" type="number" size="small" fullWidth
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(p.y) ? '' : p.y}
                  onChange={(e) => updatePoint(p.id, 'y', e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <IconButton color="error" size="small" onClick={() => removePoint(p.id)} disabled={points.length <= 2}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addPoint} sx={{ mt: 2 }}>Add Point</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Correlation Coefficient (r)</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{r !== null ? r.toFixed(4) : '—'}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CorrelationCoefficientCalculator;
