'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, Slider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CssTextShadowGeneratorContent = () => {
  const [offsetX, setOffsetX] = useState(2);
  const [offsetY, setOffsetY] = useState(2);
  const [blur, setBlur] = useState(4);
  const [color, setColor] = useState('#000000');

  const textShadow = `${offsetX}px ${offsetY}px ${blur}px ${color}`;
  const css = `text-shadow: ${textShadow};`;
  const copy = () => navigator.clipboard.writeText(css);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" mb={1}>Offset X: {offsetX}px</Typography>
          <Slider value={offsetX} min={-20} max={20} onChange={(_, v) => setOffsetX(v as number)} />
        </Box>
        <Box>
          <Typography variant="subtitle2" mb={1}>Offset Y: {offsetY}px</Typography>
          <Slider value={offsetY} min={-20} max={20} onChange={(_, v) => setOffsetY(v as number)} />
        </Box>
        <Box>
          <Typography variant="subtitle2" mb={1}>Blur Radius: {blur}px</Typography>
          <Slider value={blur} min={0} max={30} onChange={(_, v) => setBlur(v as number)} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 36, height: 36, border: 'none', cursor: 'pointer' }} />
          <Typography variant="body2" fontFamily="monospace">{color}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 140, bgcolor: 'action.hover' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, textShadow }}>Sample Text</Typography>
        </Paper>
        <Box sx={{ position: 'relative' }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace' }}>
            {css}
          </Paper>
          <Button variant="contained" size="small" startIcon={<ContentCopyIcon />} onClick={copy} sx={{ position: 'absolute', top: 8, right: 8 }}>
            Copy
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const CssTextShadowGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS Text Shadow Generator</Typography>
      <Typography variant="body1">
        Adjust offset, blur, and color sliders to build a CSS <code>text-shadow</code> value visually, with a
        live preview on sample text and a one-click copy button.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Drag the offset-x, offset-y, and blur sliders, and pick a color, while watching the sample text update
        live. Copy the generated <code>text-shadow</code> CSS when you're happy with it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A subtle shadow like <code>text-shadow: 2px 2px 4px #000000</code> adds gentle depth to a heading
        without overwhelming it.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Improving text legibility over a busy background image.</li>
          <li>Adding a subtle depth effect to headings or buttons.</li>
          <li>Creating a glow effect by using a bright color with a large blur radius.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I stack multiple text shadows?</Typography>
      <Typography variant="body1">
        Yes — <code>text-shadow</code> accepts a comma-separated list of shadow definitions, which is how
        effects like a solid outline or neon glow are typically built. This generator produces one shadow layer
        at a time, which you can duplicate and combine manually.
      </Typography>
      <Typography variant="h3">How do I make a glow effect instead of a drop shadow?</Typography>
      <Typography variant="body1">
        Set offset-x and offset-y both to 0 and increase the blur radius with a bright or saturated color — this
        spreads the shadow evenly around the text instead of offsetting it.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the CSS is generated and previewed entirely client-side in your browser.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-text-shadow-generator" content={content}>
      <CssTextShadowGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssTextShadowGenerator;
