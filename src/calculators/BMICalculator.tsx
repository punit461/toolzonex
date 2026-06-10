'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, ToggleButtonGroup, ToggleButton, InputAdornment } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const BMICalculator = () => {
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

  const handleHeightUnitChange = (newUnit: 'cm' | 'ft') => {
    if (newUnit === heightUnit) return;
    if (newUnit === 'ft') {
      const totalInches = Math.round(heightCm / 2.54);
      setHeightFt(Math.floor(totalInches / 12));
      setHeightIn(totalInches % 12);
    } else {
      const totalInches = heightFt * 12 + heightIn;
      setHeightCm(Math.round(totalInches * 2.54));
    }
    setHeightUnit(newUnit);
  };

  const { bmi, category, color } = useMemo(() => {
    let calcBmi = 0;
    
    let weightInKg = weightUnit === 'kg' ? weight : weight / 2.20462;
    let heightInMeters = 0;

    if (heightUnit === 'cm') {
      heightInMeters = heightCm / 100;
    } else {
      const totalInches = heightFt * 12 + heightIn;
      heightInMeters = totalInches * 0.0254;
    }

    if (heightInMeters > 0) {
      calcBmi = weightInKg / (heightInMeters * heightInMeters);
    }

    const value = Math.round(calcBmi * 10) / 10;
    
    // Indian BMI guidelines are lower than WHO
    let cat = '';
    let col = '';
    if (value < 18.5) {
      cat = 'Underweight';
      col = '#3b82f6'; // blue
    } else if (value >= 18.5 && value <= 22.9) {
      cat = 'Normal';
      col = '#22c55e'; // green
    } else if (value >= 23 && value <= 24.9) {
      cat = 'Overweight';
      col = '#eab308'; // yellow
    } else if (value >= 25) {
      cat = 'Obese';
      col = '#ef4444'; // red
    }

    return { bmi: value, category: cat, color: col };
  }, [weightUnit, heightUnit, weight, heightCm, heightFt, heightIn]);

  const content = (
    <>
      <Typography variant="h2">BMI Categories for Indians</Typography>
      <Typography variant="body1">
        The standard WHO BMI chart differs slightly from the guidelines recommended for the Indian population. Indians are generally genetically prone to higher abdominal fat and lower muscle mass, putting them at higher risk of lifestyle diseases at lower BMI levels.
      </Typography>
      <br />
      <Box sx={{ bgcolor: 'action.hover', p: 3, borderRadius: 2, border: '1px solid' }}>
        <Typography variant="body1"><strong>Underweight:</strong> Below 18.5</Typography>
        <Typography variant="body1"><strong>Normal:</strong> 18.5 - 22.9</Typography>
        <Typography variant="body1"><strong>Overweight:</strong> 23.0 - 24.9</Typography>
        <Typography variant="body1"><strong>Obese:</strong> 25.0 and above</Typography>
      </Box>

      <Typography variant="h2">Is BMI Enough?</Typography>
      <Typography variant="body1">
        While BMI is a useful screening tool, it has limitations. It does not distinguish between fat and muscle mass. Therefore, athletes with high muscle mass might be classified as overweight. It's always best to consult a healthcare provider and measure body fat percentage for a comprehensive health assessment.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="BMI Calculator"
      description="Calculate Body Mass Index (BMI) using Indian-specific categories."
      url="/health/bmi-calculator"
      content={content}
      category="Health"
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box>
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
            onChange={(_, value) => { if (value) handleHeightUnitChange(value); }}
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
            <Typography variant="h6" color="text.secondary" gutterBottom>Your BMI Is</Typography>
            
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '5rem', color: color || '#9CA3AF', my: 2 }}>
              {bmi || '—'}
            </Typography>

            <Box sx={{ bgcolor: 'background.paper', px: 3, py: 1, borderRadius: 5, border: `2px solid ${color || '#E5E5E5'}` }}>
              <Typography variant="h6" sx={{ color: color || '#9CA3AF', fontWeight: 700, textTransform: 'uppercase' }}>
                {category || 'Enter details'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BMICalculator;
