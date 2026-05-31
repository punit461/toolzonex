'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const CharacterDistributionAnalyzerContent = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{ char: string, count: number, density: number }[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const analyze = () => {
    setHasSearched(true);
    if (!text) {
      setResults([]);
      return;
    }

    const totalChars = text.length;
    const charCounts: Record<string, number> = {};
    
    for (let char of text) {
      if (char === ' ') char = 'Space';
      else if (char === '\n') char = 'Newline';
      charCounts[char] = (charCounts[char] || 0) + 1;
    }

    const densityList = Object.keys(charCounts)
      .map(char => ({
        char,
        count: charCounts[char],
        density: (charCounts[char] / totalChars) * 100
      }))
      .sort((a, b) => b.count - a.count);

    setResults(densityList);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste your text here to analyze character distribution..."
          value={text}
          onChange={(e) => { setText(e.target.value); setHasSearched(false); }}
          multiline
          rows={8}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button variant="contained" onClick={analyze} size="large">
          Analyze Characters
        </Button>
      </Box>

      {hasSearched && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Character Distribution
          </Typography>
          
          {results.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Character</strong></TableCell>
                    <TableCell align="right"><strong>Count</strong></TableCell>
                    <TableCell align="right" sx={{ width: '40%' }}><strong>Density (%)</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row, idx) => (
                    <TableRow key={idx} hover>
                      <TableCell>{row.char}</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                          <Typography variant="body2" sx={{ width: 45 }}>
                            {row.density.toFixed(2)}%
                          </Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min(row.density * 5, 100)} 
                            color="secondary"
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
              <Typography color="text.secondary">Enter text to see character analysis.</Typography>
            </Paper>
          )}
        </Box>
      )}
    </Box>
  );
};

const CharacterDistributionAnalyzer = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Character Distribution Analyzer?</Typography>
      <Typography variant="body1">
        Paste any text into the box and click "Analyze Characters". The tool will count every single character—including spaces, newlines, numbers, and punctuation—and calculate their exact frequency and percentage across the entire text.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Character Distribution Analyzer"
      description="Analyze the exact frequency and distribution of every character in your text. Free online character counting tool."
      url="/tools/character-distribution-analyzer"
      content={content}
      category="Tools"
    >
      <CharacterDistributionAnalyzerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CharacterDistributionAnalyzer;
