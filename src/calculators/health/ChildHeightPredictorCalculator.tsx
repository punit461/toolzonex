'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const cmToFtIn = (cm: number) => {
  const totalInches = cm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inch = Math.round(totalInches % 12);
  return `${ft}'${inch}"`;
};

const ChildHeightPredictorCalculator = () => {
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [sex, setSex] = useState<'boy' | 'girl'>('boy');

  const [motherCm, setMotherCm] = useState<string>('163');
  const [motherFt, setMotherFt] = useState<string>('5');
  const [motherIn, setMotherIn] = useState<string>('4');

  const [fatherCm, setFatherCm] = useState<string>('178');
  const [fatherFt, setFatherFt] = useState<string>('5');
  const [fatherIn, setFatherIn] = useState<string>('10');

  const { predictedCm, rangeLowCm, rangeHighCm } = useMemo(() => {
    const mCm = heightUnit === 'cm'
      ? parseFloat(motherCm) || 0
      : ((parseFloat(motherFt) || 0) * 12 + (parseFloat(motherIn) || 0)) * 2.54;
    const fCm = heightUnit === 'cm'
      ? parseFloat(fatherCm) || 0
      : ((parseFloat(fatherFt) || 0) * 12 + (parseFloat(fatherIn) || 0)) * 2.54;

    if (mCm <= 0 || fCm <= 0) return { predictedCm: 0, rangeLowCm: 0, rangeHighCm: 0 };

    const predicted = sex === 'boy' ? (mCm + fCm + 13) / 2 : (mCm + fCm - 13) / 2;

    return {
      predictedCm: predicted,
      rangeLowCm: predicted - 10,
      rangeHighCm: predicted + 10,
    };
  }, [heightUnit, sex, motherCm, motherFt, motherIn, fatherCm, fatherFt, fatherIn]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Child Height Predictor</Typography>
      <Typography variant="body1">
        Enter both parents' heights and select the child's sex to get a statistical prediction of their adult
        height. This calculator uses the widely cited <strong>mid-parental height formula</strong>: for boys,{' '}
        <strong>(mother's height + father's height + 13 cm) ÷ 2</strong>; for girls,{' '}
        <strong>(mother's height + father's height − 13 cm) ÷ 2</strong>. The 13 cm adjustment accounts for the
        average height difference between adult men and women.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        For a mother who is 163 cm and a father who is 178 cm, a son's predicted adult height is
        (163 + 178 + 13) ÷ 2 = 177 cm, while a daughter's predicted adult height is (163 + 178 − 13) ÷ 2 = 164 cm.
        Both estimates carry a typical margin of error of roughly ±10 cm either way.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough, statistical sense of a child's likely adult height range.</li>
          <li>Satisfying curiosity about family height patterns.</li>
          <li>Providing a talking point for a discussion with a pediatrician about growth tracking.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is the mid-parental height formula?</Typography>
      <Typography variant="body1">
        This is a <strong>statistical estimate, not a guarantee</strong> — the typical margin of error is
        roughly ±10 cm (about ±4 inches) around the predicted value, meaning the true adult height usually
        falls somewhere within that wider range rather than landing exactly on the single predicted number. The
        formula captures the general genetic tendency toward parental height but cannot account for individual
        genetics, nutrition, childhood illness, hormonal factors, or overall health during growth years — all
        of which can meaningfully shift a child's actual adult height above or below this estimate.
      </Typography>
      <Typography variant="h3">What is the 13 cm adjustment for?</Typography>
      <Typography variant="body1">
        It corrects for the average height gap between adult men and women (roughly 13 cm), so the formula adds
        it for boys and subtracts it for girls before averaging both parents' heights.
      </Typography>
      <Typography variant="h3">Should I use this instead of a pediatrician's growth chart?</Typography>
      <Typography variant="body1">
        No — this tool is for general interest and rough estimation only. A pediatrician tracks your child's
        actual growth against standardized growth charts over time, which is a far more reliable way to monitor
        healthy development than a one-time genetic estimate like this.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/child-height-predictor" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Child's Sex</Typography>
            <ToggleButtonGroup
              color="primary"
              value={sex}
              exclusive
              onChange={(_, value) => { if (value) setSex(value); }}
              size="small"
            >
              <ToggleButton value="boy" sx={{ px: 2 }}>Boy</ToggleButton>
              <ToggleButton value="girl" sx={{ px: 2 }}>Girl</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Height Unit</Typography>
            <ToggleButtonGroup
              color="primary"
              value={heightUnit}
              exclusive
              onChange={(_, value) => { if (value) setHeightUnit(value); }}
              size="small"
            >
              <ToggleButton value="cm" sx={{ px: 2 }}>cm</ToggleButton>
              <ToggleButton value="ft" sx={{ px: 2 }}>ft/in</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography gutterBottom>Mother's Height</Typography>
            {heightUnit === 'cm' ? (
              <TextField
                fullWidth
                type="number"
                onFocus={(e) => e.target.select()}
                value={motherCm}
                onChange={(e) => setMotherCm(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }}
              />
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth type="number" value={motherFt} onChange={(e) => setMotherFt(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} />
                <TextField fullWidth type="number" value={motherIn} onChange={(e) => setMotherIn(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} />
              </Box>
            )}
          </Box>

          <Box>
            <Typography gutterBottom>Father's Height</Typography>
            {heightUnit === 'cm' ? (
              <TextField
                fullWidth
                type="number"
                onFocus={(e) => e.target.select()}
                value={fatherCm}
                onChange={(e) => setFatherCm(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }}
              />
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField fullWidth type="number" value={fatherFt} onChange={(e) => setFatherFt(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">ft</InputAdornment> } }} />
                <TextField fullWidth type="number" value={fatherIn} onChange={(e) => setFatherIn(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">in</InputAdornment> } }} />
              </Box>
            )}
          </Box>
        </Box>

        <Box>
          <Paper sx={{ p: 4, bgcolor: 'action.hover', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Predicted Adult Height</Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '3.5rem', color: 'primary.main', my: 2 }}>
              {predictedCm ? `${predictedCm.toFixed(1)} cm` : '—'}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              {predictedCm ? cmToFtIn(predictedCm) : '—'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Likely range: {predictedCm ? `${rangeLowCm.toFixed(0)}–${rangeHighCm.toFixed(0)} cm` : '—'}
              {predictedCm ? ` (${cmToFtIn(rangeLowCm)}–${cmToFtIn(rangeHighCm)})` : ''}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ChildHeightPredictorCalculator;
