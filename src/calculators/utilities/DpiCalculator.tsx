'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DpiCalculator = () => {
  const [pxW, setPxW] = useState<string>('');
  const [pxH, setPxH] = useState<string>('');
  const [inW, setInW] = useState<string>('');
  const [inH, setInH] = useState<string>('');

  const result = useMemo(() => {
    const w = Number(pxW);
    const h = Number(pxH);
    const iw = Number(inW);
    const ih = Number(inH);
    if (!w || !h || !iw || !ih || w <= 0 || h <= 0 || iw <= 0 || ih <= 0) return null;

    const dpiX = w / iw;
    const dpiY = h / ih;
    const megapixels = (w * h) / 1_000_000;
    const lowerDpi = Math.min(dpiX, dpiY);

    let printRec: string;
    if (lowerDpi >= 300) printRec = 'Excellent — suitable for high-quality prints like 6x4 and 5x7 at 300 DPI.';
    else if (lowerDpi >= 200) printRec = 'Good — acceptable for most photo prints, but not ideal for large formats.';
    else if (lowerDpi >= 150) printRec = 'Okay — fine for snapshots and screen use, but soft when printed large.';
    else printRec = 'Low resolution — best for web and screen display, not for printing.';

    return { dpiX, dpiY, megapixels, lowerDpi, printRec };
  }, [pxW, pxH, inW, inH]);

  const content = (
    <>
      <Typography variant="h2">How is DPI Calculated?</Typography>
      <Typography variant="body1">
        DPI (dots per inch) describes the pixel density of a printed image: how many pixels are packed into
        each physical inch. Horizontal DPI = pixel width / physical width (inches), and vertical DPI =
        pixel height / physical height (inches). A higher DPI means a sharper, more detailed print of a
        given size.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3000 × 2000 pixel image printed at 10 × 6.67 inches gives a DPI of 300 in both directions
        (3000 / 10 = 300, 2000 / 6.67 ≈ 300). That is the standard print resolution for good-quality photo
        prints.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether a digital image has enough resolution for a physical print size.</li>
          <li>Preparing artwork and photos for print shops that require a minimum DPI.</li>
          <li>Understanding scanner settings and the trade-off between print size and sharpness.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the difference between DPI and PPI?</Typography>
      <Typography variant="body1">
        Strictly, PPI (pixels per inch) refers to a digital image's pixel density, while DPI (dots per inch)
        refers to the physical dots printed by a printer. In everyday use the terms are often used
        interchangeably for print resolution.
      </Typography>
      <Typography variant="h3">What DPI should I print at?</Typography>
      <Typography variant="body1">
        300 DPI is the standard for high-quality photos. 150 DPI is usually acceptable for larger posters
        viewed from a distance, and 72 DPI is fine for web and screen-only content.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/dpi-calculator" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Pixel Width" type="number" fullWidth value={pxW} onChange={(e) => setPxW(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Pixel Height" type="number" fullWidth value={pxH} onChange={(e) => setPxH(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField label="Physical Width (inches)" type="number" fullWidth value={inW} onChange={(e) => setInW(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label="Physical Height (inches)" type="number" fullWidth value={inH} onChange={(e) => setInH(e.target.value)} onFocus={(e) => e.target.select()} />
            </Stack>
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Horizontal DPI</Typography>
                <Typography variant="h5" fontWeight={700}>{result.dpiX.toFixed(1)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Vertical DPI</Typography>
                <Typography variant="h5" fontWeight={700}>{result.dpiY.toFixed(1)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Total Megapixels</Typography>
                <Typography variant="h5" fontWeight={700}>{result.megapixels.toFixed(2)} MP</Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Print Quality</Typography>
              <Typography variant="body1" fontWeight={600}>{result.printRec}</Typography>
            </Box>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DpiCalculator;
