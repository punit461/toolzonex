'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, MenuItem, Select, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const activityLevels = {
  sedentary: { label: 'Sedentary (little to no exercise)', extraMl: 0 },
  light: { label: 'Light exercise (< 30 min/day)', extraMl: 350 },
  moderate: { label: 'Moderate exercise (30-60 min/day)', extraMl: 700 },
  heavy: { label: 'Heavy exercise (60+ min/day)', extraMl: 1200 },
};

const climates = {
  normal: { label: 'Normal / Temperate', extraMl: 0 },
  hot: { label: 'Hot / Humid climate', extraMl: 500 },
};

const ML_PER_KG = 35;

const ResultRow = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography sx={{ fontWeight: 700 }}>{value}</Typography>
  </Box>
);

const WaterIntakeCalculatorContent = () => {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<number>(70);
  const [activity, setActivity] = useState<keyof typeof activityLevels>('light');
  const [climate, setClimate] = useState<keyof typeof climates>('normal');

  const handleWeightUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit === weightUnit) return;
    if (newUnit === 'lbs') setWeight(Math.round(weight * 2.20462));
    else setWeight(Math.round(weight / 2.20462));
    setWeightUnit(newUnit);
  };

  const { liters, glasses, ounces } = useMemo(() => {
    const weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    if (weightInKg <= 0) return { liters: 0, glasses: 0, ounces: 0 };

    const totalMl = weightInKg * ML_PER_KG + activityLevels[activity].extraMl + climates[climate].extraMl;
    return {
      liters: totalMl / 1000,
      glasses: Math.round(totalMl / 250),
      ounces: Math.round(totalMl / 29.5735),
    };
  }, [weightUnit, weight, activity, climate]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography gutterBottom>Body Weight</Typography>
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
          <Typography gutterBottom>Exercise Level</Typography>
          <FormControl fullWidth>
            <Select value={activity} onChange={(e) => setActivity(e.target.value as keyof typeof activityLevels)}>
              {Object.entries(activityLevels).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography gutterBottom>Climate</Typography>
          <FormControl fullWidth>
            <Select value={climate} onChange={(e) => setClimate(e.target.value as keyof typeof climates)}>
              {Object.entries(climates).map(([key, item]) => (
                <MenuItem key={key} value={key}>{item.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom align="center">Recommended Daily Water Intake</Typography>
        <Typography variant="h2" sx={{ fontWeight: 900, color: 'primary.main', textAlign: 'center', mb: 3 }}>
          {liters.toFixed(1)}L
        </Typography>
        <ResultRow label="Glasses (250ml each)" value={`${glasses} glasses`} />
        <ResultRow label="Ounces" value={`${ounces} fl oz`} />
      </Box>
    </Box>
  );
};

const WaterIntakeCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Water Intake Calculator Works</Typography>
      <Typography variant="body1">
        This calculator estimates your recommended daily water intake using the common rule of thumb of{' '}
        <strong>35 ml of water per kg of body weight</strong>, then adds extra for exercise (which increases fluid
        loss through sweat) and hot or humid climates.
      </Typography>

      <Typography variant="h2">How to Use It</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Enter your body weight in kg or lbs.</li>
          <li>Select your typical daily exercise level.</li>
          <li>Select your climate to see your recommended daily water intake in liters, glasses, and ounces.</li>
        </ul>
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 70kg person with light daily exercise in a normal climate needs roughly 2.8L per day — about 11 glasses of
        water.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a daily hydration target to track in a water-reminder app.</li>
          <li>Adjusting fluid intake for a workout routine or a hot climate.</li>
          <li>Getting a quick, personalized answer to "how much water should I drink a day?"</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is "8 glasses a day" accurate?</Typography>
      <Typography variant="body1">
        The "8x8 rule" (eight 8-ounce glasses, about 2 liters) is a simple, memorable guideline, but individual needs
        vary a lot with body size, activity, and climate — which is why this calculator scales the target to your
        own weight instead of using one fixed number for everyone.
      </Typography>
      <Typography variant="h3">Does this include water from food and other drinks?</Typography>
      <Typography variant="body1">
        No — this estimate is for direct water/fluid intake. In practice, food (especially fruits and vegetables)
        and other beverages also contribute to total hydration, so your actual need for plain water may be somewhat
        lower depending on your diet.
      </Typography>
      <Typography variant="h3">Can I drink too much water?</Typography>
      <Typography variant="body1">
        Yes — drinking far more water than your body needs in a short time can lead to a dangerous condition called
        hyponatremia (low blood sodium). This calculator gives a general daily estimate, not medical advice; people
        with kidney, heart, or liver conditions should follow fluid guidance from their doctor instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/water-intake-calculator" content={content}>
      <WaterIntakeCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WaterIntakeCalculator;
