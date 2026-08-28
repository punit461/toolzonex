'use client';

import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const BodySurfaceAreaCalculator = () => {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');

  const result = useMemo(() => {
    const h = parseFloat(height) || 0;
    const w = parseFloat(weight) || 0;
    if (h <= 0 || w <= 0) return { mosteller: 0, duBois: 0, ratio: 0 };

    const mosteller = Math.sqrt((h * w) / 3600);
    const duBois = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);
    const ratio = mosteller > 0 ? w / mosteller : 0;

    return { mosteller, duBois, ratio };
  }, [height, weight]);

  const content = (
    <>
      <Typography variant="h2">How is Body Surface Area Calculated?</Typography>
      <Typography variant="body1">
        Body Surface Area (BSA) estimates the total surface area of a human body from height and weight. The most common clinical method is the Mosteller formula: BSA (m²) = √((height_cm × weight_kg) / 3600). The older Du Bois formula — 0.007184 × Weight^0.425 × Height^0.725 — is also widely referenced and gives very similar results for adults.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Mosteller: BSA = √((H_cm × W_kg) / 3600)<br />
        Du Bois: BSA = 0.007184 × W^0.425 × H^0.725
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A person who is 170 cm tall and weighs 70 kg: Mosteller gives √((170 × 70) / 3600) ≈ 1.82 m². The Du Bois formula gives 0.007184 × 70^0.425 × 170^0.725 ≈ 1.81 m². Both fall in the typical adult reference range of roughly 1.7–1.9 m².
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Dosing chemotherapy and other medications that are scaled to body surface area rather than weight.</li>
          <li>Cardiac index calculations in critical care (cardiac output divided by BSA).</li>
          <li>Estimating burn area and fluid requirements (Parkland formula).</li>
          <li>Setting physiological reference values in clinical research.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What is a normal BSA for an adult?</Typography>
      <Typography variant="body1">
        Most healthy adults have a BSA between roughly 1.7 and 1.9 m². Values outside this range simply reflect a person's size — taller and heavier individuals have a larger surface area. It is a derived estimate, not a fitness or health score on its own.
      </Typography>
      <Typography variant="h3">Why is BSA used for chemotherapy dosing?</Typography>
      <Typography variant="body1">
        Many chemotherapy drugs have a narrow therapeutic window, meaning the difference between an effective dose and a toxic one is small. Since many physiological processes scale more closely with surface area than with weight alone, dosing per m² improves accuracy compared with simple per-kg dosing.
      </Typography>
      <Typography variant="h3">Which formula should I use?</Typography>
      <Typography variant="body1">
        The Mosteller formula is the most commonly used today because it is simple, accurate for typical adult sizes, and easy to compute. The Du Bois formula predates it and is still referenced in many textbooks. For most adults the two agree within a few percent.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/health/body-surface-area-calculator" content={content}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }} fullWidth />
          <TextField label="Weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }} fullWidth />
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Results</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Body Surface Area (Mosteller)</Typography>
            <Typography variant="h3" fontWeight="bold">{result.mosteller.toFixed(2)} m²</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Du Bois Formula</Typography>
            <Typography fontWeight={600}>{result.duBois.toFixed(2)} m²</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Normal Adult Reference</Typography>
            <Typography fontWeight={600}>~1.7–1.9 m²</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Weight per m² (dosing ratio)</Typography>
            <Typography fontWeight={600}>{result.ratio.toFixed(1)} kg/m²</Typography>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <AdSenseUnit />
      </Box>
    </CalculatorShell>
  );
};

export default BodySurfaceAreaCalculator;
