'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RoofingCalculatorContent = () => {
  const [roofType, setRoofType] = useState<'simple' | 'pitched'>('simple');
  const [length, setLength] = useState('40');
  const [width, setWidth] = useState('30');
  const [pitchAngle, setPitchAngle] = useState('25');
  const [wastePercent, setWastePercent] = useState('10');

  const result = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const angle = parseFloat(pitchAngle) || 0;
    const waste = parseFloat(wastePercent) || 0;
    if (l <= 0 || w <= 0) return null;

    const footprintArea = l * w;
    const slopeMultiplier = roofType === 'pitched' ? 1 / Math.cos((angle * Math.PI) / 180) : 1;
    const actualArea = footprintArea * slopeMultiplier;
    const totalWithWaste = actualArea * (1 + waste / 100);
    const squares = totalWithWaste / 100;
    const bundles = Math.ceil(squares * 3);

    return { footprintArea, actualArea, totalWithWaste, squares, bundles };
  }, [roofType, length, width, pitchAngle, wastePercent]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ToggleButtonGroup
          value={roofType}
          exclusive
          onChange={(_e, val) => val && setRoofType(val)}
          fullWidth
          color="primary"
        >
          <ToggleButton value="simple">Flat / Simple Roof</ToggleButton>
          <ToggleButton value="pitched">Pitched Roof</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label="Roof Footprint Length"
          type="number"
          fullWidth
          value={length}
          onChange={(e) => setLength(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
        />
        <TextField
          label="Roof Footprint Width"
          type="number"
          fullWidth
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          onFocus={(e) => e.target.select()}
          slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
        />
        {roofType === 'pitched' && (
          <TextField
            label="Pitch Angle"
            type="number"
            fullWidth
            value={pitchAngle}
            onChange={(e) => setPitchAngle(e.target.value)}
            onFocus={(e) => e.target.select()}
            helperText="Angle of the roof slope from horizontal, in degrees"
            slotProps={{ input: { endAdornment: <InputAdornment position="end">°</InputAdornment> } }}
          />
        )}
        <TextField
          label="Waste Allowance"
          type="number"
          fullWidth
          value={wastePercent}
          onChange={(e) => setWastePercent(e.target.value)}
          onFocus={(e) => e.target.select()}
          helperText="Extra material for cuts, overlaps, and mistakes (10% is typical)"
          slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover', width: '100%' }}>
          {result ? (
            <>
              <Typography variant="body2" color="text.secondary" gutterBottom>Roofing Squares Needed</Typography>
              <Typography variant="h2" fontWeight={800} color="primary.main">{result.squares.toFixed(2)}</Typography>
              <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
                (1 square = 100 sq ft)
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                ≈ {result.bundles} shingle bundles
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Sloped surface area: {result.actualArea.toFixed(0)} sq ft &nbsp;|&nbsp; With waste: {result.totalWithWaste.toFixed(0)} sq ft
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">Enter positive roof dimensions to calculate</Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

const RoofingCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Roofing Calculator</Typography>
      <Typography variant="body1">
        Enter your roof&apos;s ground footprint (length × width). If your roof is flat or you already know the
        actual sloped surface area, use the &quot;Flat / Simple Roof&quot; mode. For a pitched roof, switch to
        &quot;Pitched Roof&quot; and enter the pitch angle in degrees — the calculator divides the flat footprint
        area by the cosine of that angle to find the true sloped surface area that needs covering, since a
        steeper roof has more actual surface area than its footprint suggests.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Sloped Area = Footprint Area ÷ cos(Pitch Angle)
      </Box>
      <Typography variant="body1">
        Roofing material is sold and measured in &quot;squares&quot; — a standard roofing industry unit equal to
        100 square feet of roof surface. Once the total area (including a waste allowance for cuts, overlaps,
        and mistakes) is calculated, it&apos;s divided by 100 to get the number of squares, and multiplied by
        3 to estimate the number of standard shingle bundles needed (most asphalt shingles are packaged 3
        bundles per square).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 40 ft × 30 ft footprint (1,200 sq ft) with a 25° pitch has a sloped area of 1,200 ÷ cos(25°) ≈
        1,324 sq ft. Adding a 10% waste allowance brings the total to about 1,456 sq ft, which is 14.56
        roofing squares — roughly 44 shingle bundles.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how many shingle bundles to buy for a re-roofing project.</li>
          <li>Getting a rough material budget before requesting contractor quotes.</li>
          <li>Comparing material needs between a flat and a pitched roof design.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a roofing &quot;square&quot;?</Typography>
      <Typography variant="body1">
        A roofing square is a standard industry unit equal to 100 square feet of roof surface area. Contractors
        and material suppliers use squares (not square feet) when quoting and pricing roofing jobs.
      </Typography>
      <Typography variant="h3">How much waste allowance should I use?</Typography>
      <Typography variant="body1">
        10% is a common default for a straightforward roof. Roofs with many hips, valleys, dormers, or a
        complex shape often need 15-20% to account for extra cuts and offcuts.
      </Typography>
      <Typography variant="h3">Is this a substitute for a professional roofing estimate?</Typography>
      <Typography variant="body1">
        No. This calculator gives a reasonable material estimate for planning purposes, but actual roofing
        jobs should be measured and quoted by a licensed roofing contractor, who can account for the roof&apos;s
        exact shape, underlayment, flashing, and local building code requirements.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/roofing-calculator" content={content}>
      <RoofingCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RoofingCalculator;
