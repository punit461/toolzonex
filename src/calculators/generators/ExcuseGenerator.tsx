'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup, Alert } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'work' | 'school' | 'social';

const CATEGORY_LABELS: Record<Category, string> = {
  work: 'Work',
  school: 'School',
  social: 'Social',
};

const EXCUSES: Record<Category, string[]> = {
  work: [
    'My cat unplugged my router during an important video call.',
    'I accidentally set three alarms and somehow slept through all of them.',
    'My smart fridge sent me forty notifications and I lost track of time.',
    'I was mentally rehearsing my email so long I forgot to actually send it.',
    'My houseplant fell off the shelf and I had to perform emergency plant surgery.',
    'I got stuck explaining to my neighbor why their package ended up on my porch.',
    'My to-do list app crashed and took my sense of direction with it.',
    'I was ambushed by a surprisingly long online grocery checkout line.',
  ],
  school: [
    'My dog treated my homework like a chew toy.',
    'I was up late finishing a project that then mysteriously "saved as blank."',
    'My alarm clock and I had a philosophical disagreement about what "morning" means.',
    'I spent so long color-coding my notes that I ran out of time to read them.',
    'My backpack zipper staged a full rebellion this morning.',
    'I got distracted looking up one fact and fell down a three-hour research hole.',
    'My group project chat had 200 unread messages and none of them were helpful.',
    'I practiced my presentation so many times I forgot to actually print it.',
  ],
  social: [
    'I told myself I would leave "in five minutes" about six times in a row.',
    'My GPS took me on a scenic tour of the entire neighborhood.',
    'I got very invested in reorganizing a drawer that did not need reorganizing.',
    'My phone charger and I had a standoff and it won.',
    'I could not decide what to wear, so I tried on my whole closet instead.',
    'A "quick errand" turned into an unplanned adventure.',
    'I was defeated by a jar lid that simply would not open.',
    'My nap had other plans for my evening.',
  ],
};

const ExcuseGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('work');
  const [excuse, setExcuse] = useState<string | null>(null);

  const generate = () => {
    const list = EXCUSES[category];
    setExcuse(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Category</Typography>
        <ToggleButtonGroup
          exclusive
          value={category}
          onChange={(_, val) => { if (val) setCategory(val); }}
        >
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>
              {CATEGORY_LABELS[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate Excuse
      </Button>

      {excuse && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 480 }}>
          <Typography variant="h6">&quot;{excuse}&quot;</Typography>
        </Paper>
      )}

      <Alert severity="info" sx={{ maxWidth: 480 }}>
        Just for laughs — these excuses are obviously fictional and meant as icebreaker or party content, not
        genuine reasons to give anyone in real life.
      </Alert>
    </Box>
  );
};

const ExcuseGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Excuse Generator Works</Typography>
      <Typography variant="body1">
        Pick a category — Work, School, or Social — and click &quot;Generate Excuse&quot; for a random,
        obviously lighthearted excuse from that category. It is entertainment and icebreaker content, not a
        serious suggestion for real situations.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choose the category that fits the situation you are joking about.</li>
          <li>Click &quot;Generate Excuse&quot; for a random, silly excuse.</li>
          <li>Click again for another one — every excuse is meant purely for laughs.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;School&quot; might generate &quot;My dog treated my homework like a chew toy,&quot;
        while &quot;Work&quot; might generate &quot;My cat unplugged my router during an important video
        call.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Breaking the ice at a party or group hangout with a silly, relatable excuse.</li>
          <li>Adding a laugh to a group chat or meme when someone is running late.</li>
          <li>Playing a lighthearted party game built around the most ridiculous excuse.</li>
          <li>Writing a funny caption or icebreaker prompt for a social post.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these real excuses I should use?</Typography>
      <Typography variant="body1">
        No — every excuse here is intentionally over-the-top and meant purely as a joke or icebreaker, not a
        genuine reason to give a boss, teacher, or friend.
      </Typography>
      <Typography variant="h3">Can I get the same excuse twice?</Typography>
      <Typography variant="body1">
        Yes — each click randomly selects from that category&apos;s list independently, so repeats are
        possible.
      </Typography>
      <Typography variant="h3">Is this appropriate for a general audience?</Typography>
      <Typography variant="body1">
        Yes — every excuse is written to be lighthearted, family-friendly, and safe to share in any group
        setting.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/excuse-generator" content={content}>
      <ExcuseGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ExcuseGenerator;
