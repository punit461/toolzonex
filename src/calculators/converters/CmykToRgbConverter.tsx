'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const cmykToRgb = (c: number, m: number, y: number, k: number) => {
  const r = 255 * (1 - c / 100) * (1 - k / 100);
  const g = 255 * (1 - m / 100) * (1 - k / 100);
  const b = 255 * (1 - y / 100) * (1 - k / 100);
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
};

const CmykToRgbContent = () => {
  const [c, setC] = useState(86);
  const [m, setM] = useState(38);
  const [y, setY] = useState(0);
  const [k, setK] = useState(5);

  const rgb = useMemo(() => cmykToRgb(c, m, y, k), [c, m, y, k]);
  const hex = useMemo(
    () => `#${[rgb.r, rgb.g, rgb.b].map((v) => v.toString(16).toUpperCase().padStart(2, '0')).join('')}`,
    [rgb]
  );

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#00AEEF' }} fontWeight="bold">Cyan (C)</Typography>
            <Typography variant="subtitle2">{c}%</Typography>
          </Box>
          <Slider value={c} min={0} max={100} onChange={(e, val) => setC(val as number)} />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#EC008C' }} fontWeight="bold">Magenta (M)</Typography>
            <Typography variant="subtitle2">{m}%</Typography>
          </Box>
          <Slider value={m} min={0} max={100} onChange={(e, val) => setM(val as number)} />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#FFF200' }} fontWeight="bold">Yellow (Y)</Typography>
            <Typography variant="subtitle2">{y}%</Typography>
          </Box>
          <Slider value={y} min={0} max={100} onChange={(e, val) => setY(val as number)} />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Key (K / Black)</Typography>
            <Typography variant="subtitle2">{k}%</Typography>
          </Box>
          <Slider value={k} min={0} max={100} onChange={(e, val) => setK(val as number)} color="secondary" />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>RGB Result:</Typography>
          <TextField
            value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}
            InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold' } }}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>HEX Equivalent:</Typography>
          <TextField
            value={hex}
            InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold' } }}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Color Preview:</Typography>
          <Paper sx={{ height: 120, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: hex }} />
        </Box>
      </Box>
    </Box>
  );
};

const CmykToRgbConverter = () => {
  const content = (
    <>
      <Typography variant="h2">What is a CMYK to RGB Converter?</Typography>
      <Typography variant="body1">
        <strong>CMYK</strong> (Cyan, Magenta, Yellow, Key/Black) is the subtractive color model used for print,
        while <strong>RGB</strong> (Red, Green, Blue) is the additive model used for screens. This tool applies
        the standard CMYK to RGB formula so you can preview how a print color will appear as an on-screen
        color — the exact reverse of an RGB to CMYK conversion.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        CMYK (86%, 38%, 0%, 5%) converts to approximately <code>rgb(34, 150, 242)</code>, or hex{' '}
        <code>#2296F2</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Previewing a print (CMYK) color as an RGB value for on-screen design mockups.</li>
          <li>Converting ink percentages from a print spec sheet into a web-usable color code.</li>
          <li>Checking how a CMYK brand color compares to its RGB or hex equivalent.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why might the RGB result look slightly different on screen than the printed CMYK color?</Typography>
      <Typography variant="body1">
        CMYK printing depends on ink, paper, and printer calibration, none of which this formula accounts for —
        it gives a mathematically consistent approximation, not a color-managed print preview.
      </Typography>
      <Typography variant="h3">What is the formula for CMYK to RGB conversion?</Typography>
      <Typography variant="body1">
        R = 255 × (1 − C) × (1 − K), G = 255 × (1 − M) × (1 − K), and B = 255 × (1 − Y) × (1 − K), where C, M,
        Y, and K are each expressed as a fraction between 0 and 1 (i.e. the percentage divided by 100).
      </Typography>
      <Typography variant="h3">Does this tool also convert RGB back to CMYK?</Typography>
      <Typography variant="body1">
        This page converts CMYK to RGB only. Use our separate RGB to CMYK converter if you need to go the
        opposite direction.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/cmyk-to-rgb-converter" content={content}>
      <CmykToRgbContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CmykToRgbConverter;
