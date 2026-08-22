'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BinaryConverterContent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('decode'); // default: binary to text
  const [error, setError] = useState('');

  const processText = () => {
    setError('');
    setOutput('');
    
    if (!input.trim()) return;

    try {
      if (mode === 'encode') {
        // Text to Binary
        let bin = '';
        for (let i = 0; i < input.length; i++) {
          let charBin = input.charCodeAt(i).toString(2);
          // Pad with 0s to make it 8 bits
          charBin = '00000000'.substring(charBin.length) + charBin;
          bin += charBin + ' ';
        }
        setOutput(bin.trim());
      } else {
        // Binary to Text
        const binArray = input.trim().split(/\s+/);
        let txt = '';
        for (let i = 0; i < binArray.length; i++) {
          if (!/^[01]+$/.test(binArray[i])) {
            throw new Error(`Invalid binary sequence at index ${i}`);
          }
          txt += String.fromCharCode(parseInt(binArray[i], 2));
        }
        setOutput(txt);
      }
    } catch (err: any) {
      setError(mode === 'encode' ? 'Failed to encode text.' : 'Invalid binary format. Make sure it is space-separated 8-bit binary.');
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
    setError('');
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">
          {mode === 'encode' ? 'Plain Text Input:' : 'Binary Input (Space-separated):'}
        </Typography>
        <TextField
          multiline
          rows={10}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode to binary...' : '01001000 01100101 01101100 01101100 01101111'}
          error={!!error}
          helperText={error}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" size="large" onClick={processText} sx={{ flex: 1 }}>
            {mode === 'encode' ? 'Convert to Binary' : 'Convert to Text'}
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
            {mode === 'encode' ? 'Binary Output:' : 'Plain Text Output:'}
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
          placeholder="Result will appear here..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>

    </Box>
  );
};

interface BinaryConverterProps {
  url?: string;
}

const BinaryConverter = ({ url = '/converters/binary-to-text' }: BinaryConverterProps) => {
  const content = (
    <>
      <Typography variant="h2">What is Binary Code?</Typography>
      <Typography variant="body1">
        Computers store all data using the binary system, which is a base-2 number system composed of only two digits: 0 and 1. This tool is a two-way <strong>binary translator</strong> — it converts binary code to text (decode mode) and converts human-readable text into 8-bit binary (encode mode), making it a great educational tool for understanding how computers process information.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The letter &quot;A&quot; converts to <code>01000001</code> in 8-bit binary (its ASCII value, 65). Paste
        <code>01001000 01100101 01101100 01101100 01101111</code> in decode mode to get back &quot;Hello&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Learning how computers represent text at the bit level.</li>
          <li>Decoding binary strings found in puzzles, homework, or low-level programming.</li>
          <li>Converting binary code to text when a message, file name, or challenge is given in 1s and 0s.</li>
          <li>Encoding a short message into binary for a puzzle, gift, or novelty project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why 8 bits per character?</Typography>
      <Typography variant="body1">
        8 bits (1 byte) can represent 256 values, enough to cover the standard ASCII character set used for
        basic English text and symbols.
      </Typography>
      <Typography variant="h3">How do I convert binary code to text?</Typography>
      <Typography variant="body1">
        Make sure the tool is in &quot;Binary to Text&quot; (decode) mode, paste your space-separated binary
        (e.g. <code>01001000 01100101</code>) into the input box, and click &quot;Convert to Text&quot; — this
        acts as the translator for binary, turning each 8-bit group back into its matching character.
      </Typography>
      <Typography variant="h3">What format does the binary input need to be in?</Typography>
      <Typography variant="body1">
        Each character should be represented as an 8-bit binary group (only 0s and 1s), with a single space
        between groups — for example <code>01001000 01101001</code> decodes to &quot;Hi&quot;. Binary that
        isn&apos;t space-separated or contains characters other than 0 and 1 will show an error.
      </Typography>
      <Typography variant="h3">Is &quot;bimary translator&quot; the same tool?</Typography>
      <Typography variant="body1">
        Yes — &quot;bimary&quot; is a common typo for &quot;binary.&quot; This binary-to-text translator works
        the same either way: paste your binary or text and convert.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url={url}
      content={content}
    >
      <BinaryConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BinaryConverter;
