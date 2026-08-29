'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SolveFor = 'force' | 'mass' | 'acceleration';

const ForceCalculator = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('force');
  const [mass, setMass] = useState<string>('10');
  const [acceleration, setAcceleration] = useState<string>('2');
  const [force, setForce] = useState<string>('20');

  const m = parseFloat(mass);
  const a = parseFloat(acceleration);
  const f = parseFloat(force);

  let result: number | null = null;
  let formula = '';

  if (solveFor === 'force' && !isNaN(m) && !isNaN(a)) {
    result = m * a;
    formula = `F = m × a = ${m} × ${a} = ${result.toFixed(4)} N`;
  } else if (solveFor === 'mass' && !isNaN(f) && !isNaN(a) && a !== 0) {
    result = f / a;
    formula = `m = F / a = ${f} / ${a} = ${result.toFixed(4)} kg`;
  } else if (solveFor === 'acceleration' && !isNaN(f) && !isNaN(m) && m !== 0) {
    result = f / m;
    formula = `a = F / m = ${f} / ${m} = ${result.toFixed(4)} m/s²`;
  }

  const content = (
    <>
      <Typography variant="h2">How to Calculate Force (F = ma)</Typography>
      <Typography variant="body1">
        Newton&apos;s second law states that force equals mass times acceleration. This calculator solves for
        any one of the three variables — force, mass, or acceleration — given the other two, using standard SI
        units of kilograms, meters per second squared, and newtons.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        F = m × a &nbsp;&nbsp;|&nbsp;&nbsp; m = F / a &nbsp;&nbsp;|&nbsp;&nbsp; a = F / m
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10 kg object accelerating at 2 m/s² requires a force of F = 10 × 2 = 20 newtons. If you instead knew
        the force (20 N) and the mass (10 kg), you could solve for acceleration: a = 20 / 10 = 2 m/s².
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Physics homework applying Newton&apos;s second law of motion.</li>
          <li>Estimating the force needed to accelerate an object of known mass.</li>
          <li>Engineering calculations involving force, mass, and acceleration relationships.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What units does this calculator use?</Typography>
      <Typography variant="body1">
        Standard SI units: mass in kilograms (kg), acceleration in meters per second squared (m/s²), and force
        in newtons (N), where 1 newton is the force needed to accelerate 1 kg at 1 m/s².
      </Typography>
      <Typography variant="h3">Does this account for gravity or friction?</Typography>
      <Typography variant="body1">
        No — this calculates the net force from Newton&apos;s second law directly. To find weight (the force of
        gravity on an object), use mass × 9.8 m/s² as the acceleration. Friction or other opposing forces would
        need to be added or subtracted separately.
      </Typography>
      <Typography variant="h3">Can mass or acceleration be zero?</Typography>
      <Typography variant="body1">
        Mass being zero would make force zero regardless of acceleration, and solving for mass or acceleration
        requires dividing by the other value, so that value can&apos;t be zero in those cases.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/force-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={solveFor} exclusive onChange={(_, v) => v && setSolveFor(v)} size="small">
            <ToggleButton value="force">Solve for Force</ToggleButton>
            <ToggleButton value="mass">Solve for Mass</ToggleButton>
            <ToggleButton value="acceleration">Solve for Acceleration</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            {solveFor !== 'mass' && (
              <TextField label="Mass (kg)" type="number" fullWidth value={mass} onChange={(e) => setMass(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {solveFor !== 'acceleration' && (
              <TextField label="Acceleration (m/s²)" type="number" fullWidth value={acceleration} onChange={(e) => setAcceleration(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {solveFor !== 'force' && (
              <TextField label="Force (N)" type="number" fullWidth value={force} onChange={(e) => setForce(e.target.value)} onFocus={(e) => e.target.select()} />
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

export default ForceCalculator;
