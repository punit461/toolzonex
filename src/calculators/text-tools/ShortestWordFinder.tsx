'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ShortestWordFinderContent = () => {
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    const words = text.match(/[A-Za-z0-9''-]+/g) || [];
    if (words.length === 0) return { shortest: [] as string[], minLength: 0, bottomTen: [] as string[] };

    const minLength = Math.min(...words.map((w) => w.length));
    const shortest = Array.from(new Set(words.filter((w) => w.length === minLength)));

    const uniqueSorted = Array.from(new Set(words)).sort((a, b) => a.length - b.length);
    const bottomTen = uniqueSorted.slice(0, 10);

    return { shortest, minLength, bottomTen };
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
            {analysis.shortest.length > 1 ? 'Shortest Words (tied)' : 'Shortest Word'}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ wordBreak: 'break-word' }}>
            {analysis.shortest.length > 0 ? analysis.shortest.join(', ') : '—'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {analysis.minLength} character{analysis.minLength === 1 ? '' : 's'}
          </Typography>
        </Paper>

        {analysis.bottomTen.length > 0 && (
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
              Shortest 10 Words
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {analysis.bottomTen.map((w, i) => (
                <Chip key={`${w}-${i}`} label={`${w} (${w.length})`} variant="outlined" />
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const ShortestWordFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Shortest Word Finder Works</Typography>
      <Typography variant="body1">
        Paste or type any text and this tool scans every word, finds the shortest one, and shows its character
        count. If two or more words are tied for the shortest, all of them are shown together rather than
        arbitrarily picking just one. A ranked list of the ten shortest unique words in your text is shown
        alongside it, for a quick overview beyond just the single shortest word.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In the sentence &quot;A quick brown fox jumped over it,&quot; the shortest words are &quot;A&quot; and
        &quot;it&quot; is 2 characters while &quot;A&quot; is 1 character, so &quot;A&quot; is shown as the
        single shortest word at 1 character.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the shortest word in an essay, article, or speech for writing analysis.</li>
          <li>Settling a word-game debate about which word in a passage is shortest.</li>
          <li>Quick text analysis for teaching vocabulary or spelling lessons.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How are words separated for counting?</strong> Text is split on anything that isn&apos;t a letter, number, apostrophe, or hyphen, so hyphenated words like &quot;well-known&quot; and contractions like &quot;don&apos;t&quot; are counted as single words rather than being split apart.</li>
          <li><strong>What happens if multiple words are tied for shortest?</strong> All words tied for the minimum length are shown together, rather than the tool arbitrarily picking just one — so you see every word that shares the shortest spot.</li>
          <li><strong>Are duplicate words counted separately in the shortest 10 list?</strong> No — the list shows unique words only, so a repeated short word appears once rather than taking up multiple slots in the ranking.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/shortest-word-finder" content={content}>
      <ShortestWordFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ShortestWordFinder;
