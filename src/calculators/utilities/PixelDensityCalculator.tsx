'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PixelDensityCalculator = () => {
  const [widthPx, setWidthPx] = useState<string>('1920');
  const [heightPx, setHeightPx] = useState<string>('1080');
  const [diagonalIn, setDiagonalIn] = useState<string>('24');

  const w = parseFloat(widthPx);
  const h = parseFloat(heightPx);
  const d = parseFloat(diagonalIn);

  const valid = !isNaN(w) && !isNaN(h) && !isNaN(d) && w > 0 && h > 0 && d > 0;
  const diagonalPx = valid ? Math.sqrt(w * w + h * h) : 0;
  const ppi = valid ? diagonalPx / d : 0;

  const content = (
    <>
      <Typography variant="h2">How to Calculate Pixels Per Inch (PPI)</Typography>
      <Typography variant="body1">
        Pixel density (PPI) measures how tightly packed the pixels are on a screen. Enter the screen&apos;s
        resolution (width and height in pixels) and its diagonal size in inches to find the diagonal pixel
        count and divide it by the diagonal size.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Diagonal Pixels = √(Width² + Height²) &nbsp;|&nbsp; PPI = Diagonal Pixels ÷ Diagonal Inches
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1920×1080 monitor with a 24-inch diagonal has a diagonal pixel count of √(1920² + 1080²) ≈ 2,203.1
        pixels, giving a pixel density of about 2,203.1 ÷ 24 ≈ 91.8 PPI.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Comparing sharpness between two monitors, TVs, or phone screens.</li>
          <li>Deciding whether a display&apos;s resolution is high enough for its physical size.</li>
          <li>Checking a screen&apos;s pixel density before a purchase.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between PPI and DPI?</Typography>
      <Typography variant="body1">
        PPI (pixels per inch) describes a digital display&apos;s pixel density, while DPI (dots per inch)
        traditionally describes a printer&apos;s or scanner&apos;s output resolution in physical ink dots — the
        terms are often used interchangeably in casual conversation, but PPI is the technically correct term for
        screens.
      </Typography>
      <Typography variant="h3">What PPI counts as sharp or &quot;retina&quot;?</Typography>
      <Typography variant="body1">
        It depends heavily on viewing distance: phones held close to the face typically need 300+ PPI to look
        sharp, while monitors and TVs viewed from farther away can look just as crisp at 90-110 PPI. There&apos;s
        no single universal threshold — it&apos;s a function of both PPI and how far away you view the screen.
      </Typography>
      <Typography variant="h3">Can I enter the diagonal size in centimeters instead?</Typography>
      <Typography variant="body1">
        Convert centimeters to inches first (divide by 2.54) before entering the diagonal size, since PPI is
        inherently a per-inch measurement and the formula expects the diagonal size in inches.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pixel-density-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Width (pixels)" type="number" fullWidth value={widthPx} onChange={(e) => setWidthPx(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Height (pixels)" type="number" fullWidth value={heightPx} onChange={(e) => setHeightPx(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Diagonal Size (inches)" type="number" fullWidth value={diagonalIn} onChange={(e) => setDiagonalIn(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Pixel Density</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{valid ? `${ppi.toFixed(1)} PPI` : '—'}</Typography>
          <Typography variant="caption" color="text.secondary">{valid ? `Diagonal: ${diagonalPx.toFixed(1)} px` : ''}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PixelDensityCalculator;
