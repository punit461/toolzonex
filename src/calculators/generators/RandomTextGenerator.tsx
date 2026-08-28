'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'words' | 'sentences' | 'paragraphs';

const WORDS = [
  'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'cat', 'house',
  'tree', 'river', 'mountain', 'ocean', 'forest', 'light', 'shadow', 'time', 'year',
  'day', 'night', 'sun', 'moon', 'star', 'cloud', 'rain', 'wind', 'fire', 'earth',
  'water', 'stone', 'gold', 'silver', 'iron', 'wood', 'glass', 'paper', 'book', 'page',
  'word', 'letter', 'story', 'tale', 'song', 'music', 'color', 'paint', 'dream', 'hope',
  'joy', 'peace', 'love', 'friend', 'family', 'home', 'city', 'town', 'road', 'path',
  'gate', 'wall', 'door', 'window', 'room', 'table', 'chair', 'lamp', 'candle', 'night',
  'morning', 'evening', 'season', 'spring', 'summer', 'autumn', 'winter', 'harvest', 'garden', 'flower',
  'bird', 'fish', 'horse', 'sheep', 'wolf', 'bear', 'deer', 'rabbit', 'mouse', 'eagle',
  'dragon', 'kingdom', 'queen', 'king', 'knight', 'sword', 'shield', 'arrow', 'bow', 'spear',
  'castle', 'tower', 'bridge', 'hill', 'valley', 'field', 'meadow', 'stream', 'lake', 'island',
  'coast', 'cliff', 'cave', 'desert', 'jungle', 'ice', 'snow', 'storm', 'thunder', 'lightning',
  'river', 'bridge', 'market', 'village', 'church', 'school', 'library', 'museum', 'hall', 'square',
  'road', 'lane', 'street', 'alley', 'garden', 'park', 'plaza', 'fountain', 'statue', 'clock',
  'bell', 'horn', 'drum', 'flute', 'harp', 'lyre', 'song', 'dance', 'feast', 'wine',
  'bread', 'meat', 'cheese', 'fruit', 'apple', 'pear', 'grape', 'berry', 'bean', 'grain',
  'honey', 'milk', 'cream', 'butter', 'soup', 'stew', 'roast', 'cake', 'pie', 'sugar',
  'salt', 'pepper', 'herb', 'spice', 'oak', 'pine', 'maple', 'willow', 'birch', 'cedar',
  'rose', 'lily', 'tulip', 'daisy', 'thorn', 'vine', 'leaf', 'root', 'branch', 'trunk',
  'nest', 'wing', 'feather', 'beak', 'claw', 'scale', 'shell', 'horn', 'tail', 'shadow',
];

const SUBJECTS = ['The cat', 'A brave knight', 'The old wizard', 'Every child', 'The captain', 'My friend', 'The fox', 'A quiet bird', 'The traveler', 'The young artist'];
const VERBS = ['found', 'built', 'remembered', 'discovered', 'carried', 'painted', 'watched', 'joined', 'started', 'created'];
const OBJECTS = ['the ancient map', 'a shining lantern', 'the hidden valley', 'an old wooden chest', 'the secret garden', 'a broken crown', 'the far mountain', 'an empty room', 'the silver river', 'a forgotten song'];
const CONNECTORS = ['However', 'Meanwhile', 'After a while', 'In the end', 'Suddenly', 'Later', 'That morning', 'By sunset'];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function makeSentence(): string {
  const s = pick(SUBJECTS);
  const v = pick(VERBS);
  const o = pick(OBJECTS);
  return `${s} ${v} ${o}.`;
}

function makeParagraph(): string {
  const count = 3 + Math.floor(Math.random() * 6);
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) {
    if (i > 0 && Math.random() < 0.4) {
      sentences.push(` ${pick(CONNECTORS).toLowerCase()}, ${makeSentence().slice(0, -1).toLowerCase()}.`);
    } else {
      sentences.push(makeSentence());
    }
  }
  return sentences.join(' ');
}

function generate(mode: Mode, count: number): string {
  const n = Math.max(1, count);
  if (mode === 'words') {
    return Array.from({ length: n }, () => pick(WORDS)).join(' ');
  }
  if (mode === 'sentences') {
    return Array.from({ length: n }, makeSentence).join(' ');
  }
  return Array.from({ length: n }, makeParagraph).join('\n\n');
}

const MODES: { value: Mode; label: string }[] = [
  { value: 'words', label: 'Words' },
  { value: 'sentences', label: 'Sentences' },
  { value: 'paragraphs', label: 'Paragraphs' },
];

const RandomTextGeneratorContent = () => {
  const [mode, setMode] = useState<Mode>('words');
  const [count, setCount] = useState(50);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setOutput(generate(mode, count));
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 760, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { sm: 'center' }, flexWrap: 'wrap' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, v) => v && setMode(v)}
        >
          {MODES.map((m) => (
            <ToggleButton key={m.value} value={m.value}>{m.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>

        <TextField
          type="number"
          label={mode === 'words' ? 'Words' : mode === 'sentences' ? 'Sentences' : 'Paragraphs'}
          value={count}
          onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
          inputProps={{ min: 1 }}
          sx={{ width: 140 }}
        />

        <Button variant="contained" startIcon={<CasinoIcon />} onClick={handleGenerate}>
          Generate
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button startIcon={<ContentCopyIcon />} onClick={copy} disabled={!output} size="small">
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
        <TextField
          multiline
          rows={12}
          value={output}
          inputProps={{ readOnly: true, style: { fontFamily: 'monospace' } }}
          fullWidth
          variant="standard"
        />
      </Paper>
    </Box>
  );
};

const RandomTextGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How does it work?</Typography>
      <Typography variant="body1">
        Pick a mode — Words, Sentences, or Paragraphs — set how many you want, and click "Generate." Word mode
        pulls random common English words, sentence mode builds random subject-verb-object sentences with proper
        capitalization and punctuation, and paragraph mode assembles 3–8 sentences into each paragraph.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing "Sentences" with a count of 3 might produce something like "The captain discovered the hidden
        valley. The fox carried the silver river. A quiet bird started the secret garden."
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating placeholder filler text for design mockups and layouts.</li>
          <li>Generating sample text for testing editors, formatters, or word counters.</li>
          <li>Providing demo content while building or presenting a document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this the same as Lorem Ipsum?</Typography>
      <Typography variant="body1">
        It serves a similar purpose, but instead of the traditional Latin Lorem Ipsum text it generates readable
        English words, sentences, and paragraphs.
      </Typography>
      <Typography variant="h3">Can I control how much I get?</Typography>
      <Typography variant="body1">
        Yes — set the count for words, sentences, or paragraphs before generating. Each click produces a fresh
        random batch.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-text-generator" content={content}>
      <RandomTextGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomTextGenerator;
