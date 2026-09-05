'use client';

import { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ICEBREAKERS: string[] = [
  "Share two truths and a lie about yourself — can the group guess the lie?",
  "What's a hidden talent you have that most people here don't know about?",
  "If your life had a theme song right now, what would it be?",
  "What's one word your friends would use to describe you?",
  "What's the most useless talent you're proud of?",
  "If you could instantly become an expert in one subject, what would it be?",
  "What's a job you'd be terrible at?",
  "What's your go-to karaoke song?",
  "If you could add one rule everyone had to follow, what would it be?",
  "What's the first thing you'd do if you woke up as the boss for a day?",
  "What's a fun fact about your hometown?",
  "If this team/group was a sports team, what would our mascot be?",
  "What's the best team you've ever been part of, and what made it great?",
  "What's a small win you've had this week?",
  "If you could swap jobs with anyone in this room for a day, who would you pick?",
  "What's your favorite way to celebrate a group achievement?",
  "What superpower would make you better at your job?",
  "What's one thing on your desk or in your bag that says a lot about you?",
  "If you had to describe your personality using only emojis, which would you pick?",
  "What's a class or subject you wish you'd paid more attention to?",
  "What's the weirdest food combination you actually enjoy?",
  "If you could only keep one app on your phone, which would it be?",
  "What's a rule you think every workplace should have?",
  "What's your favorite icebreaker question you've ever been asked?",
  "If you were a kitchen appliance, which one would you be and why?",
  "What's something you're learning right now, on purpose or by accident?",
  "What's the last thing you Googled?",
  "If you had a personal theme park, what would the main attraction be?",
  "What's your favorite way to start the morning?",
  "What's a nickname you've had, and how did you get it?",
  "If you could teleport anywhere right now, where would you go?",
  "What's the best piece of teamwork you've witnessed recently?",
  "What's your spirit animal, and why does it fit you?",
  "What's one thing you'd want new team members to know about you?",
  "If our group had a group chat name, what should it be?",
  "What's a game you were really good at as a kid?",
  "What's your comfort TV show that you rewatch when you need a break?",
  "If you could give a TED talk on any topic, what would it be?",
  "What's the most interesting place you've worked or studied from?",
  "What's a small habit that's made a big difference for you?",
  "If you could master one dance move instantly, what would you pick?",
  "What's the best advice a mentor or teacher ever gave you?",
  "What's a fictional character you relate to the most?",
  "If you had to survive a week on a deserted island, what three items would you bring?",
  "What's a fun tradition your family or friend group has?",
  "What's the most useful thing you learned outside of school or work?",
  "If you could speak any language fluently starting tomorrow, which would you choose?",
  "What's your favorite way to break the ice with someone new?",
  "What's a hobby you'd love to try if you had unlimited time?",
  "If you could bring back one fashion trend, what would it be?",
  "What's the most spontaneous decision you've ever made?",
  "What's your favorite thing about working or learning with a team?",
  "If you were a flavor of ice cream, which one would you be?",
  "What's a question you wish people asked you more often?",
  "What's the best compliment you've ever received?",
  "If you could design a new holiday, what would it celebrate?",
  "What's your favorite way to recharge after a busy day?",
  "What's a movie quote you find yourself using in real life?",
  "If you had to teach a class on something you know well, what would the topic be?",
  "What's your favorite way to make a new place feel like home?",
  "What's a goal you're excited to work toward with this group?",
  "If you could instantly learn everyone's name in a room, what would you do with that extra brainpower?",
  "What's the most memorable first day you've had at a job or school?",
];

function pickRandomIndex(exclude: number, length: number): number {
  if (length <= 1) return 0;
  let idx = Math.floor(Math.random() * length);
  while (idx === exclude) idx = Math.floor(Math.random() * length);
  return idx;
}

const IcebreakerQuestionGeneratorContent = () => {
  const [index, setIndex] = useState(0);

  const regenerate = () => setIndex((prev) => pickRandomIndex(prev, ICEBREAKERS.length));

  return (
    <Box>
      <Paper sx={{ p: 4, mb: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" fontWeight="bold">{ICEBREAKERS[index]}</Typography>
      </Paper>
      <Button variant="contained" startIcon={<ShuffleIcon />} onClick={regenerate}>
        Regenerate
      </Button>
    </Box>
  );
};

const IcebreakerQuestionGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Icebreaker Question Generator</Typography>
      <Typography variant="body1">
        Click Regenerate to get a new icebreaker question, picked at random from a hand-written collection of
        {' '}{ICEBREAKERS.length} prompts specifically framed for group and first-meeting settings — team
        meetings, classrooms, workshops, and new-group gatherings where people are meeting each other for the
        first time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A generated prompt might read: &quot;Share two truths and a lie about yourself — can the group guess
        the lie?&quot; — a classic group icebreaker format designed to spark interaction across a whole room.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Kicking off a team meeting or workshop where not everyone knows each other yet.</li>
          <li>Warming up a classroom or training session on the first day.</li>
          <li>Getting a new group or club comfortable with each other quickly.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Conversation Starter Generator?</strong> The Conversation Starter Generator is built for general, casual one-on-one or small social conversation, like dates or family gatherings. This Icebreaker Question Generator is specifically framed for GROUP settings where people are meeting each other for the first time, like team meetings, classrooms, and new-group gatherings.</li>
          <li><strong>Are these suitable for a professional workplace setting?</strong> Yes — the prompts are written to be broadly appropriate for team meetings, onboarding sessions, and classrooms, while still being fun and engaging.</li>
          <li><strong>Can I use these for a virtual/remote team meeting?</strong> Yes — these questions work equally well for in-person and virtual settings, since they only require a verbal answer rather than any physical materials.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/icebreaker-question-generator" content={content}>
      <IcebreakerQuestionGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default IcebreakerQuestionGenerator;
