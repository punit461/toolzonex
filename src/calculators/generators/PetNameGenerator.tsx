'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type PetType = 'dog' | 'cat' | 'bird' | 'other';
type Theme = 'cute' | 'funny' | 'majestic';

const NAMES: Record<PetType, Record<Theme, string[]>> = {
  dog: {
    cute: ['Biscuit', 'Waffles', 'Peanut', 'Bella', 'Daisy', 'Honey', 'Cocoa', 'Pumpkin'],
    funny: ['Sir Barks-a-Lot', 'Nacho', 'Burrito', 'Pickles', 'Meatball', 'Waddles', 'Noodle', 'Chewbacca'],
    majestic: ['Duke', 'Zeus', 'Titan', 'Athena', 'Apollo', 'Maximus', 'Nova', 'Odin'],
  },
  cat: {
    cute: ['Mochi', 'Muffin', 'Marshmallow', 'Luna', 'Pumpkin', 'Cinnamon', 'Biscuit', 'Willow'],
    funny: ['Sir Meowsalot', 'Grumpy Cat', 'Whiskers McGee', 'Purrlock Holmes', 'Catrick Swayze', 'Furrball'],
    majestic: ['Cleopatra', 'Sphinx', 'Caesar', 'Athena', 'Loki', 'Shadow', 'Onyx', 'Salem'],
  },
  bird: {
    cute: ['Tweety', 'Sunny', 'Kiwi', 'Peaches', 'Sky', 'Pip', 'Chirpy', 'Feathers'],
    funny: ['Captain Squawk', 'Polly', 'Beak Jagger', 'Featherstone', 'Tweetwood Mac'],
    majestic: ['Phoenix', 'Talon', 'Storm', 'Sterling', 'Griffin', 'Falcon'],
  },
  other: {
    cute: ['Peanut', 'Bubbles', 'Nibbles', 'Clover', 'Pudding', 'Marbles'],
    funny: ['Sir Wiggles', 'Chunky', 'Noodle', 'Sir Hops-a-Lot', 'Turbo'],
    majestic: ['Blaze', 'Storm', 'Shadow', 'Rex', 'Ranger', 'Onyx'],
  },
};

const PetNameGeneratorContent = () => {
  const [petType, setPetType] = useState<PetType>('dog');
  const [theme, setTheme] = useState<Theme>('cute');
  const [name, setName] = useState<string | null>(null);

  const generate = () => {
    const list = NAMES[petType][theme];
    setName(list[Math.floor(Math.random() * list.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Pet Type</Typography>
        <ToggleButtonGroup exclusive value={petType} onChange={(_, val) => val && setPetType(val)}>
          <ToggleButton value="dog" sx={{ textTransform: 'none' }}>Dog</ToggleButton>
          <ToggleButton value="cat" sx={{ textTransform: 'none' }}>Cat</ToggleButton>
          <ToggleButton value="bird" sx={{ textTransform: 'none' }}>Bird</ToggleButton>
          <ToggleButton value="other" sx={{ textTransform: 'none' }}>Other</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1.5, textAlign: 'center' }}>Theme</Typography>
        <ToggleButtonGroup exclusive value={theme} onChange={(_, val) => val && setTheme(val)}>
          <ToggleButton value="cute" sx={{ textTransform: 'none' }}>Cute</ToggleButton>
          <ToggleButton value="funny" sx={{ textTransform: 'none' }}>Funny</ToggleButton>
          <ToggleButton value="majestic" sx={{ textTransform: 'none' }}>Majestic</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Button variant="contained" size="large" startIcon={<PetsIcon />} onClick={generate}>
        Generate Pet Name
      </Button>

      {name && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', minWidth: 260 }}>
          <Typography variant="h4" fontWeight={700}>{name}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const PetNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Pet Name Generator Works</Typography>
      <Typography variant="body1">
        Choose your pet type (dog, cat, bird, or other) and an optional theme (cute, funny, or majestic), then
        click generate. The tool randomly picks a name from a curated word list matched to your chosen type
        and theme.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing &quot;Dog&quot; and &quot;Majestic&quot; might generate &quot;Zeus&quot; or
        &quot;Titan,&quot; while choosing &quot;Cat&quot; and &quot;Funny&quot; might generate &quot;Sir
        Meowsalot&quot; or &quot;Purrlock Holmes.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding name ideas for a new puppy, kitten, or other pet.</li>
          <li>Getting inspiration when you&apos;re stuck deciding between too many name options.</li>
          <li>Brainstorming a fitting name that matches your pet&apos;s personality.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I get more than one name at a time?</Typography>
      <Typography variant="body1">
        Each click generates one name — click &quot;Generate Pet Name&quot; again as many times as you like to
        see more options for the same pet type and theme.
      </Typography>
      <Typography variant="h3">Will the same name repeat?</Typography>
      <Typography variant="body1">
        Yes — each generation is an independent random pick from the list, so repeats are possible, especially
        with fewer clicks.
      </Typography>
      <Typography variant="h3">What does the &quot;Other&quot; pet type cover?</Typography>
      <Typography variant="body1">
        &quot;Other&quot; is a general-purpose name list suited to small pets like rabbits, hamsters, guinea
        pigs, reptiles, and fish that don&apos;t fit neatly into the dog, cat, or bird categories.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/pet-name-generator" content={content}>
      <PetNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PetNameGenerator;
