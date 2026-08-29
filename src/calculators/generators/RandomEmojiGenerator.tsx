'use client';

import { useState } from 'react';
import { Box, Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'all' | 'faces' | 'animals' | 'food' | 'objects';

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All',
  faces: 'Faces',
  animals: 'Animals',
  food: 'Food',
  objects: 'Objects',
};

const EMOJI_BY_CATEGORY: Record<Exclude<Category, 'all'>, string[]> = {
  faces: ['😀', '😂', '😍', '😎', '🤔', '😴', '🥳', '😭', '🤯', '🙃', '😇', '🥸'],
  animals: ['🐶', '🐱', '🦊', '🐼', '🦁', '🐸', '🐵', '🦄', '🐝', '🐳', '🦉', '🐧'],
  food: ['🍕', '🍔', '🍣', '🌮', '🍩', '🍦', '🍇', '🍉', '🥑', '🍪', '🧀', '🍿'],
  objects: ['🎈', '🎸', '📱', '💡', '🎁', '🚀', '⚽', '🎨', '📚', '🔑', '⏰', '🧩'],
};

const RandomEmojiGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('all');
  const [count, setCount] = useState(1);
  const [emojis, setEmojis] = useState<string[]>([]);

  const generate = () => {
    const pool = category === 'all'
      ? Object.values(EMOJI_BY_CATEGORY).flat()
      : EMOJI_BY_CATEGORY[category];
    setEmojis(Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Category</Typography>
        <ToggleButtonGroup exclusive value={category} onChange={(_, val) => { if (val) setCategory(val); }} sx={{ flexWrap: 'wrap' }}>
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>{CATEGORY_LABELS[key]}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>How many</Typography>
        <ToggleButtonGroup exclusive value={count} onChange={(_, val) => { if (val) setCount(val); }}>
          {[1, 3, 5, 10].map((n) => (
            <ToggleButton key={n} value={n} sx={{ textTransform: 'none' }}>{n}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate Emoji
      </Button>

      {emojis.length > 0 && (
        <Typography sx={{ fontSize: '3rem', lineHeight: 1.4, textAlign: 'center' }}>
          {emojis.join(' ')}
        </Typography>
      )}
    </Box>
  );
};

const RandomEmojiGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Emoji Generator Works</Typography>
      <Typography variant="body1">
        Pick a category — Faces, Animals, Food, Objects, or All — choose how many emoji you want, and click
        &quot;Generate Emoji&quot; to get a random selection from a curated emoji list.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choose a category, or leave it on &quot;All&quot; to pull from every category.</li>
          <li>Pick how many emoji to generate at once (1, 3, 5, or 10).</li>
          <li>Click &quot;Generate Emoji&quot; and copy the result directly from the page.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        With &quot;Animals&quot; selected and a count of 3, you might get 🦊 🐼 🐝 — three random emoji from
        that category shown together.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking a random emoji for a social media post, caption, or status update.</li>
          <li>Finding inspiration for an emoji-based game like Emoji Pictionary or guessing games.</li>
          <li>Adding a random fun element to a message, playlist name, or username.</li>
          <li>Choosing a random reaction emoji for a poll or group chat.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I generate emoji from more than one category at once?</Typography>
      <Typography variant="body1">
        Yes — select &quot;All&quot; to draw randomly from every category&apos;s emoji combined.
      </Typography>
      <Typography variant="h3">Can the same emoji repeat in one batch?</Typography>
      <Typography variant="body1">
        Yes — each position in the batch is chosen independently at random, so the same emoji can appear more
        than once, especially with smaller categories.
      </Typography>
      <Typography variant="h3">How do I copy the emoji?</Typography>
      <Typography variant="body1">
        Simply select the emoji text on the page and copy it like any other text, or tap and hold on mobile to
        bring up the copy option.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-emoji-generator" content={content}>
      <RandomEmojiGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomEmojiGenerator;
