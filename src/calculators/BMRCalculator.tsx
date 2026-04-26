import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, InputAdornment } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';

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
      <Typography variant="h2">What is BMR?</Typography>
      <Typography variant="body1">
        Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions. This includes breathing, blood circulation, nutrient processing, and cell production.
      </Typography>

      <Typography variant="h2">How is BMR used?</Typography>
      <Typography variant="body1">
        Once you know your BMR, you can calculate your Total Daily Energy Expenditure (TDEE) by multiplying your BMR by an activity factor. Knowing your TDEE helps you figure out how many calories you need to consume to lose, maintain, or gain weight.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate (BMR) to understand your resting calorie needs."
      url="/health/bmr-calculator"
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

          <Box sx={{ mb: 4 }}>
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
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
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
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
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

        <Box>
          <Box sx={{ p: 4, bgcolor: '#f9f9f9', borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
    </CalculatorShell>
  );
};

export default BMRCalculator;
