'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const decodeHex = (raw: string): { text: string; error: string } => {
  const cleaned = raw.trim().replace(/0x/gi, '').replace(/[\s,]+/g, '');
  if (!cleaned) return { text: '', error: '' };

  if (!/^[0-9a-fA-F]+$/.test(cleaned) || cleaned.length % 2 !== 0) {
    return { text: '', error: 'Hex input must contain only hex digits (0-9, A-F) in pairs.' };
  }

  try {
    const bytes = cleaned.match(/.{1,2}/g) || [];
    const byteArray = new Uint8Array(bytes.map((b) => parseInt(b, 16)));
    const text = new TextDecoder('utf-8').decode(byteArray);
    return { text, error: '' };
  } catch {
    return { text: '', error: 'Could not decode this hex string.' };
  }
};

const HexToTextContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { text, error } = useMemo(() => decodeHex(input), [input]);

  const copyToClipboard = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="600">Hex Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="48 65 6c 6c 6f or 48656c6c6f"
          error={!!error}
          helperText={error || 'Spaces, commas, and 0x prefixes are ignored automatically.'}
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Decoded Text:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyToClipboard} disabled={!text}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={text}
          InputProps={{ readOnly: true }}
          placeholder="Decoded text will appear here automatically..."
        />
      </Box>
    </Box>
  );
};

const HexToText = () => {
  const content = (
    <>
      <Typography variant="h2">How to Decode Hex to Text</Typography>
      <Typography variant="body1">
        Paste a hexadecimal string into the box above and it decodes to plain text instantly. Each pair of hex
        digits represents one byte, which is interpreted as UTF-8 so accented letters and symbols decode
        correctly. Spaces, commas, and <code>0x</code> prefixes between pairs are ignored automatically.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The hex string <code>48 65 6c 6c 6f</code> (or <code>48656c6c6f</code> without spaces) decodes to
        &quot;Hello&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading hex-encoded strings found in network packets, logs, or memory dumps.</li>
          <li>Decoding hex data copied from a debugger or programming exercise.</li>
          <li>Solving puzzles, CTF challenges, or escape rooms that hide messages in hex.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does the hex string need spaces between bytes?</Typography>
      <Typography variant="body1">
        No — you can paste hex with spaces, commas, or <code>0x</code> prefixes between byte pairs, or one
        continuous string with no separators at all. All of these formats decode correctly.
      </Typography>
      <Typography variant="h3">What if my hex string has an odd number of digits?</Typography>
      <Typography variant="body1">
        Hex bytes are always represented by two digits, so a string with an odd digit count is invalid and the
        tool shows an error instead of guessing at a partial byte.
      </Typography>
      <Typography variant="h3">Does this tool also encode text to hex?</Typography>
      <Typography variant="body1">
        This page is decode-only, for a simpler, focused experience. Use our separate Text to Hex tool if you
        need to convert plain text into a hex string instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/hex-to-text" content={content}>
      <HexToTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HexToText;
