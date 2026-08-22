'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Grid } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

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
      <Typography variant="h2">How to use this online word count calculator</Typography>
      <Typography variant="body1">
        Simply type or paste your text into the text area above. As you type, this online word count tool
        automatically calculates and displays the number of words, characters (with and without spaces),
        sentences, and paragraphs in real-time — no upload, no sign-up.
      </Typography>

      <Typography variant="h2">Why use a word counter?</Typography>
      <Typography variant="body1">
        Whether you're writing an essay, a blog post, a social media update, or a professional email, keeping track of your word count is essential. Many platforms have strict character limits (like Twitter/X) or specific length requirements for SEO and readability. This free online word count tool helps you instantly track your progress without needing heavy word processors.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it count words as I type?</Typography>
      <Typography variant="body1">
        Yes — the word, character, sentence, and paragraph counts update live as you type or paste text.
      </Typography>
      <Typography variant="h3">Is this the same as a word calculator?</Typography>
      <Typography variant="body1">
        Yes — &quot;word calculator&quot;, &quot;words counter&quot;, and &quot;word counter&quot; describe the
        same thing here. This tool calculates the exact word, character, sentence, and paragraph totals for
        whatever text you paste in.
      </Typography>
      <Typography variant="h3">How do I calculate the number of words in a document?</Typography>
      <Typography variant="body1">
        Paste the full text into the box above — there&apos;s no length limit, and the word count updates
        instantly without needing to open Word or Google Docs.
      </Typography>
      <Typography variant="h3">How many words is this text?</Typography>
      <Typography variant="body1">
        Paste it into the box above — the word count, along with character, sentence, and paragraph counts,
        appears immediately and updates live as you edit.
      </Typography>
      <Typography variant="h3">How do I convert words to characters?</Typography>
      <Typography variant="body1">
        There&apos;s no fixed ratio since word length varies, but English averages roughly 5-6 characters per
        word including the space after it — so 300 words is typically around 1,500-1,800 characters. For an
        exact count of your own text, paste it above and read the word and character counts side by side.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a 280-character tweet draft shows the exact character count so you know instantly if it fits
        the platform limit.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Word Count Calculator"
      description="Count words, characters, sentences, and paragraphs in real time. Free online word counter for writers and students."
      url="/text-tools/word-counter"
      content={content}
      category="Text Tools"
    >
      <WordCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordCounter;
