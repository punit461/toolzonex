'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

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
      <Typography variant="h2">Free keyword density checker: how it works</Typography>
      <Typography variant="body1">
        Paste your article, blog post, or webpage copy into the text area and click &quot;Analyze&quot;. This free
        keyword density checker instantly counts the frequency of all meaningful words (ignoring common stop
        words like &apos;the&apos;, &apos;and&apos;, etc.) and calculates their percentage compared to the total
        word count — no sign-up needed.
      </Typography>

      <Typography variant="h2">Using this SEO keyword checker for keyword density analysis</Typography>
      <Typography variant="body1">
        Use the results to spot repeated terms and to check whether your writing reads naturally. There is no universal
        ideal percentage: useful content should answer the reader&apos;s question clearly, rather than repeat a phrase to
        reach a target number. This keyword density tool makes those patterns easy to review before publishing.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In a 500-word article, a word used 10 times has a density of roughly 2%. Review that result in context to
        make sure the wording is still helpful and natural.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a blog post or product page isn&apos;t over-optimized before publishing.</li>
          <li>Analyzing a competitor&apos;s page for keyword usage patterns.</li>
          <li>Using a free keyword density checker before submitting content to a client or CMS.</li>
          <li>Running a quick SEO keyword checker on page copy alongside a manual review.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is there a free keyword density checker?</Typography>
      <Typography variant="body1">
        Yes — this keyword density checker is completely free, works on any text or webpage copy you paste in,
        and requires no sign-up.
      </Typography>
      <Typography variant="h3">What&apos;s a good keyword density?</Typography>
      <Typography variant="body1">
        There is no fixed ideal percentage. Use keyword density as an editing signal, then prioritise relevance,
        clarity, and complete coverage of the topic.
      </Typography>
      <Typography variant="h3">Is a keyword density checker the same as an SEO keyword checker?</Typography>
      <Typography variant="body1">
        Yes — this tool works as both. It finds every meaningful keyword in your text, counts how often each one
        appears, and calculates its density (percentage) so you can spot over-optimization or missing keyword
        coverage before publishing.
      </Typography>
      <Typography variant="h3">How do I find keyword density online?</Typography>
      <Typography variant="body1">
        Paste your article, blog post, or webpage copy into the box and click &quot;Analyze Keyword
        Density&quot; — the tool instantly lists every keyword&apos;s count and density percentage, ranked from
        most to least frequent.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/text-tools/keyword-density-analyzer"
      content={content}
    >
      <KeywordDensityAnalyzerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default KeywordDensityAnalyzer;
