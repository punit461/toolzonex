'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const INTENSITIES = {
  leisure: { label: 'Leisure, <10 mph', met: 4.0 },
  light: { label: 'Light Effort, 10-12 mph', met: 6.8 },
  moderate: { label: 'Moderate Effort, 12-14 mph', met: 8.0 },
  vigorous: { label: 'Vigorous Effort, 14-16 mph', met: 10.0 },
  racing: { label: 'Fast / Racing, 16-19 mph', met: 12.0 },
  veryFast: { label: 'Very Fast / Competitive, 20+ mph', met: 15.8 },
};

const CaloriesBurnedCyclingCalculator = () => {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<string>('70');
  const [duration, setDuration] = useState<string>('30');
  const [intensity, setIntensity] = useState<keyof typeof INTENSITIES>('moderate');

  const calories = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const d = parseFloat(duration) || 0;
    if (w <= 0 || d <= 0) return 0;
    const weightKg = weightUnit === 'kg' ? w : w / 2.20462;
    const hours = d / 60;
    return Math.round(INTENSITIES[intensity].met * weightKg * hours);
  }, [weight, weightUnit, duration, intensity]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Calories Burned Cycling Calculator</Typography>
      <Typography variant="body1">
        Enter your weight, ride duration, and intensity/speed to estimate calories burned while cycling. This
        tool applies the same MET-based formula used across our calorie calculators:{' '}
        <strong>calories = MET × weight (kg) × duration (hours)</strong>. Cycling METs span a wide range —
        roughly 4.0 for a leisurely ride up to 15.8 for competitive, high-speed cycling — because effort scales
        sharply with speed on a bike.
      </Typography>

      <Typography variant="h2">Why Cycling MET Values Vary So Widely</Typography>
      <Typography variant="body1">
        Unlike walking or running, cycling speed depends heavily on gearing, terrain, and drafting, so the same
        rider can burn very different amounts of energy at different speeds. That's why this calculator groups
        cycling into six intensity/speed bands, from a relaxed leisure ride to competitive racing pace, each
        mapped to its own MET value.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 70 kg cyclist riding at a moderate effort (12-14 mph, MET 8.0) for 30 minutes burns approximately
        8.0 × 70 × 0.5 ≈ 280 calories. Riding at a vigorous effort (14-16 mph, MET 10.0) for the same 30 minutes
        burns roughly 350 calories.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating calorie burn for commuting or recreational rides.</li>
          <li>Comparing calorie expenditure between casual and high-intensity cycling.</li>
          <li>Planning nutrition around long training rides.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is this calorie estimate?</Typography>
      <Typography variant="body1">
        This MET-based method gives a solid estimate for flat-terrain cycling at a steady speed, but actual
        burn depends on wind resistance, hills, bike weight, and rider efficiency. A power-meter-based estimate
        would be more precise, but this calculator offers a reliable general figure.
      </Typography>
      <Typography variant="h3">Does cycling uphill change the calorie burn?</Typography>
      <Typography variant="body1">
        Yes — climbing significantly increases energy cost compared to flat riding at the same speed. This
        calculator assumes flat terrain at the selected speed/intensity band.
      </Typography>
      <Typography variant="h3">Is this a substitute for medical or professional coaching advice?</Typography>
      <Typography variant="body1">
        No — this is a general fitness estimate, not a clinical or medical measurement. Consult a doctor or
        coach for guidance tailored to your specific training or health goals.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/calories-burned-cycling-calculator" content={content}>
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
            <InputLabel id="cycle-intensity">Intensity / Speed</InputLabel>
            <Select labelId="cycle-intensity" label="Intensity / Speed" value={intensity} onChange={(e) => setIntensity(e.target.value as keyof typeof INTENSITIES)}>
              {Object.entries(INTENSITIES).map(([key, item]) => (
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

export default CaloriesBurnedCyclingCalculator;
