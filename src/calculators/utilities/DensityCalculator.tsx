'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SolveFor = 'density' | 'mass' | 'volume';

const MATERIALS = [
  { name: 'Water', density: 1000 },
  { name: 'Iron', density: 7870 },
  { name: 'Aluminum', density: 2700 },
  { name: 'Gold', density: 19300 },
];

const DensityCalculator = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('density');
  const [mass, setMass] = useState('1000');
  const [volume, setVolume] = useState('1');
  const [density, setDensity] = useState('1000');

  const [massUnit, setMassUnit] = useState<'kg' | 'g'>('kg');
  const [volumeUnit, setVolumeUnit] = useState<'m3' | 'L'>('m3');

  const result = useMemo(() => {
    const toKg = (val: number) => (massUnit === 'kg' ? val : val / 1000);
    const toM3 = (val: number) => (volumeUnit === 'm3' ? val : val / 1000);

    let densityVal: number;

    if (solveFor === 'density') {
      const m = toKg(parseFloat(mass) || 0);
      const v = toM3(parseFloat(volume) || 0);
      densityVal = v !== 0 ? m / v : 0;
    } else if (solveFor === 'mass') {
      const d = parseFloat(density) || 0;
      const v = toM3(parseFloat(volume) || 0);
      densityVal = d;
    } else {
      const m = toKg(parseFloat(mass) || 0);
      const d = parseFloat(density) || 0;
      densityVal = d;
    }

    let massVal = 0;
    let volumeVal = 0;
    if (solveFor === 'density') {
      massVal = toKg(parseFloat(mass) || 0);
      volumeVal = toM3(parseFloat(volume) || 0);
    } else if (solveFor === 'mass') {
      const d = parseFloat(density) || 0;
      massVal = d * toM3(parseFloat(volume) || 0);
      volumeVal = toM3(parseFloat(volume) || 0);
    } else {
      const m = toKg(parseFloat(mass) || 0);
      massVal = m;
      volumeVal = parseFloat(density) !== 0 ? m / (parseFloat(density) || 1) : 0;
    }

    const densityKgM3 = densityVal;
    const densityGperCm3 = densityVal / 1000;

    let closest = MATERIALS[0];
    let closestDiff = Infinity;
    for (const mat of MATERIALS) {
      const diff = Math.abs(mat.density - densityKgM3);
      if (diff < closestDiff) {
        closestDiff = diff;
        closest = mat;
      }
    }

    return { densityKgM3, densityGperCm3, massKg: massVal, volumeM3: volumeVal, closest, pureDensity: Math.abs(densityVal - densityKgM3) < 0.001 };
  }, [solveFor, mass, volume, density, massUnit, volumeUnit]);

  const content = (
    <>
      <Typography variant="h2">How is Density Calculated?</Typography>
      <Typography variant="body1">
        Density is mass per unit volume. It tells you how much matter is packed into a given space and is a key physical property that lets you identify materials.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Density = Mass ÷ Volume<br />
        kg/m³ ÷ 1000 = g/cm³
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1 kg block occupying 1 litre (0.001 m³) has a density of 1 ÷ 0.001 = 1000 kg/m³, or 1 g/cm³ — exactly the density of water. Compare your result against the material table to guess what a sample might be made of.
      </Typography>

      <Typography variant="h2">Material Density Reference (kg/m³)</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Water: ~1000<br />
        Iron: ~7870<br />
        Aluminum: ~2700<br />
        Gold: ~19300
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Identifying the likely material of an unknown sample by its density.</li>
          <li>Checking whether an object will float or sink relative to water.</li>
          <li>Converting between mass and volume for engineering or shipping.</li>
          <li>Quality control verification of metals and fluids.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I convert kg/m³ to g/cm³?</Typography>
      <Typography variant="body1">
        Divide by 1000. Because 1 kg = 1000 g and 1 m³ = 1,000,000 cm³, a density of 1000 kg/m³ equals 1 g/cm³. This calculator shows both values.
      </Typography>
      <Typography variant="h3">Does temperature affect density?</Typography>
      <Typography variant="body1">
        Yes. Most materials expand when heated, spreading the same mass over a larger volume and thus lowering density. Water is a notable exception between 0°C and 4°C, where it becomes denser as it warms. Values here are typical room-temperature densities.
      </Typography>
      <Typography variant="h3">How can I tell what material something is?</Typography>
      <Typography variant="body1">
        Measure its mass and volume, compute the density, then compare it to the reference table. The calculator flags which of the common materials your result is closest to, though many materials share similar densities so it's not definitive on its own.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/density-calculator" content={content}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" mb={1}>Solve For</Typography>
        <ToggleButtonGroup value={solveFor} exclusive onChange={(_, v) => v && setSolveFor(v)} fullWidth>
          <ToggleButton value="density">Density</ToggleButton>
          <ToggleButton value="mass">Mass</ToggleButton>
          <ToggleButton value="volume">Volume</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {(solveFor === 'density' || solveFor === 'mass') && (
            <TextField label="Mass" type="number" value={mass} onChange={(e) => setMass(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{massUnit === 'kg' ? 'kg' : 'g'}</InputAdornment> } }} fullWidth />
          )}
          {(solveFor === 'density' || solveFor === 'mass') && (
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>Mass Unit</Typography>
              <ToggleButtonGroup value={massUnit} exclusive onChange={(_, v) => v && setMassUnit(v)} fullWidth>
                <ToggleButton value="kg">kg</ToggleButton>
                <ToggleButton value="g">g</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
          {(solveFor === 'density' || solveFor === 'mass') && (
            <Box>
              <Typography variant="body2" color="text.secondary" mb={1}>Volume Unit</Typography>
              <ToggleButtonGroup value={volumeUnit} exclusive onChange={(_, v) => v && setVolumeUnit(v)} fullWidth>
                <ToggleButton value="m3">m³</ToggleButton>
                <ToggleButton value="L">L</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}
          {(solveFor === 'density' || solveFor === 'mass') && (
            <TextField label="Volume" type="number" value={volume} onChange={(e) => setVolume(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">{volumeUnit === 'm3' ? 'm³' : 'L'}</InputAdornment> } }} fullWidth />
          )}
          {solveFor === 'volume' && (
            <TextField label="Mass" type="number" value={mass} onChange={(e) => setMass(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }} fullWidth />
          )}
          {solveFor !== 'density' && (
            <TextField label="Density" type="number" value={density} onChange={(e) => setDensity(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">kg/m³</InputAdornment> } }} fullWidth />
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Density</Typography>
            <Typography variant="h3" fontWeight="bold">{result.densityKgM3.toFixed(0)} kg/m³</Typography>
            <Typography variant="body2">{result.densityGperCm3.toFixed(2)} g/cm³</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Mass</Typography>
            <Typography fontWeight={600}>{result.massKg.toFixed(3)} kg</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Volume</Typography>
            <Typography fontWeight={600}>{result.volumeM3.toFixed(4)} m³</Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>Closest Material</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">{result.closest.name}</Typography>
              <Typography variant="body2" fontWeight={600}>~{result.closest.density.toLocaleString()} kg/m³</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">Water comparison</Typography>
              <Typography variant="body2" fontWeight={600}>
                {result.densityKgM3 > 1000 ? 'Sinks in water' : result.densityKgM3 > 0 ? 'Floats on water' : '—'}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default DensityCalculator;
