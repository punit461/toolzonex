'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SolveFor = 'energy' | 'mass' | 'height';

const PotentialEnergyCalculator = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('energy');
  const [mass, setMass] = useState<string>('10');
  const [height, setHeight] = useState<string>('5');
  const [gravity, setGravity] = useState<string>('9.8');
  const [energy, setEnergy] = useState<string>('490');

  const m = parseFloat(mass);
  const h = parseFloat(height);
  const g = parseFloat(gravity);
  const pe = parseFloat(energy);

  let result: number | null = null;
  let formula = '';

  if (solveFor === 'energy' && !isNaN(m) && !isNaN(h) && !isNaN(g)) {
    result = m * g * h;
    formula = `PE = m × g × h = ${m} × ${g} × ${h} = ${result.toFixed(4)} J`;
  } else if (solveFor === 'mass' && !isNaN(pe) && !isNaN(g) && !isNaN(h) && g !== 0 && h !== 0) {
    result = pe / (g * h);
    formula = `m = PE / (g × h) = ${pe} / (${g} × ${h}) = ${result.toFixed(4)} kg`;
  } else if (solveFor === 'height' && !isNaN(pe) && !isNaN(m) && !isNaN(g) && m !== 0 && g !== 0) {
    result = pe / (m * g);
    formula = `h = PE / (m × g) = ${pe} / (${m} × ${g}) = ${result.toFixed(4)} m`;
  }

  const content = (
    <>
      <Typography variant="h2">How to Calculate Gravitational Potential Energy</Typography>
      <Typography variant="body1">
        Gravitational potential energy is the energy an object has because of its height above a reference
        point, equal to its mass times the gravitational acceleration times its height. This calculator solves
        for any one of potential energy, mass, or height given the other two, using standard SI units.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        PE = m × g × h &nbsp;|&nbsp; m = PE / (g × h) &nbsp;|&nbsp; h = PE / (m × g)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 10 kg object held 5 meters above the ground has a potential energy of PE = 10 × 9.8 × 5 = 490 joules,
        using Earth&apos;s standard gravitational acceleration of 9.8 m/s². On the Moon (g ≈ 1.62 m/s²), the same
        object at the same height would have far less potential energy: 10 × 1.62 × 5 = 81 joules.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Physics homework covering gravitational potential energy.</li>
          <li>Estimating the energy released when an object falls from a given height.</li>
          <li>Comparing potential energy under different gravitational accelerations, such as other planets.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why is gravity adjustable?</Typography>
      <Typography variant="body1">
        Earth&apos;s standard gravity (9.8 m/s², sometimes rounded to 9.81) is the default, but gravitational
        acceleration differs elsewhere — about 1.62 m/s² on the Moon and 3.71 m/s² on Mars — so making it
        adjustable lets you calculate potential energy anywhere.
      </Typography>
      <Typography variant="h3">What reference point does height use?</Typography>
      <Typography variant="body1">
        Height is measured relative to whatever reference point you choose, such as the ground or a table
        surface — potential energy is always relative, so what matters is the height difference between the
        object&apos;s position and that reference point.
      </Typography>
      <Typography variant="h3">How is this related to kinetic energy?</Typography>
      <Typography variant="body1">
        As an object falls, its potential energy converts into kinetic energy. Ignoring air resistance, the
        potential energy lost equals the kinetic energy gained, which is the basis of the conservation of
        mechanical energy in physics.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/potential-energy-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={solveFor} exclusive onChange={(_, v) => v && setSolveFor(v)} size="small">
            <ToggleButton value="energy">Solve for Energy</ToggleButton>
            <ToggleButton value="mass">Solve for Mass</ToggleButton>
            <ToggleButton value="height">Solve for Height</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            {solveFor !== 'mass' && (
              <TextField label="Mass (kg)" type="number" fullWidth value={mass} onChange={(e) => setMass(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {solveFor !== 'height' && (
              <TextField label="Height (m)" type="number" fullWidth value={height} onChange={(e) => setHeight(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            <TextField label="Gravity (m/s²)" type="number" fullWidth value={gravity} onChange={(e) => setGravity(e.target.value)} onFocus={(e) => e.target.select()} helperText="Default: Earth's gravity (9.8 m/s²)" />
            {solveFor !== 'energy' && (
              <TextField label="Potential Energy (J)" type="number" fullWidth value={energy} onChange={(e) => setEnergy(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
          </Stack>
        </Paper>

        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="body2">
            {solveFor === 'energy' ? 'Potential Energy' : solveFor === 'mass' ? 'Mass' : 'Height'}
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            {result !== null
              ? `${result.toFixed(4)} ${solveFor === 'energy' ? 'J' : solveFor === 'mass' ? 'kg' : 'm'}`
              : '—'}
          </Typography>
          {formula && (
            <Typography variant="body2" mt={1} sx={{ fontFamily: 'monospace' }}>{formula}</Typography>
          )}
        </Paper>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PotentialEnergyCalculator;
