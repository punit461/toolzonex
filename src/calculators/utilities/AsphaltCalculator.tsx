'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const AsphaltCalculator = () => {
  const [length, setLength] = useState<string>('20');
  const [width, setWidth] = useState<string>('10');
  const [thickness, setThickness] = useState<string>('3');
  const [density, setDensity] = useState<string>('145');

  const l = parseFloat(length);
  const w = parseFloat(width);
  const t = parseFloat(thickness);
  const d = parseFloat(density);

  const valid = !isNaN(l) && !isNaN(w) && !isNaN(t) && !isNaN(d) && l > 0 && w > 0 && t > 0 && d > 0;
  const area = valid ? l * w : 0;
  const volumeFt3 = valid ? area * (t / 12) : 0;
  const weightLb = valid ? volumeFt3 * d : 0;
  const tons = valid ? weightLb / 2000 : 0;

  const content = (
    <>
      <Typography variant="h2">How to Calculate Asphalt Tonnage</Typography>
      <Typography variant="body1">
        Enter the area&apos;s length and width, the compacted thickness of the asphalt layer, and the mix
        density. Hot mix asphalt typically weighs around 145 lb per cubic foot (roughly 2,300 kg/m³), though
        that figure varies by mix design — check your supplier&apos;s spec sheet if you have one, and adjust
        the density field to match.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Volume (ft³) = Length × Width × (Thickness ÷ 12) &nbsp;|&nbsp; Tons = Volume × Density ÷ 2000
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20 ft × 10 ft driveway paved 3 inches thick at a density of 145 lb/ft³ has an area of 200 ft², a
        volume of 200 × 0.25 = 50 ft³, a weight of 50 × 145 = 7,250 lb, and a total tonnage of about 3.63 tons.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating asphalt tonnage for a residential driveway or walkway paving job.</li>
          <li>Ordering the right amount of hot mix asphalt for a parking lot resurfacing project.</li>
          <li>Budgeting material costs for road patching or repair work.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What density should I use for asphalt?</Typography>
      <Typography variant="body1">
        The default of 145 lb/ft³ is a common average for compacted hot mix asphalt, but real mixes typically
        range from about 140 to 150 lb/ft³ depending on the aggregate and binder used — use your supplier&apos;s
        actual density figure for the most accurate order quantity.
      </Typography>
      <Typography variant="h3">Does this account for compaction?</Typography>
      <Typography variant="body1">
        This calculates the volume and weight for your target compacted thickness. Loose asphalt takes up
        noticeably more volume before it&apos;s rolled and compacted, so if you&apos;re measuring loose material
        rather than ordering by finished thickness, add extra to account for that difference.
      </Typography>
      <Typography variant="h3">How thick should my asphalt layer be?</Typography>
      <Typography variant="body1">
        Typical residential driveways use about 2 to 3 inches of surface asphalt over a compacted base, while
        roads and heavy-traffic areas need thicker structural layers — check local codes or a paving contractor
        for a thickness suited to your specific load requirements.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/asphalt-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Length (ft)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Width (ft)" type="number" fullWidth value={width} onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Thickness (inches)" type="number" fullWidth value={thickness} onChange={(e) => setThickness(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Asphalt Density (lb/ft³)" type="number" fullWidth value={density} onChange={(e) => setDensity(e.target.value)} onFocus={(e) => e.target.select()} helperText="Default 145 lb/ft³ — adjust to match your mix" />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Asphalt Needed</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? `${tons.toFixed(2)} tons` : '—'}
          </Typography>
          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Area</Typography>
              <Typography variant="h6">{valid ? `${area.toFixed(1)} ft²` : '—'}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Weight</Typography>
              <Typography variant="h6">{valid ? `${weightLb.toFixed(0)} lb` : '—'}</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AsphaltCalculator;
