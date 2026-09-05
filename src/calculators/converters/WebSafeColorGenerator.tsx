'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Grid, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LEVELS = ['00', '33', '66', '99', 'CC', 'FF'];

const PALETTE: string[] = (() => {
  const colors: string[] = [];
  for (const r of LEVELS) {
    for (const g of LEVELS) {
      for (const b of LEVELS) {
        colors.push(`#${r}${g}${b}`);
      }
    }
  }
  return colors;
})();

const WebSafeColorGeneratorContent = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelect = async (hex: string) => {
    setSelected(hex);
    setCopied(false);
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
    } catch {}
  };

  return (
    <Box>
      {selected && (
        <Alert severity={copied ? 'success' : 'info'} sx={{ mb: 2 }}>
          Selected <strong>{selected}</strong>{copied ? ' — copied to clipboard!' : ''}
        </Alert>
      )}
      <Grid container spacing={0.5}>
        {PALETTE.map((hex) => (
          <Grid item xs={1} key={hex} sx={{ width: '16.66%', flexBasis: '16.66%', maxWidth: '16.66%' }}>
            <Paper
              onClick={() => handleSelect(hex)}
              sx={{
                aspectRatio: '1 / 1',
                bgcolor: hex,
                cursor: 'pointer',
                border: selected === hex ? '3px solid' : '1px solid',
                borderColor: selected === hex ? 'primary.main' : 'divider',
                borderRadius: 0.5,
              }}
              title={hex}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const WebSafeColorGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Web Safe Color Generator</Typography>
      <Typography variant="body1">
        This tool displays the classic 216-color &quot;web-safe&quot; palette — every combination where each of
        the Red, Green, and Blue channels is restricted to one of six values: <code>00</code>, <code>33</code>,{' '}
        <code>66</code>, <code>99</code>, <code>CC</code>, or <code>FF</code>. Click any swatch to see its hex
        code and automatically copy it to your clipboard.
      </Typography>
      <Typography variant="body1">
        The web-safe palette was originally designed to render identically on the older 256-color displays common
        in the 1990s. On modern displays, which render millions of colors accurately, this concept is largely
        historical — it&apos;s a mostly legacy idea today, though it&apos;s still occasionally referenced in
        retro-design contexts or for deliberately nostalgic web aesthetics.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking the swatch at the palette&apos;s midpoint region shows a hex code like <code>#669999</code> — a
        muted teal made from the &quot;66&quot; green level and &quot;99&quot; blue level — and copies it to your
        clipboard automatically.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Recreating a deliberately retro, late-1990s web aesthetic.</li>
          <li>Learning how the historical web-safe color palette was constructed.</li>
          <li>Quickly grabbing a hex code from a limited, evenly spaced palette for a simple design.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is the web-safe palette still relevant today?</strong> Not really for practical design purposes — it was created to solve a display limitation from older 256-color monitors that essentially no longer exist. Modern screens display millions of colors accurately, so this palette is now mostly a historical curiosity, though it does still show up in retro-styled design work.</li>
          <li><strong>Why exactly 216 colors?</strong> Six possible values per channel (00, 33, 66, 99, CC, FF) across three channels gives 6 × 6 × 6 = 216 combinations, which is why the web-safe palette has exactly that many colors.</li>
          <li><strong>Does clicking a swatch copy the color automatically?</strong> Yes — clicking any swatch both displays its hex code and copies it straight to your clipboard, ready to paste elsewhere.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/web-safe-color-generator" content={content}>
      <WebSafeColorGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WebSafeColorGenerator;
