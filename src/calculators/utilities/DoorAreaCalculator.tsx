'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Button, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Preset {
  label: string;
  width: number;
  height: number;
}

const PRESETS: Preset[] = [
  { label: 'Standard Interior (30" × 80")', width: 30, height: 80 },
  { label: 'Standard Exterior (36" × 80")', width: 36, height: 80 },
  { label: 'Double Door (60" × 80")', width: 60, height: 80 },
];

const DoorAreaCalculator = () => {
  const [width, setWidth] = useState('36');
  const [height, setHeight] = useState('80');
  const [count, setCount] = useState('1');

  const result = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const c = parseFloat(count) || 0;
    const areaPerDoorSqFt = (w * h) / 144;
    const totalAreaSqFt = areaPerDoorSqFt * c;
    return { areaPerDoorSqFt, totalAreaSqFt };
  }, [width, height, count]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Door Area Calculator</Typography>
      <Typography variant="body1">
        Enter a door&apos;s width and height, or tap a common preset size (standard interior, standard
        exterior, or double door) to fill them in instantly, then enter how many doors you have. The
        calculator converts each door&apos;s dimensions to square feet and multiplies by the door count to
        give a total area — useful for estimating paint, primer, or other material coverage across every
        door in a project.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Area per Door (sq ft) = (Width in × Height in) ÷ 144
        <br />
        Total Area = Area per Door × Number of Doors
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A standard 36&quot; × 80&quot; exterior door has an area of (36 × 80) ÷ 144 = 20 sq ft. Painting 3 such
        doors requires covering a total of 60 sq ft across all three.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating how much paint or primer is needed to cover one or more doors.</li>
          <li>Figuring out total door area for a replacement or refinishing quote.</li>
          <li>Quickly using a standard door size preset instead of measuring a door you already know the type of.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Window Area Calculator?</strong> The Window Area Calculator applies the same simple width-by-height math to windows instead of doors. This tool is specifically built for doors, and adds common door-size presets (standard interior, standard exterior, double door) as a convenience so you don't need to measure a door you already know the standard type of.</li>
          <li><strong>Do the presets match every door exactly?</strong> Presets reflect common standard sizes, but actual doors can vary by manufacturer, region, or custom order. Always measure your actual door when precision matters, and use the presets mainly as a fast starting point or estimate.</li>
          <li><strong>Should I measure the door slab only, or include the frame?</strong> For paint or material coverage, measure the door slab itself (the moving panel), not the surrounding frame or trim, since that's the surface actually being covered.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/door-area-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Quick Presets</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {PRESETS.map((p) => (
                <Button
                  key={p.label}
                  variant="outlined"
                  size="small"
                  onClick={() => { setWidth(String(p.width)); setHeight(String(p.height)); }}
                >
                  {p.label}
                </Button>
              ))}
            </Stack>
          </Box>
          <TextField
            label="Door Width" type="number" value={width} onChange={(e) => setWidth(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
          <TextField
            label="Door Height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} fullWidth
            slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
          />
          <TextField
            label="Number of Doors" type="number" value={count} onChange={(e) => setCount(e.target.value)} fullWidth
          />
        </Box>

        <Box>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Door Area</Typography>
            <Typography variant="h3" fontWeight="bold">{result.totalAreaSqFt.toFixed(2)} sq ft</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Area per Door</Typography>
            <Typography fontWeight={600}>{result.areaPerDoorSqFt.toFixed(2)} sq ft</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DoorAreaCalculator;
