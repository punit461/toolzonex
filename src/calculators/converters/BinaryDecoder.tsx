'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const decodeBinary = (raw: string): { text: string; error: string } => {
  const cleaned = raw.trim();
  if (!cleaned) return { text: '', error: '' };

  const hasSpaces = /\s/.test(cleaned);
  const groups = hasSpaces ? cleaned.split(/\s+/) : cleaned.match(/.{1,8}/g) || [];

  if (groups.some((g) => !/^[01]+$/.test(g))) {
    return { text: '', error: 'Binary can only contain 0s and 1s (with optional spaces between bytes).' };
  }

  try {
    const text = groups.map((g) => String.fromCharCode(parseInt(g, 2))).join('');
    return { text, error: '' };
  } catch {
    return { text: '', error: 'Could not decode this binary string.' };
  }
};

const BinaryDecoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { text, error } = useMemo(() => decodeBinary(input), [input]);

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
        <Typography variant="subtitle1" fontWeight="600">Binary Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="0100100001101001 or 01001000 01101001"
          error={!!error}
          helperText={error || 'Works with space-separated bytes or one continuous binary string.'}
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

const BinaryDecoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Decode Binary to Text</Typography>
      <Typography variant="body1">
        Paste a binary string into the box above and it decodes to plain text instantly — no button to click.
        Unlike a strict binary translator that only accepts space-separated 8-bit groups, this decoder also
        reads one continuous, unspaced binary string (e.g. <code>0100100001101001</code>) by automatically
        splitting it into 8-bit bytes. This page is decode-only; if you need to encode text into binary instead,
        use our dedicated Binary Encoder.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Both <code>01001000 01101001</code> (space-separated) and <code>0100100001101001</code> (continuous)
        decode to &quot;Hi&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Decoding binary strings from puzzles, homework, or CTF challenges regardless of spacing.</li>
          <li>Reading binary output copied from a program that doesn&apos;t insert spaces between bytes.</li>
          <li>Quickly checking what a string of 1s and 0s says without formatting it first.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does the binary need spaces between bytes?</Typography>
      <Typography variant="body1">
        No — this decoder automatically detects whether your input has spaces. If it doesn&apos;t, it splits the
        string into 8-bit groups on its own, so both formats decode correctly.
      </Typography>
      <Typography variant="h3">Why does it only decode, not encode?</Typography>
      <Typography variant="body1">
        Keeping this page decode-only makes it faster and simpler to use for the most common task — reading
        binary back into text. Use our separate Binary Encoder tool to go from text to binary instead.
      </Typography>
      <Typography variant="h3">What happens if my input has an invalid character?</Typography>
      <Typography variant="body1">
        Binary can only contain 0s and 1s. If any other character appears (aside from spaces separating bytes),
        the tool shows an error instead of a partial or incorrect result.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/binary-decoder" content={content}>
      <BinaryDecoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BinaryDecoder;
