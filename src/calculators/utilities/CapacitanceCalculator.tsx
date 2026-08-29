'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const EPSILON_0 = 8.854e-12;

const DIELECTRIC_PRESETS: Record<string, { label: string; value: number }> = {
  vacuum: { label: 'Vacuum / Air (≈1.0)', value: 1.0006 },
  paper: { label: 'Paper (≈3.5)', value: 3.5 },
  glass: { label: 'Glass (≈7.5)', value: 7.5 },
  mica: { label: 'Mica (≈6.0)', value: 6.0 },
  ceramic: { label: 'Ceramic (≈100)', value: 100 },
  custom: { label: 'Custom', value: 1 },
};

const CapacitanceCalculator = () => {
  const [dielectric, setDielectric] = useState<string>('vacuum');
  const [dielectricConstant, setDielectricConstant] = useState<string>('1.0006');
  const [area, setArea] = useState<string>('100');
  const [distance, setDistance] = useState<string>('1');

  const handleDielectricChange = (value: string) => {
    setDielectric(value);
    if (value !== 'custom') {
      setDielectricConstant(String(DIELECTRIC_PRESETS[value].value));
    }
  };

  const a = parseFloat(area);
  const d = parseFloat(distance);
  const er = parseFloat(dielectricConstant);

  const valid = !isNaN(a) && !isNaN(d) && !isNaN(er) && a > 0 && d > 0 && er > 0;
  const areaM2 = a * 1e-4;
  const distanceM = d / 1000;
  const capacitanceF = valid ? (EPSILON_0 * er * areaM2) / distanceM : 0;
  const capacitancePf = capacitanceF * 1e12;
  const capacitanceNf = capacitanceF * 1e9;

  const content = (
    <>
      <Typography variant="h2">How to Calculate Parallel Plate Capacitance</Typography>
      <Typography variant="body1">
        A parallel plate capacitor&apos;s capacitance depends on the plate area, the distance between the
        plates, and the dielectric material filling the gap. Enter the plate area, plate separation, and pick a
        dielectric preset (or enter a custom relative permittivity) to get the capacitance.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        C = ε₀ × εr × A ÷ d &nbsp;&nbsp;(ε₀ = 8.854 × 10⁻¹² F/m)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Two plates with 100 cm² of area, separated by 1mm of air (εr ≈ 1), give a capacitance of C = 8.854×10⁻¹²
        × 1 × 0.01 ÷ 0.001 ≈ 8.854×10⁻¹¹ farads, or about 88.5 picofarads (pF).
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Designing a simple parallel-plate capacitor for a physics lab or hobby electronics project.</li>
          <li>Comparing how different dielectric materials affect capacitance for the same geometry.</li>
          <li>Physics or electrical engineering coursework on capacitors and electric fields.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a dielectric constant (relative permittivity)?</Typography>
      <Typography variant="body1">
        It&apos;s the ratio of a material&apos;s permittivity to that of a vacuum, describing how much better
        that material is at storing electric field energy compared to empty space. A higher dielectric constant
        means more capacitance for the same plate area and spacing.
      </Typography>
      <Typography variant="h3">Does this account for real-world fringing effects?</Typography>
      <Typography variant="body1">
        No — this uses the idealized formula that assumes a uniform electric field between infinite parallel
        plates. Real capacitors have fringing fields at the plate edges, which make measured capacitance
        somewhat higher than this calculation, especially when the plate separation isn&apos;t small compared
        to the plate size.
      </Typography>
      <Typography variant="h3">How does the distance between plates affect capacitance?</Typography>
      <Typography variant="body1">
        Capacitance is inversely proportional to plate separation, so halving the gap between the plates doubles
        the capacitance, while doubling the gap halves it.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/capacitance-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Stack spacing={2}>
          <TextField label="Plate Area (cm²)" type="number" fullWidth value={area} onChange={(e) => setArea(e.target.value)} onFocus={(e) => e.target.select()} />
          <TextField label="Distance Between Plates (mm)" type="number" fullWidth value={distance} onChange={(e) => setDistance(e.target.value)} onFocus={(e) => e.target.select()} />
          <FormControl fullWidth size="small">
            <InputLabel>Dielectric Material</InputLabel>
            <Select label="Dielectric Material" value={dielectric} onChange={(e) => handleDielectricChange(e.target.value)}>
              {Object.entries(DIELECTRIC_PRESETS).map(([key, p]) => (
                <MenuItem key={key} value={key}>{p.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Relative Permittivity (εr)" type="number" fullWidth value={dielectricConstant}
            disabled={dielectric !== 'custom'}
            onChange={(e) => setDielectricConstant(e.target.value)} onFocus={(e) => e.target.select()}
          />
        </Stack>

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Capacitance</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {valid ? `${capacitancePf.toFixed(3)} pF` : '—'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {valid ? `${capacitanceNf.toFixed(6)} nF  |  ${capacitanceF.toExponential(4)} F` : ''}
          </Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CapacitanceCalculator;
