'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'mild' | 'adventurous' | 'silly';

const DARES: Record<Category, string[]> = {
  mild: [
    'Do your best impression of a famous cartoon character.',
    'Sing the chorus of your favorite song out loud.',
    'Talk in an accent for the next three rounds.',
    'Let another player draw a silly doodle on your hand.',
    'Compliment every player in the room, one by one.',
    'Do your best celebrity impression for 30 seconds.',
    'Try to lick your elbow.',
    'Speak only in questions for the next two minutes.',
  ],
  adventurous: [
    'Call a friend and sing them "Happy Birthday" even if it is not their birthday.',
    'Let the group post a status update on your behalf (with your approval before sending).',
    'Swap an item of clothing with another player for the rest of the game.',
    'Go outside and shout "I love game night!" as loud as you comfortably can.',
    'Let someone else style your hair for the next round.',
    'Eat a spoonful of a condiment of the group\'s choosing.',
    'Do 20 jumping jacks in front of everyone.',
    'Let the group pick your profile picture for the next 24 hours.',
  ],
  silly: [
    'Do your best robot dance for 15 seconds.',
    'Talk like a pirate for the next three rounds.',
    'Attempt to juggle three random objects for 30 seconds.',
    'Act out your most embarrassing moment as a silent movie.',
    'Make up a rap about the person to your left.',
    'Do your best stand-up comedy bit for one minute.',
    'Try to make the group laugh without saying a word.',
    'Wear a piece of clothing backwards for the rest of the game.',
  ],
};

const DareGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('mild');
  const [dare, setDare] = useState<string | null>(null);

  const generate = () => {
    const list = DARES[category];
    setDare(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Category</Typography>
        <ToggleButtonGroup exclusive value={category} onChange={(_, val) => val && setCategory(val)}>
          <ToggleButton value="mild" sx={{ textTransform: 'none' }}>Mild</ToggleButton>
          <ToggleButton value="adventurous" sx={{ textTransform: 'none' }}>Adventurous</ToggleButton>
          <ToggleButton value="silly" sx={{ textTransform: 'none' }}>Silly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" color="secondary" startIcon={<BoltIcon />} onClick={generate}>
        Give Me a Dare
      </Button>

      {dare && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 480 }}>
          <Typography variant="overline" color="secondary.main" fontWeight={700}>Dare</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>{dare}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const DareGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Dare Generator Works</Typography>
      <Typography variant="body1">
        Pick a category — Mild for lighthearted challenges, Adventurous for something a bit bolder, or Silly
        for a laugh — then click &quot;Give Me a Dare&quot; for a random challenge from that category. This
        generator is dare-only, so every list is dedicated entirely to dares rather than being split between
        truths and dares.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing &quot;Silly&quot; might generate &quot;Do your best robot dance for 15 seconds,&quot; while
        choosing &quot;Adventurous&quot; might generate &quot;Go outside and shout &apos;I love game
        night!&apos; as loud as you comfortably can.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Playing a dares-only party game without needing a truth option.</li>
          <li>Adding a fun challenge round to a game night or group hangout.</li>
          <li>Breaking the ice at a party with a lighthearted physical or social challenge.</li>
          <li>Spicing up a virtual call or group chat with a random dare.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Truth or Dare Generator?</Typography>
      <Typography variant="body1">
        The Truth or Dare Generator splits its content between truth questions and dare challenges. This tool
        is dare-only, with a larger, more varied set of dares organized into Mild, Adventurous, and Silly
        categories instead — use this one when you specifically want dares without any truth questions mixed
        in.
      </Typography>
      <Typography variant="h3">Is the content appropriate for all ages?</Typography>
      <Typography variant="body1">
        Yes — every dare across all three categories is written to be family-friendly and suitable for a
        general audience. &quot;Adventurous&quot; simply means bolder and more active, not inappropriate.
      </Typography>
      <Typography variant="h3">Can players skip a dare they do not like?</Typography>
      <Typography variant="body1">
        Yes — this is just a prompt generator. It is entirely up to your group&apos;s own house rules whether
        skipping is allowed, and what happens if someone does.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/dare-generator" content={content}>
      <DareGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DareGenerator;
