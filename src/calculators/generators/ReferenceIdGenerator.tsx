'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Stack, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type CharSet = 'numeric' | 'alphanumeric';

const NUMERIC_CHARS = '0123456789';
const ALPHANUMERIC_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomChars(charset: string, length: number): string {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  let result = '';
  for (let i = 0; i < length; i++) result += charset[arr[i] % charset.length];
  return result;
}

function todayCompact(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${day}`;
}

function buildIds(prefix: string, length: string, charSet: CharSet, includeDate: boolean, count: string): string[] {
  const len = Math.max(1, Math.min(64, parseInt(length, 10) || 1));
  const n = Math.max(1, Math.min(200, parseInt(count, 10) || 1));
  const charset = charSet === 'numeric' ? NUMERIC_CHARS : ALPHANUMERIC_CHARS;
  const datePart = includeDate ? todayCompact() : '';
  return Array.from({ length: n }, () => {
    const parts = [prefix, datePart, randomChars(charset, len)].filter(Boolean);
    return parts.join('-');
  });
}

const ReferenceIdGeneratorContent = () => {
  const [prefix, setPrefix] = useState('REF');
  const [length, setLength] = useState('8');
  const [charSet, setCharSet] = useState<CharSet>('alphanumeric');
  const [includeDate, setIncludeDate] = useState(false);
  const [count, setCount] = useState('5');
  const [ids, setIds] = useState<string[]>([]);

  const generate = () => {
    setIds(buildIds(prefix, length, charSet, includeDate, count));
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyAll = async () => {
    try { await navigator.clipboard.writeText(ids.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Prefix (optional)" value={prefix} onChange={(e) => setPrefix(e.target.value)} fullWidth />
        <TextField label="Random Portion Length" type="number" value={length} onChange={(e) => setLength(e.target.value)} fullWidth />
        <FormControl fullWidth>
          <InputLabel>Character Set</InputLabel>
          <Select value={charSet} label="Character Set" onChange={(e) => setCharSet(e.target.value as CharSet)}>
            <MenuItem value="numeric">Numeric Only</MenuItem>
            <MenuItem value="alphanumeric">Alphanumeric</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Checkbox checked={includeDate} onChange={(e) => setIncludeDate(e.target.checked)} />}
          label="Embed today's date (YYYYMMDD)"
        />
        <TextField label="Count to Generate" type="number" value={count} onChange={(e) => setCount(e.target.value)} fullWidth />
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={generate}>Generate</Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Generated IDs ({ids.length})</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll} disabled={ids.length === 0}>Copy</Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, maxHeight: 420, overflowY: 'auto' }}>
          <Stack spacing={1}>
            {ids.map((id, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 1, fontFamily: 'monospace', textAlign: 'center' }}>{id}</Paper>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

const ReferenceIdGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Reference/Order ID Generator</Typography>
      <Typography variant="body1">
        Set an optional prefix, choose how long the random portion should be, pick a character set (Numeric
        Only or Alphanumeric), and optionally toggle in today&apos;s date as a component. Enter how many IDs you
        need at once and click Generate. This one flexible, configurable tool covers what would otherwise be
        several near-identical generators — token numbers, serial numbers, reference numbers, and order IDs are
        all really the same underlying pattern with different formatting preferences.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With prefix &quot;ORD&quot;, date embedding on, an 8-character alphanumeric random portion, and a count
        of 3, the tool might generate IDs like &quot;ORD-20260905-7K3M9QXZ&quot; — a readable, sortable order ID
        format combining a prefix, date, and unique random suffix.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating order IDs or reference numbers for an e-commerce or invoicing system mockup.</li>
          <li>Creating unique serial numbers for a batch of test records or sample data.</li>
          <li>Producing token or ticket numbers that combine a readable prefix with a random unique suffix.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How random is the generated portion?</strong> It uses the Web Crypto API&apos;s crypto.getRandomValues(), giving cryptographically strong randomness rather than a predictable pseudo-random sequence.</li>
          <li><strong>Could two generated IDs ever collide?</strong> It&apos;s possible but extremely unlikely with a reasonably long random portion (8+ characters) — for guaranteed uniqueness in a production system, still check new IDs against your existing records.</li>
          <li><strong>What&apos;s the difference between this and a UUID generator?</strong> A UUID follows a strict, universally standardized 36-character format. This tool instead lets you fully customize the prefix, length, character set, and date component to match your own business ID conventions.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/reference-id-generator" content={content}>
      <ReferenceIdGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReferenceIdGenerator;
