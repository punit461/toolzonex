'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert, Grid } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CHAR_NAMES: Record<number, string> = {
  32: 'space', 33: 'exclamation mark', 34: 'quotation mark', 35: 'number sign', 36: 'dollar sign',
  37: 'percent sign', 38: 'ampersand', 39: 'apostrophe', 40: 'left parenthesis', 41: 'right parenthesis',
  42: 'asterisk', 43: 'plus sign', 44: 'comma', 45: 'hyphen-minus', 46: 'full stop', 47: 'solidus',
  58: 'colon', 59: 'semicolon', 60: 'less-than sign', 61: 'equals sign', 62: 'greater-than sign',
  63: 'question mark', 64: 'commercial at', 91: 'left square bracket', 92: 'reverse solidus',
  93: 'right square bracket', 94: 'circumflex accent', 95: 'low line', 96: 'grave accent',
  123: 'left curly bracket', 124: 'vertical line', 125: 'right curly bracket', 126: 'tilde',
  169: 'copyright sign', 174: 'registered sign', 176: 'degree sign', 177: 'plus-minus sign',
  215: 'multiplication sign', 247: 'division sign', 8211: 'en dash', 8212: 'em dash',
  8216: 'left single quotation mark', 8217: 'right single quotation mark',
  8220: 'left double quotation mark', 8221: 'right double quotation mark', 8226: 'bullet',
  8230: 'horizontal ellipsis', 8364: 'euro sign', 8482: 'trade mark sign', 8592: 'leftwards arrow',
  8593: 'upwards arrow', 8594: 'rightwards arrow', 8595: 'downwards arrow', 8734: 'infinity',
  9733: 'black star', 9734: 'white star', 9829: 'black heart suit', 10003: 'check mark',
  10004: 'heavy check mark', 10005: 'multiplication x', 10006: 'heavy multiplication x',
  128512: 'grinning face', 128513: 'grinning face with big eyes', 128514: 'face with tears of joy',
  128515: 'smiling face with open mouth', 128516: 'smiling face with open mouth and smiling eyes',
  128517: 'smiling face with open mouth and cold sweat', 128518: 'smiling face with open mouth and tightly-closed eyes',
  128522: 'smiling face with smiling eyes', 128523: 'face savoring delicious food', 128525: 'smiling face with heart-shaped eyes',
  128526: 'face throwing a kiss', 128527: 'kissing face', 128530: 'face with stuck-out tongue',
  128531: 'face with stuck-out tongue and winking eye', 128533: 'face with cold sweat',
  128535: 'face with open mouth and cold sweat', 128536: 'face screaming in fear', 128538: 'sleeping face',
  128540: 'face with stuck-out tongue and tightly-closed eyes', 128545: 'pouting face',
  128546: 'crying face', 128557: 'loudly crying face', 128561: 'face screaming in fear',
  128563: 'flushed face', 128564: 'sleeping symbol', 9749: 'hot beverage', 127928: 'rocket',
  128077: 'thumbs up sign', 128078: 'thumbs down sign', 128079: 'clapping hands sign',
  128074: 'fist bump', 128075: 'waving hand sign', 128076: 'OK hand sign', 128170: 'flexed biceps',
  9995: 'raised hand', 10084: 'heavy black heart', 128147: 'heart with ribbon',
  128149: 'two hearts', 128150: 'sparkling heart', 128151: 'growing heart', 128154: 'yellow heart',
  128155: 'green heart', 128156: 'blue heart', 128157: 'purple heart', 127775: 'glowing star',
  11088: 'star', 128293: 'fire', 127881: 'party popper', 127882: 'confetti ball', 128184: 'money with wings',
  128176: 'money bag', 9989: 'white heavy check mark', 10071: 'exclamation question mark',
  128721: 'no entry', 9888: 'warning sign', 128683: 'no entry sign', 128720: 'stop sign',
};

const UnicodeCharacterLookupContent = () => {
  const [input, setInput] = useState('❤️');

  const result = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed) return null;

    let codePoint: number | null = null;
    const codePointMatch = trimmed.match(/^(?:U\+)?([0-9a-fA-F]+)$/);

    if (codePointMatch && trimmed.length > 2) {
      codePoint = parseInt(codePointMatch[1], 16);
    } else {
      codePoint = trimmed.codePointAt(0) ?? null;
    }

    if (codePoint === null || isNaN(codePoint)) return { error: 'Enter a single character, or a code point like U+2764 or 2764.' };

    let char: string;
    try {
      char = String.fromCodePoint(codePoint);
    } catch {
      return { error: 'That is not a valid Unicode code point.' };
    }

    const hex = codePoint.toString(16).toUpperCase().padStart(4, '0');
    const utf8Bytes = Array.from(new TextEncoder().encode(char))
      .map((b) => b.toString(16).toUpperCase().padStart(2, '0'))
      .join(' ');
    const htmlEntity = `&#x${hex};`;
    const name = CHAR_NAMES[codePoint] ?? 'Unknown character name';

    return { char, codePoint, hex, utf8Bytes, htmlEntity, name };
  }, [input]);

  return (
    <Box sx={{ maxWidth: 640, mx: 'auto' }}>
      <TextField
        label="Character or Code Point"
        placeholder="Paste a character, or type U+2764 / 2764"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {result && 'error' in result && <Alert severity="warning">{result.error}</Alert>}

      {result && !('error' in result) && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography sx={{ fontSize: '4rem', textAlign: 'center', mb: 2 }}>{result.char}</Typography>
          <Typography variant="h6" textAlign="center" gutterBottom>{result.name}</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}><Typography variant="body2" color="text.secondary">Decimal</Typography><Typography fontFamily="monospace">{result.codePoint}</Typography></Grid>
            <Grid item xs={6}><Typography variant="body2" color="text.secondary">Hex Code Point</Typography><Typography fontFamily="monospace">U+{result.hex}</Typography></Grid>
            <Grid item xs={6}><Typography variant="body2" color="text.secondary">UTF-8 Bytes</Typography><Typography fontFamily="monospace">{result.utf8Bytes}</Typography></Grid>
            <Grid item xs={6}><Typography variant="body2" color="text.secondary">HTML Entity</Typography><Typography fontFamily="monospace">{result.htmlEntity}</Typography></Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

const UnicodeCharacterLookup = () => {
  const content = (
    <>
      <Typography variant="h2">How the Unicode Character Lookup Works</Typography>
      <Typography variant="body1">
        Paste a single character, or type its code point as <code>U+2764</code> or plain hex like{' '}
        <code>2764</code>, and the tool inspects it in full detail: the character rendered large, its
        decimal and hexadecimal code point, its UTF-8 byte sequence (computed with <code>TextEncoder</code>),
        its HTML numeric entity, and its Unicode name when available from a built-in reference table
        covering common Latin characters, punctuation, symbols, and popular emoji.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering <code>U+2764</code> shows the ❤ character, decimal code point 10084, hex{' '}
        <code>U+2764</code>, UTF-8 bytes <code>E2 9D A4</code>, HTML entity <code>&amp;#x2764;</code>, and the
        name &quot;heavy black heart&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting the exact UTF-8 byte sequence of a character for encoding or debugging work.</li>
          <li>Finding the HTML entity code to embed a specific character in a web page.</li>
          <li>Looking up detailed information about one character you already have in hand.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from Text to Unicode / Unicode to Text?</strong> Those tools convert whole strings of text between plain text and Unicode escape notation, one character after another. This tool is a detailed single-character inspector — enter one character or code point and see everything about it (decimal, hex, UTF-8 bytes, HTML entity, and name) at once.</li>
          <li><strong>What if the character's name shows "Unknown character name"?</strong> The name table covers Basic Latin, common punctuation and symbols, and roughly 100+ popular emoji, but isn&apos;t exhaustive. Every other field — decimal, hex, UTF-8 bytes, and HTML entity — is computed directly and always works regardless of whether the name is known.</li>
          <li><strong>Can I enter more than one character?</strong> Only the first character (or code point) you enter is inspected — this keeps the tool focused as a single-character detail view rather than a bulk converter.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/unicode-character-lookup" content={content}>
      <UnicodeCharacterLookupContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnicodeCharacterLookup;
