'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// SHA-224 is NOT supported by the browser's native Web Crypto API (crypto.subtle only
// supports SHA-1/256/384/512), so it is implemented here directly. SHA-224 uses the exact
// same compression function as SHA-256, just different initial hash values and a truncated
// 224-bit output (the first 7 of the 8 resulting 32-bit words).

function rightRotate(value: number, amount: number): number {
  return (value >>> amount) | (value << (32 - amount));
}

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];

const SHA224_IV = [
  0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
  0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4,
];

function sha256FamilyCompress(messageBytes: Uint8Array, iv: number[]): number[] {
  const bitLen = messageBytes.length * 8;
  const withOne = messageBytes.length + 1;
  let totalLen = withOne + 8;
  totalLen = Math.ceil(totalLen / 64) * 64;
  const padded = new Uint8Array(totalLen);
  padded.set(messageBytes);
  padded[messageBytes.length] = 0x80;

  const dv = new DataView(padded.buffer);
  const hi = Math.floor(bitLen / 0x100000000);
  const lo = bitLen >>> 0;
  dv.setUint32(totalLen - 8, hi, false);
  dv.setUint32(totalLen - 4, lo, false);

  const h = iv.slice();
  const w = new Uint32Array(64);

  for (let chunk = 0; chunk < totalLen; chunk += 64) {
    for (let i = 0; i < 16; i++) {
      w[i] = dv.getUint32(chunk + i * 4, false);
    }
    for (let i = 16; i < 64; i++) {
      const s0 = rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    let [a, b, c, d, e, f, g, hh] = h;

    for (let i = 0; i < 64; i++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (hh + S1 + ch + K[i] + w[i]) >>> 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;

      hh = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }

    h[0] = (h[0] + a) >>> 0;
    h[1] = (h[1] + b) >>> 0;
    h[2] = (h[2] + c) >>> 0;
    h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0;
    h[5] = (h[5] + f) >>> 0;
    h[6] = (h[6] + g) >>> 0;
    h[7] = (h[7] + hh) >>> 0;
  }

  return h;
}

function sha224(message: string): string {
  const bytes = new TextEncoder().encode(message);
  const h = sha256FamilyCompress(bytes, SHA224_IV);
  return h.slice(0, 7).map((word) => word.toString(16).padStart(8, '0')).join('');
}

const Sha224GeneratorContent = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (!input) {
      setHash('');
      return;
    }
    setHash(sha224(input));
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
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>SHA-224 hash will appear here...</Typography>}
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

const Sha224Generator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the SHA-224 Hash Generator</Typography>
      <Typography variant="body1">
        Type or paste any text into the input box — the SHA-224 hash is computed live and shown as a 56
        hex character digest. SHA-224 uses the exact same internal compression function as SHA-256, but
        starts from different initial hash values and truncates the final result to 224 bits, dropping the
        last 32-bit word of the SHA-256 computation. Because SHA-224 isn't part of the browser's native Web
        Crypto API, this tool computes it with a pure JavaScript implementation of the algorithm, verified
        against the official published test vectors.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing the text <code>abc</code> produces{' '}
        <code>23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7</code>, one of the official published
        SHA-224 test vectors.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a shorter SHA-2 family digest when a specification calls for SHA-224 specifically.</li>
          <li>Verifying interoperability with backend systems or libraries that produce SHA-224 checksums.</li>
          <li>Learning how truncating a SHA-256-style computation produces a distinct, valid digest.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why isn't SHA-224 built into the browser like SHA-256?</strong> The Web Crypto API's <code>crypto.subtle.digest</code> only implements SHA-1, SHA-256, SHA-384, and SHA-512 natively — SHA-224 was left out of the standard. This tool works around that by implementing the SHA-224 algorithm directly in JavaScript, verified against NIST's official test vectors.</li>
          <li><strong>Is SHA-224 just a shortened SHA-256?</strong> Essentially, yes for output length — it runs the identical round function and message schedule as SHA-256, but starts from a different set of eight initial hash values and only outputs the first seven of the eight resulting 32-bit words, giving 224 bits instead of 256.</li>
          <li><strong>Is my text uploaded anywhere?</strong> No — hashing happens entirely client-side in your browser using the JavaScript implementation on this page. Nothing you type is sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/sha224-hash-generator" content={content}>
      <Sha224GeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Sha224Generator;
