'use client';

import { useEffect, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// Excludes visually ambiguous characters: 0/O, 1/I/L
const SAFE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function randomChars(length: number): string {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  let result = '';
  for (let i = 0; i < length; i++) result += SAFE_CHARS[arr[i] % SAFE_CHARS.length];
  return result;
}

function buildCodes(prefix: string, groupCount: string, groupLength: string, count: string): string[] {
  const groups = Math.max(1, Math.min(6, parseInt(groupCount, 10) || 1));
  const glen = Math.max(1, Math.min(12, parseInt(groupLength, 10) || 1));
  const n = Math.max(1, Math.min(200, parseInt(count, 10) || 1));
  return Array.from({ length: n }, () => {
    const parts = Array.from({ length: groups }, () => randomChars(glen));
    return [prefix, ...parts].filter(Boolean).join('-');
  });
}

const CouponCodeGeneratorContent = () => {
  const [prefix, setPrefix] = useState('SAVE20');
  const [groupCount, setGroupCount] = useState('2');
  const [groupLength, setGroupLength] = useState('4');
  const [count, setCount] = useState('5');
  const [codes, setCodes] = useState<string[]>([]);

  const generate = () => setCodes(buildCodes(prefix, groupCount, groupLength, count));

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyAll = async () => {
    try { await navigator.clipboard.writeText(codes.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Prefix (optional)" value={prefix} onChange={(e) => setPrefix(e.target.value)} fullWidth helperText="e.g. SAVE20" />
        <TextField label="Number of Groups" type="number" value={groupCount} onChange={(e) => setGroupCount(e.target.value)} fullWidth />
        <TextField label="Characters Per Group" type="number" value={groupLength} onChange={(e) => setGroupLength(e.target.value)} fullWidth />
        <TextField label="Count to Generate" type="number" value={count} onChange={(e) => setCount(e.target.value)} fullWidth />
        <Typography variant="body2" color="text.secondary">
          Uses uppercase letters and numbers only, excluding visually ambiguous characters (0, O, 1, I, L).
        </Typography>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={generate}>Generate</Button>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Generated Codes ({codes.length})</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll} disabled={codes.length === 0}>Copy</Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, maxHeight: 420, overflowY: 'auto' }}>
          <Stack spacing={1}>
            {codes.map((c, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 1, fontFamily: 'monospace', textAlign: 'center', fontWeight: 600 }}>{c}</Paper>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

const CouponCodeGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Coupon/Voucher Code Generator</Typography>
      <Typography variant="body1">
        Set an optional prefix (like &quot;SAVE20&quot;), choose how many hyphen-separated groups you want and
        how many characters per group, then pick how many codes to generate. Every code uses uppercase letters
        and numbers only, automatically excluding visually ambiguous characters like 0/O and 1/I/L so codes are
        easy to read and type correctly. This single configurable tool covers what would otherwise be two
        near-identical generators — coupon codes and voucher codes follow the exact same format conventions.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With prefix &quot;SAVE20&quot;, 2 groups of 4 characters each, the tool generates codes in the classic
        format <code>SAVE20-X7K9-M3P2</code> — a recognizable prefix followed by randomized, easy-to-read
        groups.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Generating a batch of unique discount codes for an email marketing campaign.</li>
          <li>Creating gift voucher codes for a small business or online store.</li>
          <li>Producing promo codes for a giveaway or limited-time sale.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why are certain characters excluded?</strong> Characters like 0 and O, or 1, I, and L, look nearly identical in many fonts and can cause customers to mistype a code — excluding them keeps every generated code easy to read and enter correctly.</li>
          <li><strong>Are two generated codes ever the same?</strong> It&apos;s extremely unlikely with a reasonable group length, since each character is drawn using the Web Crypto API&apos;s cryptographically secure randomness — but for a production system, still check new codes against ones you&apos;ve already issued.</li>
          <li><strong>Can I generate codes without a prefix?</strong> Yes — leave the prefix field blank and the tool will generate codes made up of just the randomized groups.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/coupon-code-generator" content={content}>
      <CouponCodeGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CouponCodeGenerator;
