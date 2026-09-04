'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type UnitSystem = 'imperial' | 'metric';

const GravelCalculator = () => {
  const [system, setSystem] = useState<UnitSystem>('imperial');
  const [length, setLength] = useState<string>('10');
  const [width, setWidth] = useState<string>('10');
  const [depth, setDepth] = useState<string>('3');
  const [densityLb, setDensityLb] = useState<string>('105');
  const [densityKg, setDensityKg] = useState<string>('1682');

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    const density = parseFloat(system === 'imperial' ? densityLb : densityKg);
    if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(d) || l <= 0 || w <= 0 || d <= 0 || Number.isNaN(density) || density <= 0) return null;

    const CUBIC_FEET_PER_CUBIC_METER = 35.3146667;
    const cubicMeters = system === 'imperial' ? (l * w * (d / 12)) / CUBIC_FEET_PER_CUBIC_METER : l * w * (d / 100);
    const cubicFeet = cubicMeters * CUBIC_FEET_PER_CUBIC_METER;
    return {
      cubicFeet,
      cubicYards: cubicFeet / 27,
      cubicMeters,
      weightLb: cubicFeet * density,
      weightKg: cubicMeters * density,
    };
  }, [system, length, width, depth, densityLb, densityKg]);

  const handleSystemChange = (_: React.MouseEvent<HTMLElement>, val: UnitSystem | null) => {
    if (val) setSystem(val);
  };

  const content = (
    <>
      <Typography variant="h2">How to Calculate How Much Gravel You Need</Typography>
      <Typography variant="body1">
        This calculator finds the volume of gravel needed to cover a rectangular area to a given depth, using
        Volume = Length × Width × Depth. It also estimates the total weight using a gravel density you can
        adjust — a typical loose gravel density is around 100-105 lb per cubic foot (roughly 1,600-1,700 kg per
        cubic meter), though the exact figure varies by gravel type and grading.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Volume = Length × Width × Depth &nbsp;&nbsp;|&nbsp;&nbsp; Weight ≈ Volume × Density
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10 ft × 10 ft driveway area filled to a 3-inch depth needs 10 × 10 × (3 ÷ 12) = 25 cubic feet of
        gravel, which is about 0.93 cubic yards and weighs roughly 2,625 lb at a density of 105 lb/ft³. In
        metric units, a 3 m × 3 m path filled to 8 cm deep needs 3 × 3 × 0.08 = 0.72 cubic meters, weighing
        about 1,211 kg at a density of 1,682 kg/m³.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much gravel to order for a driveway, walkway, or drainage bed.</li>
          <li>Planning material quantities for a landscaping project before getting quotes.</li>
          <li>Figuring out delivery weight so you know what size truck or how many bags are needed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does gravel density vary by type?</Typography>
      <Typography variant="body1">
        Yes — crushed stone, pea gravel, and river rock all pack and weigh differently depending on particle
        size, shape, and moisture content, typically somewhere in the 95-115 lb/ft³ (1,500-1,800 kg/m³) range.
        Adjust the density field above if your supplier gives you a specific figure for your gravel type.
      </Typography>
      <Typography variant="h3">Should I buy extra gravel?</Typography>
      <Typography variant="body1">
        It&apos;s common practice to add 5-10% extra to account for compaction, uneven ground, and spillage
        during handling, especially for larger driveway or path projects.
      </Typography>
      <Typography variant="h3">How do I convert cubic feet to bags of gravel?</Typography>
      <Typography variant="body1">
        Bag sizes vary by brand, but a common 0.5 cubic foot bag is a widely sold size. Divide your total cubic
        feet by the coverage per bag listed on your chosen product to estimate how many bags to buy.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/gravel-calculator" content={content}>
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup value={system} exclusive onChange={handleSystemChange} fullWidth>
          <ToggleButton value="imperial">Imperial (ft / in)</ToggleButton>
          <ToggleButton value="metric">Metric (m / cm)</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label={`Length (${system === 'imperial' ? 'ft' : 'm'})`}
            type="number"
            fullWidth
            value={length}
            onChange={(e) => setLength(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <TextField
            label={`Width (${system === 'imperial' ? 'ft' : 'm'})`}
            type="number"
            fullWidth
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <TextField
            label={`Depth (${system === 'imperial' ? 'in' : 'cm'})`}
            type="number"
            fullWidth
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <TextField
            label={`Gravel Density (${system === 'imperial' ? 'lb/ft³' : 'kg/m³'})`}
            type="number"
            fullWidth
            value={system === 'imperial' ? densityLb : densityKg}
            onChange={(e) => (system === 'imperial' ? setDensityLb(e.target.value) : setDensityKg(e.target.value))}
            onFocus={(e) => e.target.select()}
            helperText="Adjust if your supplier lists a specific density for your gravel type."
          />
        </Box>

        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
          {result ? (
            system === 'imperial' ? (
              <>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Volume Needed</Typography>
                  <Typography variant="h4" fontWeight={800} color="primary.main">{result.cubicFeet.toFixed(2)} ft³</Typography>
                  <Typography variant="body2" color="text.secondary">{result.cubicYards.toFixed(3)} cubic yards</Typography>
                </Paper>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Estimated Weight</Typography>
                  <Typography variant="h5" fontWeight={700}>{result.weightLb.toLocaleString(undefined, { maximumFractionDigits: 0 })} lb</Typography>
                </Paper>
              </>
            ) : (
              <>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Volume Needed</Typography>
                  <Typography variant="h4" fontWeight={800} color="primary.main">{result.cubicMeters.toFixed(3)} m³</Typography>
                </Paper>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Estimated Weight</Typography>
                  <Typography variant="h5" fontWeight={700}>{result.weightKg.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg</Typography>
                </Paper>
              </>
            )
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center">Enter positive dimensions and density to calculate</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default GravelCalculator;
