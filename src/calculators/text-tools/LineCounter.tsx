'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Stats {
  totalLines: number;
  nonEmptyLines: number;
  words: number;
  charsWithSpaces: number;
  charsWithoutSpaces: number;
  bytes: number;
}

function computeStats(text: string): Stats {
  const lines = text.split(/\r?\n/);
  const nonEmptyLines = lines.filter((l) => l.trim().length > 0).length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charsWithSpaces = text.length;
  const charsWithoutSpaces = text.replace(/\s/g, '').length;
  const bytes = new TextEncoder().encode(text).length;
  return { totalLines: lines.length, nonEmptyLines, words, charsWithSpaces, charsWithoutSpaces, bytes };
}

const StatCard = ({ label, value, hint }: { label: string; value: string | number; hint?: string }) => (
  <Paper variant="outlined" sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>{value.toLocaleString()}</Typography>
    <Typography variant="subtitle1" fontWeight="600">{label}</Typography>
    {hint && <Typography variant="caption" color="text.secondary">{hint}</Typography>}
  </Paper>
);

const LineCounterContent = () => {
  const [text, setText] = useState('');
  const stats = useMemo(() => computeStats(text), [text]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        multiline
        rows={12}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        fullWidth
        variant="outlined"
        inputProps={{ style: { fontFamily: 'monospace' } }}
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }, gap: 2 }}>
        <StatCard label="Lines" value={stats.totalLines} />
        <StatCard label="Non-empty Lines" value={stats.nonEmptyLines} />
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.charsWithSpaces} hint="with spaces" />
        <StatCard label="Characters" value={stats.charsWithoutSpaces} hint="no spaces" />
        <StatCard label="Bytes" value={stats.bytes} hint="UTF-8" />
      </Box>
    </Box>
  );
};

const LineCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How does it work?</Typography>
      <Typography variant="body1">
        As you type or paste text into the box, this tool counts everything live — total lines, non-empty lines,
        words, characters (with and without spaces), and the byte size of the text in UTF-8.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a short paragraph updates all six counters instantly. A blank first line still counts as a line,
        but it isn't included in the non-empty line count.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking line counts when formatting code or plain text files.</li>
          <li>Verifying text length for writing limits or data-entry constraints.</li>
          <li>Measuring the size of text before uploading, sending, or storing it.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why do "lines" and "non-empty lines" differ?</Typography>
      <Typography variant="body1">
        Every line break creates a line, including blank ones. "Non-empty lines" only counts lines that contain at
        least one character.
      </Typography>
      <Typography variant="h3">What is "bytes (UTF-8)"?</Typography>
      <Typography variant="body1">
        It's how many bytes the text occupies when encoded as UTF-8. ASCII characters use one byte each, while
        emoji or special characters can use several.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/line-counter" content={content}>
      <LineCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LineCounter;
