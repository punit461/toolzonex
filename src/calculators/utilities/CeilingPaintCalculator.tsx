'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CeilingPaintCalculator = () => {
  const [length, setLength] = useState('14');
  const [width, setWidth] = useState('12');
  const [coats, setCoats] = useState('2');
  const [coverage, setCoverage] = useState('350');

  const { ceilingArea, gallonsNeeded } = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const c = parseFloat(coats) || 0;
    const cov = parseFloat(coverage) || 0;
    const area = l * w;
    const needed = cov > 0 ? (area * c) / cov : 0;
    return { ceilingArea: area, gallonsNeeded: needed };
  }, [length, width, coats, coverage]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate How Much Ceiling Paint You Need</Typography>
      <Typography variant="body1">
        Enter your room&apos;s length and width — a ceiling is one flat rectangular area rather than several
        walls, so there&apos;s no need to add multiple rows — along with how many coats you&apos;ll apply and
        your paint&apos;s coverage rate. The calculator multiplies length by width to get ceiling area, then
        multiplies by the number of coats and divides by the coverage rate to tell you how much paint to buy.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Paint Needed = (Ceiling Length × Width × Coats) ÷ Coverage Rate
      </Box>
      <Typography variant="body2" color="text.secondary">
        Ceilings often call for a flat or matte finish rather than the eggshell or satin finishes common on
        walls, since a flat finish hides surface imperfections better under overhead light. Ceilings that have
        water stains, are freshly patched, or are switching from a dark to a light color also often need a
        stain-blocking primer coat first — factor that in as a separate coat if it applies to your job. For
        painting the walls themselves, see the general Paint Calculator instead.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 14 ft × 12 ft ceiling has an area of 168 sq ft. With 2 coats and a paint that covers 350 sq ft per
        gallon, you&apos;d need (168 × 2) / 350 = 0.96 gallons — just under one gallon.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating ceiling paint for a single room before a repaint or new-construction job.</li>
          <li>Budgeting for a primer coat plus finish coats on a stained or patched ceiling.</li>
          <li>Comparing paint needs across rooms of different sizes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does a ceiling usually need a flat or matte finish?</Typography>
      <Typography variant="body1">
        Flat and matte finishes scatter light rather than reflecting it, which hides small imperfections,
        uneven texture, and roller marks that a glossier finish would highlight under direct or angled light.
      </Typography>
      <Typography variant="h3">Do I need to subtract light fixtures or vents?</Typography>
      <Typography variant="body1">
        This calculator doesn&apos;t subtract fixture area, since it&apos;s usually small relative to the whole
        ceiling and most painters round up anyway. For a ceiling with unusually large skylights or built-in
        features, you can reduce the entered length or width slightly to compensate.
      </Typography>
      <Typography variant="h3">How is this different from the Paint Calculator?</Typography>
      <Typography variant="body1">
        The Paint Calculator is built for walls, letting you add multiple wall rows with their own length and
        height. A ceiling is just one flat area, so this calculator simplifies that down to a single length ×
        width input while keeping the ceiling-specific finish and primer notes front and center.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/ceiling-paint-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Room Length" type="number" value={length}
              onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
            />
            <TextField
              label="Room Width" type="number" value={width}
              onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()}
              fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
            />
          </Box>
          <TextField label="Number of Coats" type="number" value={coats} onChange={(e) => setCoats(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField
            label="Coverage Rate (sq ft per gallon)"
            type="number"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            onFocus={(e) => e.target.select()}
            fullWidth
          />
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Ceiling Area</Typography>
            <Typography variant="h5" fontWeight={700}>{ceilingArea.toLocaleString(undefined, { maximumFractionDigits: 2 })} sq ft</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">Paint Needed</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {gallonsNeeded.toLocaleString(undefined, { maximumFractionDigits: 2 })} gallons
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CeilingPaintCalculator;
