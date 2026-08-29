'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const encodeAscii = (input: string): string => {
  if (!input) return '';
  return Array.from(input)
    .map((ch) => String(ch.codePointAt(0)))
    .join(' ');
};

const TextToAsciiContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => encodeAscii(input), [input]);

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
          placeholder="Type or paste text here to convert it to ASCII codes..."
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">ASCII Code Output:</Typography>
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
          placeholder="ASCII codes will appear here automatically..."
          sx={{ '& .MuiInputBase-input': { fontFamily: 'monospace' } }}
        />
      </Box>
    </Box>
  );
};

const TextToAscii = () => {
  const content = (
    <>
      <Typography variant="h2">How to Convert Text to ASCII Codes Online</Typography>
      <Typography variant="body1">
        Type or paste plain text into the box above and each character converts to its decimal ASCII (character)
        code instantly, separated by spaces. Standard letters, numbers, and punctuation map to the classic 0-127
        ASCII range.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>Hello</code> converts to <code>72 101 108 108 111</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating ASCII code lists for programming homework or exercises.</li>
          <li>Creating a code-based puzzle or cipher from a plain-text message.</li>
          <li>Checking the character code of a specific letter or symbol.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this support special characters and emoji?</Typography>
      <Typography variant="body1">
        Yes — characters beyond the standard ASCII range are converted using their full Unicode code point, so
        accented letters, symbols, and emoji all produce a valid numeric code.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between ASCII and Unicode code points?</Typography>
      <Typography variant="body1">
        ASCII covers only the first 128 code points (0-127), while Unicode extends far beyond that to cover
        virtually every character and symbol. This tool outputs the underlying code point for each character,
        which matches ASCII for standard English text.
      </Typography>
      <Typography variant="h3">Does this tool also decode ASCII codes back to text?</Typography>
      <Typography variant="body1">
        This page is encode-only, for a simpler, focused experience. Use our separate ASCII to Text tool if you
        need to convert ASCII code values back into plain text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/text-to-ascii" content={content}>
      <TextToAsciiContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextToAscii;
