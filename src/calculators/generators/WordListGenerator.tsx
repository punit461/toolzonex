'use client';

import { useState } from 'react';
import { Box, Button, Typography, Chip, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'nouns' | 'adjectives' | 'animals' | 'places';

const CATEGORY_LABELS: Record<Category, string> = {
  nouns: 'Common Nouns',
  adjectives: 'Adjectives',
  animals: 'Animals',
  places: 'Places',
};

const WORD_LISTS: Record<Category, string[]> = {
  nouns: [
    'table', 'window', 'guitar', 'bicycle', 'mountain', 'umbrella', 'pillow', 'garden',
    'camera', 'bottle', 'balloon', 'ladder', 'mirror', 'candle', 'blanket', 'basket',
    'clock', 'kettle', 'notebook', 'bridge', 'anchor', 'compass', 'lantern', 'wagon',
  ],
  adjectives: [
    'curious', 'gigantic', 'silent', 'vibrant', 'clumsy', 'ancient', 'shiny', 'fragile',
    'cheerful', 'mysterious', 'spotless', 'crooked', 'enormous', 'fuzzy', 'brilliant', 'soggy',
    'graceful', 'jagged', 'peculiar', 'radiant', 'sturdy', 'tangled', 'vivid', 'wobbly',
  ],
  animals: [
    'elephant', 'penguin', 'octopus', 'kangaroo', 'raccoon', 'flamingo', 'hedgehog', 'dolphin',
    'chameleon', 'peacock', 'otter', 'walrus', 'gazelle', 'toucan', 'armadillo', 'platypus',
    'meerkat', 'iguana', 'porcupine', 'jellyfish', 'wombat', 'ferret', 'stingray', 'antelope',
  ],
  places: [
    'library', 'volcano', 'desert', 'castle', 'harbor', 'orchard', 'lighthouse', 'canyon',
    'greenhouse', 'observatory', 'marketplace', 'waterfall', 'stadium', 'cottage', 'rainforest', 'shipyard',
    'monastery', 'glacier', 'boardwalk', 'vineyard', 'lagoon', 'plateau', 'quarry', 'campsite',
  ],
};

function pickRandomWords(category: Category, count: number): string[] {
  const list = WORD_LISTS[category];
  const shuffled = list.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const size = Math.min(count, shuffled.length);
  const result = shuffled.slice(0, size);
  while (result.length < count) {
    result.push(list[Math.floor(Math.random() * list.length)]);
  }
  return result;
}

const WordListGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('nouns');
  const [count, setCount] = useState(10);
  const [words, setWords] = useState<string[]>([]);

  const generate = () => {
    const n = Math.min(Math.max(Math.round(count) || 1, 1), 30);
    setWords(pickRandomWords(category, n));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5 }}>Category</Typography>
        <ToggleButtonGroup exclusive value={category} onChange={(_, val) => { if (val) setCategory(val); }} sx={{ flexWrap: 'wrap' }}>
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>{CATEGORY_LABELS[key]}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField
          label="How many words"
          type="number"
          size="small"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          inputProps={{ min: 1, max: 30 }}
          sx={{ width: 160 }}
        />
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Generate Word List
        </Button>
      </Box>

      {words.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {words.map((word, i) => (
            <Chip key={i} label={word} sx={{ fontSize: '0.95rem', textTransform: 'capitalize' }} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const WordListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Word List Generator Works</Typography>
      <Typography variant="body1">
        Choose a category — Common Nouns, Adjectives, Animals, or Places — pick how many words you need, and
        click &quot;Generate Word List&quot; for a random, non-repeating set of words from that category,
        perfect for word-based party games.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Select a word category.</li>
          <li>Choose how many words you want (up to 30).</li>
          <li>Click &quot;Generate Word List&quot; to get your random set of words.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;Animals&quot; with a count of 5 might produce: elephant, hedgehog, peacock, otter,
        chameleon — five random, unique words drawn from that category.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting words to draw or act out for games like Pictionary or Charades.</li>
          <li>Generating a word bank for Scattergories, word-association games, or writing prompts.</li>
          <li>Creating vocabulary lists for language learning or classroom activities.</li>
          <li>Sparking creative writing ideas with a random set of nouns, adjectives, or places.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can the same word appear twice in one list?</Typography>
      <Typography variant="body1">
        Words are shuffled and picked without repeats whenever possible. If you request more words than exist
        in a category, some repeats become unavoidable to fill the requested count.
      </Typography>
      <Typography variant="h3">Can I generate more than one list?</Typography>
      <Typography variant="body1">
        Yes — click &quot;Generate Word List&quot; again for a new, independently shuffled set of words from
        the same or a different category.
      </Typography>
      <Typography variant="h3">How many words are in each category?</Typography>
      <Typography variant="body1">
        Each category includes about two dozen curated words, chosen to be varied and useful for games rather
        than an exhaustive dictionary list.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/word-list-generator" content={content}>
      <WordListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WordListGenerator;
