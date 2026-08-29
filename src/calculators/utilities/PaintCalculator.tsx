'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, IconButton, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface WallRow {
  id: number;
  length: string;
  height: string;
}

const PaintCalculator = () => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [walls, setWalls] = useState<WallRow[]>([
    { id: 1, length: '12', height: '9' },
    { id: 2, length: '10', height: '9' },
  ]);
  const [nextId, setNextId] = useState(3);
  const [coats, setCoats] = useState<string>('2');
  const [coverage, setCoverage] = useState<string>('350');

  const addWall = () => {
    setWalls([...walls, { id: nextId, length: '', height: '' }]);
    setNextId(nextId + 1);
  };
  const removeWall = (id: number) => setWalls(walls.filter((w) => w.id !== id));
  const updateWall = (id: number, field: 'length' | 'height', value: string) => {
    setWalls(walls.map((w) => (w.id === id ? { ...w, [field]: value } : w)));
  };

  const handleUnitChange = (newUnit: 'imperial' | 'metric') => {
    setUnit(newUnit);
    setCoverage(newUnit === 'imperial' ? '350' : '10');
  };

  const { totalArea, gallonsNeeded } = useMemo(() => {
    const area = walls.reduce((sum, w) => {
      const l = parseFloat(w.length);
      const h = parseFloat(w.height);
      return sum + (isNaN(l) || isNaN(h) ? 0 : l * h);
    }, 0);
    const c = parseFloat(coats) || 0;
    const cov = parseFloat(coverage) || 0;
    const needed = cov > 0 ? (area * c) / cov : 0;
    return { totalArea: area, gallonsNeeded: needed };
  }, [walls, coats, coverage]);

  const areaUnit = unit === 'imperial' ? 'sq ft' : 'm²';
  const volUnit = unit === 'imperial' ? 'gallons' : 'liters';

  const content = (
    <>
      <Typography variant="h2">How to Calculate How Much Paint You Need</Typography>
      <Typography variant="body1">
        Add each wall you plan to paint with its length and height, choose how many coats you&apos;ll apply, and
        set your paint&apos;s coverage rate (how much area one gallon or liter covers). The calculator totals
        the wall area, multiplies by the number of coats, and divides by your paint&apos;s coverage rate to tell
        you how much paint to buy.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Paint Needed = (Total Wall Area × Coats) / Coverage Rate
      </Box>
      <Typography variant="body2" color="text.secondary">
        This doesn&apos;t subtract door or window area — for a more precise estimate, reduce a wall&apos;s
        height/length slightly or remove large openings from the total manually.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Two walls measuring 12×9 ft and 10×9 ft give a total area of 108 + 90 = 198 sq ft. With 2 coats and a
        paint that covers 350 sq ft per gallon, you&apos;d need (198 × 2) / 350 = 1.13 gallons.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many gallons or liters of paint to buy for a room or set of walls.</li>
          <li>Planning paint quantities for a multi-coat job before heading to the store.</li>
          <li>Budgeting a painting project by knowing exactly how much material is required.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What coverage rate should I use?</Typography>
      <Typography variant="body1">
        Check the paint can label — most interior paints cover roughly 350-400 sq ft per gallon (about 8-10 m²
        per liter) for a single coat, though rougher or more porous surfaces reduce coverage. Adjust the
        coverage field to match your specific paint.
      </Typography>
      <Typography variant="h3">Should I round up the final amount?</Typography>
      <Typography variant="body1">
        Yes — paint is sold in fixed can sizes, so round the result up to the nearest can size (e.g., a gallon
        or a liter) and consider a small buffer for touch-ups or an uneven surface.
      </Typography>
      <Typography variant="h3">Do ceilings count as walls here?</Typography>
      <Typography variant="body1">
        You can add a ceiling as an extra row using its length and width as the two dimensions — the calculator
        just multiplies the two numbers you enter, so it works for any flat surface.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/paint-calculator" content={content}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && handleUnitChange(v)} size="small">
          <ToggleButton value="imperial">Feet / Gallons</ToggleButton>
          <ToggleButton value="metric">Meters / Liters</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>Walls</Typography>
          {walls.map((w) => (
            <Box key={w.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                label={`Length (${unit === 'imperial' ? 'ft' : 'm'})`}
                type="number"
                size="small"
                value={w.length}
                onChange={(e) => updateWall(w.id, 'length', e.target.value)}
                onFocus={(e) => e.target.select()}
                sx={{ flex: 1 }}
              />
              <TextField
                label={`Height (${unit === 'imperial' ? 'ft' : 'm'})`}
                type="number"
                size="small"
                value={w.height}
                onChange={(e) => updateWall(w.id, 'height', e.target.value)}
                onFocus={(e) => e.target.select()}
                sx={{ flex: 1 }}
              />
              <IconButton onClick={() => removeWall(w.id)} size="small" aria-label="Remove wall">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={addWall} variant="outlined" size="small" sx={{ alignSelf: 'flex-start' }}>
            Add Wall
          </Button>

          <TextField label="Number of Coats" type="number" value={coats} onChange={(e) => setCoats(e.target.value)} onFocus={(e) => e.target.select()} sx={{ mt: 2 }} />
          <TextField
            label={`Coverage Rate (${areaUnit} per ${unit === 'imperial' ? 'gallon' : 'liter'})`}
            type="number"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Total Wall Area</Typography>
            <Typography variant="h5" fontWeight={700}>{totalArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} {areaUnit}</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Paint Needed</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {gallonsNeeded.toLocaleString(undefined, { maximumFractionDigits: 2 })} {volUnit}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PaintCalculator;
