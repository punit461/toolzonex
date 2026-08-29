'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type UnitSystem = 'imperial' | 'metric';

const AquariumVolumeCalculator = () => {
  const [system, setSystem] = useState<UnitSystem>('imperial');
  const [length, setLength] = useState<string>('24');
  const [width, setWidth] = useState<string>('12');
  const [height, setHeight] = useState<string>('16');

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (Number.isNaN(l) || Number.isNaN(w) || Number.isNaN(h) || l <= 0 || w <= 0 || h <= 0) return null;

    let gallons: number;
    let liters: number;
    if (system === 'imperial') {
      const cubicInches = l * w * h;
      gallons = cubicInches / 231;
      liters = gallons * 3.785411784;
    } else {
      const cubicCm = l * w * h;
      liters = cubicCm / 1000;
      gallons = liters / 3.785411784;
    }
    return { gallons, liters, weightLb: gallons * 8.34, weightKg: liters * 1 };
  }, [system, length, width, height]);

  const handleSystemChange = (_: React.MouseEvent<HTMLElement>, val: UnitSystem | null) => {
    if (val) setSystem(val);
  };

  const content = (
    <>
      <Typography variant="h2">How to Calculate Aquarium Volume</Typography>
      <Typography variant="body1">
        For a standard rectangular tank, volume is simply Length × Width × Height. This calculator converts
        that raw volume into gallons or liters, the units used to size filters, heaters, and stocking levels,
        and estimates the water&apos;s weight using the standard figures of 8.34 lb per US gallon (about 1 kg
        per liter).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Gallons = (Length × Width × Height in inches) ÷ 231 &nbsp;|&nbsp; Liters = (L × W × H in cm) ÷ 1000
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A standard 24&quot; × 12&quot; × 16&quot; tank has a volume of 24 × 12 × 16 = 4,608 cubic inches, which
        is 4,608 ÷ 231 ≈ 19.95 gallons — close to the commonly advertised &quot;20-gallon&quot; tank size — and
        weighs roughly 166 lb of water alone.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing a filter or heater rated for a specific gallon or liter capacity.</li>
          <li>Calculating stocking limits, which are often expressed per gallon of water.</li>
          <li>Checking whether a stand or floor can support the combined weight of tank, water, and substrate.</li>
          <li>Verifying a manufacturer&apos;s advertised tank size against its actual dimensions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is my calculated volume different from the tank&apos;s advertised size?</Typography>
      <Typography variant="body1">
        Advertised sizes (like &quot;20 gallon&quot;) are usually rounded to standard industry sizes and don&apos;t
        account for glass thickness reducing interior dimensions, so the calculated volume from exact
        measurements is often a close but not identical match.
      </Typography>
      <Typography variant="h3">Should I use the full volume when calculating stocking levels?</Typography>
      <Typography variant="body1">
        No — substrate, decorations, and equipment displace some water, so the actual water volume is typically
        5-10% less than the tank&apos;s full geometric volume. Many aquarists use the full volume as a
        conservative estimate for filtration sizing.
      </Typography>
      <Typography variant="h3">Does this work for bowfront or cylindrical tanks?</Typography>
      <Typography variant="body1">
        This calculator is designed for standard rectangular tanks. Curved or cylindrical tanks require
        different volume formulas (based on a cylinder or a more complex curved-front shape) and will show a
        higher volume than the simple length × width × height calculation for the same footprint.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/aquarium-volume-calculator" content={content}>
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup value={system} exclusive onChange={handleSystemChange} fullWidth>
          <ToggleButton value="imperial">Imperial (inches → gallons)</ToggleButton>
          <ToggleButton value="metric">Metric (cm → liters)</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label={`Length (${system === 'imperial' ? 'in' : 'cm'})`}
            type="number"
            fullWidth
            value={length}
            onChange={(e) => setLength(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <TextField
            label={`Width (${system === 'imperial' ? 'in' : 'cm'})`}
            type="number"
            fullWidth
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <TextField
            label={`Height (${system === 'imperial' ? 'in' : 'cm'})`}
            type="number"
            fullWidth
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
        </Box>

        <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center' }}>
          {result ? (
            <>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Volume</Typography>
                {system === 'imperial' ? (
                  <>
                    <Typography variant="h4" fontWeight={800} color="primary.main">{result.gallons.toFixed(2)} gal</Typography>
                    <Typography variant="body2" color="text.secondary">{result.liters.toFixed(1)} liters</Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h4" fontWeight={800} color="primary.main">{result.liters.toFixed(2)} L</Typography>
                    <Typography variant="body2" color="text.secondary">{result.gallons.toFixed(2)} gallons</Typography>
                  </>
                )}
              </Paper>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Estimated Water Weight</Typography>
                <Typography variant="h5" fontWeight={700}>
                  {system === 'imperial' ? `${result.weightLb.toFixed(1)} lb` : `${result.weightKg.toFixed(1)} kg`}
                </Typography>
              </Paper>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center">Enter positive dimensions to calculate</Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AquariumVolumeCalculator;
