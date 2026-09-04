'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type UnitSystem = 'imperial' | 'metric';

const TopsoilCalculator = () => {
  const [system, setSystem] = useState<UnitSystem>('imperial');
  const [length, setLength] = useState<string>('20');
  const [width, setWidth] = useState<string>('10');
  const [depth, setDepth] = useState<string>('4');
  const [densityLb, setDensityLb] = useState<string>('90');
  const [densityKg, setDensityKg] = useState<string>('1440');

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
      <Typography variant="h2">How to Calculate How Much Topsoil You Need</Typography>
      <Typography variant="body1">
        This calculator finds the volume of topsoil needed to cover a rectangular area to a chosen depth, using
        Volume = Length × Width × Depth. It then estimates the total weight using a topsoil density you can
        adjust — loose topsoil typically weighs around 75-100 lb per cubic foot (roughly 1,200-1,600 kg per
        cubic meter) depending on moisture content and composition.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Volume = Length × Width × Depth &nbsp;&nbsp;|&nbsp;&nbsp; Weight ≈ Volume × Density
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20 ft × 10 ft garden bed filled 4 inches deep needs 20 × 10 × (4 ÷ 12) = 66.7 cubic feet of topsoil,
        which is about 2.47 cubic yards and weighs roughly 6,000 lb at a density of 90 lb/ft³. In metric units,
        a 5 m × 3 m bed filled to 10 cm deep needs 5 × 3 × 0.1 = 1.5 cubic meters, weighing about 2,160 kg at a
        density of 1,440 kg/m³.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much topsoil to order for a new garden bed or raised planter.</li>
          <li>Leveling low spots in a lawn before reseeding or laying sod.</li>
          <li>Planning delivery weight so you know what size load or how many bags are needed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does topsoil density really vary that much?</Typography>
      <Typography variant="body1">
        Yes — dry, loose topsoil sits toward the lower end of the range while damp, compacted, or clay-heavy
        topsoil can weigh noticeably more. Adjust the density field above if your supplier gives you a specific
        figure for the soil blend you&apos;re buying.
      </Typography>
      <Typography variant="h3">How is this different from the Mulch or Gravel Calculator?</Typography>
      <Typography variant="body1">
        The same length × width × depth formula applies to any bulk landscaping material, but topsoil, mulch,
        and gravel each have very different densities, so this tool uses topsoil-specific defaults rather than
        the mulch or gravel figures used in those calculators.
      </Typography>
      <Typography variant="h3">Should I compact the soil after spreading it?</Typography>
      <Typography variant="body1">
        Lightly settling topsoil (with water or a light tamp) is common after spreading, which can reduce its
        volume by 10-20%. If you&apos;re filling to a precise finished depth, consider ordering slightly extra
        to account for settling.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/topsoil-calculator" content={content}>
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
            label={`Topsoil Density (${system === 'imperial' ? 'lb/ft³' : 'kg/m³'})`}
            type="number"
            fullWidth
            value={system === 'imperial' ? densityLb : densityKg}
            onChange={(e) => (system === 'imperial' ? setDensityLb(e.target.value) : setDensityKg(e.target.value))}
            onFocus={(e) => e.target.select()}
            helperText="Adjust if your supplier lists a specific density for your topsoil blend."
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

export default TopsoilCalculator;
