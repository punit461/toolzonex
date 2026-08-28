'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, ToggleButton, ToggleButtonGroup, Chip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Race = 'elf' | 'dwarf' | 'human' | 'orc' | 'dragon';

const SYLLABLES: Record<Race, { prefixes: string[]; suffixes: string[] }> = {
  elf: {
    prefixes: ['Ael', 'Tha', 'Lor', 'Ely', 'Fae', 'Aer', 'Syl', 'Ila', 'Oro', 'Myr', 'Cael', 'Riv', 'Era', 'Vae'],
    suffixes: ['indra', 'ion', 'iel', 'ara', 'eth', 'wyn', 'ira', 'adrel', 'ian', 'is', 'ara', 'wen'],
  },
  dwarf: {
    prefixes: ['Thor', 'Dwa', 'Gim', 'Bali', 'Kili', 'Fili', 'Bof', 'Oak', 'Stone', 'Iron', 'Bram', 'Gror', 'Fund'],
    suffixes: ['in', 'win', 'im', 'dur', 'gar', 'an', 'ik', 'da', 'ek', 'un'],
  },
  human: {
    prefixes: ['Al', 'Bre', 'Don', 'Eli', 'Gar', 'Hugo', 'Ivar', 'Jore', 'Karl', 'Lean', 'Merek', 'Nico'],
    suffixes: ['dric', 'nan', 'ald', 'mond', 'an', 'ulf', 'ric', 'bert', 'ias', 'ian'],
  },
  orc: {
    prefixes: ['Grom', 'Thr', 'Mog', 'Gar', 'Zug', 'Bro', 'Krag', 'Ugr', 'Skra', 'Dur', 'Ren'],
    suffixes: ['mash', 'all', 'nar', 'ush', 'orr', 'goth', 'uk', 'ash', 'ul', 'oth'],
  },
  dragon: {
    prefixes: ['Zyth', 'Vexa', 'Sore', 'Kry', 'Py', 'Ashar', 'Vor', 'Tyra', 'Ozo', 'Dra', 'Fen'],
    suffixes: ['arion', 'ara', 'an', 'x', 'thion', 'gon', 'mir', 'nath', 'this', 'ar'],
  },
};

const RACES: { value: Race; label: string }[] = [
  { value: 'elf', label: 'Elf' },
  { value: 'dwarf', label: 'Dwarf' },
  { value: 'human', label: 'Human' },
  { value: 'orc', label: 'Orc' },
  { value: 'dragon', label: 'Dragonborn' },
];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function generateName(race: Race): string {
  const { prefixes, suffixes } = SYLLABLES[race];
  const prefix = pick(prefixes);
  const suffix = pick(suffixes);
  const name = prefix + suffix;
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const FantasyNameGeneratorContent = () => {
  const [race, setRace] = useState<Race>('elf');
  const [names, setNames] = useState<string[]>(() => Array.from({ length: 10 }, () => generateName('elf')));
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generate = () => {
    setNames(Array.from({ length: 10 }, () => generateName(race)));
  };

  const handleCopy = async (text: string, idx: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 720, mx: 'auto' }}>
      <ToggleButtonGroup
        value={race}
        exclusive
        onChange={(_, v) => v && setRace(v)}
        fullWidth
        sx={{ flexWrap: 'wrap' }}
      >
        {RACES.map((r) => (
          <ToggleButton key={r.value} value={r.value}>{r.label}</ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate} fullWidth>
        Generate Names
      </Button>

      {names.length > 0 && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
            {names.map((n, idx) => (
              <Chip
                key={`${n}-${idx}`}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {n}
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleCopy(n, idx); }} sx={{ ml: 0.5, p: 0 }}>
                      <ContentCopyIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                  </Box>
                }
                color={copiedIdx === idx ? 'success' : 'primary'}
                variant="outlined"
                sx={{ fontSize: '0.95rem', py: 2 }}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const FantasyNameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How does it work?</Typography>
      <Typography variant="body1">
        Pick a race — Elf, Dwarf, Human, Orc, or Dragonborn — and click "Generate Names" to produce 10 new names.
        Each race uses its own syllable patterns: elves get flowing vowel-heavy names, dwarves get sturdy
        consonant-heavy ones, orcs get harsh guttural sounds, and dragonborn get grandiose draconic monikers.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Choosing Elf might return flowing names like Aelindra or Thalion, while Orc produces guttural ones like
        Grommash or Thrall, and Dragonborn gives you dragon-flavored names like Zytharion or Vexara.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Naming player characters in tabletop RPGs and D&amp;D campaigns.</li>
          <li>Creating characters for fantasy novels and short stories.</li>
          <li>Finding NPC or party-member names for video games and worldbuilding.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Can I get more than 10 names at once?</Typography>
      <Typography variant="body1">
        Each click produces a fresh batch of 10 names — just click "Generate Names" again to get a brand new set.
      </Typography>
      <Typography variant="h3">Will I get duplicates?</Typography>
      <Typography variant="body1">
        Because combinations are random, occasional repeated syllables are possible, but each name in a batch is
        generated independently from the syllable pools.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/fantasy-name-generator" content={content}>
      <FantasyNameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default FantasyNameGenerator;
