'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Vegetable {
  name: string;
  fact: string;
}

const VEGETABLES: Vegetable[] = [
  { name: 'Carrot', fact: 'Great roasted, and the beta-carotene gives it that orange color.' },
  { name: 'Broccoli', fact: 'Steam it lightly — overcooking turns it mushy and dulls the flavor.' },
  { name: 'Spinach', fact: 'Cooks down dramatically, so a big bunch shrinks to a small portion.' },
  { name: 'Potato', fact: 'Technically a starchy tuber, and one of the most versatile vegetables around.' },
  { name: 'Tomato', fact: "Botanically a fruit, but used as a vegetable in almost every kitchen." },
  { name: 'Onion', fact: 'Chilling it before chopping can help reduce eye irritation.' },
  { name: 'Garlic', fact: 'Crushing it and letting it sit for a few minutes boosts its flavor compounds.' },
  { name: 'Bell Pepper', fact: 'Red, yellow, and orange peppers are just riper versions of green ones.' },
  { name: 'Cucumber', fact: 'Over 95% water, making it one of the most hydrating vegetables.' },
  { name: 'Zucchini', fact: 'Can be spiralized into "zoodles" as a low-carb pasta swap.' },
  { name: 'Eggplant', fact: 'Salting slices before cooking helps draw out excess moisture and bitterness.' },
  { name: 'Cauliflower', fact: 'A popular low-carb substitute for rice or pizza crust when riced.' },
  { name: 'Cabbage', fact: 'Stores for weeks in the fridge, making it a reliable pantry staple.' },
  { name: 'Lettuce', fact: 'Darker green outer leaves generally have more nutrients than pale inner ones.' },
  { name: 'Kale', fact: 'Massaging the leaves with a little oil softens their tough texture.' },
  { name: 'Celery', fact: 'Mostly water and fiber, and classic in soup bases like mirepoix.' },
  { name: 'Asparagus', fact: 'Snap the woody end off naturally instead of cutting with a knife.' },
  { name: 'Green Beans', fact: 'Also called string beans, though most modern varieties are stringless.' },
  { name: 'Peas', fact: 'Frozen peas are often more nutritious than "fresh" ones that traveled far.' },
  { name: 'Corn', fact: "Botanically a grain, but cooked and eaten as a vegetable." },
  { name: 'Sweet Potato', fact: 'Not related to regular potatoes — it belongs to the morning glory family.' },
  { name: 'Pumpkin', fact: 'A type of winter squash, and the seeds are edible when roasted.' },
  { name: 'Butternut Squash', fact: 'Its dense flesh makes it excellent roasted or pureed into soup.' },
  { name: 'Beet', fact: 'Both the root and the leafy greens on top are edible.' },
  { name: 'Radish', fact: 'Adds a peppery crunch to salads and is ready to harvest quickly.' },
  { name: 'Turnip', fact: 'Milder and sweeter when roasted than when eaten raw.' },
  { name: 'Parsnip', fact: 'Looks like a pale carrot, but has a sweeter, nuttier flavor.' },
  { name: 'Leek', fact: 'Related to onions and garlic, with a much milder, sweeter taste.' },
  { name: 'Artichoke', fact: 'The edible part is the flower bud before it blooms.' },
  { name: 'Brussels Sprouts', fact: 'Roasting at high heat brings out their natural sweetness.' },
  { name: 'Okra', fact: 'Releases a natural thickener when cooked, great for stews like gumbo.' },
  { name: 'Mushroom', fact: 'A fungus, not a plant, though it is treated as a vegetable in cooking.' },
  { name: 'Squash', fact: 'Comes in summer and winter varieties with very different textures.' },
  { name: 'Pumpkin Seeds', fact: 'Also called pepitas, and a popular roasted snack.' },
  { name: 'Fennel', fact: 'Has a mild licorice flavor that mellows significantly when cooked.' },
  { name: 'Bok Choy', fact: 'A staple in stir-fries, with crunchy stalks and tender leaves.' },
  { name: 'Chard', fact: 'The colorful stalks are edible too, and can be cooked separately from the leaves.' },
  { name: 'Kohlrabi', fact: 'Tastes similar to broccoli stems, with a crisp, slightly sweet bite.' },
  { name: 'Watercress', fact: 'One of the most nutrient-dense leafy greens by weight.' },
  { name: 'Arugula', fact: 'Has a peppery bite that gets milder the younger the leaves are.' },
  { name: 'Endive', fact: 'Slightly bitter, and often used raw as an edible scoop for dips.' },
  { name: 'Radicchio', fact: 'A red-leafed chicory that adds bitterness and color to salads.' },
  { name: 'Rutabaga', fact: 'A cross between a cabbage and a turnip, with a sweet, earthy flavor.' },
  { name: 'Jicama', fact: 'Crunchy and slightly sweet, often eaten raw with lime and chili.' },
  { name: 'Snap Peas', fact: 'The entire pod is edible, unlike regular shelling peas.' },
  { name: 'Scallion', fact: 'Also called green onion, and both the white and green parts are used.' },
  { name: 'Shallot', fact: 'Milder and sweeter than regular onions, prized in French cooking.' },
  { name: 'Chili Pepper', fact: 'Its heat is measured on the Scoville scale.' },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const COUNT = 4;

const RandomVegetableGeneratorContent = () => {
  const [results, setResults] = useState<Vegetable[]>(() => shuffle(VEGETABLES).slice(0, COUNT));

  const generate = () => setResults(shuffle(VEGETABLES).slice(0, COUNT));

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', textAlign: 'center' }}>
      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate} sx={{ mb: 4 }}>
        {results.length ? 'Regenerate' : 'Generate'}
      </Button>

      <Grid container spacing={2}>
        {results.map((v, i) => (
          <Grid item xs={12} sm={6} key={v.name + i}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
              <Typography variant="h6" fontWeight={700}>{v.name}</Typography>
              <Typography variant="body2" color="text.secondary">{v.fact}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const RandomVegetableGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Random Vegetable Generator</Typography>
      <Typography variant="body1">
        Click &quot;Generate&quot; to see {COUNT} random vegetables pulled from a list of roughly 48, each shown
        with a short fun fact or usage tip. Click &quot;Regenerate&quot; for a completely new random set any
        time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A click might return Carrot, Zucchini, Leek, and Radish, each with its own short tip — for example,
        Zucchini&apos;s tip mentions that it can be spiralized into &quot;zoodles&quot; as a pasta alternative.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting inspiration for what vegetable to cook with tonight.</li>
          <li>Picking a random vegetable for a kids&apos; nutrition game or classroom activity.</li>
          <li>Randomly assigning ingredients for a cooking challenge or recipe brainstorm.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can the same vegetable show up twice in one set?</strong> No — each set of {COUNT} vegetables is chosen without repeats, so every result in a single generation is different.</li>
          <li><strong>Are the facts scientifically verified?</strong> They&apos;re short, generally accurate cooking or trivia tips meant to be fun and useful rather than a botanical reference.</li>
          <li><strong>Does the list include fruits that are technically vegetables in cooking, like tomatoes?</strong> Yes — a few entries like tomato and corn are botanically fruits or grains but are included because they&apos;re universally treated as vegetables in the kitchen.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-vegetable-generator" content={content}>
      <RandomVegetableGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomVegetableGenerator;
