'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, LinearProgress, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const TOP_N = 15;

const WordFrequencyVisualizerContent = () => {
  const [text, setText] = useState('');

  const topWords = useMemo(() => {
    const words = text.toLowerCase().match(/[a-z0-9']+/g);
    if (!words) return [];

    const counts: Record<string, number> = {};
    words.forEach((word) => {
      counts[word] = (counts[word] || 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, TOP_N);
    const max = sorted.length > 0 ? sorted[0][1] : 1;
    return sorted.map(([word, count]) => ({ word, count, percent: (count / max) * 100 }));
  }, [text]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste an article, essay, or any block of text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={8}
        fullWidth
      />

      {topWords.length > 0 && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight="600" gutterBottom>
            Top {topWords.length} Most Frequent Words
          </Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {topWords.map(({ word, count, percent }) => (
              <Box key={word} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ width: 120, fontFamily: 'monospace', flexShrink: 0 }}>
                  {word}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={percent}
                  sx={{ flexGrow: 1, height: 12, borderRadius: 1 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ width: 40, textAlign: 'right', flexShrink: 0 }}>
                  {count}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

const WordFrequencyVisualizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to visualize word frequency</Typography>
      <Typography variant="body1">
        Paste any block of text into the box above. This tool counts every word, ranks them from most to least
        frequent, and displays the top 15 as a horizontal bar chart — the longest bar is the most repeated word,
        and every bar is scaled relative to it.
      </Typography>

      <Typography variant="h2">Why visualize word frequency?</Typography>
      <Typography variant="body1">
        A bar-style view makes repetition easy to spot at a glance compared to a plain table of numbers. It&apos;s
        useful for quickly seeing which words dominate a piece of writing, without needing to read every count
        individually.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting a short story shows character names and common verbs as the longest bars, instantly revealing
        which words the writing leans on most heavily.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Spotting overused words in a draft before editing.</li>
          <li>Getting a quick visual sense of a document&apos;s dominant vocabulary.</li>
          <li>Comparing word emphasis across different pieces of writing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this case-sensitive?</Typography>
      <Typography variant="body1">
        No — all words are lowercased before counting, so &quot;The&quot; and &quot;the&quot; are combined into
        one bar.
      </Typography>
      <Typography variant="h3">How many words does it show?</Typography>
      <Typography variant="body1">
        The top 15 most frequent words are shown as bars. For a full table of every distinct word and its
        count, use the Word Frequency Counter tool instead.
      </Typography>
      <Typography variant="h3">Does it exclude common words like &quot;the&quot; or &quot;and&quot;?</Typography>
      <Typography variant="body1">
        No — this tool visualizes raw frequency for every word as typed. If you want frequent words with common
        stopwords filtered out, use the Keyword Extractor tool instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/word-frequency-visualizer" content={content}>
      <WordFrequencyVisualizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordFrequencyVisualizer;
