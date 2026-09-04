'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const G = 9.81;
const AIR_DENSITY = 1.225;
const CRR = 0.005;
const CDA = 0.32;
const DRIVETRAIN_EFFICIENCY = 0.975;
const KMH_TO_MS = 1000 / 3600;

const CyclingPowerCalculator = () => {
  const [riderWeight, setRiderWeight] = useState('70');
  const [bikeWeight, setBikeWeight] = useState('9');
  const [speed, setSpeed] = useState('30');
  const [gradient, setGradient] = useState('0');
  const [headwind, setHeadwind] = useState('0');

  const result = useMemo(() => {
    const rider = parseFloat(riderWeight);
    const bike = parseFloat(bikeWeight);
    const spd = parseFloat(speed);
    const grade = parseFloat(gradient);
    const wind = parseFloat(headwind) || 0;

    if ([rider, bike, spd, grade].some((v) => Number.isNaN(v)) || rider <= 0 || bike < 0 || spd <= 0) return null;

    const mass = rider + bike;
    const v = spd * KMH_TO_MS;
    const vRel = Math.max(0, v + wind * KMH_TO_MS);

    const pRolling = CRR * mass * G * v;
    const pGravity = mass * G * (grade / 100) * v;
    const pAero = 0.5 * AIR_DENSITY * CDA * vRel * vRel * v;
    const pTotal = pRolling + pGravity + pAero;
    const pLegs = pTotal / DRIVETRAIN_EFFICIENCY;

    return { pRolling, pGravity, pAero, pTotal, pLegs: Math.max(0, pLegs) };
  }, [riderWeight, bikeWeight, speed, gradient, headwind]);

  const content = (
    <>
      <Typography variant="h2">How Cycling Power Output Is Estimated</Typography>
      <Typography variant="body1">
        Sustaining a given speed on a bike takes power to overcome three physical forces: rolling resistance
        between the tires and the road, aerodynamic drag from the air, and — on a climb or descent — gravity.
        This calculator adds up all three using standard cycling physics formulas and typical default
        coefficients (a rolling resistance coefficient of 0.005 and an effective frontal area, CdA, of
        0.32 m²), then adjusts for a small drivetrain efficiency loss.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        P = [Crr·m·g·v + m·g·(grade/100)·v + ½·ρ·CdA·v_rel²·v] ÷ Drivetrain Efficiency
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 70 kg rider on a 9 kg bike (79 kg total) riding at 30 km/h on flat ground with no wind needs roughly
        200-220 watts, mostly to overcome aerodynamic drag, which grows with the cube of speed. Add a 3% climb
        at the same speed and the required power roughly doubles, since gravity now takes a large share of the
        total.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Estimating the power needed to hold a target speed on a route with a known gradient.</li>
          <li>Comparing how much a headwind or a climb increases the power required versus flat, calm conditions.</li>
          <li>Sanity-checking a power meter reading against a physics-based estimate.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why might my actual power meter reading differ from this estimate?</Typography>
      <Typography variant="body1">
        Real-world power depends heavily on things this simplified model doesn&apos;t measure directly — your
        riding position, bike and wheel aerodynamics, tire pressure and road surface, drivetrain condition, and
        variable wind. This calculator uses reasonable average defaults, so treat the result as a solid
        ballpark rather than an exact figure.
      </Typography>
      <Typography variant="h3">Why does aerodynamic drag matter so much at higher speeds?</Typography>
      <Typography variant="body1">
        Aerodynamic drag power scales with the cube of your speed (roughly), so doubling your speed on flat
        ground can increase the drag component by roughly eightfold — which is why drag dominates the power
        requirement at typical road cycling speeds above about 25-30 km/h.
      </Typography>
      <Typography variant="h3">Can this handle a downhill (negative) gradient?</Typography>
      <Typography variant="body1">
        Yes — enter a negative number for the gradient. On a steep enough descent, the gravity term can turn
        negative and offset rolling resistance and drag entirely, which is why coasting downhill often requires
        no pedaling power at all.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/cycling-power-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Rider Weight" type="number" fullWidth value={riderWeight} onChange={(e) => setRiderWeight(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }} />
          <TextField label="Bike Weight" type="number" fullWidth value={bikeWeight} onChange={(e) => setBikeWeight(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }} />
          <TextField label="Speed" type="number" fullWidth value={speed} onChange={(e) => setSpeed(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">km/h</InputAdornment> } }} />
          <TextField label="Road Gradient" type="number" fullWidth value={gradient} onChange={(e) => setGradient(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} helperText="Use a negative number for a downhill grade." />
          <TextField label="Headwind (optional)" type="number" fullWidth value={headwind} onChange={(e) => setHeadwind(e.target.value)} onFocus={(e) => e.target.select()} slotProps={{ input: { endAdornment: <InputAdornment position="end">km/h</InputAdornment> } }} helperText="Use a negative number for a tailwind." />
        </Stack>

        <Box>
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Estimated Power Required</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {result ? `${Math.round(result.pLegs)} W` : '—'}
            </Typography>
          </Paper>
          {result && (
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Rolling Resistance</Typography>
                <Typography variant="body2" fontWeight={600}>{Math.round(result.pRolling)} W</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Aerodynamic Drag</Typography>
                <Typography variant="body2" fontWeight={600}>{Math.round(result.pAero)} W</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Gradient (Gravity)</Typography>
                <Typography variant="body2" fontWeight={600}>{Math.round(result.pGravity)} W</Typography>
              </Box>
            </Stack>
          )}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CyclingPowerCalculator;
