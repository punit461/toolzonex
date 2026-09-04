'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GALLONS_PER_SQFT_PER_INCH = 0.623;

const IrrigationCalculator = () => {
  const [area, setArea] = useState('1000');
  const [waterInches, setWaterInches] = useState('1');
  const [flowRate, setFlowRate] = useState('10');
  const [flowUnit, setFlowUnit] = useState<'gpm' | 'lpm'>('gpm');

  const result = useMemo(() => {
    const a = parseFloat(area) || 0;
    const inches = parseFloat(waterInches) || 0;
    const rate = parseFloat(flowRate) || 0;

    const totalGallons = a * inches * GALLONS_PER_SQFT_PER_INCH;
    const totalVolume = flowUnit === 'gpm' ? totalGallons : totalGallons * 3.785411784;
    const wateringMinutes = rate > 0 ? totalVolume / rate : 0;

    return { totalVolume, wateringMinutes };
  }, [area, waterInches, flowRate, flowUnit]);

  const volumeUnit = flowUnit === 'gpm' ? 'gallons' : 'liters';

  const content = (
    <>
      <Typography variant="h2">How Irrigation Watering Time Is Calculated</Typography>
      <Typography variant="body1">
        This calculator estimates how long to run your sprinkler or irrigation system, and how much water
        you&apos;ll use, based on your garden or lawn&apos;s area, a target water depth, and your system&apos;s
        flow rate. A common gardening guideline is about 1 inch of water per week for most lawns and gardens,
        though this varies by plant type, soil, climate, and season — treat it as an adjustable starting point
        rather than a fixed rule. One inch of water over a square foot of area equals roughly 0.623 gallons,
        which is how total water volume is derived from area and water depth.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Water Volume = Area × Water Depth (in) × 0.623 gal/sq ft/in
        <br />
        Watering Time = Total Water Volume ÷ Flow Rate
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1,000 sq ft lawn needing 1 inch of water per week requires 1,000 × 1 × 0.623 ≈ 623 gallons for the
        week. With a sprinkler system delivering 10 gallons per minute, that takes about 62.3 minutes of total
        watering time — which you might split across two or three sessions during the week.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting sprinkler timer durations to hit a target weekly watering amount.</li>
          <li>Estimating water usage and cost for lawn or garden irrigation.</li>
          <li>Comparing watering needs between different garden zones or plant types.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is 1 inch of water per week always correct?</Typography>
      <Typography variant="body1">
        It&apos;s a commonly cited average for many lawns and gardens, but actual needs vary by grass or plant
        type, soil drainage, rainfall, temperature, and season — hot, dry periods often need more, while cooler
        or rainy periods need less. Adjust the water depth input to match your specific situation.
      </Typography>
      <Typography variant="h3">Should I water in one long session or split it up?</Typography>
      <Typography variant="body1">
        This calculator gives the total time needed for the full weekly amount — many gardeners split that
        total across two or three shorter sessions per week rather than one long watering, which can help water
        soak in more effectively and reduce runoff, especially on compacted or sloped soil.
      </Typography>
      <Typography variant="h3">How do I find my sprinkler&apos;s flow rate?</Typography>
      <Typography variant="body1">
        Check the manufacturer&apos;s spec sheet, or measure it yourself by timing how long it takes to fill a
        container of known volume (like a 5-gallon bucket) from the sprinkler head, then converting to a
        per-minute rate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/irrigation-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Garden/Lawn Area"
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <TextField
            label="Water Requirement Per Week"
            type="number"
            value={waterInches}
            onChange={(e) => setWaterInches(e.target.value)}
            fullWidth
            helperText="~1 inch/week is typical for most lawns and gardens"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">inches</InputAdornment> } }}
          />
          <ToggleButtonGroup value={flowUnit} exclusive onChange={(_, v) => v && setFlowUnit(v)} fullWidth>
            <ToggleButton value="gpm">Gallons / min</ToggleButton>
            <ToggleButton value="lpm">Liters / min</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label="Sprinkler/Irrigation Flow Rate"
            type="number"
            value={flowRate}
            onChange={(e) => setFlowRate(e.target.value)}
            fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">{flowUnit}</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Watering Time Needed</Typography>
            <Typography variant="h3" fontWeight="bold">{result.wateringMinutes.toFixed(1)} min</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Total Water Volume (per week)</Typography>
            <Typography fontWeight={600}>{result.totalVolume.toFixed(1)} {volumeUnit}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default IrrigationCalculator;
