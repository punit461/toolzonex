'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SNOW_TYPES = [
  { label: 'Fresh / Powder (~7 lb/ft³)', density: 7 },
  { label: 'Settled / Packed (~15 lb/ft³)', density: 15 },
  { label: 'Wet / Compacted (~20 lb/ft³)', density: 20 },
  { label: 'Ice (~57 lb/ft³)', density: 57 },
  { label: 'Manual density override', density: -1 },
];

const SnowLoadCalculator = () => {
  const [depth, setDepth] = useState('12');
  const [snowType, setSnowType] = useState(SNOW_TYPES[1].label);
  const [manualDensity, setManualDensity] = useState('15');

  const result = useMemo(() => {
    const d = parseFloat(depth) || 0;
    const selected = SNOW_TYPES.find((t) => t.label === snowType) ?? SNOW_TYPES[1];
    const density = selected.density === -1 ? (parseFloat(manualDensity) || 0) : selected.density;
    const load = (d / 12) * density;
    return { load, density };
  }, [depth, snowType, manualDensity]);

  const isManual = SNOW_TYPES.find((t) => t.label === snowType)?.density === -1;

  const content = (
    <>
      <Typography variant="h2">How to Use the Snow Load Calculator</Typography>
      <Typography variant="body1">
        Enter the snow depth on a roof or surface and choose a snow type to estimate the load in pounds per
        square foot (psf). Different snow types vary enormously in density — freshly fallen powder is much
        lighter per inch than settled, wet, or icy snow — so the same depth of different snow types can put
        very different loads on a structure.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Load (psf) = (Depth in Feet) × Density (lb/ft³)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        12 inches (1 foot) of settled/packed snow at roughly 15 lb/ft³ produces a load of 1 × 15 = 15 pounds per
        square foot. The same 12 inches of ice at roughly 57 lb/ft³ would instead produce 1 × 57 = 57 pounds per
        square foot — nearly four times as much load for the same depth.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough sense of roof snow load after a heavy snowfall.</li>
          <li>Comparing how much heavier a load becomes as fresh snow settles or turns to ice.</li>
          <li>General awareness before deciding whether to clear snow off a roof or structure.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this accurate enough for structural decisions?</strong> No — this is a simplified estimate for general awareness only, not a substitute for a structural engineer&apos;s calculation. Real roof snow load design uses ground snow load maps, exposure and thermal factors, roof slope, and local building code requirements well beyond a simple depth-times-density estimate.</li>
          <li><strong>Why does snow density vary so much?</strong> Freshly fallen, fluffy powder traps a lot of air and is very light per unit volume. As snow sits, it settles and compacts under its own weight, and can also partially melt and refreeze, both of which dramatically increase its density and the load it puts on a surface.</li>
          <li><strong>What should I do if I&apos;m worried about roof snow load?</strong> Contact a structural engineer or your local building department, especially after unusually heavy or wet snowfall, rather than relying on a rough estimate like this one for safety-critical decisions.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/snow-load-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Snow Depth" type="number" value={depth}
            onChange={(e) => setDepth(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
          <TextField select label="Snow Type" value={snowType} onChange={(e) => setSnowType(e.target.value)} fullWidth>
            {SNOW_TYPES.map((t) => (
              <MenuItem key={t.label} value={t.label}>{t.label}</MenuItem>
            ))}
          </TextField>
          {isManual && (
            <TextField
              label="Manual Density" type="number" value={manualDensity}
              onChange={(e) => setManualDensity(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">lb/ft³</InputAdornment> } }}
            />
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Snow Load</Typography>
            <Typography variant="h3" fontWeight="bold">{result.load.toFixed(1)} psf</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SnowLoadCalculator;
