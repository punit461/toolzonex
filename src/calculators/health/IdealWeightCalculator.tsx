'use client';

import { useState, useMemo } from 'react';
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

const IdealWeightCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const [cm, setCm] = useState<string>('175');
  const [ft, setFt] = useState<string>('5');
  const [inch, setInch] = useState<string>('9');
  const [age, setAge] = useState<string>('30');

  const inches = useMemo(() => {
    if (unit === 'cm') return (parseFloat(cm) || 0) / 2.54;
    return (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
  }, [unit, cm, ft, inch]);

  const results = useMemo(() => {
    const over = inches - 60;
    const devine = gender === 'male' ? 50 + 2.3 * over : 45.5 + 2.3 * over;
    const robinson = gender === 'male' ? 52 + 1.9 * over : 49 + 1.7 * over;
    const miller = gender === 'male' ? 56.2 + 1.41 * over : 53.1 + 1.36 * over;
    return {
      devine: Math.round(devine * 10) / 10,
      robinson: Math.round(robinson * 10) / 10,
      miller: Math.round(miller * 10) / 10,
    };
  }, [gender, inches]);

  const content = (
    <>
      <Typography variant="h2">How to use?</Typography>
      <Typography variant="body1">
        Enter your gender, height, and age. The calculator estimates your ideal body
        weight using three established medical formulas — Devine, Robinson, and
        Miller — so you can compare different clinical references.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5'9" (69 inches) male: Devine = 50 + 2.3 × 9 = 70.7 kg, Robinson ≈ 67.1 kg,
        Miller ≈ 76.3 kg.
      </Typography>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Which formula is most accurate?</strong> All three are estimates; Devine is the most widely used in clinical dosing, while Robinson and Miller tend to produce slightly lower/higher values.</li>
          <li><strong>Does age change the result?</strong> These classic formulas use height and gender. Age is recorded for context but does not alter the standard calculation.</li>
        </ul>
      </Box>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting realistic fitness and weight goals.</li>
          <li>Clinical reference for medication dosing.</li>
          <li>Tracking progress toward a healthy weight range.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/health/ideal-weight-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

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
              fullWidth
              InputProps={{ endAdornment: <InputAdornment position="end">cm</InputAdornment> }}
            />
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label="Feet" type="number" value={ft} onChange={(e) => setFt(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">ft</InputAdornment> }} />
              <TextField label="Inches" type="number" value={inch} onChange={(e) => setInch(e.target.value)} fullWidth InputProps={{ endAdornment: <InputAdornment position="end">in</InputAdornment> }} />
            </Box>
          )}

          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
            InputProps={{ endAdornment: <InputAdornment position="end">Yr</InputAdornment> }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>Ideal Weight</Typography>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">Devine</Typography>
            <Typography variant="h6" fontWeight="bold">{results.devine} kg</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'secondary.main', color: 'white', mb: 2 }}>
            <Typography variant="h6">Robinson</Typography>
            <Typography variant="h6" fontWeight="bold">{results.robinson} kg</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'action.hover' }}>
            <Typography variant="h6">Miller</Typography>
            <Typography variant="h6" fontWeight="bold">{results.miller} kg</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default IdealWeightCalculator;
