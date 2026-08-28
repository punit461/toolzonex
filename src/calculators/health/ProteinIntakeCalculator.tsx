'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const ProteinIntakeCalculator = () => {
  const [weight, setWeight] = useState<string>('70');
  const [activity, setActivity] = useState<'sedentary' | 'moderate' | 'active' | 'athlete'>('moderate');
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain');

  const protein = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const mult: Record<string, number> = { sedentary: 0.8, moderate: 1.2, active: 1.6, athlete: 2.0 };
    const goalMult: Record<string, number> = { maintain: 1, lose: 0.9, gain: 1.2 };
    const base = w * mult[activity];
    return Math.round(base * goalMult[goal] * 10) / 10;
  }, [weight, activity, goal]);

  const content = (
    <>
      <Typography variant="h2">How to use?</Typography>
      <Typography variant="body1">
        Enter your body weight, activity level, and goal. The calculator applies a
        per-kg protein multiplier based on activity, then adjusts for your goal to
        estimate daily protein intake in grams.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 70 kg moderately active person maintaining weight: 70 × 1.2 = 84 g/day.
        An athlete of the same weight aiming to gain might target 70 × 2.0 × 1.2 ≈
        168 g/day.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I eat too much protein?</strong> Excess protein is generally excreted, but very high intakes can strain kidneys in people with pre-existing conditions. Spread intake across meals.</li>
          <li><strong>Should I use body weight or lean mass?</strong> Body weight is a simple, common basis; athletes with high lean mass may prefer lean-body-mass-based estimates.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a muscle-building or weight-loss diet.</li>
          <li>Meeting daily nutrition targets for training.</li>
          <li>Balancing macros in a meal plan.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/health/protein-intake-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Body Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            InputProps={{ endAdornment: <InputAdornment position="end">kg</InputAdornment> }}
          />
          <FormControl fullWidth>
            <InputLabel>Activity Level</InputLabel>
            <Select label="Activity Level" value={activity} onChange={(e) => setActivity(e.target.value as any)}>
              <MenuItem value="sedentary">Sedentary (0.8 g/kg)</MenuItem>
              <MenuItem value="moderate">Moderate (1.2 g/kg)</MenuItem>
              <MenuItem value="active">Active (1.6 g/kg)</MenuItem>
              <MenuItem value="athlete">Athlete (2.0 g/kg)</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Goal</InputLabel>
            <Select label="Goal" value={goal} onChange={(e) => setGoal(e.target.value as any)}>
              <MenuItem value="maintain">Maintain</MenuItem>
              <MenuItem value="lose">Lose Fat</MenuItem>
              <MenuItem value="gain">Gain Muscle</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Daily Protein</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Recommended</Typography>
            <Typography variant="h6" fontWeight="bold">{protein} g/day</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ProteinIntakeCalculator;
