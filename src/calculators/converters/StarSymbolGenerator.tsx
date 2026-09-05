'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Snackbar, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const SYMBOLS: { char: string; name: string }[] = [
  { char: '★', name: 'black star' },
  { char: '☆', name: 'white star' },
  { char: '✡', name: 'star of David' },
  { char: '✦', name: 'black four pointed star' },
  { char: '✧', name: 'white four pointed star' },
  { char: '✩', name: 'stress outlined white star' },
  { char: '✪', name: 'circled white star' },
  { char: '✫', name: 'open centre black star' },
  { char: '✬', name: 'black centre white star' },
  { char: '✭', name: 'outlined black star' },
  { char: '✮', name: 'heavy outlined black star' },
  { char: '✯', name: 'pinwheel star' },
  { char: '⭐', name: 'star emoji' },
  { char: '🌟', name: 'glowing star' },
];

const FULL_STAR = '★';
const HALF_STAR = '⯪';
const EMPTY_STAR = '☆';

function buildRating(rating: number): string {
  const clamped = Math.max(0, Math.min(5, rating));
  const rounded = Math.round(clamped * 2) / 2;
  const full = Math.floor(rounded);
  const hasHalf = rounded - full === 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return FULL_STAR.repeat(full) + (hasHalf ? HALF_STAR : '') + EMPTY_STAR.repeat(empty);
}

const StarSymbolGeneratorContent = () => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [copiedSymbol, setCopiedSymbol] = useState('');
  const [rating, setRating] = useState('3.5');
  const [copiedRating, setCopiedRating] = useState(false);

  const ratingNum = parseFloat(rating);
  const ratingString = useMemo(
    () => (!isNaN(ratingNum) ? buildRating(ratingNum) : ''),
    [ratingNum]
  );

  const copySymbol = async (char: string) => {
    try {
      await navigator.clipboard.writeText(char);
      setCopiedSymbol(char);
      setSnackOpen(true);
    } catch {}
  };

  const copyRating = async () => {
    if (!ratingString) return;
    try {
      await navigator.clipboard.writeText(ratingString);
      setCopiedRating(true);
      setTimeout(() => setCopiedRating(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>Star Symbols</Typography>
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
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>Star Rating Builder</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Rating (0-5)"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            sx={{ width: 160 }}
            inputProps={{ min: 0, max: 5, step: 0.5 }}
          />
          <Paper variant="outlined" sx={{ p: 1.5, px: 2, fontSize: '1.4rem' }}>
            {ratingString || '—'}
          </Paper>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyRating} disabled={!ratingString}>
            {copiedRating ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={1500}
        onClose={() => setSnackOpen(false)}
        message={`Copied ${copiedSymbol} to clipboard`}
      />
    </Box>
  );
};

const StarSymbolGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Star Symbol Generator</Typography>
      <Typography variant="body1">
        Browse a curated collection of star symbol variants — from the simple ★ and ☆ to pointed, outlined, and
        emoji-style stars — and click any of them to copy it to your clipboard. Below the symbol grid, the star
        rating builder turns any number from 0 to 5 (including halves like 3.5) into a ready-to-use rating string
        like <code>★★★☆☆</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>3.5</code> into the Rating field produces <code>★★★{HALF_STAR}☆</code> — three full stars,
        one half star, and one empty star.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Copying a decorative star symbol into a social media bio or forum signature.</li>
          <li>Building a plain-text star rating for a product review, comment, or spreadsheet cell.</li>
          <li>Adding a star accent to a heading or divider in a plain-text document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Symbol Picker?</strong> The Symbol Picker's categories cover Legal, Math, Punctuation, Arrows, Greek letters, and Fractions — none of which include star symbols. This tool fills that gap with a dedicated star collection, plus a practical rating builder the Symbol Picker doesn&apos;t offer.</li>
          <li><strong>Does the half-star character display the same everywhere?</strong> Not always — the half-star glyph's exact appearance depends on the font and platform rendering it, though most modern systems display it as a clearly partial star.</li>
          <li><strong>What happens if I enter a rating that isn&apos;t a multiple of 0.5?</strong> The rating is rounded to the nearest half-star before building the string, since the output can only represent full and half stars.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/star-symbol-generator" content={content}>
      <StarSymbolGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StarSymbolGenerator;
