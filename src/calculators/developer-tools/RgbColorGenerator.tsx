'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function randomRgb(): { css: string; hex: string } {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const hex = '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('');
  return { css: `rgb(${r}, ${g}, ${b})`, hex };
}

const RgbColorGeneratorContent = () => {
  const [palette, setPalette] = useState(() => Array.from({ length: 5 }, randomRgb));

  const regenerate = () => setPalette(Array.from({ length: 5 }, randomRgb));
  const copy = (css: string) => navigator.clipboard.writeText(css);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<ShuffleIcon />} onClick={regenerate}>
        Generate New Palette
      </Button>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(5, 1fr)' }, gap: 2 }}>
        {palette.map((color, i) => (
          <Paper key={`${color.css}-${i}`} variant="outlined" sx={{ overflow: 'hidden' }}>
            <Box sx={{ height: 100, bgcolor: color.hex }} />
            <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-start' }}>
              <Typography variant="body2" fontFamily="monospace" sx={{ fontSize: '0.75rem' }}>{color.css}</Typography>
              <Button size="small" startIcon={<ContentCopyIcon fontSize="small" />} onClick={() => copy(color.css)}>
                Copy
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const RgbColorGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free RGB Color Palette Generator</Typography>
      <Typography variant="body1">
        Instantly generate a palette of 5 random colors in <code>rgb(r, g, b)</code> format — handy for
        developers who want a ready-to-paste CSS color value rather than a hex code.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Click "Generate New Palette" to get 5 fresh random RGB colors, each with its own swatch and copy
        button — click Copy to grab that exact <code>rgb(...)</code> string.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One click might generate <code>rgb(63, 142, 252)</code>, <code>rgb(177, 74, 237)</code>, and three more
        — each ready to paste directly into a CSS <code>color</code> or <code>background</code> property.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Grabbing a quick placeholder RGB value for a stylesheet or CSS-in-JS snippet.</li>
          <li>Generating random RGB test data for canvas or graphics programming.</li>
          <li>Exploring color combinations without opening a full design tool.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a general random color generator?</Typography>
      <Typography variant="body1">
        This tool focuses purely on the <code>rgb()</code> CSS function format and generates a palette of 5
        colors at once, framed as a dev-tool utility for grabbing ready-to-paste values quickly.
      </Typography>
      <Typography variant="h3">Why use RGB instead of hex?</Typography>
      <Typography variant="body1">
        RGB syntax is handy when you need to layer transparency with <code>rgba()</code>, or when working in
        contexts (like some canvas or animation code) that expect separate red, green, and blue channel values.
      </Typography>
      <Typography variant="h3">Are the colors truly random?</Typography>
      <Typography variant="body1">
        Yes — each of the red, green, and blue channels is chosen independently and uniformly from 0 to 255.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/rgb-color-generator" content={content}>
      <RgbColorGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RgbColorGenerator;
