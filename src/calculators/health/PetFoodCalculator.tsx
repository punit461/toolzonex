'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type PetType = 'dog' | 'cat';
type Activity = 'low' | 'moderate' | 'high';

const ACTIVITY_MULTIPLIER: Record<Activity, number> = { low: 0.85, moderate: 1.0, high: 1.2 };
const ACTIVITY_LABEL: Record<Activity, string> = { low: 'Low / Sedentary', moderate: 'Moderate / Average', high: 'High / Very Active' };

// Reference tables: cups/day (dog) and grams/day (cat) at "moderate" activity, by weight bracket upper bound (lb).
const DOG_TABLE: { maxLb: number; cups: number }[] = [
  { maxLb: 10, cups: 0.75 },
  { maxLb: 20, cups: 1.25 },
  { maxLb: 30, cups: 1.75 },
  { maxLb: 40, cups: 2.25 },
  { maxLb: 50, cups: 2.75 },
  { maxLb: 60, cups: 3.25 },
  { maxLb: 70, cups: 3.75 },
  { maxLb: 85, cups: 4.25 },
  { maxLb: 100, cups: 4.75 },
  { maxLb: Infinity, cups: 5.5 },
];

const CAT_TABLE: { maxLb: number; grams: number }[] = [
  { maxLb: 4, grams: 40 },
  { maxLb: 7, grams: 55 },
  { maxLb: 10, grams: 70 },
  { maxLb: 13, grams: 85 },
  { maxLb: 16, grams: 100 },
  { maxLb: Infinity, grams: 120 },
];

const PetFoodCalculator = () => {
  const [petType, setPetType] = useState<PetType>('dog');
  const [weight, setWeight] = useState('35');
  const [activity, setActivity] = useState<Activity>('moderate');

  const result = useMemo(() => {
    const w = parseFloat(weight);
    if (Number.isNaN(w) || w <= 0) return null;
    const mult = ACTIVITY_MULTIPLIER[activity];
    if (petType === 'dog') {
      const bracket = DOG_TABLE.find((b) => w <= b.maxLb) ?? DOG_TABLE[DOG_TABLE.length - 1];
      return { unit: 'cups', amount: Math.round(bracket.cups * mult * 4) / 4 };
    }
    const bracket = CAT_TABLE.find((b) => w <= b.maxLb) ?? CAT_TABLE[CAT_TABLE.length - 1];
    return { unit: 'grams', amount: Math.round((bracket.grams * mult) / 5) * 5 };
  }, [petType, weight, activity]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Your Pet&apos;s Daily Food Amount</Typography>
      <Typography variant="body1">
        Select your pet type and activity level, enter their weight, and this calculator looks up a
        recommended daily food amount from a standard veterinary feeding reference table — cups of dry food
        per day for dogs, and grams per day for cats — then adjusts it up or down based on activity level.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 35 lb dog at moderate activity falls in the 30-40 lb bracket, recommending about 2.25 cups of dry
        food per day. A 9 lb cat at moderate activity falls in the 7-10 lb bracket, recommending about 70 grams
        per day. A highly active pet in either bracket gets roughly 20% more.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a starting daily feeding amount for a new pet or new food.</li>
          <li>Adjusting portions after a change in your pet&apos;s activity level or weight.</li>
          <li>Sanity-checking the feeding guide printed on a specific bag of pet food.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this exact for my specific pet and food?</Typography>
      <Typography variant="body1">
        No — this is a general reference based on typical calorie density, but exact needs vary by food brand,
        since different foods pack different amounts of calories per cup or per gram. Always treat your
        specific food packaging&apos;s feeding guide, or your veterinarian&apos;s recommendation, as the final
        word for your pet.
      </Typography>
      <Typography variant="h3">Why does activity level change the amount so much?</Typography>
      <Typography variant="body1">
        More active pets burn more calories and need more food to maintain a healthy weight, while sedentary
        pets need less to avoid excess weight gain. This calculator adjusts the baseline reference amount up to
        20% higher for high activity and about 15% lower for low activity.
      </Typography>
      <Typography variant="h3">Should I feed this amount all at once?</Typography>
      <Typography variant="body1">
        Most vets recommend splitting the daily total into two or more meals rather than one large feeding,
        which can help with digestion and prevent overeating at a single sitting.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/pet-food-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <ToggleButtonGroup
            value={petType}
            exclusive
            fullWidth
            onChange={(_, val: PetType | null) => { if (val) setPetType(val); }}
          >
            <ToggleButton value="dog">Dog</ToggleButton>
            <ToggleButton value="cat">Cat</ToggleButton>
          </ToggleButtonGroup>
          <TextField label="Weight (lb)" type="number" fullWidth value={weight} onChange={(e) => setWeight(e.target.value)} onFocus={(e) => e.target.select()} />
          <FormControl fullWidth size="small">
            <InputLabel>Activity Level</InputLabel>
            <Select label="Activity Level" value={activity} onChange={(e) => setActivity(e.target.value as Activity)}>
              {(Object.keys(ACTIVITY_LABEL) as Activity[]).map((a) => (
                <MenuItem key={a} value={a}>{ACTIVITY_LABEL[a]}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Recommended Daily Amount</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {result ? `${result.amount} ${result.unit}` : '—'}
          </Typography>
          <Typography variant="caption" color="text.secondary">per day of dry food, split across meals</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PetFoodCalculator;
