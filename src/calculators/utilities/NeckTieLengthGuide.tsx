'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, TextField, ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

function recommend(heightInches: number): { length: string; note: string } {
  if (heightInches < 65) {
    return { length: '52-54 inch (Short)', note: 'A shorter tie helps keep proportions balanced and avoids excess length below the belt.' };
  }
  if (heightInches < 68) {
    return { length: '55-57 inch (Regular)', note: 'A standard regular-length tie generally suits this height comfortably.' };
  }
  if (heightInches <= 72) {
    return { length: '57-58 inch (Standard)', note: 'This is the classic standard tie length, designed to suit the average height range of roughly 5\'8"-6\'0".' };
  }
  if (heightInches <= 76) {
    return { length: '61-63 inch (Extra Long / XL)', note: 'An extra-long (XL) tie is recommended to avoid the tie ending up too short when tied at a normal length.' };
  }
  return { length: '63+ inch (XXL / Extra Long)', note: 'A specialty extra-long tie is recommended, since standard and even XL lengths may end up too short.' };
}

const NeckTieLengthGuideContent = () => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('10');
  const [cm, setCm] = useState('178');

  const heightInches = useMemo(() => {
    if (unit === 'imperial') {
      const f = parseFloat(feet) || 0;
      const i = parseFloat(inches) || 0;
      return f * 12 + i;
    }
    const c = parseFloat(cm) || 0;
    return c / 2.54;
  }, [unit, feet, inches, cm]);

  const valid = heightInches > 0;
  const result = valid ? recommend(heightInches) : null;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Stack spacing={3}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small">
          <ToggleButton value="imperial">ft / in</ToggleButton>
          <ToggleButton value="metric">cm</ToggleButton>
        </ToggleButtonGroup>

        {unit === 'imperial' ? (
          <Stack direction="row" spacing={2}>
            <TextField label="Feet" type="number" value={feet} onChange={(e) => setFeet(e.target.value)} fullWidth />
            <TextField label="Inches" type="number" value={inches} onChange={(e) => setInches(e.target.value)} fullWidth />
          </Stack>
        ) : (
          <TextField label="Height (cm)" type="number" value={cm} onChange={(e) => setCm(e.target.value)} fullWidth />
        )}
      </Stack>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Recommended Tie Length</Typography>
        {result ? (
          <Paper sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>{result.length}</Typography>
            <Typography variant="body2">{result.note}</Typography>
          </Paper>
        ) : (
          <Typography color="text.secondary">Enter a valid height to see a recommendation.</Typography>
        )}
      </Box>
    </Box>
  );
};

const NeckTieLengthGuide = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Neck Tie Length Guide</Typography>
      <Typography variant="body1">
        Enter your height using feet/inches or centimeters. The guide maps your height to a recommended tie
        length using standard published men&apos;s-fashion guidance: a standard ~57-58 inch tie suits an
        average height of roughly 5&apos;8&quot;-6&apos;0&quot;, taller individuals are generally better
        suited by an extra-long (XL) tie around 61-63 inches, and shorter individuals typically look best in a
        shorter tie so the tip doesn&apos;t hang too low below the belt.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Someone who is 6&apos;3&quot; (75 inches) tall falls into the extra-long (XL) range, so a 61-63 inch
        tie is recommended instead of a standard-length tie, which would likely end up too short when tied.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Deciding whether to buy a standard or extra-long tie before a wedding or formal event.</li>
          <li>Shopping for a tie online where length options aren&apos;t always obvious from the listing.</li>
          <li>Helping a taller or shorter friend or family member pick the right tie length as a gift.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does tie length also depend on knot style?</strong> Yes, to a smaller degree — bulkier knots like the Windsor use more fabric than a simple four-in-hand, which can make a tie sit slightly shorter than expected. This guide gives a solid starting point, but trying a specific tie with your preferred knot is the most reliable check.</li>
          <li><strong>Where should a properly tied tie end?</strong> The classic guideline is that the tip of the tie should just reach your belt buckle or the top of your waistband — noticeably shorter or longer than that usually looks off.</li>
          <li><strong>Are there tie lengths made specifically for shorter people?</strong> Yes — many brands offer shorter cuts specifically to avoid excess length, which this guide reflects for those under about 5&apos;5&quot;.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/neck-tie-length-guide" content={content}>
      <NeckTieLengthGuideContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NeckTieLengthGuide;
