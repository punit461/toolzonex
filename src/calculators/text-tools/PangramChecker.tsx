'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Chip, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const PangramCheckerContent = () => {
  const [text, setText] = useState('The quick brown fox jumps over the lazy dog');

  const { present, missing, isPangram } = useMemo(() => {
    const lower = text.toLowerCase();
    const presentSet = new Set<string>();
    for (const ch of lower) {
      if (ch >= 'a' && ch <= 'z') presentSet.add(ch);
    }
    const missingLetters = ALPHABET.filter((l) => !presentSet.has(l));
    return { present: presentSet, missing: missingLetters, isPangram: missingLetters.length === 0 };
  }, [text]);

  return (
    <Box>
      <TextField
        label="Enter text to check"
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={5}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Paper
        variant="outlined"
        sx={{
          p: 3,
          mb: 3,
          textAlign: 'center',
          bgcolor: isPangram ? 'success.main' : 'action.hover',
          color: isPangram ? 'success.contrastText' : 'text.primary',
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          {isPangram ? 'Yes — this is a pangram!' : 'No — not a pangram'}
        </Typography>
      </Paper>

      <Typography variant="subtitle2" gutterBottom>Alphabet Coverage</Typography>
      <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
        {ALPHABET.map((letter) => (
          <Chip
            key={letter}
            label={letter.toUpperCase()}
            color={present.has(letter) ? 'success' : 'default'}
            variant={present.has(letter) ? 'filled' : 'outlined'}
            sx={{ opacity: present.has(letter) ? 1 : 0.5, fontWeight: 700 }}
          />
        ))}
      </Stack>

      {!isPangram && missing.length > 0 && (
        <Typography variant="body2" color="text.secondary">
          Missing letters: {missing.map((l) => l.toUpperCase()).join(', ')}
        </Typography>
      )}
    </Box>
  );
};

const PangramChecker = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Pangram Checker</Typography>
      <Typography variant="body1">
        Type or paste any text into the box above. The tool checks — case-insensitively and ignoring numbers,
        spaces, and punctuation — whether your text contains every one of the 26 letters of the English
        alphabet at least once. A row of 26 letter chips highlights each letter green as soon as it appears
        anywhere in your text, while letters that haven&apos;t appeared stay dimmed. If your text isn&apos;t a
        full pangram, the exact missing letters are listed below the chips.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;The quick brown fox jumps over the lazy dog&quot; is a classic pangram — it contains all 26
        letters, so every chip lights up green and the verdict reads &quot;Yes — this is a pangram!&quot;
        Removing the word &quot;lazy&quot; would leave the letters L, A, and Z either fully or partially
        missing depending on the rest of the sentence.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Testing whether a sentence you wrote qualifies as a pangram for a puzzle or font specimen.</li>
          <li>Checking font-preview or typing-test sentences for full alphabet coverage.</li>
          <li>Playing pangram-writing word games with friends or students.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does capitalization matter?</strong> No — the check is entirely case-insensitive, so uppercase and lowercase versions of a letter both count as that letter being present.</li>
          <li><strong>Do numbers and punctuation affect the result?</strong> No — only the 26 letters A through Z are checked; digits, spaces, and punctuation marks are ignored completely.</li>
          <li><strong>What is a pangram used for?</strong> Pangrams are commonly used to preview fonts (since every letterform appears at least once), in typing practice, and as a classic word-puzzle challenge to write the shortest possible sentence containing every letter.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/pangram-checker" content={content}>
      <PangramCheckerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PangramChecker;
