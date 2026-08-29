'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function catToHumanYears(catAge: number): number {
  if (catAge <= 0) return 0;
  if (catAge <= 1) return catAge * 15;
  if (catAge <= 2) return 15 + (catAge - 1) * 9;
  return 24 + (catAge - 2) * 4;
}

const REFERENCE_TABLE = Array.from({ length: 15 }, (_, i) => i + 1).map((year) => ({
  catYears: year,
  humanYears: Math.round(catToHumanYears(year)),
}));

const CatAgeCalculator = () => {
  const [catAge, setCatAge] = useState<string>('3');

  const humanYears = useMemo(() => {
    const age = parseFloat(catAge);
    if (isNaN(age) || age < 0) return null;
    return catToHumanYears(age);
  }, [catAge]);

  const content = (
    <>
      <Typography variant="h2">How to Convert Cat Years to Human Years</Typography>
      <Typography variant="body1">
        Cats mature far faster than humans in their first two years of life, then age more steadily after that.
        This calculator uses the standard non-linear conversion widely used by vets: a cat&apos;s first year is
        roughly equivalent to 15 human years, the second year adds about 9 more (24 total at age 2), and each
        year after that adds roughly 4 human years — far more accurate than a flat &quot;1 cat year = 7 human
        years&quot; multiplier.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Year 1: ×15 &nbsp;|&nbsp; Year 2: +9 (24 total) &nbsp;|&nbsp; Each year after: +4
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 3-year-old cat is 24 (from the first two years) + 1 more year × 4 = 28 human years old. A 10-year-old
        cat works out to 24 + 8 × 4 = 56 human years — comparable to a middle-aged adult.
      </Typography>

      <Typography variant="h2">Reference Table: Cat Years to Human Years</Typography>
      <Paper variant="outlined" sx={{ overflowX: 'auto', mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Cat&apos;s Age (years)</TableCell>
              <TableCell>Human-Equivalent Age (years)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {REFERENCE_TABLE.map((row) => (
              <TableRow key={row.catYears}>
                <TableCell>{row.catYears}</TableCell>
                <TableCell>{row.humanYears}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Understanding your cat&apos;s human-equivalent life stage — kitten, adult, or senior.</li>
          <li>Comparing the aging pace of multiple cats or pets of different ages.</li>
          <li>Getting a rough sense of appropriate care and vet check-up frequency by life stage.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why isn&apos;t it just &quot;1 cat year = 7 human years&quot;?</Typography>
      <Typography variant="body1">
        That old rule of thumb badly understates how fast cats mature early on and overstates aging later in
        life. A 1-year-old cat is already sexually mature and roughly equivalent to a 15-year-old human — nowhere
        close to 7 — which is why vets use a non-linear scale instead of a flat multiplier.
      </Typography>
      <Typography variant="h3">Does breed or size affect cat aging the way it does for dogs?</Typography>
      <Typography variant="body1">
        Size has a much smaller effect on cat aging than it does for dogs, where large breeds age noticeably
        faster. Most standard cat-to-human age conversions apply the same non-linear scale regardless of breed.
      </Typography>
      <Typography variant="h3">At what age is a cat considered a senior?</Typography>
      <Typography variant="body1">
        Cats are generally considered mature around 7-10 years and senior from about 11 years onward, which
        corresponds to roughly 60+ human-equivalent years on this scale.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/cat-age-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <TextField
          label="Cat's Age (years)"
          type="number"
          fullWidth
          value={catAge}
          onChange={(e) => setCatAge(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Human-Equivalent Age</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {humanYears !== null ? `${humanYears.toFixed(1)} years` : '—'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CatAgeCalculator;
