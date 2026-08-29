'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const decodeAscii = (raw: string): { text: string; error: string } => {
  const cleaned = raw.trim();
  if (!cleaned) return { text: '', error: '' };

  const codes = cleaned.split(/[\s,]+/);
  if (codes.some((c) => !/^\d+$/.test(c) || Number(c) < 0 || Number(c) > 1114111)) {
    return { text: '', error: 'Enter space or comma-separated decimal ASCII/Unicode code values only.' };
  }

  try {
    const text = codes.map((c) => String.fromCodePoint(Number(c))).join('');
    return { text, error: '' };
  } catch {
    return { text: '', error: 'Could not decode these codes.' };
  }
};

const AsciiToTextContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { text, error } = useMemo(() => decodeAscii(input), [input]);

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
        <Typography variant="subtitle1" fontWeight="600">ASCII Code Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="72 101 108 108 111"
          error={!!error}
          helperText={error || 'Space or comma-separated decimal code values.'}
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

const AsciiToText = () => {
  const content = (
    <>
      <Typography variant="h2">How to Decode ASCII Codes to Text</Typography>
      <Typography variant="body1">
        Paste space or comma-separated decimal ASCII code values into the box above and they decode to plain
        text instantly. Each number is interpreted as a character code, so standard letters, numbers, and
        punctuation decode back to their original characters.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The codes <code>72 101 108 108 111</code> decode to &quot;Hello&quot; — 72 is the ASCII value for
        &quot;H&quot;, 101 for &quot;e&quot;, and so on.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Decoding ASCII code lists from homework, puzzles, or programming exercises.</li>
          <li>Reading character codes copied from a debugger, spreadsheet, or database export.</li>
          <li>Converting a list of code points back into a readable message.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What format should the ASCII codes be in?</Typography>
      <Typography variant="body1">
        Enter decimal (base-10) numbers separated by spaces or commas, for example <code>72 101 108</code>.
        Codes outside the standard ASCII/Unicode range will show an error.
      </Typography>
      <Typography variant="h3">Does this only work with standard ASCII (0-127)?</Typography>
      <Typography variant="body1">
        No — it also accepts extended Unicode code points beyond 127, so codes for accented letters, symbols,
        and other characters decode correctly too.
      </Typography>
      <Typography variant="h3">Does this tool also convert text to ASCII codes?</Typography>
      <Typography variant="body1">
        This page is decode-only, for a simpler, focused experience. Use our separate Text to ASCII tool if you
        need to convert plain text into ASCII code values instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/ascii-to-text" content={content}>
      <AsciiToTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AsciiToText;
