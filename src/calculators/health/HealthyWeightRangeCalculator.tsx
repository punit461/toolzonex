'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const HealthyWeightRangeCalculator = () => {
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [cm, setCm] = useState<string>('170');
  const [ft, setFt] = useState<string>('5');
  const [inch, setInch] = useState<string>('7');

  const heightM = useMemo(() => {
    if (unit === 'cm') return (parseFloat(cm) || 0) / 100;
    const totalInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
    return totalInches * 0.0254;
  }, [unit, cm, ft, inch]);

  const result = useMemo(() => {
    if (!heightM || heightM <= 0) return null;
    const minKg = 18.5 * heightM * heightM;
    const maxKg = 24.9 * heightM * heightM;
    return {
      minKg,
      maxKg,
      minLb: minKg * 2.20462,
      maxLb: maxKg * 2.20462,
    };
  }, [heightM]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Healthy Weight Range Calculator</Typography>
      <Typography variant="body1">
        Enter your height and this tool calculates the healthy weight range for that height, based on the
        standard BMI (Body Mass Index) range of 18.5-24.9 that health organizations classify as
        &quot;normal weight.&quot; Instead of giving a single target number, it shows the full span of
        weights that fall inside the healthy BMI band for your exact height.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Min Weight (kg) = 18.5 × Height(m)² &nbsp;&nbsp;|&nbsp;&nbsp; Max Weight (kg) = 24.9 × Height(m)²
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A person who is 170 cm (1.70 m) tall has a healthy weight range of 18.5 × 1.70² = 53.5 kg up to
        24.9 × 1.70² = 72.0 kg — roughly 118 lb to 159 lb. Any weight within that range corresponds to a BMI
        between 18.5 and 24.9.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a realistic target weight range to aim for, rather than a single rigid number.</li>
          <li>Checking whether a current or goal weight falls within the standard healthy BMI band.</li>
          <li>Setting a sensible weight-loss or weight-gain target range with a doctor or trainer.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Ideal Weight Calculator?</strong> The Ideal Weight Calculator uses clinical single-point formulas — Devine, Robinson, and Miller — that each output one specific number based on height and gender, originally developed for medication dosing. This Healthy Weight Range Calculator instead uses the standard BMI classification bands (18.5-24.9 = normal weight) to show a full RANGE of healthy weights for a given height, without factoring in gender at all. They're two different, independently valid methods, and it's normal for their numbers not to match exactly.</li>
          <li><strong>Why is there a range instead of one target number?</strong> Healthy body weight naturally varies by frame size, muscle mass, and build — a single number can't capture that. The BMI-based range gives a wider, more forgiving target band that reflects the reality that many different weights are considered healthy for the same height.</li>
          <li><strong>Does this account for muscle mass or body composition?</strong> No — like all BMI-based methods, this calculator only uses height, so it can't distinguish muscle from fat. A muscular, athletic person may fall above this range while still being lean and healthy, and BMI-based ranges should be treated as a general population guideline rather than a precise individual assessment.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/health/healthy-weight-range-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Height Unit</InputLabel>
            <Select label="Height Unit" value={unit} onChange={(e) => setUnit(e.target.value as 'cm' | 'ft')}>
              <MenuItem value="cm">Centimeters (cm)</MenuItem>
              <MenuItem value="ft">Feet & Inches</MenuItem>
            </Select>
          </FormControl>

          {unit === 'cm' ? (
            <TextField
              label="Height"
              type="number"
              value={cm}
              onChange={(e) => setCm(e.target.value)}
              onFocus={(e) => e.target.select()}
              fullWidth
              InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }}
            />
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Feet" type="number" value={ft} onChange={(e) => setFt(e.target.value)} onFocus={(e) => e.target.select()} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">ft</InputAdornment> }} />
              <TextField label="Inches" type="number" value={inch} onChange={(e) => setInch(e.target.value)} onFocus={(e) => e.target.select()} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">in</InputAdornment> }} />
            </Box>
          )}
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Healthy Weight Range</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">In Kilograms</Typography>
            <Typography variant="h5" fontWeight="bold">
              {result ? `${result.minKg.toFixed(1)} – ${result.maxKg.toFixed(1)} kg` : '—'}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">In Pounds</Typography>
            <Typography variant="h6" fontWeight={700}>
              {result ? `${result.minLb.toFixed(1)} – ${result.maxLb.toFixed(1)} lb` : '—'}
            </Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HealthyWeightRangeCalculator;
