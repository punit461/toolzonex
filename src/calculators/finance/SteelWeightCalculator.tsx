'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SteelWeightCalculator = () => {
  const [type, setType] = useState<'MS' | 'SS'>('MS');
  const [shape, setShape] = useState<'bar' | 'plate' | 'pipe' | 'tube'>('bar');

  const [length, setLength] = useState<string>('1');
  const [width, setWidth] = useState<string>('0.05');
  const [thickness, setThickness] = useState<string>('0.05');
  const [diameter, setDiameter] = useState<string>('0.1');

  const { weight, volume } = useMemo(() => {
    const density = type === 'MS' ? 7850 : 8000;
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const t = parseFloat(thickness) || 0;
    const d = parseFloat(diameter) || 0;

    let vol = 0;
    if (shape === 'bar' || shape === 'plate') {
      vol = l * w * t;
    } else {
      const rOut = d / 2;
      const rIn = Math.max(0, rOut - t);
      vol = Math.PI * (rOut * rOut - rIn * rIn) * l;
    }
    return { weight: Math.round(vol * density * 100) / 100, volume: Math.round(vol * 1000000) / 1000 };
  }, [type, shape, length, width, thickness, diameter]);

  const content = (
    <>
      <Typography variant="h2">How to use?</Typography>
      <Typography variant="body1">
        Select the steel type (Mild Steel or Stainless Steel) and shape, then enter
        dimensions in meters. Weight equals volume multiplied by density (MS: 7850
        kg/m³, SS: 8000 kg/m³).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1 m long, 5 cm × 5 cm MS bar: volume = 1 × 0.05 × 0.05 = 0.0025 m³, weight =
        0.0025 × 7850 ≈ 19.6 kg.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why do MS and SS weights differ?</strong> Stainless steel is slightly denser (8000 vs 7850 kg/m³), so the same volume weighs a little more.</li>
          <li><strong>Are dimensions in meters?</strong> Yes — enter all lengths in meters (e.g. 5 cm = 0.05 m) for accurate results.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating material weight for fabrication and shipping.</li>
          <li>Procurement and cost estimation.</li>
          <li>Structural load planning.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/finance/steel-weight-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Steel Type</InputLabel>
            <Select label="Steel Type" value={type} onChange={(e) => setType(e.target.value as 'MS' | 'SS')}>
              <MenuItem value="MS">Mild Steel (7850 kg/m³)</MenuItem>
              <MenuItem value="SS">Stainless Steel (8000 kg/m³)</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Shape</InputLabel>
            <Select label="Shape" value={shape} onChange={(e) => setShape(e.target.value as any)}>
              <MenuItem value="bar">Bar (rectangular)</MenuItem>
              <MenuItem value="plate">Plate</MenuItem>
              <MenuItem value="pipe">Pipe (hollow)</MenuItem>
              <MenuItem value="tube">Tube (hollow)</MenuItem>
            </Select>
          </FormControl>

          {shape === 'bar' || shape === 'plate' ? (
            <>
              <TextField label="Length" type="number" value={length} onChange={(e) => setLength(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />
              <TextField label="Width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />
              <TextField label="Thickness" type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />
            </>
          ) : (
            <>
              <TextField label="Length" type="number" value={length} onChange={(e) => setLength(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />
              <TextField label="Outer Diameter" type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />
              <TextField label="Wall Thickness" type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">m</InputAdornment> }} />
            </>
          )}
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Result</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">Weight</Typography>
            <Typography variant="h6" fontWeight="bold">{weight} kg</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'action.hover' }}>
            <Typography variant="h6">Volume</Typography>
            <Typography variant="h6" fontWeight="bold">{volume} L</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SteelWeightCalculator;
