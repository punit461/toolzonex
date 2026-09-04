'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) => lNorm - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
}

// Fixed hue offsets from a random base hue -- gives a coherent analogous +
// complementary spread rather than five totally unrelated random colors.
const HUE_OFFSETS = [0, 30, 60, 180, 210];

function generateHarmoniousPalette(): string[] {
  const baseHue = Math.floor(Math.random() * 360);
  return HUE_OFFSETS.map((offset, i) => {
    const hue = (baseHue + offset) % 360;
    const saturation = 55 + Math.floor(Math.random() * 25);
    const lightness = i % 2 === 0 ? 45 + Math.floor(Math.random() * 15) : 60 + Math.floor(Math.random() * 15);
    return hslToHex(hue, saturation, lightness);
  });
}

const RandomColorPaletteGeneratorContent = () => {
  const [colors, setColors] = useState<string[]>(['#3B6FE0', '#3B9EE0', '#3BD0C4', '#E0783B', '#E0A83B']);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = () => setColors(generateHarmoniousPalette());

  const handleCopy = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(5, 1fr)' }, gap: 2, width: '100%' }}>
        {colors.map((color, index) => (
          <Paper key={index} variant="outlined" sx={{ overflow: 'hidden', borderRadius: 2 }}>
            <Box sx={{ height: 100, bgcolor: color }} />
            <Button
              fullWidth
              onClick={() => handleCopy(color, index)}
              startIcon={copiedIndex === index ? undefined : <ContentCopyIcon fontSize="small" />}
              sx={{ py: 1.5, textTransform: 'none', fontFamily: 'monospace', fontWeight: 700 }}
            >
              {copiedIndex === index ? 'Copied!' : color}
            </Button>
          </Paper>
        ))}
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<CasinoIcon />}
        onClick={handleGenerate}
        sx={{ px: 6, py: 1.5, fontSize: '1.1rem', borderRadius: 8 }}
      >
        Generate Palette
      </Button>
    </Box>
  );
};

const RandomColorPaletteGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Color Palette Generator Works</Typography>
      <Typography variant="body1">
        Click generate and this tool picks a random base hue, then builds a 5-color palette from fixed hue
        offsets around it — an analogous pair close to the base hue, a complementary pair on the opposite side
        of the color wheel, plus the base color itself — with randomized saturation and lightness for
        variation. Building the palette from related hues (rather than five completely independent random
        colors) keeps every generated palette visually coherent.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking generate might produce a palette like <code>#3B6FE0</code>, <code>#3B9EE0</code>,
        <code>#3BD0C4</code>, <code>#E0783B</code>, <code>#E0A83B</code> — five colors that read as a set
        rather than five unrelated hex codes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a coherent starting color scheme for a website or app design.</li>
          <li>Quickly grabbing a harmonious set of hex codes for a mockup or illustration.</li>
          <li>Getting inspiration for a brand or product color palette.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the site&apos;s other Color Palette Generator?</Typography>
      <Typography variant="body1">
        This tool builds each palette from hue-rotation math around a single random base color, so the 5
        colors are always visually related (analogous and complementary hues). Our other Color Palette
        Generator produces fully independent random hex colors and includes additional browsing/library
        features — use this one when you specifically want a quick, coherent, ready-to-use palette with one
        click.
      </Typography>
      <Typography variant="h3">Can I lock a color and regenerate the rest?</Typography>
      <Typography variant="body1">
        This tool generates a fresh 5-color palette each time as a simple, single-click tool — use the copy
        button to save any colors you like before generating a new set.
      </Typography>
      <Typography variant="h3">What is a complementary color?</Typography>
      <Typography variant="body1">
        Complementary colors sit opposite each other on the color wheel (180° apart), and pairing them
        typically creates strong visual contrast — which is why this generator includes a complementary pair
        alongside colors closer to the base hue for balance.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-color-palette-generator" content={content}>
      <RandomColorPaletteGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomColorPaletteGenerator;
