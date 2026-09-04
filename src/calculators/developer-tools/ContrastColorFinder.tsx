'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function normalizeHex(hex: string): string | null {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return `#${h.toLowerCase()}`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const ContrastColorFinderContent = () => {
  const [bgInput, setBgInput] = useState('#1976d2');

  const bgHex = normalizeHex(bgInput);

  const results = useMemo(() => {
    if (!bgHex) return null;
    const blackRatio = contrastRatio(bgHex, '#000000');
    const whiteRatio = contrastRatio(bgHex, '#ffffff');
    return { blackRatio, whiteRatio, winner: whiteRatio >= blackRatio ? 'white' : 'black' as 'white' | 'black' };
  }, [bgHex]);

  const badge = (ratio: number) => {
    const aa = ratio >= 4.5;
    const aaa = ratio >= 7;
    return (
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <Chip size="small" label={`AA (4.5:1) ${aa ? 'Pass' : 'Fail'}`} color={aa ? 'success' : 'error'} />
        <Chip size="small" label={`AAA (7:1) ${aaa ? 'Pass' : 'Fail'}`} color={aaa ? 'success' : 'error'} />
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Box
          component="input"
          type="color"
          value={bgHex || '#1976d2'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBgInput(e.target.value)}
          sx={{
            width: 48, height: 48, p: 0, border: '1px solid', borderColor: 'divider',
            borderRadius: 1, cursor: 'pointer', appearance: 'none', flexShrink: 0,
            '&::-webkit-color-swatch-wrapper': { p: 0 },
            '&::-webkit-color-swatch': { border: 'none', borderRadius: 1 },
          }}
        />
        <TextField label="Background Color (hex)" value={bgInput} onChange={(e) => setBgInput(e.target.value)} sx={{ minWidth: 220 }} />
        {!bgHex && <Typography color="error" variant="body2">Enter a valid hex color, e.g. #1976d2</Typography>}
      </Box>

      {results && bgHex && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 4, textAlign: 'center', bgcolor: bgHex, color: '#000000',
              border: results.winner === 'black' ? '3px solid' : '1px solid',
              borderColor: results.winner === 'black' ? 'success.main' : 'divider',
            }}
          >
            <Typography variant="h4" fontWeight={700}>Black Text</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>The quick brown fox jumps</Typography>
            <Typography variant="h5" fontWeight={800} sx={{ mt: 2 }}>{results.blackRatio.toFixed(2)}:1</Typography>
            {badge(results.blackRatio)}
            {results.winner === 'black' && <Chip label="Recommended" color="success" sx={{ mt: 2 }} />}
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 4, textAlign: 'center', bgcolor: bgHex, color: '#ffffff',
              border: results.winner === 'white' ? '3px solid' : '1px solid',
              borderColor: results.winner === 'white' ? 'success.main' : 'divider',
            }}
          >
            <Typography variant="h4" fontWeight={700}>White Text</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>The quick brown fox jumps</Typography>
            <Typography variant="h5" fontWeight={800} sx={{ mt: 2 }}>{results.whiteRatio.toFixed(2)}:1</Typography>
            {badge(results.whiteRatio)}
            {results.winner === 'white' && <Chip label="Recommended" color="success" sx={{ mt: 2 }} />}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const ContrastColorFinder = () => {
  const content = (
    <>
      <Typography variant="h2">Free Contrast Color Finder — Black or White Text?</Typography>
      <Typography variant="body1">
        Enter any background color and this tool instantly tells you whether black or white text reads better
        against it, using the WCAG relative luminance and contrast ratio formulas — with the actual contrast
        ratio numbers and pass/fail badges against the WCAG AA and AAA accessibility thresholds.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type a hex color code (or use the color picker) for your background. Both black and white text options
        render live against that background along with their exact contrast ratio and whether each passes WCAG
        AA (4.5:1 for normal text) and AAA (7:1) — the better-contrasting option is marked "Recommended".
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A medium blue background like <code>#1976d2</code> gives white text a contrast ratio around 4.6:1
        (passing WCAG AA) versus black text at around 4.5:1 — close, but white is the safer, higher-contrast
        choice for that particular shade.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choosing readable text color for a button, banner, or badge with a custom background.</li>
          <li>Checking a brand color against WCAG accessibility guidelines before shipping a design.</li>
          <li>Deciding between light and dark text for a dynamically generated background color.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the WCAG contrast ratio formula?</Typography>
      <Typography variant="body1">
        WCAG defines contrast ratio as (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the
        lighter color and L2 is the relative luminance of the darker color. Relative luminance is calculated
        from the linearized (gamma-corrected) sRGB red, green, and blue channels, weighted 0.2126, 0.7152, and
        0.0722 respectively, reflecting how the human eye perceives each color's brightness.
      </Typography>
      <Typography variant="h3">What's the difference between AA and AAA?</Typography>
      <Typography variant="body1">
        WCAG AA is the standard accessibility bar and requires a contrast ratio of at least 4.5:1 for normal
        body text. WCAG AAA is the stricter, enhanced level and requires at least 7:1. Large text (roughly 18pt
        or 14pt bold and above) has lower thresholds under both levels.
      </Typography>
      <Typography variant="h3">Is my color data uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — every calculation happens entirely client-side in your browser. Nothing you enter is sent to a
        server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/contrast-color-finder" content={content}>
      <ContrastColorFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ContrastColorFinder;
