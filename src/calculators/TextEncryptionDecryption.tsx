'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextEncryptionDecryptionContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('base64-encode');

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  const processText = () => {
    let output = '';
    
    try {
      switch(mode) {
        case 'base64-encode':
          output = btoa(unescape(encodeURIComponent(text)));
          break;
        case 'base64-decode':
          output = decodeURIComponent(escape(atob(text)));
          break;
        case 'rot13':
          output = rot13(text);
          break;
        case 'hex-encode':
          output = Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
          break;
        case 'hex-decode':
          const hexes = text.replace(/[^0-9a-fA-F]/g, '').match(/.{1,2}/g) || [];
          output = hexes.map(h => String.fromCharCode(parseInt(h, 16))).join('');
          break;
      }
    } catch (e) {
      output = "Error: Invalid input format for the selected decryption method.";
    }
    
    setResult(output);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste text to encrypt or decrypt..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Method</InputLabel>
            <Select
              value={mode}
              label="Method"
              onChange={(e) => setMode(e.target.value)}
            >
              <MenuItem value="base64-encode">Base64 Encode</MenuItem>
              <MenuItem value="base64-decode">Base64 Decode</MenuItem>
              <MenuItem value="rot13">ROT13 Cipher</MenuItem>
              <MenuItem value="hex-encode">Hexadecimal Encode</MenuItem>
              <MenuItem value="hex-decode">Hexadecimal Decode</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={processText} fullWidth size="large">
          Process Text
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          {result && (
             <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
               Copy
             </Button>
          )}
        </Box>
        <TextField
          value={result}
          multiline
          rows={12}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Processed text will appear here..."
        />
      </Box>
    </Box>
  );
};

const TextEncryptionDecryption = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Text Encryption Tool?</Typography>
      <Typography variant="body1">
        Choose a method like Base64 or ROT13, paste your text into the input field, and click "Process". The tool encrypts (or decrypts) your text instantly in your browser. Since this tool is purely client-side, your data never leaves your device.
      </Typography>

      <Typography variant="h2">Supported Algorithms</Typography>
      <Typography variant="body1">
        <ul>
          <li><strong>Base64:</strong> A standard encoding scheme used to securely transmit data across protocols like email or web forms.</li>
          <li><strong>ROT13:</strong> A simple substitution cipher that replaces a letter with the 13th letter after it. Applying it twice yields the original text.</li>
          <li><strong>Hexadecimal:</strong> Converts text into its numerical Hex representations.</li>
        </ul>
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Encryption & Decryption"
      description="Encrypt or decrypt text using Base64, ROT13, and Hexadecimal. Free secure online string cipher tool."
      url="/tools/text-encryption-decryption"
      content={content}
      category="Tools"
    >
      <TextEncryptionDecryptionContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextEncryptionDecryption;
