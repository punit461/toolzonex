'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const HexToRgbContent = () => {
  const [hex, setHex] = useState('#2196f3');
  const [rgb, setRgb] = useState('rgb(33, 150, 243)');
  const [rgba, setRgba] = useState('rgba(33, 150, 243, 1)');
  const [error, setError] = useState('');

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('#')) {
      val = '#' + val;
    }
    setHex(val);

    // Validate hex
    const hexRegex = /^#?([a-f\d]{3}|[a-f\d]{6}|[a-f\d]{8})$/i;
    if (hexRegex.test(val)) {
      setError('');
      let cleanHex = val.replace('#', '');
      
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      if (cleanHex.length === 3 || cleanHex.length === 4) {
        cleanHex = cleanHex.split('').map(char => char + char).join('');
      }

      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      
      let a = 1;
      if (cleanHex.length === 8) {
        a = Math.round((parseInt(cleanHex.substring(6, 8), 16) / 255) * 100) / 100;
      }

      setRgb(`rgb(${r}, ${g}, ${b})`);
      setRgba(`rgba(${r}, ${g}, ${b}, ${a})`);
    } else {
      setError('Invalid HEX color format.');
      setRgb('');
      setRgba('');
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="HEX Color Code"
          value={hex}
          onChange={handleHexChange}
          placeholder="#000000"
          error={!!error}
          helperText={error || 'Supports 3, 6, and 8 character HEX codes'}
          fullWidth
          InputProps={{ sx: { fontFamily: 'monospace', fontSize: '1.2rem' } }}
        />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={0.5}>RGB Format</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField value={rgb} InputProps={{ readOnly: true }} fullWidth size="small" />
            <Button variant="outlined" onClick={() => copyToClipboard(rgb)} sx={{ minWidth: 100 }}>
              <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} /> Copy
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" mb={0.5}>RGBA Format (with opacity)</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField value={rgba} InputProps={{ readOnly: true }} fullWidth size="small" />
            <Button variant="outlined" onClick={() => copyToClipboard(rgba)} sx={{ minWidth: 100 }}>
              <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} /> Copy
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Preview Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Color Preview:</Typography>
        <Paper 
          sx={{ 
            height: 200, 
            borderRadius: 2, 
            border: '1px solid', 
            borderColor: 'divider',
            bgcolor: !error ? hex : '#f5f5f5',
            transition: 'background-color 0.3s ease'
          }} 
        />
        <Typography textAlign="center" variant="body2" color="text.secondary">
          {error ? 'Fix errors to see preview' : 'Color output preview'}
        </Typography>
      </Box>

    </Box>
  );
};

const HexToRgbConverter = () => {
  const content = (
    <>
      <Typography variant="h2">HEX vs RGB Color Models</Typography>
      <Typography variant="body1">
        **HEX** is a 6-digit hexadecimal representation of a color, often used in HTML and CSS. **RGB** stands for Red, Green, and Blue, representing the intensity of light used to create the color on screens. This tool instantly converts HEX color codes into RGB or RGBA (including alpha transparency).
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type or paste a HEX color code into the input field and the equivalent RGB (or RGBA) value appears
        instantly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        <code>#1A56DB</code> converts to <code>rgb(26, 86, 219)</code> — the same blue, expressed in a
        different format.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a design tool&apos;s hex color into RGB for CSS that needs an alpha channel.</li>
          <li>Translating colors between design specs and code.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why would I use RGB instead of HEX?</Typography>
      <Typography variant="body1">
        RGB(A) lets you specify transparency directly, which plain HEX codes can&apos;t do without an extra
        alpha value (HEX8).
      </Typography>
      <Typography variant="h3">How do I convert a HEX color code to RGB?</Typography>
      <Typography variant="body1">
        Type or paste the HEX code (with or without the leading #) into the field above — the RGB and RGBA
        values are calculated and shown instantly, with one-click copy buttons for each.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="HEX to RGB Converter"
      description="Convert HEX color codes to RGB or RGBA formats instantly. Free online color conversion tool for web developers."
      url="/converters/hex-to-rgb"
      content={content}
      category="Converters"
    >
      <HexToRgbContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HexToRgbConverter;
