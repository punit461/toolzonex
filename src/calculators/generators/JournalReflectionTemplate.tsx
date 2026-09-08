'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const todayIso = () => new Date().toISOString().slice(0, 10);

const JournalReflectionTemplateContent = () => {
  const [date, setDate] = useState(todayIso());
  const [gratitude, setGratitude] = useState(['', '', '']);
  const [highlight, setHighlight] = useState('');
  const [learned, setLearned] = useState('');
  const [tomorrow, setTomorrow] = useState('');

  const updateGratitude = (i: number, value: string) =>
    setGratitude((prev) => prev.map((g, idx) => (idx === i ? value : g)));

  const outputText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`Date: ${date || '(no date)'}`);
    lines.push('');
    lines.push("Today I'm grateful for:");
    gratitude.forEach((g, i) => lines.push(`  ${i + 1}. ${g.trim() || '(blank)'}`));
    lines.push('');
    lines.push(`Today's Highlight: ${highlight.trim() || '(blank)'}`);
    lines.push('');
    lines.push(`What I Learned Today: ${learned.trim() || '(blank)'}`);
    lines.push('');
    lines.push(`Tomorrow's Focus: ${tomorrow.trim() || '(blank)'}`);
    return lines.join('\n');
  }, [date, gratitude, highlight, learned, tomorrow]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 4 }}>
      <Box>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <TextField size="small" type="date" label="Date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} sx={{ maxWidth: 220 }} />
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>Today I&apos;m grateful for...</Typography>
              <Stack spacing={1}>
                {gratitude.map((g, i) => (
                  <TextField key={i} size="small" fullWidth label={`Gratitude ${i + 1}`} value={g} onChange={(e) => updateGratitude(i, e.target.value)} />
                ))}
              </Stack>
            </Box>
            <TextField size="small" fullWidth multiline label="Today's Highlight" value={highlight} onChange={(e) => setHighlight(e.target.value)} />
            <TextField size="small" fullWidth multiline label="What I Learned Today" value={learned} onChange={(e) => setLearned(e.target.value)} />
            <TextField size="small" fullWidth multiline label="Tomorrow's Focus" value={tomorrow} onChange={(e) => setTomorrow(e.target.value)} />
          </Stack>
        </Paper>
      </Box>

      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>Journal Entry</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyText}>
            Copy
          </Button>
        </Stack>
        <Paper variant="outlined" sx={{ p: 2, minHeight: 250 }}>
          <Box component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
            {outputText}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const JournalReflectionTemplate = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Journal/Daily Reflection Template</Typography>
      <Typography variant="body1">
        Pick a date, then fill in three things you&apos;re grateful for today, today&apos;s highlight, what
        you learned, and tomorrow&apos;s focus. As you type, the panel on the right builds a clean,
        formatted journal entry combining every field — ready to copy into a notebook app, print for a
        physical journal, or paste into a daily log document.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Filling in three gratitude items, a highlight like &quot;Finished a big project at work&quot;, a
        lesson learned, and a focus for tomorrow produces a dated entry listing each section in order,
        ready to copy as your daily reflection.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Building a consistent daily journaling habit with a structured, repeatable prompt format.</li>
          <li>Practicing daily gratitude alongside a quick end-of-day reflection.</li>
          <li>Printing a blank template layout to fill in by hand in a physical notebook.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Do I have to fill in all three gratitude items?</strong> No — any left blank show as &quot;(blank)&quot; in the output, so feel free to fill in just one or two on days when that&apos;s all you have.</li>
          <li><strong>Can I use this for both a gratitude journal and a daily reflection?</strong> Yes — the template combines both formats in one entry, covering gratitude, a daily highlight, a lesson learned, and a forward-looking focus for tomorrow.</li>
          <li><strong>Is my journal entry saved anywhere?</strong> No — everything is kept only in your browser for the current session and resets on reload, so copy the entry before closing the tab if you want to keep it.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/journal-reflection-template" content={content}>
      <JournalReflectionTemplateContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JournalReflectionTemplate;
