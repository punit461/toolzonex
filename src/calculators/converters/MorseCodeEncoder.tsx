'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MORSE_CODE_DICT: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
};

const encodeMorse = (input: string): string => {
  if (!input.trim()) return '';
  return input
    .toUpperCase()
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((char) => MORSE_CODE_DICT[char] ?? char)
        .join(' ')
    )
    .join(' / ');
};

const MorseCodeEncoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => encodeMorse(input), [input]);

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Plain Text Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text here to encode it to Morse code..."
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Morse Code Output:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="Morse code output will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const MorseCodeEncoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Encode Text to Morse Code</Typography>
      <Typography variant="body1">
        Type or paste plain text into the box above and it encodes to Morse code instantly — no button to
        click. Letters within a word are separated by a space, and words are separated by a forward slash
        (<code>/</code>), following standard International Morse Code. This page only encodes; if you need to
        decode Morse code back into text instead, use our two-way Morse Code Translator.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>SOS</code> encodes instantly to <code>... --- ...</code>, and <code>HELLO WORLD</code>{' '}
        encodes to <code>.... . .-.. .-.. --- / .-- --- .-. .-.. -..</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a message into Morse code to send over a radio, light, or sound signal.</li>
          <li>Creating a Morse code puzzle, cipher, or novelty message.</li>
          <li>Practicing Morse code encoding for amateur radio licensing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How are words separated in the output?</Typography>
      <Typography variant="body1">
        Letters within a word are separated by a single space, and words are separated by a forward slash
        (<code>/</code>) with a space on each side.
      </Typography>
      <Typography variant="h3">What characters can this encode?</Typography>
      <Typography variant="body1">
        Standard International Morse Code covers uppercase and lowercase letters (case-insensitive), digits
        0-9, and common punctuation marks like periods, commas, question marks, and parentheses.
      </Typography>
      <Typography variant="h3">Does this tool also decode Morse code back to text?</Typography>
      <Typography variant="body1">
        This page is encode-only, for a simpler, focused experience. Use our two-way Morse Code Translator if
        you need to decode Morse code back into plain text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/morse-code-encoder" content={content}>
      <MorseCodeEncoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MorseCodeEncoder;
