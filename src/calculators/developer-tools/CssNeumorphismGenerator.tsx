'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Button, Slider, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function shade([r, g, b]: [number, number, number], amount: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `rgb(${clamp(r + amount)}, ${clamp(g + amount)}, ${clamp(b + amount)})`;
}

const CssNeumorphismGeneratorContent = () => {
  const [bgColor, setBgColor] = useState('#e0e5ec');
  const [distance, setDistance] = useState(8);
  const [blurRadius, setBlurRadius] = useState(16);
  const [intensity, setIntensity] = useState(0.15);
  const [copied, setCopied] = useState(false);

  const rgb = hexToRgb(bgColor);
  const lightAmount = 255 * intensity * 2;
  const darkAmount = -255 * intensity * 2;
  const lightShadow = shade(rgb, lightAmount);
  const darkShadow = shade(rgb, darkAmount);

  const boxShadow = `${-distance}px ${-distance}px ${blurRadius}px ${lightShadow}, ${distance}px ${distance}px ${blurRadius}px ${darkShadow}`;

  const css = useMemo(() => {
    return `background: ${bgColor};
border-radius: 20px;
box-shadow: ${boxShadow};`;
  }, [bgColor, boxShadow]);

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Base Background Color" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} sx={{ width: { xs: '100%', sm: '50%' } }} />
        <Box>
          <Typography gutterBottom>Shadow Distance: {distance}px</Typography>
          <Slider value={distance} onChange={(_, v) => setDistance(v as number)} min={1} max={30} />
        </Box>
        <Box>
          <Typography gutterBottom>Blur Radius: {blurRadius}px</Typography>
          <Slider value={blurRadius} onChange={(_, v) => setBlurRadius(v as number)} min={0} max={60} />
        </Box>
        <Box>
          <Typography gutterBottom>Shadow Intensity: {intensity.toFixed(2)}</Typography>
          <Slider value={intensity} onChange={(_, v) => setIntensity(v as number)} min={0.02} max={0.3} step={0.01} />
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>Live Preview</Typography>
        <Box
          sx={{
            height: 220,
            borderRadius: 2,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: bgColor,
          }}
        >
          <Box
            sx={{
              width: 180,
              height: 100,
              borderRadius: '20px',
              background: bgColor,
              boxShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(0,0,0,0.6)',
              fontWeight: 700,
            }}
          >
            Soft UI
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">CSS:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre-wrap', bgcolor: 'action.hover' }}>
          {css}
        </Paper>
      </Box>
    </Box>
  );
};

const CssNeumorphismGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CSS Neumorphism Generator</Typography>
      <Typography variant="body1">
        Neumorphism (soft UI) creates the look of an element gently extruded from, or pressed into, its
        background using two matching box-shadows — a lighter one offset up-left and a darker one offset
        down-right, both drawn in shades of the same base color. Pick a base background color, then tune the
        shadow distance, blur radius, and intensity with the sliders to preview the effect live, and copy the
        resulting CSS.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A light gray background (<code>#e0e5ec</code>) with an 8px shadow distance and 16px blur produces the
        classic soft, pillowy neumorphic card look popularized in dashboard and mobile app UI concepts.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Designing soft-UI buttons, cards, or toggle switches for a dashboard or app mockup.</li>
          <li>Prototyping a neumorphic design system component without hand-tuning shadow values.</li>
          <li>Creating a subtle, low-contrast visual style for calculator, settings, or media-player UI.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why do both shadows need to match the background color?</strong> Neumorphism works by shading the same base color lighter and darker rather than using a contrasting shadow color, which is what makes the element look like it&apos;s carved from the same material as its background instead of floating above it.</li>
          <li><strong>Why does my neumorphic element look flat or low-contrast?</strong> Neumorphism relies on subtle brightness differences, so it can naturally read as low-contrast — this is by design, but it means text and icons inside a neumorphic element need extra care to stay accessible and legible.</li>
          <li><strong>Can I make an element look pressed in instead of raised?</strong> Yes — swap the technique to use <code>inset</code> shadows (placing the dark shadow on the same side as the light one is flipped) to create a pressed-in, concave look instead of a raised, convex one.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-neumorphism-generator" content={content}>
      <CssNeumorphismGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssNeumorphismGenerator;
