'use client';

import { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type UnitSystem = 'imperial' | 'metric';

const HorsepowerCalculator = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial');
  const [torque, setTorque] = useState<string>('300');
  const [rpm, setRpm] = useState<string>('4000');

  const t = parseFloat(torque);
  const r = parseFloat(rpm);
  const valid = !isNaN(t) && !isNaN(r) && t >= 0 && r >= 0;

  const hp = valid ? (unitSystem === 'imperial' ? (t * r) / 5252 : (t * r) / 7121) : 0;
  const kw = valid ? hp * 0.7457 : 0;

  const content = (
    <>
      <Typography variant="h2">How to Calculate Horsepower from Torque and RPM</Typography>
      <Typography variant="body1">
        Horsepower is a measure of the rate at which torque is converted into rotational work. Enter torque and
        engine speed (RPM), and choose imperial units (pound-feet) or metric units (newton-meters), to get the
        equivalent horsepower.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        HP = (Torque [lb-ft] × RPM) ÷ 5252 &nbsp;|&nbsp; HP = (Torque [N·m] × RPM) ÷ 7121
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An engine producing 300 lb-ft of torque at 4,000 RPM makes HP = (300 × 4,000) ÷ 5,252 ≈ 228.5
        horsepower. Note that torque and horsepower curves always cross at exactly 5,252 RPM on an imperial dyno
        chart, since that&apos;s where the two units become numerically equal.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Converting a dyno sheet&apos;s torque curve into a horsepower figure at a given RPM.</li>
          <li>Comparing engine outputs specified in different units (lb-ft vs N·m).</li>
          <li>Automotive tuning and engine performance estimates.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Where does the constant 5,252 come from?</Typography>
      <Typography variant="body1">
        It comes from converting the definition of mechanical power (torque × angular velocity) into
        horsepower and RPM units — specifically, 33,000 ft-lb/min per horsepower divided by 2π radians per
        revolution equals approximately 5,252. It&apos;s also the RPM at which the torque (in lb-ft) and
        horsepower numbers are always identical on a dyno graph.
      </Typography>
      <Typography variant="h3">Should I use imperial or metric units?</Typography>
      <Typography variant="body1">
        Use imperial (pound-feet) if your torque figure comes from a US-spec source, and metric (newton-meters)
        if it comes from a manufacturer spec sheet using SI units — the calculator applies the matching
        conversion constant for whichever you select.
      </Typography>
      <Typography variant="h3">Does this account for drivetrain losses?</Typography>
      <Typography variant="body1">
        No — this calculates horsepower directly from the torque and RPM figures you enter (typically
        crank/engine output). Power actually delivered to the wheels is usually 15-20% lower after accounting
        for drivetrain losses through the transmission and differential.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/horsepower-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <ToggleButtonGroup value={unitSystem} exclusive onChange={(_, v) => v && setUnitSystem(v)} size="small" fullWidth>
            <ToggleButton value="imperial">Imperial (lb-ft)</ToggleButton>
            <ToggleButton value="metric">Metric (N·m)</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label={unitSystem === 'imperial' ? 'Torque (lb-ft)' : 'Torque (N·m)'}
            type="number" fullWidth value={torque}
            onChange={(e) => setTorque(e.target.value)} onFocus={(e) => e.target.select()}
          />
          <TextField label="RPM" type="number" fullWidth value={rpm} onChange={(e) => setRpm(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Horsepower</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>{valid ? hp.toFixed(1) : '—'}</Typography>
          <Typography variant="caption" color="text.secondary">{valid ? `${kw.toFixed(1)} kW` : ''}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HorsepowerCalculator;
