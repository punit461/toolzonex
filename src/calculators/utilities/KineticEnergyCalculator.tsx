'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SolveFor = 'energy' | 'mass' | 'velocity';

const KineticEnergyCalculator = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('energy');
  const [mass, setMass] = useState<string>('2');
  const [velocity, setVelocity] = useState<string>('3');
  const [energy, setEnergy] = useState<string>('9');

  const m = parseFloat(mass);
  const v = parseFloat(velocity);
  const ke = parseFloat(energy);

  let result: number | null = null;
  let formula = '';

  if (solveFor === 'energy' && !isNaN(m) && !isNaN(v)) {
    result = 0.5 * m * v * v;
    formula = `KE = 0.5 × m × v² = 0.5 × ${m} × ${v}² = ${result.toFixed(4)} J`;
  } else if (solveFor === 'mass' && !isNaN(ke) && !isNaN(v) && v !== 0) {
    result = (2 * ke) / (v * v);
    formula = `m = 2 × KE / v² = 2 × ${ke} / ${v}² = ${result.toFixed(4)} kg`;
  } else if (solveFor === 'velocity' && !isNaN(ke) && !isNaN(m) && m > 0 && ke >= 0) {
    result = Math.sqrt((2 * ke) / m);
    formula = `v = √(2 × KE / m) = √(2 × ${ke} / ${m}) = ${result.toFixed(4)} m/s`;
  }

  const content = (
    <>
      <Typography variant="h2">How to Calculate Kinetic Energy</Typography>
      <Typography variant="body1">
        Kinetic energy is the energy an object possesses due to its motion, equal to one-half its mass times
        the square of its velocity. This calculator solves for any one of the three variables — kinetic energy,
        mass, or velocity — given the other two, using standard SI units of kilograms, meters per second, and
        joules.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        KE = 0.5 × m × v² &nbsp;|&nbsp; m = 2KE / v² &nbsp;|&nbsp; v = √(2KE / m)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2 kg object moving at 3 m/s has a kinetic energy of KE = 0.5 × 2 × 3² = 0.5 × 2 × 9 = 9 joules. If you
        instead knew the energy (9 J) and the mass (2 kg), you could solve for velocity: v = √(2 × 9 / 2) = 3 m/s.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Physics homework covering the kinetic energy formula.</li>
          <li>Estimating the impact energy of a moving vehicle or projectile.</li>
          <li>Comparing how much energy is added by increasing speed versus mass.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What units does this calculator use?</Typography>
      <Typography variant="body1">
        Standard SI units: mass in kilograms (kg), velocity in meters per second (m/s), and kinetic energy in
        joules (J), where 1 joule is the energy of a 1 kg object moving in a way that satisfies the formula
        above.
      </Typography>
      <Typography variant="h3">Does the direction of velocity matter?</Typography>
      <Typography variant="body1">
        No — kinetic energy depends on velocity squared, so only the object&apos;s speed (the magnitude of its
        velocity) matters, not its direction. A negative velocity value produces the same kinetic energy as the
        equivalent positive value.
      </Typography>
      <Typography variant="h3">Why does speed matter more than mass for kinetic energy?</Typography>
      <Typography variant="body1">
        Because kinetic energy scales with the square of velocity but only linearly with mass, doubling an
        object&apos;s speed quadruples its kinetic energy, while doubling its mass only doubles it — which is
        why speed has such an outsized effect on impact energy.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/kinetic-energy-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={solveFor} exclusive onChange={(_, v) => v && setSolveFor(v)} size="small">
            <ToggleButton value="energy">Solve for Energy</ToggleButton>
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
            {solveFor !== 'energy' && (
              <TextField label="Kinetic Energy (J)" type="number" fullWidth value={energy} onChange={(e) => setEnergy(e.target.value)} onFocus={(e) => e.target.select()} />
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

export default KineticEnergyCalculator;
