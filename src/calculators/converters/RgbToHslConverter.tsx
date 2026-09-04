'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const rgbToHsl = (r: number, g: number, b: number) => {
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

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const toHexChannel = (c: number) => c.toString(16).toUpperCase().padStart(2, '0');
const toHex = (r: number, g: number, b: number) => `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`;

const RgbToHslContent = () => {
  const [r, setR] = useState(33);
  const [g, setG] = useState(150);
  const [b, setB] = useState(243);

  const hsl = useMemo(() => rgbToHsl(r, g, b), [r, g, b]);
  const hex = useMemo(() => toHex(r, g, b), [r, g, b]);

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace('#', '');
    setR(parseInt(val.substring(0, 2), 16));
    setG(parseInt(val.substring(2, 4), 16));
    setB(parseInt(val.substring(4, 6), 16));
  };

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
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>Or Pick a Color</Typography>
          <input type="color" value={hex} onChange={handleColorPicker} style={{ width: '100%', height: 48, border: 'none', cursor: 'pointer' }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>HSL Result:</Typography>
          <TextField
            value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
            InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold' } }}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Hue</Typography>
            <Typography variant="h6" fontWeight={700}>{hsl.h}°</Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Saturation</Typography>
            <Typography variant="h6" fontWeight={700}>{hsl.s}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Lightness</Typography>
            <Typography variant="h6" fontWeight={700}>{hsl.l}%</Typography>
          </Paper>
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Color Preview:</Typography>
          <Paper sx={{ height: 120, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: hex }} />
        </Box>
      </Box>
    </Box>
  );
};

const RgbToHslConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the RGB to HSL Converter</Typography>
      <Typography variant="body1">
        Adjust the R, G, and B sliders (0-255 each) — or use the color picker for convenience — and the
        equivalent HSL (Hue, Saturation, Lightness) values appear instantly. HSL describes a color by the
        angle of its hue on a color wheel (0-360°), how saturated (vivid) it is as a percentage, and how
        light or dark it is as a percentage, which many designers find more intuitive to reason about than
        raw RGB numbers.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
        L = (max + min) / 2 &nbsp;|&nbsp; S = delta / (1 − |2L − 1|) &nbsp;|&nbsp; H = piecewise from max channel
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        RGB (33, 150, 243) — a common material-design blue — converts to approximately{' '}
        <code>hsl(207, 90%, 54%)</code>: a hue of 207° (in the blue range), 90% saturation, and 54% lightness.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting an RGB color from a design tool into CSS-ready HSL notation.</li>
          <li>Adjusting a color&apos;s lightness or saturation independently while keeping the same hue.</li>
          <li>Building a consistent color palette by varying lightness/saturation around a fixed hue.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why use HSL instead of RGB in CSS?</strong> HSL separates a color's hue from its intensity and brightness, making it much easier to create variations of the same color (like a lighter or more muted version) by adjusting just one value, instead of recalculating all three RGB channels.</li>
          <li><strong>What do the H, S, and L values mean?</strong> Hue (H) is the color's position on a 360° color wheel (0° = red, 120° = green, 240° = blue). Saturation (S) is how vivid versus gray the color is, from 0% (gray) to 100% (fully saturated). Lightness (L) is how light or dark it is, from 0% (black) to 100% (white), with 50% being the purest version of the hue.</li>
          <li><strong>Can I use the color picker instead of entering RGB numbers?</strong> Yes — the native color picker lets you visually choose a color, and the R, G, B sliders and HSL output update automatically to match your selection.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/rgb-to-hsl-converter" content={content}>
      <RgbToHslContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RgbToHslConverter;
