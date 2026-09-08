'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'encode' | 'decode';

// Convention: A=1, B=2, ... Z=26 (case-insensitive on encode). Numbers in the
// output are separated by single spaces. Any character that isn't a letter
// (spaces, punctuation, digits) is passed through unchanged, surrounded by
// single spaces so it stays a distinct "word" in the number sequence.
function encode(text: string): string {
  const tokens: string[] = [];
  for (const ch of text) {
    if (/[a-zA-Z]/.test(ch)) {
      const num = ch.toUpperCase().charCodeAt(0) - 64; // A=1 ... Z=26
      tokens.push(String(num));
    } else if (ch === ' ') {
      tokens.push('/');
    } else if (ch.trim() === '') {
      // Skip other whitespace (tabs, newlines) rather than emitting noisy tokens.
      continue;
    } else {
      tokens.push(ch);
    }
  }
  return tokens.join(' ');
}

function decode(code: string): string {
  const tokens = code.trim().split(/\s+/).filter(Boolean);
  let result = '';
  for (const token of tokens) {
    if (token === '/') {
      result += ' ';
    } else if (/^\d+$/.test(token)) {
      const num = parseInt(token, 10);
      if (num >= 1 && num <= 26) {
        result += String.fromCharCode(64 + num);
      } else {
        result += token; // out-of-range number: leave as-is
      }
    } else {
      result += token;
    }
  }
  return result;
}

const SecretCodeEncoderDecoderContent = () => {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('HELLO WORLD');

  const output = useMemo(() => (mode === 'encode' ? encode(input) : decode(input)), [mode, input]);

  const changeMode = (_: unknown, value: Mode | null) => {
    if (!value) return;
    setMode(value);
    setInput('');
  };

  const copy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); } catch {}
  };

  return (
    <Box>
      <ToggleButtonGroup value={mode} exclusive onChange={changeMode} color="primary" sx={{ mb: 3 }}>
        <ToggleButton value="encode">Encode (Text to Numbers)</ToggleButton>
        <ToggleButton value="decode">Decode (Numbers to Text)</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <TextField
          label={mode === 'encode' ? 'Text to Encode' : 'Numbers to Decode'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'e.g. HELLO WORLD' : 'e.g. 8 5 12 12 15 / 23 15 18 12 4'}
          multiline
          rows={6}
          fullWidth
        />

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={600}>{mode === 'encode' ? 'Encoded Output' : 'Decoded Text'}</Typography>
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output}>Copy</Button>
          </Box>
          <TextField
            multiline
            rows={6}
            fullWidth
            value={output}
            InputProps={{ readOnly: true }}
            sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const SecretCodeEncoderDecoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Secret Code Encoder/Decoder</Typography>
      <Typography variant="body1">
        This tool uses a simple letter-to-number substitution cipher: A=1, B=2, C=3, and so on through
        Z=26, ignoring case. Switch to Encode mode to turn text into a series of numbers, or Decode mode to
        turn a series of numbers back into text. Since this substitution isn&apos;t self-inverse like ROT13,
        an explicit mode toggle picks which direction to run. In the output, each number is separated by a
        space, a space in your original text becomes a forward slash (&quot;/&quot;) so word breaks aren&apos;t
        lost, and any other punctuation passes through unchanged as its own token.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Encoding &quot;HI&quot; produces <code>8 9</code>, since H is the 8th letter and I is the 9th.
        Decoding <code>8 9</code> back returns &quot;HI&quot;. Encoding &quot;HELLO WORLD&quot; produces{' '}
        <code>8 5 12 12 15 / 23 15 18 12 4</code>, with the slash marking the space between the two words.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a simple secret code for kids&apos; games, scavenger hunts, or puzzle boxes.</li>
          <li>Learning the basics of substitution ciphers in a classroom setting.</li>
          <li>Decoding a number-based puzzle or riddle that uses this classic A1Z26 convention.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does this need separate Encode and Decode modes, unlike ROT13?</strong> ROT13 is self-inverse — applying it twice returns the original text, so one box can handle both directions. This number cipher isn't self-inverse: turning "HI" into "8 9" and then treating "8 9" as more letters to encode would produce nonsense, so an explicit mode toggle is required to pick the correct direction.</li>
          <li><strong>What happens to spaces and punctuation?</strong> A space in your original text becomes a forward slash ("/") in the encoded output so word boundaries aren't lost, and any other character (punctuation, digits) passes through unchanged as its own token in the sequence.</li>
          <li><strong>Is this cipher secure?</strong> No — like ROT13, this is a simple, well-known substitution meant for casual fun and puzzles, not real security. Anyone familiar with the A=1, B=2 convention can decode it instantly.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/secret-code-encoder-decoder" content={content}>
      <SecretCodeEncoderDecoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SecretCodeEncoderDecoder;
