'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Mode = 'findFactor' | 'findScaled' | 'findOriginal';

const ScaleFactorCalculator = () => {
  const [mode, setMode] = useState<Mode>('findFactor');

  const [original, setOriginal] = useState<string>('10');
  const [scaled, setScaled] = useState<string>('2.5');

  const [scaleFactor, setScaleFactor] = useState<string>('0.25');
  const [knownDimension, setKnownDimension] = useState<string>('10');

  const factorResult = useMemo(() => {
    const o = parseFloat(original);
    const s = parseFloat(scaled);
    if (isNaN(o) || isNaN(s) || o === 0) return null;
    return s / o;
  }, [original, scaled]);

  const dimensionResult = useMemo(() => {
    const f = parseFloat(scaleFactor);
    const k = parseFloat(knownDimension);
    if (isNaN(f) || isNaN(k) || f === 0) return null;
    if (mode === 'findScaled') return k * f;
    if (mode === 'findOriginal') return k / f;
    return null;
  }, [mode, scaleFactor, knownDimension]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Scale Factor</Typography>
      <Typography variant="body1">
        A scale factor is the ratio between a scaled dimension and its original (real-world) dimension. Enter an
        original and scaled measurement to find the scale factor, or enter a known scale factor with one
        dimension to solve for the other — useful for scale models, maps, and blueprints.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Scale Factor = Scaled Dimension / Original Dimension
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A model car that&apos;s 2.5 inches long, based on a real car 10 feet long (120 inches), has a scale
        factor of 2.5 / 120 ≈ 0.0208, commonly written as 1:48. Given that same 1:48 scale factor and a
        real-world wingspan of 40 feet, the model&apos;s scaled wingspan would be 40 × (1/48) ≈ 0.833 feet, or
        about 10 inches.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Working out the scale factor of a model kit, dollhouse, or miniature from its real-world counterpart.</li>
          <li>Converting real-world distances to map distances (or back) using a known map scale.</li>
          <li>Scaling blueprint or architectural drawing measurements to real building dimensions.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">What does a scale factor like 1:48 mean?</Typography>
      <Typography variant="body1">
        It means every 1 unit of measurement on the scaled object corresponds to 48 of the same unit in real
        life — so a 1:48 scale model is 1/48th the size of the real object in every dimension.
      </Typography>
      <Typography variant="h3">Do I need to use the same units for both dimensions?</Typography>
      <Typography variant="body1">
        Yes — enter both the original and scaled dimension in the same unit (both in inches, or both in
        centimeters, for example) so the resulting scale factor is a pure, unitless ratio.
      </Typography>
      <Typography variant="h3">Can I use this for maps as well as physical models?</Typography>
      <Typography variant="body1">
        Yes — a map&apos;s scale (like 1:100,000) works exactly the same way: the scale factor relates a
        distance measured on the map to the corresponding real-world distance, so you can solve for either one
        given the other and the scale factor.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/scale-factor-calculator" content={content}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} size="small">
          <ToggleButton value="findFactor">Find Scale Factor</ToggleButton>
          <ToggleButton value="findScaled">Find Scaled Dimension</ToggleButton>
          <ToggleButton value="findOriginal">Find Original Dimension</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {mode === 'findFactor' ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Original Dimension" type="number" fullWidth value={original} onChange={(e) => setOriginal(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField label="Scaled Dimension" type="number" fullWidth value={scaled} onChange={(e) => setScaled(e.target.value)} onFocus={(e) => e.target.select()} />
          </Box>
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">Scale Factor</Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {factorResult !== null ? factorResult.toLocaleString(undefined, { maximumFractionDigits: 6 }) : '—'}
            </Typography>
            {factorResult !== null && factorResult > 0 && (
              <Typography variant="body2" color="text.secondary" mt={1}>
                (1 : {(1 / factorResult).toLocaleString(undefined, { maximumFractionDigits: 2 })})
              </Typography>
            )}
          </Paper>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Scale Factor" type="number" fullWidth value={scaleFactor} onChange={(e) => setScaleFactor(e.target.value)} onFocus={(e) => e.target.select()} />
            <TextField
              label={mode === 'findScaled' ? 'Original Dimension' : 'Scaled Dimension'}
              type="number"
              fullWidth
              value={knownDimension}
              onChange={(e) => setKnownDimension(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </Box>
          <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {mode === 'findScaled' ? 'Scaled Dimension' : 'Original Dimension'}
            </Typography>
            <Typography variant="h3" color="primary" fontWeight={800}>
              {dimensionResult !== null ? dimensionResult.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '—'}
            </Typography>
          </Paper>
        </Box>
      )}

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default ScaleFactorCalculator;
