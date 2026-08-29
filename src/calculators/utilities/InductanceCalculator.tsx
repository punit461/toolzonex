'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const MU_0 = 4 * Math.PI * 1e-7;

const InductanceCalculator = () => {
  const [turns, setTurns] = useState<string>('100');
  const [length, setLength] = useState<string>('10');
  const [radius, setRadius] = useState<string>('1');

  const n = parseFloat(turns);
  const lengthCm = parseFloat(length);
  const radiusCm = parseFloat(radius);

  const valid = !isNaN(n) && !isNaN(lengthCm) && !isNaN(radiusCm) && n > 0 && lengthCm > 0 && radiusCm > 0;
  const lengthM = lengthCm / 100;
  const radiusM = radiusCm / 100;
  const areaM2 = Math.PI * radiusM * radiusM;
  const inductanceH = valid ? (MU_0 * n * n * areaM2) / lengthM : 0;
  const inductanceMicroH = inductanceH * 1e6;
  const inductanceMH = inductanceH * 1e3;

  const content = (
    <>
      <Typography variant="h2">How to Calculate Solenoid Inductance</Typography>
      <Typography variant="body1">
        For a simple air-core solenoid (a straight cylindrical coil), inductance depends on the number of
        turns, the coil&apos;s length, and its cross-sectional area. Enter the turn count, coil length, and coil
        radius to get the inductance using the standard solenoid formula.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        L = μ₀ × N² × A ÷ l &nbsp;&nbsp;(μ₀ = 4π × 10⁻⁷ H/m)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A coil with 100 turns, a length of 10 cm, and a radius of 1 cm has a cross-sectional area of about
        3.1416 cm². Converting to meters and applying the formula gives an inductance of roughly 39.5
        microhenries (µH).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Designing a hobby electronics inductor or RF coil.</li>
          <li>Estimating how changing turn count or coil length affects inductance.</li>
          <li>Physics or electrical engineering coursework on solenoids and magnetic fields.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is μ₀ (mu-naught)?</Typography>
      <Typography variant="body1">
        μ₀ is the permeability of free space, a physical constant equal to about 4π × 10⁻⁷ henries per meter
        (H/m). It describes how easily a magnetic field can form in a vacuum (or air, which is very close to
        vacuum for this purpose) and appears in this formula because the coil here has an air core.
      </Typography>
      <Typography variant="h3">Does this work for coils with a magnetic core?</Typography>
      <Typography variant="body1">
        No — this assumes an air-core coil. Adding a ferromagnetic core (like iron or ferrite) multiplies the
        inductance by that material&apos;s relative permeability (μr), which can be dozens or hundreds of times
        higher than air, so a cored inductor&apos;s actual inductance will be much higher than this result.
      </Typography>
      <Typography variant="h3">Does wire gauge or turn spacing matter?</Typography>
      <Typography variant="body1">
        Not directly in this formula — it assumes turns are wound evenly along the given coil length, regardless
        of the wire&apos;s thickness. Wire gauge determines how many turns physically fit in that length, but
        once you know the turn count and length, the inductance formula itself doesn&apos;t need the gauge.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/inductance-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Number of Turns (N)" type="number" fullWidth value={turns} onChange={(e) => setTurns(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Coil Length (cm)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Coil Radius (cm)" type="number" fullWidth value={radius} onChange={(e) => setRadius(e.target.value)} onFocus={(e) => e.target.select()} />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Inductance</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? `${inductanceMicroH.toFixed(3)} µH` : '—'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {valid ? `${inductanceMH.toFixed(6)} mH  |  ${inductanceH.toExponential(4)} H` : ''}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default InductanceCalculator;
