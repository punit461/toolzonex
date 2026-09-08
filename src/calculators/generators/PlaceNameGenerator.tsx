'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Style = 'realistic' | 'fantasy';

const REALISTIC_PREFIXES = ['New', 'Lake', 'North', 'South', 'East', 'West', 'Fort', 'Port', 'Mount', 'Spring', 'Oak', 'Silver', 'Green', 'Stone', 'Cedar'];
const REALISTIC_ROOTS = ['spring', 'wood', 'field', 'haven', 'ford', 'brook', 'ridge', 'dale', 'hollow', 'grove', 'harbor', 'creek', 'meadow', 'glen', 'crest'];
const REALISTIC_SUFFIXES = ['ville', 'ton', 'burg', 'field', 'port', 'view', 'side', 'town', 'shire', 'haven'];

const FANTASY_PREFIXES = ['El', 'Iron', 'Shadow', 'Storm', 'Drak', 'Sil', 'Val', 'Thal', 'Grim', 'Mor', 'Sun', 'Frost', 'Wyr', 'Bael', 'Nyr'];
const FANTASY_ROOTS = ['dor', 'thas', 'mir', 'gorn', 'vale', 'quill', 'shar', 'wyn', 'drin', 'kal', 'reth', 'lyn', 'orin', 'vash', 'thil'];
const FANTASY_SUFFIXES = ['hold', 'spire', 'reach', 'fell', 'gate', 'watch', 'crown', 'fall', 'moor', 'keep'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRealisticName(): string {
  // Convention: either "Prefix + root" (e.g. "Lakewood") or "Prefix + Suffix" (e.g. "Newton"),
  // chosen randomly for variety, always capitalized as one plausible town/city name.
  const usePrefixRoot = Math.random() < 0.5;
  if (usePrefixRoot) {
    const prefix = pick(REALISTIC_PREFIXES);
    const root = pick(REALISTIC_ROOTS);
    return `${prefix} ${root.charAt(0).toUpperCase() + root.slice(1)}`;
  }
  const root = pick(REALISTIC_ROOTS);
  const suffix = pick(REALISTIC_SUFFIXES);
  return `${root.charAt(0).toUpperCase() + root.slice(1)}${suffix}`;
}

function generateFantasyName(): string {
  // Convention: "Prefix + root + suffix" combined into one evocative fantasy word,
  // e.g. "El" + "dor" + "hold" -> "Eldorhold".
  const prefix = pick(FANTASY_PREFIXES);
  const root = pick(FANTASY_ROOTS);
  const suffix = pick(FANTASY_SUFFIXES);
  const cleanPrefix = prefix.replace(/-$/, '');
  return `${cleanPrefix}${root}${suffix}`;
}

const PlaceNameGeneratorContent = () => {
  const [style, setStyle] = useState<Style>('realistic');
  const [name, setName] = useState<string | null>(null);

  const changeStyle = (_: unknown, value: Style | null) => {
    if (!value) return;
    setStyle(value);
  };

  const generate = () => {
    setName(style === 'realistic' ? generateRealisticName() : generateFantasyName());
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <ToggleButtonGroup value={style} exclusive onChange={changeStyle} color="primary">
        <ToggleButton value="realistic">Realistic</ToggleButton>
        <ToggleButton value="fantasy">Fantasy</ToggleButton>
      </ToggleButtonGroup>

      <Button variant="contained" size="large" startIcon={<LocationCityIcon />} onClick={generate}>
        {name ? 'Regenerate' : 'Generate Place Name'}
      </Button>

      {name && (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'primary.main', color: 'white', width: '100%', maxWidth: 420 }}>
          <Typography variant="body2" sx={{ opacity: 0.85 }}>{style === 'realistic' ? 'Realistic' : 'Fantasy'} Place Name</Typography>
          <Typography variant="h4" fontWeight={800}>{name}</Typography>
        </Paper>
      )}
    </Box>
  );
};

const PlaceNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Place Name Generator</Typography>
      <Typography variant="body1">
        Choose a style — Realistic or Fantasy — and click &quot;Generate Place Name&quot;. In Realistic
        mode, the tool combines real-sounding prefixes, roots, and suffixes (like &quot;New&quot;,
        &quot;Lake&quot;, &quot;-ville&quot;, &quot;-ton&quot;, and &quot;-burg&quot;) into a plausible town
        or city name. In Fantasy mode, it combines evocative fantasy syllables and roots (like
        &quot;El-&quot;, &quot;-dor&quot;, &quot;-thas&quot;, &quot;Iron-&quot;, and &quot;-hold&quot;) into
        a fantasy-style place name. Click &quot;Regenerate&quot; for a new combination any time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Realistic mode might generate &quot;Lakewood&quot; or &quot;Springton&quot;, while Fantasy mode
        might generate &quot;Ironthashold&quot; or &quot;Eldorreach&quot; — combinations built from
        different word-part lists for each style.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming towns, cities, or regions for a novel or worldbuilding project.</li>
          <li>Finding location names for a tabletop RPG campaign map.</li>
          <li>Generating placeholder city or town names for mockups, prototypes, or design work.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>What's the difference between Realistic and Fantasy mode?</strong> Realistic mode combines real-world-sounding English place-name parts (like "New", "-ville", "-burg") to produce names that could plausibly be a real town. Fantasy mode combines invented, evocative syllables (like "El-", "-dor", "-hold") to produce names that sound like they belong in an invented fantasy world.</li>
          <li><strong>Can I get the same place name twice?</strong> Yes — each click randomly recombines the word parts, so repeats are possible, though the range of combinations is large.</li>
          <li><strong>Are these real places?</strong> No — every generated name is an invented combination of word parts and isn't checked against real-world place names, so some may coincidentally resemble a real town.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/place-name-generator" content={content}>
      <PlaceNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PlaceNameGenerator;
