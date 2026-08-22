'use client';

import { useState } from 'react';
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
        Morse code is a method of transmitting text information as a series of on-off tones, lights, or clicks. It uses dots (`.`) and dashes (`-`) to represent the letters of the alphabet, numerals, and punctuation marks. This tool works as a two-way <strong>Morse code translator</strong> — use it to translate Morse code back into plain text, or to translate plain text into Morse code — using standard International Morse Code, separating letters with a space and words with a forward slash (`/`).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Encoding &quot;SOS&quot; produces <code>... --- ...</code>; decoding it back returns &quot;SOS&quot;.
        Paste either the text or the dots-and-dashes into the input box, pick the matching mode, and click
        translate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Learning or practicing Morse code for amateur radio licensing.</li>
          <li>Decoding Morse code messages from puzzles or historical texts.</li>
          <li>Translating Morse code found in movies, games, or escape rooms back into readable text.</li>
          <li>Converting a message into Morse code to send over a radio, light, or sound signal.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How are words separated in Morse code?</Typography>
      <Typography variant="body1">
        Letters within a word are separated by a single space, and words are separated by a forward slash
        (<code>/</code>).
      </Typography>
      <Typography variant="h3">How do I translate Morse code back into text?</Typography>
      <Typography variant="body1">
        Switch to &quot;decode&quot; mode, paste the Morse code (dots and dashes, with letters separated by
        spaces and words separated by a slash) into the input box, and click &quot;Translate to Text&quot; —
        the plain-text result appears on the right, ready to copy.
      </Typography>
      <Typography variant="h3">How do I translate text into Morse code?</Typography>
      <Typography variant="body1">
        Switch to &quot;encode&quot; mode, type or paste your message, and click &quot;Translate to Morse&quot;
        — each letter, number, and common punctuation mark is converted to its dot-dash equivalent.
      </Typography>
      <Typography variant="h3">Is this the same as a &quot;mos code&quot; translator?</Typography>
      <Typography variant="body1">
        Yes — &quot;mos code&quot; is a common misspelling of &quot;Morse code.&quot; This translator works the
        same way no matter how you search for it: paste your text or code above and hit translate.
      </Typography>
      <Typography variant="h3">Is this Morse code translator free to use?</Typography>
      <Typography variant="body1">
        Yes — translation happens instantly in your browser, it&apos;s completely free to use, and no signup or
        installation is required.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Morse Code Translator"
      description="Translate plain text to Morse code or decode Morse code back to text instantly. Free online translator."
      url="/converters/morse-code-translator"
      content={content}
      category="Converters"
    >
      <MorseCodeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MorseCodeTranslator;
