'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Category = 'silly' | 'deep' | 'food' | 'travel';

const CATEGORY_LABELS: Record<Category, string> = {
  silly: 'Silly',
  deep: 'Deep',
  food: 'Food',
  travel: 'Travel',
};

const QUESTIONS: Record<Category, string[]> = {
  silly: [
    'Would you rather have fingers as long as legs, or legs as short as fingers?',
    'Would you rather always speak in rhymes, or always sing instead of talking?',
    'Would you rather have a pet dragon that fits in your pocket, or a giant friendly dragon you can ride?',
    'Would you rather sneeze glitter, or hiccup bubbles?',
    'Would you rather have hair that changes color with your mood, or eyes that change color with the weather?',
    'Would you rather be able to talk to animals but only about the weather, or talk to plants but only about gossip?',
    'Would you rather have a permanent slow-motion walk, or a permanent fast-forward walk?',
    'Would you rather wear a clown costume every day for a year, or a superhero costume for a month?',
  ],
  deep: [
    'Would you rather always know when someone is lying to you, or always get away with any lie you tell?',
    'Would you rather have unlimited time or unlimited money?',
    'Would you rather relive your happiest memory forever, or keep making new memories with the risk they might not be as happy?',
    'Would you rather know the exact date of your death, or never know how much time you have left?',
    'Would you rather be forgotten by everyone after you die, or be remembered but only for one mistake?',
    'Would you rather always have to say what you truly think, or never be able to share your true opinion?',
    'Would you rather give up your favorite hobby, or give up your favorite comfort food, for the rest of your life?',
    'Would you rather have the ability to change one decision from your past, or guarantee one decision in your future?',
  ],
  food: [
    'Would you rather give up pizza forever, or give up chocolate forever?',
    'Would you rather only eat sweet foods, or only eat savory foods for the rest of your life?',
    'Would you rather have an unlimited supply of your favorite meal, or get to try one new dish every single day?',
    'Would you rather eat your favorite food every day for a year, or never eat it again?',
    'Would you rather cook every meal yourself forever, or eat only meals someone else cooks forever?',
    'Would you rather lose your sense of taste, or your sense of smell?',
    'Would you rather only drink coffee for the rest of your life, or only drink tea?',
    'Would you rather always have to eat dessert first, or never be allowed to eat dessert at all?',
  ],
  travel: [
    'Would you rather explore outer space, or explore the deepest parts of the ocean?',
    'Would you rather visit every country in the world but never revisit any of them, or visit your five favorite places over and over?',
    'Would you rather travel only by train for the rest of your life, or only by plane?',
    'Would you rather live in a bustling big city, or a quiet remote village?',
    'Would you rather have a free trip to anywhere in the world right now, or a guaranteed dream vacation planned for next year?',
    'Would you rather backpack through a new country with no plan, or follow a perfectly detailed itinerary?',
    'Would you rather never be able to travel abroad again, or never be able to travel within your own country again?',
    'Would you rather live somewhere it snows year-round, or somewhere it is always hot?',
  ],
};

const WouldYouRatherGeneratorContent = () => {
  const [category, setCategory] = useState<Category>('silly');
  const [question, setQuestion] = useState<string | null>(null);

  const generate = () => {
    const list = QUESTIONS[category];
    setQuestion(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Category</Typography>
        <ToggleButtonGroup exclusive value={category} onChange={(_, val) => val && setCategory(val)}>
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>
              {CATEGORY_LABELS[key]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate Question
      </Button>

      {question && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 560 }}>
          <Typography variant="h6">{question}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const WouldYouRatherGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Would You Rather Generator Works</Typography>
      <Typography variant="body1">
        Pick a category — Silly, Deep, Food, or Travel — and click &quot;Generate Question&quot; for a random
        &quot;would you rather&quot; question from a curated, family-friendly list mixing lighthearted fun with
        more thoughtful prompts.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;Deep&quot; might generate &quot;Would you rather always know when someone is lying to
        you, or always get away with any lie you tell?&quot;, while &quot;Silly&quot; might generate &quot;Would
        you rather sneeze glitter, or hiccup bubbles?&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Breaking the ice at a party, classroom, or team meeting.</li>
          <li>Sparking conversation on a road trip or family game night.</li>
          <li>Warming up a group discussion before a deeper conversation.</li>
          <li>Adding a quick fun prompt to a group chat or social post.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this appropriate for a general or family audience?</Typography>
      <Typography variant="body1">
        Yes — every question across all four categories is written to be tasteful and family-friendly, safe to
        use in a classroom, workplace, or mixed group setting.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between the categories?</Typography>
      <Typography variant="body1">
        Silly leans into pure lighthearted fun, Deep asks more thoughtful or reflective questions, Food focuses
        on eating and cooking dilemmas, and Travel centers on places, trips, and ways of exploring the world.
      </Typography>
      <Typography variant="h3">Can I get the same question twice in a row?</Typography>
      <Typography variant="body1">
        Yes — each click randomly selects from that category&apos;s list independently, so repeats are possible.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/would-you-rather-generator" content={content}>
      <WouldYouRatherGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WouldYouRatherGenerator;
