'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ParagraphCounterContent = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) return { paragraphs: 0, words: 0, sentences: 0, characters: 0 };

    const paragraphs = trimmed.split(/\n\s*\n+/).filter((p) => p.trim().length > 0).length;
    const words = trimmed.split(/\s+/).filter(Boolean).length;
    const sentences = trimmed.split(/[.!?]+(?:\s|$)/).filter((s) => s.trim().length > 0).length;
    const characters = text.length;

    return { paragraphs, words, sentences, characters };
  }, [text]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Paste or type your text"
        multiline
        minRows={10}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here. Separate paragraphs with a blank line."
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 2 }}>
        <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">Paragraphs</Typography>
          <Typography variant="h4" fontWeight="bold">{stats.paragraphs}</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Words</Typography>
          <Typography variant="h5" fontWeight={700}>{stats.words}</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Sentences</Typography>
          <Typography variant="h5" fontWeight={700}>{stats.sentences}</Typography>
        </Paper>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Characters</Typography>
          <Typography variant="h5" fontWeight={700}>{stats.characters}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const ParagraphCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How the Paragraph Counter Works</Typography>
      <Typography variant="body1">
        Paste or type your text into the box above. The counter splits your text into paragraphs wherever it
        finds a blank line (two or more consecutive line breaks), then counts how many paragraphs remain.
        Word, sentence, and character counts are shown alongside for extra context, all updating live as you
        type or paste.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A document with three blocks of text separated by blank lines counts as 3 paragraphs, regardless of
        how many sentences or words each block contains.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking whether an essay or article meets a required paragraph count.</li>
          <li>Reviewing document structure before submitting an assignment or article.</li>
          <li>Getting a quick word, sentence, and character count alongside paragraph structure.</li>
          <li>Verifying formatting after copying text between documents or editors.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How does the counter decide where a paragraph ends?</Typography>
      <Typography variant="body1">
        It looks for a blank line — that is, two or more consecutive line breaks — between blocks of text.
        Text separated by only a single line break within a block isn&apos;t treated as a new paragraph, since
        that&apos;s commonly just a line wrap rather than a true paragraph break.
      </Typography>
      <Typography variant="h3">Why does my paragraph count look wrong?</Typography>
      <Typography variant="body1">
        If your text was copied from a source that doesn&apos;t preserve blank lines between paragraphs (like
        some PDFs or web pages), paragraph breaks may be lost in the paste, causing everything to count as one
        paragraph. Try adding a blank line manually between paragraphs if this happens.
      </Typography>
      <Typography variant="h3">Is my text sent anywhere?</Typography>
      <Typography variant="body1">
        No — all counting happens directly in your browser. Your text is never uploaded or sent to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/paragraph-counter" content={content}>
      <ParagraphCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ParagraphCounter;
