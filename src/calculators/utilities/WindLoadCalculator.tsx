'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Select, MenuItem, FormControl, InputLabel, ToggleButton, ToggleButtonGroup, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const AIR_DENSITY = 1.225; // kg/m^3 at sea level, 15°C

const SHAPE_PRESETS: Record<string, { label: string; cd: number }> = {
  flat: { label: 'Flat surface / sign (Cd ≈ 2.0)', cd: 2.0 },
  cylinder: { label: 'Cylindrical / round pole (Cd ≈ 1.2)', cd: 1.2 },
  sphere: { label: 'Sphere (Cd ≈ 0.47)', cd: 0.47 },
  custom: { label: 'Custom', cd: 1.0 },
};

const WindLoadCalculator = () => {
  const [speedUnit, setSpeedUnit] = useState<'mph' | 'ms'>('mph');
  const [windSpeed, setWindSpeed] = useState<string>('60');
  const [areaUnit, setAreaUnit] = useState<'ft2' | 'm2'>('ft2');
  const [area, setArea] = useState<string>('20');
  const [shape, setShape] = useState<string>('flat');
  const [customCd, setCustomCd] = useState<string>('1.0');

  const cd = shape === 'custom' ? parseFloat(customCd) : SHAPE_PRESETS[shape].cd;

  const result = useMemo(() => {
    const v = parseFloat(windSpeed);
    const a = parseFloat(area);
    if (isNaN(v) || isNaN(a) || isNaN(cd) || v < 0 || a <= 0) return null;

    const vMs = speedUnit === 'mph' ? v * 0.44704 : v;
    const aM2 = areaUnit === 'ft2' ? a * 0.092903 : a;

    const forceN = 0.5 * AIR_DENSITY * vMs * vMs * cd * aM2;
    const forceLbf = forceN * 0.224809;
    return { forceN, forceLbf };
  }, [windSpeed, area, cd, speedUnit, areaUnit]);

  const content = (
    <>
      <Typography variant="h2">How to Estimate Wind Load Force</Typography>
      <Typography variant="body1">
        Wind load is the force exerted by moving air on a surface, estimated using the standard dynamic wind
        pressure formula. It depends on air density, wind speed squared, the surface&apos;s drag coefficient
        (how streamlined or blunt its shape is), and the exposed surface area facing the wind.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        F = 0.5 × Air Density × Velocity² × Cd × Area
      </Box>
      <Alert severity="warning" sx={{ mt: 2 }}>
        This is a simplified engineering estimate using sea-level air density and idealized drag coefficients.
        It is not a substitute for a structural engineer&apos;s calculation for actual construction, signage,
        or building design — always consult a qualified engineer for real-world structural decisions.
      </Alert>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A flat sign with 20 sq ft of surface area (Cd ≈ 2.0) facing a 60 mph wind (about 26.8 m/s) experiences a
        force of F = 0.5 × 1.225 × 26.8² × 2.0 × 1.86 m² ≈ 1,634 newtons, or roughly 367 pounds of force.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Rough estimates of wind force on signs, panels, or flat structures during storm planning.</li>
          <li>Educational physics and engineering problems on drag and wind pressure.</li>
          <li>Sanity-checking the order of magnitude of wind loads before consulting an engineer.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">Why does wind speed matter so much in this formula?</Typography>
      <Typography variant="body1">
        Force scales with the square of wind speed, so doubling the wind speed quadruples the force. This is why
        even modest increases in wind speed during a storm can dramatically increase structural load.
      </Typography>
      <Typography variant="h3">What drag coefficient should I use?</Typography>
      <Typography variant="body1">
        Use the flat surface preset (Cd ≈ 2.0) for signs, panels, and walls facing the wind directly; the
        cylindrical preset (Cd ≈ 1.2) for round poles or pipes; and the sphere preset (Cd ≈ 0.47) for
        round/spherical objects. For anything else, building codes and engineering references list drag
        coefficients for specific shapes.
      </Typography>
      <Typography variant="h3">Is this accurate enough for actual construction?</Typography>
      <Typography variant="body1">
        No — this uses a simplified formula with fixed sea-level air density and idealized shape coefficients.
        Real structural wind load calculations account for gust factors, terrain exposure category, height
        above ground, and local building codes. Always have a licensed structural engineer verify wind loads for
        anything load-bearing or safety-critical.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/wind-load-calculator" content={content}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField label="Wind Speed" type="number" fullWidth value={windSpeed} onChange={(e) => setWindSpeed(e.target.value)} onFocus={(e) => e.target.select()} />
            <ToggleButtonGroup value={speedUnit} exclusive onChange={(_, v) => v && setSpeedUnit(v)} size="small">
              <ToggleButton value="mph">mph</ToggleButton>
              <ToggleButton value="ms">m/s</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField label="Surface Area" type="number" fullWidth value={area} onChange={(e) => setArea(e.target.value)} onFocus={(e) => e.target.select()} />
            <ToggleButtonGroup value={areaUnit} exclusive onChange={(_, v) => v && setAreaUnit(v)} size="small">
              <ToggleButton value="ft2">ft²</ToggleButton>
              <ToggleButton value="m2">m²</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <FormControl fullWidth>
          <InputLabel>Surface Shape / Drag Coefficient</InputLabel>
          <Select value={shape} label="Surface Shape / Drag Coefficient" onChange={(e) => setShape(e.target.value)}>
            {Object.entries(SHAPE_PRESETS).map(([key, s]) => (
              <MenuItem key={key} value={key}>{s.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {shape === 'custom' && (
          <TextField label="Custom Drag Coefficient (Cd)" type="number" fullWidth value={customCd} onChange={(e) => setCustomCd(e.target.value)} onFocus={(e) => e.target.select()} />
        )}

        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">Estimated Wind Load Force</Typography>
          <Typography variant="h3" color="primary" fontWeight={800}>
            {result !== null ? `${result.forceN.toLocaleString(undefined, { maximumFractionDigits: 1 })} N` : '—'}
          </Typography>
          {result !== null && (
            <Typography variant="body2" color="text.secondary" mt={1}>
              ≈ {result.forceLbf.toLocaleString(undefined, { maximumFractionDigits: 1 })} lbf
            </Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default WindLoadCalculator;
