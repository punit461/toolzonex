'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Grid } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const WordCounterContent = () => {
  const [text, setText] = useState('');

  const getStats = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return { words: 0, characters: 0, charactersNoSpaces: 0, sentences: 0, paragraphs: 0 };

    const words = trimmed.split(/\s+/).filter(word => word.length > 0).length;
    const characters = str.length;
    const charactersNoSpaces = str.replace(/\s+/g, '').length;
    const sentences = trimmed.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = trimmed.split(/\n+/).filter(para => para.trim().length > 0).length;

    return { words, characters, charactersNoSpaces, sentences, paragraphs };
  };

  const stats = getStats(text);

  const StatBox = ({ label, value }: { label: string, value: number }) => (
    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 2 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 0 }}>{value}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>{label}</Typography>
    </Paper>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          label="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={12}
          fullWidth
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={2.4}>
          <StatBox label="Words" value={stats.words} />
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <StatBox label="Characters" value={stats.characters} />
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <StatBox label="Char (no spaces)" value={stats.charactersNoSpaces} />
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <StatBox label="Sentences" value={stats.sentences} />
        </Grid>
        <Grid item xs={6} sm={4} md={2.4}>
          <StatBox label="Paragraphs" value={stats.paragraphs} />
        </Grid>
      </Grid>
    </Box>
  );
};

const WordCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Word Counter?</Typography>
      <Typography variant="body1">
        Simply type or paste your text into the text area above. As you type, the tool will automatically calculate and display the number of words, characters (with and without spaces), sentences, and paragraphs in real-time.
      </Typography>

      <Typography variant="h2">Why use a Word Counter?</Typography>
      <Typography variant="body1">
        Whether you're writing an essay, a blog post, a social media update, or a professional email, keeping track of your word count is essential. Many platforms have strict character limits (like Twitter/X) or specific length requirements for SEO and readability. This free online tool helps you instantly track your progress without needing heavy word processors.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in real-time. Free online word count tool for writers and students."
      url="/tools/word-counter"
      content={content}
      category="Tools"
    >
      <WordCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordCounter;
