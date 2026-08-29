'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WordFrequencyCounterContent = () => {
  const [text, setText] = useState('');
  const [caseInsensitive, setCaseInsensitive] = useState(true);

  const rows = useMemo(() => {
    const matched = text.match(/[a-zA-Z0-9']+/g);
    if (!matched) return [];

    const counts: Record<string, number> = {};
    matched.forEach((word) => {
      const key = caseInsensitive ? word.toLowerCase() : word;
      counts[key] = (counts[key] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [text, caseInsensitive]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste any text to see how often each word appears..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={8}
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox checked={caseInsensitive} onChange={(e) => setCaseInsensitive(e.target.checked)} />}
        label={'Case-insensitive ("The" and "the" count together)'}
        sx={{ alignSelf: 'flex-start' }}
      />

      {rows.length > 0 && (
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Word</strong></TableCell>
                <TableCell align="right"><strong>Occurrences</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(([word, count]) => (
                <TableRow key={word} hover>
                  <TableCell>{word}</TableCell>
                  <TableCell align="right">{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

const WordFrequencyCounter = () => {
  const content = (
    <>
      <Typography variant="h2">How to count word frequency online</Typography>
      <Typography variant="body1">
        Paste your text into the box above. Every distinct word is counted, and the full table below updates
        live, sorted from most to least frequent. Toggle case-insensitive matching to control whether
        &quot;The&quot; and &quot;the&quot; are combined into one row.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Pasting &quot;the cat sat on the mat, the cat was happy&quot; produces a table showing &quot;the&quot;
        with 3 occurrences, &quot;cat&quot; with 2, and every other word with 1, sorted by count descending.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Reviewing word repetition in an essay or article before editing.</li>
          <li>Getting a full frequency breakdown for text analysis or linguistics work.</li>
          <li>Spotting overused words that a summary bar chart might not show clearly.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Word Frequency Visualizer?</Typography>
      <Typography variant="body1">
        This tool shows a complete, sortable table of every distinct word and its exact count. The Word
        Frequency Visualizer instead shows only the top 15 words as a bar chart for a quicker visual overview —
        use whichever format suits your needs.
      </Typography>
      <Typography variant="h3">Is counting case-sensitive by default?</Typography>
      <Typography variant="body1">
        No — case-insensitive counting is on by default, so &quot;The&quot;, &quot;THE&quot;, and &quot;the&quot;
        are combined into a single row. Untick the option to count them separately.
      </Typography>
      <Typography variant="h3">Does it exclude common stopwords?</Typography>
      <Typography variant="body1">
        No — every word is counted, including common words like &quot;the&quot; and &quot;and&quot;. If you want
        frequent words with stopwords filtered out, use the Keyword Extractor tool instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/word-frequency-counter" content={content}>
      <WordFrequencyCounterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordFrequencyCounter;
