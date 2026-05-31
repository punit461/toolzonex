'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

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

const BinaryConverter = () => {
  const content = (
    <>
      <Typography variant="h2">What is Binary Code?</Typography>
      <Typography variant="body1">
        Computers store all data using the binary system, which is a base-2 number system composed of only two digits: 0 and 1. This tool allows you to convert human-readable text into 8-bit binary representation, and vice-versa, making it a great educational tool for understanding how computers process information.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Binary to Text Converter"
      description="Easily convert binary code to plain text or encode text into binary. Free online binary translation tool."
      url="/tools/binary-to-text"
      content={content}
      category="Tools"
    >
      <BinaryConverterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BinaryConverter;
