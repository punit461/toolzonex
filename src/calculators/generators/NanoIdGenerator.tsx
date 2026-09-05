'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DEFAULT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

// Unbiased selection via rejection sampling: compute the smallest bitmask that covers the
// alphabet's index range, draw random bytes, mask them, and only accept a byte whose masked
// value actually indexes into the alphabet — rejecting (and redrawing) anything outside it.
// This avoids the modulo-bias that `byte % alphabet.length` would introduce.
function generateNanoId(size: number, alphabet: string): string {
  const len = alphabet.length;
  if (len < 1) return '';
  const bits = Math.ceil(Math.log2(len));
  const mask = (2 << (bits - 1)) - 1;
  // Draw a comfortably oversized batch so we rarely need a second round of random bytes.
  const step = Math.ceil((1.6 * mask * size) / len) || size;

  let id = '';
  while (true) {
    const bytes = new Uint8Array(step);
    crypto.getRandomValues(bytes);
    for (let i = 0; i < step; i++) {
      const candidate = bytes[i] & mask;
      if (candidate < len) {
        id += alphabet[candidate];
        if (id.length === size) return id;
      }
    }
  }
}

const NanoIdGeneratorContent = () => {
  const [length, setLength] = useState(21);
  const [alphabet, setAlphabet] = useState(DEFAULT_ALPHABET);
  const [ids, setIds] = useState<string[]>([]);

  const uniqueAlphabet = Array.from(new Set(alphabet.split(''))).join('') || DEFAULT_ALPHABET;
  const safeLength = Math.min(Math.max(length || 1, 1), 128);

  const generate = () => {
    setIds(Array.from({ length: 5 }, () => generateNanoId(safeLength, uniqueAlphabet)));
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyAll = () => ids.length && navigator.clipboard.writeText(ids.join('\n'));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="ID Length"
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10) || 1)}
          fullWidth
          helperText="Nano ID's real-world default is 21 characters."
          inputProps={{ min: 1, max: 128 }}
        />
        <TextField
          label="Custom Alphabet"
          value={alphabet}
          onChange={(e) => setAlphabet(e.target.value)}
          fullWidth
          multiline
          helperText={`${uniqueAlphabet.length} unique characters. Default is the standard URL-safe Nano ID alphabet.`}
        />
        <Button variant="contained" onClick={generate} fullWidth size="large" startIcon={<RefreshIcon />}>
          Generate IDs
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Generated Nano IDs:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>Copy All</Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 2, fontFamily: 'monospace', minHeight: 180 }}>
          {ids.map((id, i) => (
            <Typography key={i} sx={{ fontFamily: 'inherit', wordBreak: 'break-all', mb: 0.5 }}>{id}</Typography>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

const NanoIdGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Nano ID Generator</Typography>
      <Typography variant="body1">
        Set your desired ID length (21 characters is Nano ID's standard real-world default) and, optionally,
        a custom character alphabet — the default is the standard URL-safe Nano ID alphabet of 64 characters
        (<code>A-Za-z0-9_-</code>). Click Generate to produce fresh IDs using <code>crypto.getRandomValues</code>{' '}
        with unbiased rejection sampling: each random byte is masked down to the smallest range that covers
        the alphabet, and any byte that falls outside the alphabet's actual length is discarded and redrawn,
        so every character in the alphabet has exactly equal probability — unlike a naive{' '}
        <code>byte % alphabet.length</code> approach, which subtly favors some characters over others.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Generating a 21-character ID with the default alphabet produces something like{' '}
        <code>V1StGXR8_Z5jdHi6B-myT</code> — short, URL-safe, and with negligible collision probability at
        typical usage volumes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating short, URL-safe IDs for use directly in URLs, slugs, or short links.</li>
          <li>Creating compact database primary keys or object IDs for a web application.</li>
          <li>Producing unique client-side identifiers where a full UUID would be longer than needed.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is a Nano ID different from a UUID?</strong> A UUID (see our <a href="/generators/uuid-generator">UUID Generator</a>) is a fixed 36-character format with hyphens and specific version/variant bits baked in, always the same length regardless of use case. A Nano ID is shorter by default, fully customizable in length and character set, and URL-safe out of the box — which is why it's commonly used for IDs that show up directly in URLs or database keys in modern web apps.</li>
          <li><strong>Is a shorter Nano ID less safe from collisions than a UUID?</strong> At the default 21-character length with the 64-character alphabet, collision probability is still astronomically low for virtually any realistic application — comparable in practice to UUID v4. Shortening the length or alphabet further trades off some collision resistance for a shorter ID, so pick a length appropriate to how many IDs you expect to generate.</li>
          <li><strong>Why does the alphabet need to be unbiased?</strong> If you map a random byte onto the alphabet with a plain modulo operation, characters near the start of the alphabet get selected very slightly more often whenever 256 isn't evenly divisible by the alphabet length. Rejection sampling discards those uneven leftover byte values instead of using them, so every character has exactly equal probability.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/nano-id-generator" content={content}>
      <NanoIdGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NanoIdGenerator;
