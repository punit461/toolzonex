'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type UnitSystem = 'us' | 'metric';

const PipeFlowCalculator = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('us');
  const [diameter, setDiameter] = useState<string>('2');
  const [velocity, setVelocity] = useState<string>('5');

  const d = parseFloat(diameter);
  const v = parseFloat(velocity);
  const valid = !isNaN(d) && !isNaN(v) && d > 0 && v >= 0;

  let gpm = 0, lpm = 0, m3s = 0, areaLabel = '';

  if (valid) {
    if (unitSystem === 'us') {
      const radiusFt = (d / 12) / 2;
      const areaFt2 = Math.PI * radiusFt * radiusFt;
      const qFt3s = areaFt2 * v;
      gpm = qFt3s * 448.831169;
      lpm = qFt3s * 1699.0110;
      m3s = qFt3s * 0.0283168;
      areaLabel = `${areaFt2.toFixed(4)} ft²`;
    } else {
      const radiusM = (d / 1000) / 2;
      const areaM2 = Math.PI * radiusM * radiusM;
      m3s = areaM2 * v;
      lpm = m3s * 60000;
      gpm = m3s * 15850.3231;
      areaLabel = `${(areaM2 * 10000).toFixed(4)} cm²`;
    }
  }

  const content = (
    <>
      <Typography variant="h2">How to Calculate Pipe Flow Rate</Typography>
      <Typography variant="body1">
        Volumetric flow rate through a full, circular pipe is the cross-sectional area of the pipe multiplied
        by the fluid&apos;s average velocity. Enter the pipe&apos;s diameter and the fluid velocity, and choose
        whether to work in US units (inches, feet per second) or metric units (millimeters, meters per second).
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Q = A × v &nbsp;&nbsp;(A = π × (diameter ÷ 2)²)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 2-inch diameter pipe carrying water at 5 ft/s has a cross-sectional area of about 0.0218 ft². Flow
        rate Q = 0.0218 × 5 = 0.109 ft³/s, which works out to roughly 49 gallons per minute.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Sizing a water pump or irrigation line for a target flow rate.</li>
          <li>Checking whether existing plumbing can deliver the flow a fixture requires.</li>
          <li>Estimating flow through HVAC, industrial, or process piping.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Does this assume the pipe is completely full?</Typography>
      <Typography variant="body1">
        Yes — this calculates flow for steady, incompressible flow through a pipe running completely full.
        Partially filled pipes (like open channels or gravity drains that aren&apos;t flowing full) need a
        different open-channel flow formula, since the wetted cross-sectional area is smaller than the full
        pipe area.
      </Typography>
      <Typography variant="h3">What if I know the flow rate and need the velocity instead?</Typography>
      <Typography variant="body1">
        Rearrange the same formula: velocity = flow rate ÷ cross-sectional area. Calculate the pipe&apos;s area
        from its diameter using the formula above, then divide your known flow rate by that area.
      </Typography>
      <Typography variant="h3">Why does pipe diameter matter so much to flow rate?</Typography>
      <Typography variant="body1">
        Cross-sectional area scales with the square of the diameter, so doubling a pipe&apos;s diameter
        quadruples its area — and therefore roughly quadruples the flow rate at the same fluid velocity.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/pipe-flow-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <ToggleButtonGroup value={unitSystem} exclusive onChange={(_, val) => val && setUnitSystem(val)} size="small" fullWidth>
            <ToggleButton value="us">US (in, ft/s)</ToggleButton>
            <ToggleButton value="metric">Metric (mm, m/s)</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label={unitSystem === 'us' ? 'Pipe Diameter (inches)' : 'Pipe Diameter (mm)'}
            type="number" fullWidth value={diameter}
            onChange={(e) => setDiameter(e.target.value)} onFocus={(e) => e.target.select()}
          />
          <TextField
            label={unitSystem === 'us' ? 'Fluid Velocity (ft/s)' : 'Fluid Velocity (m/s)'}
            type="number" fullWidth value={velocity}
            onChange={(e) => setVelocity(e.target.value)} onFocus={(e) => e.target.select()}
          />
          <Typography variant="caption" color="text.secondary">Cross-sectional area: {valid ? areaLabel : '—'}</Typography>
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Flow Rate</Typography>
          <Typography variant="h4" color="primary" fontWeight={800}>
            {valid ? (unitSystem === 'us' ? `${gpm.toFixed(2)} GPM` : `${lpm.toFixed(2)} L/min`) : '—'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>{valid ? `${m3s.toFixed(6)} m³/s` : ''}</Typography>
          <Typography variant="body2">{valid ? `${gpm.toFixed(2)} GPM` : ''}</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PipeFlowCalculator;
