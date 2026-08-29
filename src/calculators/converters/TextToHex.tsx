'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const encodeHex = (input: string): string => {
  if (!input) return '';
  const bytes = new TextEncoder().encode(input);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ');
};

const TextToHexContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => encodeHex(input), [input]);

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
          placeholder="Type or paste text here to encode it to hex..."
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Hex Output:</Typography>
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
          placeholder="Hex output will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const TextToHex = () => {
  const content = (
    <>
      <Typography variant="h2">How to Encode Text to Hex Online</Typography>
      <Typography variant="body1">
        Type or paste plain text into the box above and it converts to a hexadecimal string instantly. The text
        is UTF-8 encoded first, then each byte is represented as a two-digit hex pair separated by a space, so
        accented letters, symbols, and emoji all encode correctly.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>Hello</code> encodes to <code>48 65 6c 6c 6f</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating hex test data for network protocols, firmware, or low-level programming.</li>
          <li>Embedding a short message as hex bytes in a config file or memory dump.</li>
          <li>Creating hex-encoded strings for puzzles, CTF challenges, or escape rooms.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is each character shown as two hex digits?</Typography>
      <Typography variant="body1">
        A single byte (8 bits) is always represented by exactly two hex digits, since each hex digit covers 4
        bits — so two digits together cover a full byte&apos;s range of values.
      </Typography>
      <Typography variant="h3">Does this support special characters and emoji?</Typography>
      <Typography variant="body1">
        Yes — the input is UTF-8 encoded before conversion, so accented letters, symbols, and emoji encode
        correctly, sometimes producing multiple hex byte pairs per character.
      </Typography>
      <Typography variant="h3">Does this tool also decode hex back to text?</Typography>
      <Typography variant="body1">
        This page is encode-only, for a simpler, focused experience. Use our separate Hex to Text tool if you
        need to convert a hex string back into plain text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/text-to-hex" content={content}>
      <TextToHexContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextToHex;
