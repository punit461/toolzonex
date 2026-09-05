'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Slider, Stack, CircularProgress } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import bcrypt from 'bcryptjs';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BcryptHashGeneratorContent = () => {
  const [input, setInput] = useState('correct horse battery staple');
  const [rounds, setRounds] = useState(10);
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const result = await bcrypt.hash(input, rounds);
      setHash(result);
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!hash) return;
    try { await navigator.clipboard.writeText(hash); } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Text to hash"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
      />

      <Box>
        <Typography variant="body2" gutterBottom>
          Cost / Salt Rounds: {rounds} {rounds >= 12 && '(this will be noticeably slow — that is expected)'}
        </Typography>
        <Slider
          value={rounds}
          onChange={(_, v) => setRounds(v as number)}
          min={4}
          max={12}
          step={1}
          marks
          valueLabelDisplay="auto"
        />
        <Typography variant="caption" color="text.secondary">
          Higher cost values are intentionally much slower to compute — that deliberate slowness is what makes
          bcrypt resistant to brute-force attacks.
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="contained" onClick={generate} disabled={loading || !input}>
          {loading ? 'Computing…' : 'Generate Hash'}
        </Button>
        {loading && <CircularProgress size={24} />}
      </Stack>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Bcrypt Hash</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copy} disabled={!hash}>Copy</Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 60, fontFamily: 'monospace', wordBreak: 'break-all', bgcolor: 'grey.900', color: '#10b981' }}>
          {hash || <Typography color="text.secondary" component="span" sx={{ fontFamily: 'inherit' }}>Click Generate Hash to compute a bcrypt hash…</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

const BcryptHashGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the BCrypt Hash Generator</Typography>
      <Typography variant="body1">
        Enter the plain text you want to hash and choose a cost (salt rounds) value from 4 to 12 — the
        default of 10 is a common real-world choice. Click Generate Hash to compute the bcrypt hash using the
        well-established <code>bcryptjs</code> library, entirely in your browser. Higher cost values take
        noticeably longer to compute; a loading indicator shows while the hash is being calculated.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Hashing &quot;correct horse battery staple&quot; at cost 10 might produce a hash like
        {' '}<code>$2b$10$abcdefghijklmnopqrstuv...</code> — clicking Generate again produces a completely
        different hash string, even for the exact same input text.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Learning how bcrypt password hashing works and experimenting with different cost factors.</li>
          <li>Generating a bcrypt hash for testing an authentication system during development.</li>
          <li>Comparing how much slower a higher cost factor makes hash computation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why use bcrypt instead of a general-purpose hash like SHA-256?</strong> Bcrypt is specifically designed for PASSWORD hashing — unlike general-purpose checksums like SHA-256 or CRC32, which are built to be fast, bcrypt is deliberately slow and has a built-in random salt baked into every hash. This combination makes brute-force and rainbow-table attacks far harder against bcrypt hashes than against a fast, unsalted hash.</li>
          <li><strong>Why does clicking Generate produce a different hash every time, even with the same input?</strong> This is expected bcrypt behavior, not a bug — bcrypt automatically generates a new random salt each time you hash, and that salt is embedded directly in the resulting hash string. Two different hashes of the same password can both still be correctly verified against that same password.</li>
          <li><strong>Is my text sent to a server?</strong> No — hashing happens entirely in your browser using the <code>bcryptjs</code> JavaScript library. Nothing you type is uploaded anywhere.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/bcrypt-hash-generator" content={content}>
      <BcryptHashGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BcryptHashGenerator;
