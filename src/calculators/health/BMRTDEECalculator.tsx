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

const BMRTDEECalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');

  const [weight, setWeight] = useState<number>(70);

  const [heightCm, setHeightCm] = useState<number>(170);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(7);

  const [activity, setActivity] = useState<keyof typeof activityMultipliers>('moderate');

  const handleWeightUnitChange = (newUnit: 'kg' | 'lbs') => {
    if (newUnit === weightUnit) return;
    if (newUnit === 'lbs') setWeight(Math.round(weight * 2.20462));
    else setWeight(Math.round(weight / 2.20462));
    setWeightUnit(newUnit);
  };

  const { tdee, bmr } = useMemo(() => {
    const weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    let heightInCm = 0;

    if (heightUnit === 'cm') {
      heightInCm = heightCm;
    } else {
      const totalInches = heightFt * 12 + heightIn;
      heightInCm = totalInches * 2.54;
    }

    if (age <= 0 || weightInKg <= 0 || heightInCm <= 0) return { tdee: 0, bmr: 0 };

    let baseBmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age);

    if (gender === 'male') {
      baseBmr += 5;
    } else {
      baseBmr -= 161;
    }

    const calcTdee = baseBmr * activityMultipliers[activity].value;

    return {
      bmr: Math.round(baseBmr),
      tdee: Math.round(calcTdee),
    };
  }, [gender, age, weightUnit, heightUnit, weight, heightCm, heightFt, heightIn, activity]);

  const content = (
    <>
      <Typography variant="h2">One Calculator, Both Numbers: BMR + TDEE Together</Typography>
      <Typography variant="body1">
        Most sites make you visit a separate BMR calculator and a separate TDEE calculator, entering your
        details twice just to get the two numbers you actually need together. This <strong>combined BMR + TDEE
        calculator</strong> shows both in a single flow — enter your details once and instantly see your
        resting Basal Metabolic Rate (BMR) alongside your full Total Daily Energy Expenditure (TDEE) with your
        chosen activity level, without switching pages or re-entering anything.
      </Typography>

      <Typography variant="h2">How It's Calculated</Typography>
      <Typography variant="body1">
        BMR is calculated using the <strong>Mifflin-St Jeor equation</strong>, the modern standard for
        estimating resting calorie needs. TDEE is then derived by multiplying that BMR by an activity
        multiplier: <strong>TDEE = BMR × activity multiplier</strong>. Seeing both numbers side by side makes it
        easy to understand exactly how much of your daily calorie burn comes from being alive (BMR) versus from
        movement and exercise (the gap between BMR and TDEE).
      </Typography>

      <Typography variant="h2">How to Use Your Numbers</Typography>
      <Typography variant="body1">
        - <strong>Maintain Weight:</strong> Consume calories equal to your TDEE.<br />
        - <strong>Lose Weight:</strong> Consume 300-500 calories less than your TDEE (Caloric Deficit).<br />
        - <strong>Gain Muscle:</strong> Consume 300-500 calories more than your TDEE (Caloric Surplus).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 30-year-old woman, 165 cm tall, 60 kg, with moderate activity has a BMR of about 1,320 calories/day
        and a TDEE of about 1,320 × 1.55 ≈ 2,046 calories/day — both numbers appear together the moment she
        fills in the form, with no second page needed.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting your resting and total calorie needs in one pass instead of two separate lookups.</li>
          <li>Comparing how different activity levels change your TDEE relative to a fixed BMR.</li>
          <li>Setting a calorie target for weight loss, maintenance, or muscle gain in a single step.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How is this different from the separate BMR and TDEE calculators on this site?</Typography>
      <Typography variant="body1">
        Functionally, it uses the same Mifflin-St Jeor formula and the same activity multipliers as our
        standalone BMR Calculator and TDEE Calculator. The difference is convenience: instead of calculating
        your BMR on one page and then re-entering your details on a second page to get your TDEE, this
        combined tool shows both numbers together from a single set of inputs.
      </Typography>
      <Typography variant="h3">What does TDEE stand for?</Typography>
      <Typography variant="body1">
        TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a full
        day, combining your resting metabolism (BMR) with all activity, exercise, and digestion.
      </Typography>
      <Typography variant="h3">How is TDEE different from BMR?</Typography>
      <Typography variant="body1">
        BMR is calories burned at complete rest; TDEE (Total Daily Energy Expenditure) adds your activity level
        on top, giving a more realistic picture of your actual daily calorie burn.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      url="/health/bmr-tdee-calculator"
      content={content}
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

          <Box sx={{ mb: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
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
            <Box>
              <Typography gutterBottom>Weight</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  onFocus={(e) => e.target.select()}
                  value={Number.isNaN(weight) ? '' : weight}
                  onChange={(e) => setWeight(e.target.value === '' ? NaN : Number(e.target.value))}
                />
                <ToggleButtonGroup
                  color="primary"
                  value={weightUnit}
                  exclusive
                  onChange={(_, value) => { if (value) handleWeightUnitChange(value); }}
                  size="small"
                >
                  <ToggleButton value="kg" sx={{ px: 1 }}>kg</ToggleButton>
                  <ToggleButton value="lbs" sx={{ px: 1 }}>lbs</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography>Height</Typography>
              <ToggleButtonGroup
                color="primary"
                value={heightUnit}
                exclusive
                onChange={(_, value) => { if (value) setHeightUnit(value); }}
                size="small"
              >
                <ToggleButton value="cm" sx={{ px: 1 }}>cm</ToggleButton>
                <ToggleButton value="ft" sx={{ px: 1 }}>ft/in</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {heightUnit === 'cm' ? (
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                onFocus={(e) => e.target.select()}
                value={Number.isNaN(heightCm) ? '' : heightCm}
                onChange={(e) => setHeightCm(e.target.value === '' ? NaN : Number(e.target.value))}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }}
              />
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
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

          <Box sx={{ mb: 4 }}>
            <Typography gutterBottom>Activity Level</Typography>
            <FormControl fullWidth>
              <Select
                value={activity}
                onChange={(e) => setActivity(e.target.value as keyof typeof activityMultipliers)}
              >
                {Object.entries(activityMultipliers).map(([key, item]) => (
                  <MenuItem key={key} value={key}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box>
          <Box sx={{ p: 4, bgcolor: 'action.hover', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>BMR (Resting)</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, color: 'text.primary', mb: 3 }}>
              {bmr.toLocaleString('en-IN')} <Typography component="span" variant="body1" color="text.secondary">kcal/day</Typography>
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>TDEE (With Activity)</Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '3.5rem', color: 'primary.main', my: 1 }}>
              {tdee.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Calories / Day
            </Typography>

            <Box sx={{ width: '100%', pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Bulking (+500)</Typography>
                <Typography sx={{ fontWeight: 600 }}>{(tdee + 500).toLocaleString('en-IN')} kcal</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Cutting (-500)</Typography>
                <Typography sx={{ fontWeight: 600 }}>{(tdee - 500).toLocaleString('en-IN')} kcal</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BMRTDEECalculator;
