'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const encodeBinary = (input: string): string => {
  if (!input) return '';
  return Array.from(input)
    .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
};

const BinaryEncoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => encodeBinary(input), [input]);

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
          placeholder="Type or paste text here to encode it to binary..."
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Binary Output:</Typography>
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
          placeholder="Binary output will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const BinaryEncoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Encode Text to Binary Online</Typography>
      <Typography variant="body1">
        Type or paste plain text into the box above and it converts to 8-bit binary instantly, with each
        character&apos;s binary byte separated by a space. This tool only encodes; if you need to decode a
        binary string back into text instead, use our dedicated Binary Decoder.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>Hi</code> encodes to <code>01001000 01101001</code> — each letter becomes its own 8-bit
        byte based on its ASCII value.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Learning how computers represent text at the bit level.</li>
          <li>Creating a binary-encoded message for a puzzle, gift, or novelty project.</li>
          <li>Generating binary test data for programming exercises or homework.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why 8 bits per character?</Typography>
      <Typography variant="body1">
        8 bits (1 byte) can represent 256 values, enough to cover the standard ASCII character set used for
        basic English text and symbols.
      </Typography>
      <Typography variant="h3">Does this support special characters and emoji?</Typography>
      <Typography variant="body1">
        Each character is encoded using its underlying character code, so standard letters, numbers, and
        punctuation all encode correctly. Multi-byte characters like emoji may produce multiple binary bytes.
      </Typography>
      <Typography variant="h3">Does this tool also decode binary back to text?</Typography>
      <Typography variant="body1">
        This page is encode-only, for a simpler, focused experience. Use our separate Binary Decoder tool if you
        need to convert a binary string back into plain text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/binary-encoder" content={content}>
      <BinaryEncoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BinaryEncoder;
