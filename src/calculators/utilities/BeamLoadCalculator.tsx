'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButton, ToggleButtonGroup, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type LoadType = 'point' | 'udl';

const BeamLoadCalculator = () => {
  const [loadType, setLoadType] = useState<LoadType>('point');
  const [length, setLength] = useState<string>('4');
  const [load, setLoad] = useState<string>('5000');
  const [modulus, setModulus] = useState<string>('200');
  const [inertia, setInertia] = useState<string>('8000');

  const { moment, deflection, valid } = useMemo(() => {
    const L = parseFloat(length);
    const P = parseFloat(load);
    const E = parseFloat(modulus);
    const I = parseFloat(inertia);

    if (isNaN(L) || isNaN(P) || L <= 0 || P < 0) return { moment: 0, deflection: null, valid: false };

    const m = loadType === 'point' ? (P * L) / 4 : (P * L * L) / 8;

    let d: number | null = null;
    if (!isNaN(E) && !isNaN(I) && E > 0 && I > 0) {
      // E in GPa, I in cm^4, L in m, P in N or N/m -> deflection converted to mm.
      const E_Pa = E * 1e9;
      const I_m4 = I * 1e-8;
      d = loadType === 'point'
        ? (P * Math.pow(L, 3)) / (48 * E_Pa * I_m4)
        : (5 * P * Math.pow(L, 4)) / (384 * E_Pa * I_m4);
      d = d * 1000; // m -> mm
    }

    return { moment: m, deflection: d, valid: true };
  }, [length, load, modulus, inertia, loadType]);

  const content = (
    <>
      <Typography variant="h2">How to Estimate Beam Bending Moment and Deflection</Typography>
      <Typography variant="body1">
        For a simply supported beam (resting on two end supports), the maximum bending moment and deflection
        depend on the beam&apos;s length, how the load is applied, and the beam&apos;s stiffness (its modulus of
        elasticity and moment of inertia). This calculator covers the two most common loading cases: a single
        point load at the center, and a uniformly distributed load across the full span.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Point Load: M = PL/4, δ = PL³/48EI &nbsp;|&nbsp; Uniform Load: M = wL²/8, δ = 5wL⁴/384EI
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A 4&nbsp;m simply supported beam with a 5,000&nbsp;N point load at its center has a maximum bending
        moment of M = (5,000 × 4) ÷ 4 = 5,000 N·m. With a beam stiffness of E = 200 GPa and I = 8,000 cm⁴
        (typical for a steel I-beam), the maximum deflection works out to a few millimeters at the center span.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Getting a rough first estimate of bending moment for a simple beam design.</li>
          <li>Comparing how a point load versus a spread-out load affects maximum bending moment.</li>
          <li>Coursework or self-study covering basic simply-supported-beam formulas.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Is this suitable for real construction projects?</Typography>
      <Typography variant="body1">
        No. This calculator provides a simplified estimate for basic reference and educational purposes only,
        based on idealized simply-supported-beam formulas. Real structural design must account for material
        safety factors, load combinations, dynamic and lateral loads, connection details, and local building
        codes — always consult a licensed structural engineer for any real construction project.
      </Typography>
      <Typography variant="h3">What do E and I represent?</Typography>
      <Typography variant="body1">
        E is the modulus of elasticity (material stiffness, e.g. ~200 GPa for steel, ~10-13 GPa for typical
        structural timber), and I is the second moment of area (moment of inertia) of the beam&apos;s
        cross-section, which depends on its shape and dimensions. Both determine how much the beam deflects
        under load.
      </Typography>
      <Typography variant="h3">What&apos;s the difference between a point load and a uniformly distributed load?</Typography>
      <Typography variant="body1">
        A point load acts at a single location, like a column resting on the beam, while a uniformly distributed
        load (UDL) is spread evenly across the beam&apos;s full length, like the weight of a floor or roof
        pressing down along the span.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/beam-load-calculator" content={content}>
      <Stack spacing={3}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup value={loadType} exclusive onChange={(_, v) => v && setLoadType(v)} size="small">
            <ToggleButton value="point">Point Load (Center)</ToggleButton>
            <ToggleButton value="udl">Uniformly Distributed Load</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Stack spacing={2}>
            <TextField label="Beam Length (m)" type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField
              label={loadType === 'point' ? 'Point Load (N)' : 'Distributed Load (N/m)'}
              type="number"
              fullWidth
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <TextField label="Modulus of Elasticity, E (GPa, optional)" type="number" fullWidth value={modulus} onChange={(e) => setModulus(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="Moment of Inertia, I (cm⁴, optional)" type="number" fullWidth value={inertia} onChange={(e) => setInertia(e.target.value)} onFocus={(e) => e.target.select()} />
          </Stack>

          <Stack spacing={2}>
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Maximum Bending Moment</Typography>
              <Typography variant="h3" color="primary" fontWeight={800}>
                {valid ? `${moment.toFixed(1)} N·m` : '—'}
              </Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Maximum Deflection</Typography>
              <Typography variant="h4" fontWeight={700}>
                {deflection !== null ? `${deflection.toFixed(2)} mm` : '— (enter E and I)'}
              </Typography>
            </Paper>
          </Stack>
        </Box>

        <Alert severity="warning">
          Simplified estimate for basic reference only — not a substitute for a structural engineer&apos;s
          analysis on any real construction project.
        </Alert>
      </Stack>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default BeamLoadCalculator;
