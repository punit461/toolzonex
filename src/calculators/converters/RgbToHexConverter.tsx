'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Paper, Slider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NextLink from 'next/link';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RgbToHexContent = () => {
  const [r, setR] = useState(33);
  const [g, setG] = useState(150);
  const [b, setB] = useState(243);
  const [a, setA] = useState(1);
  const [hex, setHex] = useState('#2196F3');

  useEffect(() => {
    const toHex = (c: number) => {
      const hexString = Math.round(c).toString(16).toUpperCase();
      return hexString.length === 1 ? '0' + hexString : hexString;
    };

    let newHex = '#' + toHex(r) + toHex(g) + toHex(b);
    if (a < 1) {
      newHex += toHex(a * 255);
    }
    setHex(newHex);
  }, [r, g, b, a]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* Red */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="error.main" fontWeight="bold">Red (R)</Typography>
            <Typography variant="subtitle2">{r}</Typography>
          </Box>
          <Slider value={r} min={0} max={255} onChange={(e, val) => setR(val as number)} color="error" />
        </Box>

        {/* Green */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="success.main" fontWeight="bold">Green (G)</Typography>
            <Typography variant="subtitle2">{g}</Typography>
          </Box>
          <Slider value={g} min={0} max={255} onChange={(e, val) => setG(val as number)} color="success" />
        </Box>

        {/* Blue */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="primary.main" fontWeight="bold">Blue (B)</Typography>
            <Typography variant="subtitle2">{b}</Typography>
          </Box>
          <Slider value={b} min={0} max={255} onChange={(e, val) => setB(val as number)} color="primary" />
        </Box>

        {/* Alpha */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">Opacity (Alpha)</Typography>
            <Typography variant="subtitle2">{a}</Typography>
          </Box>
          <Slider value={a} min={0} max={1} step={0.01} onChange={(e, val) => setA(val as number)} color="secondary" />
        </Box>

      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Generated HEX Code:</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
              value={hex} 
              InputProps={{ readOnly: true, sx: { fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 'bold' } }} 
              fullWidth 
            />
            <Button variant="contained" size="large" onClick={copyToClipboard}>
              <ContentCopyIcon />
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={1}>Color Preview:</Typography>
          <Paper 
            sx={{ 
              height: 150, 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider',
              background: `linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 10px',
              position: 'relative'
            }} 
          >
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: hex, borderRadius: 2 }} />
          </Paper>
        </Box>
      </Box>

    </Box>
  );
};

const RgbToHexConverter = () => {
  const content = (
    <>
      <Typography variant="h2">What is an RGB to HEX converter?</Typography>
      <Typography variant="body1">
        <strong>RGB</strong> stands for Red, Green, and Blue, representing the intensity of light used to build
        a color on screen. <strong>HEX</strong> is a 6-digit hexadecimal representation of that same color,
        often used in HTML and CSS. This rgb to hex converter mixes your R, G, and B values (0-255 each) and
        instantly generates the matching HEX code — the conversion rgb hex developers reach for whenever a
        design spec, image picker, or JavaScript object gives them RGB numbers but the stylesheet needs a hex
        color code.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Adjust the R, G, and B sliders (or type exact 0-255 values) and the equivalent HEX code appears
        instantly with a copy button. Drag the opacity slider too if you need an 8-character HEX8 code that
        includes alpha transparency.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        RGB (255, 87, 51) converts to the HEX code <code>#FF5733</code>. Each channel is converted to a 2-digit
        hexadecimal value individually — 255 → FF, 87 → 57, 51 → 33 — then joined together.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a color picked from a design tool into CSS-ready HEX format.</li>
          <li>Matching brand colors across RGB and HEX-based design systems.</li>
          <li>Turning an RGB value copied from a canvas, image editor, or eyedropper tool into a hex color code.</li>
          <li>Building a HEX8 code with a specific opacity for CSS backgrounds and overlays.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do web developers use HEX instead of RGB?</Typography>
      <Typography variant="body1">
        HEX codes are more compact and are the standard format for colors in HTML and CSS stylesheets, though
        both represent the same color values.
      </Typography>
      <Typography variant="h3">How do I convert RGB to a HEX color code?</Typography>
      <Typography variant="body1">
        Move the R, G, and B sliders (or type exact 0-255 values) above and the equivalent HEX code is
        generated instantly, with a one-click copy button — no manual conversion rgb hex math required.
      </Typography>
      <Typography variant="h3">I searched for a color code to RGB value — is this the right tool?</Typography>
      <Typography variant="body1">
        If you already have RGB numbers and want the HEX code, yes — this rgb to hex converter does exactly
        that. If you have a hex code and want the RGB value instead, use our{' '}
        <Typography component={NextLink} href="/converters/hex-to-rgb" sx={{ color: 'primary.main', fontWeight: 600 }}>
          HEX to RGB converter
        </Typography>
        , which converts in the opposite direction.
      </Typography>
      <Typography variant="h3">Does this tool convert RGBA (with transparency) to HEX?</Typography>
      <Typography variant="body1">
        Yes — adjust the alpha (opacity) slider along with R, G, and B, and the tool appends the alpha channel
        as an extra two hex digits, producing an 8-character HEX8 code.
      </Typography>
      <Typography variant="h3">What&apos;s the formula behind an RGB to HEX conversion?</Typography>
      <Typography variant="body1">
        Each of the R, G, and B values (0-255) is converted individually to a 2-digit base-16 (hexadecimal)
        number, then the three pairs are joined with a # in front. For example, RGB(255, 87, 51) becomes
        #FF5733.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="RGB to HEX Converter"
      description="Convert RGB and RGBA color codes to HEX format instantly. Free online color conversion tool with interactive sliders."
      url="/converters/rgb-to-hex"
      content={content}
      category="Converters"
    >
      <RgbToHexContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RgbToHexConverter;
