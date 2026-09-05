'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PROMPTS: string[] = [
  'Never have I ever gone skydiving.',
  'Never have I ever fallen asleep in class or a meeting.',
  'Never have I ever forgotten someone\'s name right after they told me.',
  'Never have I ever sung karaoke in public.',
  'Never have I ever laughed so hard I cried.',
  'Never have I ever gotten lost in my own city.',
  'Never have I ever eaten an entire pizza by myself.',
  'Never have I ever pretended to be sick to skip work or school.',
  'Never have I ever sent a text to the wrong person.',
  'Never have I ever gone a full day without checking my phone.',
  'Never have I ever tried and failed to bake something from scratch.',
  'Never have I ever cried during a movie.',
  'Never have I ever won a trophy or medal for anything.',
  'Never have I ever stayed up all night talking to a friend.',
  'Never have I ever been on television or in a newspaper.',
  'Never have I ever gone camping without proper supplies.',
  'Never have I ever accidentally liked an old photo while stalking someone\'s profile.',
  'Never have I ever tripped in front of a big group of people.',
  'Never have I ever forgotten my own phone number.',
  'Never have I ever gone skinny dipping.',
  'Never have I ever pulled an all-nighter for a project or exam.',
  'Never have I ever lied about my age.',
  'Never have I ever been stood up for a date or meeting.',
  'Never have I ever broken a bone.',
  'Never have I ever gotten a speeding ticket.',
  'Never have I ever traveled to another country alone.',
  'Never have I ever quit a job without having another one lined up.',
  'Never have I ever pretended to know a song I\'d never heard before.',
  'Never have I ever cried at a wedding that wasn\'t mine.',
  'Never have I ever gone more than a week without doing laundry.',
  'Never have I ever accidentally called a teacher "mom" or "dad".',
  'Never have I ever won money in a lottery or raffle.',
  'Never have I ever forgotten someone\'s birthday.',
  'Never have I ever gone scuba diving.',
  'Never have I ever eaten food that fell on the floor.',
  'Never have I ever stayed friends with an ex.',
  'Never have I ever pretended to be busy to avoid plans.',
  'Never have I ever gotten a tattoo.',
  'Never have I ever ridden a rollercoaster more than five times in a row.',
  'Never have I ever snooped through someone else\'s phone.',
  'Never have I ever gone an entire day speaking only in a fake accent.',
  'Never have I ever fallen asleep during a movie in a theater.',
  'Never have I ever run a marathon or half-marathon.',
  'Never have I ever gotten stuck in an elevator.',
  'Never have I ever regifted a present.',
  'Never have I ever cheated on a test.',
  'Never have I ever gone camping in the rain.',
  'Never have I ever left the house with mismatched shoes.',
  'Never have I ever pretended to like a gift I actually hated.',
  'Never have I ever taken a nap that lasted more than four hours.',
  'Never have I ever gotten a haircut I instantly regretted.',
  'Never have I ever gone an entire month without eating dessert.',
  'Never have I ever forgotten to mute myself on a video call.',
  'Never have I ever climbed a mountain.',
  'Never have I ever pretended not to see someone to avoid saying hi.',
  'Never have I ever won a costume contest.',
  'Never have I ever driven more than 8 hours in one day.',
  'Never have I ever accidentally worn something inside out all day.',
  'Never have I ever gone without social media for an entire week.',
  'Never have I ever made a New Year\'s resolution and actually kept it.',
  'Never have I ever gotten a surprise party thrown for me.',
  'Never have I ever broken a phone screen.',
  'Never have I ever gone to a concert alone.',
  'Never have I ever accidentally sent an email to the wrong recipient.',
];

function pickPrompt(current: string | null): string {
  let next: string;
  do {
    next = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  } while (next === current);
  return next;
}

const NeverHaveIEverGeneratorContent = () => {
  const [prompt, setPrompt] = useState<string | null>(null);

  const next = () => setPrompt((current) => pickPrompt(current));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" color="secondary" startIcon={<QuestionAnswerIcon />} onClick={next}>
        {prompt === null ? 'Generate a Prompt' : 'Next Prompt'}
      </Button>

      {prompt && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 520 }}>
          <Typography variant="h5">{prompt}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const NeverHaveIEverGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Never Have I Ever Generator Works</Typography>
      <Typography variant="body1">
        Click &quot;Generate a Prompt&quot; to get a random &quot;Never have I ever...&quot; statement from a
        curated list of over 60 family-friendly prompts. Everyone playing holds up a hand (or a set number of
        fingers), and anyone who HAS done the thing named in the statement puts a finger down. Click
        &quot;Next Prompt&quot; to keep the game going.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A generated prompt might read &quot;Never have I ever fallen asleep during a movie in a theater.&quot;
        Anyone in the group who has done that puts a finger down, and play continues to the next prompt.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Playing a classic icebreaker game at a party, sleepover, or family gathering.</li>
          <li>Getting to know new people in a fun, low-pressure way.</li>
          <li>Keeping a game night going with fresh prompts instead of repeating the same old ones.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this related to the Truth or Dare Generator?</strong> Yes — it's part of the same family of party-game generators on this site, alongside Truth or Dare and Would You Rather, and follows the same simple one-prompt-at-a-time format.</li>
          <li><strong>Is the content appropriate for all ages?</strong> Yes — every prompt is written to be family-friendly and mild, consistent with the site's other party-game generators. There's no explicit or adult content.</li>
          <li><strong>Can the same prompt come up twice in a row?</strong> No — the generator always avoids repeating the immediately previous prompt, though the same prompt can reappear later in a longer session.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/never-have-i-ever-generator" content={content}>
      <NeverHaveIEverGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NeverHaveIEverGenerator;
