'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SolveFor = 'force' | 'mass' | 'velocity' | 'radius';

const CentripetalForceCalculator = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('force');
  const [mass, setMass] = useState<string>('2');
  const [velocity, setVelocity] = useState<string>('5');
  const [radius, setRadius] = useState<string>('1.5');
  const [force, setForce] = useState<string>('33.33');

  const m = parseFloat(mass);
  const v = parseFloat(velocity);
  const r = parseFloat(radius);
  const f = parseFloat(force);

  let result: number | null = null;
  let formula = '';

  if (solveFor === 'force' && !isNaN(m) && !isNaN(v) && !isNaN(r) && r !== 0) {
    result = (m * v * v) / r;
    formula = `F = m × v² / r = ${m} × ${v}² / ${r} = ${result.toFixed(4)} N`;
  } else if (solveFor === 'mass' && !isNaN(f) && !isNaN(r) && !isNaN(v) && v !== 0) {
    result = (f * r) / (v * v);
    formula = `m = F × r / v² = ${f} × ${r} / ${v}² = ${result.toFixed(4)} kg`;
  } else if (solveFor === 'velocity' && !isNaN(f) && !isNaN(r) && !isNaN(m) && m !== 0 && (f * r) / m >= 0) {
    result = Math.sqrt((f * r) / m);
    formula = `v = √(F × r / m) = √(${f} × ${r} / ${m}) = ${result.toFixed(4)} m/s`;
  } else if (solveFor === 'radius' && !isNaN(m) && !isNaN(v) && !isNaN(f) && f !== 0) {
    result = (m * v * v) / f;
    formula = `r = m × v² / F = ${m} × ${v}² / ${f} = ${result.toFixed(4)} m`;
  }

  const content = (
    <>
      <Typography variant="h2">How to Use the Centripetal Force Calculator</Typography>
      <Typography variant="body1">
        Centripetal force is the net force that keeps an object moving in a circular path, always directed
        toward the center of the circle. This calculator solves for any one of force, mass, velocity, or radius
        given the other two — or three, in the case of solving for force — using the standard circular motion
        formula.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        F = m × v² / r &nbsp;|&nbsp; m = F × r / v² &nbsp;|&nbsp; v = √(F × r / m) &nbsp;|&nbsp; r = m × v² / F
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2 kg object moving at 5 m/s around a circle of radius 1.5 m requires a centripetal force of
        F = 2 × 5² / 1.5 = 2 × 25 / 1.5 ≈ 33.33 newtons directed toward the center of the circle.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Physics coursework covering circular motion and centripetal force.</li>
          <li>Estimating the force a rotating part or object experiences at a given speed and radius.</li>
          <li>Understanding how tighter turns or higher speeds increase the force needed to stay on a circular path.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Force Calculator?</strong> The Force Calculator uses Newton&apos;s second law (F = ma) for straight-line, linear force. This calculator is specifically for objects moving in a circular path, where the force depends on mass, velocity, and the radius of the circle rather than linear acceleration.</li>
          <li><strong>What units does this use?</strong> Standard SI units: mass in kilograms, velocity in meters per second, radius in meters, and force in newtons.</li>
          <li><strong>Why does force increase so much with speed?</strong> Velocity is squared in the formula, so doubling the speed while keeping mass and radius the same quadruples the required centripetal force — this is why tight, high-speed turns require dramatically more force than slower ones.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/centripetal-force-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <ToggleButtonGroup value={solveFor} exclusive onChange={(_, v2) => v2 && setSolveFor(v2)} size="small">
            <ToggleButton value="force">Solve for Force</ToggleButton>
            <ToggleButton value="mass">Solve for Mass</ToggleButton>
            <ToggleButton value="velocity">Solve for Velocity</ToggleButton>
            <ToggleButton value="radius">Solve for Radius</ToggleButton>
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
            {solveFor !== 'radius' && (
              <TextField label="Radius (m)" type="number" fullWidth value={radius} onChange={(e) => setRadius(e.target.value)} onFocus={(e) => e.target.select()} />
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

export default CentripetalForceCalculator;
