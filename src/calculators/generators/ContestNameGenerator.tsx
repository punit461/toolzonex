'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ADJECTIVES = [
  'Ultimate', 'Grand', 'Epic', 'Mega', 'Golden', 'Lightning', 'Winning', 'Big', 'Bonus', 'Champion',
  'Elite', 'Jackpot', 'Prime', 'Victory', 'Blockbuster', 'All-Star',
];

const NOUNS = [
  'Giveaway', 'Challenge', 'Showdown', 'Sweepstakes', 'Bash', 'Blitz', 'Round-Up', 'Contest', 'Race',
  'Rumble', 'Draw', 'Face-Off', 'Countdown', 'Quest', 'Shootout',
];

const TAGLINES = [
  'Grab & Win', 'Enter to Win', 'Play & Win', 'Spin & Win', 'Win Big', 'Unlock the Prize',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOne(): string {
  const style = Math.random();
  if (style < 0.6) {
    return `The ${pick(ADJECTIVES)} ${pick(NOUNS)}`;
  }
  return `${pick(TAGLINES)}: The ${pick(ADJECTIVES)} ${pick(NOUNS)}`;
}

function generateSet(count: number): string[] {
  const results = new Set<string>();
  let attempts = 0;
  while (results.size < count && attempts < count * 20) {
    results.add(generateOne());
    attempts++;
  }
  return Array.from(results);
}

const ContestNameGeneratorContent = () => {
  const [names, setNames] = useState<string[]>([]);

  const generate = () => setNames(generateSet(5));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<MilitaryTechIcon />} onClick={generate}>
        {names.length === 0 ? 'Generate Contest Names' : 'Regenerate'}
      </Button>

      {names.length > 0 && (
        <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 520 }}>
          {names.map((n) => (
            <Paper key={n} variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700}>
                {n}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

const ContestNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Contest Name Generator</Typography>
      <Typography variant="body1">
        Click &quot;Generate Contest Names&quot; for 5 catchy suggestions for a contest, giveaway, or
        competition. Each name combines an energetic adjective with a competition-style noun, and some are
        paired with an action-oriented tagline like &quot;Grab &amp; Win&quot; or &quot;Enter to Win&quot;.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One click might suggest &quot;The Ultimate Giveaway&quot;, &quot;Grand Showdown&quot;, or
        &quot;Win Big: The Golden Sweepstakes&quot; — ready to use as-is or as a starting point for your own
        branding.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming a social media giveaway or promotional contest.</li>
          <li>Finding a catchy title for an in-store or event competition.</li>
          <li>Brainstorming names for a raffle, sweepstakes, or prize draw.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>
            <strong>Are these names ready to publish as-is?</strong> Yes, most work fine directly, but feel
            free to tweak them with your brand name or a specific prize to make them more personal.
          </li>
          <li>
            <strong>Do these names include official contest rules or legal terms?</strong> No — this tool
            only generates a name. You&apos;ll still need to write your own official rules, eligibility
            terms, and prize details separately, and check local regulations for running contests.
          </li>
          <li>
            <strong>Can I regenerate if I don&apos;t like the options?</strong> Yes — click
            &quot;Regenerate&quot; as many times as you like for a fresh batch of 5 names.
          </li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/contest-name-generator" content={content}>
      <ContestNameGeneratorContent />
      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default ContestNameGenerator;
