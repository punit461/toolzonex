'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const encodeUnicode = (input: string): string => {
  if (!input) return '';
  return Array.from(input)
    .map((ch) => {
      const code = ch.codePointAt(0) ?? 0;
      return `U+${code.toString(16).toUpperCase().padStart(4, '0')}`;
    })
    .join(' ');
};

const TextToUnicodeContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => encodeUnicode(input), [input]);

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
          placeholder="Type or paste text here to convert it to Unicode code points..."
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Unicode Output:</Typography>
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
          placeholder="Unicode code points will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const TextToUnicode = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Text to Unicode Code Points</Typography>
      <Typography variant="body1">
        Type or paste plain text into the box above and each character converts to its Unicode code point
        instantly, in the standard <code>U+XXXX</code> format, one per character, separated by spaces.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>Hi</code> converts to <code>U+0048 U+0069</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Looking up the Unicode code point of a specific letter, symbol, or emoji.</li>
          <li>Documenting exact character values for internationalization or font testing.</li>
          <li>Generating Unicode references for programming or linguistics exercises.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does the U+ prefix mean?</Typography>
      <Typography variant="body1">
        <code>U+</code> is the standard notation for a Unicode code point, followed by its hexadecimal value —
        for example <code>U+0041</code> is the code point for the letter &quot;A&quot;.
      </Typography>
      <Typography variant="h3">Does this support emoji and characters outside the Basic Latin range?</Typography>
      <Typography variant="body1">
        Yes — every character, including accented letters, symbols, and emoji, is converted using its full
        Unicode code point, not just the standard ASCII range.
      </Typography>
      <Typography variant="h3">Does this tool also decode Unicode code points back to text?</Typography>
      <Typography variant="body1">
        This page is encode-only, for a simpler, focused experience. Use our separate Unicode to Text tool if
        you need to convert Unicode code points back into plain text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/text-to-unicode" content={content}>
      <TextToUnicodeContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextToUnicode;
