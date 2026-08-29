'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type UnitSystem = 'imperial' | 'metric';

const SandCalculator = () => {
  const [system, setSystem] = useState<UnitSystem>('imperial');
  const [length, setLength] = useState<string>('10');
  const [width, setWidth] = useState<string>('10');
  const [depth, setDepth] = useState<string>('2');

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);
    if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(d) || l <= 0 || w <= 0 || d <= 0) return null;

    const CUBIC_FEET_PER_CUBIC_METER = 35.3146667;
    const cubicMeters = system === 'imperial' ? (l * w * (d / 12)) / CUBIC_FEET_PER_CUBIC_METER : l * w * (d / 100);
    const cubicFeet = cubicMeters * CUBIC_FEET_PER_CUBIC_METER;
    return { cubicFeet, cubicYards: cubicFeet / 27, cubicMeters, weightLb: cubicFeet * 100, weightKg: cubicMeters * 1600 };
  }, [system, length, width, depth]);

  const handleSystemChange = (_: React.MouseEvent<HTMLElement>, val: UnitSystem | null) => {
    if (val) setSystem(val);
  };

  const content = (
    <>
      <Typography variant="h2">How to Calculate How Much Sand You Need</Typography>
      <Typography variant="body1">
        This calculator finds the volume of sand needed to cover a rectangular area to a given depth, using
        Volume = Length × Width × Depth. It also estimates the total weight using a typical loose sand density
        of about 100 lb per cubic foot (roughly 1,600 kg per cubic meter), which is a reasonable average for
        dry, loose sand used in landscaping, sandboxes, and construction projects.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Volume = Length × Width × Depth &nbsp;&nbsp;|&nbsp;&nbsp; Weight ≈ Volume × 100 lb/ft³ (or 1,600 kg/m³)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10 ft × 10 ft area filled to a 2-inch depth needs 10 × 10 × (2 ÷ 12) = 16.67 cubic feet of sand, which
        is about 0.62 cubic yards and weighs roughly 1,667 lb. In metric units, a 3 m × 3 m area filled to 5 cm
        deep needs 3 × 3 × 0.05 = 0.45 cubic meters, weighing about 720 kg.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much sand to order for a sandbox, paver base, or playground surface.</li>
          <li>Planning material quantities for a landscaping or garden leveling project.</li>
          <li>Figuring out delivery weight so you know what size truck or how many bags are needed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does sand density vary?</Typography>
      <Typography variant="body1">
        Yes — sand density varies with moisture content, grain size, and compaction. Dry, loose sand is close
        to 100 lb/ft³ (1,600 kg/m³), but wet or compacted sand can weigh 10-20% more. Treat the weight estimate
        here as a planning guide rather than an exact figure.
      </Typography>
      <Typography variant="h3">Should I buy extra sand?</Typography>
      <Typography variant="body1">
        It&apos;s common practice to add 5-10% extra to account for compaction, uneven ground, and spillage
        during handling, especially for larger projects.
      </Typography>
      <Typography variant="h3">How do I convert cubic feet to bags of sand?</Typography>
      <Typography variant="body1">
        Bag sizes vary by brand, but a common 50 lb bag covers roughly 0.5 cubic feet. Divide your total cubic
        feet by the coverage per bag listed on your chosen product to estimate how many bags to buy.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/sand-calculator" content={content}>
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
            <Typography variant="body1" color="text.secondary" textAlign="center">Enter positive dimensions to calculate</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SandCalculator;
