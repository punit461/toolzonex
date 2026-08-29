'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Country {
  name: string;
  flag: string;
  continent: string;
}

const COUNTRIES: Country[] = [
  { name: 'United States', flag: '🇺🇸', continent: 'North America' },
  { name: 'Canada', flag: '🇨🇦', continent: 'North America' },
  { name: 'Mexico', flag: '🇲🇽', continent: 'North America' },
  { name: 'Brazil', flag: '🇧🇷', continent: 'South America' },
  { name: 'Argentina', flag: '🇦🇷', continent: 'South America' },
  { name: 'Chile', flag: '🇨🇱', continent: 'South America' },
  { name: 'Peru', flag: '🇵🇪', continent: 'South America' },
  { name: 'Colombia', flag: '🇨🇴', continent: 'South America' },
  { name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
  { name: 'France', flag: '🇫🇷', continent: 'Europe' },
  { name: 'Germany', flag: '🇩🇪', continent: 'Europe' },
  { name: 'Italy', flag: '🇮🇹', continent: 'Europe' },
  { name: 'Spain', flag: '🇪🇸', continent: 'Europe' },
  { name: 'Portugal', flag: '🇵🇹', continent: 'Europe' },
  { name: 'Netherlands', flag: '🇳🇱', continent: 'Europe' },
  { name: 'Sweden', flag: '🇸🇪', continent: 'Europe' },
  { name: 'Norway', flag: '🇳🇴', continent: 'Europe' },
  { name: 'Poland', flag: '🇵🇱', continent: 'Europe' },
  { name: 'Greece', flag: '🇬🇷', continent: 'Europe' },
  { name: 'Switzerland', flag: '🇨🇭', continent: 'Europe' },
  { name: 'Ireland', flag: '🇮🇪', continent: 'Europe' },
  { name: 'Egypt', flag: '🇪🇬', continent: 'Africa' },
  { name: 'Nigeria', flag: '🇳🇬', continent: 'Africa' },
  { name: 'South Africa', flag: '🇿🇦', continent: 'Africa' },
  { name: 'Kenya', flag: '🇰🇪', continent: 'Africa' },
  { name: 'Morocco', flag: '🇲🇦', continent: 'Africa' },
  { name: 'Ghana', flag: '🇬🇭', continent: 'Africa' },
  { name: 'China', flag: '🇨🇳', continent: 'Asia' },
  { name: 'Japan', flag: '🇯🇵', continent: 'Asia' },
  { name: 'India', flag: '🇮🇳', continent: 'Asia' },
  { name: 'South Korea', flag: '🇰🇷', continent: 'Asia' },
  { name: 'Thailand', flag: '🇹🇭', continent: 'Asia' },
  { name: 'Vietnam', flag: '🇻🇳', continent: 'Asia' },
  { name: 'Indonesia', flag: '🇮🇩', continent: 'Asia' },
  { name: 'Turkey', flag: '🇹🇷', continent: 'Asia' },
  { name: 'Saudi Arabia', flag: '🇸🇦', continent: 'Asia' },
  { name: 'United Arab Emirates', flag: '🇦🇪', continent: 'Asia' },
  { name: 'Israel', flag: '🇮🇱', continent: 'Asia' },
  { name: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
  { name: 'New Zealand', flag: '🇳🇿', continent: 'Oceania' },
  { name: 'Fiji', flag: '🇫🇯', continent: 'Oceania' },
];

const RandomCountryGeneratorContent = () => {
  const [country, setCountry] = useState<Country | null>(null);

  const generate = () => {
    const pick = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
    setCountry(pick);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<PublicIcon />} onClick={generate}>
        Generate Random Country
      </Button>

      {country && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', minWidth: 260 }}>
          <Typography sx={{ fontSize: '3.5rem', lineHeight: 1 }}>{country.flag}</Typography>
          <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>{country.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{country.continent}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const RandomCountryGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Country Generator Works</Typography>
      <Typography variant="body1">
        This tool picks a random country from a curated list spanning every continent, and shows its flag
        emoji and continent alongside the name. Click the button to get a new random country any time.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Click &quot;Generate Random Country.&quot;</li>
          <li>A country name, flag, and continent appear.</li>
          <li>Click again for a fresh random pick — repeats can occur since each pick is independent.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Clicking generate might return &quot;🇧🇷 Brazil — South America&quot; one time and
        &quot;🇯🇵 Japan — Asia&quot; the next.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking a random country for a geography quiz, trivia night, or classroom game.</li>
          <li>Choosing a random destination idea for travel-planning inspiration.</li>
          <li>Randomly assigning countries for a school project, model UN, or icebreaker activity.</li>
          <li>Sparking ideas for creative writing, world-building, or random-fact games.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many countries are included?</Typography>
      <Typography variant="body1">
        The generator draws from a curated list of well-known countries spanning all six populated continents,
        rather than the full list of every country and territory in the world.
      </Typography>
      <Typography variant="h3">Can the same country come up twice in a row?</Typography>
      <Typography variant="body1">
        Yes — each generation is an independent random pick, so repeats are possible, just like rolling the
        same number twice on a die.
      </Typography>
      <Typography variant="h3">Does it show the continent?</Typography>
      <Typography variant="body1">
        Yes — every result includes the country&apos;s flag emoji and its continent alongside the name.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-country-generator" content={content}>
      <RandomCountryGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomCountryGenerator;
