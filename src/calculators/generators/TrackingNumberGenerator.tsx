'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Carrier = 'ups' | 'fedex' | 'usps' | 'generic';

const DIGITS = '0123456789';
const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomFrom(charset: string, length: number): string {
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  let result = '';
  for (let i = 0; i < length; i++) result += charset[arr[i] % charset.length];
  return result;
}

function generateTracking(carrier: Carrier): string {
  switch (carrier) {
    case 'ups':
      // 1Z + 6 alphanumeric + 2 digits + 8 digits (~18 chars)
      return `1Z${randomFrom(ALPHANUMERIC, 6)}${randomFrom(DIGITS, 2)}${randomFrom(DIGITS, 8)}`;
    case 'fedex':
      // 12 digits
      return randomFrom(DIGITS, 12);
    case 'usps':
      // 20-22 digits (use 22)
      return randomFrom(DIGITS, 22);
    case 'generic':
    default:
      return randomFrom(ALPHANUMERIC, 16);
  }
}

const CARRIER_LABELS: Record<Carrier, string> = {
  ups: 'UPS-style (1Z + 16 chars)',
  fedex: 'FedEx-style (12 digits)',
  usps: 'USPS-style (22 digits)',
  generic: 'Generic (16 alphanumeric)',
};

const TrackingNumberGeneratorContent = () => {
  const [carrier, setCarrier] = useState<Carrier>('ups');
  const [count, setCount] = useState(5);
  const [numbers, setNumbers] = useState<string[]>([]);

  const generate = () => setNumbers(Array.from({ length: count }, () => generateTracking(carrier)));

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carrier]);

  const copyAll = async () => {
    try { await navigator.clipboard.writeText(numbers.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Carrier Format</InputLabel>
          <Select value={carrier} label="Carrier Format" onChange={(e) => setCarrier(e.target.value as Carrier)}>
            {(Object.keys(CARRIER_LABELS) as Carrier[]).map((c) => (
              <MenuItem key={c} value={c}>{CARRIER_LABELS[c]}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Count to Generate</InputLabel>
          <Select value={count} label="Count to Generate" onChange={(e) => setCount(Number(e.target.value))}>
            {[1, 5, 10, 20, 50].map((n) => (
              <MenuItem key={n} value={n}>{n}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" startIcon={<RefreshIcon />} onClick={generate}>Generate</Button>
        <Paper variant="outlined" sx={{ p: 2, bgcolor: 'warning.light' }}>
          <Typography variant="body2" fontWeight={600}>
            These are randomly generated fictional numbers for mockup or testing purposes only — they are not
            real, trackable shipments and have no connection to any actual carrier.
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Generated Numbers ({numbers.length})</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll} disabled={numbers.length === 0}>Copy</Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, maxHeight: 420, overflowY: 'auto' }}>
          <Stack spacing={1}>
            {numbers.map((n, i) => (
              <Paper key={i} variant="outlined" sx={{ p: 1, fontFamily: 'monospace', textAlign: 'center' }}>{n}</Paper>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

const TrackingNumberGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Tracking Number Generator</Typography>
      <Typography variant="body1">
        Select a carrier format — UPS-style, FedEx-style, USPS-style, or Generic — and how many numbers you
        need. The tool generates random strings matching that carrier&apos;s typical length and character
        composition (for example, UPS-style numbers start with &quot;1Z&quot; followed by a mix of letters and
        numbers, while FedEx-style numbers are 12 plain digits). Every character is generated using the Web
        Crypto API for genuine randomness.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing UPS-style might generate a number like <code>1Z9F3K2A0812345678</code> — matching the real
        &quot;1Z&quot; prefix plus 6 alphanumeric characters, 2 digits, and 8 more digits that UPS tracking
        numbers typically use, without following UPS&apos;s actual internal check-digit algorithm.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Populating placeholder shipment data in a UI mockup, prototype, or design file.</li>
          <li>Generating realistic-looking sample data for software testing and QA.</li>
          <li>Creating example tracking numbers for documentation or tutorial screenshots.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are these real, trackable tracking numbers?</strong> No — every number is randomly generated and fictional, purely for mockup, testing, or design purposes. They have no connection to any actual shipment or carrier system and will not work if entered on a real carrier&apos;s tracking page.</li>
          <li><strong>Do these pass a carrier&apos;s official validation check?</strong> No — this tool only matches the typical length and character pattern (letters vs. digits) of each carrier&apos;s format. It does not implement any real carrier&apos;s internal checksum or validation algorithm.</li>
          <li><strong>Which format should I pick for generic testing?</strong> Use Generic if you just need a realistic-looking alphanumeric string without matching any specific real-world carrier&apos;s exact format.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/tracking-number-generator" content={content}>
      <TrackingNumberGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TrackingNumberGenerator;
