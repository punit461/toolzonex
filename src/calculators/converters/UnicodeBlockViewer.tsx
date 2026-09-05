'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, MenuItem, TextField, Paper, Grid } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface UnicodeBlock {
  name: string;
  start: number;
  end: number;
  description: string;
}

const BLOCKS: UnicodeBlock[] = [
  { name: 'Basic Latin', start: 0x0000, end: 0x007f, description: 'Standard ASCII characters — English letters, digits, and basic punctuation.' },
  { name: 'Latin-1 Supplement', start: 0x0080, end: 0x00ff, description: 'Accented Latin letters and common symbols like © and ±.' },
  { name: 'Latin Extended-A', start: 0x0100, end: 0x017f, description: 'Additional accented Latin letters used in various European languages.' },
  { name: 'Latin Extended-B', start: 0x0180, end: 0x024f, description: 'Further Latin letter extensions for phonetic and minority languages.' },
  { name: 'IPA Extensions', start: 0x0250, end: 0x02af, description: 'Characters used in the International Phonetic Alphabet.' },
  { name: 'Greek and Coptic', start: 0x0370, end: 0x03ff, description: 'Greek alphabet letters and Coptic script characters.' },
  { name: 'Cyrillic', start: 0x0400, end: 0x04ff, description: 'Letters used in Russian, Ukrainian, Bulgarian, and other Slavic languages.' },
  { name: 'Armenian', start: 0x0530, end: 0x058f, description: 'The Armenian alphabet.' },
  { name: 'Hebrew', start: 0x0590, end: 0x05ff, description: 'Hebrew letters and points used in Hebrew and Yiddish text.' },
  { name: 'Arabic', start: 0x0600, end: 0x06ff, description: 'Arabic script used for Arabic, Persian, Urdu, and other languages.' },
  { name: 'Devanagari', start: 0x0900, end: 0x097f, description: 'Script used for Hindi, Sanskrit, Marathi, and Nepali.' },
  { name: 'Bengali', start: 0x0980, end: 0x09ff, description: 'Script used for Bengali and Assamese.' },
  { name: 'Thai', start: 0x0e00, end: 0x0e7f, description: 'The Thai script.' },
  { name: 'Georgian', start: 0x10a0, end: 0x10ff, description: 'The Georgian alphabet.' },
  { name: 'Hangul Jamo', start: 0x1100, end: 0x11ff, description: 'Individual Korean Hangul consonant and vowel components.' },
  { name: 'General Punctuation', start: 0x2000, end: 0x206f, description: 'Dashes, quotation marks, and other general punctuation not in Basic Latin.' },
  { name: 'Currency Symbols', start: 0x20a0, end: 0x20cf, description: 'Symbols for world currencies, including € and ₹.' },
  { name: 'Letterlike Symbols', start: 0x2100, end: 0x214f, description: 'Symbols derived from letters, like ™ and ℅.' },
  { name: 'Number Forms', start: 0x2150, end: 0x218f, description: 'Fractions and Roman numerals as single characters.' },
  { name: 'Arrows', start: 0x2190, end: 0x21ff, description: 'Arrow characters pointing in various directions.' },
  { name: 'Mathematical Operators', start: 0x2200, end: 0x22ff, description: 'Symbols used in mathematical notation, like ∑ and ∞.' },
  { name: 'Miscellaneous Technical', start: 0x2300, end: 0x23ff, description: 'Technical symbols including some used in engineering and computing.' },
  { name: 'Box Drawing', start: 0x2500, end: 0x257f, description: 'Line and corner characters used to draw boxes and tables in text.' },
  { name: 'Block Elements', start: 0x2580, end: 0x259f, description: 'Solid and shaded block characters, often used for text-based graphics.' },
  { name: 'Geometric Shapes', start: 0x25a0, end: 0x25ff, description: 'Basic geometric shapes like squares, circles, and triangles.' },
  { name: 'Miscellaneous Symbols', start: 0x2600, end: 0x26ff, description: 'A wide variety of symbols including weather, astrology, and warning signs.' },
  { name: 'Dingbats', start: 0x2700, end: 0x27bf, description: 'Decorative characters including scissors, checkmarks, and stars.' },
  { name: 'CJK Symbols and Punctuation', start: 0x3000, end: 0x303f, description: 'Punctuation used with Chinese, Japanese, and Korean text.' },
  { name: 'Hiragana', start: 0x3040, end: 0x309f, description: 'The Japanese hiragana syllabary.' },
  { name: 'Katakana', start: 0x30a0, end: 0x30ff, description: 'The Japanese katakana syllabary.' },
  { name: 'CJK Unified Ideographs', start: 0x4e00, end: 0x9fff, description: 'The main block of Chinese, Japanese, and Korean (Han) ideographs.' },
  { name: 'Hangul Syllables', start: 0xac00, end: 0xd7a3, description: 'Precomposed Korean Hangul syllable blocks.' },
  { name: 'Private Use Area', start: 0xe000, end: 0xf8ff, description: 'Reserved for custom, application-specific characters not part of the standard.' },
  { name: 'Alphabetic Presentation Forms', start: 0xfb00, end: 0xfb4f, description: 'Ligatures and presentation variants of Latin and Hebrew letters.' },
  { name: 'Halfwidth and Fullwidth Forms', start: 0xff00, end: 0xffef, description: 'Halfwidth and fullwidth variants of Latin, Katakana, and Hangul characters.' },
  { name: 'Emoticons', start: 0x1f600, end: 0x1f64f, description: 'The classic face-based emoji, like 😀 and 😢.' },
  { name: 'Miscellaneous Symbols and Pictographs', start: 0x1f300, end: 0x1f5ff, description: 'A broad range of pictographic emoji including weather, objects, and animals.' },
  { name: 'Transport and Map Symbols', start: 0x1f680, end: 0x1f6ff, description: 'Emoji for vehicles, transportation, and map-related symbols.' },
  { name: 'Supplemental Symbols and Pictographs', start: 0x1f900, end: 0x1f9ff, description: 'Newer emoji including additional gestures, animals, and food.' },
];

function isSafeCodePoint(cp: number): boolean {
  // Skip surrogate range which is invalid as a standalone code point.
  return !(cp >= 0xd800 && cp <= 0xdfff);
}

const SAMPLE_LIMIT = 100;

const UnicodeBlockViewerContent = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const block = BLOCKS[selectedIndex];

  const sampleChars = useMemo(() => {
    const chars: { cp: number; char: string }[] = [];
    const end = Math.min(block.end, block.start + SAMPLE_LIMIT - 1);
    for (let cp = block.start; cp <= end; cp++) {
      if (!isSafeCodePoint(cp)) continue;
      try {
        chars.push({ cp, char: String.fromCodePoint(cp) });
      } catch {
        // skip any code point that fails to convert
      }
    }
    return chars;
  }, [block]);

  return (
    <Box>
      <TextField
        select
        label="Unicode Block"
        value={selectedIndex}
        onChange={(e) => setSelectedIndex(Number(e.target.value))}
        fullWidth
        sx={{ mb: 3 }}
      >
        {BLOCKS.map((b, i) => (
          <MenuItem key={b.name} value={i}>{b.name}</MenuItem>
        ))}
      </TextField>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" fontWeight={700}>{block.name}</Typography>
        <Typography variant="body2" color="text.secondary" fontFamily="monospace">
          U+{block.start.toString(16).toUpperCase().padStart(4, '0')} to U+{block.end.toString(16).toUpperCase().padStart(4, '0')}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>{block.description}</Typography>
      </Paper>

      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        Sample characters {block.end - block.start + 1 > SAMPLE_LIMIT ? `(first ${SAMPLE_LIMIT} of ${block.end - block.start + 1})` : ''}
      </Typography>
      <Grid container spacing={1}>
        {sampleChars.map(({ cp, char }) => (
          <Grid item xs={2} sm={1.5} md={1} key={cp}>
            <Paper variant="outlined" sx={{ p: 1, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '1.3rem' }}>{char}</Typography>
              <Typography variant="caption" color="text.secondary" fontFamily="monospace" sx={{ fontSize: '0.65rem' }}>
                {cp.toString(16).toUpperCase()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const UnicodeBlockViewer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Unicode Block Viewer</Typography>
      <Typography variant="body1">
        Select any of around 38 well-known Unicode blocks — like Basic Latin, Cyrillic, Arabic, CJK Unified
        Ideographs, or Emoticons — and the tool shows its exact code point range and a short description, along
        with a sample grid of characters generated programmatically from that range using{' '}
        <code>String.fromCodePoint</code>.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;Basic Latin&quot; shows the range U+0000 to U+007F, with a sample grid displaying
        standard ASCII characters. Selecting &quot;Greek and Coptic&quot; shows the range U+0370 to U+03FF, with
        a grid of Greek letters like α, β, and γ.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Understanding how the Unicode standard is organized into structural blocks by script or purpose.</li>
          <li>Browsing which characters fall within a specific code point range for development reference.</li>
          <li>Learning the code point range for a given script, like Devanagari or Hangul Syllables.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Unicode Character Lookup?</strong> Unicode Character Lookup is for looking up details about ONE specific character or code point you already have. This Unicode Block Viewer instead shows entire code point RANGES/BLOCKS of the Unicode standard — for structural reference and browsing an entire script or category at once, not a single character.</li>
          <li><strong>Are all characters in large blocks shown?</strong> No — for very large blocks like CJK Unified Ideographs, only the first 100 characters in the range are sampled, since displaying tens of thousands of characters at once wouldn&apos;t be practical.</li>
          <li><strong>Where do the sample characters come from?</strong> They&apos;re generated programmatically from each block&apos;s numeric code point range using JavaScript&apos;s <code>String.fromCodePoint</code>, not a hand-typed list — so the sample accurately reflects the real Unicode range.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/unicode-block-viewer" content={content}>
      <UnicodeBlockViewerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnicodeBlockViewer;
