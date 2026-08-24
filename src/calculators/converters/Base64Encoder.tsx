'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const Base64EncoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input) return '';
    try {
      return btoa(unescape(encodeURIComponent(input)));
    } catch {
      return '';
    }
  }, [input]);

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
          placeholder="Type or paste text here to encode it to Base64..."
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Base64 Output:</Typography>
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
          placeholder="Base64 output will appear here automatically..."
        />
      </Box>
    </Box>
  );
};

const Base64Encoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Encode Text to Base64 Online</Typography>
      <Typography variant="body1">
        Type or paste plain text into the box above and it converts to Base64 instantly — no button to click, no
        upload, and no account needed. This tool only encodes; if you need to decode a Base64 string back to
        plain text instead, use our dedicated Base64 Decoder.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing <code>Hello World</code> encodes instantly to <code>SGVsbG8gV29ybGQ=</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Embedding small binary-safe strings directly in JSON, XML, or config files.</li>
          <li>Preparing values for Basic Authentication headers or API tokens.</li>
          <li>Encoding text or credentials for safe transport through systems that only accept plain text.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is Base64 encoding secure?</Typography>
      <Typography variant="body1">
        No — Base64 is an encoding, not encryption. It&apos;s trivially reversible by anyone, so it should never
        be used to protect sensitive data; it&apos;s meant only for representing binary or text data safely as
        plain text.
      </Typography>
      <Typography variant="h3">Does this support special characters and emoji?</Typography>
      <Typography variant="body1">
        Yes — the input is UTF-8 encoded before conversion, so accented letters, symbols, and emoji encode and
        decode correctly.
      </Typography>
      <Typography variant="h3">Does this tool also decode Base64?</Typography>
      <Typography variant="body1">
        This page is encode-only, for a simpler, focused experience. Use our separate Base64 Decoder tool if you
        need to convert a Base64 string back into plain text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/base64-encoder" content={content}>
      <Base64EncoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Base64Encoder;
