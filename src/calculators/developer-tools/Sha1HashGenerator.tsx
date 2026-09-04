'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

async function sha1(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const digest = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

const Sha1HashGeneratorContent = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setHash('');
      return;
    }
    sha1(input).then((h) => { if (!cancelled) setHash(h); });
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
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>SHA-1 hash will appear here...</Typography>}
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

const Sha1HashGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free SHA-1 Hash Generator</Typography>
      <Typography variant="body1">
        Generate the SHA-1 hash of any text instantly using your browser&apos;s built-in Web Crypto API. SHA-1
        produces a fixed 160-bit (40 hex character) digest and remains widely used for legacy checksums, Git
        object IDs, and other non-security-critical fingerprinting, even though it&apos;s no longer considered
        secure against determined attackers.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type or paste any text into the input box — the SHA-1 hash is computed live as you type using
        <code>crypto.subtle.digest</code>. Click Copy to grab the resulting hex digest.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing the text <code>hello</code> produces
        <code>aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying file integrity against a published SHA-1 checksum.</li>
          <li>Understanding how Git computes its commit and object hashes.</li>
          <li>Generating deterministic identifiers for legacy systems that expect SHA-1.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is SHA-1 secure for passwords?</Typography>
      <Typography variant="body1">
        No — like MD5, SHA-1 is fast to compute and has known collision attacks, which makes plain SHA-1 a poor
        fit for password storage. Real systems should use a slow, salted algorithm such as bcrypt or Argon2
        instead.
      </Typography>
      <Typography variant="h3">Is my text uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — hashing happens entirely client-side using the browser&apos;s native Web Crypto API. Nothing you
        type is sent to a server.
      </Typography>
      <Typography variant="h3">How is SHA-1 different from SHA-256?</Typography>
      <Typography variant="body1">
        SHA-1 produces a shorter 160-bit digest and has publicly demonstrated collision attacks, while SHA-256
        produces a longer 256-bit digest with no known practical attacks — which is why SHA-256 is generally
        preferred for anything security-sensitive today.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sha1-hash-generator" content={content}>
      <Sha1HashGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Sha1HashGenerator;
