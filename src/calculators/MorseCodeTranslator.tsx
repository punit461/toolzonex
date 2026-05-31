'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

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
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
};

const REVERSE_MORSE_DICT: Record<string, string> = {};
for (const [key, value] of Object.entries(MORSE_CODE_DICT)) {
  REVERSE_MORSE_DICT[value] = key;
}

const MorseCodeContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const processText = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    if (mode === 'encode') {
      const encoded = input.toUpperCase().split('').map(char => {
        return MORSE_CODE_DICT[char] !== undefined ? MORSE_CODE_DICT[char] : char;
      }).join(' ');
      setOutput(encoded);
    } else {
      // Decode
      // Split by spaces. Single space separates letters. ' / ' separates words.
      const decoded = input.split(' ').map(symbol => {
        if (symbol === '' || symbol === '/') return ' '; // Handled multiple spaces or slashes
        return REVERSE_MORSE_DICT[symbol] !== undefined ? REVERSE_MORSE_DICT[symbol] : symbol;
      }).join('');
      // Clean up multiple spaces that might result from ' / '
      setOutput(decoded.replace(/\s+/g, ' ').trim());
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {}
  };

  const swapMode = () => {
    setMode(prev => prev === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">
          {mode === 'encode' ? 'Plain Text Input:' : 'Morse Code Input:'}
        </Typography>
        <TextField
          multiline
          rows={10}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to translate...' : 'Enter morse code (e.g. .... . .-.. .-.. --- / .-- --- .-. .-.. -..)...'}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" size="large" onClick={processText} sx={{ flex: 1 }}>
            {mode === 'encode' ? 'Translate to Morse' : 'Translate to Text'}
          </Button>
          <Button variant="outlined" size="large" onClick={swapMode}>
            Swap Mode
          </Button>
        </Box>
      </Box>

      {/* Output Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">
            {mode === 'encode' ? 'Morse Code Output:' : 'Plain Text Output:'}
          </Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!output}>
            Copy
          </Button>
        </Box>
        <TextField
          multiline
          rows={10}
          fullWidth
          value={output}
          InputProps={{ readOnly: true }}
          placeholder="Translation will appear here..."
        />
      </Box>

    </Box>
  );
};

const MorseCodeTranslator = () => {
  const content = (
    <>
      <Typography variant="h2">How does Morse Code work?</Typography>
      <Typography variant="body1">
        Morse code is a method of transmitting text information as a series of on-off tones, lights, or clicks. It uses dots (`.`) and dashes (`-`) to represent the letters of the alphabet, numerals, and punctuation marks. This tool uses standard International Morse Code, separating letters with a space and words with a forward slash (`/`).
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Morse Code Translator"
      description="Translate plain text to Morse code or decode Morse code back to text instantly. Free online translator."
      url="/tools/morse-code-translator"
      content={content}
      category="Tools"
    >
      <MorseCodeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MorseCodeTranslator;
