'use client';

import { useState } from 'react';
import { Box, Typography, Grid, Paper, Snackbar } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SYMBOLS: { char: string; name: string }[] = [
  { char: '✓', name: 'check mark' },
  { char: '✔', name: 'heavy check mark' },
  { char: '✅', name: 'white heavy check mark' },
  { char: '🗹', name: 'ballot box with bold check' },
  { char: '☑', name: 'ballot box with check' },
  { char: '☐', name: 'ballot box' },
  { char: '✗', name: 'ballot X' },
  { char: '✘', name: 'heavy ballot X' },
  { char: '☒', name: 'ballot box with X' },
  { char: '❌', name: 'cross mark' },
  { char: '❎', name: 'negative squared cross mark' },
  { char: '⛔', name: 'no entry' },
];

const CheckmarkSymbolGeneratorContent = () => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [copiedSymbol, setCopiedSymbol] = useState('');

  const copySymbol = async (char: string) => {
    try {
      await navigator.clipboard.writeText(char);
      setCopiedSymbol(char);
      setSnackOpen(true);
    } catch {}
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Grid container spacing={1.5}>
        {SYMBOLS.map((s) => (
          <Grid item xs={3} sm={2} md={1.5} key={s.char + s.name}>
            <Paper
              onClick={() => copySymbol(s.char)}
              sx={{ p: 1.5, textAlign: 'center', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
              variant="outlined"
              title={s.name}
            >
              <Typography sx={{ fontSize: '1.6rem' }}>{s.char}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackOpen}
        autoHideDuration={1500}
        onClose={() => setSnackOpen(false)}
        message={`Copied ${copiedSymbol} to clipboard`}
      />
    </Box>
  );
};

const CheckmarkSymbolGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Checkmark Symbol Generator</Typography>
      <Typography variant="body1">
        Browse a curated set of checkmark, cross, and checkbox-related symbols — including simple check marks,
        heavy and colored variants, empty and filled checkboxes, and their X-mark counterparts. Click any symbol
        to copy it straight to your clipboard, ready to paste wherever you need it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking ✅ copies the white heavy check mark emoji directly to your clipboard, ready to paste into a
        task list, spreadsheet cell, or chat message to mark something as done.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Marking completed items in a plain-text to-do list or checklist document.</li>
          <li>Adding a visual check or cross to a spreadsheet cell without inserting an image.</li>
          <li>Indicating pass/fail or yes/no status in a chat message or forum post.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Symbol Picker?</strong> The Symbol Picker's categories cover Legal, Math, Punctuation, Arrows, Greek letters, and Fractions — none of which include checkmark or cross symbols. This tool fills that specific gap with a dedicated collection of check, X, and checkbox symbols.</li>
          <li><strong>Why do some symbols look like emoji and others don&apos;t?</strong> Symbols like ✓ and ✗ are plain typographic characters that render in a single color matching your text, while ones like ✅ and ❌ are emoji-style characters that most platforms render in full color.</li>
          <li><strong>Does clicking a symbol copy it automatically?</strong> Yes — clicking any symbol copies it directly to your clipboard and shows a brief confirmation message.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/checkmark-symbol-generator" content={content}>
      <CheckmarkSymbolGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CheckmarkSymbolGenerator;
