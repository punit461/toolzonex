'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Paper, ToggleButtonGroup, ToggleButton, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Standard MD5 (RFC 1321) — see Wikipedia's MD5 pseudocode for the reference algorithm.
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

async function webCryptoHash(algo: 'SHA-1' | 'SHA-256', message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const digest = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

type Algo = 'MD5' | 'SHA-1' | 'SHA-256';

const PasswordHashGeneratorContent = () => {
  const [password, setPassword] = useState('');
  const [algo, setAlgo] = useState<Algo>('SHA-256');
  const [hash, setHash] = useState('');

  useEffect(() => {
    let cancelled = false;
    if (!password) {
      setHash('');
      return;
    }
    if (algo === 'MD5') {
      setHash(md5(password));
    } else {
      webCryptoHash(algo, password).then((h) => { if (!cancelled) setHash(h); });
    }
    return () => { cancelled = true; };
  }, [password, algo]);

  const copy = () => hash && navigator.clipboard.writeText(hash);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Alert severity="warning">
        Educational/testing tool only. Never use a plain MD5/SHA-1/SHA-256 hash to store real user passwords —
        see the FAQ below for why.
      </Alert>
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        placeholder="Enter a password to hash..."
      />
      <ToggleButtonGroup value={algo} exclusive size="small" onChange={(_, v) => v && setAlgo(v)}>
        <ToggleButton value="MD5">MD5</ToggleButton>
        <ToggleButton value="SHA-1">SHA-1</ToggleButton>
        <ToggleButton value="SHA-256">SHA-256</ToggleButton>
      </ToggleButtonGroup>
      <Paper variant="outlined" sx={{ p: 2, position: 'relative', bgcolor: 'grey.900', color: '#10b981', fontFamily: 'monospace', wordBreak: 'break-all', minHeight: 56 }}>
        {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>Hash will appear here...</Typography>}
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

const PasswordHashGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Password Hash Generator (Educational)</Typography>
      <Typography variant="body1">
        Hash a password with MD5, SHA-1, or SHA-256 to see what a raw, unsalted hash looks like. This tool is
        for learning and testing — it is not how real applications should store passwords.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Type a password, pick an algorithm, and the resulting hash is computed live in your browser. Copy the
        hash to compare against test fixtures or study how hash output changes with the input.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing <code>password123</code> with SHA-256 always produces the exact same 64-character hex digest —
        which is precisely why plain hashing alone is unsafe for passwords (see FAQ).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Learning how MD5, SHA-1, and SHA-256 differ in output length and format.</li>
          <li>Generating test fixtures for unit tests that check against a known hash.</li>
          <li>Demonstrating why unsalted password hashing is insecure, in a classroom or workshop.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this how real systems should store passwords?</Typography>
      <Typography variant="body1">
        No. A plain MD5, SHA-1, or SHA-256 hash of a password is fast to compute — which means an attacker with
        a leaked database can try billions of guesses per second against it. Real systems must use a slow,
        purpose-built, salted algorithm like bcrypt, scrypt, or Argon2, which are deliberately expensive to
        brute-force and include a unique salt per user to defeat precomputed lookup tables. This tool exists
        purely to show what a raw hash looks like, for learning and testing.
      </Typography>
      <Typography variant="h3">What does "salted" mean?</Typography>
      <Typography variant="body1">
        A salt is random data mixed into the password before hashing, unique per user. It ensures two users
        with the same password get different hashes, and defeats precomputed "rainbow table" attacks. This
        tool does not add a salt — it hashes the raw password only, for demonstration purposes.
      </Typography>
      <Typography variant="h3">Is my password uploaded anywhere?</Typography>
      <Typography variant="body1">
        No — hashing happens entirely client-side in your browser. Nothing you type is sent to a server. Still,
        avoid entering a real password you actually use anywhere else.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/password-hash-generator" content={content}>
      <PasswordHashGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PasswordHashGenerator;
