'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

async function sha256(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

const Sha256HashGeneratorContent = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setHash('');
      return;
    }
    sha256(input).then((h) => { if (!cancelled) setHash(h); });
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
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>SHA-256 hash will appear here...</Typography>}
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

const Sha256HashGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free SHA-256 Hash Generator</Typography>
      <Typography variant="body1">
        Generate the SHA-256 hash of any text instantly using your browser's built-in Web Crypto API. SHA-256
        produces a fixed 256-bit (64 hex character) digest and is widely used in modern security applications.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type or paste any text into the input box — the SHA-256 hash is computed live as you type using
        <code>crypto.subtle.digest</code>. Click Copy to grab the resulting hex digest.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing the text <code>hello</code> produces
        <code>2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying file integrity against a published SHA-256 checksum.</li>
          <li>Generating deterministic identifiers or content-addressed cache keys.</li>
          <li>Learning how cryptographic hash functions behave with different inputs.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is SHA-256 secure for passwords?</Typography>
      <Typography variant="body1">
        SHA-256 is cryptographically strong but, like MD5 and SHA-1, is designed to be fast — which makes plain
        SHA-256 a poor fit for password storage. Real systems should use a slow, salted algorithm such as
        bcrypt or Argon2 instead.
      </Typography>
      <Typography variant="h3">Is my text uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — hashing happens entirely client-side using the browser's native Web Crypto API. Nothing you type
        is sent to a server.
      </Typography>
      <Typography variant="h3">How is SHA-256 different from MD5?</Typography>
      <Typography variant="body1">
        SHA-256 produces a longer, more collision-resistant digest and has no known practical attacks, unlike
        MD5, which is considered cryptographically broken.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sha256-hash-generator" content={content}>
      <Sha256HashGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Sha256HashGenerator;
