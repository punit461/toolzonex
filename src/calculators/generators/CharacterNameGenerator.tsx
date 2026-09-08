'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Style = 'fantasy' | 'scifi' | 'modern' | 'historical';
type Gender = 'masculine' | 'feminine' | 'neutral';

interface NameBank {
  masculine: string[];
  feminine: string[];
  neutral: string[];
  last: string[];
}

const NAMES: Record<Style, NameBank> = {
  fantasy: {
    masculine: ['Thoren', 'Aldric', 'Baelor', 'Cedric', 'Doran', 'Eldrin', 'Fenwick', 'Garrick', 'Haldor', 'Ivorin'],
    feminine: ['Elara', 'Isolde', 'Maren', 'Sable', 'Thessaly', 'Ysolde', 'Briala', 'Corvina', 'Daenwyn', 'Faelynn'],
    neutral: ['Ashen', 'Corvid', 'Larke', 'Rowe', 'Sylvane', 'Vesper', 'Wrenna', 'Quillon', 'Brynn', 'Sael'],
    last: ['Blackwood', 'Stormrender', 'Ashvale', 'Nightshade', 'Ironvale', 'Duskmere', 'Silverbrook', 'Thornfield', 'Dragorn', 'Whisperwind'],
  },
  scifi: {
    masculine: ['Kade', 'Zephyr', 'Orion', 'Cassius', 'Dex', 'Ryken', 'Talon', 'Vance', 'Axel', 'Jaxon'],
    feminine: ['Nova', 'Lyra', 'Zara', 'Vega', 'Selene', 'Kira', 'Astra', 'Rhea', 'Sable', 'Zoya'],
    neutral: ['Echo', 'Onyx', 'Cipher', 'Vale', 'Nyx', 'Rune', 'Sky', 'Atlas', 'Kai', 'Riven'],
    last: ['Voss', 'Kestrel', 'Vantis', 'Nexar', 'Corvax', 'Halsten', 'Zephyrin', 'Draken', 'Oriel', 'Stryder'],
  },
  modern: {
    masculine: ['James', 'Michael', 'Daniel', 'Ethan', 'Marcus', 'Ryan', 'Noah', 'Lucas', 'Adam', 'Tyler'],
    feminine: ['Emma', 'Olivia', 'Sophia', 'Ava', 'Grace', 'Chloe', 'Mia', 'Hannah', 'Zoe', 'Layla'],
    neutral: ['Jordan', 'Riley', 'Casey', 'Morgan', 'Taylor', 'Avery', 'Skyler', 'Reese', 'Quinn', 'Dakota'],
    last: ['Carter', 'Bennett', 'Foster', 'Hayes', 'Mitchell', 'Reynolds', 'Coleman', 'Price', 'Sanders', 'Ward'],
  },
  historical: {
    masculine: ['Edmund', 'Alaric', 'Cornelius', 'Frederick', 'Percival', 'Bartholomew', 'Reginald', 'Nathaniel', 'Augustus', 'Leopold'],
    feminine: ['Eleanora', 'Beatrix', 'Josephine', 'Wilhelmina', 'Constance', 'Adelaide', 'Vivienne', 'Rosalind', 'Genevieve', 'Theodora'],
    neutral: ['Harlow', 'Ashby', 'Percy', 'Winslow', 'Marlowe', 'Sterling', 'Ellison', 'Grey', 'Rutherford', 'Wren'],
    last: ['Ashworth', 'Blackstone', 'Pemberton', 'Whitfield', 'Fairweather', 'Kingsley', 'Hartwell', 'Sinclair', 'Wexford', 'Montgomery'],
  },
};

const STYLE_LABELS: Record<Style, string> = { fantasy: 'Fantasy', scifi: 'Sci-Fi', modern: 'Modern', historical: 'Historical' };

const CharacterNameGeneratorContent = () => {
  const [style, setStyle] = useState<Style>('fantasy');
  const [gender, setGender] = useState<Gender>('neutral');
  const [name, setName] = useState<string | null>(null);

  const changeStyle = (_: unknown, value: Style | null) => {
    if (!value) return;
    setStyle(value);
  };
  const changeGender = (_: unknown, value: Gender | null) => {
    if (!value) return;
    setGender(value);
  };

  const generate = () => {
    const bank = NAMES[style];
    const firstList = bank[gender];
    const first = firstList[Math.floor(Math.random() * firstList.length)];
    const last = bank.last[Math.floor(Math.random() * bank.last.length)];
    setName(`${first} ${last}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <ToggleButtonGroup value={style} exclusive onChange={changeStyle} color="primary">
        <ToggleButton value="fantasy">Fantasy</ToggleButton>
        <ToggleButton value="scifi">Sci-Fi</ToggleButton>
        <ToggleButton value="modern">Modern</ToggleButton>
        <ToggleButton value="historical">Historical</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup value={gender} exclusive onChange={changeGender} color="primary" size="small">
        <ToggleButton value="masculine">Masculine</ToggleButton>
        <ToggleButton value="feminine">Feminine</ToggleButton>
        <ToggleButton value="neutral">Neutral</ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" size="large" startIcon={<BadgeIcon />} onClick={generate}>
        {name ? 'Regenerate' : 'Generate Name'}
      </Button>

      {name && (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white', width: '100%', maxWidth: 420 }}>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>{STYLE_LABELS[style]} Character</Typography>
          <Typography variant="h4" fontWeight={800}>{name}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const CharacterNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Character Name Generator</Typography>
      <Typography variant="body1">
        Choose a style — Fantasy, Sci-Fi, Modern, or Historical — and a gender lean for the first name —
        Masculine, Feminine, or Neutral. Click &quot;Generate Name&quot; and the tool combines a random
        first name from that style and gender&apos;s word list with a random last name from the same
        style&apos;s surname list, producing a full character name. Click &quot;Regenerate&quot; for a new
        combination any time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing Fantasy and Feminine might generate &quot;Elara Nightshade&quot; — a first name drawn from
        the fantasy feminine list paired with a last name from the fantasy surname list.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming characters for a novel, short story, or screenplay in progress.</li>
          <li>Finding a name for a tabletop RPG or video game character.</li>
          <li>Quickly generating placeholder names for a story outline or worldbuilding document.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does the last name change based on the gender toggle?</strong> No — the gender toggle only affects which first-name list is used; last names are drawn from one shared surname list for each style, regardless of gender.</li>
          <li><strong>Can I mix styles, like a fantasy first name with a modern last name?</strong> Not directly — each generation uses one selected style for both the first and last name, keeping the combination thematically consistent. You can generate a few names in different styles and manually combine parts if you want a mixed result.</li>
          <li><strong>Can I get the same name twice?</strong> Yes — each click is an independent random pick from the lists, so repeats are possible, especially with a lot of clicking.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/character-name-generator" content={content}>
      <CharacterNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CharacterNameGenerator;
