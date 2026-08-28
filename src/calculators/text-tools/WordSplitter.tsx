'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SplitBy = 'space' | 'newline' | 'comma' | 'custom';

const WordSplitterContent = () => {
  const [input, setInput] = useState('');
  const [splitBy, setSplitBy] = useState<SplitBy>('space');
  const [customDelimiter, setCustomDelimiter] = useState('|');
  const [sortWords, setSortWords] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [hasSplit, setHasSplit] = useState(false);

  const splitText = () => {
    setHasSplit(true);
    if (!input.trim()) {
      setWords([]);
      return;
    }

    let result: string[];
    switch (splitBy) {
      case 'space':
        result = input.split(/\s+/).filter(Boolean);
        break;
      case 'newline':
        result = input.split(/\n/).map((s) => s.trim()).filter(Boolean);
        break;
      case 'comma':
        result = input.split(/,/).map((s) => s.trim()).filter(Boolean);
        break;
      case 'custom':
        const escaped = customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        result = input.split(new RegExp(escaped)).map((s) => s.trim()).filter(Boolean);
        break;
    }

    if (sortWords) {
      result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    }

    setWords(result);
  };

  const charCount = input.length;
  const lineCount = input ? input.split('\n').length : 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Input Text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        rows={6}
        fullWidth
        placeholder="Enter or paste your text here..."
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Split By</InputLabel>
          <Select value={splitBy} label="Split By" onChange={(e) => setSplitBy(e.target.value as SplitBy)}>
            <MenuItem value="space">Space</MenuItem>
            <MenuItem value="newline">Newline</MenuItem>
            <MenuItem value="comma">Comma</MenuItem>
            <MenuItem value="custom">Custom Delimiter</MenuItem>
          </Select>
        </FormControl>
        {splitBy === 'custom' && (
          <TextField
            label="Custom Delimiter"
            value={customDelimiter}
            onChange={(e) => setCustomDelimiter(e.target.value)}
            fullWidth
            placeholder="|"
          />
        )}
        <FormControlLabel
          control={<Checkbox checked={sortWords} onChange={(e) => setSortWords(e.target.checked)} />}
          label="Sort Alphabetically"
        />
      </Box>

      <Button variant="contained" onClick={splitText} size="large">
        Split Text
      </Button>

      {hasSplit && (
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
          <Paper sx={{ p: 2, flex: 1, minWidth: 120, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Words</Typography>
            <Typography variant="h4">{words.length}</Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, minWidth: 120, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Characters</Typography>
            <Typography variant="h4">{charCount}</Typography>
          </Paper>
          <Paper sx={{ p: 2, flex: 1, minWidth: 120, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Lines</Typography>
            <Typography variant="h4">{lineCount}</Typography>
          </Paper>
        </Box>
      )}

      {hasSplit && words.length > 0 && (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>#</strong></TableCell>
                <TableCell><strong>Word</strong></TableCell>
                <TableCell align="right"><strong>Length</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {words.map((w, i) => (
                <TableRow key={i} hover>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{w}</TableCell>
                  <TableCell align="right">{w.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

const WordSplitter = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Word Splitter</Typography>
      <Typography variant="body1">
        Paste or type your text, choose a delimiter (space, newline, comma, or a custom character), and click &quot;Split Text&quot;. The tool splits your text into individual words and displays a table with word count, character count, and line count.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Splitting <code>apple, banana, cherry</code> by comma produces three words: &quot;apple&quot;, &quot;banana&quot;, and &quot;cherry&quot;.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I sort the results?</strong> Yes — check the &quot;Sort Alphabetically&quot; option before splitting.</li>
          <li><strong>What delimiter should I use?</strong> Choose &quot;Custom Delimiter&quot; and enter any character or string (e.g., <code>|</code>, <code>;</code>, or <code>::</code>) to split on.</li>
          <li><strong>Does it trim whitespace?</strong> Yes — leading and trailing whitespace around each word is automatically removed.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Splitting CSV or delimited data into individual fields.</li>
          <li>Breaking a paragraph into individual words for word counting.</li>
          <li>Extracting items from a comma-separated or newline-separated list.</li>
          <li>Preparing word lists for text analysis or data processing.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/word-splitter" content={content}>
      <WordSplitterContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordSplitter;
