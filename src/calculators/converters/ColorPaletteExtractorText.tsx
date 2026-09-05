'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Grid, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HEX_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const RGB_REGEX = /rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*(?:,\s*[\d.]+\s*)?\)/gi;
const HSL_REGEX = /hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(?:,\s*[\d.]+\s*)?\)/gi;

function extractColors(text: string): string[] {
  const found = new Set<string>();
  for (const m of text.match(HEX_REGEX) ?? []) found.add(m);
  for (const m of text.match(RGB_REGEX) ?? []) found.add(m);
  for (const m of text.match(HSL_REGEX) ?? []) found.add(m);
  return Array.from(found);
}

const ColorPaletteExtractorTextContent = () => {
  const [text, setText] = useState(
    '.button { background: #3B82F6; color: rgba(255, 255, 255, 0.9); border: 1px solid hsl(217, 91%, 60%); }\n.alert { color: #f00; }'
  );

  const colors = useMemo(() => extractColors(text), [text]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <TextField
        label="Paste Text or Code"
        placeholder="Paste CSS, a design spec, or any text containing color values..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={12}
        fullWidth
      />

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          {colors.length > 0 ? `${colors.length} Color${colors.length === 1 ? '' : 's'} Found` : 'No Colors Found'}
        </Typography>
        {colors.length === 0 ? (
          <Alert severity="info">Paste text containing hex codes, rgb()/rgba(), or hsl()/hsla() values.</Alert>
        ) : (
          <Grid container spacing={2}>
            {colors.map((c) => (
              <Grid item xs={12} key={c}>
                <Paper variant="outlined" sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: 1, border: '1px solid', borderColor: 'divider', bgcolor: c, flexShrink: 0 }} />
                  <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{c}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

const ColorPaletteExtractorText = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Color Palette Extractor (Text)</Typography>
      <Typography variant="body1">
        Paste any text or code — a CSS file, a design spec document, or notes containing color references — and
        the tool scans it with regular expressions to find every color value pattern: hex codes (like{' '}
        <code>#fff</code> or <code>#3B82F6</code>, with or without alpha), <code>rgb()</code>/<code>rgba()</code>{' '}
        function calls, and <code>hsl()</code>/<code>hsla()</code> function calls. Every unique color found is
        shown as a deduplicated list with a small swatch preview.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a CSS snippet containing <code>background: #3B82F6;</code>,{' '}
        <code>color: rgba(255, 255, 255, 0.9);</code>, and{' '}
        <code>border: 1px solid hsl(217, 91%, 60%);</code> extracts all three color values, each shown with a
        matching swatch.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Pulling every color used in a CSS file into one quick reference list.</li>
          <li>Auditing a design spec document for the full set of colors it defines.</li>
          <li>Spotting inconsistent or near-duplicate color values scattered across a codebase.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Which color formats does it detect?</strong> Hex codes (3, 4, 6, or 8 digits, with the leading #), <code>rgb()</code> and <code>rgba()</code> function calls, and <code>hsl()</code> and <code>hsla()</code> function calls — the most common formats used in CSS and design documents.</li>
          <li><strong>Are duplicate colors removed?</strong> Yes — if the same exact color value appears multiple times in the pasted text, it&apos;s only listed once in the results.</li>
          <li><strong>Does it detect named CSS colors like "red" or "cornflowerblue"?</strong> No — this tool specifically looks for hex, rgb/rgba, and hsl/hsla patterns using regular expressions, not plain color name words. Use the CSS Color Name Finder tool to work with named colors.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/color-palette-extractor-text" content={content}>
      <ColorPaletteExtractorTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ColorPaletteExtractorText;
