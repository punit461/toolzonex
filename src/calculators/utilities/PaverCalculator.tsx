'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PaverCalculator = () => {
  const [areaLength, setAreaLength] = useState<string>('20');
  const [areaWidth, setAreaWidth] = useState<string>('10');
  const [paverLength, setPaverLength] = useState<string>('12');
  const [paverWidth, setPaverWidth] = useState<string>('12');
  const [wastePct, setWastePct] = useState<string>('10');

  const { areaSqFt, paverSqFt, paversNeeded, paversNoWaste, valid } = useMemo(() => {
    const aL = parseFloat(areaLength);
    const aW = parseFloat(areaWidth);
    const pL = parseFloat(paverLength);
    const pW = parseFloat(paverWidth);
    const waste = parseFloat(wastePct);

    if ([aL, aW, pL, pW, waste].some((n) => isNaN(n)) || aL <= 0 || aW <= 0 || pL <= 0 || pW <= 0 || waste < 0) {
      return { areaSqFt: 0, paverSqFt: 0, paversNeeded: 0, paversNoWaste: 0, valid: false };
    }

    const area = aL * aW;
    // Paver dimensions are entered in inches, converted to square feet.
    const paverArea = (pL / 12) * (pW / 12);
    const rawCount = area / paverArea;
    const withWaste = Math.ceil(rawCount * (1 + waste / 100));
    return { areaSqFt: area, paverSqFt: paverArea, paversNeeded: withWaste, paversNoWaste: Math.ceil(rawCount), valid: true };
  }, [areaLength, areaWidth, paverLength, paverWidth, wastePct]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Pavers Needed</Typography>
      <Typography variant="body1">
        Divide the total area you want to cover by the area of a single paver to get the base number of pavers,
        then add extra for waste from cutting, breakage, and uneven edges. A waste allowance of 5-10% is typical
        for a simple rectangular layout, with more needed for complex patterns or curved edges.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Pavers Needed = (Area ÷ Paver Area) × (1 + Waste %)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 20&nbsp;ft × 10&nbsp;ft patio (200 sq ft) using 12&quot; × 12&quot; pavers (1 sq ft each) needs 200
        pavers before waste. Adding a 10% waste allowance brings the total to 200 × 1.10 = 220 pavers.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating material quantities and cost for a patio, walkway, or driveway paving project.</li>
          <li>Comparing how many pavers different paver sizes would require for the same area.</li>
          <li>Budgeting extra pavers for cuts around edges, curves, or obstacles.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How much waste allowance should I use?</Typography>
      <Typography variant="body1">
        For a simple rectangular area laid in a straight running-bond pattern, 5-10% is usually enough. For
        diagonal layouts, herringbone patterns, curved borders, or areas with lots of cuts around edges and
        obstacles, consider bumping it up to 15-20%.
      </Typography>
      <Typography variant="h3">Should I include the gaps between pavers?</Typography>
      <Typography variant="body1">
        This calculator assumes pavers are laid edge-to-edge. If your design uses wide jointing sand gaps between
        pavers, the effective coverage per paver is slightly smaller, so you may need a few more than this
        estimate shows.
      </Typography>
      <Typography variant="h3">Does this account for the base material needed underneath?</Typography>
      <Typography variant="body1">
        No — this only estimates the number of paver units for the surface area. You&apos;ll separately need to
        budget for a compacted gravel base, sand bedding layer, and edge restraints depending on your project.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/paver-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <Typography variant="subtitle2" color="text.secondary">Area to Cover</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Length (ft)" type="number" fullWidth value={areaLength} onChange={(e) => setAreaLength(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="Width (ft)" type="number" fullWidth value={areaWidth} onChange={(e) => setAreaWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          <Typography variant="subtitle2" color="text.secondary">Paver Size</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Length (in)" type="number" fullWidth value={paverLength} onChange={(e) => setPaverLength(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="Width (in)" type="number" fullWidth value={paverWidth} onChange={(e) => setPaverWidth(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          <TextField label="Waste Allowance (%)" type="number" fullWidth value={wastePct} onChange={(e) => setWastePct(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Pavers Needed (with waste)</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? paversNeeded.toLocaleString() : '—'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {valid ? `${paversNoWaste.toLocaleString()} pavers before waste allowance` : ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {valid ? `Area: ${areaSqFt.toFixed(1)} sq ft | Paver: ${paverSqFt.toFixed(2)} sq ft each` : ''}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PaverCalculator;
