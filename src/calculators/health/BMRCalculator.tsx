'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, InputAdornment } from '@mui/material';
import NextLink from 'next/link';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BMRCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');

  const [weight, setWeight] = useState<number>(70);
  
  const [heightCm, setHeightCm] = useState<number>(170);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(7);

  const handleWeightUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit === weightUnit) return;
    if (newUnit === 'lbs') setWeight(Math.round(weight * 2.20462));
    else setWeight(Math.round(weight / 2.20462));
    setWeightUnit(newUnit);
  };

  const bmr = useMemo(() => {
    let weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    let heightInCm = 0;

    if (heightUnit === 'cm') {
      heightInCm = heightCm;
    } else {
      const totalInches = heightFt * 12 + heightIn;
      heightInCm = totalInches * 2.54;
    }

    if (age <= 0 || weightInKg <= 0 || heightInCm <= 0) return 0;
    
    // Mifflin-St Jeor Equation
    let result = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age);
    
    if (gender === 'male') {
      result += 5;
    } else {
      result -= 161;
    }

    return Math.round(result);
  }, [gender, age, weightUnit, heightUnit, weight, heightCm, heightFt, heightIn]);

  const content = (
    <>
      <Typography variant="h2">What is BMR? (Mifflin-St Jeor BMR Calculator)</Typography>
      <Typography variant="body1">
        Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions. This includes breathing, blood circulation, nutrient processing, and cell production. This tool is a <strong>Mifflin-St Jeor BMR calculator</strong> — every result is computed using the Mifflin-St Jeor equation, the formula most doctors, dietitians, and fitness apps treat as the modern standard for estimating resting calorie needs.
      </Typography>

      <Typography variant="h2">How is BMR used? (BMR to TDEE / Total Daily Energy Expenditure)</Typography>
      <Typography variant="body1">
        Once you know your BMR, you can calculate your <strong>Total Daily Energy Expenditure (TDEE)</strong> by
        multiplying your BMR by an activity factor: <strong>TDEE = BMR × activity multiplier</strong>. Knowing
        your TDEE helps you figure out how many calories you need to consume to lose, maintain, or gain weight.
        Use the BMR number from this page as the input to our{' '}
        <Typography component={NextLink} href="/health/tdee-calculator" sx={{ color: 'primary.main', fontWeight: 600 }}>
          TDEE calculator
        </Typography>{' '}
        to get your full daily calorie target.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 30-year-old woman, 165cm tall and 60kg, has a BMR (Mifflin-St Jeor) of roughly 1,320 calories/day —
        the energy her body burns at complete rest, before any activity is factored in.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting a calorie baseline before building a diet or fitness plan.</li>
          <li>Calculating TDEE (Total Daily Energy Expenditure) by combining BMR with an activity multiplier.</li>
          <li>Understanding how age, weight, and body composition affect metabolism.</li>
          <li>Comparing calorie needs using the Mifflin-St Jeor equation instead of older, less accurate formulas.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs — BMR Calculator Guide</Typography>
      <Typography variant="h3">What is the Mifflin-St Jeor equation?</Typography>
      <Typography variant="body1">
        The Mifflin-St Jeor equation is the formula this calculator uses to estimate BMR. It is:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(years) + 5<br />
        Women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age(years) − 161
      </Box>
      <Typography variant="body1">
        Published by Mifflin and St Jeor in 1990, it&apos;s widely regarded as more accurate than the older
        Harris-Benedict equation for most people, which is why it&apos;s the formula (sometimes abbreviated
        &quot;MSJ equation&quot;) used by this BMR calculator.
      </Typography>
      <Typography variant="h3">Is BMR the same as the calories I burn in a day?</Typography>
      <Typography variant="body1">
        No — BMR is calories burned at complete rest. Your Total Daily Energy Expenditure (TDEE) is higher and
        includes activity, exercise, and digestion. TDEE = BMR × activity multiplier.
      </Typography>
      <Typography variant="h3">Which formula does this use?</Typography>
      <Typography variant="body1">
        The Mifflin-St Jeor equation, widely considered one of the more accurate BMR formulas for the general
        population.
      </Typography>
      <Typography variant="h3">Is this a Mifflin-St Jeor calculator?</Typography>
      <Typography variant="body1">
        Yes — every result on this page is computed with the Mifflin-St Jeor equation rather than the older
        (less accurate) Harris-Benedict formula.
      </Typography>
      <Typography variant="h3">How is BMR different from TDEE (Total Daily Energy Expenditure)?</Typography>
      <Typography variant="body1">
        BMR is your resting calorie burn from the Mifflin-St Jeor equation above. TDEE — your Total Daily Energy
        Expenditure — takes that BMR and multiplies it by an activity level (sedentary, lightly active,
        moderately active, very active) to estimate the calories you actually burn in a full day, including
        exercise and movement.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) to understand your resting calorie needs."
      url="/health/bmr-calculator"
      content={content}
      category="Health"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Gender</Typography>
            <ToggleButtonGroup
              color="primary"
              value={gender}
              exclusive
              onChange={(_, value) => { if (value) setGender(value); }}
              fullWidth
              sx={{ mt: 1 }}
            >
              <ToggleButton value="male" sx={{ fontWeight: 600 }}>Male</ToggleButton>
              <ToggleButton value="female" sx={{ fontWeight: 600 }}>Female</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Age (Years)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              onFocus={(e) => e.target.select()}
              value={Number.isNaN(age) ? '' : age}
              onChange={(e) => setAge(e.target.value === '' ? NaN : Number(e.target.value))}
            />
          </Box>

          <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography sx={{ width: 100 }}>Weight in:</Typography>
            <ToggleButtonGroup
              color="primary"
              value={weightUnit}
              exclusive
              onChange={(_, value) => { if (value) handleWeightUnitChange(value); }}
              size="small"
            >
              <ToggleButton value="kg" sx={{ fontWeight: 600 }}>kg</ToggleButton>
              <ToggleButton value="lbs" sx={{ fontWeight: 600 }}>lbs</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ mb: 4 }}>
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
          
          <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography sx={{ width: 100 }}>Height in:</Typography>
            <ToggleButtonGroup
              color="primary"
              value={heightUnit}
              exclusive
              onChange={(_, value) => { if (value) setHeightUnit(value); }}
              size="small"
            >
              <ToggleButton value="cm" sx={{ fontWeight: 600 }}>cm</ToggleButton>
              <ToggleButton value="ft" sx={{ fontWeight: 600 }}>ft/in</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {heightUnit === 'cm' ? (
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(heightCm) ? '' : heightCm}
                onChange={(e) => setHeightCm(e.target.value === '' ? NaN : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }}
              />
            </Box>
          ) : (
            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(heightFt) ? '' : heightFt}
                  onChange={(e) => setHeightFt(e.target.value === '' ? NaN : Number(e.target.value))}
                  slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(heightIn) ? '' : heightIn}
                  onChange={(e) => setHeightIn(e.target.value === '' ? NaN : Number(e.target.value))}
                  slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }}
                />
              </Box>
            </Box>
          )}
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Your BMR Is</Typography>
            
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '4.5rem', color: 'primary.main', my: 2 }}>
              {bmr.toLocaleString('en-IN')}
            </Typography>

            <Typography variant="h6" color="text.secondary">
              Calories / Day
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BMRCalculator;
