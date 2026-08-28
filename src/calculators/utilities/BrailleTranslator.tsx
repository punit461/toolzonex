'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const englishToBraille: Record<string, string> = {
  'a': '\u2801', 'b': '\u2803', 'c': '\u2809', 'd': '\u2819', 'e': '\u2811',
  'f': '\u280B', 'g': '\u281B', 'h': '\u280A', 'i': '\u2802', 'j': '\u2812',
  'k': '\u2805', 'l': '\u2807', 'm': '\u280D', 'n': '\u281D', 'o': '\u2815',
  'p': '\u280F', 'q': '\u281F', 'r': '\u2817', 's': '\u280E', 't': '\u281E',
  'u': '\u2825', 'v': '\u2827', 'w': '\u283A', 'x': '\u282D', 'y': '\u283D',
  'z': '\u2835',
  '1': '\u2801', '2': '\u2803', '3': '\u2809', '4': '\u2819', '5': '\u2811',
  '6': '\u280B', '7': '\u281B', '8': '\u280A', '9': '\u2802', '0': '\u2812',
  ' ': '\u2800',
  '.': '\u2832', ',': '\u2804', '?': '\u2826', '!': '\u2816', ';': '\u280C',
  ':': '\u2814', '-': '\u2824', "'": '\u2804', '"': '\u2826', '(': '\u2826',
  ')': '\u2826', '/': '\u280C',
};

const brailleToEnglish: Record<string, string> = {};
Object.entries(englishToBraille).forEach(([en, br]) => {
  brailleToEnglish[br] = en;
});

const BrailleTranslator = () => {
  const [input, setInput] = useState('Hello World');
  const [direction, setDirection] = useState<'toBraille' | 'toEnglish'>('toBraille');

  const output = useMemo(() => {
    if (!input) return '';
    if (direction === 'toBraille') {
      return input.toLowerCase().split('').map((ch) => englishToBraille[ch] || ch).join('');
    } else {
      return input.split('').map((ch) => brailleToEnglish[ch] || ch).join('');
    }
  }, [input, direction]);

  const breakdown = useMemo(() => {
    if (!input) return [];
    const src = direction === 'toBraille' ? input.toLowerCase() : input;
    const dst = direction === 'toBraille' ? output : output;
    return src.split('').map((ch, i) => ({
      original: ch,
      translated: dst[i] || '',
      hex: dst[i] ? `U+${dst[i].charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')}` : '',
    }));
  }, [input, output, direction]);

  const content = (
    <>
      <Typography variant="h2">How Does It Work?</Typography>
      <Typography variant="body1">
        This translator maps each English character to its corresponding Braille Unicode character from the U+2800 Braille Patterns block.
        Each Braille cell uses an 8-dot pattern represented by a single Unicode code point. The translation works in both directions:
        type English to get Braille, or paste Braille to get English back.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The letter &quot;h&quot; maps to Braille pattern ⠊ (U+280A), and &quot;e&quot; maps to ⠑ (U+2811).
        &quot;Hello&quot; in Braille becomes ⠓⠑⠇⠇⠕.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating accessible text for visually impaired users in documents and websites.</li>
          <li>Learning Braille letter-to-symbol mappings for educational purposes.</li>
          <li>Generating Braille text for signage, labels, and crafts.</li>
          <li>Decoding Braille Unicode characters found in digital content.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this Grade 1 or Grade 2 Braille?</Typography>
      <Typography variant="body1">
        This is Grade 1 (uncontracted) Braille, where each letter maps to a single Braille cell. Grade 2 Braille uses contractions and shorthand for common words, which this tool does not implement.
      </Typography>
      <Typography variant="h3">Why do some characters not translate?</Typography>
      <Typography variant="body1">
        Only standard English letters, digits, and basic punctuation have direct Braille equivalents in this mapping. Special characters outside this set are passed through unchanged.
      </Typography>
      <Typography variant="h3">Can I paste Braille text to translate back?</Typography>
      <Typography variant="body1">
        Yes — switch the direction toggle to &quot;Braille → English&quot; and paste or type Braille Unicode characters to decode them.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/braille-translator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ToggleButtonGroup value={direction} exclusive onChange={(_, v) => v && setDirection(v)} size="small" sx={{ alignSelf: 'flex-start' }}>
          <ToggleButton value="toBraille">English → Braille</ToggleButton>
          <ToggleButton value="toEnglish">Braille → English</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label={direction === 'toBraille' ? 'English Text' : 'Braille Text'}
          multiline
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          size="small"
        />

        <Paper variant="outlined" sx={{ p: 3, minHeight: 80 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            {direction === 'toBraille' ? 'Braille Output' : 'English Output'}
          </Typography>
          <Typography sx={{ fontSize: '2rem', fontFamily: 'monospace', wordBreak: 'break-all', lineHeight: 1.6 }}>
            {output || <Typography color="text.secondary" component="span">Translation will appear here...</Typography>}
          </Typography>
        </Paper>

        {breakdown.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Character Breakdown</Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 300 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Original</TableCell>
                    <TableCell>Translated</TableCell>
                    <TableCell>Unicode</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {breakdown.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{row.original === ' ' ? '␣' : row.original}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>{row.translated === ' ' ? '␣' : row.translated}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{row.hex}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BrailleTranslator;
