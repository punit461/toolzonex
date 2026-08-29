'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .split('')
    .sort()
    .join('');

const AnagramCheckerContent = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  const { sortedA, sortedB, isAnagram, hasInput } = useMemo(() => {
    const sortedA = normalize(textA);
    const sortedB = normalize(textB);
    return {
      sortedA,
      sortedB,
      isAnagram: sortedA.length > 0 && sortedA === sortedB,
      hasInput: textA.trim().length > 0 && textB.trim().length > 0,
    };
  }, [textA, textB]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <TextField
          label="First word or phrase"
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
          multiline
          rows={4}
          fullWidth
          placeholder="e.g. listen"
        />
        <TextField
          label="Second word or phrase"
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
          multiline
          rows={4}
          fullWidth
          placeholder="e.g. silent"
        />
      </Box>

      {hasInput && (
        <Alert severity={isAnagram ? 'success' : 'info'}>
          {isAnagram
            ? 'These are anagrams of each other!'
            : 'These are not anagrams of each other.'}
        </Alert>
      )}

      {hasInput && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Sorted-letter comparison (case, spaces, and punctuation ignored)
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            &quot;{textA}&quot; → {sortedA || '(empty)'}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
            &quot;{textB}&quot; → {sortedB || '(empty)'}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const AnagramChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to check if two words are anagrams</Typography>
      <Typography variant="body1">
        Type one word or phrase into each box above. This tool ignores case, spaces, and punctuation, then
        compares the letters in each input — if both contain exactly the same letters (just rearranged), they
        are anagrams, and the result updates live as you type.
      </Typography>

      <Typography variant="h2">How the comparison works</Typography>
      <Typography variant="body1">
        Each input is lowercased, stripped of spaces and punctuation, and then its letters are sorted
        alphabetically. Two inputs are anagrams if and only if their sorted-letter strings are identical. For
        example, &quot;listen&quot; and &quot;silent&quot; both sort to &quot;eilnst&quot;, confirming they are
        anagrams.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;Astronomer&quot; and &quot;Moon starer&quot; both normalize and sort to the same letter sequence,
        confirming they&apos;re anagrams — spaces and capitalization don&apos;t affect the result.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Verifying word puzzle or crossword anagram answers.</li>
          <li>Checking anagram-based usernames, brand names, or wordplay.</li>
          <li>Teaching or learning about anagrams and letter rearrangement.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does it ignore spaces and punctuation?</Typography>
      <Typography variant="body1">
        Yes — spaces, punctuation, and capitalization are all ignored, so &quot;Dormitory&quot; and &quot;Dirty
        room&quot; are correctly identified as anagrams despite the different spacing.
      </Typography>
      <Typography variant="h3">Do the two phrases need the same number of words?</Typography>
      <Typography variant="body1">
        No — only the letters matter. A single word can be an anagram of a multi-word phrase, as long as the
        combined letters match exactly.
      </Typography>
      <Typography variant="h3">What if one box is empty?</Typography>
      <Typography variant="body1">
        The result only appears once both boxes contain at least one letter, since an anagram comparison needs
        two things to compare.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/anagram-checker" content={content}>
      <AnagramCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AnagramChecker;
