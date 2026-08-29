'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, TextField, Checkbox, FormControlLabel } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ADJECTIVES = [
  'Swift', 'Silent', 'Brave', 'Clever', 'Mighty', 'Cosmic', 'Golden', 'Frozen',
  'Wild', 'Fuzzy', 'Electric', 'Lucky', 'Sneaky', 'Radiant', 'Rusty', 'Jolly',
  'Nimble', 'Fierce', 'Bright', 'Shadow', 'Crimson', 'Rapid', 'Quiet', 'Bold',
];

const NOUNS = [
  'Falcon', 'Tiger', 'Panda', 'Wizard', 'Ninja', 'Comet', 'Dragon', 'Otter',
  'Phoenix', 'Wolf', 'Rocket', 'Pirate', 'Knight', 'Raven', 'Fox', 'Panther',
  'Yeti', 'Cobra', 'Griffin', 'Hawk', 'Nomad', 'Ranger', 'Viper', 'Badger',
];

function generateUsername(includeNumber: boolean): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const number = includeNumber ? Math.floor(Math.random() * 900) + 100 : '';
  return `${adjective}${noun}${number}`;
}

const RandomUsernameGeneratorContent = () => {
  const [includeNumber, setIncludeNumber] = useState(true);
  const [count, setCount] = useState(5);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generate = () => {
    const n = Math.min(Math.max(Math.round(count) || 1, 1), 20);
    setUsernames(Array.from({ length: n }, () => generateUsername(includeNumber)));
  };

  const copy = async (name: string, index: number) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch {
      // clipboard unavailable; silently ignore
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <TextField
          label="How many"
          type="number"
          size="small"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          inputProps={{ min: 1, max: 20 }}
          sx={{ width: 140 }}
        />
        <FormControlLabel
          control={<Checkbox checked={includeNumber} onChange={(e) => setIncludeNumber(e.target.checked)} />}
          label="Include a number"
        />
        <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
          Generate
        </Button>
      </Box>

      {usernames.length === 0 ? (
        <Typography color="text.secondary">Click &quot;Generate&quot; to create random usernames.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {usernames.map((name, i) => (
            <Paper key={i} variant="outlined" sx={{ p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontFamily: 'monospace', fontSize: '1.05rem' }}>{name}</Typography>
              <Button size="small" startIcon={<ContentCopyIcon fontSize="small" />} onClick={() => copy(name, i)}>
                {copiedIndex === i ? 'Copied' : 'Copy'}
              </Button>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

const RandomUsernameGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Username Generator Works</Typography>
      <Typography variant="body1">
        This tool combines a random adjective and a random noun from curated word lists, optionally adding a
        random number, to produce a unique-sounding username. Generate as many at once as you like and copy
        the one you want.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Set how many usernames to generate at once.</li>
          <li>Toggle &quot;Include a number&quot; on or off depending on your preference.</li>
          <li>Click &quot;Generate&quot; and copy any username you like with one click.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A generated username might look like &quot;SwiftFalcon482&quot; or, with numbers turned off,
        just &quot;SilentPanda.&quot;
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Coming up with a username for a new game, forum, or social media account.</li>
          <li>Generating placeholder usernames for testing a signup form or app.</li>
          <li>Finding inspiration when your first-choice username is already taken.</li>
          <li>Creating anonymous or fun display names for a group chat or online event.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the Username Generator?</Typography>
      <Typography variant="body1">
        The Username Generator builds variations around a keyword you type in. This Random Username Generator
        needs no input at all — just click and get a fully random adjective-noun combination, ideal when you
        want a quick suggestion without typing anything first.
      </Typography>
      <Typography variant="h3">Are these usernames guaranteed to be available?</Typography>
      <Typography variant="body1">
        No — this tool only generates a random combination of words and numbers; it doesn&apos;t check
        availability on any specific platform. You&apos;ll still need to check the site or app where you plan
        to use the username.
      </Typography>
      <Typography variant="h3">Can I generate more than one at a time?</Typography>
      <Typography variant="body1">
        Yes — set the &quot;How many&quot; field to any number up to 20 to get a batch of options in one click.
      </Typography>
      <Typography variant="h3">Why include a number?</Typography>
      <Typography variant="body1">
        Adding a random number makes the username more likely to be unique and available, since plain
        adjective-noun combinations are more likely to already be taken on popular platforms.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-username-generator" content={content}>
      <RandomUsernameGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomUsernameGenerator;
