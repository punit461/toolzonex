'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LongestWordFinderContent = () => {
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    const words = text.match(/[A-Za-z0-9''-]+/g) || [];
    if (words.length === 0) return { longest: [] as string[], maxLength: 0, topTen: [] as string[] };

    const maxLength = Math.max(...words.map((w) => w.length));
    const longest = Array.from(new Set(words.filter((w) => w.length === maxLength)));

    const uniqueSorted = Array.from(new Set(words)).sort((a, b) => b.length - a.length);
    const topTen = uniqueSorted.slice(0, 10);

    return { longest, maxLength, topTen };
  }, [text]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Paste or type text to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={12}
          fullWidth
        />
      </Box>

      <Box>
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">
            {analysis.longest.length > 1 ? 'Longest Words (tied)' : 'Longest Word'}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ wordBreak: 'break-word' }}>
            {analysis.longest.length > 0 ? analysis.longest.join(', ') : '—'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {analysis.maxLength} character{analysis.maxLength === 1 ? '' : 's'}
          </Typography>
        </Paper>

        {analysis.topTen.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
              Top 10 Longest Words
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {analysis.topTen.map((w, i) => (
                <Chip key={`${w}-${i}`} label={`${w} (${w.length})`} variant="outlined" />
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const LongestWordFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Longest Word Finder Works</Typography>
      <Typography variant="body1">
        Paste or type any text and this tool scans every word, finds the longest one, and shows its character
        count. If two or more words are tied for the longest, all of them are shown together rather than
        arbitrarily picking just one. A ranked list of the ten longest unique words in your text is shown
        alongside it, for a quick overview beyond just the single longest word.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In the sentence &quot;The quick brown fox jumped extraordinarily gracefully,&quot; the longest word is
        &quot;extraordinarily&quot; at 15 characters, followed by &quot;gracefully&quot; at 10 characters in the
        top-10 list.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the longest word in an essay, article, or speech before a readability check.</li>
          <li>Settling a word-game debate about which word in a passage is longest.</li>
          <li>Spotting unusually long or complex words worth simplifying for clearer writing.</li>
          <li>Quick text analysis for teaching vocabulary or spelling lessons.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How are words separated for counting?</Typography>
      <Typography variant="body1">
        Text is split on anything that isn&apos;t a letter, number, apostrophe, or hyphen, so hyphenated words
        like &quot;well-known&quot; and contractions like &quot;don&apos;t&quot; are counted as single words
        rather than being split apart.
      </Typography>
      <Typography variant="h3">What happens if multiple words are tied for longest?</Typography>
      <Typography variant="body1">
        All words tied for the maximum length are shown together, rather than the tool arbitrarily picking just
        one — so you see every word that shares the top spot.
      </Typography>
      <Typography variant="h3">Are duplicate words counted separately in the top 10 list?</Typography>
      <Typography variant="body1">
        No — the top 10 list shows unique words only, so a repeated long word appears once rather than taking up
        multiple slots in the ranking.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/longest-word-finder" content={content}>
      <LongestWordFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LongestWordFinder;
