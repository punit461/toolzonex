'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Chip } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function clean(s: string): string {
  return s.trim().replace(/\s+/g, '');
}

function capitalize(s: string): string {
  if (!s) return s;
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

function generateNicknames(rawA: string, rawB: string): { label: string; value: string }[] {
  const a = clean(rawA);
  const b = clean(rawB);
  if (!a || !b) return [];

  const halfA1 = a.slice(0, Math.ceil(a.length / 2));
  const halfA2 = a.slice(Math.ceil(a.length / 2));
  const halfB1 = b.slice(0, Math.ceil(b.length / 2));
  const halfB2 = b.slice(Math.ceil(b.length / 2));

  const combos: { label: string; value: string }[] = [];

  combos.push({ label: 'First half of Name 1 + second half of Name 2', value: capitalize(halfA1 + halfB2.toLowerCase()) });
  combos.push({ label: 'First half of Name 2 + second half of Name 1', value: capitalize(halfB1 + halfA2.toLowerCase()) });
  combos.push({ label: 'First 3 letters of each name', value: capitalize(a.slice(0, 3) + b.slice(0, 3).toLowerCase()) });

  let alternating = '';
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    if (a[i]) alternating += a[i];
    if (b[i]) alternating += b[i];
  }
  combos.push({ label: 'Letters alternating between both names', value: capitalize(alternating.toLowerCase()) });

  combos.push({ label: 'Name 1 whole + Name 2 shortened', value: capitalize(a) + capitalize(b).slice(0, 3).toLowerCase() });
  combos.push({ label: 'Name 2 whole + Name 1 shortened', value: capitalize(b) + capitalize(a).slice(0, 3).toLowerCase() });

  const seen = new Set<string>();
  return combos.filter((c) => {
    const key = c.value.toLowerCase();
    if (!c.value || seen.has(key) || key === a.toLowerCase() || key === b.toLowerCase()) return false;
    seen.add(key);
    return true;
  });
}

const NicknameCombinerContent = () => {
  const [nameA, setNameA] = useState('Jessica');
  const [nameB, setNameB] = useState('Michael');

  const combos = useMemo(() => generateNicknames(nameA, nameB), [nameA, nameB]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 700, mx: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField label="First Name" value={nameA} onChange={(e) => setNameA(e.target.value)} fullWidth />
        <TextField label="Second Name" value={nameB} onChange={(e) => setNameB(e.target.value)} fullWidth />
      </Box>

      <Paper variant="outlined" sx={{ p: 3 }}>
        {combos.length === 0 ? (
          <Typography color="text.secondary">Enter both names to generate nickname combinations.</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {combos.map((c) => (
              <Box key={c.value} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">{c.label}</Typography>
                <Chip label={c.value} color="primary" variant="outlined" sx={{ fontSize: '1rem', py: 2 }} />
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

const NicknameCombiner = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Nickname Combiner</Typography>
      <Typography variant="body1">
        Enter two names — for a couple, a pair of friends, pets, or anything else — and the tool blends them
        into several portmanteau-style nickname options using a few genuinely different blending strategies:
        splitting each name in half and swapping the halves (in both directions), taking the first three
        letters of each, alternating letters between both names, and combining one full name with a shortened
        version of the other. Every unique result is shown side by side so you can pick your favorite.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Combining &quot;Jessica&quot; and &quot;Michael&quot; produces options like &quot;Jesael&quot; (first
        half of Jessica + second half of Michael), &quot;Michssica&quot;-style blends, and an alternating-letter
        version — several distinct nickname styles generated from the same two names.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Creating a fun couple nickname to share on social media.</li>
          <li>Naming a joint pet, project, or small business run by two people.</li>
          <li>Coming up with a fan-fiction &quot;ship name&quot; for a favorite pairing.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Are the nicknames randomly generated?</strong> No — every option comes from a fixed, rule-based blending strategy (like swapping name halves or alternating letters), so the same two names always produce the same set of results.</li>
          <li><strong>Does the order I enter the names matter?</strong> Yes, slightly — since several blends combine the beginning of one name with the ending of the other, swapping the input order changes which specific combinations appear, though the overall style of results stays similar.</li>
          <li><strong>Why do some blending strategies not appear in the results?</strong> Duplicate or identical-to-the-original results are automatically filtered out, so very short names may produce fewer than six unique combinations.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/nickname-combiner" content={content}>
      <NicknameCombinerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NicknameCombiner;
