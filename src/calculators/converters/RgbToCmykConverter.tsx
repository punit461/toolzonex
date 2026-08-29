'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const rgbToCmyk = (r: number, g: number, b: number) => {
  const rp = r / 255;
  const gp = g / 255;
  const bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rp - k) / (1 - k);
  const m = (1 - gp - k) / (1 - k);
  const y = (1 - bp - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
};

const RgbToCmykContent = () => {
  const [r, setR] = useState(33);
  const [g, setG] = useState(150);
  const [b, setB] = useState(243);

  const cmyk = useMemo(() => rgbToCmyk(r, g, b), [r, g, b]);
  const rgbHex = useMemo(
    () => `#${[r, g, b].map((c) => c.toString(16).toUpperCase().padStart(2, '0')).join('')}`,
    [r, g, b]
  );

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="error.main" fontWeight="bold">Red (R)</Typography>
            <Typography variant="subtitle2">{r}</Typography>
          </Box>
          <Slider value={r} min={0} max={255} onChange={(e, val) => setR(val as number)} color="error" />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="success.main" fontWeight="bold">Green (G)</Typography>
            <Typography variant="subtitle2">{g}</Typography>
          </Box>
          <Slider value={g} min={0} max={255} onChange={(e, val) => setG(val as number)} color="success" />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="primary.main" fontWeight="bold">Blue (B)</Typography>
            <Typography variant="subtitle2">{b}</Typography>
          </Box>
          <Slider value={b} min={0} max={255} onChange={(e, val) => setB(val as number)} color="primary" />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>CMYK Result:</Typography>
          <TextField
            value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
            InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold' } }}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Cyan</Typography>
            <Typography variant="h6">{cmyk.c}%</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Magenta</Typography>
            <Typography variant="h6">{cmyk.m}%</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Yellow</Typography>
            <Typography variant="h6">{cmyk.y}%</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Key (Black)</Typography>
            <Typography variant="h6">{cmyk.k}%</Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Color Preview:</Typography>
          <Paper sx={{ height: 120, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: rgbHex }} />
        </Box>
      </Box>
    </Box>
  );
};

const RgbToCmykConverter = () => {
  const content = (
    <>
      <Typography variant="h2">What is an RGB to CMYK Converter?</Typography>
      <Typography variant="body1">
        <strong>RGB</strong> (Red, Green, Blue) is an additive color model used for screens, while
        <strong> CMYK</strong> (Cyan, Magenta, Yellow, Key/Black) is a subtractive model used for print. Because
        the two models mix color differently, converting between them requires a formula rather than a direct
        lookup — this tool applies the standard RGB to CMYK formula so you get accurate print-ready values from
        an on-screen color.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        RGB (33, 150, 243) converts to approximately <code>cmyk(86%, 38%, 0%, 5%)</code>. The K (black) value
        comes from the darkest channel, and C, M, and Y are scaled relative to it.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Preparing a screen color for print design, where CMYK is the standard color model.</li>
          <li>Checking how a brand&apos;s RGB color will translate to ink percentages on a printer.</li>
          <li>Converting a color picked from a design tool for use in print-ready templates.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does RGB to CMYK need a formula instead of a direct table?</Typography>
      <Typography variant="body1">
        RGB and CMYK represent color using entirely different models — additive light versus subtractive ink —
        so there&apos;s no one-to-one mapping. The formula approximates the closest CMYK values, though actual
        printed colors can vary by printer and ink profile.
      </Typography>
      <Typography variant="h3">What&apos;s the formula used for RGB to CMYK conversion?</Typography>
      <Typography variant="body1">
        K = 1 − max(R&apos;, G&apos;, B&apos;), where R&apos;, G&apos;, B&apos; are the RGB values divided by
        255. Then C = (1 − R&apos; − K) / (1 − K), M = (1 − G&apos; − K) / (1 − K), and Y = (1 − B&apos; − K) /
        (1 − K), each expressed as a percentage.
      </Typography>
      <Typography variant="h3">Does this tool also convert CMYK back to RGB?</Typography>
      <Typography variant="body1">
        This page converts RGB to CMYK only. Use our separate CMYK to RGB converter if you need to go the
        opposite direction.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/rgb-to-cmyk-converter" content={content}>
      <RgbToCmykContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RgbToCmykConverter;
