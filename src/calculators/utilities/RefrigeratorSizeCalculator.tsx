'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const RefrigeratorSizeCalculator = () => {
  const [people, setPeople] = useState('4');

  const result = useMemo(() => {
    const p = Math.max(1, Math.round(parseFloat(people) || 1));
    const cuFt = 10 + (p - 1) * 2.5;
    return { p, cuFt };
  }, [people]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Refrigerator Size Calculator</Typography>
      <Typography variant="body1">
        Enter the number of people in your household to get a rule-of-thumb recommendation for refrigerator
        capacity. The guideline used here starts with about 10 cubic feet for a single person, then adds
        roughly 2.5 cubic feet of capacity for each additional household member, since each extra person adds
        meaningfully to weekly grocery and leftover storage needs.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Recommended Capacity (cu ft) = 10 + (People − 1) × 2.5
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A household of 4 people needs roughly 10 + (4 − 1) × 2.5 = 17.5 cubic feet of refrigerator capacity,
        which lines up with the mid-size to large standard refrigerators commonly sold for family use.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a starting capacity target before shopping for a new refrigerator.</li>
          <li>Deciding whether a compact, standard, or large-capacity model fits your household size.</li>
          <li>Planning refrigerator capacity when moving into a home or apartment with a different household size.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Is this rule of thumb exact?</strong> No — it&apos;s a general starting guideline. Households that cook a lot from scratch, buy groceries in bulk, or store a lot of leftovers may want more capacity, while households that eat out often or shop frequently in small trips may be comfortable with less.</li>
          <li><strong>Does refrigerator capacity include the freezer?</strong> Manufacturer-listed total capacity typically includes both the fresh food and freezer compartments combined, so keep that in mind when comparing this recommendation to a specific model&apos;s listed capacity.</li>
          <li><strong>Should I round up or down when between sizes?</strong> Rounding up is usually the safer choice — running out of space is a daily annoyance, while a slightly larger fridge mostly just costs a bit more to run and buy.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/refrigerator-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Number of People in Household" type="number" value={people}
            onChange={(e) => setPeople(e.target.value)} onFocus={(e) => e.target.select()}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Recommended Refrigerator Capacity</Typography>
            <Typography variant="h3" fontWeight="bold">{result.cuFt.toFixed(1)} cu ft</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RefrigeratorSizeCalculator;
