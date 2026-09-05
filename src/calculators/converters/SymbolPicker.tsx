'use client';

import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Paper, Snackbar } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CATEGORIES: { label: string; symbols: { char: string; name: string }[] }[] = [
  {
    label: 'Legal',
    symbols: [
      { char: '©', name: 'copyright' }, { char: '®', name: 'registered' }, { char: '™', name: 'trademark' },
      { char: '℠', name: 'service mark' }, { char: '§', name: 'section' }, { char: '¶', name: 'pilcrow' },
    ],
  },
  {
    label: 'Math',
    symbols: [
      { char: '±', name: 'plus-minus' }, { char: '×', name: 'multiplication' }, { char: '÷', name: 'division' },
      { char: '≈', name: 'approximately equal' }, { char: '≠', name: 'not equal' }, { char: '≤', name: 'less than or equal' },
      { char: '≥', name: 'greater than or equal' }, { char: '√', name: 'square root' }, { char: '∞', name: 'infinity' },
      { char: '°', name: 'degree' }, { char: '‰', name: 'per mille' }, { char: '∑', name: 'summation' },
      { char: 'π', name: 'pi' }, { char: '∆', name: 'delta' }, { char: '∫', name: 'integral' },
    ],
  },
  {
    label: 'Punctuation',
    symbols: [
      { char: '•', name: 'bullet' }, { char: '†', name: 'dagger' }, { char: '‡', name: 'double dagger' },
      { char: '…', name: 'ellipsis' }, { char: '“', name: 'left double quote' }, { char: '”', name: 'right double quote' },
      { char: '‘', name: 'left single quote' }, { char: '’', name: 'right single quote' }, { char: '–', name: 'en dash' },
      { char: '—', name: 'em dash' }, { char: '¿', name: 'inverted question mark' }, { char: '¡', name: 'inverted exclamation mark' },
    ],
  },
  {
    label: 'Arrows',
    symbols: [
      { char: '←', name: 'left arrow' }, { char: '→', name: 'right arrow' }, { char: '↑', name: 'up arrow' },
      { char: '↓', name: 'down arrow' }, { char: '↔', name: 'left-right arrow' }, { char: '↕', name: 'up-down arrow' },
      { char: '⇒', name: 'right double arrow' }, { char: '⇐', name: 'left double arrow' }, { char: '⇔', name: 'left-right double arrow' },
      { char: '↩', name: 'return arrow' }, { char: '↪', name: 'forward arrow' }, { char: '⤴', name: 'arrow curving up' },
    ],
  },
  {
    label: 'Greek',
    symbols: [
      { char: 'α', name: 'alpha' }, { char: 'β', name: 'beta' }, { char: 'γ', name: 'gamma' },
      { char: 'δ', name: 'delta' }, { char: 'ε', name: 'epsilon' }, { char: 'ζ', name: 'zeta' },
      { char: 'η', name: 'eta' }, { char: 'θ', name: 'theta' }, { char: 'λ', name: 'lambda' },
      { char: 'μ', name: 'mu' }, { char: 'π', name: 'pi (lowercase)' }, { char: 'σ', name: 'sigma' },
      { char: 'φ', name: 'phi' }, { char: 'ω', name: 'omega' }, { char: 'Α', name: 'Alpha (upper)' },
      { char: 'Β', name: 'Beta (upper)' }, { char: 'Γ', name: 'Gamma (upper)' }, { char: 'Δ', name: 'Delta (upper)' },
      { char: 'Σ', name: 'Sigma (upper)' }, { char: 'Ω', name: 'Omega (upper)' },
    ],
  },
  {
    label: 'Fractions',
    symbols: [
      { char: '½', name: 'one half' }, { char: '¼', name: 'one quarter' }, { char: '¾', name: 'three quarters' },
      { char: '⅓', name: 'one third' }, { char: '⅔', name: 'two thirds' }, { char: '⅛', name: 'one eighth' },
      { char: '⅜', name: 'three eighths' }, { char: '⅝', name: 'five eighths' }, { char: '⅞', name: 'seven eighths' },
    ],
  },
  {
    label: 'Currency (Less Common)',
    symbols: [
      { char: '€', name: 'euro' }, { char: '£', name: 'pound' }, { char: '¥', name: 'yen' },
      { char: '₹', name: 'rupee' }, { char: '₩', name: 'won' }, { char: '₽', name: 'ruble' },
      { char: '₺', name: 'lira' }, { char: '¢', name: 'cent' }, { char: '₪', name: 'shekel' },
    ],
  },
];

const SymbolPickerContent = () => {
  const [tab, setTab] = useState(0);
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
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {CATEGORIES.map((c) => (
          <Tab key={c.label} label={c.label} />
        ))}
      </Tabs>

      <Grid container spacing={1.5}>
        {CATEGORIES[tab].symbols.map((s) => (
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

const SymbolPicker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Symbol Picker</Typography>
      <Typography variant="body1">
        Browse through category tabs — Legal, Math, Punctuation, Arrows, Greek, Fractions, and less-common
        Currency symbols — covering roughly 80 typographic and technical symbols commonly needed when writing
        documents. This deliberately excludes emoji entirely; it focuses only on symbols like © ® ™, ± × ÷ ≈,
        Greek letters, and fractions. Click any symbol to copy it to your clipboard.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Opening the &quot;Math&quot; tab shows symbols like ±, ×, ÷, ≈, ≠, √, and ∞. Clicking ≈ copies it
        directly to your clipboard, ready to paste into a document or spreadsheet formula description.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Inserting a copyright, trademark, or registered symbol into a legal or business document.</li>
          <li>Typing math symbols like ≤, ≥, or √ that aren&apos;t on a standard keyboard.</li>
          <li>Adding Greek letters for scientific, engineering, or academic writing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this include emoji?</strong> No — this is the key difference from the Emoji Category Browser tool. The Symbol Picker deliberately excludes emoji entirely and focuses only on typographic and technical symbols like legal marks, math operators, punctuation, arrows, Greek letters, and fractions.</li>
          <li><strong>How is this different from the Unicode Character Finder?</strong> Unicode Character Finder is a broad keyword search across a mixed list of symbols and emoji. This Symbol Picker is narrower and purpose-built: a curated, category-organized set specifically for the typographic and technical symbols people commonly need while writing documents.</li>
          <li><strong>Does clicking a symbol copy it automatically?</strong> Yes — clicking any symbol copies it directly to your clipboard and shows a brief confirmation message.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/symbol-picker" content={content}>
      <SymbolPickerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SymbolPicker;
