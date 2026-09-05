'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface ZodiacAnimal {
  name: string;
  symbol: string;
  traits: string;
}

// 12-year cycle. 2020 is a known Rat year, used as the reference point.
const ANIMALS: ZodiacAnimal[] = [
  { name: 'Rat', symbol: '🐀', traits: 'Quick-witted, resourceful, and adaptable, with a knack for spotting opportunity.' },
  { name: 'Ox', symbol: '🐂', traits: 'Diligent, dependable, and patient, valuing steady, methodical progress.' },
  { name: 'Tiger', symbol: '🐅', traits: 'Bold, confident, and competitive, with natural leadership instincts.' },
  { name: 'Rabbit', symbol: '🐇', traits: 'Gentle, cautious, and diplomatic, preferring harmony over conflict.' },
  { name: 'Dragon', symbol: '🐉', traits: 'Ambitious, energetic, and charismatic, often drawn to bold pursuits.' },
  { name: 'Snake', symbol: '🐍', traits: 'Wise, intuitive, and reserved, often thinking several steps ahead.' },
  { name: 'Horse', symbol: '🐎', traits: 'Energetic, independent, and free-spirited, thriving on movement and change.' },
  { name: 'Goat', symbol: '🐐', traits: 'Creative, gentle, and empathetic, with a calm, artistic sensibility.' },
  { name: 'Monkey', symbol: '🐒', traits: 'Clever, curious, and playful, quick to find inventive solutions.' },
  { name: 'Rooster', symbol: '🐓', traits: 'Observant, hardworking, and confident, with a keen eye for detail.' },
  { name: 'Dog', symbol: '🐕', traits: 'Loyal, honest, and protective, deeply valuing trust and fairness.' },
  { name: 'Pig', symbol: '🐖', traits: 'Warm, generous, and easygoing, known for enjoying life’s comforts.' },
];

const REFERENCE_YEAR = 2020; // 2020 = Rat (index 0)

function getAnimalForYear(year: number): ZodiacAnimal {
  const offset = ((year - REFERENCE_YEAR) % 12 + 12) % 12;
  return ANIMALS[offset];
}

const ChineseZodiacFinderContent = () => {
  const [yearStr, setYearStr] = useState('1995');

  const year = parseInt(yearStr, 10);
  const valid = !isNaN(year) && year > 0 && yearStr.trim().length === 4;

  const animal = useMemo(() => (valid ? getAnimalForYear(year) : null), [year, valid]);

  const nearBoundary = valid; // always show the note near Jan/Feb; simplest to always mention when a year is entered

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <TextField
        label="Birth Year"
        placeholder="e.g. 1995"
        value={yearStr}
        onChange={(e) => setYearStr(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {yearStr.trim() && !valid && (
        <Alert severity="warning" sx={{ mb: 2 }}>Enter a valid 4-digit birth year.</Alert>
      )}

      {animal && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '3rem', mb: 1 }}>{animal.symbol}</Typography>
          <Typography variant="h4" fontWeight={800} color="primary.main" gutterBottom>{animal.name}</Typography>
          <Typography variant="body1" color="text.secondary">{animal.traits}</Typography>
        </Paper>
      )}

      {nearBoundary && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Born in January or early February? The Chinese New Year date shifts each year, so this simple
          calendar-year-based result is an approximation near the year boundary.
        </Alert>
      )}
    </Box>
  );
};

const ChineseZodiacFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Chinese Zodiac Finder</Typography>
      <Typography variant="body1">
        Enter a birth year, and the tool computes the corresponding Chinese zodiac animal from the 12-year cycle:
        Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. The calculation uses{' '}
        <code>(year - 2020) % 12</code>, since 2020 is a well-established Rat year, then wraps the result around
        the 12-animal cycle to find the matching sign along with a short trait description.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Someone born in 1995 gets the Pig, and someone born in 2000 gets the Dragon — both calculated by
        counting forward or backward from 2020 (a known Rat year) around the fixed 12-animal cycle.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding your own or a family member&apos;s Chinese zodiac animal sign.</li>
          <li>Looking up zodiac compatibility or personality traits for Lunar New Year celebrations.</li>
          <li>Quick reference for greeting cards, horoscope content, or cultural trivia.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Zodiac Calculator and Zodiac Sign Finder?</strong> Those tools determine your WESTERN zodiac sign (like Gemini or Leo) from your birth date&apos;s month and day — 12 signs tied to the time of year you were born. The Chinese zodiac is a completely different, unrelated system: a 12-year cycle of animal signs based purely on your birth YEAR, with no connection to month or day at all.</li>
          <li><strong>Why does the tool mention January and February specifically?</strong> The Chinese New Year doesn&apos;t fall on a fixed calendar date — it shifts each year, typically landing between late January and mid-February based on the lunar calendar. Someone born in that window before the actual Chinese New Year date technically belongs to the previous year&apos;s animal sign. This tool uses a simple calendar-year approximation, so results near that boundary may be off by one sign — a fully precise version would need the exact lunar new year date for each specific year.</li>
          <li><strong>Is the 12-year cycle always in the same order?</strong> Yes — the cycle always follows the same fixed sequence (Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig) and simply repeats every 12 years indefinitely in both directions.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/chinese-zodiac-finder" content={content}>
      <ChineseZodiacFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ChineseZodiacFinder;
