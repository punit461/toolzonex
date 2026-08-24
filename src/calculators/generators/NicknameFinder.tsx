'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Chip, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const NICKNAME_DICTIONARY: Record<string, string[]> = {
  william: ['Will', 'Bill', 'Billy', 'Liam'],
  robert: ['Rob', 'Bob', 'Bobby', 'Robbie'],
  richard: ['Rick', 'Ricky', 'Richie'],
  elizabeth: ['Liz', 'Beth', 'Eliza', 'Lizzy', 'Betty'],
  michael: ['Mike', 'Mikey', 'Mick'],
  jennifer: ['Jen', 'Jenny'],
  christopher: ['Chris', 'Topher', 'Kit'],
  katherine: ['Kate', 'Katie', 'Kat'],
  catherine: ['Cate', 'Katie', 'Cat'],
  alexander: ['Alex', 'Xander', 'Al', 'Sasha'],
  alexandra: ['Alex', 'Sasha', 'Lexi'],
  benjamin: ['Ben', 'Benny', 'Benji'],
  samantha: ['Sam', 'Sammy'],
  samuel: ['Sam', 'Sammy'],
  nicholas: ['Nick', 'Nicky'],
  jessica: ['Jess', 'Jessie'],
  daniel: ['Dan', 'Danny'],
  patricia: ['Pat', 'Patty', 'Trish'],
  anthony: ['Tony'],
  margaret: ['Maggie', 'Meg', 'Peggy', 'Marge'],
  jonathan: ['Jon', 'Johnny'],
  matthew: ['Matt', 'Matty'],
  andrew: ['Andy', 'Drew'],
  joseph: ['Joe', 'Joey'],
  thomas: ['Tom', 'Tommy'],
  charles: ['Charlie', 'Chuck'],
  edward: ['Ed', 'Eddie', 'Ted'],
  victoria: ['Vicky', 'Tori'],
  isabella: ['Bella', 'Izzy'],
  gabriel: ['Gabe'],
  natasha: ['Tasha', 'Nat'],
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function generateNicknames(rawName: string): string[] {
  const first = rawName.trim().split(/\s+/)[0] || '';
  if (!first) return [];
  const base = capitalize(first);
  const key = base.toLowerCase();

  const seen = new Set<string>([key]);
  const results: string[] = [];
  const add = (s: string) => {
    const k = s.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      results.push(s);
    }
  };

  (NICKNAME_DICTIONARY[key] || []).forEach(add);

  const vowels = 'aeiou';
  const lastChar = base.slice(-1).toLowerCase();

  if (base.length > 4) add(base.slice(0, 4));
  if (base.length > 3) add(base.slice(0, 3) + 'y');
  if (base.length > 2) add(base.slice(0, 3));
  add(base + 'y');
  add(base + 'ie');
  add(base + 'ster');
  add(base + 'o');
  add(base + 'kins');
  if (!vowels.includes(lastChar)) add(base + lastChar + 'y');
  add(base.slice(0, 2) + 'zy');
  add('Lil ' + base);

  return results.slice(0, 10);
}

const NicknameFinderContent = () => {
  const [name, setName] = useState('');
  const [nicknames, setNicknames] = useState<string[] | null>(null);

  const findNicknames = () => {
    if (!name.trim()) return;
    setNicknames(generateNicknames(name));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 560, mx: 'auto' }}>
      <TextField
        label="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Alexander"
        fullWidth
      />
      <Button variant="contained" size="large" onClick={findNicknames} disabled={!name.trim()}>
        Find Nicknames
      </Button>

      {nicknames && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {nicknames.length === 0 ? (
            <Typography color="text.secondary">Enter a valid name to generate nicknames.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
              {nicknames.map((n) => (
                <Chip key={n} label={n} color="primary" variant="outlined" sx={{ fontSize: '1rem', py: 2.5 }} />
              ))}
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

const NicknameFinder = () => {
  const content = (
    <>
      <Typography variant="h2">Free Nickname Finder — Nickname Generator</Typography>
      <Typography variant="body1">
        Type in a name and get 8-10 nickname suggestions, drawing from common English diminutives plus
        rule-based patterns like shortenings, "-y" and "-ster" suffixes, and cute variations.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Enter a first name and click "Find Nicknames." The tool first checks a curated list of well-known
        nicknames for that name (like Robert → Bob, Rob, Bobby), then fills in the rest using common
        transformation rules such as shortening the name or adding a playful suffix.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Entering "William" returns well-known nicknames like Will, Bill, Billy, and Liam, alongside
        rule-generated options like Willy and Willster.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a nickname for a new baby, pet, or friend.</li>
          <li>Coming up with a username or gamer tag based on your real name.</li>
          <li>Getting inspiration for a fun alternative to your own name.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are these nicknames generated by AI?</Typography>
      <Typography variant="body1">
        No — this is a rule-based generator. It combines a curated dictionary of common English nicknames
        with fixed transformation patterns (shortening, common suffixes, etc.), so the same name always
        produces the same suggestions.
      </Typography>
      <Typography variant="h3">Why do some names get more "real" nicknames than others?</Typography>
      <Typography variant="body1">
        Well-known names like William or Elizabeth have long-established traditional nicknames included in
        our dictionary. For names not in that list, the tool relies entirely on generic pattern-based rules,
        which can feel more playful than traditional.
      </Typography>
      <Typography variant="h3">Does it work for names in other languages?</Typography>
      <Typography variant="body1">
        The dictionary is focused on common English names, but the rule-based patterns (shortening, adding
        "-y" or "-ster", etc.) will still generate suggestions for most names using the Latin alphabet.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/nickname-finder" content={content}>
      <NicknameFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NicknameFinder;
