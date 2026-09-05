'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function firstLetter(s: string): string {
  const trimmed = s.trim();
  return trimmed ? trimmed[0].toUpperCase() : '';
}

const MonogramGeneratorContent = () => {
  const [first, setFirst] = useState('Sarah');
  const [middle, setMiddle] = useState('Jane');
  const [last, setLast] = useState('Williams');

  const { f, m, l } = useMemo(() => ({
    f: firstLetter(first),
    m: firstLetter(middle),
    l: firstLetter(last),
  }), [first, middle, last]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField label="First Name" value={first} onChange={(e) => setFirst(e.target.value)} fullWidth />
        <TextField label="Middle Name (optional)" value={middle} onChange={(e) => setMiddle(e.target.value)} fullWidth />
        <TextField label="Last Name" value={last} onChange={(e) => setLast(e.target.value)} fullWidth />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Paper variant="outlined" sx={{ p: 5, width: '100%', textAlign: 'center' }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Traditional Monogram (First–Last–Middle)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1.5, fontFamily: 'serif', mt: 2 }}>
            <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, fontFamily: 'inherit' }}>{f || '—'}</Typography>
            <Typography sx={{ fontSize: '4.5rem', fontWeight: 700, fontFamily: 'inherit' }}>{l || '—'}</Typography>
            <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, fontFamily: 'inherit' }}>{m || '—'}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

const MonogramGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Monogram Generator</Typography>
      <Typography variant="body1">
        Enter your first, middle (optional), and last name initials. The tool arranges them in the classic
        individual monogram order — First initial, then Last initial, then Middle initial — with the Last-name
        initial rendered larger and centered between the other two, matching the traditional monogram style
        used on stationery, linens, and engravings.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For &quot;Sarah Jane Williams,&quot; the monogram displays S (first initial, left), a large centered W
        (last initial), and J (middle initial, right) — the traditional S-W-J arrangement rather than a simple
        S-J-W reading order.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Previewing a monogram design before ordering engraved stationery, towels, or luggage.</li>
          <li>Deciding on initial arrangement for a wedding gift or personalized home decor item.</li>
          <li>Checking how a name&apos;s initials look in the traditional larger-center-letter monogram format.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Name Initials Generator?</strong> The Name Initials Generator produces a simple 2-letter avatar-style preview (first and last initial only, same size, in reading order) commonly used for profile pictures. This Monogram Generator instead follows the specific traditional 3-letter monogram convention — First, Last, Middle order with the last-name initial enlarged and centered — a distinct formatting style used for engravings and stationery, not avatars.</li>
          <li><strong>Why is the last-name initial in the middle and larger?</strong> That&apos;s the traditional convention for personal monograms — the surname initial is treated as the most prominent element and placed in the center at a larger size, flanked by the first and middle initials.</li>
          <li><strong>What if I don&apos;t have a middle name?</strong> Leave the middle name field blank — the monogram will show a placeholder dash in that position, or you can substitute a middle initial you use informally.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/monogram-generator" content={content}>
      <MonogramGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MonogramGenerator;
