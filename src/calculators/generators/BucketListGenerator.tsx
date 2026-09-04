'use client';

import { useState, useCallback } from 'react';
import { Box, Typography, Paper, Button, Checkbox, FormControlLabel, Chip, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const IDEAS: Record<string, string[]> = {
  Adventure: [
    'Go skydiving',
    'Ride in a hot air balloon',
    'Go scuba diving on a coral reef',
    'Hike to a mountain summit',
    'Go white-water rafting',
    'Sleep under the stars in the desert',
    'Swim with dolphins',
    'Go on a multi-day backpacking trip',
  ],
  Travel: [
    'See the Northern Lights',
    'Visit all seven continents',
    'Walk the Great Wall of China',
    'See the pyramids of Giza',
    'Visit Machu Picchu',
    'Take a solo trip abroad',
    'Road trip across your home country',
    'Visit Japan during cherry blossom season',
  ],
  'Personal Growth': [
    'Run a marathon',
    'Learn to meditate consistently',
    'Overcome a personal fear',
    'Go a full month without social media',
    'Write in a journal every day for a year',
    'Volunteer for a cause you care about',
    'Read 50 books in a year',
  ],
  Creative: [
    'Write and finish a short novel',
    'Learn to paint with watercolors',
    'Start a blog or YouTube channel',
    'Write and record an original song',
    'Take a pottery class',
    'Publish a piece of writing',
  ],
  'Food & Drink': [
    'Cook a meal from every continent',
    'Try 10 cuisines you have never had',
    'Take a wine or coffee tasting class',
    'Bake bread completely from scratch',
    'Grow your own vegetables and cook with them',
    'Attend a food festival abroad',
  ],
  'Skills to Learn': [
    'Learn to speak a new language',
    'Learn to play a musical instrument',
    'Learn to code a simple app',
    'Learn to swim confidently',
    'Learn basic self-defense',
    'Learn to drive a manual transmission car',
    'Learn to dance (salsa, swing, or ballroom)',
  ],
  'Relationships/Family': [
    'Plan a big family reunion',
    'Reconnect with an old friend',
    'Write letters to loved ones',
    'Take your parents on a trip',
    'Host a big dinner party for friends',
    'Trace your family tree / genealogy',
  ],
};

function pickRandom<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const result: T[] = [];
  while (copy.length && result.length < n) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

const ALL_IDEAS: { idea: string; category: string }[] = Object.entries(IDEAS).flatMap(([category, ideas]) =>
  ideas.map((idea) => ({ idea, category }))
);

const BucketListGeneratorContent = () => {
  const [ideas, setIdeas] = useState<{ idea: string; category: string }[]>([]);
  const [kept, setKept] = useState<Record<string, boolean>>({});

  const generate = useCallback(() => {
    setIdeas(pickRandom(ALL_IDEAS, 10));
  }, []);

  const toggle = (idea: string) => {
    setKept((prev) => ({ ...prev, [idea]: !prev[idea] }));
  };

  return (
    <Box>
      <Button variant="contained" size="large" startIcon={<RefreshIcon />} onClick={generate} sx={{ mb: 3 }}>
        {ideas.length === 0 ? 'Generate Ideas' : 'Regenerate'}
      </Button>

      {ideas.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          {ideas.map(({ idea, category }) => (
            <Box key={idea} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
              <FormControlLabel
                control={<Checkbox checked={!!kept[idea]} onChange={() => toggle(idea)} />}
                label={
                  <Typography sx={{ fontWeight: kept[idea] ? 700 : 400 }}>{idea}</Typography>
                }
              />
              <Chip label={category} size="small" variant="outlined" />
            </Box>
          ))}
          {Object.values(kept).some(Boolean) && (
            <Stack sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" color="text.secondary">Kept ideas:</Typography>
              <Typography variant="body2">
                {ideas.filter((i) => kept[i.idea]).map((i) => i.idea).join(', ')}
              </Typography>
            </Stack>
          )}
        </Paper>
      )}
    </Box>
  );
};

const BucketListGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Bucket List Generator</Typography>
      <Typography variant="body1">
        Click &quot;Generate Ideas&quot; to get a random selection of 10 bucket-list ideas pulled from a pool
        of concrete suggestions spanning Adventure, Travel, Personal Growth, Creative, Food & Drink, Skills to
        Learn, and Relationships & Family. If nothing grabs you, click &quot;Regenerate&quot; for a fresh mix.
        Check the box next to any idea you want to keep — kept ideas are shown in bold and summarized at the
        bottom of the list.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking Generate might surface a mix like &quot;See the Northern Lights&quot; (Travel), &quot;Run a
        marathon&quot; (Personal Growth), and &quot;Learn to play a musical instrument&quot; (Skills to
        Learn) — checking any of these keeps them highlighted while you keep regenerating for more ideas.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sparking inspiration when starting a personal bucket list from scratch.</li>
          <li>Finding a mix of ideas across categories instead of only thinking of travel goals.</li>
          <li>Discovering new goal ideas to discuss with friends or a partner for the year ahead.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Will I see the same 10 ideas every time?</strong> No — each click of Generate or Regenerate randomly selects 10 ideas from the full pool of around 50, so results vary each time.</li>
          <li><strong>Are the checked ideas saved anywhere?</strong> No — kept ideas are only tracked while you have the page open and reset if you reload, so copy down any ideas you want to keep permanently.</li>
          <li><strong>Can I get more than 10 ideas at once?</strong> Not in a single batch, but you can keep clicking Regenerate to see different random selections until you&apos;ve seen everything in the pool.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/bucket-list-generator" content={content}>
      <BucketListGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BucketListGenerator;
