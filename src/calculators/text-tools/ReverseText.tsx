'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'characters' | 'words';

const ReverseTextContent = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<Mode>('characters');

  const result = useMemo(() => {
    if (mode === 'characters') return text.split('').reverse().join('');
    return text.split(/(\s+)/).reverse().join('');
  }, [text, mode]);

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
    } catch {}
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Input Text"
          placeholder="Type or paste text to reverse..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={10}
          fullWidth
          sx={{ mb: 2 }}
        />
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, value) => value && setMode(value)}
          fullWidth
          size="small"
        >
          <ToggleButton value="characters">Reverse Characters</ToggleButton>
          <ToggleButton value="words">Reverse Word Order</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="600">Result (updates live):</Typography>
          {result && (
            <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyResult}>
              Copy
            </Button>
          )}
        </Box>
        <TextField
          value={result}
          multiline
          rows={10}
          fullWidth
          InputProps={{ readOnly: true }}
          placeholder="Reversed text will appear here..."
        />
      </Box>
    </Box>
  );
};

const ReverseText = () => {
  const content = (
    <>
      <Typography variant="h2">How to reverse text online</Typography>
      <Typography variant="body1">
        Type or paste your text into the box above. There&apos;s no button to click — the reversed result
        updates live as you type. Switch between &quot;Reverse Characters&quot; (flips the entire string
        backwards, letter by letter) and &quot;Reverse Word Order&quot; (keeps each word intact but reverses
        the order they appear in) using the toggle.
      </Typography>

      <Typography variant="h2">Reverse Characters vs. Reverse Word Order</Typography>
      <Typography variant="body1">
        &quot;Reverse Characters&quot; turns &quot;Hello World&quot; into &quot;dlroW olleH&quot; — every
        character, including spaces and punctuation, is flipped end to end. &quot;Reverse Word Order&quot;
        turns &quot;Hello World&quot; into &quot;World Hello&quot; — the words themselves stay spelled
        correctly, only their sequence is flipped.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        &quot;The quick brown fox&quot; in character-reverse mode becomes &quot;xof nworb kciuq ehT&quot;. In
        word-order mode it becomes &quot;fox brown quick The&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating mirrored or novelty text for messages and puzzles.</li>
          <li>Quickly flipping word order in a short phrase without retyping it.</li>
          <li>Checking how a string reads backwards, e.g. for palindrome testing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Text Reverser tool?</Typography>
      <Typography variant="body1">
        Our Text Reverser page offers four modes (full reverse, word order, per-word letters, and line order)
        behind a manual &quot;Reverse&quot; button. This page is a simpler, quicker alternative with just the
        two most common modes and a live result that updates as you type, with no button needed.
      </Typography>
      <Typography variant="h3">Does reversing affect spaces and punctuation?</Typography>
      <Typography variant="body1">
        In &quot;Reverse Characters&quot; mode, yes — every character including spaces and punctuation is
        reversed along with the letters. In &quot;Reverse Word Order&quot; mode, punctuation attached to a word
        travels with it.
      </Typography>
      <Typography variant="h3">Can I reverse just the letters within each word?</Typography>
      <Typography variant="body1">
        Not on this page — for reversing letters inside each word while keeping word order, or for reversing
        line order, use the full Text Reverser tool, which supports those additional modes.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/text-tools/reverse-text" content={content}>
      <ReverseTextContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ReverseText;
