'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, ToggleButtonGroup, ToggleButton } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BodyFrameSizeCalculator = () => {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [height, setHeight] = useState<string>('165');
  const [wrist, setWrist] = useState<string>('15.5');

  const { ratio, frame } = useMemo(() => {
    const h = parseFloat(height) || 0;
    const w = parseFloat(wrist) || 0;
    if (h <= 0 || w <= 0) return { ratio: 0, frame: '' };

    const heightCm = unit === 'cm' ? h : h * 2.54;
    const wristCm = unit === 'cm' ? w : w * 2.54;

    const r = heightCm / wristCm;

    let f = '';
    if (gender === 'female') {
      if (r > 10.9) f = 'Small';
      else if (r >= 9.9) f = 'Medium';
      else f = 'Large';
    } else {
      if (r > 10.4) f = 'Small';
      else if (r >= 9.6) f = 'Medium';
      else f = 'Large';
    }

    return { ratio: r, frame: f };
  }, [gender, unit, height, wrist]);

  const content = (
    <>
      <Typography variant="h2">How to Use the Body Frame Size Calculator</Typography>
      <Typography variant="body1">
        Enter your height and wrist circumference, and select your gender. This calculator uses the standard{' '}
        <strong>height-to-wrist ratio method</strong> — dividing your height by your wrist circumference (both
        in the same unit) — to classify your body frame as small, medium, or large. Frame size is commonly used
        alongside height and weight to refine ideal-weight and body-composition estimates, since a larger
        skeletal frame naturally carries more healthy weight than a smaller one at the same height.
      </Typography>

      <Typography variant="h2">The Ratio Thresholds</Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Women — Small: ratio &gt; 10.9 · Medium: 9.9–10.9 · Large: ratio &lt; 9.9<br />
        Men — Small: ratio &gt; 10.4 · Medium: 9.6–10.4 · Large: ratio &lt; 9.6
      </Box>
      <Typography variant="body1">
        A higher ratio means your wrist is relatively small compared to your height, indicating a smaller
        skeletal frame; a lower ratio means a proportionally thicker wrist and a larger frame.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A woman who is 165 cm tall with a 15.5 cm wrist has a ratio of 165 ÷ 15.5 ≈ 10.6, which falls in the
        Medium frame category (between 9.9 and 10.9).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Refining an ideal-weight estimate by accounting for skeletal frame size.</li>
          <li>Understanding why two people of the same height can have very different healthy weight ranges.</li>
          <li>General fitness and body-composition awareness alongside BMI or body-fat measurements.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I measure my wrist circumference?</Typography>
      <Typography variant="body1">
        Wrap a soft measuring tape around your wrist just below the wrist bone (where a watch would sit) and
        note the circumference in centimeters or inches, keeping the tape snug but not tight.
      </Typography>
      <Typography variant="h3">Is there a wrist-only method that doesn't need height?</Typography>
      <Typography variant="body1">
        Yes — some charts classify frame size from wrist circumference alone using fixed height-based ranges
        (for example, for women over 5'5", under 6 inches is small, 6-6.25 inches is medium, and over 6.25
        inches is large). This calculator uses the more precise height-to-wrist ratio method instead, which
        adjusts continuously for your exact height rather than a fixed height bracket.
      </Typography>
      <Typography variant="h3">Is this a medical measurement?</Typography>
      <Typography variant="body1">
        No — body frame size is a general fitness reference, not a diagnostic or medical measurement. It's best
        used as one input alongside other health metrics, not as a standalone health assessment.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/body-frame-size-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Gender</Typography>
            <ToggleButtonGroup
              color="primary"
              value={gender}
              exclusive
              onChange={(_, value) => { if (value) setGender(value); }}
              size="small"
            >
              <ToggleButton value="female" sx={{ px: 2 }}>Female</ToggleButton>
              <ToggleButton value="male" sx={{ px: 2 }}>Male</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>Unit</Typography>
            <ToggleButtonGroup
              color="primary"
              value={unit}
              exclusive
              onChange={(_, value) => { if (value) setUnit(value); }}
              size="small"
            >
              <ToggleButton value="cm" sx={{ px: 2 }}>cm</ToggleButton>
              <ToggleButton value="in" sx={{ px: 2 }}>inches</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <TextField
            label="Height"
            fullWidth
            type="number"
            onFocus={(e) => e.target.select()}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">{unit}</InputAdornment> } }}
          />

          <TextField
            label="Wrist Circumference"
            fullWidth
            type="number"
            onFocus={(e) => e.target.select()}
            value={wrist}
            onChange={(e) => setWrist(e.target.value)}
            slotProps={{ input: { endAdornment: <InputAdornment position="end">{unit}</InputAdornment> } }}
          />
        </Box>

        <Box>
          <Paper sx={{ p: 4, bgcolor: 'action.hover', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>Body Frame Size</Typography>
            <Typography variant="h1" sx={{ fontWeight: 900, fontSize: '3rem', color: 'primary.main', my: 2 }}>
              {frame || '—'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {ratio ? `Height-to-wrist ratio: ${ratio.toFixed(2)}` : 'Enter height and wrist to see your ratio'}
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BodyFrameSizeCalculator;
