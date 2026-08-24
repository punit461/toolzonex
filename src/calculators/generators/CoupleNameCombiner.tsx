'use client';

import { useState } from 'react';
import { Box, Button, Typography, TextField, Paper, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function firstHalf(s: string): string {
  return s.slice(0, Math.ceil(s.length / 2));
}

function secondHalf(s: string): string {
  return s.slice(Math.ceil(s.length / 2));
}

function combineNames(rawA: string, rawB: string): string[] {
  const a = capitalize(rawA.trim());
  const b = capitalize(rawB.trim());
  if (!a || !b) return [];

  const combos: string[] = [];
  combos.push(firstHalf(a) + secondHalf(b).toLowerCase());
  combos.push(firstHalf(b) + secondHalf(a).toLowerCase());
  combos.push(a.slice(0, 3) + b.slice(0, 3).toLowerCase());
  combos.push(a + b.toLowerCase());
  combos.push(b + a.toLowerCase());

  let alternating = '';
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    if (a[i]) alternating += a[i];
    if (b[i]) alternating += b[i];
  }
  combos.push(capitalize(alternating.toLowerCase()));

  const seen = new Set<string>();
  return combos.filter((c) => {
    const key = c.toLowerCase();
    if (seen.has(key) || key === a.toLowerCase() || key === b.toLowerCase()) return false;
    seen.add(key);
    return true;
  });
}

const CoupleNameCombinerContent = () => {
  const [nameA, setNameA] = useState('');
  const [nameB, setNameB] = useState('');
  const [combos, setCombos] = useState<string[] | null>(null);

  const combine = () => {
    if (!nameA.trim() || !nameB.trim()) return;
    setCombos(combineNames(nameA, nameB));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 560, mx: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField label="First Name" value={nameA} onChange={(e) => setNameA(e.target.value)} fullWidth />
        <TextField label="Second Name" value={nameB} onChange={(e) => setNameB(e.target.value)} fullWidth />
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<FavoriteIcon />}
        onClick={combine}
        disabled={!nameA.trim() || !nameB.trim()}
      >
        Combine Names
      </Button>

      {combos && (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          {combos.length === 0 ? (
            <Typography color="text.secondary">Enter both names to generate combined names.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
              {combos.map((c) => (
                <Chip key={c} label={c} color="error" variant="outlined" sx={{ fontSize: '1rem', py: 2.5 }} />
              ))}
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

const CoupleNameCombiner = () => {
  const content = (
    <>
      <Typography variant="h2">Free Couple Name Combiner — Ship Name Generator</Typography>
      <Typography variant="body1">
        Combine two names into several fun "ship name" suggestions using consistent, rule-based blending
        patterns — perfect for couples, celebrity pairings, or fan-fiction ship names.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Typography variant="body1">
        Enter both names and click "Combine Names." The tool blends them a few different ways — like joining
        the first half of one name with the second half of the other — and lists every unique combination it
        produces.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Combining "Brad" and "Angelina" produces blends like "Brangelina"-style combinations by joining the
        first half of one name with the second half of the other, plus a couple of alternate blends.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a fun couple nickname to share on social media.</li>
          <li>Coming up with a fan-fiction "ship name" for a favorite pairing.</li>
          <li>Naming a joint social media account, blog, or small business run by two people.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Are the combined names random?</Typography>
      <Typography variant="body1">
        No — the combinations are generated using fixed, deterministic rules (like splitting each name in
        half and swapping the halves), so the same two names always produce the same set of suggestions.
      </Typography>
      <Typography variant="h3">Does the order I enter the names matter?</Typography>
      <Typography variant="body1">
        Yes, slightly — since some combinations use the first name's beginning with the second name's ending
        (and vice versa), swapping the input order changes which specific blend appears first, though the
        overall set of suggestions stays similar.
      </Typography>
      <Typography variant="h3">Can I use this for names other than couples?</Typography>
      <Typography variant="body1">
        Yes — it works for combining any two names, whether that's a couple, a pair of friends, two pets, or
        two brands you want to mash together for fun.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/generators/couple-name-combiner" content={content}>
      <CoupleNameCombinerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CoupleNameCombiner;
