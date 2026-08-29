'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup, Alert } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type CharsetKey = 'hex' | 'alphanumeric';

const CHARSETS: Record<CharsetKey, string> = {
  hex: '0123456789abcdef',
  alphanumeric: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
};

const LENGTHS = [16, 32, 64];

function generateRandomHash(length: number, charset: string): string {
  const charsetLength = charset.length;
  const bytes = new Uint32Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 4294967296);
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[bytes[i] % charsetLength];
  }
  return result;
}

const RandomHashGeneratorContent = () => {
  const [charsetKey, setCharsetKey] = useState<CharsetKey>('hex');
  const [length, setLength] = useState(32);
  const [hash, setHash] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setHash(generateRandomHash(length, CHARSETS[charsetKey]));
    setCopied(false);
  };

  const copy = async () => {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; silently ignore
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5 }}>Character set</Typography>
        <ToggleButtonGroup exclusive value={charsetKey} onChange={(_, val) => { if (val) setCharsetKey(val); }}>
          <ToggleButton value="hex" sx={{ textTransform: 'none' }}>Hex (0-9, a-f)</ToggleButton>
          <ToggleButton value="alphanumeric" sx={{ textTransform: 'none' }}>Alphanumeric</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5 }}>Length</Typography>
        <ToggleButtonGroup exclusive value={length} onChange={(_, val) => { if (val) setLength(val); }}>
          {LENGTHS.map((len) => (
            <ToggleButton key={len} value={len} sx={{ textTransform: 'none' }}>{len} chars</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Generate Random Hash
        </Button>
      </Box>

      {hash && (
        <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Typography sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{hash}</Typography>
          <Button size="small" startIcon={<ContentCopyIcon fontSize="small" />} onClick={copy} sx={{ flexShrink: 0 }}>
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </Paper>
      )}

      <Alert severity="info">
        This generates a random-looking string for use as a test identifier or token — it is not a
        cryptographic hash of any input you provide.
      </Alert>
    </Box>
  );
};

const RandomHashGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Hash Generator Works</Typography>
      <Typography variant="body1">
        This tool generates a random hex or alphanumeric string of your chosen length (16, 32, or 64
        characters), using your browser&apos;s cryptographically secure random number source
        (<code>crypto.getRandomValues</code>) so the output is genuinely random and unpredictable, not just a
        pseudo-random sequence.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choose a character set — Hex (0-9 and a-f) or Alphanumeric (letters and numbers).</li>
          <li>Choose a length — 16, 32, or 64 characters.</li>
          <li>Click &quot;Generate Random Hash&quot; and copy the result.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 32-character hex result might look like &quot;a13f9c2e8b0d47f6a91c5e3d2b7f8016&quot; — a random
        string the same length and shape as many real hash outputs, but not derived from any input.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating placeholder IDs or tokens for testing an app or API.</li>
          <li>Creating random-looking identifiers for mock data or sample database records.</li>
          <li>Filling in a field that expects a hash-shaped value during development or QA.</li>
          <li>Producing a random string for a temporary file name, cache key, or test fixture.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this a real hash of something I typed?</Typography>
      <Typography variant="body1">
        No — this tool does not accept any input to hash. It generates a random-looking string of the length
        and character set you choose, for use as a test identifier or token, not a cryptographic hash (like
        SHA-256) of actual data. If you need to hash real input, use a dedicated hash generator tool instead.
      </Typography>
      <Typography variant="h3">How random is the output?</Typography>
      <Typography variant="body1">
        It uses your browser&apos;s <code>crypto.getRandomValues</code> API, a cryptographically secure random
        number source, rather than the weaker <code>Math.random()</code>, so the output is genuinely
        unpredictable.
      </Typography>
      <Typography variant="h3">Can two generated hashes be the same?</Typography>
      <Typography variant="body1">
        It is possible in theory, but extremely unlikely at 32 or 64 characters — the pool of possible
        combinations is astronomically large.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-hash-generator" content={content}>
      <RandomHashGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomHashGenerator;
