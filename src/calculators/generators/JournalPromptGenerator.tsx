'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PROMPTS: string[] = [
  'What made you smile today?',
  "What's one thing you're avoiding, and why?",
  'Describe a moment this week you felt proud of yourself.',
  'What is something you need to let go of right now?',
  'Who has had the biggest positive influence on you this year?',
  'What does your ideal day look like from start to finish?',
  'What is a fear that has been holding you back?',
  'What are three things you are grateful for today?',
  'When did you last feel truly at peace, and what were you doing?',
  'What would you tell your younger self if you could?',
  'What is a habit you would like to build, and why?',
  'What is a habit you would like to break, and why?',
  'Describe a challenge you are currently facing and one small step forward.',
  'What does success mean to you right now, in this season of life?',
  'What is something you have learned about yourself recently?',
  'Who do you need to forgive, including possibly yourself?',
  'What is a compliment you received that you still remember?',
  'What would you do today if you knew you could not fail?',
  'What is draining your energy lately, and what can you do about it?',
  'What is giving you energy lately?',
  'Describe a place where you feel completely relaxed.',
  'What is a boundary you need to set with someone?',
  'What are you looking forward to this week?',
  'What is a lesson a difficult experience taught you?',
  'How do you want to feel by the end of this year?',
  'What is something you have been putting off that would take less than 10 minutes?',
  'What does self-care look like for you this week?',
  'What is a belief you held a few years ago that you no longer hold?',
  'Describe a recent moment of connection with someone you care about.',
  'What is one thing you can do today to take care of your future self?',
  'What are you most curious about right now?',
  'What is a small win from this week that deserves recognition?',
  'How do you typically respond to stress, and is that serving you?',
  'What would you do differently if no one was watching or judging?',
  'What is a piece of advice you would give a close friend right now?',
  'What does your inner critic say, and how would you respond to a friend saying the same thing?',
  'What are you most proud of accomplishing this year?',
  'What is something new you would like to try in the next month?',
  'How has your definition of happiness changed over the years?',
  'What relationships in your life need more attention right now?',
  'What is a risk you took that paid off?',
  'What is a risk you are considering taking now?',
  'Describe a time you surprised yourself with your own strength.',
  'What does rest actually look like for you, versus what you think it should look like?',
  'What is something you wish more people understood about you?',
  'What is one thing you can simplify in your life right now?',
  'How do you want to be remembered by the people closest to you?',
  'What is a question you have been avoiding asking yourself?',
  'What does your body need from you right now?',
  'What is a goal you have quietly given up on, and is it worth revisiting?',
  'What made today different from yesterday?',
  'What is something you take for granted that you are actually grateful for?',
  'Describe your current mood using only colors, weather, or a season.',
  'What is a conversation you need to have but keep postponing?',
  'What would "enough" look like in your life right now?',
  'What is a memory that always makes you laugh?',
  'What does your ideal week of work and rest look like?',
  'What is something you have forgiven yourself for, or still need to?',
  'What is a value you refuse to compromise on, no matter what?',
  'What is one thing you can do this week to feel more like yourself?',
  'What would you create if you had unlimited time and resources?',
  'What is something uncomfortable that has helped you grow?',
  'How do you want to show up for the people you love this month?',
  'What is a small joy you experienced today that you almost missed?',
];

const JournalPromptGeneratorContent = () => {
  const [prompt, setPrompt] = useState<string | null>(null);

  const generate = () => {
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<NoteAltIcon />} onClick={generate}>
        {prompt ? 'Generate Another' : 'Generate a Prompt'}
      </Button>

      {prompt && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', width: '100%', maxWidth: 560 }}>
          <Typography variant="h6" fontWeight={700} sx={{ fontStyle: 'italic' }}>
            &quot;{prompt}&quot;
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const JournalPromptGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Journal Prompt Generator</Typography>
      <Typography variant="body1">
        Click &quot;Generate a Prompt&quot; and the tool picks one reflective question at random from a
        curated list of over 60 journal prompts, designed to spark genuine self-reflection in a single
        sitting. Click &quot;Generate Another&quot; any time you want a fresh question to write about.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One click might surface: &quot;What&apos;s one thing you&apos;re avoiding, and why?&quot; — a single
        focused question to write freely about for five or ten minutes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Starting a journaling habit without having to think of your own topic every day.</li>
          <li>Getting unstuck when you want to write but don&apos;t know where to begin.</li>
          <li>Using a single prompt as a quick daily check-in with yourself.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Journal/Daily Reflection Template?</strong> The Journal/Daily Reflection Template is a structured, multi-field form with fixed sections — gratitude, a highlight, a lesson learned, and tomorrow's focus — that you fill in every time. This Journal Prompt Generator is simpler: it generates a single random reflective question for inspiration, with no structured template or multiple fields to complete.</li>
          <li><strong>Can I get the same prompt twice?</strong> Yes — each click is an independent random pick from the full list, so repeats are possible, especially over many clicks.</li>
          <li><strong>Does the tool save my journal entries?</strong> No — this tool only generates the prompt itself; it doesn't include a writing area or save anything, so write your response in your own notebook, notes app, or document.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/journal-prompt-generator" content={content}>
      <JournalPromptGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default JournalPromptGenerator;
