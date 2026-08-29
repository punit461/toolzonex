'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PACES = {
  slow: { label: 'Slow / Strolling (~2 mph)', met: 2.8 },
  casual: { label: 'Casual (~2.5 mph)', met: 3.0 },
  moderate: { label: 'Moderate (~3 mph)', met: 3.5 },
  brisk: { label: 'Brisk (~3.5 mph)', met: 4.3 },
  veryBrisk: { label: 'Very Brisk (~4 mph)', met: 5.0 },
};

const CaloriesBurnedWalkingCalculator = () => {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<string>('70');
  const [duration, setDuration] = useState<string>('30');
  const [pace, setPace] = useState<keyof typeof PACES>('moderate');

  const calories = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const d = parseFloat(duration) || 0;
    if (w <= 0 || d <= 0) return 0;
    const weightKg = weightUnit === 'kg' ? w : w / 2.20462;
    const hours = d / 60;
    return Math.round(PACES[pace].met * weightKg * hours);
  }, [weight, weightUnit, duration, pace]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Calories Burned Walking Calculator</Typography>
      <Typography variant="body1">
        Enter your body weight, how long you walked, and your typical pace. The calculator uses the standard
        MET (Metabolic Equivalent of Task) formula: <strong>calories = MET × weight (kg) × duration (hours)</strong>.
        Walking METs range from about 2.8 for a slow stroll up to 5.0 for a very brisk pace, since faster walking
        demands more energy per minute.
      </Typography>

      <Typography variant="h2">What Is a MET?</Typography>
      <Typography variant="body1">
        A MET (Metabolic Equivalent of Task) measures how many times more energy an activity uses compared to
        sitting still, which is defined as 1 MET. Walking at a moderate 3 mph pace has a MET value of about 3.5,
        meaning your body burns 3.5 times more energy than it would at rest. Faster walking speeds move to
        higher MET values, which is why pace matters as much as duration when estimating calories burned.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 70 kg person walking briskly (MET 4.3) for 30 minutes burns approximately 4.3 × 70 × 0.5 ≈ 151 calories.
        The same person walking at a slow stroll (MET 2.8) for the same 30 minutes burns roughly 98 calories —
        pace alone makes a meaningful difference.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating calories burned during a daily walk for weight-management tracking.</li>
          <li>Comparing how pace changes the calorie burn of the same walk.</li>
          <li>Planning walking workouts around a calorie or fitness goal.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is this estimate?</Typography>
      <Typography variant="body1">
        MET-based formulas give a solid ballpark estimate for the average adult, but actual calorie burn varies
        with individual metabolism, terrain, incline, and fitness level. Wearable heart-rate monitors can offer
        a more personalized estimate, but this calculator is a reliable general guide.
      </Typography>
      <Typography variant="h3">Does incline or terrain change the calorie burn?</Typography>
      <Typography variant="body1">
        Yes — walking uphill or on soft/uneven terrain (sand, trails) burns noticeably more calories than the
        same pace on a flat, paved surface. This calculator assumes flat-ground walking at the selected pace.
      </Typography>
      <Typography variant="h3">Should I use this instead of medical advice?</Typography>
      <Typography variant="body1">
        No — this is a general estimate for fitness tracking, not a medical or clinical measurement. Consult a
        healthcare professional for guidance tailored to your health conditions.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/calories-burned-walking-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography>Weight</Typography>
              <ToggleButtonGroup
                color="primary"
                value={weightUnit}
                exclusive
                onChange={(_, value) => { if (value) setWeightUnit(value); }}
                size="small"
              >
                <ToggleButton value="kg" sx={{ px: 1 }}>kg</ToggleButton>
                <ToggleButton value="lbs" sx={{ px: 1 }}>lbs</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment> } }}
            />
          </Box>

          <TextField
            label="Duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">minutes</InputAdornment> } }}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="walk-pace">Walking Pace</InputLabel>
            <Select labelId="walk-pace" label="Walking Pace" value={pace} onChange={(e) => setPace(e.target.value as keyof typeof PACES)}>
              {Object.entries(PACES).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Paper sx={{ p: 4, bgcolor: 'action.hover', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Calories Burned</Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '4.5rem', color: 'primary.main', my: 2 }}>
              {calories || '—'}
            </Typography>
            <Typography variant="h6" color="text.secondary">kcal</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CaloriesBurnedWalkingCalculator;
