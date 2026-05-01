'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, InputAdornment, MenuItem, Select, FormControl } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

const activityMultipliers = {
  sedentary: { label: 'Sedentary (Office job, little to no exercise)', value: 1.2 },
  light: { label: 'Light Exercise (1-3 days/week)', value: 1.375 },
  moderate: { label: 'Moderate Exercise (3-5 days/week)', value: 1.55 },
  heavy: { label: 'Heavy Exercise (6-7 days/week)', value: 1.725 },
  athlete: { label: 'Athlete (2x per day, very heavy workouts)', value: 1.9 }
};

const TDEECalculator = () => {
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
    let weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    let heightInCm = 0;

    if (heightUnit === 'cm') {
      heightInCm = heightCm;
    } else {
      const totalInches = heightFt * 12 + heightIn;
      heightInCm = totalInches * 2.54;
    }

    if (age <= 0 || weightInKg <= 0 || heightInCm <= 0) return { tdee: 0, bmr: 0 };
    
    // Mifflin-St Jeor Equation
    let baseBmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age);
    
    if (gender === 'male') {
      baseBmr += 5;
    } else {
      baseBmr -= 161;
    }

    const calcTdee = baseBmr * activityMultipliers[activity].value;

    return { 
      bmr: Math.round(baseBmr),
      tdee: Math.round(calcTdee) 
    };
  }, [gender, age, weightUnit, heightUnit, weight, heightCm, heightFt, heightIn, activity]);

  const content = (
    <>
      <Typography variant="h2">What is TDEE?</Typography>
      <Typography variant="body1">
        Total Daily Energy Expenditure (TDEE) is an estimation of how many calories you burn per day when exercise is taken into account. It is calculated by first figuring out your Basal Metabolic Rate (BMR), then multiplying that value by an activity multiplier.
      </Typography>

      <Typography variant="h2">How to use your TDEE?</Typography>
      <Typography variant="body1">
        - <strong>Maintain Weight:</strong> Consume calories equal to your TDEE.<br />
        - <strong>Lose Weight:</strong> Consume 300-500 calories less than your TDEE (Caloric Deficit).<br />
        - <strong>Gain Muscle:</strong> Consume 300-500 calories more than your TDEE (Caloric Surplus).
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="TDEE Calculator"
      description="Find out your Total Daily Energy Expenditure to understand how many calories you burn."
      url="/health/tdee-calculator"
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
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
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
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
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
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
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
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    onFocus={(e) => e.target.select()}
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
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
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Maintenance Calories</Typography>
            
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '4.5rem', color: 'primary.main', my: 2 }}>
              {tdee.toLocaleString('en-IN')}
            </Typography>
            
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Calories / Day
            </Typography>

            <Box sx={{ width: '100%', pt: 3, borderTop: '1px solid #E5E5E5' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Basal Metabolic Rate (BMR)</Typography>
                <Typography sx={{ fontWeight: 600 }}>{bmr.toLocaleString('en-IN')} kcal</Typography>
              </Box>
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
    </CalculatorShell>
  );
};

export default TDEECalculator;
