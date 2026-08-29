'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PACES = {
  jog: { label: 'Jogging, 5 mph (12:00 /mile)', met: 8.3 },
  easy: { label: 'Running, 6 mph (10:00 /mile)', met: 9.8 },
  steady: { label: 'Running, 7 mph (8:34 /mile)', met: 11.0 },
  fast: { label: 'Running, 8 mph (7:30 /mile)', met: 11.8 },
  faster: { label: 'Running, 9 mph (6:40 /mile)', met: 12.8 },
  race: { label: 'Running, 10 mph (6:00 /mile)', met: 14.5 },
  sprint: { label: 'Running, 11+ mph (5:30 /mile)', met: 16.0 },
};

const CaloriesBurnedRunningCalculator = () => {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<string>('70');
  const [duration, setDuration] = useState<string>('30');
  const [pace, setPace] = useState<keyof typeof PACES>('easy');

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
      <Typography variant="h2">How to Use the Calories Burned Running Calculator</Typography>
      <Typography variant="body1">
        Enter your weight, running duration, and pace to get an estimate of calories burned. Like the walking
        calculator, this tool uses the standard MET (Metabolic Equivalent of Task) formula:{' '}
        <strong>calories = MET × weight (kg) × duration (hours)</strong>. Running METs range from about 8.3 for
        an easy jog up to 16.0 for sprinting, since running burns far more energy per minute than walking.
      </Typography>

      <Typography variant="h2">Why Does Running Burn So Many More Calories Than Walking?</Typography>
      <Typography variant="body1">
        Running MET values (roughly 8-16) are two to four times higher than walking MET values (roughly
        2.8-5.0) because running requires much more muscular force and cardiovascular effort per minute of
        activity. As your running pace increases, your MET value — and therefore your calorie burn per
        minute — climbs steadily.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 70 kg runner at a 10:00/mile pace (MET 9.8) for 30 minutes burns approximately 9.8 × 70 × 0.5 ≈ 343
        calories. Picking up the pace to 8:34/mile (MET 11.0) over the same 30 minutes raises that to about 385
        calories.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating calorie burn for a training run or race prep.</li>
          <li>Comparing calorie expenditure across different running paces.</li>
          <li>Balancing calorie intake against running mileage for weight goals.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is this calorie estimate?</Typography>
      <Typography variant="body1">
        MET-based estimates are a widely used approximation and work well for the average runner on flat
        ground, but actual burn varies with body composition, running efficiency, and terrain. Treat the result
        as a reliable estimate rather than an exact measurement.
      </Typography>
      <Typography variant="h3">Does running uphill burn more calories?</Typography>
      <Typography variant="body1">
        Yes — this calculator assumes flat terrain at a steady pace. Hills, trail running, and wind resistance
        all increase the energy cost above what the flat-ground MET value predicts.
      </Typography>
      <Typography variant="h3">Is this a substitute for a fitness tracker or medical advice?</Typography>
      <Typography variant="body1">
        No — this is a general fitness estimate, not a clinical measurement. If you're training for a specific
        health or medical goal, consult a doctor or certified coach.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/calories-burned-running-calculator" content={content}>
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
            <InputLabel id="run-pace">Running Pace</InputLabel>
            <Select labelId="run-pace" label="Running Pace" value={pace} onChange={(e) => setPace(e.target.value as keyof typeof PACES)}>
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

export default CaloriesBurnedRunningCalculator;
