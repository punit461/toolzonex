'use client';

import { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper, Grid } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import TimerIcon from '@mui/icons-material/Timer';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import CalculatorShell from '../components/CalculatorShell';

const TextSizeCalculatorContent = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
    readingTime: '',
    speakingTime: '',
    bytes: 0,
  });

  useEffect(() => {
    if (!text) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: '0 min',
        speakingTime: '0 min',
        bytes: 0,
      });
      return;
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const lines = text.split('\n').length;
    const bytes = new TextEncoder().encode(text).length;
    
    const readingMinutes = Math.ceil(words / 225);
    const readingTime = `${readingMinutes} min`;
    
    const speakingMinutes = Math.ceil(words / 150);
    const speakingTime = `${speakingMinutes} min`;

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs: paragraphs || (text.trim() ? 1 : 0),
      lines,
      readingTime,
      speakingTime,
      bytes,
    });
  }, [text]);

  const StatCard = ({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) => (
    <Paper sx={{ p: 2, textAlign: 'center' }}>
      <Box sx={{ color: 'primary.main', mb: 1 }}>{icon}</Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );

  return (
    <Box>
      <TextField
        label="Enter or paste your text"
        placeholder="Start typing or paste your text here to analyze..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={8}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="Characters" value={stats.characters.toLocaleString()} icon={<ArticleIcon />} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="No Spaces" value={stats.charactersNoSpaces.toLocaleString()} icon={<ArticleIcon />} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="Words" value={stats.words.toLocaleString()} icon={<ArticleIcon />} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="Sentences" value={stats.sentences.toLocaleString()} icon={<ArticleIcon />} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="Paragraphs" value={stats.paragraphs.toLocaleString()} icon={<ArticleIcon />} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="Lines" value={stats.lines.toLocaleString()} icon={<ArticleIcon />} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="Reading Time" value={stats.readingTime} icon={<TimerIcon />} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="Speaking Time" value={stats.speakingTime} icon={<TimerIcon />} />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <StatCard label="Size (bytes)" value={stats.bytes.toLocaleString()} icon={<DataUsageIcon />} />
        </Grid>
      </Grid>
    </Box>
  );
};

const TextSizeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">What is text analysis?</Typography>
      <Typography variant="body1">
        Text analysis provides detailed statistics about written content, including character count, 
        word count, sentence count, paragraph count, and estimated reading/speaking time.
      </Typography>

      <Typography variant="h2">How to analyze text?</Typography>
      <Typography variant="body1">
        Paste or type your text into the input field. The tool instantly displays statistics including 
        character count (with and without spaces), word count, sentence count, paragraphs, lines, and estimated reading time.
      </Typography>

      <Typography variant="h2">Use cases for text analysis</Typography>
      <Typography variant="body1">
        • Blog writing - Check article length and reading time
        • Content optimization - Ensure content meets minimum/maximum word count requirements
        • Academic writing - Count words for essays and papers
        • Social media - Check character count for posts and captions
        • Speech writing - Estimate speaking time based on word count
        • Email marketing - Optimize email length for better engagement
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Text Size Calculator"
      description="Analyze text with character count, word count, reading time and more. Free online text analyzer tool."
      url="/tools/text-size-calculator"
      content={content}
      category="Tools"
    >
      <TextSizeCalculatorContent />
    </CalculatorShell>
  );
};

export default TextSizeCalculator;