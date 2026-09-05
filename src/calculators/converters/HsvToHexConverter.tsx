'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function hsvToRgb(h: number, s: number, v: number) {
  const sN = s / 100;
  const vN = v / 100;
  const c = vN * sN;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0, g1 = 0, b1 = 0;

  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  const m = vN - c;
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

const toHexChannel = (c: number) => c.toString(16).toUpperCase().padStart(2, '0');
const toHex = (r: number, g: number, b: number) => `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`;

const HsvToHexContent = () => {
  const [h, setH] = useState(207);
  const [s, setS] = useState(86);
  const [v, setV] = useState(95);

  const rgb = useMemo(() => hsvToRgb(h, s, v), [h, s, v]);
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
            <Typography variant="subtitle2" fontWeight="bold">Value (V)</Typography>
            <Typography variant="subtitle2">{v}%</Typography>
          </Box>
          <Slider value={v} min={0} max={100} onChange={(e, val) => setV(val as number)} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Hex Result:</Typography>
          <TextField
            value={hex}
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
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Color Preview:</Typography>
          <Paper sx={{ height: 120, borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: hex }} />
        </Box>
      </Box>
    </Box>
  );
};

const HsvToHexConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the HSV to HEX Converter</Typography>
      <Typography variant="body1">
        Adjust the Hue (0-360°), Saturation (%), and Value (%) sliders and the equivalent hex color code
        appears instantly, along with a live preview swatch. Behind the scenes, the tool first converts HSV
        to RGB using the standard formula — computing a chroma value from Saturation and Value, mapping that
        chroma onto the correct RGB channels based on which 60° segment of the color wheel the hue falls in,
        then adding a matching offset to all three channels — and finally formats the resulting RGB values as
        a hex string.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>hsv(207, 86%, 95%)</code> converts to approximately <code>#2294F2</code>, a blue very close to
        the common material-design blue <code>#2196F3</code> (small differences come from rounding at each
        conversion step).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting an HSV value from image-editing software (like Photoshop's color picker) into a hex code for CSS or design tools.</li>
          <li>Exploring how changing Saturation or Value while keeping Hue fixed affects the resulting color.</li>
          <li>Getting the exact hex code for a color you dialed in visually using Hue/Saturation/Value sliders.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is HSV different from HSL?</strong> Both use a hue angle plus two other components, but HSV's components are Saturation and Value (brightness relative to the brightest channel), while HSL uses Saturation and Lightness (where 50% lightness is the purest color and 100% is pure white). HSV maps more directly onto the color pickers found in many graphics editors.</li>
          <li><strong>Why might the hex output not exactly match a color I saw elsewhere?</strong> RGB channels are whole numbers from 0-255, while HSV values are continuous, so converting HSV to RGB (and then to hex) can introduce very small rounding differences — usually invisible to the eye but occasionally off by a shade of 1 in a channel.</li>
          <li><strong>What happens at 0% Saturation or 0% Value?</strong> At 0% Saturation, the Hue has no effect and the result is always a shade of gray (from black at 0% Value to white at 100% Value). At 0% Value, the result is always pure black regardless of Hue or Saturation.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/hsv-to-hex-converter" content={content}>
      <HsvToHexContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HsvToHexConverter;
