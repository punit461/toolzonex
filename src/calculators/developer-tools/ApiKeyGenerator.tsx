'use client';

import { useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, Stack, FormControl, InputLabel, Select, MenuItem, TextField, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const CHAR_SETS: Record<string, string> = {
  hex: '0123456789abcdef',
  alnum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  base64url: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
  alnumSymbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=',
};

const PREFIXES = ['none', 'sk_', 'api_'];

function randomString(length: number, set: string): string {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < length; i++) {
    out += set[bytes[i] % set.length];
  }
  return out;
}

function entropy(charsetLength: number, length: number): number {
  return Math.round(length * Math.log2(charsetLength) * 10) / 10;
}

const ApiKeyGenerator = () => {
  const [length, setLength] = useState<string>('32');
  const [prefix, setPrefix] = useState<string>('sk_');
  const [charset, setCharset] = useState<string>('alnum');
  const [keys, setKeys] = useState<string[]>([]);

  const handleGenerate = useCallback(() => {
    const size = Math.max(1, parseInt(length, 10) || 32);
    const set = CHAR_SETS[charset];
    const prefixStr = prefix === 'none' ? '' : prefix;
    const generated = Array.from({ length: 5 }, () => prefixStr + randomString(size, set));
    setKeys(generated);
  }, [length, charset, prefix]);

  const copyAll = async () => {
    if (keys.length === 0) return;
    try { await navigator.clipboard.writeText(keys.join('\n')); } catch {}
  };

  const copyOne = async (key: string) => {
    try { await navigator.clipboard.writeText(key); } catch {}
  };

  const setSize = CHAR_SETS[charset].length;
  const entropyPerKey = entropy(setSize, parseInt(length, 10) || 32);

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Key Length (characters)"
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          InputProps={{ inputProps: { min: 1, max: 128 } }}
        />
        <FormControl fullWidth>
          <InputLabel>Prefix</InputLabel>
          <Select value={prefix} label="Prefix" onChange={(e) => setPrefix(e.target.value)}>
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="sk_">sk_</MenuItem>
            <MenuItem value="api_">api_</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Character Set</InputLabel>
          <Select value={charset} label="Character Set" onChange={(e) => setCharset(e.target.value)}>
            <MenuItem value="hex">Hexadecimal</MenuItem>
            <MenuItem value="alnum">Alphanumeric</MenuItem>
            <MenuItem value="base64url">Base64 URL-safe</MenuItem>
            <MenuItem value="alnumSymbols">Alphanumeric + Symbols</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" size="large" onClick={handleGenerate}>
          Generate 5 API Keys
        </Button>
      </Stack>

      {keys.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Generated keys — approx. {entropyPerKey} bits of entropy each
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={copyAll} aria-label="Copy all keys">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleGenerate} aria-label="Regenerate keys">
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
          {keys.map((key, idx) => (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all', mr: 1 }}>{key}</Typography>
              <IconButton size="small" onClick={() => copyOne(key)} aria-label="Copy key">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};

const ApiKeyGuide = () => {
  const content = (
    <>
      <Typography variant="h2">How Does the API Key Generator Work?</Typography>
      <Typography variant="body1">
        Choose a key length, an optional prefix, and a character set, then click Generate to create five
        random keys at once. Each key is built from cryptographically secure random bytes, so it is strong
        enough for everyday use as a secret. The prefix (like sk_ or api_) makes keys easy to recognize, and
        the character set controls how many possible values each character can be.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With a length of 32, an "sk_" prefix, and the alphanumeric character set, a generated key looks like
        sk_Ab3Xz8mQ2vLp9nW5eR7tY1uK4jF0cH. That key represents about 190 bits of entropy, making it effectively
        impossible to guess by brute force.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Secrets for authenticating your own applications and services.</li>
          <li>Developer sandbox keys for testing and staging environments.</li>
          <li>Single-use or limited-scope tokens for integrations.</li>
          <li>Random credential values for demo or sample configurations.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which character set should I use?</Typography>
      <Typography variant="body1">
        Hexadecimal uses 4 bits per character, alphanumeric about 5.95, base64 URL-safe exactly 6, and the
        symbol set a bit more. Larger character sets give more entropy for the same length, but some systems
        restrict special characters, so pick a set that is accepted by wherever you will use the key.
      </Typography>
      <Typography variant="h3">How long should my key be?</Typography>
      <Typography variant="body1">
        Aim for at least 128 bits of entropy — that means about 32 hex characters, 22 alphanumeric
        characters, or 22 base64 characters. The default of 32 alphanumeric characters is comfortable for
        most uses.
      </Typography>
      <Typography variant="h3">Are these keys secure?</Typography>
      <Typography variant="body1">
        Keys are generated with Web Crypto random values in your browser, so they are cryptographically
        strong. Still, a strong key is only as safe as how you store it — never commit keys to version control
        or expose them in client-side code.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/api-key-generator" content={content}>
      <ApiKeyGenerator />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ApiKeyGuide;
