'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Grid } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const StatBox = ({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) => (
  <Paper
    sx={{
      p: 2,
      textAlign: 'center',
      bgcolor: highlight ? 'primary.main' : 'action.hover',
      color: highlight ? 'primary.contrastText' : 'text.primary',
      borderRadius: 2,
    }}
  >
    <Typography variant={highlight ? 'h3' : 'h4'} fontWeight="bold">{value}</Typography>
    <Typography variant="subtitle2" sx={{ opacity: highlight ? 0.9 : 0.7 }}>{label}</Typography>
  </Paper>
);

const CharacterCounterContent = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const charactersWithSpaces = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
    return { charactersWithSpaces, charactersNoSpaces, words, sentences, paragraphs };
  }, [text]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={10}
        fullWidth
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StatBox label="Characters (with spaces)" value={stats.charactersWithSpaces} highlight />
        </Grid>
        <Grid item xs={12} sm={6}>
          <StatBox label="Characters (no spaces)" value={stats.charactersNoSpaces} highlight />
        </Grid>
        <Grid item xs={6} sm={4}>
          <StatBox label="Words" value={stats.words} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <StatBox label="Sentences" value={stats.sentences} />
        </Grid>
        <Grid item xs={6} sm={4}>
          <StatBox label="Paragraphs" value={stats.paragraphs} />
        </Grid>
      </Grid>
    </Box>
  );
};

const CharacterCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Count Characters Online</Typography>
      <Typography variant="body1">
        Type or paste your text into the box above and this character counter instantly shows the total
        character count with and without spaces, along with word, sentence, and paragraph counts — updating
        live as you type, with no upload or sign-up required.
      </Typography>

      <Typography variant="h2">Why Character Count Matters</Typography>
      <Typography variant="body1">
        Many platforms enforce strict character limits — tweet and social post lengths, SMS segments, meta
        descriptions, form fields, and app store listings all cap the number of characters allowed. This tool
        gives you an exact, real-time character count so you can trim or expand your text to fit.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        The text &quot;Hello, world!&quot; is 13 characters with spaces and 12 characters without spaces.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a post or caption fits a platform&apos;s character limit before publishing.</li>
          <li>Writing meta titles and descriptions within SEO-recommended character counts.</li>
          <li>Counting characters in a text message to estimate SMS segments.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does the character count include spaces?</Typography>
      <Typography variant="body1">
        This tool shows both — the character count with spaces included, and a separate count with all spaces
        removed — since different platforms and forms count characters differently.
      </Typography>
      <Typography variant="h3">Does it count characters as I type?</Typography>
      <Typography variant="body1">
        Yes — the character, word, sentence, and paragraph counts update live as you type or paste text, with no
        need to click a button.
      </Typography>
      <Typography variant="h3">How is this different from a word counter?</Typography>
      <Typography variant="body1">
        This tool is focused specifically on character counting — with-spaces and without-spaces totals shown
        front and center — while still including word, sentence, and paragraph counts for convenience.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/character-counter" content={content}>
      <CharacterCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CharacterCounter;
