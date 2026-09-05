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

const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((v) => v.toString(16).toUpperCase().padStart(2, '0')).join('')}`;

const CmykToHexContent = () => {
  const [c, setC] = useState(86);
  const [m, setM] = useState(38);
  const [y, setY] = useState(0);
  const [k, setK] = useState(5);

  const rgb = useMemo(() => cmykToRgb(c, m, y, k), [c, m, y, k]);
  const hex = useMemo(() => toHex(rgb.r, rgb.g, rgb.b), [rgb]);

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
          <Typography variant="subtitle1" fontWeight="600" mb={1}>HEX Result:</Typography>
          <TextField
            value={hex}
            InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold' } }}
            fullWidth
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Color Preview:</Typography>
          <Paper sx={{ height: 150, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: hex }} />
        </Box>
      </Box>
    </Box>
  );
};

const CmykToHexConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CMYK to HEX Converter</Typography>
      <Typography variant="body1">
        Adjust the Cyan, Magenta, Yellow, and Key (Black) sliders (0-100% each) and this tool converts your
        print-style CMYK color straight to a web-ready HEX code. Internally it first converts CMYK to RGB
        using the standard formula, then converts that RGB result to a 6-digit hexadecimal code — the format
        CSS and most design software expect.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
        R = 255×(1−C/100)×(1−K/100) &nbsp;|&nbsp; G uses M &nbsp;|&nbsp; B uses Y &nbsp;→&nbsp; HEX
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        CMYK (86%, 38%, 0%, 5%) converts to RGB (34, 150, 242), then to hex code <code>#2296F2</code> — a
        vivid blue.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Turning a print spec&apos;s CMYK ink percentages directly into a hex code for a website or app.</li>
          <li>Matching a brand&apos;s print color to its closest on-screen hex equivalent for CSS.</li>
          <li>Getting a copy-paste-ready hex value without a separate RGB conversion step.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the CMYK to RGB Converter?</strong> The CMYK to RGB Converter stops at RGB values (like rgb(34, 150, 242)) — useful when you need individual red, green, and blue numbers. This CMYK to HEX Converter takes that same conversion one step further and outputs a ready-to-use hex code (like #2296F2) instead, which is the format most needed for CSS, HTML, and web design work.</li>
          <li><strong>Why might the on-screen hex color look different from the printed CMYK color?</strong> CMYK printing depends on ink, paper stock, and printer or press calibration, none of which this formula accounts for. The conversion gives a mathematically consistent approximation, not a color-managed print preview, so always confirm important brand colors with a physical proof.</li>
          <li><strong>What's the formula behind a CMYK to HEX conversion?</strong> CMYK is first converted to RGB using R = 255×(1−C)×(1−K), G = 255×(1−M)×(1−K), and B = 255×(1−Y)×(1−K) (with C, M, Y, K as fractions of 1), then each RGB channel (0-255) is converted to a 2-digit hexadecimal number and joined with a # in front.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/cmyk-to-hex-converter" content={content}>
      <CmykToHexContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CmykToHexConverter;
