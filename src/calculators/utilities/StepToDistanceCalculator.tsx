'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type StrideMode = 'manual' | 'height';

const STRIDE_RATIO = 0.415;

const StepToDistanceCalculator = () => {
  const [mode, setMode] = useState<StrideMode>('height');
  const [steps, setSteps] = useState<string>('10000');
  const [strideCm, setStrideCm] = useState<string>('75');
  const [heightCm, setHeightCm] = useState<string>('170');

  const { strideLength, distanceKm, distanceMiles, valid } = useMemo(() => {
    const stepCount = parseFloat(steps);
    const stride = mode === 'height'
      ? parseFloat(heightCm) * STRIDE_RATIO
      : parseFloat(strideCm);

    if (isNaN(stepCount) || stepCount < 0 || isNaN(stride) || stride <= 0) {
      return { strideLength: 0, distanceKm: 0, distanceMiles: 0, valid: false };
    }

    const totalCm = stepCount * stride;
    const km = totalCm / 100000;
    const miles = km * 0.621371;
    return { strideLength: stride, distanceKm: km, distanceMiles: miles, valid: true };
  }, [steps, strideCm, heightCm, mode]);

  const content = (
    <>
      <Typography variant="h2">How to Convert Steps to Distance</Typography>
      <Typography variant="body1">
        To turn a step count into a distance, multiply the number of steps by your stride length (the distance
        covered by a single step). If you don&apos;t know your exact stride length, this calculator can estimate
        it from your height using the widely used approximation that stride length is roughly 41.5% of height.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Distance = Steps × Stride Length &nbsp;|&nbsp; Stride Length ≈ Height × 0.415
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Someone who is 170 cm tall has an estimated stride length of 170 × 0.415 ≈ 70.6 cm. Walking 10,000 steps
        at that stride length covers 10,000 × 70.6 cm = 706,000 cm, which is about 7.06 km (roughly 4.39 miles).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a fitness tracker&apos;s step count into a distance walked or run.</li>
          <li>Estimating daily walking distance toward a step-count goal like 10,000 steps.</li>
          <li>Cross-checking a pedometer or phone app when you know your own stride length more precisely.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How accurate is the height-based stride estimate?</Typography>
      <Typography variant="body1">
        The 0.415× height ratio is a widely used average that works reasonably well for typical walking pace,
        but actual stride length varies with leg length, walking speed, and terrain. For a more accurate result,
        measure your own stride length directly and switch to manual entry.
      </Typography>
      <Typography variant="h3">How do I measure my own stride length?</Typography>
      <Typography variant="body1">
        Walk 10 normal steps in a straight line, measure the total distance covered, and divide by 10. Enter
        that value in the manual stride length field for a more personalized distance conversion.
      </Typography>
      <Typography variant="h3">Does running change the stride length?</Typography>
      <Typography variant="body1">
        Yes — running strides are typically longer than walking strides. This calculator&apos;s default estimate
        is tuned for walking pace, so for running distance, measure your running stride length manually and use
        the manual mode instead.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/step-to-distance-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
            <ToggleButton value="height">Estimate Stride from Height</ToggleButton>
            <ToggleButton value="manual">Enter Stride Manually</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
          <Stack spacing={2}>
            <TextField
              label="Number of Steps"
              type="number"
              fullWidth
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            {mode === 'height' ? (
              <TextField
                label="Height (cm)"
                type="number"
                fullWidth
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            ) : (
              <TextField
                label="Stride Length (cm)"
                type="number"
                fullWidth
                value={strideCm}
                onChange={(e) => setStrideCm(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            )}
            {mode === 'height' && valid && (
              <Typography variant="body2" color="text.secondary">
                Estimated stride length: {strideLength.toFixed(1)} cm
              </Typography>
            )}
          </Stack>

          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Distance Walked</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {valid ? `${distanceKm.toFixed(2)} km` : '—'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {valid ? `${distanceMiles.toFixed(2)} miles` : ''}
            </Typography>
          </Paper>
        </Box>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default StepToDistanceCalculator;
