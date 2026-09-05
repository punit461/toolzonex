'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

async function sha384(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const digest = await crypto.subtle.digest('SHA-384', data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

const Sha384HashGeneratorContent = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!input) {
      setHash('');
      return;
    }
    sha384(input).then((h) => { if (!cancelled) setHash(h); });
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
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>SHA-384 hash will appear here...</Typography>}
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

const Sha384HashGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the SHA-384 Hash Generator</Typography>
      <Typography variant="body1">
        Type or paste any text into the input box — the SHA-384 hash is computed live using your browser's
        built-in Web Crypto API (<code>crypto.subtle.digest</code>). SHA-384 is essentially SHA-512 run with
        different initial values and truncated to a 384-bit (96 hex character) digest, giving a shorter output
        while keeping SHA-512's internal strength. Click Copy to grab the resulting hex digest.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing the text <code>hello</code> produces{' '}
        <code>59e1748777448c69de6b800d7a33bbfb9ff1b463e44354c3553bcdb9c666fa90125a3c79f90397bdf5f6a13de828684f</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying file integrity against a published SHA-384 checksum.</li>
          <li>Generating certificate fingerprints or TLS-related digests that specify SHA-384.</li>
          <li>Comparing SHA-384 output against SHA-256 and SHA-512 while learning the SHA-2 family.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is SHA-384 different from SHA-512?</strong> SHA-384 uses the exact same internal algorithm as SHA-512 but starts from different initial hash values and simply truncates the final 512-bit result down to 384 bits (96 hex characters). It is not a completely separate algorithm — it's SHA-512 with a shorter, distinct output.</li>
          <li><strong>Why would someone use SHA-384 instead of SHA-256 or SHA-512?</strong> SHA-384 is commonly required by specific standards and protocols (such as certain TLS cipher suites and certificate fingerprint formats) that call for it by name, and it offers a security margin between SHA-256 and full SHA-512 with a fixed 96-character output.</li>
          <li><strong>Is my text uploaded anywhere?</strong> No — hashing happens entirely client-side using the browser's native Web Crypto API. Nothing you type is sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sha384-hash-generator" content={content}>
      <Sha384HashGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Sha384HashGenerator;
