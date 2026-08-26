'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, InputAdornment, MenuItem, Select, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const activityMultipliers = {
  sedentary: { label: 'Sedentary (Office job, little to no exercise)', value: 1.2 },
  light: { label: 'Light Exercise (1-3 days/week)', value: 1.375 },
  moderate: { label: 'Moderate Exercise (3-5 days/week)', value: 1.55 },
  heavy: { label: 'Heavy Exercise (6-7 days/week)', value: 1.725 },
  athlete: { label: 'Athlete (2x per day, very heavy workouts)', value: 1.9 },
};

const deficitTiers = {
  mild: { label: 'Mild — 0.25 kg/week', kcal: 275 },
  moderate: { label: 'Moderate — 0.5 kg/week', kcal: 550 },
  aggressive: { label: 'Aggressive — 0.75 kg/week', kcal: 825 },
  extreme: { label: 'Extreme — 1 kg/week', kcal: 1100 },
};

const KCAL_PER_KG_FAT = 7700;

const ResultRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, color: highlight ? 'primary.main' : 'text.primary' }}>{value}</Typography>
  </Box>
);

const CalorieDeficitCalculatorContent = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(170);
  const [activity, setActivity] = useState<keyof typeof activityMultipliers>('moderate');
  const [deficit, setDeficit] = useState<keyof typeof deficitTiers>('moderate');
  const [targetLoss, setTargetLoss] = useState<number>(5);

  const handleWeightUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit === weightUnit) return;
    if (newUnit === 'lbs') setWeight(Math.round(weight * 2.20462));
    else setWeight(Math.round(weight / 2.20462));
    setWeightUnit(newUnit);
  };

  const { maintenance, target, dailyDeficit, weeksToGoal } = useMemo(() => {
    const weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    if (age <= 0 || weightInKg <= 0 || height <= 0) {
      return { maintenance: 0, target: 0, dailyDeficit: 0, weeksToGoal: 0 };
    }

    let bmr = 10 * weightInKg + 6.25 * height - 5 * age;
    bmr += gender === 'male' ? 5 : -161;

    const maint = Math.round(bmr * activityMultipliers[activity].value);
    const dailyDef = deficitTiers[deficit].kcal;
    const goalCalories = Math.max(1200, maint - dailyDef);
    const totalKcalNeeded = targetLoss * KCAL_PER_KG_FAT;
    const weeks = dailyDef > 0 ? totalKcalNeeded / dailyDef / 7 : 0;

    return { maintenance: maint, target: goalCalories, dailyDeficit: dailyDef, weeksToGoal: weeks };
  }, [gender, age, weightUnit, weight, height, activity, deficit, targetLoss]);

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

        <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
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
            <Typography gutterBottom>Height</Typography>
            <TextField
              fullWidth
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(height) ? '' : height}
              onChange={(e) => setHeight(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>Weight</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(weight) ? '' : weight}
              onChange={(e) => setWeight(e.target.value === '' ? NaN : Number(e.target.value))}
            />
            <ToggleButtonGroup color="primary" value={weightUnit} exclusive onChange={(_, v) => v && handleWeightUnitChange(v)} size="small">
              <ToggleButton value="kg" sx={{ px: 1 }}>kg</ToggleButton>
              <ToggleButton value="lbs" sx={{ px: 1 }}>lbs</ToggleButton>
            </ToggleButtonGroup>
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
          <Typography gutterBottom>Deficit Pace</Typography>
          <FormControl fullWidth>
            <Select value={deficit} onChange={(e) => setDeficit(e.target.value as keyof typeof deficitTiers)}>
              {Object.entries(deficitTiers).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography gutterBottom>Target weight loss</Typography>
          <TextField
            fullWidth
            type="number"
            onFocus={(e) => e.target.select()}
            value={Number.isNaN(targetLoss) ? '' : targetLoss}
            onChange={(e) => setTargetLoss(e.target.value === '' ? NaN : Number(e.target.value))}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
        <ResultRow label="Maintenance calories" value={`${maintenance.toLocaleString('en-IN')} kcal/day`} />
        <ResultRow label="Target deficit calories" value={`${target.toLocaleString('en-IN')} kcal/day`} highlight />
        <ResultRow label="Daily deficit" value={`${dailyDeficit.toLocaleString('en-IN')} kcal`} />
        <ResultRow label={`Time to lose ${targetLoss || 0}kg`} value={weeksToGoal > 0 ? `~${weeksToGoal.toFixed(1)} weeks` : '—'} />
      </Box>
    </Box>
  );
};

const CalorieDeficitCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Calorie Deficit Calculator Works</Typography>
      <Typography variant="body1">
        This calculator finds your <strong>maintenance calories</strong> (via the Mifflin-St Jeor equation and your
        activity level), then subtracts a daily deficit based on the weight-loss pace you choose. It also estimates
        how many weeks it&apos;ll take to reach a target weight loss, using the standard estimate that{' '}
        <strong>1 kg of fat ≈ 7,700 kcal</strong>.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter your age, gender, height, and weight.</li>
          <li>Select your activity level and how aggressive a deficit you want.</li>
          <li>Enter a target weight-loss amount to see a rough timeline.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A moderately active person with 2,400 maintenance calories choosing a moderate 550 kcal/day deficit would
        eat around 1,850 calories/day, and take roughly 10 weeks to lose 5kg.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a realistic daily calorie target for fat loss.</li>
          <li>Estimating how long a weight-loss goal will realistically take.</li>
          <li>Comparing how a mild vs. aggressive deficit changes your timeline.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s a safe calorie deficit?</Typography>
      <Typography variant="body1">
        A deficit of 500–750 kcal/day (roughly 0.5–0.75 kg/week) is generally considered a sustainable pace for most
        people. Larger deficits can speed up short-term results but are harder to maintain and more likely to cause
        muscle loss and fatigue. This calculator is for general planning only and isn&apos;t a substitute for advice
        from a doctor or dietitian, especially for larger deficits.
      </Typography>
      <Typography variant="h3">Why 7,700 kcal per kg of fat?</Typography>
      <Typography variant="body1">
        One kilogram of body fat stores roughly 7,700 kilocalories of energy, so a cumulative deficit of that size
        corresponds to losing about 1 kg. It&apos;s a widely used estimate, though actual results vary with water
        weight, muscle changes, and individual metabolism.
      </Typography>
      <Typography variant="h3">Why shouldn&apos;t I go below 1,200 calories?</Typography>
      <Typography variant="body1">
        Very low calorie intakes can make it hard to get enough nutrients and are difficult to sustain, which is why
        this calculator caps its suggested target at a minimum of 1,200 kcal/day. Extreme deficits should only be
        attempted under medical supervision.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/calorie-deficit-calculator" content={content}>
      <CalorieDeficitCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CalorieDeficitCalculator;
