'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const LeanBodyMassCalculator = () => {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('30');
  const [bodyFat, setBodyFat] = useState('');

  const result = useMemo(() => {
    const h = parseFloat(height) || 0;
    const w = parseFloat(weight) || 0;
    if (h <= 0 || w <= 0) return { lbm: 0, fatMass: 0, bfPercent: 0 };

    const lbm =
      gender === 'male'
        ? 0.407 * w + 0.267 * h - 19.2
        : 0.252 * w + 0.473 * h - 48.3;

    const bfInput = parseFloat(bodyFat);
    const fatMass = !Number.isNaN(bfInput) && bfInput >= 0 ? (bfInput / 100) * w : w - lbm;
    const bfPercent = w > 0 ? (fatMass / w) * 100 : 0;

    return { lbm, fatMass, bfPercent };
  }, [height, weight, gender, age, bodyFat]);

  const healthyRange = (lbm: number, w: number) => {
    if (lbm <= 0 || w <= 0) return '—';
    const pct = (lbm / w) * 100;
    // Rough healthy lean-mass ranges by gender
    return gender === 'male'
      ? `~75–88% of body weight (healthy)`
      : `~68–82% of body weight (healthy)`;
  };

  const content = (
    <>
      <Typography variant="h2">How is Lean Body Mass Calculated?</Typography>
      <Typography variant="body1">
        Lean Body Mass (LBM) is your total body weight minus fat mass — it includes muscle, bone, organs, and water. This calculator uses the Boer formula from height and weight:
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Male: LBM = 0.407 × Weight(kg) + 0.267 × Height(cm) − 19.2<br />
        Female: LBM = 0.252 × Weight(kg) + 0.473 × Height(cm) − 48.3
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 170 cm, 70 kg male: LBM = 0.407 × 70 + 0.267 × 170 − 19.2 ≈ 54.2 kg. If he enters 18% body fat, fat mass = 0.18 × 70 = 12.6 kg, leaving about 57.4 kg of lean tissue — close to the formula-based estimate.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating body composition and tracking muscle gain or fat loss over time.</li>
          <li>Setting a weight target that preserves lean tissue during a cut.</li>
          <li>Estimating the metabolically active tissue mass for nutrition planning.</li>
          <li>Providing a rough baseline before a DEXA scan or bioimpedance test.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a healthy lean body mass?</Typography>
      <Typography variant="body1">
        Healthy lean mass varies with gender, age, and training level. In general, lean body mass is roughly 75–88% of body weight for men and 68–82% for women. Body fat percentages around 10–20% for men and 18–28% for women are commonly considered healthy.
      </Typography>
      <Typography variant="h3">Is the Boer formula accurate?</Typography>
      <Typography variant="body1">
        The Boer formula is a widely used estimation method that works well for average adults, but it is an estimate. Athletes and very muscular or very obese individuals may be underrepresented — the formula does not directly measure body fat. For high precision use DEXA, hydrostatic weighing, or skinfold calipers with a trained professional.
      </Typography>
      <Typography variant="h3">What's the difference between lean body mass and muscle mass?</Typography>
      <Typography variant="body1">
        Lean body mass includes everything that isn't fat — muscle, bone, internal organs, and water. Muscle mass is only a part of that. The two terms are often used loosely interchangeably, but they are not identical.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/lean-body-mass-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>Gender</Typography>
            <ToggleButtonGroup value={gender} exclusive onChange={(_, v) => v && setGender(v)} fullWidth>
              <ToggleButton value="male">Male</ToggleButton>
              <ToggleButton value="female">Female</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <TextField label="Height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }} fullWidth />
          <TextField label="Weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }} fullWidth />
          <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">years</InputAdornment> } }} fullWidth />
          <TextField label="Body Fat % (optional)" type="number" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Lean Body Mass (Boer)</Typography>
            <Typography variant="h3" fontWeight="bold">{result.lbm.toFixed(1)} kg</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Fat Mass</Typography>
            <Typography fontWeight={600}>{result.fatMass.toFixed(1)} kg</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Body Fat %</Typography>
            <Typography fontWeight={600}>{result.bfPercent.toFixed(1)}%</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Healthy Range Reference</Typography>
            <Typography fontWeight={600} textAlign="right">{healthyRange(result.lbm, parseFloat(weight) || 0)}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default LeanBodyMassCalculator;
