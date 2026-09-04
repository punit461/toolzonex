'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Slider } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DailyCarbIntakeCalculator = () => {
  const [calories, setCalories] = useState<string>('2000');
  const [carbPct, setCarbPct] = useState<number>(50);

  const carbGrams = useMemo(() => {
    const cals = parseFloat(calories) || 0;
    return Math.round((cals * (carbPct / 100)) / 4);
  }, [calories, carbPct]);

  const content = (
    <>
      <Typography variant="h2">How Daily Carb Intake Is Calculated</Typography>
      <Typography variant="body1">
        Enter your total daily calorie target and choose what percentage of those calories should come from
        carbohydrates. The Dietary Guidelines for Americans recommend 45-65% of total calories from
        carbohydrates for most adults — this calculator lets you pick anywhere in (or outside) that range and
        converts it into grams, since carbohydrates provide 4 calories per gram.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Carb Grams = (Total Calories × Carb %) ÷ 4
      </Box>
      <Typography variant="body1">
        If you don&apos;t know your daily calorie target, our{' '}
        <a href="/health/macro-calculator">Macro Calculator</a> can estimate it from your age, weight, height,
        and activity level, along with a full protein/carb/fat split in one go. This tool is for when you just
        want a focused answer for carbohydrates alone.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        On a 2,000 calorie/day diet at the standard guideline midpoint of 50% carbs, that&apos;s
        (2,000 × 0.50) ÷ 4 = 250g of carbohydrates per day. A lower-carb approach at 30% would work out to
        150g per day on the same calorie target.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a daily carbohydrate target for a tracking app like MyFitnessPal.</li>
          <li>Comparing how a lower-carb or higher-carb approach changes your gram target.</li>
          <li>Planning meals around a specific carbohydrate budget.</li>
          <li>Pairing with a protein or fat target to round out a full macro plan.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What percentage of calories should come from carbs?</Typography>
      <Typography variant="body1">
        Standard dietary guidelines recommend 45-65% of total calories from carbohydrates for most healthy
        adults. Athletes with high training volume often sit at the higher end, while people following
        lower-carb or ketogenic approaches intentionally go well below this range.
      </Typography>
      <Typography variant="h3">How is this different from the Macro Calculator?</Typography>
      <Typography variant="body1">
        The Macro Calculator estimates your full daily calorie target from your stats and activity level, then
        splits it into protein, carbs, and fat all at once. This calculator is a focused, single-purpose tool
        for when you already know your calorie target (or want to enter one directly) and just want the carb
        number.
      </Typography>
      <Typography variant="h3">Should I consult a professional before changing my carb intake significantly?</Typography>
      <Typography variant="body1">
        Yes — this tool is for general planning only. If you have diabetes, a metabolic condition, or are
        making a major dietary change, talk to a doctor or registered dietitian first.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/daily-carb-intake-calculator" content={content}>
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
              Carbohydrates: <strong>{carbPct}%</strong> of calories
            </Typography>
            <Slider
              value={carbPct}
              onChange={(_, v) => setCarbPct(v as number)}
              min={10}
              max={70}
              step={1}
              marks={[
                { value: 45, label: '45%' },
                { value: 65, label: '65%' },
              ]}
              valueLabelDisplay="auto"
            />
            <Typography variant="body2" color="text.secondary">
              Standard dietary guideline range: 45-65% of calories from carbohydrates.
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Daily Carbohydrate Target</Typography>
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Recommended</Typography>
            <Typography variant="h4" fontWeight="bold">{carbGrams} g/day</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default DailyCarbIntakeCalculator;
