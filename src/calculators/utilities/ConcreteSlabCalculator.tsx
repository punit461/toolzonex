'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ConcreteSlabCalculator = () => {
  const [system, setSystem] = useState<'imperial' | 'metric'>('imperial');
  const [length, setLength] = useState('10');
  const [width, setWidth] = useState('8');
  const [thickness, setThickness] = useState('4');
  const [wastage, setWastage] = useState('10');
  const [price, setPrice] = useState('130');

  const result = useMemo(() => {
    let volumeCubicYards = 0;
    let totalVolumeCubicYards = 0;
    let area = 0;
    let unitLabel = '';

    if (system === 'imperial') {
      const len = parseFloat(length) || 0;
      const wid = parseFloat(width) || 0;
      const thick = parseFloat(thickness) || 0;
      area = len * wid;
      const cubicFeet = len * wid * (thick / 12);
      volumeCubicYards = cubicFeet / 27;
      unitLabel = 'ft';
    } else {
      const len = parseFloat(length) || 0;
      const wid = parseFloat(width) || 0;
      const thick = parseFloat(thickness) || 0; // in cm
      area = len * wid;
      const cubicMeters = len * wid * (thick / 100);
      volumeCubicYards = cubicMeters * 1.30795;
      unitLabel = 'm';
    }

    const waste = (parseFloat(wastage) || 0) / 100;
    totalVolumeCubicYards = volumeCubicYards * (1 + waste);
    const cubicFeet = totalVolumeCubicYards * 27;
    const bags80 = Math.ceil(cubicFeet / 0.6);
    const totalCost = totalVolumeCubicYards * (parseFloat(price) || 0);

    return { volumeCubicYards, totalVolumeCubicYards, cubicFeet, bags80, totalCost, area, unitLabel };
  }, [system, length, width, thickness, wastage, price]);

  const nf0 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const nf2 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

  const content = (
    <>
      <Typography variant="h2">How is Concrete Volume Calculated?</Typography>
      <Typography variant="body1">
        Concrete volume is the slab's length × width × thickness. In imperial units, thickness in inches is converted to feet (÷ 12), then the cubic footage is divided by 27 to get cubic yards — the standard unit for ordering concrete. A wastage percentage accounts for spillage, uneven subgrade, and seams.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Volume (yd³) = L × W × (Thickness / 12) / 27
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10 ft × 8 ft slab at 4 inches thick is 10 × 8 × (4/12) = 26.67 cubic feet, or about 0.99 cubic yards. Adding 10% wastage gives ~1.09 cubic yards — roughly 49 standard 80 lb bags — and at $130/yd³ it costs about $141.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating concrete for patios, driveways, and shed pads.</li>
          <li>Comparing ready-mix delivery vs. mixing bags yourself.</li>
          <li>Budgeting material cost for a slab project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How much does an 80 lb bag of concrete cover?</Typography>
      <Typography variant="body1">
        A standard 80 lb bag yields about 0.6 cubic feet of concrete. At 4 inches thick, one bag covers roughly 1.8 square feet, so a 10 ft × 8 ft slab needs around 49 bags.
      </Typography>
      <Typography variant="h3">How much wastage should I add?</Typography>
      <Typography variant="body1">
        A 5–10% allowance is typical for small slabs. Add more for uneven ground, multiple pours, or complex shapes where seaming and spillage increase losses.
      </Typography>
      <Typography variant="h3">What is a standard slab thickness?</Typography>
      <Typography variant="body1">
        Interior floors and small pads are often 4 inches thick, while driveways and heavier loads usually call for 5–6 inches. Always confirm against your local building code.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/concrete-slab-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField select label="Unit System" value={system} onChange={(e) => setSystem(e.target.value as 'imperial' | 'metric')} fullWidth>
            <MenuItem value="imperial">Imperial (feet / inches)</MenuItem>
            <MenuItem value="metric">Metric (meters / cm)</MenuItem>
          </TextField>
          <TextField label="Length" type="number" value={length} onChange={(e) => setLength(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{result.unitLabel}</InputAdornment> } }} fullWidth />
          <TextField label="Width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{result.unitLabel}</InputAdornment> } }} fullWidth />
          <TextField label={system === 'imperial' ? 'Thickness' : 'Thickness (cm)'} type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{system === 'imperial' ? 'in' : 'cm'}</InputAdornment> } }} fullWidth />
          <TextField label="Wastage" type="number" value={wastage} onChange={(e) => setWastage(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} fullWidth />
          <TextField label="Price per Cubic Yard" type="number" value={price} onChange={(e) => setPrice(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Concrete Needed (with wastage)</Typography>
            <Typography variant="h3" fontWeight="bold">{nf2.format(result.totalVolumeCubicYards)} yd³</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Slab Area</Typography>
            <Typography fontWeight={600}>{nf2.format(result.area)} {result.unitLabel}²</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Volume (base)</Typography>
            <Typography fontWeight={600}>{nf2.format(result.volumeCubicYards)} yd³</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Volume (cubic feet, with wastage)</Typography>
            <Typography fontWeight={600}>{nf0.format(result.cubicFeet)} ft³</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>80 lb Bags Needed</Typography>
            <Typography fontWeight={600}>{nf0.format(result.bags80)} bags</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Cost</Typography>
            <Typography fontWeight={600}>{money.format(result.totalCost)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default ConcreteSlabCalculator;
