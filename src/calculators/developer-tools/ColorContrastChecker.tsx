'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Button,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const normalizeHex = (value: string): string => {
  const cleaned = value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
  return cleaned.padEnd(6, '0').toUpperCase();
};

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace(/^#/, '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return [isNaN(r) ? 0 : r, isNaN(g) ? 0 : g, isNaN(b) ? 0 : b];
};

const linearize = (c: number): number => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

const relativeLuminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
};

const contrastRatio = (hex1: string, hex2: string): number => {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

const ColorContrastChecker = () => {
  const [fgInput, setFgInput] = useState<string>('#000000');
  const [bgInput, setBgInput] = useState<string>('#FFFFFF');

  const fgNormal = normalizeHex(fgInput);
  const bgNormal = normalizeHex(bgInput);

  const { ratio, aaNormal, aaLarge, aaaNormal, aaaLarge, textColor } = useMemo(() => {
    const ratioValue = contrastRatio(fgNormal, bgNormal);
    const rounded = Math.round(ratioValue * 100) / 100;
    const aaN = ratioValue >= 4.5;
    const aaL = ratioValue >= 3;
    const aaaN = ratioValue >= 7;
    const aaaL = ratioValue >= 4.5;

    const fgLum = relativeLuminance(fgNormal);
    const bgLum = relativeLuminance(bgNormal);
    const tc = fgLum >= bgLum ? fgNormal : bgNormal;

    return {
      ratio: rounded,
      aaNormal: aaN,
      aaLarge: aaL,
      aaaNormal: aaaN,
      aaaLarge: aaaL,
      textColor: `#${tc}`,
    };
  }, [fgNormal, bgNormal]);

  return (
    <CalculatorShell url="/developer-tools/color-contrast-checker" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Foreground Color</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                variant="outlined"
                value={fgInput}
                onChange={(e) => setFgInput(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <input
                          type="color"
                          value={fgNormal}
                          onChange={(e) => setFgInput(e.target.value)}
                          style={{ width: 32, height: 32, border: 'none', padding: 0, cursor: 'pointer' }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Background Color</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                variant="outlined"
                value={bgInput}
                onChange={(e) => setBgInput(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <input
                          type="color"
                          value={bgNormal}
                          onChange={(e) => setBgInput(e.target.value)}
                          style={{ width: 32, height: 32, border: 'none', padding: 0, cursor: 'pointer' }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setFgInput('#000000');
              setBgInput('#FFFFFF');
            }}
          >
            Reset
          </Button>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Contrast Ratio
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '4rem', color: 'primary.main', my: 2 }}>
              {ratio.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Ratios: 1 : 1 is identical, 21 : 1 is the maximum (black on white).
            </Typography>

            <Box
              sx={{
                mt: 3,
                p: 3,
                borderRadius: 2,
                bgcolor: `#${bgNormal}`,
                color: `#${fgNormal}`,
                border: '1px solid #E5E5E5',
              }}
            >
              <Typography variant="h6">Sample Text (Normal)</Typography>
              <Typography variant="body1">The quick brown fox jumps over the lazy dog.</Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>Sample Text (Large)</Typography>
              <Typography variant="h5">The quick brown fox jumps over the lazy dog.</Typography>
            </Box>

            <Box sx={{ mt: 3, display: 'grid', gap: 1 }}>
              {[
                { label: 'WCAG AA — Normal text', pass: aaNormal, threshold: '≥ 4.5:1' },
                { label: 'WCAG AA — Large text', pass: aaLarge, threshold: '≥ 3:1' },
                { label: 'WCAG AAA — Normal text', pass: aaaNormal, threshold: '≥ 7:1' },
                { label: 'WCAG AAA — Large text', pass: aaaLarge, threshold: '≥ 4.5:1' },
              ].map((row) => (
                <Box
                  key={row.label}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    border: '1px solid #E5E5E5',
                  }}
                >
                  <Typography variant="body1">{row.label}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">{row.threshold}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: row.pass ? '#16a34a' : '#dc2626',
                        textTransform: 'uppercase',
                      }}
                    >
                      {row.pass ? 'Pass' : 'Fail'}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

const content = (
  <>
    <Typography variant="h2">How Is Contrast Ratio Calculated?</Typography>
    <Typography variant="body1">
      Contrast ratio measures the relative difference in luminance between two colors. First, each RGB channel
      is linearized, then relative luminance is computed as
      L = 0.2126·R + 0.7152·G + 0.0722·B. The ratio is (L₁ + 0.05) ÷ (L₂ + 0.05), where L₁ is the lighter color.
    </Typography>

    <Typography variant="h2">Example</Typography>
    <Typography variant="body1">
      Black (#000000) on white (#FFFFFF) has the maximum contrast ratio of 21.0:1 and passes every WCAG level.
      Many decorative gray-on-white pairings fall below the 4.5:1 AA threshold for normal text and should be
      avoided for body copy.
    </Typography>

    <Typography variant="h2">Common Use Cases</Typography>
    <Box sx={{ typography: 'body1' }}>
      <ul>
        <li>Checking that body text meets WCAG AA (4.5:1) or AAA (7:1) guidelines.</li>
        <li>Choosing accessible button, link, and placeholder colors.</li>
        <li>Auditing existing designs for color-blind-friendly, readable contrast.</li>
      </ul>
    </Box>

    <Typography variant="h2">FAQs</Typography>
    <Typography variant="h3">What is WCAG AA vs AAA?</Typography>
    <Typography variant="body1">
      WCAG AA requires a 4.5:1 ratio for normal text and 3:1 for large text. WCAG AAA is stricter, requiring 7:1
      for normal text and 4.5:1 for large text.
    </Typography>
    <Typography variant="h3">What counts as "large text"?</Typography>
    <Typography variant="body1">
      Large text is roughly 18pt (24px) or larger at regular weight, or 14pt (≈18.66px) or larger at bold weight.
    </Typography>
    <Typography variant="h3">Does contrast check color blindness?</Typography>
    <Typography variant="body1">
      Contrast ratio addresses luminance differences, not hue perception. For full accessibility, also verify
      your palette is distinguishable for color-blind users and that color isn&apos;t the only signal.
    </Typography>
  </>
);

export default ColorContrastChecker;
