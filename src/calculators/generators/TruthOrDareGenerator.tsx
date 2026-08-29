'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Difficulty = 'mild' | 'spicy';

const TRUTHS: Record<Difficulty, string[]> = {
  mild: [
    'What is your favorite way to spend a weekend?',
    'What is a hobby you wish you had more time for?',
    'What is the best meal you have ever eaten?',
    'What is your favorite childhood memory?',
    'What is a skill you would love to learn?',
    'What is your go-to karaoke song?',
    'What is the most spontaneous thing you have ever done?',
    'What is a movie you could watch over and over?',
  ],
  spicy: [
    'What is the most embarrassing thing that has happened to you in public?',
    'What is a secret talent nobody knows about?',
    'Who was your first celebrity crush?',
    'What is the weirdest dream you can remember?',
    'What is something you have never told anyone in this room?',
    'What is your biggest fear that most people do not know about?',
    'What is the boldest thing you have ever done on a dare?',
    'What is a rumor about you that was actually true?',
  ],
};

const DARES: Record<Difficulty, string[]> = {
  mild: [
    'Do your best impression of a famous cartoon character.',
    'Sing the chorus of your favorite song out loud.',
    'Talk in an accent for the next three rounds.',
    'Do 10 jumping jacks right now.',
    'Try to lick your elbow.',
    'Let another player draw a silly doodle on your hand.',
    'Speak only in questions for the next two minutes.',
    'Do your best robot dance for 15 seconds.',
  ],
  spicy: [
    'Let the group post a status update on your behalf (with your approval before sending).',
    'Attempt to juggle three random objects for 30 seconds.',
    'Tell a joke and hold a straight face no matter what.',
    'Swap an item of clothing with another player for the rest of the game.',
    'Do your best stand-up comedy bit for one minute.',
    'Let someone else style your hair for the next round.',
    'Act out your most embarrassing moment as a silent movie.',
    'Call a friend and sing them "Happy Birthday" even if it is not their birthday.',
  ],
};

const TruthOrDareGeneratorContent = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('mild');
  const [prompt, setPrompt] = useState<{ type: 'Truth' | 'Dare'; text: string } | null>(null);

  const pick = (type: 'Truth' | 'Dare') => {
    const list = type === 'Truth' ? TRUTHS[difficulty] : DARES[difficulty];
    setPrompt({ type, text: list[Math.floor(Math.random() * list.length)] });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Difficulty</Typography>
        <ToggleButtonGroup
          exclusive
          value={difficulty}
          onChange={(_, val) => { if (val) setDifficulty(val); }}
        >
          <ToggleButton value="mild" sx={{ textTransform: 'none' }}>Mild</ToggleButton>
          <ToggleButton value="spicy" sx={{ textTransform: 'none' }}>Spicy</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" size="large" color="info" startIcon={<RecordVoiceOverIcon />} onClick={() => pick('Truth')}>
          Truth
        </Button>
        <Button variant="contained" size="large" color="secondary" startIcon={<RecordVoiceOverIcon />} onClick={() => pick('Dare')}>
          Dare
        </Button>
      </Box>

      {prompt && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 480 }}>
          <Typography variant="overline" color={prompt.type === 'Truth' ? 'info.main' : 'secondary.main'} fontWeight={700}>
            {prompt.type}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>{prompt.text}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const TruthOrDareGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Truth or Dare Generator Works</Typography>
      <Typography variant="body1">
        Pick a difficulty — Mild for lighthearted fun or Spicy for a bit more of a challenge — then click
        &quot;Truth&quot; for a random question or &quot;Dare&quot; for a random challenge. Every prompt is
        kept family-friendly and appropriate for a general audience.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Choose &quot;Mild&quot; or &quot;Spicy&quot; based on how bold you want the prompts to be.</li>
          <li>Click &quot;Truth&quot; for a random question, or &quot;Dare&quot; for a random challenge.</li>
          <li>Take turns clicking either button as you play with friends or family.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking &quot;Truth&quot; on Mild might show &quot;What is your favorite childhood memory?&quot;
        while clicking &quot;Dare&quot; on Spicy might show &quot;Tell a joke and hold a straight face no
        matter what.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Playing a classic Truth or Dare game at a party, sleepover, or family gathering.</li>
          <li>Breaking the ice at a get-together with a mix of fun questions and light challenges.</li>
          <li>Adding a game element to a group hangout or virtual call.</li>
          <li>Keeping a game night going when players run out of their own ideas.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is the content appropriate for all ages?</Typography>
      <Typography variant="body1">
        Both difficulty levels are written to be family-friendly and suitable for a general audience — Spicy
        is simply a bit bolder and more playful than Mild, not adult content.
      </Typography>
      <Typography variant="h3">Can players skip a prompt they do not like?</Typography>
      <Typography variant="body1">
        Yes — this is just a prompt generator. It is entirely up to your group&apos;s own house rules whether
        skipping is allowed, and what happens if someone does.
      </Typography>
      <Typography variant="h3">Can the same prompt come up more than once?</Typography>
      <Typography variant="body1">
        Yes — each click randomly selects from the list independently, so repeats are possible, especially in
        longer games.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/truth-or-dare-generator" content={content}>
      <TruthOrDareGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TruthOrDareGenerator;
