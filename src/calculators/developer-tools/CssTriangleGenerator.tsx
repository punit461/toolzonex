'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Button, Paper, ToggleButton, ToggleButtonGroup, Slider, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Direction = 'up' | 'down' | 'left' | 'right';

function buildCss(direction: Direction, size: number, color: string): string {
  const t = `${size}px solid transparent`;
  const c = `${size}px solid ${color}`;
  switch (direction) {
    case 'up':
      return `.triangle {\n  width: 0;\n  height: 0;\n  border-left: ${t};\n  border-right: ${t};\n  border-bottom: ${c};\n}`;
    case 'down':
      return `.triangle {\n  width: 0;\n  height: 0;\n  border-left: ${t};\n  border-right: ${t};\n  border-top: ${c};\n}`;
    case 'left':
      return `.triangle {\n  width: 0;\n  height: 0;\n  border-top: ${t};\n  border-bottom: ${t};\n  border-right: ${c};\n}`;
    case 'right':
      return `.triangle {\n  width: 0;\n  height: 0;\n  border-top: ${t};\n  border-bottom: ${t};\n  border-left: ${c};\n}`;
  }
}

function triangleStyle(direction: Direction, size: number, color: string): React.CSSProperties {
  const transparent = `${size}px solid transparent`;
  const solid = `${size}px solid ${color}`;
  const base: React.CSSProperties = { width: 0, height: 0 };
  switch (direction) {
    case 'up': return { ...base, borderLeft: transparent, borderRight: transparent, borderBottom: solid };
    case 'down': return { ...base, borderLeft: transparent, borderRight: transparent, borderTop: solid };
    case 'left': return { ...base, borderTop: transparent, borderBottom: transparent, borderRight: solid };
    case 'right': return { ...base, borderTop: transparent, borderBottom: transparent, borderLeft: solid };
  }
}

const CssTriangleGeneratorContent = () => {
  const [direction, setDirection] = useState<Direction>('up');
  const [size, setSize] = useState(80);
  const [color, setColor] = useState('#1976d2');
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => buildCss(direction, size, color), [direction, size, color]);

  const copyCss = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>Direction</Typography>
          <ToggleButtonGroup value={direction} exclusive onChange={(_, v) => v && setDirection(v)} fullWidth>
            <ToggleButton value="up">Up</ToggleButton>
            <ToggleButton value="down">Down</ToggleButton>
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={1}>Size: {size}px</Typography>
          <Slider value={size} min={10} max={300} step={5} onChange={(_, v) => setSize(v as number)} valueLabelDisplay="auto" />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="input"
            type="color"
            value={color}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
            sx={{
              width: 40, height: 40, p: 0, border: '1px solid', borderColor: 'divider',
              borderRadius: 1, cursor: 'pointer', appearance: 'none', flexShrink: 0,
              '&::-webkit-color-swatch-wrapper': { p: 0 },
              '&::-webkit-color-swatch': { border: 'none', borderRadius: 1 },
            }}
          />
          <TextField size="small" label="Color" value={color} onChange={(e) => setColor(e.target.value)} sx={{ flex: 1 }} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Live Preview</Typography>
        <Paper variant="outlined" sx={{ p: 3, minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
          <Box sx={triangleStyle(direction, size, color)} />
        </Paper>

        <Box sx={{ position: 'relative' }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-all', minHeight: 140 }}>
            {css}
          </Paper>
          <Button variant="contained" size="small" startIcon={<ContentCopyIcon />} onClick={copyCss} sx={{ position: 'absolute', top: 8, right: 8 }}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const CssTriangleGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS Triangle Generator</Typography>
      <Typography variant="body1">
        Generate a pure-CSS triangle in any direction, size, and color using the classic zero-width-border trick
        — no images or SVGs needed. Pick a direction, adjust the size and color, and copy the ready-to-use CSS.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Choose which way the triangle should point (up, down, left, or right), drag the size slider, and pick a
        color. The live preview and the generated CSS update instantly — click Copy to grab the code and paste
        it into your stylesheet.
      </Typography>

      <Typography variant="h2">How the CSS Triangle Trick Works</Typography>
      <Typography variant="body1">
        The trick relies on how browsers render borders on a zero-width, zero-height element: each border edge
        meets the others at a diagonal. Making two opposite borders transparent and giving the third a solid
        color leaves only that diagonal edge visible, which reads as a triangle pointing away from the solid
        side.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Dropdown menu carets and tooltip pointers/arrows.</li>
          <li>Custom bullet points, badges, or decorative accents in a design.</li>
          <li>Speech-bubble tails for comment boxes or chat UIs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I make a triangle that isn't equilateral?</Typography>
      <Typography variant="body1">
        Yes — this generator uses equal border widths for a symmetric triangle, but you can manually edit the
        copied CSS and set different pixel values on the two transparent border sides to skew the shape.
      </Typography>
      <Typography variant="h3">Does this work in all browsers?</Typography>
      <Typography variant="body1">
        Yes — the border-based triangle trick is supported in every modern browser and has been for a very long
        time, since it relies on basic CSS border rendering rather than any newer feature.
      </Typography>
      <Typography variant="h3">Is my data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the preview and CSS are generated entirely client-side in your browser.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-triangle-generator" content={content}>
      <CssTriangleGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssTriangleGenerator;
