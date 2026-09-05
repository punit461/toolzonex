'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Context = 'Appetizers Only' | 'Light Meal' | 'Full Meal';

const PRESETS: Record<Context, { value: number; unit: 'pieces' | 'lbs' }> = {
  'Appetizers Only': { value: 7, unit: 'pieces' },
  'Light Meal': { value: 0.6, unit: 'lbs' },
  'Full Meal': { value: 1.25, unit: 'lbs' },
};

const PartyFoodQuantityCalculator = () => {
  const [guests, setGuests] = useState('30');
  const [context, setContext] = useState<Context>('Full Meal');

  const result = useMemo(() => {
    const g = parseFloat(guests) || 0;
    const preset = PRESETS[context];
    return { total: g * preset.value, unit: preset.unit };
  }, [guests, context]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Party Food Quantity Calculator</Typography>
      <Typography variant="body1">
        Enter your guest count and choose the meal context you&apos;re planning for — appetizers only, a light
        meal, or a full meal. Each context uses a representative per-person quantity (pieces for appetizers,
        pounds of food for meals) to estimate the total amount of food you need.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Total Food Needed = Guests × Quantity per Person
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For 30 guests at a full meal event, using 1.25 lbs per person, total food needed = 30 × 1.25 = 37.5
        lbs. For the same 30 guests at an appetizers-only gathering, using 7 pieces per person, you&apos;d need
        30 × 7 = 210 total pieces.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning how much food to prepare or order for a cocktail hour vs. a sit-down meal.</li>
          <li>Budgeting catering quantities for an office party or family gathering.</li>
          <li>Comparing food needs across different event formats for the same guest list.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Why do appetizers use a piece count instead of weight?</strong> Appetizers like finger foods, canapés, and hors d&apos;oeuvres are naturally portioned as individual pieces, so counting pieces per person is a more practical planning unit than weight for that context.</li>
          <li><strong>What&apos;s the difference between a light meal and a full meal?</strong> A light meal assumes lighter fare like salads, sliders, or a buffet with smaller portions, while a full meal assumes a complete sit-down-style plate with a main dish, sides, and larger portions — roughly double the food weight per person.</li>
          <li><strong>Should I add extra for guests with big appetites or dietary variety?</strong> Yes — these are general planning averages. Many event planners add a 10-15% buffer on top of the calculated total to account for larger appetites, seconds, and variety across dishes.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/party-food-quantity-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField label="Number of Guests" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} onFocus={(e) => e.target.select()} fullWidth />
          <TextField select label="Meal Context" value={context} onChange={(e) => setContext(e.target.value as Context)} fullWidth>
            {Object.keys(PRESETS).map((key) => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Total Food Needed</Typography>
            <Typography variant="h3" fontWeight="bold">
              {result.total.toFixed(1)} {result.unit}
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PartyFoodQuantityCalculator;
