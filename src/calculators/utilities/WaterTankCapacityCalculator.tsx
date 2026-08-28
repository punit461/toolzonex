'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, MenuItem, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WaterTankCapacityCalculator = () => {
  const [shape, setShape] = useState<'cylindrical' | 'rectangular'>('cylindrical');
  const [unit, setUnit] = useState<'m' | 'ft' | 'in'>('m');
  const [diameter, setDiameter] = useState('1');
  const [height, setHeight] = useState('1.5');
  const [length, setLength] = useState('1');
  const [width, setWidth] = useState('1');
  const [rectHeight, setRectHeight] = useState('1');
  const [people, setPeople] = useState('4');
  const [dailyUsage, setDailyUsage] = useState('150');

  const unitLabel = unit === 'm' ? 'm' : unit === 'ft' ? 'ft' : 'in';

  const result = useMemo(() => {
    let volumeCubicUnit = 0;
    if (shape === 'cylindrical') {
      const d = parseFloat(diameter) || 0;
      const h = parseFloat(height) || 0;
      volumeCubicUnit = Math.PI * Math.pow(d / 2, 2) * h;
    } else {
      const l = parseFloat(length) || 0;
      const w = parseFloat(width) || 0;
      const h = parseFloat(rectHeight) || 0;
      volumeCubicUnit = l * w * h;
    }

    const toCubicMeters = unit === 'm' ? 1 : unit === 'ft' ? 0.0283168 : 1.63871e-5;
    const volumeM3 = volumeCubicUnit * toCubicMeters;

    const liters = volumeM3 * 1000;
    const usGallons = volumeM3 * 264.172;
    const weightKg = volumeM3 * 1000;
    const weightLb = weightKg * 2.20462;

    const ppl = Math.max(1, parseFloat(people) || 1);
    const usePerPerson = Math.max(0, parseFloat(dailyUsage) || 0);
    const dailyNeed = ppl * usePerPerson;
    const daysSupply = usePerPerson > 0 && ppl > 0 ? liters / (ppl * usePerPerson) : 0;

    return { volumeM3, liters, usGallons, weightKg, weightLb, dailyNeed, daysSupply, ppl, usePerPerson };
  }, [shape, unit, diameter, height, length, width, rectHeight, people, dailyUsage]);

  const nfInt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

  const tankChar = shape === 'cylindrical'
    ? '   _______\n  /       \\\n |         |\n |         |\n  \\_______/'
    : '  +---------+\n  |         |\n  |         |\n  +---------+';

  const content = (
    <>
      <Typography variant="h2">How is Tank Capacity Calculated?</Typography>
      <Typography variant="body1">
        For a cylindrical tank, volume is π × (diameter ÷ 2)² × height. For a rectangular tank, it's length × width × height. The result is expressed in cubic meters, liters, and US gallons, and water weight assumes a density of 1,000 kg per cubic meter (1 liter ≈ 1 kg).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Cylinder: V = πr²h&nbsp;&nbsp;|&nbsp;&nbsp;Rectangle: V = L × W × H
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A cylindrical tank 1m in diameter and 1.5m tall holds π × 0.5² × 1.5 ≈ 1.18 m³, or about 1,178 liters (~311 US gallons). At ~150 liters per person per day, that comfortably supplies a family of 4 for two days.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing a rooftop or underground water tank for a home.</li>
          <li>Budgeting water for a household or campsite based on people count.</li>
          <li>Estimating the weight of a full tank to check structural support.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How much water does a person use per day?</Typography>
      <Typography variant="body1">
        Across drinking, cooking, bathing, and flushing, the average is roughly 100–200 liters per person per day. This calculator defaults to 150 L but lets you adjust it to match your household.
      </Typography>
      <Typography variant="h3">How heavy is a full water tank?</Typography>
      <Typography variant="body1">
        Since 1 liter of water weighs about 1 kg, a 1,000-liter tank holds roughly 1,000 kg (about 2,205 lb) of water. Remember to account for the tank's own weight and to check your roof or stand's load capacity.
      </Typography>
      <Typography variant="h3">Does shape affect capacity?</Typography>
      <Typography variant="body1">
        Capacity depends on volume, not shape — a cylindrical and rectangular tank with the same volume hold the same amount of water. Shape mainly affects footprint, surface area, and structural design.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/water-tank-capacity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField select label="Tank Shape" value={shape} onChange={(e) => setShape(e.target.value as 'cylindrical' | 'rectangular')} fullWidth>
            <MenuItem value="cylindrical">Cylindrical</MenuItem>
            <MenuItem value="rectangular">Rectangular</MenuItem>
          </TextField>
          <TextField select label="Unit" value={unit} onChange={(e) => setUnit(e.target.value as 'm' | 'ft' | 'in')} fullWidth>
            <MenuItem value="m">Meters</MenuItem>
            <MenuItem value="ft">Feet</MenuItem>
            <MenuItem value="in">Inches</MenuItem>
          </TextField>

          {shape === 'cylindrical' ? (
            <>
              <TextField label="Diameter" type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{unitLabel}</InputAdornment> } }} fullWidth />
              <TextField label="Height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{unitLabel}</InputAdornment> } }} fullWidth />
            </>
          ) : (
            <>
              <TextField label="Length" type="number" value={length} onChange={(e) => setLength(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{unitLabel}</InputAdornment> } }} fullWidth />
              <TextField label="Width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{unitLabel}</InputAdornment> } }} fullWidth />
              <TextField label="Height" type="number" value={rectHeight} onChange={(e) => setRectHeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{unitLabel}</InputAdornment> } }} fullWidth />
            </>
          )}

          <TextField label="Number of People" type="number" value={people} onChange={(e) => setPeople(e.target.value)} fullWidth />
          <TextField label="Daily Usage per Person" type="number" value={dailyUsage} onChange={(e) => setDailyUsage(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">L/day</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Tank Capacity</Typography>
            <Typography variant="h3" fontWeight="bold">{nfInt.format(result.liters)} L</Typography>
            <Typography variant="body2">{nf2.format(result.volumeM3)} m³ · {nfInt.format(result.usGallons)} US gal</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Volume (cubic meters)</Typography>
            <Typography fontWeight={600}>{nf2.format(result.volumeM3)} m³</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Volume (US gallons)</Typography>
            <Typography fontWeight={600}>{nfInt.format(result.usGallons)} gal</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Water Weight</Typography>
            <Typography fontWeight={600}>{nfInt.format(result.weightKg)} kg · {nfInt.format(result.weightLb)} lb</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Daily Household Need</Typography>
            <Typography fontWeight={600}>{nfInt.format(result.dailyNeed)} L ({result.ppl} × {result.usePerPerson} L)</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Supply Duration</Typography>
            <Typography fontWeight={600}>{nf1.format(result.daysSupply)} days</Typography>
          </Paper>
          <Paper sx={{ p: 2, bgcolor: 'action.hover', fontFamily: 'monospace', whiteSpace: 'pre', fontSize: '0.85rem', lineHeight: 1.3 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>Tank Profile</Typography>
            {tankChar}
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default WaterTankCapacityCalculator;
