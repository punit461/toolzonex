'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const IsogramCheckerContent = () => {
  const [text, setText] = useState('');

  const { isIsogram, repeated, hasLetters } = useMemo(() => {
    const letters = text.toLowerCase().replace(/[^a-z]/g, '');
    if (!letters) return { isIsogram: false, repeated: [] as { letter: string; count: number }[], hasLetters: false };

    const counts: Record<string, number> = {};
    for (const ch of letters) counts[ch] = (counts[ch] || 0) + 1;

    const repeated = Object.entries(counts)
      .filter(([, count]) => count > 1)
      .map(([letter, count]) => ({ letter, count }))
      .sort((a, b) => b.count - a.count);

    return { isIsogram: repeated.length === 0, repeated, hasLetters: true };
  }, [text]);

  return (
    <Box>
      <TextField
        label="Enter a word or phrase"
        placeholder="e.g. subdermatoglyphic"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 3 }}
      />

      {hasLetters && (
        <>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mb: 3,
              textAlign: 'center',
              bgcolor: isIsogram ? 'success.main' : 'action.hover',
              color: isIsogram ? 'success.contrastText' : 'text.primary',
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              {isIsogram ? 'Yes — this is an isogram!' : 'No — not an isogram'}
            </Typography>
          </Paper>

          {!isIsogram && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>Repeated Letters</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {repeated.map(({ letter, count }) => (
                  <Paper key={letter} variant="outlined" sx={{ px: 2, py: 1 }}>
                    <Typography variant="body2">
                      <strong>{letter.toUpperCase()}</strong>: {count} times
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

const IsogramChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Isogram Checker</Typography>
      <Typography variant="body1">
        Type or paste a word or phrase into the box. The tool checks — case-insensitively and ignoring spaces
        and punctuation — whether any letter repeats. If every letter appears only once, it&apos;s an isogram
        and you&apos;ll see a green &quot;Yes&quot; verdict. If a letter repeats, you get a clear &quot;No&quot;
        along with exactly which letter(s) repeat and how many times each one appears.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;subdermatoglyphic&quot; is a genuine isogram — every one of its letters appears exactly once.
        &quot;isogram&quot; itself is NOT an isogram, since the letter &quot;s&quot; would need checking, but
        &quot;hello&quot; clearly isn&apos;t, since &quot;l&quot; appears twice.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Checking word-game or puzzle entries for isogram status.</li>
          <li>Finding unique, non-repeating-letter names or usernames.</li>
          <li>Exploring linguistics or vocabulary trivia around isograms.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Pangram Checker?</strong> A pangram must contain EVERY letter of the alphabet at least once. An isogram must contain NO letter more than once. These are nearly opposite concepts that are easy to confuse by name, even though both deal with letter coverage.</li>
          <li><strong>Does spacing between words count against being an isogram?</strong> No — spaces and punctuation are ignored entirely, so a multi-word phrase is checked purely on its letters, treating it the same as if the words were joined together.</li>
          <li><strong>Is capitalization considered when checking for repeats?</strong> No — the check is case-insensitive, so &quot;A&quot; and &quot;a&quot; count as the same letter and would count as a repeat if both appeared.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/isogram-checker" content={content}>
      <IsogramCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default IsogramChecker;
