'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface BabyName {
  name: string;
  meaning: string;
  gender: 'boy' | 'girl' | 'unisex';
  origin: 'indian' | 'western';
}

const BABY_NAMES: BabyName[] = [
  { name: 'Aarav', meaning: 'Peaceful, calm', gender: 'boy', origin: 'indian' },
  { name: 'Arjun', meaning: 'Bright, shining', gender: 'boy', origin: 'indian' },
  { name: 'Vivaan', meaning: 'First rays of the sun', gender: 'boy', origin: 'indian' },
  { name: 'Reyansh', meaning: 'Part of the sun', gender: 'boy', origin: 'indian' },
  { name: 'Aditya', meaning: 'Sun, solar', gender: 'boy', origin: 'indian' },
  { name: 'Vihaan', meaning: 'Dawn, morning', gender: 'boy', origin: 'indian' },
  { name: 'Kabir', meaning: 'Great, noble', gender: 'boy', origin: 'indian' },
  { name: 'Dhruv', meaning: 'Pole star, constant', gender: 'boy', origin: 'indian' },
  { name: 'Ishaan', meaning: 'Sun, lord of wealth', gender: 'boy', origin: 'indian' },
  { name: 'Kian', meaning: 'Ancient, king', gender: 'boy', origin: 'indian' },
  { name: 'Anaya', meaning: 'Caring, compassionate', gender: 'girl', origin: 'indian' },
  { name: 'Diya', meaning: 'Light, lamp', gender: 'girl', origin: 'indian' },
  { name: 'Myra', meaning: 'Admirable, beloved', gender: 'girl', origin: 'indian' },
  { name: 'Saanvi', meaning: 'Goddess Lakshmi', gender: 'girl', origin: 'indian' },
  { name: 'Aanya', meaning: 'Grace, mercy', gender: 'girl', origin: 'indian' },
  { name: 'Kiara', meaning: 'Bright, clear', gender: 'girl', origin: 'indian' },
  { name: 'Pari', meaning: 'Fairy, angel', gender: 'girl', origin: 'indian' },
  { name: 'Riya', meaning: 'Singer, graceful', gender: 'girl', origin: 'indian' },
  { name: 'Meera', meaning: 'Devotee, ocean', gender: 'girl', origin: 'indian' },
  { name: 'Aadhya', meaning: 'First, beginning', gender: 'girl', origin: 'indian' },
  { name: 'James', meaning: 'Supplanter', gender: 'boy', origin: 'western' },
  { name: 'Oliver', meaning: 'Olive tree, peaceful', gender: 'boy', origin: 'western' },
  { name: 'Ethan', meaning: 'Strong, firm', gender: 'boy', origin: 'western' },
  { name: 'Liam', meaning: 'Resolute protector', gender: 'boy', origin: 'western' },
  { name: 'Noah', meaning: 'Rest, comfort', gender: 'boy', origin: 'western' },
  { name: 'Lucas', meaning: 'Light, illumination', gender: 'boy', origin: 'western' },
  { name: 'Henry', meaning: 'Estate ruler', gender: 'boy', origin: 'western' },
  { name: 'Alexander', meaning: 'Defender of people', gender: 'boy', origin: 'western' },
  { name: 'Sebastian', meaning: 'Revered, majestic', gender: 'boy', origin: 'western' },
  { name: 'Benjamin', meaning: 'Son of the right hand', gender: 'boy', origin: 'western' },
  { name: 'Emma', meaning: 'Universal, whole', gender: 'girl', origin: 'western' },
  { name: 'Olivia', meaning: 'Olive tree, peaceful', gender: 'girl', origin: 'western' },
  { name: 'Sophia', meaning: 'Wisdom', gender: 'girl', origin: 'western' },
  { name: 'Isabella', meaning: 'Devoted to God', gender: 'girl', origin: 'western' },
  { name: 'Charlotte', meaning: 'Free woman', gender: 'girl', origin: 'western' },
  { name: 'Amelia', meaning: 'Industrious, striving', gender: 'girl', origin: 'western' },
  { name: 'Harper', meaning: 'Harp player', gender: 'girl', origin: 'western' },
  { name: 'Evelyn', meaning: 'Desired, wished for', gender: 'girl', origin: 'western' },
  { name: 'Abigail', meaning: 'My father is joy', gender: 'girl', origin: 'western' },
  { name: 'Ella', meaning: 'Beautiful fairy', gender: 'girl', origin: 'western' },
  { name: 'Kiran', meaning: 'Ray of light', gender: 'unisex', origin: 'indian' },
  { name: 'Akash', meaning: 'Sky', gender: 'unisex', origin: 'indian' },
  { name: 'Kai', meaning: 'Sea, forgiveness', gender: 'unisex', origin: 'indian' },
  { name: 'Jai', meaning: 'Victory', gender: 'unisex', origin: 'indian' },
  { name: 'Neel', meaning: 'Blue, sapphire', gender: 'unisex', origin: 'indian' },
  { name: 'Riley', meaning: 'Courageous, valiant', gender: 'unisex', origin: 'western' },
  { name: 'Quinn', meaning: 'Wise, chief', gender: 'unisex', origin: 'western' },
  { name: 'Avery', meaning: 'Ruler of elves', gender: 'unisex', origin: 'western' },
  { name: 'Skyler', meaning: 'Scholar, shelter', gender: 'unisex', origin: 'western' },
  { name: 'Finley', meaning: 'Fair warrior', gender: 'unisex', origin: 'western' },
];

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const BabyNameGeneratorContent = () => {
  const [gender, setGender] = useState<string>('all');
  const [origin, setOrigin] = useState<string>('both');
  const [letter, setLetter] = useState('');
  const [names, setNames] = useState<BabyName[]>([]);

  const generate = () => {
    let pool = BABY_NAMES;
    if (gender !== 'all') pool = pool.filter((n) => n.gender === gender || n.gender === 'unisex');
    if (origin !== 'both') pool = pool.filter((n) => n.origin === origin);
    if (letter.trim()) pool = pool.filter((n) => n.name.toLowerCase().startsWith(letter.trim().toLowerCase()));
    setNames(pickRandom(pool, 20));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 700, mx: 'auto' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        <ToggleButtonGroup
          value={gender}
          exclusive
          onChange={(_, v) => v && setGender(v)}
          fullWidth
          size="small"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="boy">Boy</ToggleButton>
          <ToggleButton value="girl">Girl</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={origin}
          exclusive
          onChange={(_, v) => v && setOrigin(v)}
          fullWidth
          size="small"
        >
          <ToggleButton value="both">Both</ToggleButton>
          <ToggleButton value="indian">Indian</ToggleButton>
          <ToggleButton value="western">Western</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TextField
        label="Starting letter (optional)"
        value={letter}
        onChange={(e) => setLetter(e.target.value.slice(0, 1))}
        fullWidth
        placeholder="e.g. A"
        size="small"
        inputProps={{ maxLength: 1, style: { textTransform: 'uppercase', textAlign: 'center', fontSize: '1.1rem' } }}
      />

      <Button variant="contained" size="large" onClick={generate} fullWidth>
        Generate Names
      </Button>

      {names.length > 0 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
            {names.map((n) => (
              <Paper key={n.name} variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography fontWeight="600" fontSize="1.05rem">{n.name}</Typography>
                  <Chip
                    label={n.gender}
                    size="small"
                    color={n.gender === 'boy' ? 'primary' : n.gender === 'girl' ? 'secondary' : 'default'}
                    variant="outlined"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">{n.meaning}</Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const BabyNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Baby Name Generator — Find Baby Name Ideas</Typography>
      <Typography variant="body1">
        Discover the perfect baby name from our curated list of Indian and Western names. Filter by
        gender, cultural origin, and starting letter to find names with beautiful meanings.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Choose a gender (Boy, Girl, or All), select an origin (Indian, Western, or Both), and optionally
        type a starting letter. Click &quot;Generate Names&quot; to see 20 random suggestions, each with its
        meaning and gender tag.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Selecting &quot;Girl&quot; + &quot;Indian&quot; might return names like Aadhya (&quot;First, beginning&quot;),
        Diya (&quot;Light, lamp&quot;), and Saanvi (&quot;Goddess Lakshmi&quot;).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding baby name ideas for expecting parents exploring Indian or Western options.</li>
          <li>Discovering names with specific starting letters or cultural roots.</li>
          <li>Looking up the meaning behind names you&apos;ve heard but aren&apos;t sure about.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these names researched?</Typography>
      <Typography variant="body1">
        Names and meanings are sourced from popular baby name resources. Meanings are general English
        translations and may vary across cultures and languages.
      </Typography>
      <Typography variant="h3">Can I generate unlimited names?</Typography>
      <Typography variant="body1">
        Yes — each click produces a fresh random selection from the pool of 50 names matching your filters.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/baby-name-generator" content={content}>
      <BabyNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BabyNameGenerator;
