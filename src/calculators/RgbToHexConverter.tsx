'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField, Paper, Slider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

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
      <Typography variant="h2">RGB vs HEX Color Models</Typography>
      <Typography variant="body1">
        **RGB** stands for Red, Green, and Blue, representing the intensity of light. **HEX** is a 6-digit hexadecimal representation of a color, often used in HTML and CSS. Use the sliders above to mix your R, G, and B values and instantly get the equivalent HEX code.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="RGB to HEX Converter"
      description="Convert RGB and RGBA color codes to HEX format instantly. Free online color conversion tool with interactive sliders."
      url="/tools/rgb-to-hex"
      content={content}
      category="Tools"
    >
      <RgbToHexContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RgbToHexConverter;
