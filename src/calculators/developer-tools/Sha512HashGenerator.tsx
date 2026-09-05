'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

async function sha512(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const digest = await crypto.subtle.digest('SHA-512', data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

const Sha512HashGeneratorContent = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setHash('');
      return;
    }
    sha512(input).then((h) => { if (!cancelled) setHash(h); });
    return () => { cancelled = true; };
  }, [input]);

  const copy = () => hash && navigator.clipboard.writeText(hash);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Text to hash"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        multiline
        rows={6}
        placeholder="Type or paste any text..."
      />
      <Paper variant="outlined" sx={{ p: 2, position: 'relative', bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', wordBreak: 'break-all', minHeight: 56 }}>
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>SHA-512 hash will appear here...</Typography>}
        <Button
          size="small"
          variant="contained"
          startIcon={<ContentCopyIcon />}
          onClick={copy}
          disabled={!hash}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          Copy
        </Button>
      </Paper>
    </Box>
  );
};

const Sha512HashGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the SHA-512 Hash Generator</Typography>
      <Typography variant="body1">
        Type or paste any text into the input box — the SHA-512 hash is computed live using your browser's
        built-in Web Crypto API (<code>crypto.subtle.digest</code>). SHA-512 produces a fixed 512-bit (128 hex
        character) digest, twice as long as SHA-256, and is part of the same SHA-2 family standardized by
        NIST. Click Copy to grab the resulting hex digest.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing the text <code>hello</code> produces{' '}
        <code>9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying file integrity against a published SHA-512 checksum.</li>
          <li>Generating high-entropy deterministic identifiers where a longer digest is preferred.</li>
          <li>Learning how longer-digest cryptographic hash functions behave with different inputs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is SHA-512 different from SHA-256?</strong> Both belong to the SHA-2 family and use a similar design, but SHA-512 operates on 64-bit words instead of 32-bit words and produces a 512-bit (128 hex character) digest instead of a 256-bit (64 hex character) one. On 64-bit hardware, SHA-512 can actually run faster than SHA-256 despite the longer output.</li>
          <li><strong>Is SHA-512 secure for passwords?</strong> No — like SHA-256, SHA-512 is designed to be fast, which makes it a poor fit for password storage on its own. Use a slow, salted algorithm such as bcrypt or Argon2 for passwords instead.</li>
          <li><strong>Is my text uploaded anywhere?</strong> No — hashing happens entirely client-side using the browser's native Web Crypto API. Nothing you type is sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sha512-hash-generator" content={content}>
      <Sha512HashGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Sha512HashGenerator;
