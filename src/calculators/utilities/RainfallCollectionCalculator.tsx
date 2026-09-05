'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const GALLONS_PER_SQFT_PER_INCH = 0.623;

const RainfallCollectionCalculator = () => {
  const [area, setArea] = useState('1000');
  const [rainfall, setRainfall] = useState('1');
  const [efficiency, setEfficiency] = useState('85');

  const result = useMemo(() => {
    const a = parseFloat(area) || 0;
    const r = parseFloat(rainfall) || 0;
    const e = parseFloat(efficiency) || 0;

    const theoretical = a * r * GALLONS_PER_SQFT_PER_INCH;
    const collected = theoretical * (e / 100);

    return { theoretical, collected };
  }, [area, rainfall, efficiency]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Rainfall Collection Calculator</Typography>
      <Typography variant="body1">
        Enter your roof&apos;s catchment area in square feet and the amount of rainfall in inches to estimate
        how many gallons of water you could collect. Every square foot of roof catches about 0.623 gallons per
        inch of rain that falls on it. A collection efficiency percentage (default 85%) accounts for real-world
        losses — water that overflows the gutters, splashes off the roof, or is diverted by a first-flush
        system that discards the initial, dirtiest runoff.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Gallons Collected = Roof Area (sq ft) × Rainfall (inches) × 0.623 × Efficiency%
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1,000 sq ft roof catches 1 inch of rain: theoretical collection is 1,000 × 1 × 0.623 = 623 gallons.
        At an 85% collection efficiency, the actual amount captured is about 623 × 0.85 = 529.6 gallons.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing a rain barrel or cistern based on typical local rainfall and roof size.</li>
          <li>Estimating how much municipal water use a rainwater harvesting system could offset.</li>
          <li>Planning irrigation capacity for a garden fed by collected rainwater.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Where does the 0.623 conversion factor come from?</strong> One inch of rain falling on one square foot of surface equals 0.623 gallons of water — it&apos;s a standard conversion used throughout rainwater harvesting calculations based on the volume of a one-inch-deep layer of water over one square foot.</li>
          <li><strong>Why isn't collection efficiency 100%?</strong> Real systems lose some water to gutter overflow during heavy rain, evaporation, splashing, debris blockage, and first-flush diverters that intentionally discard the initial runoff carrying roof debris and contaminants. 80-90% is a commonly used realistic range.</li>
          <li><strong>Does roof material affect how much I can collect?</strong> Yes — smooth, non-porous materials like metal roofing collect more efficiently than porous materials like some shingles or wood shakes, which absorb a small amount of water before runoff begins.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/rainfall-collection-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Roof Catchment Area" type="number" value={area}
            onChange={(e) => setArea(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">sq ft</InputAdornment> } }}
          />
          <TextField
            label="Rainfall Amount" type="number" value={rainfall}
            onChange={(e) => setRainfall(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
          <TextField
            label="Collection Efficiency" type="number" value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
            helperText="Accounts for overflow, splash loss, and first-flush diversion"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Gallons Collected</Typography>
            <Typography variant="h3" fontWeight="bold">{result.collected.toFixed(1)}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Theoretical Maximum (100% efficiency)</Typography>
            <Typography fontWeight={600}>{result.theoretical.toFixed(1)} gal</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RainfallCollectionCalculator;
