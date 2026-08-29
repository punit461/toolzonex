'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Standard MD5 (RFC 1321) implementation — see Wikipedia's MD5 pseudocode.
// JS bitwise ops already wrap to 32 bits, so plain `|0` addition is a safe
// substitute for the algorithm's mod-2^32 addition.
function md5(message: string): string {
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const K = new Int32Array(64);
  for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);

  const rotateLeft = (x: number, c: number) => (x << c) | (x >>> (32 - c));
  const toHex = (num: number) => {
    let s = '';
    for (let i = 0; i <= 3; i++) s += (((num >>> (i * 8)) & 255) + 0x100).toString(16).slice(1);
    return s;
  };

  const utf8 = unescape(encodeURIComponent(message));
  const bytes: number[] = [];
  for (let i = 0; i < utf8.length; i++) bytes.push(utf8.charCodeAt(i));
  const bitLen = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0);
  for (let i = 0; i < 4; i++) bytes.push((bitLen >>> (8 * i)) & 0xff);
  for (let i = 0; i < 4; i++) bytes.push(0);

  let a0 = 0x67452301, b0 = 0xefcdab89, c0 = 0x98badcfe, d0 = 0x10325476;

  for (let chunk = 0; chunk < bytes.length; chunk += 64) {
    const M = new Array(16);
    for (let j = 0; j < 16; j++) {
      M[j] = bytes[chunk + j * 4] | (bytes[chunk + j * 4 + 1] << 8) | (bytes[chunk + j * 4 + 2] << 16) | (bytes[chunk + j * 4 + 3] << 24);
    }
    let A = a0, B = b0, C = c0, D = d0;
    for (let i = 0; i < 64; i++) {
      let F: number, g: number;
      if (i < 16) { F = (B & C) | (~B & D); g = i; }
      else if (i < 32) { F = (D & B) | (~D & C); g = (5 * i + 1) % 16; }
      else if (i < 48) { F = B ^ C ^ D; g = (3 * i + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7 * i) % 16; }
      F = (F + A + K[i] + M[g]) | 0;
      A = D; D = C; C = B;
      B = (B + rotateLeft(F, S[i])) | 0;
    }
    a0 = (a0 + A) | 0; b0 = (b0 + B) | 0; c0 = (c0 + C) | 0; d0 = (d0 + D) | 0;
  }

  return [a0, b0, c0, d0].map(toHex).join('');
}

const Md5HashGeneratorContent = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    setHash(input ? md5(input) : '');
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
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>MD5 hash will appear here...</Typography>}
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

const Md5HashGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free MD5 Hash Generator</Typography>
      <Typography variant="body1">
        Generate the MD5 hash of any text instantly, entirely in your browser. MD5 produces a fixed 128-bit
        (32 hex character) digest of any input, commonly used for checksums and quick data-integrity checks.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type or paste any text into the input box — the MD5 hash is computed live as you type. Click Copy to
        grab the resulting hex digest.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing the text <code>hello</code> produces <code>5d41402abc4b2a76b9719d911017c592</code> — the same
        input always produces the same 32-character hash.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying a downloaded file's integrity against a published MD5 checksum.</li>
          <li>Generating a quick, non-secret fingerprint for cache keys or deduplication.</li>
          <li>Testing MD5 output while learning about hash functions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is MD5 secure for passwords?</Typography>
      <Typography variant="body1">
        No — MD5 is cryptographically broken and far too fast to resist brute-force attacks. Never use plain
        MD5 to store real passwords; use a slow, salted algorithm like bcrypt or Argon2 instead.
      </Typography>
      <Typography variant="h3">Is my text uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — the hash is computed entirely client-side in your browser using a hand-implemented MD5 algorithm.
        Nothing you type is sent to a server.
      </Typography>
      <Typography variant="h3">Why does MD5 still exist if it's broken?</Typography>
      <Typography variant="body1">
        It remains useful for non-security purposes like checksums, cache keys, and detecting accidental data
        corruption, where resistance to deliberate attacks doesn't matter.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/md5-hash-generator" content={content}>
      <Md5HashGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default Md5HashGenerator;
