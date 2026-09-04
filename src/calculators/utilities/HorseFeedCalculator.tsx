'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Activity = 'idle' | 'light' | 'moderate' | 'heavy';

const ACTIVITY_PCT: Record<Activity, number> = {
  idle: 1.5,
  light: 1.75,
  moderate: 2.0,
  heavy: 2.5,
};

const ACTIVITY_LABEL: Record<Activity, string> = {
  idle: 'Idle / Maintenance',
  light: 'Light Work',
  moderate: 'Moderate Work',
  heavy: 'Heavy Work',
};

const HorseFeedCalculator = () => {
  const [bodyWeight, setBodyWeight] = useState<string>('1000');
  const [activity, setActivity] = useState<Activity>('moderate');

  const weight = parseFloat(bodyWeight);
  const valid = !isNaN(weight) && weight > 0;
  const pct = ACTIVITY_PCT[activity];
  const dailyForageLb = valid ? (weight * pct) / 100 : 0;
  const dailyForageKg = dailyForageLb * 0.453592;

  const content = (
    <>
      <Typography variant="h2">How to Calculate a Horse&apos;s Daily Forage Needs</Typography>
      <Typography variant="body1">
        Horses are typically fed a daily amount of hay or forage equal to a percentage of their body weight — a
        standard equine guideline is roughly 1.5-2.5% of body weight per day, with the exact figure rising with
        how much work the horse does. This calculator applies that guideline based on the horse&apos;s weight
        and activity level.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Daily Forage = Body Weight × Activity Percentage
      </Box>
      <Typography variant="body1">
        An idle or maintenance-level horse is estimated at 1.5% of body weight, light work at 1.75%, moderate
        work at 2%, and heavy work at 2.5% — reflecting the higher energy demands of more strenuous exercise.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 1,000 lb horse in moderate work needs about 1,000 × 2% = 20 lb of hay or forage per day (roughly
        9.1 kg). The same horse at heavy work would need closer to 25 lb per day.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating daily hay needs for a new horse or when workload changes.</li>
          <li>Budgeting monthly or seasonal hay purchases for a barn or stable.</li>
          <li>Checking that a current feeding routine is in a reasonable range for the horse&apos;s size and work.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this exact for every horse?</Typography>
      <Typography variant="body1">
        No — this is a general guideline based on body weight and activity level. Individual horses vary based
        on metabolism, breed, age, body condition, and health status. Always work with a veterinarian or
        equine nutritionist to fine-tune a feeding plan for a specific horse.
      </Typography>
      <Typography variant="h3">Does this include grain or concentrate feed?</Typography>
      <Typography variant="body1">
        No — this figure is for forage (hay or pasture) only, which should make up the bulk of a horse&apos;s
        diet. Horses in heavier work often need additional grain or concentrate feed on top of their forage
        ration to meet their full energy needs.
      </Typography>
      <Typography variant="h3">How do I know my horse&apos;s activity level?</Typography>
      <Typography variant="body1">
        Idle covers horses at rest or on very light pasture turnout. Light work includes occasional riding or
        light training. Moderate work covers regular riding, training, or showing. Heavy work applies to horses
        in intense training, racing, or heavy draft or ranch work.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/horse-feed-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Body Weight (lb)" type="number" fullWidth value={bodyWeight} onChange={(e) => setBodyWeight(e.target.value)} onFocus={(e) => e.target.select()} />
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
          <Typography variant="body2" color="text.secondary">Recommended Daily Forage</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? `${dailyForageLb.toFixed(1)} lb` : '—'}
          </Typography>
          <Typography variant="body1" color="text.secondary">{valid ? `${dailyForageKg.toFixed(1)} kg` : ''}</Typography>
          <Typography variant="caption" color="text.secondary">{valid ? `${pct}% of body weight` : ''}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HorseFeedCalculator;
