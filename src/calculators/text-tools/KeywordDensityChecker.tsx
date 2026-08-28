'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const KeywordDensityCheckerContent = () => {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [keywordResult, setKeywordResult] = useState<{ count: number; density: number; totalWords: number } | null>(null);
  const [wordFrequencies, setWordFrequencies] = useState<{ word: string; count: number; density: number }[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const analyze = () => {
    setHasAnalyzed(true);
    if (!text.trim()) {
      setKeywordResult(null);
      setWordFrequencies([]);
      return;
    }

    const allWords = text.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
    const totalWords = allWords.length;

    if (keyword.trim()) {
      const kw = keyword.toLowerCase().trim();
      const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const matches = text.match(regex) || [];
      setKeywordResult({ count: matches.length, density: totalWords > 0 ? (matches.length / totalWords) * 100 : 0, totalWords });
    } else {
      setKeywordResult(null);
    }

    const freq: Record<string, number> = {};
    const stopWords = new Set(['the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but', 'his', 'from', 'they', 'she', 'which', 'what', 'their', 'has', 'would', 'there', 'could', 'about', 'when', 'into', 'then', 'than', 'only', 'its', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us']);
    allWords.forEach((w) => {
      if (!stopWords.has(w) && w.length > 2) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    const sorted = Object.entries(freq)
      .map(([word, count]) => ({ word, count, density: totalWords > 0 ? (count / totalWords) * 100 : 0 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setWordFrequencies(sorted);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Paste Your Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={8}
        fullWidth
        placeholder="Paste your article or blog post content here..."
      />

      <TextField
        label="Target Keyword (optional)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        fullWidth
        placeholder="Enter a keyword to check its density..."
      />

      <Button variant="contained" onClick={analyze} size="large">
        Analyze Keyword Density
      </Button>

      {hasAnalyzed && keywordResult && (
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Keyword Analysis: &quot;{keyword}&quot;</Typography>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="body2" color="text.secondary">Occurrences</Typography>
              <Typography variant="h4">{keywordResult.count}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Density</Typography>
              <Typography variant="h4">{keywordResult.density.toFixed(2)}%</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Total Words</Typography>
              <Typography variant="h4">{keywordResult.totalWords}</Typography>
            </Box>
          </Box>
        </Paper>
      )}

      {hasAnalyzed && wordFrequencies.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>Top 20 Word Frequencies</Typography>
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Word</strong></TableCell>
                  <TableCell align="right"><strong>Count</strong></TableCell>
                  <TableCell align="right" sx={{ width: '40%' }}><strong>Density (%)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wordFrequencies.map((row, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell>{row.word}</TableCell>
                    <TableCell align="right">{row.count}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                        <Typography variant="body2" sx={{ minWidth: 45 }}>{row.density.toFixed(2)}%</Typography>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(row.density * 10, 100)}
                          color={row.density > 5 ? 'error' : row.density > 2 ? 'success' : 'primary'}
                          sx={{ width: 100, height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {hasAnalyzed && !keywordResult && wordFrequencies.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">No content to analyze. Paste some text and try again.</Typography>
        </Paper>
      )}
    </Box>
  );
};

const KeywordDensityChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Keyword Density Checker</Typography>
      <Typography variant="body1">
        Paste your article, blog post, or webpage content into the text area. Optionally enter a target keyword to check its specific density. Click &quot;Analyze&quot; to see the keyword occurrence count, density percentage, and the top 20 most frequent words in your text.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In a 500-word article, if your target keyword appears 10 times, the density is 2.0%. The tool also shows the top 20 word frequencies so you can spot over-optimization or keyword stuffing.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What is a good keyword density?</strong> There is no universal ideal percentage. Aim for natural, readable content that addresses the user&apos;s intent rather than hitting a specific density number.</li>
          <li><strong>Does this tool count stop words?</strong> Stop words (like &quot;the&quot;, &quot;and&quot;, &quot;is&quot;) are excluded from the top 20 frequency list to focus on meaningful keywords.</li>
          <li><strong>Is keyword density still important for SEO?</strong> It is one signal among many. Search engines prioritize content quality, relevance, and user experience over keyword density alone.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a blog post before publishing to avoid keyword stuffing.</li>
          <li>Analyzing competitor content for keyword usage patterns.</li>
          <li>Verifying that your target keyword appears enough times in long-form content.</li>
          <li>Getting a quick overview of word frequency distribution in any text.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/keyword-density-checker" content={content}>
      <KeywordDensityCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default KeywordDensityChecker;
