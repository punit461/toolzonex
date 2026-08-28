'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'acceleration' | 'finalVelocity' | 'distance';

const AccelerationCalculator = () => {
  const [mode, setMode] = useState<Mode>('acceleration');
  const [unit, setUnit] = useState<'ms' | 'kmh'>('ms');
  const [u, setU] = useState<string>('');
  const [v, setV] = useState<string>('');
  const [t, setT] = useState<string>('');
  const [a, setA] = useState<string>('');

  const toMs = (val: number, from: 'ms' | 'kmh') => (from === 'kmh' ? val / 3.6 : val);
  const fromMs = (val: number, to: 'ms' | 'kmh') => (to === 'kmh' ? val * 3.6 : val);
  const unitLabel = unit === 'ms' ? 'm/s' : 'km/h';

  const result = useMemo(() => {
    const uVal = u !== '' ? toMs(Number(u), unit) : NaN;
    const vVal = v !== '' ? toMs(Number(v), unit) : NaN;
    const tVal = t !== '' ? Number(t) : NaN;
    const aVal = a !== '' ? Number(a) : NaN;

    if (mode === 'acceleration') {
      if (!isNaN(uVal) && !isNaN(vVal) && !isNaN(tVal) && tVal !== 0) {
        const acc = (vVal - uVal) / tVal;
        return { mode: 'acceleration' as const, acceleration: acc, accelerationDisplay: fromMs(acc, unit), formula: `a = (${isNaN(vVal) ? 'v' : fromMs(vVal, unit).toFixed(2)} − ${isNaN(uVal) ? 'u' : fromMs(uVal, unit).toFixed(2)}) / ${tVal} = ${fromMs(acc, unit).toFixed(4)} ${unitLabel}/s` };
      }
    } else if (mode === 'finalVelocity') {
      if (!isNaN(uVal) && !isNaN(aVal) && !isNaN(tVal)) {
        const fv = uVal + aVal * tVal;
        return { mode: 'finalVelocity' as const, finalVelocity: fv, finalVelocityDisplay: fromMs(fv, unit), formula: `v = ${isNaN(uVal) ? 'u' : fromMs(uVal, unit).toFixed(2)} + ${aVal} × ${tVal} = ${fromMs(fv, unit).toFixed(4)} ${unitLabel}` };
      }
    } else {
      if (!isNaN(uVal) && !isNaN(aVal) && !isNaN(tVal)) {
        const dist = uVal * tVal + 0.5 * aVal * tVal * tVal;
        return { mode: 'distance' as const, distance: dist, distanceMeters: dist, formula: `s = ${isNaN(uVal) ? 'u' : fromMs(uVal, unit).toFixed(2)} × ${tVal} + 0.5 × ${aVal} × ${tVal}² = ${dist.toFixed(4)} m` };
      }
    }
    return null;
  }, [mode, unit, u, v, t, a]);

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: Mode | null) => {
    if (newMode) {
      setMode(newMode);
      setU(''); setV(''); setT(''); setA('');
    }
  };

  const content = (
    <>
      <Typography variant="h2">How is Acceleration Calculated?</Typography>
      <Typography variant="body1">
        Acceleration is the rate of change of velocity over time. It is calculated by subtracting the initial
        velocity from the final velocity and dividing by the time taken. This tool also supports the reverse
        calculations — finding the final velocity or the distance traveled given acceleration and time.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        a = (v − u) / t &nbsp;&nbsp;|&nbsp;&nbsp; v = u + a × t &nbsp;&nbsp;|&nbsp;&nbsp; s = u × t + 0.5 × a × t²
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A car accelerates from 10 m/s to 30 m/s in 5 seconds. Using a = (v − u) / t, we get
        a = (30 − 10) / 5 = 4 m/s². If you wanted the final velocity from rest at 4 m/s² for 5 seconds,
        v = 0 + 4 × 5 = 20 m/s.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Physics homework — computing acceleration, velocity, or displacement for kinematics problems.</li>
          <li>Vehicle performance — estimating how quickly a car can reach a target speed.</li>
          <li>Engineering — determining acceleration forces in mechanical or structural design.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What units does this calculator support?</Typography>
      <Typography variant="body1">
        You can toggle between m/s and km/h for velocity inputs. Distance is always shown in meters and
        acceleration in m/s² (or the equivalent in your chosen velocity unit per second).
      </Typography>
      <Typography variant="h3">Can I calculate distance from just velocity and time?</Typography>
      <Typography variant="body1">
        Yes — switch to "Distance" mode and enter the initial velocity, acceleration, and time. The tool
        uses s = ut + 0.5at² to compute the distance traveled.
      </Typography>
      <Typography variant="h3">What if acceleration is negative?</Typography>
      <Typography variant="body1">
        A negative acceleration simply means deceleration — the object is slowing down. Enter a negative
        value for the initial or final velocity as needed and the formula handles the sign automatically.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/acceleration-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange} size="small">
            <ToggleButton value="acceleration">Acceleration</ToggleButton>
            <ToggleButton value="finalVelocity">Final Velocity</ToggleButton>
            <ToggleButton value="distance">Distance</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={unit}
            exclusive
            onChange={(_, newUnit) => { if (newUnit) setUnit(newUnit); }}
            size="small"
          >
            <ToggleButton value="ms">m/s</ToggleButton>
            <ToggleButton value="kmh">km/h</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            {mode === 'acceleration' && (
              <>
                <TextField label={`Initial velocity (${unitLabel})`} type="number" fullWidth value={u} onChange={(e) => setU(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label={`Final velocity (${unitLabel})`} type="number" fullWidth value={v} onChange={(e) => setV(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Time (s)" type="number" fullWidth value={t} onChange={(e) => setT(e.target.value)} onFocus={(e) => e.target.select()} />
              </>
            )}
            {mode === 'finalVelocity' && (
              <>
                <TextField label={`Initial velocity (${unitLabel})`} type="number" fullWidth value={u} onChange={(e) => setU(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Acceleration (m/s²)" type="number" fullWidth value={a} onChange={(e) => setA(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Time (s)" type="number" fullWidth value={t} onChange={(e) => setT(e.target.value)} onFocus={(e) => e.target.select()} />
              </>
            )}
            {mode === 'distance' && (
              <>
                <TextField label={`Initial velocity (${unitLabel})`} type="number" fullWidth value={u} onChange={(e) => setU(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Acceleration (m/s²)" type="number" fullWidth value={a} onChange={(e) => setA(e.target.value)} onFocus={(e) => e.target.select()} />
                <TextField label="Time (s)" type="number" fullWidth value={t} onChange={(e) => setT(e.target.value)} onFocus={(e) => e.target.select()} />
              </>
            )}
          </Stack>
        </Paper>

        {result && (
          <Paper variant="outlined" sx={{ p: 3, bgcolor: 'action.hover' }}>
            <Typography variant="h6" gutterBottom>Result</Typography>
            {result.mode === 'acceleration' && (
              <Box>
                <Typography variant="h4" color="primary" fontWeight={700}>{result.accelerationDisplay.toFixed(4)} {unitLabel}/s</Typography>
                <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>{result.formula}</Typography>
              </Box>
            )}
            {result.mode === 'finalVelocity' && (
              <Box>
                <Typography variant="h4" color="primary" fontWeight={700}>{result.finalVelocityDisplay.toFixed(4)} {unitLabel}</Typography>
                <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>{result.formula}</Typography>
              </Box>
            )}
            {result.mode === 'distance' && (
              <Box>
                <Typography variant="h4" color="primary" fontWeight={700}>{result.distanceMeters.toFixed(4)} m</Typography>
                <Typography variant="body2" sx={{ mt: 1, fontFamily: 'monospace' }}>{result.formula}</Typography>
              </Box>
            )}
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default AccelerationCalculator;
