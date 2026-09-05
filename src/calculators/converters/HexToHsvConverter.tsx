'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.trim().replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function rgbToHsv(r: number, g: number, b: number) {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rN) h = ((gN - bN) / delta) % 6;
    else if (max === gN) h = (bN - rN) / delta + 2;
    else h = (rN - gN) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100) };
}

const HexToHsvContent = () => {
  const [hex, setHex] = useState('#2196F3');

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsv = useMemo(() => (rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null), [rgb]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Hex Color Code"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          fullWidth
          placeholder="#2196F3"
          error={!rgb}
          helperText={!rgb ? 'Enter a valid 6-digit hex code, like #2196F3' : ' '}
        />
        <input
          type="color"
          value={rgb ? hex.startsWith('#') ? hex : `#${hex}` : '#2196F3'}
          onChange={(e) => setHex(e.target.value)}
          style={{ width: '100%', height: 48, border: 'none', cursor: 'pointer' }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {hsv ? (
          <>
            <TextField
              value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
              InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold' } }}
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Hue</Typography>
                <Typography variant="h6" fontWeight={700}>{hsv.h}°</Typography>
              </Paper>
              <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Saturation</Typography>
                <Typography variant="h6" fontWeight={700}>{hsv.s}%</Typography>
              </Paper>
              <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Value</Typography>
                <Typography variant="h6" fontWeight={700}>{hsv.v}%</Typography>
              </Paper>
            </Box>
            <Paper sx={{ height: 120, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: hex }} />
          </>
        ) : (
          <Paper sx={{ p: 2 }}><Typography color="text.secondary">Enter a valid hex code to see the HSV values.</Typography></Paper>
        )}
      </Box>
    </Box>
  );
};

const HexToHsvConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the HEX to HSV Converter</Typography>
      <Typography variant="body1">
        Type a 6-digit hex color code (or use the color picker) and the equivalent HSV — Hue, Saturation,
        Value — representation appears instantly. The conversion first splits the hex code into its red,
        green, and blue channels, then applies the standard RGB-to-HSV formula: Hue comes from which channel
        is largest and how the other two compare, Saturation measures how far the color is from gray, and
        Value is simply the largest of the three channels, expressed as a percentage.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The hex code <code>#2196F3</code> — a common material-design blue — converts to approximately{' '}
        <code>hsv(207, 86%, 95%)</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a hex color from a design tool into HSV for image editing software that uses HSV sliders.</li>
          <li>Understanding a color's brightness (Value) and vividness (Saturation) independent of its exact RGB numbers.</li>
          <li>Matching a brand color's hue while experimenting with different saturation or brightness levels.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is HSV different from HSL?</strong> Both describe color using a hue angle plus two other components, but HSV's second and third components are Saturation and Value (brightness relative to the brightest channel), while HSL uses Saturation and Lightness (where 50% lightness is the purest color and 100% is always white). HSV maps more directly onto how color pickers in graphics software like Photoshop typically work.</li>
          <li><strong>Why does the Value stay high even for dark-looking colors?</strong> Value in HSV only measures the brightest of the three RGB channels, not overall perceived brightness — a fully saturated dark red can still have a high Value because its red channel is high, even though the color looks dark overall due to low green and blue.</li>
          <li><strong>Can I use the color picker instead of typing a hex code?</strong> Yes — the native color picker lets you visually choose a color, and the hex input and HSV output update automatically to match your selection.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/hex-to-hsv-converter" content={content}>
      <HexToHsvContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HexToHsvConverter;
