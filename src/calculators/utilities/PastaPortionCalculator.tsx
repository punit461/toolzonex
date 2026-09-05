'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PORTION_SIZES: Record<string, number> = {
  Appetizer: 2,
  'Main Course': 3.5,
  'Hearty Eater': 5,
};

const PastaPortionCalculator = () => {
  const [people, setPeople] = useState('6');
  const [portion, setPortion] = useState('Main Course');

  const result = useMemo(() => {
    const p = parseFloat(people) || 0;
    const ozPerPerson = PORTION_SIZES[portion];
    const totalOz = p * ozPerPerson;
    return {
      oz: totalOz,
      lbs: totalOz / 16,
      cups: totalOz / 2, // ~2oz dry pasta per cup, a commonly used rough approximation
    };
  }, [people, portion]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Pasta Portion Calculator</Typography>
      <Typography variant="body1">
        Enter your number of guests and pick the context you&apos;re serving pasta in — a light appetizer
        portion, a standard main course, or a heartier serving for big appetites. Each context has a typical
        dry pasta weight per person; multiplying by your guest count gives the total dry pasta to cook.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Dry Pasta = People × Ounces per Person
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 6 people having pasta as a main course at 3.5 oz per person, total dry pasta = 6 × 3.5 = 21 oz, or
        about 1.3 lbs — roughly one standard 16 oz box plus a bit more.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out how many boxes of pasta to buy for a dinner party.</li>
          <li>Scaling a pasta recipe up or down for a different guest count.</li>
          <li>Planning quantities for a potluck or catered event with an appetizer-style pasta course.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why does the portion size vary so much between contexts?</strong> An appetizer portion is meant to be a small taste alongside other courses, while a main course portion needs to be filling on its own — and a &quot;hearty eater&quot; portion accounts for guests who typically eat more than average, such as at a casual gathering.</li>
          <li><strong>Is the cups conversion exact?</strong> No — the ounces-to-cups conversion for dry pasta varies by shape (long noodles like spaghetti measure differently than short shapes like penne or rotini), so the cups figure here is a rough approximation. Weighing dry pasta on a kitchen scale is more accurate than measuring by cup.</li>
          <li><strong>Should I account for sauce-heavy vs. pasta-heavy dishes?</strong> These are general guidelines assuming a typical sauce-to-pasta ratio. For dishes with very generous sauce, mix-ins, or protein, you might comfortably use a slightly smaller pasta portion per person.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pasta-portion-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Number of People" type="number" value={people} onChange={(e) => setPeople(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField select label="Portion Context" value={portion} onChange={(e) => setPortion(e.target.value)} fullWidth>
            {Object.keys(PORTION_SIZES).map((key) => (
              <MenuItem key={key} value={key}>{key} (~{PORTION_SIZES[key]} oz/person)</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Dry Pasta</Typography>
            <Typography variant="h3" fontWeight="bold">{result.oz.toFixed(1)} oz</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>In Pounds</Typography>
            <Typography fontWeight={600}>{result.lbs.toFixed(2)} lbs</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Approx. Cups (dry)</Typography>
            <Typography fontWeight={600}>{result.cups.toFixed(1)} cups</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PastaPortionCalculator;
