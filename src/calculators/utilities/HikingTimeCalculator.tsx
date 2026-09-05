'use client';

import { useState } from 'react';
import { Box, TextField, Typography, Paper, Stack, ToggleButtonGroup, ToggleButton, MenuItem } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const PACE_MULTIPLIERS: Record<string, number> = {
  Slow: 1.3,
  Average: 1.0,
  Fast: 0.8,
};

const HikingTimeCalculator = () => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [distance, setDistance] = useState('8');
  const [elevationGain, setElevationGain] = useState('1500');
  const [pace, setPace] = useState('Average');

  const dist = parseFloat(distance);
  const gain = parseFloat(elevationGain);
  const valid = !isNaN(dist) && !isNaN(gain) && dist >= 0 && gain >= 0;

  // Naismith's Rule: 1 hour per 3 miles (5 km) flat + 1 hour per 2000 ft (600m) of ascent
  const distanceHours = valid ? (unit === 'imperial' ? dist / 3 : dist / 5) : 0;
  const elevationHours = valid ? (unit === 'imperial' ? gain / 2000 : gain / 600) : 0;
  const baseHours = distanceHours + elevationHours;
  const multiplier = PACE_MULTIPLIERS[pace];
  const totalHours = baseHours * multiplier;

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const content = (
    <>
      <Typography variant="h2">How to Use the Hiking Time Calculator</Typography>
      <Typography variant="body1">
        This calculator estimates hiking time using Naismith&apos;s Rule, a long-standing rule of thumb from
        mountaineering that accounts for both the flat distance covered and the elevation gained — since
        climbing takes far longer per unit of distance than walking on flat ground. Enter your trail
        distance, total elevation gain, and a pace level to get an estimated total hiking time.
      </Typography>
      <Box sx={{ my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1, fontFamily: 'monospace', fontSize: '0.9rem' }}>
        Base Time = (Distance ÷ 3 miles) hours + (Elevation Gain ÷ 2000 ft) hours<br />
        (metric: Distance ÷ 5 km + Elevation Gain ÷ 600 m)<br />
        Total Time = Base Time × Pace Multiplier (Slow ×1.3, Average ×1.0, Fast ×0.8)
      </Box>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        An 8-mile hike with 1,500 feet of elevation gain: the distance component is 8 ÷ 3 ≈ 2.67 hours, and
        the elevation component is 1,500 ÷ 2000 = 0.75 hours, for a base time of about 3.42 hours. At an
        Average pace, that&apos;s roughly 3 hours 25 minutes; at a Slow pace (×1.3), it stretches to about
        4 hours 27 minutes.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning a start time so you finish a hike before sunset or a specific deadline.</li>
          <li>Comparing how much longer a steep trail will take versus a flatter one of similar distance.</li>
          <li>Estimating trip duration for a group hiking at a slower or faster pace than average.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How accurate is Naismith&apos;s Rule?</strong> It&apos;s a widely used estimate, not a precise prediction — actual time varies with fitness, trail conditions, weather, pack weight, and rest breaks. Treat the result as a solid planning baseline rather than an exact figure, and add extra time for breaks, photos, or difficult terrain.</li>
          <li><strong>Does this account for descent?</strong> Not separately — Naismith&apos;s Rule as implemented here only adds time for ascent, since descending is generally close to flat-ground pace on most trails. Very steep or technical descents can still take meaningfully longer than the base estimate suggests.</li>
          <li><strong>What pace should I choose?</strong> Average fits most reasonably fit hikers on a moderate trail. Choose Slow for large groups, young children, or difficult terrain, and Fast only for experienced hikers moving at a brisk, sustained pace.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/utilities/hiking-time-calculator" content={content}>
      <ToggleButtonGroup value={unit} exclusive onChange={(_, v) => v && setUnit(v)} size="small" sx={{ mb: 3 }}>
        <ToggleButton value="imperial">Miles / Feet</ToggleButton>
        <ToggleButton value="metric">Kilometers / Meters</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        <Stack spacing={3}>
          <TextField
            label={`Distance (${unit === 'imperial' ? 'miles' : 'km'})`}
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            fullWidth
          />
          <TextField
            label={`Elevation Gain (${unit === 'imperial' ? 'ft' : 'm'})`}
            type="number"
            value={elevationGain}
            onChange={(e) => setElevationGain(e.target.value)}
            fullWidth
          />
          <TextField select label="Pace" value={pace} onChange={(e) => setPace(e.target.value)} fullWidth>
            {Object.keys(PACE_MULTIPLIERS).map((p) => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </TextField>
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
          <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="body2">Estimated Hiking Time</Typography>
            <Typography variant="h3" fontWeight="bold">{valid ? formatTime(totalHours) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Distance Component</Typography>
            <Typography fontWeight={600}>{valid ? formatTime(distanceHours) : '—'}</Typography>
          </Paper>
          <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Elevation Component</Typography>
            <Typography fontWeight={600}>{valid ? formatTime(elevationHours) : '—'}</Typography>
          </Paper>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default HikingTimeCalculator;
