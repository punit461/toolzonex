'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const WordFrequencyAnalyzerContent = () => {
  const [text, setText] = useState<string>('');
  const [ignoreCommon, setIgnoreCommon] = useState<boolean>(true);

  // A very basic set of common stop words
  const stopWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'are', 'is', 'am', 'was', 'were', 'has', 'had']);

  const getWordFrequencies = () => {
    if (!text.trim()) return [];
    
    // Convert to lowercase and get words
    const wordsMatch = text.toLowerCase().match(/\b[a-z']+\b/g);
    if (!wordsMatch) return [];

    const frequencyMap: Record<string, number> = {};
    let totalCount = 0;

    wordsMatch.forEach(word => {
      if (ignoreCommon && stopWords.has(word)) return;
      if (word.length < 2 && ignoreCommon) return; // ignore single letters
      
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
      totalCount++;
    });

    const sortedArr = Object.keys(frequencyMap).map(word => ({
      word,
      count: frequencyMap[word],
      percentage: ((frequencyMap[word] / (totalCount || 1)) * 100).toFixed(1)
    })).sort((a, b) => b.count - a.count);

    return sortedArr.slice(0, 50); // top 50
  };

  const frequencies = getWordFrequencies();

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Paste your text here"
          multiline
          rows={12}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          placeholder="Paste text here to analyze word frequencies..."
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            variant={ignoreCommon ? "contained" : "outlined"} 
            onClick={() => setIgnoreCommon(!ignoreCommon)}
          >
            {ignoreCommon ? 'Stop Words Ignored' : 'Including Stop Words'}
          </Button>
          <Button variant="outlined" color="error" onClick={() => setText('')}>
            Clear Text
          </Button>
        </Box>
      </Box>

      {/* Output Panel */}
      <Box>
        {frequencies.length > 0 ? (
          <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6">Top Words Frequency</Typography>
            </Box>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Word</strong></TableCell>
                    <TableCell align="right"><strong>Count</strong></TableCell>
                    <TableCell align="right"><strong>Percentage</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {frequencies.map((f, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{f.word}</TableCell>
                      <TableCell align="right">{f.count}</TableCell>
                      <TableCell align="right">{f.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Paste text on the left to see the most frequently used words.
            </Typography>
          </Paper>
        )}
      </Box>

    </Box>
  );
};

const WordFrequencyAnalyzer = () => {
  const content = (
    <>
      <Typography variant="h2">Word Frequency Analyzer</Typography>
      <Typography variant="body1">
        Find out which words are used the most in any text document. This tool counts every word and calculates its frequency percentage. You can optionally ignore common English stop words (like 'the', 'and', 'is') to focus on the unique keywords in your content.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Word Frequency Analyzer"
      description="Find the most frequently used words in a text. Calculate keyword density and word counts instantly online."
      url="/tools/word-frequency-analyzer"
      content={content}
      category="Tools"
    >
      <WordFrequencyAnalyzerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordFrequencyAnalyzer;
