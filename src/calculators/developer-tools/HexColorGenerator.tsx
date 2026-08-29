'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function randomHex(): string {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0').toUpperCase();
}

const HexColorGeneratorContent = () => {
  const [palette, setPalette] = useState<string[]>(() => Array.from({ length: 5 }, randomHex));

  const regenerate = () => setPalette(Array.from({ length: 5 }, randomHex));
  const copy = (hex: string) => navigator.clipboard.writeText(hex);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<ShuffleIcon />} onClick={regenerate}>
        Generate New Palette
      </Button>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(5, 1fr)' }, gap: 2 }}>
        {palette.map((hex, i) => (
          <Paper key={`${hex}-${i}`} variant="outlined" sx={{ overflow: 'hidden' }}>
            <Box sx={{ height: 100, bgcolor: hex }} />
            <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
              <Typography variant="body2" fontFamily="monospace">{hex}</Typography>
              <Button size="small" startIcon={<ContentCopyIcon fontSize="small" />} onClick={() => copy(hex)}>
                Copy
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const HexColorGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Hex Color Palette Generator</Typography>
      <Typography variant="body1">
        Instantly generate a palette of 5 random hex colors — a fast way for developers to grab quick
        placeholder colors for mockups, prototypes, or test data without opening a full design tool.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Click "Generate New Palette" to get 5 fresh random hex colors, each shown with a swatch and its own
        copy button — click any code to copy just that one hex value.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One click might generate <code>#3F8EFC</code>, <code>#B14AED</code>, <code>#2ECC71</code>,
        <code>#F5A623</code>, and <code>#1ABC9C</code> — five ready-to-use hex codes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Grabbing quick placeholder colors while building a UI mockup or prototype.</li>
          <li>Generating random hex values for test fixtures or seed data.</li>
          <li>Getting inspiration for a color scheme before refining it in a design tool.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a general random color generator?</Typography>
      <Typography variant="body1">
        This tool is focused purely on the hex format and generates a palette of 5 colors at once, framed as a
        quick dev-tool utility for grabbing placeholder colors rather than a single-color randomizer.
      </Typography>
      <Typography variant="h3">Are the colors truly random?</Typography>
      <Typography variant="body1">
        Yes — each channel is chosen uniformly at random across the full 24-bit RGB color space (0 to
        16,777,215), giving every hex value an equal chance of appearing.
      </Typography>
      <Typography variant="h3">Can I get the same color twice in one palette?</Typography>
      <Typography variant="body1">
        It's possible but extremely unlikely, since each color is picked independently from over 16 million
        possible values.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/hex-color-generator" content={content}>
      <HexColorGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HexColorGenerator;
