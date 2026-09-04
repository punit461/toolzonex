'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, IconButton, Stack, Paper, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Shape = 'rectangle' | 'circle' | 'triangle';

interface Section {
  id: string;
  shape: Shape;
  dim1: string;
  dim2: string;
}

let nextId = 3;

const areaOf = (shape: Shape, dim1: number, dim2: number): number => {
  if (Number.isNaN(dim1) || dim1 < 0) return 0;
  if (shape === 'rectangle') return Number.isNaN(dim2) || dim2 < 0 ? 0 : dim1 * dim2;
  if (shape === 'circle') return Math.PI * dim1 * dim1;
  return Number.isNaN(dim2) || dim2 < 0 ? 0 : 0.5 * dim1 * dim2;
};

const dimLabels = (shape: Shape): [string, string | null] => {
  if (shape === 'rectangle') return ['Length (ft)', 'Width (ft)'];
  if (shape === 'circle') return ['Radius (ft)', null];
  return ['Base (ft)', 'Height (ft)'];
};

const LawnAreaCalculator = () => {
  const [sections, setSections] = useState<Section[]>([
    { id: '1', shape: 'rectangle', dim1: '40', dim2: '25' },
    { id: '2', shape: 'circle', dim1: '8', dim2: '' },
  ]);

  const addSection = () => setSections([...sections, { id: String(nextId++), shape: 'rectangle', dim1: '', dim2: '' }]);
  const removeSection = (id: string) => setSections(sections.filter((s) => s.id !== id));
  const updateSection = (id: string, field: keyof Section, val: string) => {
    setSections(sections.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const { rows, totalSqFt } = useMemo(() => {
    const rows = sections.map((s) => ({ ...s, area: areaOf(s.shape, parseFloat(s.dim1), parseFloat(s.dim2)) }));
    const totalSqFt = rows.reduce((sum, r) => sum + r.area, 0);
    return { rows, totalSqFt };
  }, [sections]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate the Area of an Irregularly-Shaped Lawn</Typography>
      <Typography variant="body1">
        Most yards aren&apos;t one clean rectangle — they&apos;re made up of a few simple shapes stitched
        together around a house, driveway, or garden bed. This calculator lets you break your lawn into
        sections (rectangles, circles, and triangles), enter the dimensions of each, and adds up every
        section&apos;s area for a total lawn size.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Rectangle = L × W &nbsp;|&nbsp; Circle = π × r² &nbsp;|&nbsp; Triangle = ½ × Base × Height
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A main rectangular lawn of 40 ft × 25 ft (1,000 sq ft) plus a circular section around a tree with an
        8 ft radius (about 201 sq ft) gives a total lawn area of roughly 1,201 sq ft — about 0.028 acres.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting an accurate total area for an L-shaped, curved, or multi-section yard.</li>
          <li>Feeding a correct square footage into a seed, fertilizer, or sod calculator.</li>
          <li>Comparing the size of different sections of a yard for landscaping planning.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What if part of my lawn is an odd shape that isn&apos;t listed?</Typography>
      <Typography variant="body1">
        Approximate it with the closest simple shape available, or split it into two or three sections that
        together resemble the actual area — for most residential yards, a combination of rectangles, circles,
        and triangles gets you close enough for seed, fertilizer, or mulch estimates.
      </Typography>
      <Typography variant="h3">Should I subtract driveways, patios, or garden beds?</Typography>
      <Typography variant="body1">
        Yes — this calculator adds up only the sections you enter, so simply don&apos;t include paved or
        planted areas as lawn sections, or add them as a separate negative check against your total property
        size.
      </Typography>
      <Typography variant="h3">How do I convert the result to acres?</Typography>
      <Typography variant="body1">
        Divide the total square footage by 43,560 (the number of square feet in an acre). The result box below
        shows this conversion automatically alongside the square footage total.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/lawn-area-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 6 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Lawn Sections</Typography>
          <Stack spacing={2}>
            {rows.map((s, index) => {
              const [label1, label2] = dimLabels(s.shape);
              return (
                <Stack key={s.id} direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
                  <Typography sx={{ minWidth: 24, color: 'text.secondary' }}>#{index + 1}</Typography>
                  <TextField
                    select label="Shape" size="small" sx={{ minWidth: 130 }}
                    value={s.shape}
                    onChange={(e) => updateSection(s.id, 'shape', e.target.value)}
                  >
                    <MenuItem value="rectangle">Rectangle</MenuItem>
                    <MenuItem value="circle">Circle</MenuItem>
                    <MenuItem value="triangle">Triangle</MenuItem>
                  </TextField>
                  <TextField
                    label={label1} type="number" size="small" sx={{ minWidth: 110 }}
                    onFocus={(e) => e.target.select()}
                    value={s.dim1}
                    onChange={(e) => updateSection(s.id, 'dim1', e.target.value)}
                  />
                  {label2 && (
                    <TextField
                      label={label2} type="number" size="small" sx={{ minWidth: 110 }}
                      onFocus={(e) => e.target.select()}
                      value={s.dim2}
                      onChange={(e) => updateSection(s.id, 'dim2', e.target.value)}
                    />
                  )}
                  <Typography variant="body2" color="text.secondary" sx={{ minWidth: 90 }}>{s.area.toFixed(1)} sq ft</Typography>
                  <IconButton color="error" size="small" onClick={() => removeSection(s.id)} disabled={sections.length <= 1}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              );
            })}
          </Stack>
          <Button startIcon={<AddIcon />} onClick={addSection} sx={{ mt: 2 }}>Add Section</Button>
        </Box>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', height: 'fit-content' }}>
          <Typography variant="body2" color="text.secondary">Total Lawn Area</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{totalSqFt.toFixed(1)} sq ft</Typography>
          <Typography variant="body1" color="text.secondary">{(totalSqFt / 9).toFixed(1)} sq yd</Typography>
          <Typography variant="caption" color="text.secondary">{(totalSqFt / 43560).toFixed(4)} acres</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LawnAreaCalculator;
