'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButtonGroup, ToggleButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ASPECT_RATIOS: Record<string, number> = {
  '4:3': 4 / 3,
  '3:2': 3 / 2,
  '16:9': 16 / 9,
  '1:1': 1,
};

const REFERENCE_TABLE = [
  { mp: '12 MP', example: 'iPhone/smartphone main camera (common)' },
  { mp: '24 MP', example: 'Entry-level to mid-range mirrorless/DSLR' },
  { mp: '48 MP', example: 'Flagship smartphone sensors, high-res mirrorless' },
  { mp: '108 MP', example: 'High-megapixel smartphone sensors' },
];

const CameraMegapixelCalculator = () => {
  const [mode, setMode] = useState<'fromDimensions' | 'fromMegapixels'>('fromDimensions');

  const [width, setWidth] = useState('4000');
  const [height, setHeight] = useState('3000');

  const [targetMp, setTargetMp] = useState('24');
  const [ratio, setRatio] = useState('3:2');

  const w = parseFloat(width);
  const h = parseFloat(height);
  const validDims = !isNaN(w) && !isNaN(h) && w > 0 && h > 0;
  const megapixels = validDims ? (w * h) / 1_000_000 : 0;

  const mp = parseFloat(targetMp);
  const r = ASPECT_RATIOS[ratio];
  const validTarget = !isNaN(mp) && mp > 0;
  let suggestedWidth = 0;
  let suggestedHeight = 0;
  if (validTarget) {
    const totalPixels = mp * 1_000_000;
    suggestedHeight = Math.sqrt(totalPixels / r);
    suggestedWidth = suggestedHeight * r;
  }

  const content = (
    <>
      <Typography variant="h2">How to Use the Camera Megapixel Calculator</Typography>
      <Typography variant="body1">
        A camera sensor&apos;s resolution in megapixels is simply the total number of pixels it captures,
        expressed in millions. Enter the pixel width and height of an image (found in your camera&apos;s
        specs or an image file&apos;s properties) to calculate its megapixel count, or switch to the reverse
        mode to work backward from a target megapixel count and aspect ratio to find the pixel dimensions
        that would produce it.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Megapixels = (Width in px × Height in px) ÷ 1,000,000
      </Box>
      <Typography variant="body1">
        For the reverse calculation, the calculator solves for height using Height = √(Total Pixels ÷ Aspect
        Ratio), then multiplies by the aspect ratio to get the matching width.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An image that is 4000 × 3000 pixels has 4000 × 3000 = 12,000,000 pixels, or 12 megapixels — a
        common resolution for smartphone and entry-level camera sensors. Working backward, if you want a
        24 megapixel image at a 3:2 ratio, the calculator suggests roughly 6000 × 4000 pixels.
      </Typography>

      <Typography variant="h2">Common Sensor Resolutions for Reference</Typography>
      <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Megapixels</TableCell>
              <TableCell>Typical Use</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {REFERENCE_TABLE.map((row) => (
              <TableRow key={row.mp}>
                <TableCell>{row.mp}</TableCell>
                <TableCell>{row.example}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a camera or phone&apos;s pixel dimensions match its advertised megapixel rating.</li>
          <li>Figuring out the pixel dimensions needed to hit a target megapixel count before shooting or exporting.</li>
          <li>Comparing sensor resolutions across cameras when shopping for new gear.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does more megapixels always mean a better photo?</strong> No — megapixels only measure resolution (detail and print/crop size), not image quality. Sensor size, lens quality, and pixel size affect noise and dynamic range far more than raw megapixel count.</li>
          <li><strong>Why doesn&apos;t my camera&apos;s exact pixel count match its advertised megapixels?</strong> Manufacturers round the true pixel count to the nearest whole megapixel for marketing, and some pixels around the sensor edge are used for calibration rather than the final image, so the effective count is often slightly lower than the total count.</li>
          <li><strong>How do I pick the right aspect ratio for the reverse calculation?</strong> Use 3:2 for typical DSLR/mirrorless photos, 4:3 for most smartphone and compact camera photos, 16:9 for widescreen video frames, and 1:1 for square formats like some social media posts.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/camera-megapixel-calculator" content={content}>
      <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small" sx={{ mb: 3 }}>
        <ToggleButton value="fromDimensions">From Dimensions</ToggleButton>
        <ToggleButton value="fromMegapixels">From Megapixels</ToggleButton>
      </ToggleButtonGroup>

      {mode === 'fromDimensions' ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Stack spacing={3}>
            <TextField label="Image Width (px)" type="number" value={width} onChange={(e) => setWidth(e.target.value)} fullWidth />
            <TextField label="Image Height (px)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} fullWidth />
          </Stack>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Megapixels</Typography>
              <Typography variant="h3" fontWeight="bold">{validDims ? megapixels.toFixed(2) : '—'}</Typography>
              <Typography variant="body2">MP</Typography>
            </Paper>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Stack spacing={3}>
            <TextField label="Target Megapixels" type="number" value={targetMp} onChange={(e) => setTargetMp(e.target.value)} fullWidth />
            <TextField select label="Aspect Ratio" value={ratio} onChange={(e) => setRatio(e.target.value)} fullWidth>
              {Object.keys(ASPECT_RATIOS).map((key) => (
                <MenuItem key={key} value={key}>{key}</MenuItem>
              ))}
            </TextField>
          </Stack>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>Suggested Dimensions</Typography>
            <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="body2">Width × Height</Typography>
              <Typography variant="h4" fontWeight="bold">
                {validTarget ? `${Math.round(suggestedWidth)} × ${Math.round(suggestedHeight)}` : '—'}
              </Typography>
              <Typography variant="body2">pixels</Typography>
            </Paper>
          </Box>
        </Box>
      )}
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CameraMegapixelCalculator;
