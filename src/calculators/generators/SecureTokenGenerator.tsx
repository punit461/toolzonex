'use client';

import { useState, useCallback, useEffect } from 'react';
import { Box, Button, Typography, Paper, Stack, FormControl, InputLabel, Select, MenuItem, TextField, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function toBase64Url(bytes: Uint8Array): string {
  return toBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function toBase62(bytes: Uint8Array): string {
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += BASE62[bytes[i] % BASE62.length];
  }
  return out;
}

const ENCODERS: Record<string, (bytes: Uint8Array) => string> = {
  hex: toHex,
  base64: toBase64,
  base64url: toBase64Url,
  base62: toBase62,
};

const SecureTokenGeneratorContent = () => {
  const [length, setLength] = useState<number>(32);
  const [format, setFormat] = useState<string>('hex');
  const [token, setToken] = useState<string>('');

  const generateToken = useCallback(() => {
    const size = Math.min(Math.max(Math.round(length) || 32, 8), 128);
    const bytes = new Uint8Array(size);
    crypto.getRandomValues(bytes);
    setToken(ENCODERS[format](bytes));
  }, [length, format]);

  useEffect(() => {
    generateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToken = async () => {
    if (!token) return;
    try { await navigator.clipboard.writeText(token); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Token Length (bytes)"
          type="number"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10) || 32)}
          InputProps={{ inputProps: { min: 8, max: 128 } }}
          helperText="Number of random bytes to generate (8-128), default 32"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Encoding Format</InputLabel>
          <Select value={format} label="Encoding Format" onChange={(e) => setFormat(e.target.value)}>
            <MenuItem value="hex">Hex</MenuItem>
            <MenuItem value="base64">Base64</MenuItem>
            <MenuItem value="base64url">Base64URL</MenuItem>
            <MenuItem value="base62">Base62 (Alphanumeric)</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" size="large" onClick={generateToken} startIcon={<RefreshIcon />}>
          Generate New Token
        </Button>
      </Stack>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Generated Token</Typography>
        <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{token}</Typography>
          <IconButton onClick={copyToken} aria-label="Copy token" size="small">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Paper>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {length} random bytes encoded as {format}. Length in characters may vary by encoding.
        </Typography>
      </Box>
    </Box>
  );
};

const SecureTokenGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Secure Token Generator</Typography>
      <Typography variant="body1">
        Choose how many random bytes you want (16-64 is typical, 32 is a strong default) and pick an encoding
        format — Hex, Base64, Base64URL, or Base62 alphanumeric. The tool uses your browser&apos;s built-in
        <code> crypto.getRandomValues</code> to generate cryptographically strong random bytes locally, then
        encodes them into the format you chose. Nothing is sent to a server — the token exists only in your
        browser until you copy it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Generating 32 random bytes and encoding them as Hex produces a 64-character string like
        <code> 9f2a1c7e4b3d8f0a6e5c2b1d9a8f7e6c5b4a3d2e1f0c9b8a7d6e5f4c3b2a1d0e</code>. Switching the format to
        Base64URL for the same byte count instead produces a shorter, URL-safe string.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating session tokens or CSRF tokens for a web application.</li>
          <li>Creating one-time password-reset or email-verification link tokens.</li>
          <li>Producing random secrets for signing cookies, JWTs, or environment variables.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the API Key Generator?</strong> The <a href="/developer-tools/api-key-generator">API Key Generator</a> produces prefixed, API-key-shaped strings (like <code>sk_live_...</code>) meant specifically to look and function like an API auth key. This Secure Token Generator produces a raw, unprefixed random token with no built-in structure — better suited for general-purpose uses like session tokens, CSRF tokens, or password-reset links where you don&apos;t need a recognizable prefix.</li>
          <li><strong>Which encoding format should I use?</strong> Hex is the most universally compatible and easiest to read. Base64 packs more entropy per character but includes symbols like <code>+</code> and <code>/</code> that aren&apos;t always URL-safe. Base64URL fixes that for use in URLs. Base62 uses only letters and digits, which is convenient when a system doesn&apos;t allow any special characters at all.</li>
          <li><strong>Is Base62 encoding perfectly uniform?</strong> It's a simple modulo mapping of each random byte onto a 62-character alphabet, which introduces a very slight statistical bias since 256 isn't evenly divisible by 62. For this tool's purpose — generating usable random tokens — that tiny bias is not a practical concern.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/secure-token-generator" content={content}>
      <SecureTokenGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SecureTokenGenerator;
