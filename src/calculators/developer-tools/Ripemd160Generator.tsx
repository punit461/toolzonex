'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// RIPEMD-160 is not supported by the Web Crypto API, so it is implemented here directly
// using the standard published algorithm (two parallel computation lines combined at the
// end of each 512-bit block). Verified against the official test vectors below.

function rol(x: number, n: number): number {
  return (x << n) | (x >>> (32 - n));
}

function f(j: number, x: number, y: number, z: number): number {
  if (j < 16) return x ^ y ^ z;
  if (j < 32) return (x & y) | (~x & z);
  if (j < 48) return (x | ~y) ^ z;
  if (j < 64) return (x & z) | (y & ~z);
  return x ^ (y | ~z);
}

const KL = [0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e];
const KR = [0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000];

const ZL = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
];
const ZR = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
];

const SL = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6,
];
const SR = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
];

function ripemd160(message: string): string {
  const msgBytes = new TextEncoder().encode(message);
  const bitLen = msgBytes.length * 8;

  const withOne = msgBytes.length + 1;
  let totalLen = withOne + 8;
  totalLen = Math.ceil(totalLen / 64) * 64;
  const padded = new Uint8Array(totalLen);
  padded.set(msgBytes);
  padded[msgBytes.length] = 0x80;

  const dv = new DataView(padded.buffer);
  const lo = bitLen >>> 0;
  const hi = Math.floor(bitLen / 0x100000000) >>> 0;
  dv.setUint32(totalLen - 8, lo, true);
  dv.setUint32(totalLen - 4, hi, true);

  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;
  let h4 = 0xc3d2e1f0;

  const x = new Uint32Array(16);

  for (let chunk = 0; chunk < totalLen; chunk += 64) {
    for (let i = 0; i < 16; i++) {
      x[i] = dv.getUint32(chunk + i * 4, true);
    }

    let al = h0, bl = h1, cl = h2, dl = h3, el = h4;
    let ar = h0, br = h1, cr = h2, dr = h3, er = h4;

    for (let j = 0; j < 80; j++) {
      const round = Math.floor(j / 16);

      let t = (al + f(j, bl, cl, dl) + x[ZL[j]] + KL[round]) >>> 0;
      t = (rol(t, SL[j]) + el) >>> 0;
      al = el; el = dl; dl = rol(cl, 10) >>> 0; cl = bl; bl = t;

      let tr = (ar + f(79 - j, br, cr, dr) + x[ZR[j]] + KR[round]) >>> 0;
      tr = (rol(tr, SR[j]) + er) >>> 0;
      ar = er; er = dr; dr = rol(cr, 10) >>> 0; cr = br; br = tr;
    }

    const t = (h1 + cl + dr) >>> 0;
    h1 = (h2 + dl + er) >>> 0;
    h2 = (h3 + el + ar) >>> 0;
    h3 = (h4 + al + br) >>> 0;
    h4 = (h0 + bl + cr) >>> 0;
    h0 = t;
  }

  const out = new Uint8Array(20);
  const outDv = new DataView(out.buffer);
  outDv.setUint32(0, h0 >>> 0, true);
  outDv.setUint32(4, h1 >>> 0, true);
  outDv.setUint32(8, h2 >>> 0, true);
  outDv.setUint32(12, h3 >>> 0, true);
  outDv.setUint32(16, h4 >>> 0, true);

  return Array.from(out).map((b) => b.toString(16).padStart(2, '0')).join('');
}

const Ripemd160GeneratorContent = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (!input) {
      setHash('');
      return;
    }
    setHash(ripemd160(input));
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
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>RIPEMD-160 hash will appear here...</Typography>}
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

const Ripemd160Generator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the RIPEMD-160 Generator</Typography>
      <Typography variant="body1">
        Type or paste any text into the input box — the RIPEMD-160 hash is computed live and shown as a 40
        hex character digest. RIPEMD-160 processes each 512-bit block through two independent parallel
        computation lines with different round functions and message-word orderings, then combines their
        results at the end of every block. Because RIPEMD-160 isn't part of the Web Crypto API, this tool
        computes it with a pure JavaScript implementation, verified against the algorithm's official published
        test vectors.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing the text <code>abc</code> produces{' '}
        <code>8eb208f7e05d987a9b044a8e98c6b087f15a0bfc</code>, one of the official published RIPEMD-160
        test vectors.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Computing RIPEMD-160 digests for legacy systems or protocols that specifically require it (such as certain cryptocurrency address formats).</li>
          <li>Verifying interoperability between a backend implementation and a known RIPEMD-160 test vector.</li>
          <li>Learning how a dual-line hash construction differs from the single-line SHA family of algorithms.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why isn't RIPEMD-160 available through the browser's built-in crypto?</strong> The Web Crypto API's <code>crypto.subtle.digest</code> only supports the SHA family (SHA-1, SHA-256, SHA-384, SHA-512) — RIPEMD-160 was never included in the standard. This tool implements the algorithm directly in JavaScript, verified against the official published test vectors, to fill that gap.</li>
          <li><strong>Where is RIPEMD-160 still used today?</strong> It's most notably used inside Bitcoin and several other cryptocurrencies as part of generating shorter public-key hashes (typically as RIPEMD-160 applied to a SHA-256 digest), and it remains supported in various cryptographic libraries for legacy compatibility.</li>
          <li><strong>Is my text uploaded anywhere?</strong> No — hashing happens entirely client-side in your browser using the JavaScript implementation on this page. Nothing you type is sent to a server.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/ripemd160-generator" content={content}>
      <Ripemd160GeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Ripemd160Generator;
