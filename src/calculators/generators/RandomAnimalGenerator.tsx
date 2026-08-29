'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Animal {
  name: string;
  emoji: string;
  fact: string;
}

const ANIMALS: Animal[] = [
  { name: 'Elephant', emoji: '🐘', fact: 'Elephants are the largest land animals and can weigh over 6,000 kg.' },
  { name: 'Giraffe', emoji: '🦒', fact: 'A giraffe’s tongue can be up to 45 cm (18 in) long.' },
  { name: 'Penguin', emoji: '🐧', fact: 'Penguins huddle together in large groups to conserve heat in the cold.' },
  { name: 'Octopus', emoji: '🐙', fact: 'Octopuses have three hearts and blue blood.' },
  { name: 'Kangaroo', emoji: '🦘', fact: 'Kangaroos can’t walk backward.' },
  { name: 'Koala', emoji: '🐨', fact: 'Koalas sleep up to 20 hours a day.' },
  { name: 'Tiger', emoji: '🐯', fact: 'No two tigers have the same stripe pattern — like human fingerprints.' },
  { name: 'Dolphin', emoji: '🐬', fact: 'Dolphins sleep with one half of their brain at a time.' },
  { name: 'Owl', emoji: '🦉', fact: 'Owls can rotate their heads up to 270 degrees.' },
  { name: 'Chameleon', emoji: '🦎', fact: 'Chameleons can move each eye independently in different directions.' },
  { name: 'Sloth', emoji: '🦥', fact: 'Sloths move so slowly that algae can grow on their fur.' },
  { name: 'Flamingo', emoji: '🦩', fact: 'Flamingos are born gray — their pink color comes from their diet.' },
  { name: 'Hedgehog', emoji: '🦔', fact: 'Hedgehogs have between 5,000 and 7,000 spines on their bodies.' },
  { name: 'Panda', emoji: '🐼', fact: 'Giant pandas spend about 12 hours a day eating bamboo.' },
  { name: 'Peacock', emoji: '🦚', fact: 'Only male peafowl have the colorful tail feathers called a train.' },
  { name: 'Sea Turtle', emoji: '🐢', fact: 'Sea turtles can hold their breath for hours while resting.' },
  { name: 'Fox', emoji: '🦊', fact: 'A fox’s bushy tail helps it balance and keeps it warm in winter.' },
  { name: 'Bat', emoji: '🦇', fact: 'Bats are the only mammals capable of sustained flight.' },
  { name: 'Otter', emoji: '🦦', fact: 'Sea otters hold hands while sleeping so they don’t drift apart.' },
  { name: 'Camel', emoji: '🐪', fact: 'A camel’s hump stores fat, not water, for energy on long journeys.' },
  { name: 'Hippopotamus', emoji: '🦛', fact: 'Hippos can hold their breath underwater for up to 5 minutes.' },
  { name: 'Squirrel', emoji: '🐿️', fact: 'Squirrels forget where they bury a large portion of their nuts.' },
  { name: 'Wolf', emoji: '🐺', fact: 'Wolves can howl at a range of frequencies to communicate over miles.' },
  { name: 'Frog', emoji: '🐸', fact: 'Some frogs can jump over 20 times their own body length.' },
  { name: 'Bee', emoji: '🐝', fact: 'A bee has to visit around 2 million flowers to make one pound of honey.' },
];

const RandomAnimalGeneratorContent = () => {
  const [animal, setAnimal] = useState<Animal | null>(null);

  const generate = () => {
    setAnimal(ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<PetsIcon />} onClick={generate}>
        Generate Random Animal
      </Button>

      {animal && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 420 }}>
          <Typography sx={{ fontSize: '3.5rem', lineHeight: 1 }}>{animal.emoji}</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>{animal.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>{animal.fact}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const RandomAnimalGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Animal Generator Works</Typography>
      <Typography variant="body1">
        This tool picks a random animal from a curated list of well-known creatures and shows its name, an
        emoji, and a fun fact. Click the button any time for a new random animal.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click &quot;Generate Random Animal.&quot;</li>
          <li>An animal name, emoji, and fun fact appear.</li>
          <li>Click again for another random pick.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking generate might return &quot;🦥 Sloth — Sloths move so slowly that algae can grow on their
        fur&quot; one time, and &quot;🐙 Octopus&quot; with its own fact the next.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sparking ideas for a drawing, story, or creative project featuring a random animal.</li>
          <li>Picking a random animal for a classroom game, trivia round, or icebreaker.</li>
          <li>Learning a new fun fact each time you click generate.</li>
          <li>Choosing a random mascot or theme for a team or project.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are the facts accurate?</Typography>
      <Typography variant="body1">
        Yes — each fact is a commonly cited, general piece of trivia about that animal, though as with any fun
        fact it&apos;s worth double-checking details for anything you plan to use in formal research.
      </Typography>
      <Typography variant="h3">Can the same animal appear twice in a row?</Typography>
      <Typography variant="body1">
        Yes — each click is an independent random pick, so repeats are possible.
      </Typography>
      <Typography variant="h3">How many animals are included?</Typography>
      <Typography variant="body1">
        The generator draws from a curated list of two dozen well-known animals, chosen to be recognizable and
        fun rather than an exhaustive database of every species.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-animal-generator" content={content}>
      <RandomAnimalGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomAnimalGenerator;
