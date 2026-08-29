'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const decodeUnicode = (raw: string): { text: string; error: string } => {
  const cleaned = raw.trim();
  if (!cleaned) return { text: '', error: '' };

  const tokens = cleaned.split(/[\s,]+/);
  const codes: number[] = [];

  for (const token of tokens) {
    const stripped = token.replace(/^U\+/i, '');
    if (!/^[0-9a-fA-F]+$/.test(stripped)) {
      return { text: '', error: 'Enter Unicode code points like U+0048 or 0048, separated by spaces.' };
    }
    codes.push(parseInt(stripped, 16));
  }

  try {
    const text = codes.map((c) => String.fromCodePoint(c)).join('');
    return { text, error: '' };
  } catch {
    return { text: '', error: 'Could not decode these code points.' };
  }
};

const UnicodeToTextContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { text, error } = useMemo(() => decodeUnicode(input), [input]);

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
        <Typography variant="subtitle1" fontWeight="600">Unicode Code Point Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="U+0048 U+0069 or 0048 0069"
          error={!!error}
          helperText={error || 'Accepts U+XXXX or plain hex, space or comma-separated.'}
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

const UnicodeToText = () => {
  const content = (
    <>
      <Typography variant="h2">How to Decode Unicode Code Points to Text</Typography>
      <Typography variant="body1">
        Paste Unicode code points into the box above and they decode to plain text instantly. Both the standard
        <code>U+XXXX</code> format and plain hexadecimal (e.g. <code>0048</code>) are accepted, separated by
        spaces or commas.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Both <code>U+0048 U+0069</code> and <code>0048 0069</code> decode to &quot;Hi&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reading a message shared as a list of Unicode code points.</li>
          <li>Turning code point references from documentation or font testing back into readable text.</li>
          <li>Decoding character codes found in programming or linguistics exercises.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Do I need to include the U+ prefix?</Typography>
      <Typography variant="body1">
        No — the tool accepts code points with or without the <code>U+</code> prefix, as long as the hex digits
        themselves are correct.
      </Typography>
      <Typography variant="h3">Can this decode emoji and other complex characters?</Typography>
      <Typography variant="body1">
        Yes — any valid Unicode code point decodes correctly, including emoji, accented letters, and symbols
        outside the Basic Latin range.
      </Typography>
      <Typography variant="h3">Does this tool also convert text into Unicode code points?</Typography>
      <Typography variant="body1">
        This page is decode-only, for a simpler, focused experience. Use our separate Text to Unicode tool if
        you need to convert plain text into Unicode code points instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/unicode-to-text" content={content}>
      <UnicodeToTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UnicodeToText;
