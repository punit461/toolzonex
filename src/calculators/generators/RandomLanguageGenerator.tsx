'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Language {
  name: string;
  region: string;
  speakers: string;
}

const LANGUAGES: Language[] = [
  { name: 'Mandarin Chinese', region: 'China, Taiwan, Singapore', speakers: '~1.1 billion' },
  { name: 'Spanish', region: 'Spain, Latin America', speakers: '~560 million' },
  { name: 'English', region: 'UK, USA, Australia, and worldwide', speakers: '~1.5 billion' },
  { name: 'Hindi', region: 'India', speakers: '~600 million' },
  { name: 'Bengali', region: 'Bangladesh, India', speakers: '~270 million' },
  { name: 'Portuguese', region: 'Portugal, Brazil', speakers: '~260 million' },
  { name: 'Russian', region: 'Russia, Eastern Europe, Central Asia', speakers: '~255 million' },
  { name: 'Japanese', region: 'Japan', speakers: '~125 million' },
  { name: 'Western Punjabi', region: 'Pakistan', speakers: '~90 million' },
  { name: 'Marathi', region: 'India', speakers: '~85 million' },
  { name: 'Telugu', region: 'India', speakers: '~95 million' },
  { name: 'Turkish', region: 'Turkey', speakers: '~90 million' },
  { name: 'Korean', region: 'South Korea, North Korea', speakers: '~80 million' },
  { name: 'French', region: 'France, West Africa, Canada', speakers: '~310 million' },
  { name: 'German', region: 'Germany, Austria, Switzerland', speakers: '~135 million' },
  { name: 'Vietnamese', region: 'Vietnam', speakers: '~86 million' },
  { name: 'Tamil', region: 'India, Sri Lanka, Singapore', speakers: '~85 million' },
  { name: 'Urdu', region: 'Pakistan, India', speakers: '~230 million' },
  { name: 'Javanese', region: 'Indonesia', speakers: '~82 million' },
  { name: 'Italian', region: 'Italy, Switzerland', speakers: '~68 million' },
  { name: 'Persian (Farsi)', region: 'Iran, Afghanistan, Tajikistan', speakers: '~130 million' },
  { name: 'Gujarati', region: 'India', speakers: '~60 million' },
  { name: 'Polish', region: 'Poland', speakers: '~45 million' },
  { name: 'Ukrainian', region: 'Ukraine', speakers: '~35 million' },
  { name: 'Malayalam', region: 'India', speakers: '~38 million' },
  { name: 'Kannada', region: 'India', speakers: '~44 million' },
  { name: 'Odia', region: 'India', speakers: '~38 million' },
  { name: 'Burmese', region: 'Myanmar', speakers: '~33 million' },
  { name: 'Thai', region: 'Thailand', speakers: '~60 million' },
  { name: 'Amharic', region: 'Ethiopia', speakers: '~57 million' },
  { name: 'Yoruba', region: 'Nigeria, Benin', speakers: '~45 million' },
  { name: 'Igbo', region: 'Nigeria', speakers: '~30 million' },
  { name: 'Hausa', region: 'Nigeria, Niger', speakers: '~70 million' },
  { name: 'Swahili', region: 'East Africa', speakers: '~200 million' },
  { name: 'Zulu', region: 'South Africa', speakers: '~27 million' },
  { name: 'Dutch', region: 'Netherlands, Belgium', speakers: '~24 million' },
  { name: 'Greek', region: 'Greece, Cyprus', speakers: '~13 million' },
  { name: 'Czech', region: 'Czech Republic', speakers: '~10 million' },
  { name: 'Hungarian', region: 'Hungary', speakers: '~13 million' },
  { name: 'Swedish', region: 'Sweden, Finland', speakers: '~10 million' },
  { name: 'Finnish', region: 'Finland', speakers: '~5.4 million' },
  { name: 'Hebrew', region: 'Israel', speakers: '~9 million' },
  { name: 'Arabic', region: 'Middle East, North Africa', speakers: '~370 million' },
  { name: 'Indonesian', region: 'Indonesia', speakers: '~200 million' },
  { name: 'Malay', region: 'Malaysia, Brunei, Singapore', speakers: '~80 million' },
  { name: 'Tagalog (Filipino)', region: 'Philippines', speakers: '~82 million' },
  { name: 'Romanian', region: 'Romania, Moldova', speakers: '~24 million' },
  { name: 'Nepali', region: 'Nepal', speakers: '~16 million' },
  { name: 'Sinhala', region: 'Sri Lanka', speakers: '~17 million' },
  { name: 'Icelandic', region: 'Iceland', speakers: '~0.36 million' },
  { name: 'Mongolian', region: 'Mongolia', speakers: '~5.7 million' },
];

const RandomLanguageGeneratorContent = () => {
  const [language, setLanguage] = useState<Language | null>(null);

  const generate = () => {
    setLanguage(LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        Generate Random Language
      </Button>

      {language && (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', maxWidth: 480 }}>
          <Typography variant="h4" fontWeight={700}>{language.name}</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Spoken in: {language.region}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Approximate speakers: {language.speakers}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

const RandomLanguageGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Language Generator Works</Typography>
      <Typography variant="body1">
        Click &quot;Generate Random Language&quot; to get a random world language, along with the country or
        region it&apos;s primarily spoken in and an approximate number of speakers as a fun fact.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A click might generate &quot;Swahili&quot; — spoken across East Africa by roughly 200 million people —
        or &quot;Icelandic,&quot; spoken by a much smaller community of around 360,000 people in Iceland.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Picking a new language to start learning on a whim.</li>
          <li>Sparking classroom discussion about world languages and linguistic diversity.</li>
          <li>Adding a random language prompt to a trivia night or icebreaker game.</li>
          <li>Getting inspiration for travel destinations tied to a language you&apos;ve never studied.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How many languages can this generate?</Typography>
      <Typography variant="body1">
        The tool draws from a curated list of around 50 widely spoken world languages, spanning every inhabited
        continent.
      </Typography>
      <Typography variant="h3">Are the speaker counts exact?</Typography>
      <Typography variant="body1">
        No — speaker counts for world languages vary between sources and are constantly shifting, so the
        figures shown are rounded approximations meant as a fun fact rather than a precise, up-to-the-minute
        statistic.
      </Typography>
      <Typography variant="h3">Can I get the same language twice in a row?</Typography>
      <Typography variant="body1">
        Yes — each click picks independently from the full list, so repeats are possible.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-language-generator" content={content}>
      <RandomLanguageGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomLanguageGenerator;
