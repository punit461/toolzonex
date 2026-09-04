'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DailyFatIntakeCalculator = () => {
  const [calories, setCalories] = useState<string>('2000');
  const [fatPct, setFatPct] = useState<number>(27);

  const fatGrams = useMemo(() => {
    const cals = parseFloat(calories) || 0;
    return Math.round((cals * (fatPct / 100)) / 9);
  }, [calories, fatPct]);

  const content = (
    <>
      <Typography variant="h2">How Daily Fat Intake Is Calculated</Typography>
      <Typography variant="body1">
        Enter your total daily calorie target and choose what percentage of those calories should come from
        dietary fat. Standard dietary guidelines recommend 20-35% of total calories from fat for most adults —
        this calculator converts your chosen percentage into grams, since fat provides 9 calories per gram
        (more than double protein or carbohydrates, which provide 4 calories per gram each).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Fat Grams = (Total Calories × Fat %) ÷ 9
      </Box>
      <Typography variant="body1">
        If you don&apos;t know your daily calorie target, our{' '}
        <a href="/health/macro-calculator">Macro Calculator</a> can estimate it from your age, weight, height,
        and activity level, along with a full protein/carb/fat split in one go. This tool is for when you just
        want a focused answer for fat alone.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        On a 2,000 calorie/day diet at 27% of calories from fat, that&apos;s (2,000 × 0.27) ÷ 9 = 60g of fat per
        day. A leaner approach at 20% would work out to about 44g per day on the same calorie target.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a daily fat gram target for a tracking app like MyFitnessPal.</li>
          <li>Comparing how a lower-fat or higher-fat approach changes your gram target.</li>
          <li>Planning meals around a specific fat budget while dieting.</li>
          <li>Pairing with a protein or carb target to round out a full macro plan.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What percentage of calories should come from fat?</Typography>
      <Typography variant="body1">
        Standard dietary guidelines recommend 20-35% of total calories from fat for most healthy adults. Very
        low-fat diets can fall below this range, while higher-fat approaches like keto intentionally go well
        above it — both are outside the typical recommended range and warrant more individual planning.
      </Typography>
      <Typography variant="h3">Is all dietary fat the same?</Typography>
      <Typography variant="body1">
        No — this calculator estimates total fat grams only. Nutrition guidance generally recommends
        prioritizing unsaturated fats (from sources like nuts, olive oil, and fish) and limiting saturated and
        trans fats, regardless of your total fat target.
      </Typography>
      <Typography variant="h3">How is this different from the Macro Calculator?</Typography>
      <Typography variant="body1">
        The Macro Calculator estimates your full daily calorie target from your stats and activity level, then
        splits it into protein, carbs, and fat all at once. This calculator is a focused, single-purpose tool
        for when you already know your calorie target (or want to enter one directly) and just want the fat
        number.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/daily-fat-intake-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Total Daily Calories"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            fullWidth
            onFocus={(e) => e.target.select()}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">kcal</InputAdornment> } }}
          />
          <Box>
            <Typography gutterBottom>
              Fat: <strong>{fatPct}%</strong> of calories
            </Typography>
            <Slider
              value={fatPct}
              onChange={(_, v) => setFatPct(v as number)}
              min={10}
              max={50}
              step={1}
              marks={[
                { value: 20, label: '20%' },
                { value: 35, label: '35%' },
              ]}
              valueLabelDisplay="auto"
            />
            <Typography variant="body2" color="text.secondary">
              Standard dietary guideline range: 20-35% of calories from fat.
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Daily Fat Target</Typography>
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Recommended</Typography>
            <Typography variant="h4" fontWeight="bold">{fatGrams} g/day</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DailyFatIntakeCalculator;
