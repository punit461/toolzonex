'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const getRating = (vo2: number, age: number, gender: string): string => {
  // Simplified norms based on age groups
  const norms: Record<string, Record<string, [number, number, number, number]>> = {
    male: {
      '20-29': [51.4, 44.2, 39.5, 35.0],
      '30-39': [48.8, 42.5, 38.0, 33.5],
      '40-49': [46.8, 41.0, 36.5, 32.0],
      '50-59': [43.9, 38.5, 34.0, 30.0],
      '60-69': [41.0, 36.0, 32.0, 28.0],
    },
    female: {
      '20-29': [43.0, 37.5, 33.0, 29.0],
      '30-39': [40.5, 35.5, 31.5, 27.5],
      '40-49': [38.5, 33.5, 30.0, 26.0],
      '50-59': [36.0, 31.5, 28.0, 24.5],
      '60-69': [34.0, 29.5, 26.0, 22.5],
    },
  };

  const g = gender === 'male' ? 'male' : 'female';
  let ageKey = '20-29';
  if (age < 30) ageKey = '20-29';
  else if (age < 40) ageKey = '30-39';
  else if (age < 50) ageKey = '40-49';
  else if (age < 60) ageKey = '50-59';
  else ageKey = '60-69';

  const brackets = norms[g][ageKey];
  if (vo2 >= brackets[0]) return 'Superior';
  if (vo2 >= brackets[1]) return 'Excellent';
  if (vo2 >= brackets[2]) return 'Good';
  if (vo2 >= brackets[3]) return 'Fair';
  return 'Poor';
};

const Vo2MaxCalculator = () => {
  const [method, setMethod] = useState<'resting' | 'walk'>('resting');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [restingHR, setRestingHR] = useState('60');
  const [walkTime, setWalkTime] = useState('12');
  const [walkHR, setWalkHR] = useState('120');
  const [weightLbs, setWeightLbs] = useState('165');

  const result = useMemo(() => {
    const a = parseFloat(age) || 30;
    let vo2 = 0;

    if (method === 'resting') {
      const rhr = parseFloat(restingHR) || 60;
      const maxHR = 208 - 0.7 * a;
      vo2 = 15.3 * (maxHR / rhr);
    } else {
      const t = parseFloat(walkTime) || 12;
      const hr = parseFloat(walkHR) || 120;
      const w = parseFloat(weightLbs) || 165;
      const g = gender === 'male' ? 1 : 0;
      vo2 = 132.853 - 0.0769 * w - 0.3877 * a + 6.315 * g - 3.2649 * t - 0.1565 * hr;
    }

    const rating = getRating(vo2, a, gender);
    return { vo2: Math.max(0, vo2), rating };
  }, [method, age, gender, restingHR, walkTime, walkHR, weightLbs]);

  const content = (
    <>
      <Typography variant="h2">What is VO2 Max?</Typography>
      <Typography variant="body1">
        VO2 max is the maximum rate at which your body can use oxygen during intense exercise. It is widely considered the gold standard for cardiovascular fitness and aerobic endurance. A higher VO2 max means better oxygen utilization and athletic performance.
      </Typography>

      <Typography variant="h2">How is VO2 Max Estimated?</Typography>
      <Typography variant="body1">
        Two common estimation methods are available:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Resting HR Method: VO2 = 15.3 × (Max HR / Resting HR)<br />
        Max HR = 208 − 0.7 × Age<br /><br />
        1-Mile Walk Method:<br />
        VO2 = 132.853 − 0.0769×W − 0.3877×Age + 6.315×G − 3.2649×Time − 0.1565×HR
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 30-year-old male with a resting heart rate of 60 bpm: Max HR = 208 − 0.7×30 = 187. VO2 max = 15.3 × (187/60) ≈ 47.7 mL/kg/min — rated Excellent for his age group.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing cardiovascular fitness level without expensive lab testing.</li>
          <li>Tracking fitness improvement over time with training.</li>
          <li>Comparing your aerobic capacity to age- and gender-specific norms.</li>
          <li>Setting realistic training goals for endurance sports.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a good VO2 max score?</Typography>
      <Typography variant="body1">
        A "good" VO2 max varies by age and gender. For a 30-year-old male, above 42 mL/kg/min is good and above 48 is excellent. For a 30-year-old female, above 35 is good and above 40 is excellent.
      </Typography>
      <Typography variant="h3">Can I improve my VO2 max?</Typography>
      <Typography variant="body1">
        Yes — consistent aerobic training (running, cycling, swimming) at moderate to high intensity can significantly improve VO2 max, especially in beginners. High-intensity interval training (HIIT) is particularly effective.
      </Typography>
      <Typography variant="h3">Is the resting HR method accurate?</Typography>
      <Typography variant="body1">
        The resting HR method provides a reasonable estimate but is less precise than a laboratory treadmill test. It works best as a quick, non-invasive screening tool to track changes over time.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/vo2-max-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Estimation Method</Typography>
            <ToggleButtonGroup value={method} exclusive onChange={(_, v) => v && setMethod(v)} fullWidth>
              <ToggleButton value="resting">Resting HR</ToggleButton>
              <ToggleButton value="walk">1-Mile Walk</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} fullWidth />
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Gender</Typography>
            <ToggleButtonGroup value={gender} exclusive onChange={(_, v) => v && setGender(v)} fullWidth>
              <ToggleButton value="male">Male</ToggleButton>
              <ToggleButton value="female">Female</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {method === 'resting' ? (
            <TextField label="Resting Heart Rate" type="number" value={restingHR} onChange={(e) => setRestingHR(e.target.value)} slotProps={{ input: { endAdornment: <Typography variant="body2" color="text.secondary">bpm</Typography> } }} fullWidth />
          ) : (
            <>
              <TextField label="1-Mile Walk Time" type="number" value={walkTime} onChange={(e) => setWalkTime(e.target.value)} slotProps={{ input: { endAdornment: <Typography variant="body2" color="text.secondary">minutes</Typography> } }} fullWidth />
              <TextField label="Heart Rate at Finish" type="number" value={walkHR} onChange={(e) => setWalkHR(e.target.value)} slotProps={{ input: { endAdornment: <Typography variant="body2" color="text.secondary">bpm</Typography> } }} fullWidth />
              <TextField label="Body Weight" type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} slotProps={{ input: { endAdornment: <Typography variant="body2" color="text.secondary">lbs</Typography> } }} fullWidth />
            </>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated VO2 Max</Typography>
            <Typography variant="h3" fontWeight="bold">{result.vo2.toFixed(1)} mL/kg/min</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Rating (age {age}, {gender})</Typography>
            <Typography fontWeight={600}>{result.rating}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default Vo2MaxCalculator;
