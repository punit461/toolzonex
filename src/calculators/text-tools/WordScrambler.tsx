'use client';

import { useState } from 'react';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function scrambleWord(word: string, mode: string): string {
  if (word.length < 4) return word;
  const letters = word.split('');

  if (mode === 'middle') {
    const middle = shuffle(letters.slice(1, -1));
    return [letters[0], ...middle, letters[letters.length - 1]].join('');
  }
  // full
  return shuffle(letters).join('');
}

const WordScramblerContent = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('middle');

  const handleScramble = () => {
    const scrambled = text
      .split(/(\s+)/)
      .map((token) => (/^\s+$/.test(token) ? token : token.replace(/[A-Za-z]+/, (w) => scrambleWord(w, mode))))
      .join('');
    setResult(scrambled);
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
    } catch (err) {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ minWidth: 0 }}>
        <TextField
          label="Input Text"
          placeholder="Type or paste text to scramble..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Scramble Mode</InputLabel>
            <Select
              value={mode}
              label="Scramble Mode"
              onChange={(e) => setMode(e.target.value)}
            >
              <MenuItem value="middle">Keep First &amp; Last Letter (still readable)</MenuItem>
              <MenuItem value="full">Scramble All Letters (fully random)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" onClick={handleScramble} fullWidth size="large">
          Scramble Text
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          {result && (
             <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
               Copy
             </Button>
          )}
        </Box>
        <TextField
          value={result}
          multiline
          rows={12}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Scrambled text will appear here..."
        />
      </Box>
    </Box>
  );
};

const WordScrambler = () => {
  const content = (
    <>
      <Typography variant="h2">How to use the Word Scrambler?</Typography>
      <Typography variant="body1">
        Type or paste your text, choose a scramble mode, and click &quot;Scramble Text&quot;. Words shorter than 4 letters are left unchanged since there&apos;s nothing meaningful to scramble.
      </Typography>

      <Typography variant="h2">Scramble Modes Explained</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Keep First &amp; Last Letter:</strong> Only shuffles the middle letters, based on the famous &quot;Cambridge University&quot; readability effect — the word usually stays readable even though the middle is jumbled.</li>
          <li><strong>Scramble All Letters:</strong> Randomizes every letter in the word, including the first and last, for a fully unreadable jumble.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With &quot;Keep First &amp; Last Letter&quot; mode, &quot;hello world&quot; might become &quot;hlelo
        wrold&quot; — still readable at a glance. With &quot;Scramble All Letters&quot;, the same input might
        become &quot;oellh dowlr&quot; — much harder to read.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating word-jumble puzzles or classroom vocabulary games.</li>
          <li>Demonstrating how the brain reads words by letter shape rather than strict letter order.</li>
          <li>Generating scrambled placeholder text for design mockups.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQ</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this the same as a text scrambler or &quot;scramblinator&quot;?</strong> Yes — this tool is a text scrambler (sometimes searched as a &quot;scramblinator&quot;) that jumbles the letters in each word while leaving spacing and word order untouched.</li>
          <li><strong>Why are short words left unchanged?</strong> Words under 4 letters don&apos;t have enough middle letters to scramble meaningfully.</li>
          <li><strong>Is the scramble the same every time?</strong> No, each click produces a new random shuffle.</li>
          <li><strong>Is my text uploaded anywhere?</strong> No — scrambling happens entirely in your browser.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell
      url="/text-tools/word-scrambler"
      content={content}
    >
      <WordScramblerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordScrambler;
