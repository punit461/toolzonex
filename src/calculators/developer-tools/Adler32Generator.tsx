'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MOD_ADLER = 65521;

function adler32(message: string): string {
  const bytes = new TextEncoder().encode(message);
  let a = 1;
  let b = 0;
  for (let i = 0; i < bytes.length; i++) {
    a = (a + bytes[i]) % MOD_ADLER;
    b = (b + a) % MOD_ADLER;
  }
  const checksum = (((b << 16) | a) >>> 0);
  return checksum.toString(16).padStart(8, '0');
}

const Adler32GeneratorContent = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (!input) {
      setHash('');
      return;
    }
    setHash(adler32(input));
  }, [input]);

  const copy = () => hash && navigator.clipboard.writeText(hash);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Text to checksum"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        multiline
        rows={6}
        placeholder="Type or paste any text..."
      />
      <Paper variant="outlined" sx={{ p: 2, position: 'relative', bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', wordBreak: 'break-all', minHeight: 56 }}>
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>Adler-32 checksum will appear here...</Typography>}
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

const Adler32Generator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Adler-32 Generator</Typography>
      <Typography variant="body1">
        Type or paste any text into the input box — the Adler-32 checksum is computed live and shown as an
        8 hex character value. Adler-32 keeps two running sums as it processes each byte: a simple sum of
        all bytes (plus 1), and a running sum of that first sum, both taken modulo the prime 65521. The two
        16-bit sums are then combined into a single 32-bit checksum by placing the second sum in the high
        16 bits and the first sum in the low 16 bits.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.85rem' }}>
        A = (1 + Σ byte) mod 65521 &nbsp;|&nbsp; B = (Σ A) mod 65521 &nbsp;|&nbsp; Checksum = (B &lt;&lt; 16) | A
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing the text <code>Wikipedia</code> produces the checksum <code>11e60398</code>, a widely
        published Adler-32 reference value.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Quickly detecting accidental data corruption in a file or data stream (as used inside zlib and PNG-related tooling).</li>
          <li>Comparing two versions of a text block for equality without a full byte-by-byte diff.</li>
          <li>Learning how a fast, non-cryptographic checksum algorithm works compared to cryptographic hash functions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is Adler-32 a cryptographic hash?</strong> No — Adler-32 is a simple checksum designed for fast error detection, not security. It is not resistant to intentional tampering and should never be used for password storage, digital signatures, or any security-sensitive purpose. Use SHA-256 or SHA-512 for those.</li>
          <li><strong>How is Adler-32 different from a CRC checksum?</strong> Both are fast, non-cryptographic checksums used for error detection, but they use different mathematical constructions. Adler-32 is generally faster to compute in software than CRC-32, though CRC-32 offers somewhat stronger error-detection guarantees for certain error patterns — Adler-32 is famously used inside the zlib compression library specifically for its speed.</li>
          <li><strong>Is my text uploaded anywhere?</strong> No — the checksum is computed entirely client-side in your browser. Nothing you type is sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/adler32-generator" content={content}>
      <Adler32GeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Adler32Generator;
