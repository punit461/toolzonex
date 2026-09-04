'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'all' | 'appearance' | 'personality' | 'achievement';

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'Surprise Me',
  appearance: 'Appearance',
  personality: 'Personality',
  achievement: 'Achievement',
};

const COMPLIMENTS: Record<Exclude<Category, 'all'>, string[]> = {
  appearance: [
    'Your smile is contagious — it brightens up the whole room.',
    'You have a great sense of style that reflects who you are.',
    'You always look put-together, even on your busiest days.',
    'Your eyes light up whenever you talk about something you love.',
    'You carry yourself with a quiet, natural confidence.',
    'Your laugh is one of the most genuine sounds around.',
    'You have a warmth to your presence that people notice right away.',
    'Your energy is refreshing to be around.',
    'You always find a way to look comfortable and confident at the same time.',
    'There is something effortlessly put-together about how you present yourself.',
  ],
  personality: [
    'You have a rare gift for making people feel heard.',
    'Your kindness never seems to run out, even on hard days.',
    'You bring out the best in the people around you.',
    'You have a way of turning ordinary moments into fun ones.',
    'Your honesty is one of your most admirable qualities.',
    'You are remarkably patient, even under pressure.',
    'People trust you because you always follow through.',
    'Your curiosity about the world is inspiring.',
    'You make it easy for others to be themselves around you.',
    'Your sense of humor can turn around anyone\'s bad day.',
    'You have a calming presence that puts people at ease.',
    'You genuinely celebrate other people\'s wins, no jealousy involved.',
  ],
  achievement: [
    'The effort you put into your work really shows.',
    'You should be proud of how far you have come.',
    'Your persistence through setbacks is genuinely impressive.',
    'You have a knack for figuring things out that stump everyone else.',
    'The way you handled that challenge showed real growth.',
    'Your attention to detail sets your work apart.',
    'You keep raising your own bar, and it shows.',
    'People can count on you to get things done right.',
    'Your growth over the past year has been remarkable.',
    'You turned a tough situation into something you can be proud of.',
    'Your work ethic is something a lot of people could learn from.',
  ],
};

const ComplimentGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('all');
  const [compliment, setCompliment] = useState<string | null>(null);

  const generate = () => {
    const pools: Exclude<Category, 'all'>[] =
      category === 'all' ? ['appearance', 'personality', 'achievement'] : [category];
    const pool = pools.flatMap((key) => COMPLIMENTS[key]);
    setCompliment(pool[Math.floor(Math.random() * pool.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Category</Typography>
        <ToggleButtonGroup exclusive value={category} onChange={(_, val) => val && setCategory(val)}>
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>
              {CATEGORY_LABELS[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate Compliment
      </Button>

      {compliment && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 520 }}>
          <Typography variant="h5" fontWeight={700} sx={{ fontStyle: 'italic' }}>
            &quot;{compliment}&quot;
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const ComplimentGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Compliment Generator Works</Typography>
      <Typography variant="body1">
        Pick a category — Appearance, Personality, Achievement, or &quot;Surprise Me&quot; to draw from all
        three — then click &quot;Generate Compliment&quot; for a genuine, tasteful compliment drawn from a
        curated list.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing Personality might generate &quot;You have a rare gift for making people feel heard,&quot;
        while Achievement might generate &quot;Your persistence through setbacks is genuinely impressive.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Brightening someone&apos;s day with a thoughtful message.</li>
          <li>Finding the right words when writing a card or note.</li>
          <li>Practicing giving and receiving compliments more naturally.</li>
          <li>Adding a kind word to a team message, email, or social post.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these compliments appropriate to share with anyone?</Typography>
      <Typography variant="body1">
        Yes — every compliment is written to be warm, genuine, and appropriate for a general audience,
        whether you&apos;re sharing it with a friend, family member, or coworker.
      </Typography>
      <Typography variant="h3">How many compliments does this generate from?</Typography>
      <Typography variant="body1">
        The tool draws from a curated list of over 30 compliments spread across the three categories.
      </Typography>
      <Typography variant="h3">Can I get the same compliment twice in a row?</Typography>
      <Typography variant="body1">
        Yes — each click picks independently from the selected category&apos;s list, so repeats are possible.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/compliment-generator" content={content}>
      <ComplimentGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ComplimentGenerator;
