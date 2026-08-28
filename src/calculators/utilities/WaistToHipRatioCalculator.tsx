'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Stack,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const WaistToHipRatioCalculator = () => {
  const [waist, setWaist] = useState<string>('');
  const [waistUnit, setWaistUnit] = useState<string>('cm');
  const [hip, setHip] = useState<string>('');
  const [hipUnit, setHipUnit] = useState<string>('cm');
  const [gender, setGender] = useState<string>('female');

  const result = useMemo(() => {
    const w = Number(waist);
    const h = Number(hip);
    if (!w || !h || w <= 0 || h <= 0) return null;

    const waistCm = waistUnit === 'in' ? w * 2.54 : w;
    const hipCm = hipUnit === 'in' ? h * 2.54 : h;
    const ratio = waistCm / hipCm;

    let level: string;
    let color: string;
    let range: string;
    if (gender === 'female') {
      if (ratio < 0.8) { level = 'Low Risk'; color = 'success.main'; range = 'Below 0.80'; }
      else if (ratio <= 0.85) { level = 'Moderate Risk'; color = 'warning.main'; range = '0.80 – 0.85'; }
      else { level = 'High Risk'; color = 'error.main'; range = 'Above 0.85'; }
    } else {
      if (ratio < 0.9) { level = 'Low Risk'; color = 'success.main'; range = 'Below 0.90'; }
      else if (ratio <= 0.99) { level = 'Moderate Risk'; color = 'warning.main'; range = '0.90 – 0.99'; }
      else { level = 'High Risk'; color = 'error.main'; range = '1.00 and above'; }
    }

    return { waistCm, hipCm, ratio, level, color, range };
  }, [waist, hip, waistUnit, hipUnit, gender]);

  const content = (
    <>
      <Typography variant="h2">How is Waist to Hip Ratio Calculated?</Typography>
      <Typography variant="body1">
        The waist-to-hip ratio (WHR) is a quick measure of body fat distribution. It is simply your waist
        circumference divided by your hip circumference: WHR = waist / hip. A higher ratio means more fat
        is carried around the waist (an "apple" shape), which is linked to a higher risk of heart disease
        and type 2 diabetes compared with fat carried around the hips ("pear" shape).
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a woman with a 70 cm waist and 100 cm hips, WHR = 70 / 100 = 0.70, which is in the low-risk
        range. For a man with a 92 cm waist and 95 cm hips, WHR = 92 / 95 ≈ 0.97, which is in the
        moderate-risk range.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Assessing body fat distribution as part of routine health screening.</li>
          <li>Tracking progress during weight-loss or fitness programs.</li>
          <li>Complementing BMI, which does not account for where fat is stored.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is the ideal waist-to-hip ratio?</Typography>
      <Typography variant="body1">
        Generally, a ratio below 0.80 for women and below 0.90 for men is considered low risk. Ratios above
        0.85 for women and 0.99 for men are associated with higher cardiometabolic risk.
      </Typography>
      <Typography variant="h3">Is WHR better than BMI?</Typography>
      <Typography variant="body1">
        WHR and BMI measure different things. BMI estimates overall body fat relative to height, while WHR
        describes where fat is distributed. A normal BMI does not rule out excess abdominal fat, so the two
        are best used together.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/waist-to-hip-ratio-calculator" content={content}>
      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Waist"
                type="number"
                fullWidth
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Waist Unit</InputLabel>
                <Select value={waistUnit} label="Waist Unit" onChange={(e) => setWaistUnit(e.target.value)}>
                  <MenuItem value="cm">cm</MenuItem>
                  <MenuItem value="in">in</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Hip"
                type="number"
                fullWidth
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Hip Unit</InputLabel>
                <Select value={hipUnit} label="Hip Unit" onChange={(e) => setHipUnit(e.target.value)}>
                  <MenuItem value="cm">cm</MenuItem>
                  <MenuItem value="in">in</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select value={gender} label="Gender" onChange={(e) => setGender(e.target.value)}>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Waist to Hip Ratio</Typography>
                <Typography variant="h4" fontWeight={700}>{result.ratio.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Healthy Range ({gender === 'female' ? 'Female' : 'Male'})</Typography>
                <Typography variant="h6" fontWeight={700}>{result.range}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">Health Risk Level</Typography>
                <Typography variant="h6" fontWeight={700} color={result.color}>{result.level}</Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WaistToHipRatioCalculator;
