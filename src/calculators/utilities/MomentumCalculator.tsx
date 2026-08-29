'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SolveFor = 'momentum' | 'mass' | 'velocity';

const MomentumCalculator = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('momentum');
  const [mass, setMass] = useState<string>('5');
  const [velocity, setVelocity] = useState<string>('4');
  const [momentum, setMomentum] = useState<string>('20');

  const m = parseFloat(mass);
  const v = parseFloat(velocity);
  const p = parseFloat(momentum);

  let result: number | null = null;
  let formula = '';

  if (solveFor === 'momentum' && !isNaN(m) && !isNaN(v)) {
    result = m * v;
    formula = `p = m × v = ${m} × ${v} = ${result.toFixed(4)} kg·m/s`;
  } else if (solveFor === 'mass' && !isNaN(p) && !isNaN(v) && v !== 0) {
    result = p / v;
    formula = `m = p / v = ${p} / ${v} = ${result.toFixed(4)} kg`;
  } else if (solveFor === 'velocity' && !isNaN(p) && !isNaN(m) && m !== 0) {
    result = p / m;
    formula = `v = p / m = ${p} / ${m} = ${result.toFixed(4)} m/s`;
  }

  const content = (
    <>
      <Typography variant="h2">How to Calculate Momentum</Typography>
      <Typography variant="body1">
        Momentum is the product of an object&apos;s mass and its velocity. This calculator solves for any one
        of the three variables — momentum, mass, or velocity — given the other two, using standard SI units of
        kilograms, meters per second, and kilogram-meters per second.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        p = m × v &nbsp;|&nbsp; m = p / v &nbsp;|&nbsp; v = p / m
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 5 kg object moving at 4 m/s has a momentum of p = 5 × 4 = 20 kg·m/s. If you instead knew the momentum
        (20 kg·m/s) and the mass (5 kg), you could solve for velocity: v = 20 / 5 = 4 m/s.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Physics homework involving linear momentum and collisions.</li>
          <li>Comparing the momentum of objects with different masses and speeds.</li>
          <li>Setting up conservation-of-momentum problems for a collision or explosion scenario.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What units does this calculator use?</Typography>
      <Typography variant="body1">
        Standard SI units: mass in kilograms (kg), velocity in meters per second (m/s), and momentum in
        kilogram-meters per second (kg·m/s).
      </Typography>
      <Typography variant="h3">Is momentum the same as kinetic energy?</Typography>
      <Typography variant="body1">
        No — momentum (p = m × v) scales linearly with velocity, while kinetic energy (KE = 0.5 × m × v²) scales
        with velocity squared. Two objects can have the same momentum but different kinetic energy, or vice
        versa, if their masses and speeds differ in the right way.
      </Typography>
      <Typography variant="h3">Can momentum be negative?</Typography>
      <Typography variant="body1">
        Yes — momentum is a vector quantity, so its sign reflects direction. A negative velocity (moving in the
        opposite direction of your chosen positive direction) produces a negative momentum value, which matters
        when adding up momentum across multiple objects.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/momentum-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={solveFor} exclusive onChange={(_, v) => v && setSolveFor(v)} size="small">
            <ToggleButton value="momentum">Solve for Momentum</ToggleButton>
            <ToggleButton value="mass">Solve for Mass</ToggleButton>
            <ToggleButton value="velocity">Solve for Velocity</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            {solveFor !== 'mass' && (
              <TextField label="Mass (kg)" type="number" fullWidth value={mass} onChange={(e) => setMass(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {solveFor !== 'velocity' && (
              <TextField label="Velocity (m/s)" type="number" fullWidth value={velocity} onChange={(e) => setVelocity(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {solveFor !== 'momentum' && (
              <TextField label="Momentum (kg·m/s)" type="number" fullWidth value={momentum} onChange={(e) => setMomentum(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
          </Stack>
        </Paper>

        {result !== null && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Typography variant="h6" gutterBottom>Result</Typography>
            <Typography variant="h4" color="primary" fontWeight={700}>{result.toFixed(4)}</Typography>
            <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>{formula}</Typography>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default MomentumCalculator;
