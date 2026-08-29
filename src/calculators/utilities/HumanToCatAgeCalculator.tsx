'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function humanToCatAge(humanAge: number): number {
  if (humanAge <= 0) return 0;
  if (humanAge <= 15) return humanAge / 15;
  if (humanAge <= 24) return 1 + (humanAge - 15) / 9;
  return 2 + (humanAge - 24) / 4;
}

const REFERENCE_TABLE = [1, 5, 10, 15, 20, 24, 30, 40, 50, 60, 70, 80].map((human) => ({
  humanYears: human,
  catYears: Math.round(humanToCatAge(human) * 10) / 10,
}));

const HumanToCatAgeCalculator = () => {
  const [humanAge, setHumanAge] = useState<string>('30');

  const catAge = useMemo(() => {
    const age = parseFloat(humanAge);
    if (isNaN(age) || age < 0) return null;
    return humanToCatAge(age);
  }, [humanAge]);

  const content = (
    <>
      <Typography variant="h2">How to Convert Human Years to Cat Years</Typography>
      <Typography variant="body1">
        This calculator runs the standard cat-aging scale in reverse: instead of converting a cat&apos;s age
        into human-equivalent years, it takes a human-equivalent age and works out roughly how old a cat would
        be to reach that same life stage. It uses the same non-linear scale vets use — a cat&apos;s first year
        equals about 15 human years, the second year adds 9 more (24 total), and each year after that adds
        roughly 4 human years.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Up to 15 human years: Cat Age = Human Age ÷ 15 &nbsp;|&nbsp; 15-24: 1 + (Human − 15) ÷ 9 &nbsp;|&nbsp; Over 24: 2 + (Human − 24) ÷ 4
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        To find the cat age equivalent to a 30-year-old human: since 30 is above 24, use the third band —
        2 + (30 − 24) ÷ 4 = 2 + 1.5 = 3.5 cat years. A 60-year-old human&apos;s life stage corresponds to about
        2 + (60 − 24) ÷ 4 = 11 cat years, which is right around when cats are considered senior.
      </Typography>

      <Typography variant="h2">Reference Table: Human Years to Cat Years</Typography>
      <Paper variant="outlined" sx={{ overflowX: 'auto', mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Human-Equivalent Age (years)</TableCell>
              <TableCell>Cat&apos;s Age (years)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {REFERENCE_TABLE.map((row) => (
              <TableRow key={row.humanYears}>
                <TableCell>{row.humanYears}</TableCell>
                <TableCell>{row.catYears}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out what cat age corresponds to a particular human life stage (childhood, middle age, senior years).</li>
          <li>Writing or comparing pet-related content that references a human age and needs the cat-year equivalent.</li>
          <li>Satisfying curiosity about the reverse direction of the classic cat-to-human age conversion.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from a regular cat age calculator?</Typography>
      <Typography variant="body1">
        A standard cat age calculator takes your cat&apos;s actual age and converts it to a human-equivalent
        age. This tool runs in the opposite direction — you enter a human-equivalent age, and it tells you the
        cat age that corresponds to it, which is useful when you're starting from a human age rather than a
        cat's age.
      </Typography>
      <Typography variant="h3">Why isn&apos;t the scale linear?</Typography>
      <Typography variant="body1">
        Cats mature very quickly in their first two years and then age more steadily afterward, so a flat
        multiplier would badly misrepresent early life stages. The piecewise scale used here (and by vets)
        better reflects how quickly a young cat matures compared to an older one.
      </Typography>
      <Typography variant="h3">Can this be used for very young human ages?</Typography>
      <Typography variant="body1">
        Yes — for human ages up to 15, the calculator uses the first band (Human Age ÷ 15), reflecting that a
        cat reaches sexual maturity and roughly a 15-year-old human&apos;s life stage within its first year.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/human-to-cat-age-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <TextField
          label="Human-Equivalent Age (years)"
          type="number"
          fullWidth
          value={humanAge}
          onChange={(e) => setHumanAge(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Equivalent Cat Age</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {catAge !== null ? `${catAge.toFixed(2)} years` : '—'}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HumanToCatAgeCalculator;
