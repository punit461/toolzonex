'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function hslToRgb(h: number, s: number, l: number) {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0, g1 = 0, b1 = 0;

  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  const m = lN - c / 2;
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

const toHexChannel = (c: number) => c.toString(16).toUpperCase().padStart(2, '0');
const toHex = (r: number, g: number, b: number) => `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`;

const HslToRgbContent = () => {
  const [h, setH] = useState(207);
  const [s, setS] = useState(90);
  const [l, setL] = useState(54);

  const rgb = useMemo(() => hslToRgb(h, s, l), [h, s, l]);
  const hex = useMemo(() => toHex(rgb.r, rgb.g, rgb.b), [rgb]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">Hue (H)</Typography>
            <Typography variant="subtitle2">{h}°</Typography>
          </Box>
          <Slider value={h} min={0} max={360} onChange={(e, val) => setH(val as number)} />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">Saturation (S)</Typography>
            <Typography variant="subtitle2">{s}%</Typography>
          </Box>
          <Slider value={s} min={0} max={100} onChange={(e, val) => setS(val as number)} />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">Lightness (L)</Typography>
            <Typography variant="subtitle2">{l}%</Typography>
          </Box>
          <Slider value={l} min={0} max={100} onChange={(e, val) => setL(val as number)} />
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
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Red</Typography>
            <Typography variant="h6" fontWeight={700}>{rgb.r}</Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Green</Typography>
            <Typography variant="h6" fontWeight={700}>{rgb.g}</Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Blue</Typography>
            <Typography variant="h6" fontWeight={700}>{rgb.b}</Typography>
          </Paper>
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Hex: {hex}</Typography>
          <Paper sx={{ height: 120, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: hex }} />
        </Box>
      </Box>
    </Box>
  );
};

const HslToRgbConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the HSL to RGB Converter</Typography>
      <Typography variant="body1">
        Adjust the Hue (0-360°), Saturation (%), and Lightness (%) sliders and the equivalent RGB values
        (0-255 each) appear instantly, along with a live color swatch and hex code. This is the reverse
        direction of converting RGB to HSL: instead of starting from red/green/blue channels, you start from
        HSL's more intuitive hue-angle-plus-intensity model and get back the raw RGB numbers CSS and most
        image formats ultimately store.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
        C = (1 − |2L−1|) × S &nbsp;|&nbsp; X = C × (1 − |(H/60 mod 2) − 1|) &nbsp;|&nbsp; m = L − C/2
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>hsl(207, 90%, 54%)</code> — a common material-design blue — converts to approximately{' '}
        <code>rgb(32, 148, 243)</code>, the same color expressed in raw red, green, and blue channel values.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting an HSL color from a design spec into RGB for tools or code that only accept RGB.</li>
          <li>Checking exactly what RGB values a hue/saturation/lightness adjustment actually produces.</li>
          <li>Building a color palette in HSL (for easy lightness/saturation tweaks) and exporting the final RGB values.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why convert from HSL to RGB instead of just using HSL directly?</strong> Most image formats, canvas APIs, and many older tools store and expect colors as RGB channels rather than HSL, so once you've dialed in a color's hue, saturation, and lightness, you often need the equivalent RGB values to plug into that system.</li>
          <li><strong>Is the conversion exact, or does it round?</strong> RGB channels are whole numbers from 0-255, while HSL is continuous, so converting HSL to RGB (and back) can introduce very small rounding differences. For typical design work these differences are imperceptible.</li>
          <li><strong>Can I get the hex code too?</strong> Yes — the resulting RGB values are also shown as a hex color code alongside a live preview swatch, so you can copy whichever format you need.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/hsl-to-rgb-converter" content={content}>
      <HslToRgbContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HslToRgbConverter;
