'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const DuplicateWordFinderContent = () => {
  const [text, setText] = useState('');
  const [duplicates, setDuplicates] = useState<Array<{ word: string, count: number }>>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFind = () => {
    setHasSearched(true);
    const words = text.toLowerCase().match(/\b\w+\b/g);
    
    if (!words) {
      setDuplicates([]);
      return;
    }

    const wordCounts: Record<string, number> = {};
    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    const duplicatesList = Object.keys(wordCounts)
      .filter(word => wordCounts[word] > 1)
      .map(word => ({ word, count: wordCounts[word] }))
      .sort((a, b) => b.count - a.count); // Sort by highest frequency

    setDuplicates(duplicatesList);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste an article or paragraph to find repeating words..."
          value={text}
          onChange={(e) => { setText(e.target.value); setHasSearched(false); }}
          multiline
          rows={8}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={handleFind} size="large">
          Find Duplicate Words
        </Button>
      </Box>

      {hasSearched && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Results: Found {duplicates.length} words used more than once.
          </Typography>
          
          {duplicates.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Word</strong></TableCell>
                    <TableCell align="right"><strong>Count</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {duplicates.map((row, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{row.word}</TableCell>
                      <TableCell align="right">
                        <Chip label={row.count} color={row.count > 5 ? "error" : row.count > 3 ? "warning" : "default"} size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">No duplicate words found in the text.</Typography>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

const DuplicateWordFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Duplicate Word Finder?</Typography>
      <Typography variant="body1">
        Paste your text into the input field and click "Find Duplicate Words". The tool will analyze your text, ignore punctuation, and provide a list of words that appear more than once, sorted by their frequency.
      </Typography>

      <Typography variant="h2">Improve your writing</Typography>
      <Typography variant="body1">
        Using the same word too frequently can make writing feel repetitive and dull. This tool helps writers, editors, and students identify overused words so they can replace them with synonyms and improve the overall flow and vocabulary of their text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Duplicate Word Finder"
      description="Find repeated words in your text to improve your writing and vocabulary. Free online duplicate word checker."
      url="/tools/duplicate-word-finder"
      content={content}
      category="Tools"
    >
      <DuplicateWordFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DuplicateWordFinder;
