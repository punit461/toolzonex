'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState<string>('100');
  const [reps, setReps] = useState<string>('5');
  const [unit, setUnit] = useState<string>('kg');

  const { epley, brzycki, lander, avg } = useMemo(() => {
    const w = parseFloat(weight) || 0;
    const r = parseFloat(reps) || 0;
    const e = r > 0 ? w * (1 + r / 30) : w;
    const b = r < 37 ? (w * 36) / (37 - r) : w;
    const l = r < 37.8 ? (w * 100) / (101.3 - 2.67123 * r) : w;
    return { epley: e, brzycki: b, lander: l, avg: (e + b + l) / 3 };
  }, [weight, reps]);

  const content = (
    <>
      <Typography variant="h2">What is a one rep max calculator?</Typography>
      <Typography variant="body1">
        A one-rep-max (1RM) calculator estimates the maximum weight you could lift for a single repetition,
        based on a submaximal set (a weight you lifted for several reps). It&apos;s the standard way to track
        strength without risking a max-out attempt.
      </Typography>

      <Typography variant="h2">Formulas</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Epley: w × (1 + r/30)
        <br />
        Brzycki: w × 36 / (37 − r)
        <br />
        Lander: w × 100 / (101.3 − 2.67123 × r)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Lifting 100&nbsp;kg for 5 reps gives an estimated 1RM of about 112–117&nbsp;kg depending on the formula
        (Brzycki 112.5, Lander 113.7, Epley 116.7) — a useful target for programming your next training block.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Setting training weights as percentages of 1RM.</li>
          <li>Tracking strength progress over time.</li>
          <li>Planning progressive-overload programs safely.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Which formula should I trust?</Typography>
      <Typography variant="body1">
        The three formulas agree closely for lower rep counts (1–5). They diverge as reps rise, so the
        average shown here gives a balanced estimate — treat it as approximate.
      </Typography>
      <Typography variant="h3">Are these estimates accurate?</Typography>
      <Typography variant="body1">
        They&apos;re good ballpark figures but not a substitute for a tested max. Always use conservative
        loads when training near your estimated 1RM.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/one-rep-max-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="orm-unit">Unit</InputLabel>
            <Select labelId="orm-unit" label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <MenuItem value="kg">Kilograms (kg)</MenuItem>
              <MenuItem value="lbs">Pounds (lbs)</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Weight Lifted"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">{unit}</InputAdornment> } }}
            fullWidth
          />
          <TextField
            label="Reps Performed"
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">reps</InputAdornment> } }}
            fullWidth
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="600" mb={2}>
            Estimated 1RM
          </Typography>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6">Epley</Typography>
            <Typography variant="h6" fontWeight="bold">{epley.toFixed(1)} {unit}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Brzycki</Typography>
            <Typography variant="h6" fontWeight="bold">{brzycki.toFixed(1)} {unit}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Lander</Typography>
            <Typography variant="h6" fontWeight="bold">{lander.toFixed(1)} {unit}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Average</Typography>
            <Typography variant="h6" fontWeight="bold">{avg.toFixed(1)} {unit}</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default OneRepMaxCalculator;
