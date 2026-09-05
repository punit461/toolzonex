'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Button, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const QueueNumberGeneratorContent = () => {
  const [prefix, setPrefix] = useState('A');
  const [start, setStart] = useState('1');
  const [count, setCount] = useState('20');

  const { tickets, width } = useMemo(() => {
    const s = Math.max(0, parseInt(start, 10) || 0);
    const c = Math.max(1, Math.min(1000, parseInt(count, 10) || 1));
    const end = s + c - 1;
    const width = Math.max(String(end).length, 2);
    const list = Array.from({ length: c }, (_, i) => {
      const num = String(s + i).padStart(width, '0');
      return prefix ? `${prefix}-${num}` : num;
    });
    return { tickets: list, width };
  }, [prefix, start, count]);

  const copyAll = async () => {
    try { await navigator.clipboard.writeText(tickets.join('\n')); } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="Prefix (optional)" value={prefix} onChange={(e) => setPrefix(e.target.value)} fullWidth />
        <TextField label="Starting Number" type="number" value={start} onChange={(e) => setStart(e.target.value)} fullWidth />
        <TextField label="Number of Tickets" type="number" value={count} onChange={(e) => setCount(e.target.value)} fullWidth />
        <Typography variant="body2" color="text.secondary">
          Numbers zero-padded to {width} digit{width !== 1 ? 's' : ''} for consistent width.
        </Typography>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Queue Numbers ({tickets.length})</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyAll}>Copy</Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, maxHeight: 420, overflowY: 'auto' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: 1 }}>
            {tickets.map((t) => (
              <Paper key={t} variant="outlined" sx={{ p: 1, textAlign: 'center', fontFamily: 'monospace' }}>
                {t}
              </Paper>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const QueueNumberGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Queue Number Generator</Typography>
      <Typography variant="body1">
        Enter an optional prefix (like &quot;A&quot;), a starting number, and how many tickets you need. The
        tool generates a sequential list of queue or ticket numbers, automatically zero-padded so every number
        shares the same consistent width — for example, &quot;A-001&quot; through &quot;A-050&quot; — ready to
        copy and print or feed into a ticketing display.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With prefix &quot;A&quot;, a starting number of 1, and a count of 50, the tool generates
        &quot;A-001&quot; through &quot;A-050&quot;, each padded to three digits since the highest number (50)
        needs at least two digits and the tool rounds up to a clean minimum width.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Printing sequential queue tickets for a customer service counter or clinic.</li>
          <li>Generating raffle or event entry ticket numbers in bulk.</li>
          <li>Creating consistent, zero-padded numbering for a check-in or pickup system.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I skip the prefix entirely?</strong> Yes — leave the prefix field blank and the tool generates plain zero-padded numbers without any letter or dash prefix.</li>
          <li><strong>How is the zero-padding width decided?</strong> The tool pads every number to match the digit length of the highest number in your range (with a minimum of two digits), so all tickets in a batch line up visually.</li>
          <li><strong>Can I start from a number other than 1?</strong> Yes — set any starting number you like, which is useful for continuing a queue from a previous batch of tickets.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/queue-number-generator" content={content}>
      <QueueNumberGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default QueueNumberGenerator;
