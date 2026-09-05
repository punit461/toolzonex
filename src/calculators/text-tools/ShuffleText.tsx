'use client';

import { useCallback, useState } from 'react';
import { Box, TextField, Typography, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'characters' | 'words' | 'lines';

function fisherYatesShuffle<T>(arr: T[]): T[] {
  const result = arr.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffleText(text: string, mode: Mode): string {
  if (mode === 'characters') {
    return fisherYatesShuffle(text.split('')).join('');
  }
  if (mode === 'words') {
    return fisherYatesShuffle(text.split(/(\s+)/).filter((s) => s.trim() !== '')).join(' ');
  }
  return fisherYatesShuffle(text.split('\n')).join('\n');
}

const ShuffleTextContent = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<Mode>('words');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const doShuffle = useCallback(() => {
    setOutput(shuffleText(text, mode));
  }, [text, mode]);

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        label="Input Text"
        placeholder="Type or paste text to shuffle..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={6}
        fullWidth
      />

      <Box>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Shuffle mode:</Typography>
        <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)}>
          <ToggleButton value="characters">Characters</ToggleButton>
          <ToggleButton value="words">Words</ToggleButton>
          <ToggleButton value="lines">Lines</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" startIcon={<ShuffleIcon />} onClick={doShuffle} disabled={!text} size="large">
        {output ? 'Shuffle Again' : 'Shuffle'}
      </Button>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result:</Typography>
          <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult} disabled={!output}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          value={output}
          multiline
          rows={6}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Shuffled text will appear here..."
        />
      </Box>
    </Box>
  );
};

const ShuffleText = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Shuffle Text Tool</Typography>
      <Typography variant="body1">
        Paste your text, choose whether to shuffle individual characters, whole words (each word stays intact
        but their order is randomized), or entire lines, then click Shuffle. Click &quot;Shuffle Again&quot; any
        time to get a fresh random order. Under the hood, this uses a proper Fisher-Yates shuffle rather than a
        naive <code>sort(() =&gt; Math.random() - 0.5)</code>, which is statistically biased and doesn&apos;t
        produce a truly random order.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Shuffling the words in &quot;the quick brown fox jumps&quot; might produce &quot;fox jumps the quick
        brown&quot; — each word stays whole, only their positions change. Shuffling the same text by character
        instead would scramble every letter individually.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Randomizing the order of quiz questions, raffle entries, or a list of names in a fair way.</li>
          <li>Scrambling letters within a word set for anagram or word-puzzle games.</li>
          <li>Randomizing the line order of a playlist, task list, or set of prompts.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the tool use a Fisher-Yates shuffle instead of sorting with Math.random?</strong> Sorting an array with a random comparator is a common shortcut, but it produces a statistically biased result where some orderings are far more likely than others. Fisher-Yates guarantees every possible ordering is equally likely, giving a genuinely fair shuffle.</li>
          <li><strong>Is this random number generator secure enough for anything sensitive?</strong> It uses JavaScript&apos;s standard <code>Math.random()</code>, which is fine for shuffling text, games, or raffles, but it isn&apos;t cryptographically secure — don&apos;t rely on it for anything security-sensitive like generating passwords or keys.</li>
          <li><strong>What happens to spacing when shuffling words?</strong> Words are extracted, shuffled, and rejoined with single spaces, so original multiple-space or line-break formatting between words isn&apos;t preserved in word mode — use line mode if you need to keep each line&apos;s internal formatting intact.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/shuffle-text" content={content}>
      <ShuffleTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ShuffleText;
