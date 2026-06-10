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
    
    // Readability (approximate Flesch-Kincaid Grade Level)
    const syllables = countSyllables(text);
    let readability = 0;
    if (wordCount > 0 && sentences > 0) {
      readability = 0.39 * (wordCount / sentences) + 11.8 * (syllables / wordCount) - 15.59;
    }

    setStats({
      characters, wordCount, sentences, lines, vowels, consonants, numbers, avgWordLength, 
      syllables, readability: Math.max(0, parseFloat(readability.toFixed(1)))
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
          <Grid item xs={6} md={6}><StatBox label="Reading Grade Level" value={stats.readability} /></Grid>
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
        Paste any text into the box and click "Analyze". The tool will instantly calculate in-depth metrics including vowels, consonants, syllables, average word length, and a Flesch-Kincaid Reading Grade Level estimate.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Stats Analyzer"
      description="Advanced text analysis tool. Calculate readability, syllables, vowels, consonants, and word length instantly."
      url="/tools/text-stats-analyzer"
      content={content}
      category="Tools"
    >
      <TextStatsAnalyzerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextStatsAnalyzer;
