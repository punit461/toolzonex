'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const FT3_TO_M3 = 0.0283168;
const CEMENT_BAGS_PER_M3 = 7;

const ConcreteCalculator = () => {
  const [shape, setShape] = useState<string>('slab');
  const [length, setLength] = useState<string>('10');
  const [width, setWidth] = useState<string>('10');
  const [depth, setDepth] = useState<string>('0.5');
  const [diameter, setDiameter] = useState<string>('1');
  const [height, setHeight] = useState<string>('10');

  const { volumeFt3, volumeM3, bags } = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    const dia = parseFloat(diameter) || 0;
    const h = parseFloat(height) || 0;
    const r = dia / 2;
    let ft3 = 0;
    if (shape === 'slab' || shape === 'beam') ft3 = l * w * d;
    else if (shape === 'column') ft3 = Math.PI * r * r * h;
    const m3 = ft3 * FT3_TO_M3;
    return {
      volumeFt3: ft3,
      volumeM3: m3,
      bags: Math.ceil(m3 * CEMENT_BAGS_PER_M3),
    };
  }, [shape, length, width, depth, diameter, height]);

  const content = (
    <>
      <Typography variant="h2">What is a concrete calculator?</Typography>
      <Typography variant="body1">
        A concrete calculator estimates the volume of concrete you need for a slab, column, or beam, and
        approximates how many 50&nbsp;kg cement bags that volume implies. It converts between cubic feet and
        cubic meters so you can order the right amount.
      </Typography>

      <Typography variant="h2">Formulas</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Slab / Beam: V = length × width × depth
        <br />
        Column: V = π × (diameter/2)² × height
        <br />
        1 ft³ = 0.0283168 m³
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10&nbsp;ft × 10&nbsp;ft slab at 0.5&nbsp;ft depth needs 50&nbsp;ft³ ≈ 1.42&nbsp;m³ of concrete, or
        about 10 bags of 50&nbsp;kg cement (≈ 7 bags per m³).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Ordering concrete for a patio, driveway, or floor slab.</li>
          <li>Estimating material for columns and footings.</li>
          <li>Planning beams in small construction projects.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many cement bags per cubic meter?</Typography>
      <Typography variant="body1">
        This tool uses a rule-of-thumb of about 7 bags of 50&nbsp;kg cement per cubic meter of concrete (a
        typical M20 mix). Actual usage varies with the mix design.
      </Typography>
      <Typography variant="h3">Should I add extra for waste?</Typography>
      <Typography variant="body1">
        Yes — add roughly 5–10% to the calculated volume to cover spillage, uneven subgrade, and formwork
        variations.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/finance/concrete-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="concrete-shape">Shape</InputLabel>
            <Select
              labelId="concrete-shape"
              label="Shape"
              value={shape}
              onChange={(e) => setShape(e.target.value)}
            >
              <MenuItem value="slab">Slab</MenuItem>
              <MenuItem value="column">Column</MenuItem>
              <MenuItem value="beam">Beam</MenuItem>
            </Select>
          </FormControl>

          {(shape === 'slab' || shape === 'beam') && (
            <>
              <TextField
                label="Length"
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
                fullWidth
              />
              <TextField
                label="Width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
                fullWidth
              />
              <TextField
                label="Depth"
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
                fullWidth
              />
            </>
          )}

          {shape === 'column' && (
            <>
              <TextField
                label="Diameter"
                type="number"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
                fullWidth
              />
              <TextField
                label="Height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
                fullWidth
              />
            </>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Result
          </Typography>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Volume (ft³)</Typography>
            <Typography variant="h6" fontWeight="bold">{volumeFt3.toFixed(2)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Volume (m³)</Typography>
            <Typography variant="h6" fontWeight="bold">{volumeM3.toFixed(3)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Cement Bags (50 kg)</Typography>
            <Typography variant="h6" fontWeight="bold">{bags}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default ConcreteCalculator;
