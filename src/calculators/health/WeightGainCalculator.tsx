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

const surplusTiers = {
  lean: { label: 'Lean Bulk — 0.25 kg/week', kcal: 275 },
  moderate: { label: 'Moderate Bulk — 0.5 kg/week', kcal: 550 },
  fast: { label: 'Fast Bulk — 1 kg/week', kcal: 1100 },
};

const KCAL_PER_KG = 7700;

const ResultRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700, color: highlight ? 'primary.main' : 'text.primary' }}>{value}</Typography>
  </Box>
);

const WeightGainCalculatorContent = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<number>(60);
  const [height, setHeight] = useState<number>(170);
  const [activity, setActivity] = useState<keyof typeof activityMultipliers>('moderate');
  const [surplus, setSurplus] = useState<keyof typeof surplusTiers>('moderate');
  const [targetGain, setTargetGain] = useState<number>(5);

  const handleWeightUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit === weightUnit) return;
    if (newUnit === 'lbs') setWeight(Math.round(weight * 2.20462));
    else setWeight(Math.round(weight / 2.20462));
    setWeightUnit(newUnit);
  };

  const { maintenance, target, dailySurplus, weeksToGoal } = useMemo(() => {
    const weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    if (age <= 0 || weightInKg <= 0 || height <= 0) {
      return { maintenance: 0, target: 0, dailySurplus: 0, weeksToGoal: 0 };
    }

    let bmr = 10 * weightInKg + 6.25 * height - 5 * age;
    bmr += gender === 'male' ? 5 : -161;

    const maint = Math.round(bmr * activityMultipliers[activity].value);
    const dailySur = surplusTiers[surplus].kcal;
    const goalCalories = maint + dailySur;
    const totalKcalNeeded = targetGain * KCAL_PER_KG;
    const weeks = dailySur > 0 ? totalKcalNeeded / dailySur / 7 : 0;

    return { maintenance: maint, target: goalCalories, dailySurplus: dailySur, weeksToGoal: weeks };
  }, [gender, age, weightUnit, weight, height, activity, surplus, targetGain]);

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
          <Typography gutterBottom>Gain Pace</Typography>
          <FormControl fullWidth>
            <Select value={surplus} onChange={(e) => setSurplus(e.target.value as keyof typeof surplusTiers)}>
              {Object.entries(surplusTiers).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography gutterBottom>Target weight gain</Typography>
          <TextField
            fullWidth
            type="number"
            onFocus={(e) => e.target.select()}
            value={Number.isNaN(targetGain) ? '' : targetGain}
            onChange={(e) => setTargetGain(e.target.value === '' ? NaN : Number(e.target.value))}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2 }}>
        <ResultRow label="Maintenance calories" value={`${maintenance.toLocaleString('en-IN')} kcal/day`} />
        <ResultRow label="Target surplus calories" value={`${target.toLocaleString('en-IN')} kcal/day`} highlight />
        <ResultRow label="Daily surplus" value={`${dailySurplus.toLocaleString('en-IN')} kcal`} />
        <ResultRow label={`Time to gain ${targetGain || 0}kg`} value={weeksToGoal > 0 ? `~${weeksToGoal.toFixed(1)} weeks` : '—'} />
      </Box>
    </Box>
  );
};

const WeightGainCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Weight Gain Calculator Works</Typography>
      <Typography variant="body1">
        This calculator finds your <strong>maintenance calories</strong> (via the Mifflin-St Jeor equation and your
        activity level), then adds a daily calorie surplus based on the bulking pace you choose. It also estimates
        how many weeks it&apos;ll take to reach a target weight gain, using the rough estimate that{' '}
        <strong>1 kg of body weight ≈ 7,700 kcal</strong>.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter your age, gender, height, and weight.</li>
          <li>Select your activity level and bulking pace — lean, moderate, or fast.</li>
          <li>Enter a target weight-gain amount to see a rough timeline.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A moderately active person with 2,200 maintenance calories choosing a moderate 550 kcal/day surplus would
        eat around 2,750 calories/day, and take roughly 10 weeks to gain 5kg.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a daily calorie target for a lean bulk or mass-gain phase.</li>
          <li>Planning meals for hard-gainers who struggle to eat enough to gain weight.</li>
          <li>Estimating a realistic timeline for a weight or muscle-gain goal.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How big a calorie surplus should I eat to gain weight?</Typography>
      <Typography variant="body1">
        A surplus of 250–500 kcal/day (a "lean bulk") tends to favor muscle gain over fat gain compared to a larger
        surplus, though the exact split between muscle and fat also depends on training, protein intake, and
        genetics. Faster bulks pack on weight quicker but with more fat.
      </Typography>
      <Typography variant="h3">Why 7,700 kcal per kg?</Typography>
      <Typography variant="body1">
        It&apos;s the standard estimate for the energy stored in 1 kg of body tissue, used here for a rough
        timeline. Actual weight gain includes water, muscle, and fat in a mix that varies by person and training
        program, so treat the estimate as a starting point rather than an exact prediction.
      </Typography>
      <Typography variant="h3">How is this different from the Calorie Calculator?</Typography>
      <Typography variant="body1">
        The general Calorie Calculator gives calorie targets for several goals at once (loss, maintenance, gain).
        This tool is built specifically around a weight-gain goal, letting you pick a bulking pace and see an
        estimated timeline to a target weight gain.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/weight-gain-calculator" content={content}>
      <WeightGainCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WeightGainCalculator;
