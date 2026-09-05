'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const UniqueWordsFinderContent = () => {
  const [text, setText] = useState('');

  const { uniqueWords, repeatedCount, distinctCount } = useMemo(() => {
    const matched = text.toLowerCase().match(/[a-zA-Z0-9']+/g);
    if (!matched) return { uniqueWords: [], repeatedCount: 0, distinctCount: 0 };

    const counts: Record<string, number> = {};
    matched.forEach((w) => {
      counts[w] = (counts[w] || 0) + 1;
    });

    const entries = Object.entries(counts);
    const onceOnly = entries.filter(([, c]) => c === 1).map(([w]) => w);
    const repeated = entries.filter(([, c]) => c > 1).length;

    return { uniqueWords: onceOnly, repeatedCount: repeated, distinctCount: entries.length };
  }, [text]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField
        label="Input Text"
        placeholder="Paste any text to find words that occur exactly once..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={8}
        fullWidth
      />

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', minWidth: 160 }}>
          <Typography variant="body2" color="text.secondary">Distinct Words</Typography>
          <Typography variant="h5" fontWeight={700}>{distinctCount}</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', minWidth: 160 }}>
          <Typography variant="body2" color="text.secondary">Words Used Once</Typography>
          <Typography variant="h5" fontWeight={700} color="primary.main">{uniqueWords.length}</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', minWidth: 160 }}>
          <Typography variant="body2" color="text.secondary">Words That Repeat</Typography>
          <Typography variant="h5" fontWeight={700}>{repeatedCount}</Typography>
        </Paper>
      </Stack>

      {uniqueWords.length > 0 && (
        <Box>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>Words That Occur Exactly Once</Typography>
          <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {uniqueWords.map((w) => (
              <Chip key={w} label={w} size="small" />
            ))}
          </Paper>
        </Box>
      )}
    </Box>
  );
};

const UniqueWordsFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Unique Words Finder Works</Typography>
      <Typography variant="body1">
        Paste your text into the box above. The tool counts every distinct word (case-insensitively) and
        specifically surfaces the words that occur exactly one time — true &quot;unique&quot; occurrences —
        listing them separately from words that repeat two or more times, along with a total count of
        distinct words.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        In &quot;the cat sat on the mat, the cat was happy&quot;, &quot;the&quot; and &quot;cat&quot; each
        appear more than once and are excluded, while &quot;sat&quot;, &quot;on&quot;, &quot;mat&quot;,
        &quot;was&quot;, and &quot;happy&quot; each occur exactly once and are listed as unique words.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking word-choice variety in an essay or article by seeing which words aren&apos;t repeated.</li>
          <li>Spotting rare or standout terms in a large body of text.</li>
          <li>Reviewing vocabulary diversity in creative writing or a vocabulary exercise.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Word Frequency Counter?</strong> The Word Frequency Counter shows a full table of every distinct word sorted by how often it occurs, including words that repeat many times. This Unique Words Finder has a narrower purpose — it surfaces only the words that occur exactly once, which the frequency table doesn&apos;t call out on its own.</li>
          <li><strong>Is word matching case-sensitive?</strong> No — matching is case-insensitive, so &quot;The&quot; and &quot;the&quot; are treated as the same word when counting occurrences.</li>
          <li><strong>Does punctuation affect the word count?</strong> Words are matched using letters, numbers, and apostrophes, so surrounding punctuation like periods and commas doesn&apos;t affect matching, though it does mean a word directly followed by punctuation with no space is still correctly separated.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/unique-words-finder" content={content}>
      <UniqueWordsFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default UniqueWordsFinder;
