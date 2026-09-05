'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Challenge {
  category: 'Fitness' | 'Productivity' | 'Kindness' | 'Creativity' | 'Learning' | 'Mindfulness';
  text: string;
}

const CHALLENGES: Challenge[] = [
  { category: 'Fitness', text: 'Do a 10-minute walk outside today.' },
  { category: 'Fitness', text: 'Try 20 push-ups (or a modified version) sometime today.' },
  { category: 'Fitness', text: 'Take the stairs instead of the elevator all day.' },
  { category: 'Fitness', text: 'Hold a plank for as long as you can, three times today.' },
  { category: 'Fitness', text: 'Stretch for 5 minutes before bed tonight.' },
  { category: 'Fitness', text: 'Do 50 jumping jacks in one go.' },
  { category: 'Fitness', text: 'Go for a walk without your phone for at least 15 minutes.' },
  { category: 'Fitness', text: 'Try a new stretch or exercise you\'ve never done before.' },
  { category: 'Fitness', text: 'Drink a full glass of water before each meal today.' },
  { category: 'Fitness', text: 'Stand up and move for 2 minutes every hour today.' },
  { category: 'Productivity', text: 'Write tomorrow\'s to-do list before you go to bed tonight.' },
  { category: 'Productivity', text: 'Tackle the one task you\'ve been avoiding the longest.' },
  { category: 'Productivity', text: 'Clear out your email inbox to zero (or as close as you can get).' },
  { category: 'Productivity', text: 'Work in one 25-minute focused block with no distractions.' },
  { category: 'Productivity', text: 'Declutter one drawer, shelf, or folder on your computer.' },
  { category: 'Productivity', text: 'Batch all your small errands into a single trip today.' },
  { category: 'Productivity', text: 'Turn off notifications for one hour and see how much you get done.' },
  { category: 'Productivity', text: 'Write down your top 3 priorities for the day before starting anything else.' },
  { category: 'Productivity', text: 'Unsubscribe from 5 emails or newsletters you never read.' },
  { category: 'Productivity', text: 'Set a timer and tidy your workspace for 10 minutes.' },
  { category: 'Kindness', text: 'Send a genuine compliment to someone you haven\'t talked to in a while.' },
  { category: 'Kindness', text: 'Let someone go ahead of you in line today.' },
  { category: 'Kindness', text: 'Write a short thank-you note to someone who\'s helped you.' },
  { category: 'Kindness', text: 'Offer to help a coworker or classmate with something small.' },
  { category: 'Kindness', text: 'Leave a positive review for a small business you like.' },
  { category: 'Kindness', text: 'Check in on someone you know is going through a hard time.' },
  { category: 'Kindness', text: 'Pay for someone\'s coffee or small purchase today, if you can.' },
  { category: 'Kindness', text: 'Give someone your full, undistracted attention in a conversation today.' },
  { category: 'Kindness', text: 'Compliment a stranger genuinely and specifically.' },
  { category: 'Kindness', text: 'Share something useful (an article, tip, or resource) with a friend.' },
  { category: 'Creativity', text: 'Doodle for 5 minutes without worrying about how it looks.' },
  { category: 'Creativity', text: 'Write a short poem or a few lines about your day.' },
  { category: 'Creativity', text: 'Take a photo of something ordinary from an unusual angle.' },
  { category: 'Creativity', text: 'Rearrange one small area of your room or desk.' },
  { category: 'Creativity', text: 'Come up with 10 alternative uses for a common household object.' },
  { category: 'Creativity', text: 'Cook or bake something you\'ve never made before.' },
  { category: 'Creativity', text: 'Write the opening line of a story that starts with today\'s weather.' },
  { category: 'Creativity', text: 'Make a playlist for a very specific, oddly-themed mood.' },
  { category: 'Creativity', text: 'Try sketching your favorite object from memory.' },
  { category: 'Creativity', text: 'Write a one-sentence review of the last thing you watched or read.' },
  { category: 'Learning', text: 'Look up the origin of a word you use often.' },
  { category: 'Learning', text: 'Watch or read something on a topic you know nothing about.' },
  { category: 'Learning', text: 'Learn how to say "hello" and "thank you" in a new language.' },
  { category: 'Learning', text: 'Read one long-form article on a subject outside your usual interests.' },
  { category: 'Learning', text: 'Ask someone knowledgeable a question you\'ve always wondered about.' },
  { category: 'Learning', text: 'Learn one keyboard shortcut you\'ve never used before.' },
  { category: 'Learning', text: 'Look up how something you use daily actually works.' },
  { category: 'Learning', text: 'Spend 15 minutes on an online course or tutorial.' },
  { category: 'Learning', text: 'Learn one new fact about a historical event that interests you.' },
  { category: 'Learning', text: 'Try explaining a concept you know well to someone else, in simple terms.' },
  { category: 'Mindfulness', text: 'Spend 5 minutes sitting quietly with no phone or screen.' },
  { category: 'Mindfulness', text: 'Write down three things you\'re grateful for today.' },
  { category: 'Mindfulness', text: 'Eat one meal today without any screens in front of you.' },
  { category: 'Mindfulness', text: 'Take 10 slow, deep breaths before starting your day.' },
  { category: 'Mindfulness', text: 'Notice and name one emotion you\'re feeling right now, without judging it.' },
  { category: 'Mindfulness', text: 'Go outside and notice five things you don\'t usually pay attention to.' },
  { category: 'Mindfulness', text: 'Spend 5 minutes journaling about how your day is going so far.' },
  { category: 'Mindfulness', text: 'Practice a short body scan — notice tension from head to toe and try to relax it.' },
  { category: 'Mindfulness', text: 'Put your phone in another room for one hour today.' },
  { category: 'Mindfulness', text: 'Take one full minute to just listen to the sounds around you.' },
];

function pickRandomIndex(exclude: number, length: number): number {
  if (length <= 1) return 0;
  let idx = Math.floor(Math.random() * length);
  while (idx === exclude) idx = Math.floor(Math.random() * length);
  return idx;
}

const CATEGORY_COLORS: Record<Challenge['category'], 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error'> = {
  Fitness: 'success',
  Productivity: 'primary',
  Kindness: 'secondary',
  Creativity: 'warning',
  Learning: 'info',
  Mindfulness: 'error',
};

const DailyChallengeGeneratorContent = () => {
  const [index, setIndex] = useState(0);
  const challenge = CHALLENGES[index];

  const regenerate = () => setIndex((prev) => pickRandomIndex(prev, CHALLENGES.length));

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <Chip label={challenge.category} color={CATEGORY_COLORS[challenge.category]} />
        <Typography variant="h5" fontWeight="bold">{challenge.text}</Typography>
      </Paper>
      <Button variant="contained" startIcon={<ShuffleIcon />} onClick={regenerate}>
        New Challenge
      </Button>
    </Box>
  );
};

const DailyChallengeGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Daily Challenge Generator</Typography>
      <Typography variant="body1">
        Click New Challenge to get a small, doable challenge for today, picked at random from a hand-written
        collection of {CHALLENGES.length} ideas spanning six categories — Fitness, Productivity, Kindness,
        Creativity, Learning, and Mindfulness. Each challenge is designed to be completed in one day with
        minimal setup.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A generated Kindness challenge might read: &quot;Write a short thank-you note to someone who&apos;s
        helped you.&quot; — a small, low-effort action that still makes a genuine impact.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Adding a small, low-pressure challenge to your daily routine.</li>
          <li>Sparking new habits across fitness, mindfulness, and personal growth categories.</li>
          <li>Finding a quick creative or learning prompt when you have a spare few minutes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I pick a specific category?</strong> The generator currently picks randomly across all six categories rather than letting you filter by one, so each click can surface a challenge from any category.</li>
          <li><strong>Does it track which challenges I've completed?</strong> No — this tool doesn't save or track progress between visits; it's meant purely as a source of quick daily challenge ideas.</li>
          <li><strong>Can the same challenge repeat right after another?</strong> No — clicking New Challenge always shows a different challenge than the one currently displayed.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/daily-challenge-generator" content={content}>
      <DailyChallengeGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DailyChallengeGenerator;
