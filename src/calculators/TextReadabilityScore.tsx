'use client';

import { useState } from 'react';
import { Box, Typography, Button, Paper, TextField, Grid } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const TextReadabilityScoreContent = () => {
  const [text, setText] = useState<string>('');

  const calculateSyllables = (word: string) => {
    word = word.toLowerCase();
    if(word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const match = word.match(/[aeiouy]{1,2}/g);
    return match ? match.length : 1;
  };

  const getStats = () => {
    if (!text.trim()) return { sentences: 0, words: 0, syllables: 0, characters: 0 };
    
    // Split by sentence terminators
    const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
    
    // Split by words
    const wordsMatch = text.match(/\b\w+\b/g);
    const words = wordsMatch ? wordsMatch.length : 0;
    
    // Calculate syllables
    const syllables = wordsMatch ? wordsMatch.reduce((acc, word) => acc + calculateSyllables(word), 0) : 0;
    
    const characters = text.replace(/\s/g, '').length;

    return { sentences, words, syllables, characters };
  };

  const calculateScores = () => {
    const stats = getStats();
    if (stats.words === 0 || stats.sentences === 0) return null;

    // Flesch Reading Ease
    // 206.835 - 1.015 * (Total Words / Total Sentences) - 84.6 * (Total Syllables / Total Words)
    const fkEase = 206.835 - 1.015 * (stats.words / stats.sentences) - 84.6 * (stats.syllables / stats.words);
    
    // Flesch-Kincaid Grade Level
    // 0.39 * (Total Words / Total Sentences) + 11.8 * (Total Syllables / Total Words) - 15.59
    const fkGrade = 0.39 * (stats.words / stats.sentences) + 11.8 * (stats.syllables / stats.words) - 15.59;
    
    // Automated Readability Index (ARI)
    // 4.71 * (Characters / Words) + 0.5 * (Words / Sentences) - 21.43
    const ari = 4.71 * (stats.characters / stats.words) + 0.5 * (stats.words / stats.sentences) - 21.43;

    return { 
      stats, 
      fkEase: Math.max(0, Math.min(100, fkEase)).toFixed(1),
      fkGrade: Math.max(0, fkGrade).toFixed(1),
      ari: Math.max(0, ari).toFixed(1)
    };
  };

  const scores = calculateScores();

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Paste your text here"
          multiline
          rows={12}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          placeholder="Paste your essay, article, or blog post to calculate readability scores..."
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="error" onClick={() => setText('')}>
            Clear Text
          </Button>
        </Box>
      </Box>

      {/* Results Panel */}
      <Box>
        {scores ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white', borderRadius: 4, textAlign: 'center' }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>Flesch Reading Ease</Typography>
              <Typography variant="h2" sx={{ fontWeight: 800, my: 1 }}>{scores.fkEase}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {Number(scores.fkEase) > 90 ? 'Very Easy to read.' : 
                 Number(scores.fkEase) > 70 ? 'Easy to read.' :
                 Number(scores.fkEase) > 50 ? 'Fairly difficult to read.' :
                 Number(scores.fkEase) > 30 ? 'Difficult to read.' :
                 'Very difficult to read.'}
              </Typography>
            </Paper>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary">F-K Grade Level</Typography>
                  <Typography variant="h5" fontWeight="bold" mt={1}>Grade {scores.fkGrade}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary">ARI Score</Typography>
                  <Typography variant="h5" fontWeight="bold" mt={1}>Grade {scores.ari}</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" mb={2}>Text Statistics</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">Words</Typography>
                  <Typography variant="body1" fontWeight="bold">{scores.stats.words}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Sentences</Typography>
                  <Typography variant="body1" fontWeight="bold">{scores.stats.sentences}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Syllables</Typography>
                  <Typography variant="body1" fontWeight="bold">{scores.stats.syllables}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">Characters</Typography>
                  <Typography variant="body1" fontWeight="bold">{scores.stats.characters}</Typography>
                </Box>
              </Box>
            </Paper>

          </Box>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Type or paste some text on the left to see its readability scores instantly. Requires at least one full sentence.
            </Typography>
          </Paper>
        )}
      </Box>

    </Box>
  );
};

const TextReadabilityScore = () => {
  const content = (
    <>
      <Typography variant="h2">Free Flesch-Kincaid Grade Level & Reading Ease Calculator</Typography>
      <Typography variant="body1">
        Check how easy your text is to read with a free Flesch-Kincaid readability checker. This tool calculates
        the standard Flesch Reading Ease score, the Flesch-Kincaid Grade Level, and the Automated Readability
        Index (ARI) — the same readability scores used by editors, teachers, and content writers. Perfect for
        authors, copywriters, and students who want to check reading level before publishing.
      </Typography>

      <Typography variant="h2">How to Use This Flesch-Kincaid Readability Checker</Typography>
      <Typography variant="body1">
        Paste your text into the input box and the Flesch Reading Ease score, Flesch-Kincaid Grade Level, and
        ARI score all calculate instantly — no sign-up, no upload, and no limit on text length.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A short, simple paragraph might score 80-90 on the Flesch Reading Ease scale (easy, roughly 6th-grade
        level), while dense academic writing often scores below 30 (very difficult, college-graduate level). A
        Flesch-Kincaid Grade Level of 8.0 means the text is written at roughly an 8th-grade reading level.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking a blog post or article reads at an accessible grade level before publishing.</li>
          <li>Simplifying technical writing for a general audience using writing level analysis.</li>
          <li>Using a readability tool to confirm marketing copy is easy to scan.</li>
          <li>Checking the reading level of school assignments, textbooks, or training material.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does the Flesch-Kincaid Grade Level number mean?</Typography>
      <Typography variant="body1">
        It&apos;s an approximate US school grade level needed to understand the text. For example, a
        Flesch-Kincaid Grade Level of 8.0 means the text should be readable by an average 8th grader (around age
        13). This calculator works it out from your text&apos;s average sentence length and average syllables
        per word using the formula: 0.39 × (words ÷ sentences) + 11.8 × (syllables ÷ words) − 15.59.
      </Typography>
      <Typography variant="h3">What does a Flesch Reading Ease score of 0-100 mean?</Typography>
      <Typography variant="body1">
        The Flesch Reading Ease score runs from 0 to 100 — the higher the number, the easier the text is to
        read. Roughly: 90-100 is very easy (5th-grade level), 60-70 is plain English (8th-9th grade), 30-50 is
        difficult (college level), and below 30 is very difficult (college-graduate/professional level).
      </Typography>
      <Typography variant="h3">What Flesch Reading Ease score is considered "easy"?</Typography>
      <Typography variant="body1">
        Scores of 60-70 are considered plain English, easily understood by 13-15 year olds; scores above 90 are
        very easy to read, while scores below 30 are considered very difficult (college graduate level).
      </Typography>
      <Typography variant="h3">What is the Flesch-Kincaid test?</Typography>
      <Typography variant="body1">
        It&apos;s actually two related formulas — the Flesch Reading Ease score (0-100, higher is easier) and
        the Flesch-Kincaid Grade Level (an approximate US school grade needed to understand the text). This
        calculator computes both at once from the same text, plus the Automated Readability Index (ARI) as a
        third readability score.
      </Typography>
      <Typography variant="h3">Is a readability checker the same as a Flesch-Kincaid calculator?</Typography>
      <Typography variant="body1">
        Yes — &quot;readability checker&quot;, &quot;readability score calculator&quot;, &quot;reading level
        calculator&quot;, and &quot;Flesch-Kincaid calculator&quot; all describe this same kind of tool. It
        analyzes sentence length and syllable count to score how easy your text is to read.
      </Typography>
      <Typography variant="h3">Is there a free Flesch-Kincaid calculator?</Typography>
      <Typography variant="body1">
        Yes — this tool is free, requires no sign-up, and runs entirely in your browser, so pasted text is
        never uploaded to a server.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Flesch-Kincaid Grade Level & Reading Ease Calculator"
      description="Calculate Flesch Reading Ease, Flesch-Kincaid grade level, and a readability score from any text."
      url="/tools/text-readability-score"
      content={content}
      category="Tools"
    >
      <TextReadabilityScoreContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TextReadabilityScore;
