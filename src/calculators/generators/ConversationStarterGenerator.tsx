'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const STARTERS: string[] = [
  "What's the best trip you've ever taken?",
  "If you could have dinner with anyone, living or dead, who would it be?",
  "What's a hobby you picked up recently?",
  "What's your favorite way to spend a weekend?",
  "What's a movie or show you could watch over and over?",
  "What's the last thing that made you laugh out loud?",
  "If you could live anywhere in the world, where would it be?",
  "What's a small thing that instantly makes your day better?",
  "What's the most memorable meal you've ever had?",
  "What's a skill you've always wanted to learn?",
  "What's your go-to comfort food?",
  "If you won the lottery tomorrow, what's the first thing you'd do?",
  "What's a book that changed the way you think?",
  "What's your favorite season and why?",
  "What's something you're really proud of?",
  "What's the best piece of advice you've ever received?",
  "If you could instantly master any language, which would you pick?",
  "What's your favorite childhood memory?",
  "What's a place you've always wanted to visit but haven't yet?",
  "What's something on your bucket list?",
  "What's your favorite type of music right now?",
  "If you could switch lives with anyone for a day, who would it be?",
  "What's the best gift you've ever received?",
  "What's a tradition your family has that you love?",
  "What's your idea of a perfect day off?",
  "What's something you've changed your mind about recently?",
  "What's the funniest thing that's happened to you this year?",
  "If you could time travel, would you go to the past or the future?",
  "What's your favorite way to unwind after a long day?",
  "What's a random fact you know that most people don't?",
  "What's the best concert or live event you've been to?",
  "What's something you're currently looking forward to?",
  "If you had an extra free hour every day, how would you spend it?",
  "What's your favorite holiday and why?",
  "What's a food you were sure you'd hate but ended up loving?",
  "What's the most spontaneous thing you've ever done?",
  "What's your favorite way to stay active?",
  "What's a TV show everyone should watch at least once?",
  "What's something you learned recently that surprised you?",
  "What's your dream job, realistically or not?",
  "What's a place that feels like home to you?",
  "What's the best advice you'd give your younger self?",
  "What's something you collect or used to collect?",
  "What's your favorite thing about where you grew up?",
  "If you could only eat one cuisine for the rest of your life, what would it be?",
  "What's a app or website you can't live without?",
  "What's the last new thing you tried?",
  "What's your favorite way to celebrate good news?",
  "What's a talent you have that surprises people?",
  "What's the best piece of advice about relationships you've ever gotten?",
  "If you could ask a fortune teller one question, what would it be?",
  "What's something that always cheers you up when you're stressed?",
  "What's your favorite memory from a family gathering?",
  "What's a goal you're currently working toward?",
  "What's the most beautiful place you've ever seen?",
  "What's something you wish more people knew about you?",
  "What's your favorite way to spend time outdoors?",
  "What's a small act of kindness that stuck with you?",
  "If you could relive one day of your life, which would it be?",
  "What's your favorite thing to cook or bake?",
  "What's something you're grateful for today?",
  "What's the best piece of travel advice you've ever received?",
  "What's a song that always puts you in a good mood?",
  "What's something you're better at now than you were five years ago?",
  "What's your favorite family recipe?",
  "If you could pick up any instrument overnight, which would you choose?",
];

function pickRandomIndex(exclude: number, length: number): number {
  if (length <= 1) return 0;
  let idx = Math.floor(Math.random() * length);
  while (idx === exclude) idx = Math.floor(Math.random() * length);
  return idx;
}

const ConversationStarterGeneratorContent = () => {
  const [index, setIndex] = useState(0);

  const regenerate = () => setIndex((prev) => pickRandomIndex(prev, STARTERS.length));

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" fontWeight="bold">{STARTERS[index]}</Typography>
      </Paper>
      <Button variant="contained" startIcon={<ShuffleIcon />} onClick={regenerate}>
        Regenerate
      </Button>
    </Box>
  );
};

const ConversationStarterGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Conversation Starter Generator</Typography>
      <Typography variant="body1">
        Click Regenerate to get a new casual conversation-starter question, picked at random from a
        hand-written collection of {STARTERS.length} general-purpose prompts suitable for dates, meetups,
        family gatherings, and everyday small talk.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A generated prompt might read: &quot;What&apos;s the best trip you&apos;ve ever taken?&quot; — a
        light, easy-to-answer question that naturally opens up further conversation.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Breaking the ice on a first date or early in a new friendship.</li>
          <li>Sparking conversation at a family gathering or dinner party.</li>
          <li>Keeping small talk flowing during a casual meetup with acquaintances.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Icebreaker Question Generator?</strong> This Conversation Starter Generator is built for general, casual one-on-one or small social settings like dates, meetups, and family gatherings. The Icebreaker Question Generator is specifically framed for GROUP settings where people are meeting for the first time, like team meetings or classrooms.</li>
          <li><strong>Can the same question appear twice in a row?</strong> No — the generator always picks a different question than the one currently shown, so clicking Regenerate always gives you something new.</li>
          <li><strong>Are these questions appropriate for any audience?</strong> Yes — all prompts are deliberately kept light, positive, and broadly appropriate for casual social situations across ages and contexts.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/conversation-starter-generator" content={content}>
      <ConversationStarterGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ConversationStarterGenerator;
