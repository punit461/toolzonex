'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PROMPTS: string[] = [
  'A character discovers a letter written by their future self.',
  'Two strangers are stuck in an elevator during a blackout and must work together.',
  'A town wakes up one morning to find that everyone has swapped a single memory with someone else.',
  'A retired superhero is called back for one last job they never asked for.',
  'Someone finds a door in their basement that leads to a different year each time it opens.',
  'A character receives a package addressed to them from ten years in the future.',
  'A librarian discovers a book that writes itself based on the reader\'s deepest secret.',
  'A family inherits a house where every room shows a different possible version of their lives.',
  'A robot is programmed to feel one emotion for the first time and must learn to live with it.',
  'A musician can hear the exact moment someone is about to lie.',
  'A city where it has rained every day for a decade suddenly has one hour of sunshine.',
  'A character wakes up with the ability to understand animals, but only for 24 hours.',
  'Two rival chefs are forced to cook together for a mysterious, unseen judge.',
  'A lighthouse keeper on a remote island starts receiving messages from a ship that doesn\'t exist.',
  'A person discovers their reflection has been living a separate life in the mirror.',
  'A group of friends find an old cassette tape that predicts events days before they happen.',
  'An astronaut returns to Earth to find no one remembers the mission ever happened.',
  'A child\'s imaginary friend turns out to be real, and has been waiting a long time to be noticed.',
  'A detective is hired to solve a crime that hasn\'t happened yet.',
  'A traveling circus arrives in a town the night before it disappears without a trace.',
  'Someone finds a vending machine that dispenses memories instead of snacks.',
  'A character can trade one year of their life for anything they want, and someone offers them a deal.',
  'A small bakery\'s bread has started giving customers dreams about their own pasts.',
  'A group of coworkers discover their office building has a floor that shouldn\'t exist.',
  'A character wakes up in a world where their biggest regret never happened, and must decide if they want to stay.',
  'An old photograph in an antique shop shows a person who hasn\'t been born yet.',
  'A message in a bottle washes ashore addressed specifically to the person who finds it.',
  'A character discovers they can pause time, but only when they are completely alone.',
  'A small town\'s annual festival has a tradition no one can explain, and this year someone asks why.',
  'A pair of siblings find a map that only reveals new paths at night.',
  'Someone is hired to be a professional apology-giver for people who can\'t bring themselves to say sorry.',
  'A character starts receiving anonymous letters that accurately describe their dreams from the night before.',
  'A last-of-its-kind creature is discovered living quietly in a city park.',
  'A person is given the chance to relive one ordinary day from their childhood, exactly as it was.',
  'A ghostwriter realizes the memoir they are writing is actually about their own forgotten past.',
  'A weather forecaster starts predicting emotions instead of storms, and it starts coming true.',
  'A character finds an old arcade machine that lets them replay a real decision from their life.',
  'Two enemies are trapped together in a collapsing building and must decide whether to help each other.',
  'A small shop only appears on the street once a year, and always sells exactly what someone needs.',
  'A character realizes their dreams and someone else\'s are somehow connected.',
  'An artist discovers that everything they paint starts coming true within a week.',
  'A family heirloom turns out to be a key to a room that has been sealed for generations.',
  'A person wakes up able to see the exact moment they will meet someone important, but not who it is.',
  'A train conductor realizes their late-night route stops at a station that isn\'t on any map.',
  'A character is offered a wish, but it can only be used to change someone else\'s life, not their own.',
  'A group of strangers wake up in a hotel with no memory of how they got there or each other.',
  'A child discovers that their shadow has started doing things on its own after dark.',
  'A character finds a diary that describes their exact life, written by someone who died decades earlier.',
  'A struggling writer\'s fictional characters start showing up in real life, one by one.',
  'A small coastal town discovers a message carved into a cliff that only appears at low tide.',
  'Someone is given a phone that can call anyone, living or dead, but only once each.',
  'A character realizes they have lived this exact day before, but no one else remembers it.',
  'A traveling salesman sells items that grant a single wish, but always with an unexpected cost.',
  'A group of old friends reunite and discover one of them has been secretly keeping a life-changing secret for years.',
  'A character finds a key that opens any door, but only doors that shouldn\'t be opened.',
  'A small-town newspaper starts printing stories about events before they happen.',
  'A person discovers a hidden room in their childhood home that wasn\'t there when they grew up.',
  'An old radio in an attic picks up broadcasts from a town that no longer exists.',
  'A character is given one chance to say goodbye to someone they never got to say goodbye to.',
  'A pair of rival inventors are forced to combine their competing machines to save their town.',
  'A stranger at a bus stop hands someone an envelope and says "You\'ll need this later," then vanishes.',
  'A character discovers their childhood treehouse still exists, exactly as they left it, decades later.',
  'A small village holds an annual lottery, and this year the winner refuses to accept the prize.',
  'A character wakes up able to hear what people truly mean, beneath what they actually say.',
];

const WritingPromptStoryIdeaGeneratorContent = () => {
  const [prompt, setPrompt] = useState<string | null>(null);

  const generate = () => {
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<AutoStoriesIcon />} onClick={generate}>
        {prompt ? 'Generate Another' : 'Generate a Prompt'}
      </Button>

      {prompt && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', width: '100%', maxWidth: 600 }}>
          <Typography variant="h6" fontWeight={700}>{prompt}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const WritingPromptStoryIdeaGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Writing Prompt & Story Idea Generator</Typography>
      <Typography variant="body1">
        Click &quot;Generate a Prompt&quot; and the tool picks one creative-writing prompt or story premise
        at random from a curated list of more than 60 ideas — everything from a single evocative scenario
        to a full story-starting situation. Click &quot;Generate Another&quot; any time you want a
        different idea to work with.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One click might produce: &quot;Two strangers are stuck in an elevator during a blackout and must
        work together.&quot; — a ready-made setup you can develop into a short story, scene, or novel
        chapter.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Breaking through writer&apos;s block with a fresh scenario to explore.</li>
          <li>Finding a warm-up exercise for a creative writing class or workshop.</li>
          <li>Sparking an idea for a short story, novel, screenplay, or roleplay scenario.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What's the difference between a "writing prompt" and a "story idea" here?</strong> This tool intentionally combines both into one list — some entries are open-ended scenarios meant to spark any kind of writing, while others are more fleshed-out story premises with a clear setup. Either way, they're meant as a starting point you can take in your own direction.</li>
          <li><strong>Can I get the same prompt twice?</strong> Yes — each click is an independent random pick, so repeats are possible, especially with frequent clicking.</li>
          <li><strong>Is there a "save" feature for prompts I like?</strong> No — the tool only displays the current prompt; copy or write down any prompt you want to keep before generating another one.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/writing-prompt-story-idea-generator" content={content}>
      <WritingPromptStoryIdeaGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WritingPromptStoryIdeaGenerator;
