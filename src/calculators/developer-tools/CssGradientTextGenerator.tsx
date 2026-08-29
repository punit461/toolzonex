'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, Slider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CssGradientTextGeneratorContent = () => {
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#ec4899');
  const [angle, setAngle] = useState(90);
  const [text, setText] = useState('Gradient Text');

  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  const css = `background: ${gradient};\n-webkit-background-clip: text;\nbackground-clip: text;\n-webkit-text-fill-color: transparent;\ncolor: transparent;`;

  const copy = () => navigator.clipboard.writeText(css);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} style={{ width: 36, height: 36, border: 'none', cursor: 'pointer' }} />
            <Typography variant="body2" fontFamily="monospace">{color1}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} style={{ width: 36, height: 36, border: 'none', cursor: 'pointer' }} />
            <Typography variant="body2" fontFamily="monospace">{color2}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle2" mb={1}>Angle: {angle}°</Typography>
          <Slider value={angle} min={0} max={360} onChange={(_, v) => setAngle(v as number)} />
        </Box>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Preview text"
          style={{ padding: '10px 12px', fontSize: '1rem', border: '1px solid #ccc', borderRadius: 4 }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'background.paper' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              backgroundImage: gradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            {text || 'Gradient Text'}
          </Typography>
        </Paper>

        <Box sx={{ position: 'relative' }}>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
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

const CssGradientTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free CSS Gradient Text Generator</Typography>
      <Typography variant="body1">
        Pick two colors and an angle to create a gradient text effect — the classic technique of clipping a
        CSS gradient background to text using <code>background-clip: text</code>. Preview it live and copy the
        finished CSS.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Choose your two gradient colors and adjust the angle slider while watching the live preview update.
        Copy the generated CSS block and apply it to any text element.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A purple-to-pink gradient at 90° produces a heading that transitions smoothly from left to right,
        commonly seen on landing page hero titles.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Styling a hero heading or logotype with an eye-catching gradient fill.</li>
          <li>Matching a gradient text effect to a brand's color scheme.</li>
          <li>Adding visual flair to call-to-action headings without images.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this work in all browsers?</Typography>
      <Typography variant="body1">
        <code>background-clip: text</code> is well supported in modern browsers, though it still commonly needs
        the <code>-webkit-</code> prefix (included in the generated CSS) for full compatibility, especially in
        Safari.
      </Typography>
      <Typography variant="h3">Why is my text invisible instead of gradient-filled?</Typography>
      <Typography variant="body1">
        Make sure <code>color: transparent</code> (or the <code>-webkit-text-fill-color: transparent</code>
        equivalent) is applied alongside the background-clip properties — without it, the solid text color
        paints over the gradient.
      </Typography>
      <Typography variant="h3">Can I use more than two colors?</Typography>
      <Typography variant="body1">
        Yes — this generator uses two stops for simplicity, but you can manually extend the copied
        <code>linear-gradient(...)</code> value with additional comma-separated color stops.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/css-gradient-text-generator" content={content}>
      <CssGradientTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssGradientTextGenerator;
