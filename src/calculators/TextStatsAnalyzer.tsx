'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextStatsAnalyzerContent = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<any>(null);

  const analyze = () => {
    if (!text) {
      setStats(null);
      return;
    }

    const characters = text.length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const lines = text.split('\n').length;
    const vowels = (text.match(/[aeiouAEIOU]/g) || []).length;
    const consonants = (text.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const avgWordLength = wordCount > 0 ? (words.join('').length / wordCount).toFixed(2) : 0;
    const syllables = countSyllables(text);
    const readingGrade = wordCount > 0 && sentences > 0
      ? Math.max(0, 0.39 * (wordCount / sentences) + 11.8 * (syllables / wordCount) - 15.59)
      : 0;

    setStats({
      characters, wordCount, sentences, lines, vowels, consonants, numbers, avgWordLength, 
      syllables, readingGrade: parseFloat(readingGrade.toFixed(1))
    });
  };

  const countSyllables = (str: string) => {
    let count = 0;
    const words = str.toLowerCase().split(/\s+/);
    for (let word of words) {
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const match = word.match(/[aeiouy]{1,2}/g);
      count += match ? match.length : 1;
    }
    return count;
  };

  const StatBox = ({ label, value }: { label: string, value: string | number }) => (
    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'background.default', border: '1px solid' }}>
      <Typography variant="h4" fontWeight="600" color="primary.main" gutterBottom>{value}</Typography>
      <Typography variant="body2" color="text.secondary" fontWeight="500">{label}</Typography>
    </Paper>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste text to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={6}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={analyze} size="large">
          Analyze Text
        </Button>
      </Box>

      {stats && (
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}><StatBox label="Total Characters" value={stats.characters} /></Grid>
          <Grid item xs={6} md={3}><StatBox label="Total Words" value={stats.wordCount} /></Grid>
          <Grid item xs={6} md={3}><StatBox label="Sentences" value={stats.sentences} /></Grid>
          <Grid item xs={6} md={3}><StatBox label="Total Lines" value={stats.lines} /></Grid>
          <Grid item xs={6} md={3}><StatBox label="Vowels" value={stats.vowels} /></Grid>
          <Grid item xs={6} md={3}><StatBox label="Consonants" value={stats.consonants} /></Grid>
          <Grid item xs={6} md={3}><StatBox label="Numbers" value={stats.numbers} /></Grid>
          <Grid item xs={6} md={3}><StatBox label="Avg Word Length" value={stats.avgWordLength} /></Grid>
          <Grid item xs={6} md={6}><StatBox label="Total Syllables (Est.)" value={stats.syllables} /></Grid>
          <Grid item xs={6} md={6}><StatBox label="Estimated Reading Grade" value={stats.readingGrade} /></Grid>
        </Grid>
      )}
    </Box>
  );
};

const TextStatsAnalyzer = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Text Stats Analyzer?</Typography>
      <Typography variant="body1">
        Paste any text into the box and click "Analyze". The tool instantly calculates in-depth metrics including vowels, consonants, syllables, average word length, and sentence length.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reviewing the length and structure of an article before publishing.</li>
          <li>Analyzing word and syllable complexity for language learning materials.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is average word length calculated?</Typography>
      <Typography variant="body1">
        It&apos;s the total character count of all words divided by the total word count.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a 200-word paragraph instantly returns its vowel/consonant counts, syllable count, and an
        average word length, and average sentence length.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Stats Analyzer"
      description="Analyze characters, words, syllables, vowels, consonants, and sentence length instantly."
      url="/text-tools/text-stats-analyzer"
      content={content}
      category="Text Tools"
    >
      <TextStatsAnalyzerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextStatsAnalyzer;
