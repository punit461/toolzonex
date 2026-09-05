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

const CssGlassmorphismGeneratorContent = () => {
  const [blur, setBlur] = useState(10);
  const [tintColor, setTintColor] = useState('#ffffff');
  const [tintOpacity, setTintOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.3);
  const [radius, setRadius] = useState(16);
  const [copied, setCopied] = useState(false);

  const [r, g, b] = hexToRgb(tintColor);

  const css = useMemo(() => {
    return `backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
background: rgba(${r}, ${g}, ${b}, ${tintOpacity});
border: 1px solid rgba(255, 255, 255, ${borderOpacity});
border-radius: ${radius}px;`;
  }, [blur, r, g, b, tintOpacity, borderOpacity, radius]);

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
        <Box>
          <Typography gutterBottom>Blur: {blur}px</Typography>
          <Slider value={blur} onChange={(_, v) => setBlur(v as number)} min={0} max={40} />
        </Box>
        <TextField label="Tint Color" type="color" value={tintColor} onChange={(e) => setTintColor(e.target.value)} sx={{ width: { xs: '100%', sm: '50%' } }} />
        <Box>
          <Typography gutterBottom>Tint Opacity: {tintOpacity.toFixed(2)}</Typography>
          <Slider value={tintOpacity} onChange={(_, v) => setTintOpacity(v as number)} min={0} max={1} step={0.01} />
        </Box>
        <Box>
          <Typography gutterBottom>Border Opacity: {borderOpacity.toFixed(2)}</Typography>
          <Slider value={borderOpacity} onChange={(_, v) => setBorderOpacity(v as number)} min={0} max={1} step={0.01} />
        </Box>
        <Box>
          <Typography gutterBottom>Border Radius: {radius}px</Typography>
          <Slider value={radius} onChange={(_, v) => setRadius(v as number)} min={0} max={48} />
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
            background: 'linear-gradient(135deg, #667eea 0%, #f093fb 50%, #4facfe 100%)',
            p: 3,
          }}
        >
          <Box
            sx={{
              width: '80%',
              height: '70%',
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              background: `rgba(${r}, ${g}, ${b}, ${tintOpacity})`,
              border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
              borderRadius: `${radius}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            Frosted Glass
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

const CssGlassmorphismGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CSS Glassmorphism Generator</Typography>
      <Typography variant="body1">
        Glassmorphism is the frosted-glass look popular in modern UI design, made by blurring whatever sits
        behind an element and layering a semi-transparent tint and border over it. Adjust the blur amount, tint
        color and opacity, border opacity, and corner radius using the sliders, watch the live preview update
        over a colorful background, then copy the generated CSS straight into your stylesheet.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A blur of 10px with a white tint at 25% opacity and a 1px semi-transparent white border produces a
        classic frosted-glass card effect that lets background colors show through softly.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Designing frosted-glass navigation bars, cards, or modal overlays.</li>
          <li>Building macOS- or iOS-style translucent UI panels for a web app.</li>
          <li>Prototyping a glassmorphic design system component before writing production CSS by hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the CSS include both backdrop-filter and -webkit-backdrop-filter?</strong> The <code>-webkit-</code> prefixed version is required for Safari to apply the blur effect, so including both ensures the glass effect renders consistently across Chrome, Firefox, and Safari.</li>
          <li><strong>Why isn&apos;t the blur showing on my element?</strong> <code>backdrop-filter</code> only blurs whatever is visually behind the element, so it needs a background (an image, gradient, or other content) positioned underneath it — over a plain solid-color background, the effect can look identical to a simple semi-transparent box.</li>
          <li><strong>Does glassmorphism work well for text-heavy content?</strong> Use it sparingly for text-heavy areas — the translucent background can reduce contrast, so it&apos;s best paired with a subtle background and dark or light text chosen to keep good readability.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-glassmorphism-generator" content={content}>
      <CssGlassmorphismGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssGlassmorphismGenerator;
