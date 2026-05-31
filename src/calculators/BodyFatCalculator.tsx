'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Button, Paper, Alert, ToggleButton, ToggleButtonGroup, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import CalculatorShell from '../components/CalculatorShell';
import AdSenseUnit from '../components/AdSenseUnit';

const BodyFatCalculatorContent = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(75);
  const [height, setHeight] = useState<number>(175);
  const [neck, setNeck] = useState<number>(38);
  const [waist, setWaist] = useState<number>(85);
  const [hip, setHip] = useState<number>(95);

  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBodyFat = () => {
    // US Navy Method
    let h = height;
    let n = neck;
    let w = waist;
    let hi = hip;

    // Convert imperial to metric for formula if needed
    if (unit === 'imperial') {
      h *= 2.54;
      n *= 2.54;
      w *= 2.54;
      hi *= 2.54;
    }

    let bf = 0;
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }

    if (isNaN(bf) || bf < 0 || bf > 100) {
      setBodyFat(null);
      setCategory('Invalid measurements');
      return;
    }

    setBodyFat(Number(bf.toFixed(1)));

    // Categorization (Approximate ranges)
    if (gender === 'male') {
      if (bf < 6) setCategory('Essential Fat');
      else if (bf <= 13) setCategory('Athletes');
      else if (bf <= 17) setCategory('Fitness');
      else if (bf <= 24) setCategory('Average');
      else setCategory('Obese');
    } else {
      if (bf < 14) setCategory('Essential Fat');
      else if (bf <= 20) setCategory('Athletes');
      else if (bf <= 24) setCategory('Fitness');
      else if (bf <= 31) setCategory('Average');
      else setCategory('Obese');
    }
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      
      {/* Input Panel */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ToggleButtonGroup
            color="primary"
            value={gender}
            exclusive
            onChange={(e, val) => val && setGender(val)}
            size="small"
          >
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
          </ToggleButtonGroup>

          <RadioGroup row value={unit} onChange={(e) => setUnit(e.target.value as 'metric' | 'imperial')}>
            <FormControlLabel value="metric" control={<Radio size="small" />} label="Metric (cm/kg)" />
            <FormControlLabel value="imperial" control={<Radio size="small" />} label="US (in/lbs)" />
          </RadioGroup>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField 
            label="Age" 
            type="number" 
            value={age || ''} 
            onChange={(e) => setAge(Number(e.target.value))} 
            fullWidth 
          />
          <TextField 
            label={`Weight (${unit === 'metric' ? 'kg' : 'lbs'})`} 
            type="number" 
            value={weight || ''} 
            onChange={(e) => setWeight(Number(e.target.value))} 
            fullWidth 
          />
          <TextField 
            label={`Height (${unit === 'metric' ? 'cm' : 'inches'})`} 
            type="number" 
            value={height || ''} 
            onChange={(e) => setHeight(Number(e.target.value))} 
            fullWidth 
          />
          <TextField 
            label={`Neck (${unit === 'metric' ? 'cm' : 'inches'})`} 
            type="number" 
            value={neck || ''} 
            onChange={(e) => setNeck(Number(e.target.value))} 
            fullWidth 
          />
          <TextField 
            label={`Waist (${unit === 'metric' ? 'cm' : 'inches'})`} 
            type="number" 
            value={waist || ''} 
            onChange={(e) => setWaist(Number(e.target.value))} 
            fullWidth 
          />
          {gender === 'female' && (
            <TextField 
              label={`Hip (${unit === 'metric' ? 'cm' : 'inches'})`} 
              type="number" 
              value={hip || ''} 
              onChange={(e) => setHip(Number(e.target.value))} 
              fullWidth 
            />
          )}
        </Box>

        <Button variant="contained" size="large" onClick={calculateBodyFat} fullWidth>
          Calculate Body Fat
        </Button>
      </Box>

      {/* Output Panel */}
      <Box>
        {bodyFat !== null ? (
          <Paper 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              bgcolor: category === 'Obese' ? 'error.light' : category === 'Average' ? 'warning.light' : 'success.light',
              color: 'white',
              borderRadius: 4
            }}
          >
            <Typography variant="h6" sx={{ opacity: 0.9 }}>Your Body Fat Percentage</Typography>
            <Typography variant="h1" sx={{ fontWeight: 800, my: 1 }}>{bodyFat}%</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Category: {category}</Typography>
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Estimated Fat Mass: {((weight * bodyFat) / 100).toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}</Typography>
              <Typography variant="body2">Estimated Lean Mass: {(weight - (weight * bodyFat) / 100).toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}</Typography>
            </Box>
          </Paper>
        ) : (
          <Paper variant="outlined" sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
            <Typography color="text.secondary" align="center">
              Enter your tape measurements and click Calculate to estimate your body fat percentage using the US Navy Method.
            </Typography>
          </Paper>
        )}
      </Box>

    </Box>
  );
};

const BodyFatCalculator = () => {
  const content = (
    <>
      <Typography variant="h2">Free Body Fat Calculator</Typography>
      <Typography variant="body1">
        Estimate your body fat percentage using the US Navy method. All you need is a measuring tape to measure your waist, neck, and (for women) hips. This is one of the most accessible ways to track fat loss beyond just looking at the scale.
      </Typography>
    </>
  );

  return (
    <CalculatorShell
      title="Body Fat Calculator"
      description="Estimate your body fat percentage and lean body mass online using the US Navy tape measure method."
      url="/health/body-fat-calculator"
      content={content}
      category="Health"
    >
      <BodyFatCalculatorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BodyFatCalculator;
