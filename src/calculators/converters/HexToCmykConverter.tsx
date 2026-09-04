'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

function rgbToCmyk(r: number, g: number, b: number) {
  const rp = r / 255;
  const gp = g / 255;
  const bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);

  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

  const c = (1 - rp - k) / (1 - k);
  const m = (1 - gp - k) / (1 - k);
  const y = (1 - bp - k) / (1 - k);

  return { c: c * 100, m: m * 100, y: y * 100, k: k * 100 };
}

const HexToCmykConverterContent = () => {
  const [hex, setHex] = useState('#3B82F6');

  const result = useMemo(() => {
    const rgb = parseHex(hex);
    if (!rgb) return null;
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
    return { rgb, cmyk };
  }, [hex]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Hex Color Code"
          fullWidth
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          onFocus={(e) => e.target.select()}
          placeholder="#3B82F6"
        />
        <Paper
          variant="outlined"
          sx={{
            height: 100,
            borderRadius: 2,
            bgcolor: result ? hex : 'action.disabledBackground',
          }}
        />
        {!result && hex.trim() !== '' && (
          <Typography variant="body2" color="error">Enter a valid 3 or 6-character hex code.</Typography>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>CMYK Result</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          {(['c', 'm', 'y', 'k'] as const).map((key) => (
            <Paper key={key} sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">{key.toUpperCase()}</Typography>
              <Typography variant="h6" fontWeight={700}>
                {result ? `${result.cmyk[key].toFixed(0)}%` : '—'}
              </Typography>
            </Paper>
          ))}
        </Box>
        {result && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            RGB: {result.rgb.r}, {result.rgb.g}, {result.rgb.b}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const HexToCmykConverter = () => {
  const content = (
    <>
      <Typography variant="h2">How the Hex to CMYK Converter Works</Typography>
      <Typography variant="body1">
        Enter a 3 or 6-character hex color code. The converter first decodes it into RGB (red, green, blue)
        values from 0-255, then applies the standard RGB-to-CMYK formula to get cyan, magenta, yellow, and key
        (black) percentages, since there&apos;s no direct hex-to-CMYK formula — hex always represents RGB
        first.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        K = 1 − max(R&apos;, G&apos;, B&apos;)<br />
        C = (1 − R&apos; − K) ÷ (1 − K), M = (1 − G&apos; − K) ÷ (1 − K), Y = (1 − B&apos; − K) ÷ (1 − K)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The hex code #3B82F6 decodes to RGB(59, 130, 246), which converts to approximately C 76%, M 47%, Y 0%,
        K 4%.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a web/screen color (hex) to a print-ready CMYK value.</li>
          <li>Checking how a brand&apos;s hex color code will translate to printed materials.</li>
          <li>Preparing design assets for professional printing software.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why isn&apos;t there a direct hex-to-CMYK formula?</Typography>
      <Typography variant="body1">
        Hex codes are just a compact way of writing RGB values in hexadecimal — they don&apos;t carry any
        separate CMYK information. Converting to CMYK always goes through RGB first, using the RGB-to-CMYK
        formula shown above.
      </Typography>
      <Typography variant="h3">Will the printed color exactly match what I see on screen?</Typography>
      <Typography variant="body1">
        Not necessarily — RGB (screen, additive light) and CMYK (print, subtractive ink) are different color
        models covering different color ranges (gamuts), so the conversion is an approximation. Actual printed
        results also vary by printer, paper, and ink profile, so proofing a physical sample is recommended for
        color-critical print work.
      </Typography>
      <Typography variant="h3">Does this support 3-character shorthand hex codes?</Typography>
      <Typography variant="body1">
        Yes — shorthand hex codes like #03F are automatically expanded to their full 6-character form (like
        #0033FF) before converting, so both formats work.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/hex-to-cmyk-converter" content={content}>
      <HexToCmykConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HexToCmykConverter;
