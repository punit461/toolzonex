'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, MenuItem, Select, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const activityMultipliers = {
  sedentary: { label: 'Sedentary (Office job, little to no exercise)', value: 1.2 },
  light: { label: 'Light Exercise (1-3 days/week)', value: 1.375 },
  moderate: { label: 'Moderate Exercise (3-5 days/week)', value: 1.55 },
  heavy: { label: 'Heavy Exercise (6-7 days/week)', value: 1.725 },
  athlete: { label: 'Athlete (2x per day, very heavy workouts)', value: 1.9 },
};

const goals = {
  lose: { label: 'Lose Weight (-500 kcal)', adjust: -500 },
  maintain: { label: 'Maintain Weight', adjust: 0 },
  gain: { label: 'Gain Weight (+500 kcal)', adjust: 500 },
};

// [protein %, carbs %, fat % of total calories]
const dietStyles = {
  balanced: { label: 'Balanced (40/30/30)', split: [0.4, 0.3, 0.3] },
  highProtein: { label: 'High Protein (40/40/20)', split: [0.4, 0.4, 0.2] },
  lowCarb: { label: 'Low Carb (40/20/40)', split: [0.4, 0.2, 0.4] },
  keto: { label: 'Keto (25/5/70)', split: [0.25, 0.05, 0.7] },
};

const MacroBar = ({ label, grams, calories, totalCalories, color }: { label: string; grams: number; calories: number; totalCalories: number; color: string }) => {
  const pct = totalCalories > 0 ? Math.round((calories / totalCalories) * 100) : 0;
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
        <Typography sx={{ fontWeight: 700 }}>{grams}g <Typography component="span" color="text.secondary">({pct}%)</Typography></Typography>
      </Box>
      <Box sx={{ height: 10, borderRadius: 5, bgcolor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ width: `${pct}%`, height: '100%', bgcolor: color }} />
      </Box>
    </Box>
  );
};

const MacroCalculatorContent = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activity, setActivity] = useState<keyof typeof activityMultipliers>('moderate');
  const [goal, setGoal] = useState<keyof typeof goals>('maintain');
  const [diet, setDiet] = useState<keyof typeof dietStyles>('balanced');

  const { calories, protein, carbs, fat } = useMemo(() => {
    if (age <= 0 || weight <= 0 || height <= 0) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    }

    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += gender === 'male' ? 5 : -161;

    const tdee = bmr * activityMultipliers[activity].value;
    const targetCalories = Math.max(1200, Math.round(tdee + goals[goal].adjust));

    const [pPct, cPct, fPct] = dietStyles[diet].split;
    const proteinG = Math.round((targetCalories * pPct) / 4);
    const carbsG = Math.round((targetCalories * cPct) / 4);
    const fatG = Math.round((targetCalories * fPct) / 9);

    return { calories: targetCalories, protein: proteinG, carbs: carbsG, fat: fatG };
  }, [gender, age, weight, height, activity, goal, diet]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>Gender</Typography>
          <ToggleButtonGroup color="primary" value={gender} exclusive onChange={(_, v) => v && setGender(v)} fullWidth>
            <ToggleButton value="male" sx={{ fontWeight: 600 }}>Male</ToggleButton>
            <ToggleButton value="female" sx={{ fontWeight: 600 }}>Female</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
          <Box>
            <Typography gutterBottom>Age</Typography>
            <TextField
              fullWidth
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(age) ? '' : age}
              onChange={(e) => setAge(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
          <Box>
            <Typography gutterBottom>Weight (kg)</Typography>
            <TextField
              fullWidth
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(weight) ? '' : weight}
              onChange={(e) => setWeight(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
          <Box>
            <Typography gutterBottom>Height (cm)</Typography>
            <TextField
              fullWidth
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(height) ? '' : height}
              onChange={(e) => setHeight(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>Activity Level</Typography>
          <FormControl fullWidth>
            <Select value={activity} onChange={(e) => setActivity(e.target.value as keyof typeof activityMultipliers)}>
              {Object.entries(activityMultipliers).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>Goal</Typography>
          <FormControl fullWidth>
            <Select value={goal} onChange={(e) => setGoal(e.target.value as keyof typeof goals)}>
              {Object.entries(goals).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography gutterBottom>Diet Style</Typography>
          <FormControl fullWidth>
            <Select value={diet} onChange={(e) => setDiet(e.target.value as keyof typeof dietStyles)}>
              {Object.entries(dietStyles).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>Daily Target</Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main', mb: 3 }}>
          {calories.toLocaleString('en-IN')} <Typography component="span" variant="body1" color="text.secondary">kcal/day</Typography>
        </Typography>

        <MacroBar label="Protein" grams={protein} calories={protein * 4} totalCalories={calories} color="#2e7d32" />
        <MacroBar label="Carbs" grams={carbs} calories={carbs * 4} totalCalories={calories} color="#1976d2" />
        <MacroBar label="Fat" grams={fat} calories={fat * 9} totalCalories={calories} color="#ed6c02" />
      </Box>
    </Box>
  );
};

const MacroCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Macro Calculator Works</Typography>
      <Typography variant="body1">
        This calculator finds your daily calorie target (via the Mifflin-St Jeor equation, your activity level, and
        your goal), then splits it into <strong>protein, carbohydrate, and fat grams</strong> based on the diet
        style you pick. Protein and carbs provide 4 kcal per gram, while fat provides 9 kcal per gram.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter your age, gender, height, and weight.</li>
          <li>Select your activity level and goal (lose, maintain, or gain weight).</li>
          <li>Pick a diet style — balanced, high protein, low carb, or keto — to see your macro split in grams.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2,000 kcal/day target on a balanced 40/30/30 split works out to roughly 200g protein, 150g carbs, and 67g
        fat per day.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting daily protein, carb, and fat targets for tracking apps like MyFitnessPal.</li>
          <li>Comparing how different diet styles (keto, low-carb, high-protein) change your macro split.</li>
          <li>Planning meals around a specific calorie and macro target for a fitness goal.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What are macros?</Typography>
      <Typography variant="body1">
        "Macros" is short for macronutrients — protein, carbohydrates, and fat, the three nutrient groups that
        provide calories. Tracking macros (not just total calories) helps with goals like preserving muscle during
        weight loss or supporting muscle gain during a bulk.
      </Typography>
      <Typography variant="h3">Which diet style should I choose?</Typography>
      <Typography variant="body1">
        There&apos;s no single best split — a balanced 40/30/30 works well for general health, higher protein
        supports muscle retention during a cut, and low-carb or keto styles suit people who respond well to reduced
        carbohydrate intake. This tool is for general planning only; consult a doctor or dietitian for medical
        nutrition advice.
      </Typography>
      <Typography variant="h3">Why does fat use 9 kcal/gram instead of 4?</Typography>
      <Typography variant="body1">
        Fat is more energy-dense than protein or carbohydrates — it provides about 9 kilocalories per gram, compared
        to 4 kilocalories per gram for protein and carbs, which is why the same calorie amount converts to fewer
        grams of fat than of protein or carbs.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/macro-calculator" content={content}>
      <MacroCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MacroCalculator;
