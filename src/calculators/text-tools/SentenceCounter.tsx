'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Grid } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
    <Typography variant="h3" fontWeight="bold">{value}</Typography>
    <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>{label}</Typography>
  </Paper>
);

const SentenceCounterContent = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const sentences = trimmed ? trimmed.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 0).length : 0;
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const characters = text.length;
    return { sentences, words, characters };
  }, [text]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={12}
        fullWidth
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatBox label="Sentences" value={stats.sentences} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <StatBox label="Words" value={stats.words} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <StatBox label="Characters" value={stats.characters} />
        </Grid>
      </Grid>
    </Box>
  );
};

const SentenceCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How to count sentences online</Typography>
      <Typography variant="body1">
        Type or paste your text into the box above. The sentence, word, and character counts update live as you
        type, with no button to click and nothing uploaded.
      </Typography>

      <Typography variant="h2">How sentences are counted</Typography>
      <Typography variant="body1">
        This tool splits text on periods, exclamation marks, and question marks, then counts the resulting
        non-empty segments as sentences. It&apos;s a fast, practical approach that works well for most everyday
        writing.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;This is great! Is it working? Yes, it is.&quot; is counted as 3 sentences, 8 words, and the exact
        character count shown alongside.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking sentence count for readability or style guidelines.</li>
          <li>Estimating the complexity of a paragraph before editing it down.</li>
          <li>Quickly getting word and character counts alongside sentence count.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it handle abbreviations correctly?</Typography>
      <Typography variant="body1">
        Not perfectly — this is a known limitation of splitting on punctuation. Abbreviations like
        &quot;Dr.&quot;, &quot;e.g.&quot;, or &quot;U.S.&quot; contain a period but aren&apos;t sentence
        endings, so text with many abbreviations may show a slightly higher sentence count than a human reader
        would count. For most everyday writing without heavy abbreviation use, the count is accurate.
      </Typography>
      <Typography variant="h3">Does it count as I type?</Typography>
      <Typography variant="body1">
        Yes — sentence, word, and character counts all update live as you type or paste text.
      </Typography>
      <Typography variant="h3">What counts as a sentence-ending punctuation mark?</Typography>
      <Typography variant="body1">
        Periods, exclamation marks, and question marks are treated as sentence endings. Ellipses
        (&quot;...&quot;) and repeated punctuation (&quot;?!&quot;) are treated as a single ending, not multiple
        sentences.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/sentence-counter" content={content}>
      <SentenceCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SentenceCounter;
