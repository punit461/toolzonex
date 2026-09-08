'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type TopicType = 'debate' | 'speech' | 'essay';

const TOPICS: Record<TopicType, string[]> = {
  debate: [
    'Should social media platforms verify user age before allowing sign-up?',
    'Should homework be abolished in schools?',
    'Is a four-day work week better for productivity than a five-day week?',
    'Should voting be mandatory for all eligible citizens?',
    'Should college education be free for everyone?',
    'Is artificial intelligence a net benefit or net harm to society?',
    'Should zoos be banned in favor of wildlife sanctuaries?',
    'Should the use of animals in scientific research be banned?',
    'Should professional athletes be paid as much as they currently are?',
    'Is nuclear energy the best solution to the climate crisis?',
    'Should genetically modified foods be labeled as such?',
    'Should the death penalty be abolished worldwide?',
    'Should billionaires be allowed to exist?',
    'Should school uniforms be mandatory?',
    'Is remote work better for employees than working in an office?',
    'Should plastic bags be banned globally?',
    'Should video games be considered a sport?',
    'Should the legal voting age be lowered to 16?',
    'Should companies be required to give employees unlimited paid time off?',
    'Should standardized testing be eliminated in schools?',
    'Is space exploration a worthwhile use of public funds?',
    'Should junk food advertising be banned for children?',
    'Should countries adopt a universal basic income?',
    'Is censorship of media ever justified?',
    'Should self-driving cars be trusted with full autonomy on public roads?',
    'Should professional sports teams be publicly funded?',
    'Should cursive writing still be taught in schools?',
    'Is it ethical to clone animals for consumer purposes?',
  ],
  speech: [
    'The impact of remote work on company culture',
    'Why failure is a necessary part of success',
    'The role of humor in effective communication',
    'How social media has changed the way we form friendships',
    'The importance of financial literacy for young adults',
    'What true leadership looks like in a crisis',
    'The value of learning a skill purely for fun',
    'How travel changes the way you see the world',
    'The hidden cost of constant multitasking',
    'Why small daily habits matter more than big resolutions',
    'The power of storytelling to change minds',
    'How to disagree productively without damaging relationships',
    'The case for slowing down in a fast-paced world',
    'What we can learn from our biggest mistakes',
    'The importance of mentorship in career growth',
    'How technology has reshaped the way we spend our free time',
    'Why curiosity is the most underrated skill',
    'The benefits of volunteering for personal growth',
    'How to build resilience in the face of setbacks',
    'The changing definition of success across generations',
    'Why kindness is a form of strength, not weakness',
    'The importance of unplugging from screens regularly',
    'What makes a community truly strong',
    'The role of creativity in problem-solving',
    "Why it's never too late to start something new",
  ],
  essay: [
    'Describe a time you changed your mind about something important and why.',
    'Reflect on a challenge that taught you more than any success could have.',
    'Write about a person who shaped who you are today and how.',
    'Describe a moment when you had to make a difficult choice.',
    'Reflect on how your relationship with failure has evolved over time.',
    'Write about a place that feels like home and explain why.',
    'Describe a time you stood up for something you believed in.',
    'Reflect on a piece of advice you initially disagreed with but later valued.',
    'Write about how a hobby or interest has shaped your worldview.',
    'Describe a moment of unexpected kindness, given or received.',
    'Reflect on what independence means to you and how it has changed.',
    'Write about a time you had to adapt quickly to a new situation.',
    'Describe how your definition of success has evolved.',
    'Reflect on a book, film, or piece of art that changed how you think.',
    'Write about a tradition in your life and what it means to you.',
    'Describe a time you had to rebuild trust after it was broken.',
    'Reflect on the value of solitude versus community in your life.',
    'Write about a fear you overcame and how it changed you.',
    'Describe a decision you made that others disagreed with.',
    'Reflect on how a specific limitation pushed you to be more creative.',
    'Write about a conversation that stayed with you long after it ended.',
    'Describe what "home" means to you beyond a physical place.',
    'Reflect on a time you had to ask for help and what you learned.',
    'Write about how your perspective on ambition has shifted over time.',
    'Describe a small moment that had a surprisingly large impact on you.',
  ],
};

const LABELS: Record<TopicType, string> = { debate: 'Debate', speech: 'Speech', essay: 'Essay' };

const TopicGeneratorContent = () => {
  const [type, setType] = useState<TopicType>('debate');
  const [topic, setTopic] = useState<string | null>(null);

  const changeType = (_: unknown, value: TopicType | null) => {
    if (!value) return;
    setType(value);
    setTopic(null);
  };

  const generate = () => {
    const list = TOPICS[type];
    setTopic(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <ToggleButtonGroup value={type} exclusive onChange={changeType} color="primary">
        <ToggleButton value="debate">Debate</ToggleButton>
        <ToggleButton value="speech">Speech</ToggleButton>
        <ToggleButton value="essay">Essay</ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" size="large" startIcon={<RecordVoiceOverIcon />} onClick={generate}>
        Generate Topic
      </Button>

      {topic && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', width: '100%', maxWidth: 600 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{LABELS[type]} Topic</Typography>
          <Typography variant="h6" fontWeight={700}>{topic}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const TopicGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Topic Generator</Typography>
      <Typography variant="body1">
        Select a topic type — Debate, Speech, or Essay — and click &quot;Generate Topic&quot;. Debate topics
        are argumentative propositions with two clear opposing sides, Speech topics are broader
        informative or persuasive subjects suited to a talk or presentation, and Essay topics are reflective
        or analytical prompts meant to inspire personal writing. Each click picks one topic at random from
        the chosen category&apos;s list of about 25-28 options.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting Debate and clicking &quot;Generate Topic&quot; might produce: &quot;Should social media
        platforms verify user age before allowing sign-up?&quot; — a clear proposition with a for and
        against side, ready for a classroom or club debate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a debate proposition for a class assignment, debate club, or practice round.</li>
          <li>Getting a speech subject for a public speaking class, Toastmasters meeting, or presentation.</li>
          <li>Overcoming writer&apos;s block with a fresh essay or reflective writing prompt.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What's the difference between the three topic types?</strong> Debate topics are phrased as yes/no propositions with two clear opposing sides, meant for structured argument. Speech topics are broader subjects for an informative, persuasive, or entertaining talk without requiring two opposing sides. Essay topics are reflective or analytical prompts meant to inspire personal, exploratory writing rather than a formal argument.</li>
          <li><strong>Can I get the same topic twice?</strong> Yes — each generation is independent and random, so it's possible (though not guaranteed) to see a repeat if you generate many times in a row.</li>
          <li><strong>Are the debate topics one-sided?</strong> No — every debate topic is written as a genuinely contestable proposition with a reasonable case on both sides, rather than one with an obvious "correct" answer.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/topic-generator" content={content}>
      <TopicGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default TopicGenerator;
