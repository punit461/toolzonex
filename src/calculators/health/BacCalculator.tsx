'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  Button,
  InputAdornment,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const DRINK_ALCOHOL_GRAMS: Record<string, number> = {
  beer: 14,
  wine: 14,
  shot: 14,
};

const drinkOptions = [
  { value: 'beer', label: 'Beer (355ml / 12oz, 5% ABV)' },
  { value: 'wine', label: 'Wine (148ml / 5oz, 12% ABV)' },
  { value: 'shot', label: 'Shot (44ml / 1.5oz, 40% ABV)' },
];

const BacCalculator = () => {
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState<number>(70);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [drinks, setDrinks] = useState<number>(2);
  const [drinkType, setDrinkType] = useState<string>('beer');
  const [hours, setHours] = useState<number>(1);

  const handleWeightUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit === weightUnit) return;
    if (newUnit === 'lbs') setWeight(Math.round(weight * 2.20462));
    else setWeight(Math.round(weight / 2.20462));
    setWeightUnit(newUnit);
  };

  const { bac, riskLevel, color, timeToSober } = useMemo(() => {
    const weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    const weightInGrams = weightInKg * 1000;

    const widmarkFactor = gender === 'male' ? 0.68 : 0.55;
    const eliminationRate = 0.015;
    const alcoholGrams = (drinks || 0) * (DRINK_ALCOHOL_GRAMS[drinkType] || 14);

    let calcBac = 0;
    if (weightInGrams > 0) {
      calcBac =
        alcoholGrams / (weightInGrams * widmarkFactor) -
        eliminationRate * (hours || 0);
    }
    calcBac = Math.max(0, Math.round(calcBac * 1000) / 1000);

    let level = 'Safe';
    let col = '#22c55e';
    if (calcBac >= 0.08) {
      level = 'Danger';
      col = '#ef4444';
    } else if (calcBac >= 0.05) {
      level = 'Caution';
      col = '#eab308';
    }

    // Time to sober (hours) = current BAC / elimination rate, only if BAC > 0
    const soberHours = calcBac > 0 ? calcBac / 0.015 : 0;

    return { bac: calcBac, riskLevel: level, color: col, timeToSober: soberHours };
  }, [weightUnit, weight, gender, drinks, drinkType, hours]);

  const content = (
    <>
      <Typography variant="h2">How is BAC Calculated?</Typography>
      <Typography variant="body1">
        Blood Alcohol Concentration (BAC) estimates the percentage of alcohol in your bloodstream. This
        calculator uses the Widmark formula:
      </Typography>
      <Box sx={{ typography: 'body1', mt: 1 }}>
        <strong>BAC = (alcohol grams ÷ (weight grams × Widmark factor)) − (elimination rate × hours)</strong>
      </Box>
      <Typography variant="body1" sx={{ mt: 1 }}>
        The Widmark factor is 0.68 for males and 0.55 for females (reflecting average body water content). The
        elimination rate is 0.015 per hour, which is the average rate at which the body processes alcohol.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 70 kg male who drinks two beers and waits one hour has a BAC of about
        (28 ÷ (70000 × 0.68)) − (0.015 × 1) ≈ 0.044. This is below the 0.08 legal limit but above the 0.05
        caution threshold, so he should not drive.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating whether you may be over the legal driving limit.</li>
          <li>Understanding how body weight, gender, and time affect alcohol processing.</li>
          <li>Planning safe celebrations by estimating time until sober.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the legal BAC limit for driving?</Typography>
      <Typography variant="body1">
        In most U.S. states the legal driving limit is 0.08%. For commercial drivers it is typically 0.04%, and
        for drivers under 21 it is often 0.00–0.02%. Always check your local laws.
      </Typography>
      <Typography variant="h3">Does this calculator guarantee I am sober to drive?</Typography>
      <Typography variant="body1">
        No. BAC estimates are based on averages and can vary with metabolism, food, medications, and drink
        strength. When in doubt, do not drive.
      </Typography>
      <Typography variant="h3">Can coffee or a cold shower lower my BAC?</Typography>
      <Typography variant="body1">
        No. Only time lowers BAC. Coffee, water, and showers may make you feel more alert but do not speed up
        alcohol elimination.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/bac-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography sx={{ width: 100 }}>Weight in:</Typography>
            <ToggleButtonGroup
              color="primary"
              value={weightUnit}
              exclusive
              onChange={(_, value) => {
                if (value) handleWeightUnitChange(value);
              }}
              size="small"
            >
              <ToggleButton value="kg" sx={{ fontWeight: 600 }}>kg</ToggleButton>
              <ToggleButton value="lbs" sx={{ fontWeight: 600 }}>lbs</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Body Weight</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(weight) ? '' : weight}
              onChange={(e) => setWeight(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Gender</Typography>
            <ToggleButtonGroup
              color="primary"
              value={gender}
              exclusive
              onChange={(_, value) => {
                if (value) setGender(value);
              }}
              fullWidth
              size="small"
            >
              <ToggleButton value="male" sx={{ fontWeight: 600 }}>Male</ToggleButton>
              <ToggleButton value="female" sx={{ fontWeight: 600 }}>Female</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Number of Drinks</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(drinks) ? '' : drinks}
              onChange={(e) => setDrinks(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">drinks</InputAdornment> } }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Drink Type</Typography>
            <TextField
              fullWidth
              select
              variant="outlined"
              value={drinkType}
              onChange={(e) => setDrinkType(e.target.value)}
            >
              {drinkOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </TextField>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Hours Since First Drink</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(hours) ? '' : hours}
              onChange={(e) => setHours(e.target.value === '' ? NaN : Number(e.target.value))}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">hrs</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Your Estimated BAC Is</Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '5rem', color: color || '#9CA3AF', my: 2 }}>
              {bac || '—'}
            </Typography>
            <Box sx={{ bgcolor: 'background.paper', px: 3, py: 1, borderRadius: 5, border: `2px solid ${color || '#E5E5E5'}` }}>
              <Typography variant="h6" sx={{ color: color || '#9CA3AF', fontWeight: 700, textTransform: 'uppercase' }}>
                {riskLevel || 'Enter details'}
              </Typography>
            </Box>
            {bac > 0 && (
              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #E5E5E5', width: '100%', textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Estimated time to sober: <strong>{timeToSober.toFixed(1)} hours</strong> (from now).
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BacCalculator;
