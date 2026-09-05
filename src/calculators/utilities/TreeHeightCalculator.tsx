'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TreeHeightCalculator = () => {
  const [distance, setDistance] = useState('50');
  const [angle, setAngle] = useState('35');
  const [eyeHeight, setEyeHeight] = useState('5.5');

  const result = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const a = parseFloat(angle) || 0;
    const e = parseFloat(eyeHeight) || 0;

    const height = d * Math.tan((a * Math.PI) / 180) + e;
    return { height };
  }, [distance, angle, eyeHeight]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Tree Height Calculator</Typography>
      <Typography variant="body1">
        This calculator uses the classic clinometer method: stand a known distance from the base of the tree,
        measure the angle of elevation from your eye up to the treetop with a clinometer or a smartphone angle
        app, and enter your eye height above the ground. The distance and angle form a right triangle where the
        opposite side (tangent of the angle times the distance) gives the height from your eye level up to the
        treetop — adding your eye height back in gives the tree&apos;s total height from the ground.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Tree Height = (Distance × tan(Angle)) + Eye Height
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Standing 50 feet from a tree with a measured elevation angle of 35° and an eye height of 5.5 feet: Tree
        Height = (50 × tan(35°)) + 5.5 = (50 × 0.700) + 5.5 = 35.0 + 5.5 = 40.5 feet.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating tree height for forestry, arborist, or landscaping work.</li>
          <li>Checking whether a tree is tall enough to reach a structure if it were to fall.</li>
          <li>A hands-on trigonometry demonstration for students learning angle of elevation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How do I measure the angle of elevation?</strong> A dedicated clinometer gives the most accurate reading, but most smartphones have a built-in level or angle-measuring app you can sight along toward the treetop instead.</li>
          <li><strong>Why does eye height matter?</strong> The angle you measure is from your eye level, not from the ground, so the triangle&apos;s calculated height only covers the vertical distance from your eyes up to the treetop. Adding your eye height back in accounts for the remaining distance from your eyes down to the ground.</li>
          <li><strong>Does the ground need to be flat?</strong> This method assumes the ground between you and the tree base is roughly level. On sloped terrain, the result will be somewhat inaccurate, and a more advanced surveying method accounting for the slope would be needed for precision.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/tree-height-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Distance to Tree Base" type="number" value={distance}
            onChange={(e) => setDistance(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
          <TextField
            label="Angle of Elevation to Treetop" type="number" value={angle}
            onChange={(e) => setAngle(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">°</InputAdornment> } }}
          />
          <TextField
            label="Your Eye Height" type="number" value={eyeHeight}
            onChange={(e) => setEyeHeight(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Tree Height</Typography>
            <Typography variant="h3" fontWeight="bold">{result.height.toFixed(1)} ft</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TreeHeightCalculator;
