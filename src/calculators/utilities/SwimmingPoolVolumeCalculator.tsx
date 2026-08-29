'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

type Shape = 'rectangular' | 'circular' | 'oval';
type DepthMode = 'average' | 'sloped';

const GALLONS_PER_FT3 = 7.48052;
const LITERS_PER_M3 = 1000;

const SwimmingPoolVolumeCalculator = () => {
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');
  const [shape, setShape] = useState<Shape>('rectangular');
  const [depthMode, setDepthMode] = useState<DepthMode>('average');

  const [length, setLength] = useState<string>('30');
  const [width, setWidth] = useState<string>('15');
  const [diameter, setDiameter] = useState<string>('20');

  const [avgDepth, setAvgDepth] = useState<string>('5');
  const [shallowDepth, setShallowDepth] = useState<string>('3');
  const [deepDepth, setDeepDepth] = useState<string>('8');

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(diameter);

    const depth = depthMode === 'average'
      ? parseFloat(avgDepth)
      : (parseFloat(shallowDepth) + parseFloat(deepDepth)) / 2;

    if (isNaN(depth) || depth <= 0) return null;

    let volume: number | null = null;
    if (shape === 'rectangular') {
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return null;
      volume = l * w * depth;
    } else if (shape === 'circular') {
      if (isNaN(d) || d <= 0) return null;
      const r = d / 2;
      volume = Math.PI * r * r * depth;
    } else {
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return null;
      volume = Math.PI * (l / 2) * (w / 2) * depth;
    }

    if (volume === null) return null;

    if (unit === 'ft') {
      return { cubicUnit: volume, gallons: volume * GALLONS_PER_FT3, liters: volume * GALLONS_PER_FT3 * 3.78541 };
    }
    return { cubicUnit: volume, gallons: volume * LITERS_PER_M3 * 0.264172, liters: volume * LITERS_PER_M3 };
  }, [shape, depthMode, length, width, diameter, avgDepth, shallowDepth, deepDepth, unit]);

  const content = (
    <>
      <Typography variant="h2">How to Calculate Swimming Pool Volume</Typography>
      <Typography variant="body1">
        Pool volume is calculated as surface area multiplied by average depth. This calculator supports
        rectangular pools (length × width), circular or oval pools (using diameter, or two diameters for an
        oval), and either a single average depth or a shallow-end/deep-end pair for a sloped pool bottom, which
        gets averaged automatically.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Rectangular: V = L × W × D &nbsp;|&nbsp; Circular: V = π × r² × D &nbsp;|&nbsp; Oval: V = π × (L/2) × (W/2) × D
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        A rectangular pool measuring 30×15 ft with a sloped bottom from 3 ft (shallow) to 8 ft (deep) has an
        average depth of (3 + 8) / 2 = 5.5 ft. Volume = 30 × 15 × 5.5 = 2,475 cubic feet, which converts to
        about 18,519 gallons.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Determining how much water is needed to fill a new or drained pool.</li>
          <li>Calculating the correct dose of pool chemicals, which scales with total water volume.</li>
          <li>Estimating filling time or water costs for a pool of a given size.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Typography variant="h3">How do I measure an oval pool?</Typography>
      <Typography variant="body1">
        Enter the pool&apos;s longest length and its widest width — the calculator treats these as the two axes
        of an ellipse and computes the area accordingly, which is the standard approximation used for oval pool
        volume.
      </Typography>
      <Typography variant="h3">Why average the shallow and deep end depths?</Typography>
      <Typography variant="body1">
        For a pool with a sloped bottom, the average of the shallow and deep depths gives a close approximation
        of the true average depth across the entire pool, since the slope is typically close to linear between
        the two ends.
      </Typography>
      <Typography variant="h3">How many gallons are in a cubic foot of water?</Typography>
      <Typography variant="body1">
        1 cubic foot of water equals approximately 7.48 gallons — that&apos;s the standard conversion factor
        this calculator uses to turn your pool&apos;s volume in cubic feet into US gallons.
      </Typography>
    </>
  );

  return (
    <CalculatorShell url="/utilities/swimming-pool-volume-calculator" content={content}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small">
          <ToggleButton value="ft">Feet</ToggleButton>
          <ToggleButton value="m">Meters</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup value={shape} exclusive onChange={(_, v) => v && setShape(v)} size="small">
          <ToggleButton value="rectangular">Rectangular</ToggleButton>
          <ToggleButton value="circular">Circular</ToggleButton>
          <ToggleButton value="oval">Oval</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {shape === 'circular' ? (
            <TextField label={`Diameter (${unit})`} type="number" fullWidth value={diameter} onChange={(e) => setDiameter(e.target.value)} onFocus={(e) => e.target.select()} />
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label={`Length (${unit})`} type="number" fullWidth value={length} onChange={(e) => setLength(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label={`Width (${unit})`} type="number" fullWidth value={width} onChange={(e) => setWidth(e.target.value)} onFocus={(e) => e.target.select()} />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <ToggleButtonGroup value={depthMode} exclusive onChange={(_, v) => v && setDepthMode(v)} size="small">
              <ToggleButton value="average">Average Depth</ToggleButton>
              <ToggleButton value="sloped">Shallow + Deep End</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {depthMode === 'average' ? (
            <TextField label={`Average Depth (${unit})`} type="number" fullWidth value={avgDepth} onChange={(e) => setAvgDepth(e.target.value)} onFocus={(e) => e.target.select()} />
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField label={`Shallow End Depth (${unit})`} type="number" fullWidth value={shallowDepth} onChange={(e) => setShallowDepth(e.target.value)} onFocus={(e) => e.target.select()} />
              <TextField label={`Deep End Depth (${unit})`} type="number" fullWidth value={deepDepth} onChange={(e) => setDeepDepth(e.target.value)} onFocus={(e) => e.target.select()} />
            </Box>
          )}
        </Box>

        <Paper variant="outlined" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, textAlign: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">Volume</Typography>
            <Typography variant="h6" fontWeight={700}>
              {result !== null ? `${result.cubicUnit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit === 'ft' ? 'ft³' : 'm³'}` : '—'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Gallons</Typography>
            <Typography variant="h4" color="primary" fontWeight={800}>
              {result !== null ? result.gallons.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '—'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {result !== null ? `${result.liters.toLocaleString(undefined, { maximumFractionDigits: 0 })} liters` : ''}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default SwimmingPoolVolumeCalculator;
