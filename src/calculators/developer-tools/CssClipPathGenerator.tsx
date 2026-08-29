'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Button, Paper, Slider, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Shape = 'circle' | 'ellipse' | 'triangle' | 'pentagon' | 'hexagon' | 'inset';

const CssClipPathGeneratorContent = () => {
  const [shape, setShape] = useState<Shape>('circle');
  const [radius, setRadius] = useState(50);
  const [insetTop, setInsetTop] = useState(10);
  const [insetRight, setInsetRight] = useState(10);
  const [insetBottom, setInsetBottom] = useState(10);
  const [insetLeft, setInsetLeft] = useState(10);

  const clipPath = useMemo(() => {
    switch (shape) {
      case 'circle': return `circle(${radius}% at 50% 50%)`;
      case 'ellipse': return `ellipse(${radius}% ${Math.round(radius * 0.7)}% at 50% 50%)`;
      case 'triangle': return 'polygon(50% 0%, 0% 100%, 100% 100%)';
      case 'pentagon': return 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
      case 'hexagon': return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      case 'inset': return `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}%)`;
      default: return '';
    }
  }, [shape, radius, insetTop, insetRight, insetBottom, insetLeft]);

  const css = `clip-path: ${clipPath};`;
  const copy = () => navigator.clipboard.writeText(css);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ToggleButtonGroup value={shape} exclusive size="small" onChange={(_, v) => v && setShape(v)} sx={{ flexWrap: 'wrap' }}>
          <ToggleButton value="circle">Circle</ToggleButton>
          <ToggleButton value="ellipse">Ellipse</ToggleButton>
          <ToggleButton value="triangle">Triangle</ToggleButton>
          <ToggleButton value="pentagon">Pentagon</ToggleButton>
          <ToggleButton value="hexagon">Hexagon</ToggleButton>
          <ToggleButton value="inset">Inset</ToggleButton>
        </ToggleButtonGroup>

        {(shape === 'circle' || shape === 'ellipse') && (
          <Box>
            <Typography variant="subtitle2" mb={1}>Size: {radius}%</Typography>
            <Slider value={radius} min={5} max={75} onChange={(_, v) => setRadius(v as number)} />
          </Box>
        )}

        {shape === 'inset' && (
          <>
            <Box>
              <Typography variant="subtitle2" mb={1}>Top: {insetTop}%</Typography>
              <Slider value={insetTop} min={0} max={45} onChange={(_, v) => setInsetTop(v as number)} />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>Right: {insetRight}%</Typography>
              <Slider value={insetRight} min={0} max={45} onChange={(_, v) => setInsetRight(v as number)} />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>Bottom: {insetBottom}%</Typography>
              <Slider value={insetBottom} min={0} max={45} onChange={(_, v) => setInsetBottom(v as number)} />
            </Box>
            <Box>
              <Typography variant="subtitle2" mb={1}>Left: {insetLeft}%</Typography>
              <Slider value={insetLeft} min={0} max={45} onChange={(_, v) => setInsetLeft(v as number)} />
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 3, display: 'flex', justifyContent: 'center', bgcolor: 'action.hover' }}>
          <Box sx={{ width: 220, height: 220, bgcolor: 'primary.main', clipPath }} />
        </Paper>
        <Box sx={{ position: 'relative' }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
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

const CssClipPathGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS Clip-Path Generator</Typography>
      <Typography variant="body1">
        Choose a shape — circle, ellipse, triangle, pentagon, hexagon, or inset — and adjust its parameters to
        generate a CSS <code>clip-path</code> value, with a live preview on a sample box.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Pick a shape from the toggle buttons, adjust its size or inset sliders, and watch the preview box update
        live. Copy the generated <code>clip-path</code> CSS and apply it to any element.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting Hexagon generates <code>clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0%
        50%)</code> — a six-sided shape carved directly out of a plain rectangular element.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a custom-shaped profile picture or badge without an image editor.</li>
          <li>Building angled section dividers or hero image cutouts on a landing page.</li>
          <li>Cropping a decorative element into a triangle, hexagon, or other polygon shape.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does clip-path affect the element's clickable area?</Typography>
      <Typography variant="body1">
        In most modern browsers, yes — clicks outside the visible clipped shape but inside the original box are
        not registered, so a clip-path shape is also generally its interactive hit area.
      </Typography>
      <Typography variant="h3">Is clip-path animatable?</Typography>
      <Typography variant="body1">
        Yes, when both the starting and ending values use the same clip-path function (like two
        <code>polygon()</code> values with the same number of points) — browsers can smoothly transition
        between them.
      </Typography>
      <Typography variant="h3">Is browser support good for clip-path?</Typography>
      <Typography variant="body1">
        Yes — <code>clip-path</code> with basic shapes is supported in all modern browsers, though very old
        browsers may need a <code>-webkit-</code> prefix or lack support entirely.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-clip-path-generator" content={content}>
      <CssClipPathGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssClipPathGenerator;
