'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type SolveFor = 'velocity' | 'distance' | 'time';

const VelocityCalculator = () => {
  const [solveFor, setSolveFor] = useState<SolveFor>('velocity');
  const [distance, setDistance] = useState<string>('100');
  const [time, setTime] = useState<string>('20');
  const [velocity, setVelocity] = useState<string>('5');

  const d = parseFloat(distance);
  const t = parseFloat(time);
  const v = parseFloat(velocity);

  let result: number | null = null;
  let formula = '';

  if (solveFor === 'velocity' && !isNaN(d) && !isNaN(t) && t !== 0) {
    result = d / t;
    formula = `v = d / t = ${d} / ${t} = ${result.toFixed(4)}`;
  } else if (solveFor === 'distance' && !isNaN(v) && !isNaN(t)) {
    result = v * t;
    formula = `d = v × t = ${v} × ${t} = ${result.toFixed(4)}`;
  } else if (solveFor === 'time' && !isNaN(d) && !isNaN(v) && v !== 0) {
    result = d / v;
    formula = `t = d / v = ${d} / ${v} = ${result.toFixed(4)}`;
  }

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: SolveFor | null) => {
    if (newMode) setSolveFor(newMode);
  };

  const content = (
    <>
      <Typography variant="h2">How to Calculate Velocity</Typography>
      <Typography variant="body1">
        Velocity is the rate at which an object covers distance in a given direction, calculated by dividing
        distance traveled by the time taken. This calculator solves for any one of the three variables —
        velocity, distance, or time — as long as you provide the other two.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        v = d / t &nbsp;&nbsp;|&nbsp;&nbsp; d = v × t &nbsp;&nbsp;|&nbsp;&nbsp; t = d / v
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A car covers 100 meters in 20 seconds. Its velocity is v = 100 / 20 = 5 m/s. If instead you knew the
        velocity (5 m/s) and time (20 s), you could solve for distance: d = 5 × 20 = 100 meters.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Physics homework involving distance, time, and speed relationships.</li>
          <li>Estimating travel time given a known distance and expected average speed.</li>
          <li>Checking the average velocity of a moving object from a measured distance and elapsed time.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What&apos;s the difference between speed and velocity?</Typography>
      <Typography variant="body1">
        Speed is a scalar quantity describing how fast something moves, while velocity is a vector that also
        includes direction. For straight-line calculations like this one, the numeric result is the same either
        way — only the interpretation differs.
      </Typography>
      <Typography variant="h3">Can I use any units for distance and time?</Typography>
      <Typography variant="body1">
        Yes — the calculator performs pure division and multiplication, so as long as you&apos;re consistent
        (e.g., meters and seconds, or miles and hours), the result will be in the matching unit (meters per
        second, miles per hour, and so on).
      </Typography>
      <Typography variant="h3">What if time is zero?</Typography>
      <Typography variant="body1">
        Velocity is undefined when time is zero, since you can&apos;t divide by zero. Enter a non-zero time
        value to get a valid result when solving for velocity or time.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/velocity-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={solveFor} exclusive onChange={handleModeChange} size="small">
            <ToggleButton value="velocity">Solve for Velocity</ToggleButton>
            <ToggleButton value="distance">Solve for Distance</ToggleButton>
            <ToggleButton value="time">Solve for Time</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            {solveFor !== 'distance' && (
              <TextField label="Distance (d)" type="number" fullWidth value={distance} onChange={(e) => setDistance(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {solveFor !== 'time' && (
              <TextField label="Time (t)" type="number" fullWidth value={time} onChange={(e) => setTime(e.target.value)} onFocus={(e) => e.target.select()} />
            )}
            {solveFor !== 'velocity' && (
              <TextField label="Velocity (v)" type="number" fullWidth value={velocity} onChange={(e) => setVelocity(e.target.value)} onFocus={(e) => e.target.select()} />
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

export default VelocityCalculator;
