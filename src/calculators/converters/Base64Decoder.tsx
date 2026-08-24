'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Typography, TextField, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const Base64DecoderContent = () => {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' };
    try {
      const decoded = decodeURIComponent(escape(atob(input.trim())));
      return { output: decoded, error: '' };
    } catch {
      return { output: '', error: 'This does not look like valid Base64. Check for missing characters or padding.' };
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
        <Typography variant="subtitle1" fontWeight="600">Base64 Input:</Typography>
        <TextField
          multiline
          rows={12}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your Base64 string here to decode it..."
        />
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="600">Decoded Text:</Typography>
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
          placeholder="Decoded text will appear here automatically..."
        />
      </Box>
    </Box>
  );
};

const Base64Decoder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Decode Base64 Online</Typography>
      <Typography variant="body1">
        Paste a Base64-encoded string into the box above and it decodes to plain text instantly — no button to
        click, no upload, and no account needed. This tool only decodes; if you need to encode text into Base64
        instead, use our dedicated Base64 Encoder.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting <code>SGVsbG8gV29ybGQ=</code> decodes instantly to <code>Hello World</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Decoding a Base64 string found in an API response, JWT payload, or config file.</li>
          <li>Reading Base64-encoded email headers or authentication tokens.</li>
          <li>Checking what data is hidden inside a Base64 blob before using it in code.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does decoding fail with an error?</Typography>
      <Typography variant="body1">
        Base64 strings use a strict character set and are usually padded with <code>=</code> to a multiple of 4
        characters. If the pasted text contains line breaks, extra whitespace, or isn&apos;t valid Base64 at all,
        decoding will fail — double-check you copied the full string.
      </Typography>
      <Typography variant="h3">Is this the same as decryption?</Typography>
      <Typography variant="body1">
        No — Base64 is an encoding, not encryption. Anyone can decode it; it provides no security or
        confidentiality, it&apos;s simply a way to represent binary data as plain text.
      </Typography>
      <Typography variant="h3">Does this tool also encode text to Base64?</Typography>
      <Typography variant="body1">
        This page is decode-only, for a simpler, focused experience. Use our separate Base64 Encoder tool if you
        need to convert plain text into Base64.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/converters/base64-decoder" content={content}>
      <Base64DecoderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Base64Decoder;
