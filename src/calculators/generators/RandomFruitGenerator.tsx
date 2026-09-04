'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Fruit {
  name: string;
  emoji: string;
  fact: string;
}

const FRUITS: Fruit[] = [
  { name: 'Apple', emoji: '🍎', fact: 'There are over 7,500 known apple varieties grown around the world.' },
  { name: 'Banana', emoji: '🍌', fact: 'Bananas are botanically classified as berries, while strawberries are not.' },
  { name: 'Orange', emoji: '🍊', fact: 'Oranges are technically a type of modified berry called a hesperidium.' },
  { name: 'Strawberry', emoji: '🍓', fact: 'A strawberry’s seeds are on the outside — each one is its own tiny fruit.' },
  { name: 'Grape', emoji: '🍇', fact: 'Grapes have been cultivated by humans for over 6,000 years.' },
  { name: 'Watermelon', emoji: '🍉', fact: 'Watermelon is about 92% water, which is where its name comes from.' },
  { name: 'Pineapple', emoji: '🍍', fact: 'It takes roughly two to three years for a pineapple plant to produce fruit.' },
  { name: 'Mango', emoji: '🥭', fact: 'Mango is one of the most widely consumed fruits in the world.' },
  { name: 'Peach', emoji: '🍑', fact: 'Peaches are part of the rose family, along with plums and cherries.' },
  { name: 'Pear', emoji: '🍐', fact: 'Pears ripen best off the tree, at room temperature after picking.' },
  { name: 'Cherry', emoji: '🍒', fact: 'A single cherry tree can produce thousands of cherries in one season.' },
  { name: 'Kiwi', emoji: '🥝', fact: 'Kiwifruit contains more vitamin C by weight than an orange.' },
  { name: 'Lemon', emoji: '🍋', fact: 'Lemons were once so valuable they were given as prized gifts.' },
  { name: 'Lime', emoji: '🍈', fact: 'Limes are typically more acidic than lemons.' },
  { name: 'Coconut', emoji: '🥥', fact: 'Botanically, a coconut is classified as a fibrous one-seeded drupe.' },
  { name: 'Papaya', emoji: '🫐', fact: 'Papaya contains papain, an enzyme often used to tenderize meat.' },
  { name: 'Blueberry', emoji: '🫐', fact: 'Blueberries are one of the few fruits that are naturally blue in color.' },
  { name: 'Raspberry', emoji: '🍓', fact: 'A raspberry is actually a cluster of dozens of tiny individual fruits.' },
  { name: 'Blackberry', emoji: '🍇', fact: 'Blackberries are part of the same plant family as roses.' },
  { name: 'Fig', emoji: '🍈', fact: 'A fig is technically an inverted flower that blooms on the inside.' },
  { name: 'Pomegranate', emoji: '🍎', fact: 'A single pomegranate can contain hundreds of edible seeds called arils.' },
  { name: 'Guava', emoji: '🍈', fact: 'Guava has one of the highest vitamin C contents of any common fruit.' },
  { name: 'Dragon Fruit', emoji: '🐉', fact: 'Dragon fruit grows on a climbing cactus native to Central America.' },
  { name: 'Passion Fruit', emoji: '🍈', fact: 'The passion fruit flower is one of the most elaborate in the plant world.' },
  { name: 'Plum', emoji: '🍑', fact: 'Dried plums are commonly known as prunes.' },
  { name: 'Apricot', emoji: '🍑', fact: 'Apricots were cultivated in China as early as 2000 BCE.' },
  { name: 'Cantaloupe', emoji: '🍈', fact: 'Cantaloupe is a member of the melon family, related to cucumbers.' },
  { name: 'Honeydew Melon', emoji: '🍈', fact: 'Honeydew melons continue ripening slightly after being picked.' },
  { name: 'Grapefruit', emoji: '🍊', fact: 'Grapefruit gets its name because it grows in clusters, like grapes.' },
  { name: 'Tangerine', emoji: '🍊', fact: 'Tangerines are a variety of mandarin orange, generally sweeter and easier to peel.' },
  { name: 'Cranberry', emoji: '🫐', fact: 'Ripe cranberries actually bounce, a trick once used to test their freshness.' },
  { name: 'Avocado', emoji: '🥑', fact: 'An avocado is technically a large berry with a single big seed.' },
  { name: 'Star Fruit', emoji: '⭐', fact: 'Sliced crosswise, star fruit reveals a perfect five-pointed star shape.' },
  { name: 'Lychee', emoji: '🍈', fact: 'Lychee has a rough red skin that peels away to reveal sweet, translucent flesh.' },
  { name: 'Persimmon', emoji: '🍅', fact: 'Unripe persimmons can taste extremely astringent until they fully ripen.' },
  { name: 'Cantelope', emoji: '🍈', fact: 'Melons are technically classified as a type of berry called a pepo.' },
  { name: 'Nectarine', emoji: '🍑', fact: 'A nectarine is genetically very close to a peach, just without the fuzzy skin.' },
  { name: 'Tomato', emoji: '🍅', fact: 'Tomatoes are botanically a fruit, despite being treated as a vegetable in cooking.' },
  { name: 'Jackfruit', emoji: '🍈', fact: 'Jackfruit is the largest tree-borne fruit in the world, sometimes over 80 pounds.' },
  { name: 'Durian', emoji: '🍈', fact: 'Durian is famous for its extremely strong smell, which is banned on many forms of public transport.' },
  { name: 'Elderberry', emoji: '🫐', fact: 'Elderberries must be cooked before eating — raw ones can cause an upset stomach.' },
];

const RandomFruitGeneratorContent = () => {
  const [fruit, setFruit] = useState<Fruit | null>(null);

  const generate = () => {
    setFruit(FRUITS[Math.floor(Math.random() * FRUITS.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate Random Fruit
      </Button>

      {fruit && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 480 }}>
          <Typography variant="h2" sx={{ fontSize: '3rem', lineHeight: 1 }}>{fruit.emoji}</Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>{fruit.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>{fruit.fact}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const RandomFruitGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Fruit Generator Works</Typography>
      <Typography variant="body1">
        Click &quot;Generate Random Fruit&quot; to get a random fruit name, complete with an emoji and a short
        fun fact about it.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A click might generate &quot;Dragon Fruit&quot; along with the fact that it grows on a climbing cactus
        native to Central America, or &quot;Banana&quot; with the fact that it&apos;s botanically a berry.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking a fruit at random for a smoothie, snack, or recipe experiment.</li>
          <li>Playing a fun icebreaker or trivia game about fruit facts.</li>
          <li>Inspiring a classroom lesson on nutrition or plant biology.</li>
          <li>Settling a lighthearted &quot;pick for me&quot; decision at the grocery store.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many fruits can this generate?</Typography>
      <Typography variant="body1">
        The tool draws from a curated list of around 40 common and lesser-known fruits from around the world.
      </Typography>
      <Typography variant="h3">Are the fun facts accurate?</Typography>
      <Typography variant="body1">
        They&apos;re based on generally accepted facts about each fruit, presented as lighthearted trivia rather
        than a scientific reference.
      </Typography>
      <Typography variant="h3">Can I get the same fruit twice in a row?</Typography>
      <Typography variant="body1">
        Yes — each click picks independently from the full list, so repeats are possible.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-fruit-generator" content={content}>
      <RandomFruitGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomFruitGenerator;
