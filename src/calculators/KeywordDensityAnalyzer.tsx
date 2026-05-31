'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const KeywordDensityAnalyzerContent = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{ word: string, count: number, density: number }[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const analyze = () => {
    setHasSearched(true);
    if (!text.trim()) {
      setResults([]);
      return;
    }

    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g); // Words 3+ chars
    if (!words) {
      setResults([]);
      return;
    }

    const totalWords = words.length;
    
    // Stop words to ignore for SEO density (basic list)
    const stopWords = new Set(['the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but', 'his', 'from', 'they', 'she', 'which', 'what', 'their', 'has', 'would', 'there', 'could', 'about', 'when', 'into', 'then', 'than', 'only', 'its', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us']);

    const wordCounts: Record<string, number> = {};
    words.forEach(word => {
      if (!stopWords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });

    const densityList = Object.keys(wordCounts)
      .map(word => ({
        word,
        count: wordCounts[word],
        density: (wordCounts[word] / totalWords) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 50); // Top 50

    setResults(densityList);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste your article or webpage content here to analyze keyword density..."
          value={text}
          onChange={(e) => { setText(e.target.value); setHasSearched(false); }}
          multiline
          rows={8}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={analyze} size="large">
          Analyze Keyword Density
        </Button>
      </Box>

      {hasSearched && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Keyword Density Results (Top 50 words)
          </Typography>
          
          {results.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Keyword</strong></TableCell>
                    <TableCell align="right"><strong>Count</strong></TableCell>
                    <TableCell align="right" sx={{ width: '40%' }}><strong>Density (%)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{row.word}</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                          <Typography variant="body2" sx={{ width: 40 }}>
                            {row.density.toFixed(2)}%
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min(row.density * 10, 100)} // Scale for visual (10% = full bar)
                            color={row.density > 5 ? "error" : row.density > 2 ? "success" : "primary"}
                            sx={{ width: 100, height: 8, borderRadius: 4 }}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">No valid keywords found. Try adding more text.</Typography>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

const KeywordDensityAnalyzer = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Keyword Density Analyzer?</Typography>
      <Typography variant="body1">
        Paste your article, blog post, or webpage copy into the text area and click "Analyze". The tool will instantly count the frequency of all meaningful words (ignoring common stop words like 'the', 'and', etc.) and calculate their percentage compared to the total word count.
      </Typography>

      <Typography variant="h2">Why is Keyword Density Important for SEO?</Typography>
      <Typography variant="body1">
        Keyword density helps search engines understand what your page is about. If your density is too low, search engines might miss your topic. If it's too high (keyword stuffing), you might get penalized. Most SEO experts recommend keeping your primary keyword density between 1% and 3%. This free checker helps you find that perfect balance.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Keyword Density Analyzer"
      description="Check the keyword density of your text for SEO optimization. Free online tool to avoid keyword stuffing."
      url="/tools/keyword-density-analyzer"
      content={content}
      category="Tools"
    >
      <KeywordDensityAnalyzerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default KeywordDensityAnalyzer;
